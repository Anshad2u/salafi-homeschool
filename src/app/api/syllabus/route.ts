import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Subjects display mapping
const SUBJECT_INFO: Record<string, { name: string; icon: string }> = {
  'quran': { name: 'Quran', icon: '📖' },
  'islamic-studies': { name: 'Islamic Studies', icon: '🕌' },
  'science': { name: 'Science', icon: '🔬' },
  'english': { name: 'English', icon: '📝' },
  'mathematics': { name: 'Math', icon: '🔢' },
  'social-studies': { name: 'Social Studies', icon: '🌍' },
  'art-music': { name: 'Art & Music', icon: '🎨' },
  'physical-education': { name: 'P.E.', icon: '🏃' },
  'life-skills': { name: 'Life Skills', icon: '🌟' },
};

// GET /api/syllabus?level=3 — Get all topics with per-child coverage
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const levelFilter = searchParams.get('level'); // optional: 'all' or a number

  // Get current user's profile to find family
  const profile = await prisma.profile.findUnique({
    where: { id: session.user.id },
    include: { family: true },
  });
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  // Get all children in the family
  const children = await prisma.profile.findMany({
    where: { familyId: profile.familyId, role: 'STUDENT' },
    select: { id: true, name: true, avatar: true, age: true, grade: true },
  });

  // Get their active student plans
  const studentPlans = await prisma.studentPlan.findMany({
    where: { profileId: { in: children.map(c => c.id) }, isActive: true },
    select: { id: true, profileId: true, level: true, knownTopics: true, skippedTopics: true },
  });

  // Build topic → children mapping
  const planByProfile: Record<string, { level: number; knownTopics: string[]; skippedTopics: string[] }> = {};
  for (const sp of studentPlans) {
    planByProfile[sp.profileId] = {
      level: sp.level,
      knownTopics: JSON.parse(sp.knownTopics || '[]') as string[],
      skippedTopics: JSON.parse(sp.skippedTopics || '[]') as string[],
    };
  }

  // Get all DailyPlanTasks for these student plans to see status per topic
  const planIds = studentPlans.map(sp => sp.id);
  const recentTasks = await prisma.dailyPlanTask.findMany({
    where: {
      dailyPlan: { studentPlanId: { in: planIds } },
    },
    select: { topicId: true, status: true, dailyPlan: { select: { studentPlan: { select: { profileId: true } } } } },
    orderBy: { dailyPlan: { date: 'desc' } },
  });

  // Build topic → per-child status map
  // statuses: 'pending' | 'completed' | 'skipped' | 'not-needed' | 'carried-over'
  const topicChildStatus: Record<string, Record<string, string>> = {};
  for (const task of recentTasks) {
    const pid = task.dailyPlan.studentPlan.profileId;
    if (!topicChildStatus[task.topicId]) topicChildStatus[task.topicId] = {};
    // Keep the most recent status
    topicChildStatus[task.topicId][pid] = task.status;
  }

  // Fetch curriculum topics
  const whereClause: any = {};
  if (levelFilter && levelFilter !== 'all') {
    const level = parseInt(levelFilter, 10);
    if (!isNaN(level)) {
      whereClause.level = { in: [level, Math.max(0, level - 1)] };
    }
  }

  const topics = await prisma.curriculumTopic.findMany({
    where: whereClause,
    orderBy: [{ level: 'asc' }, { subject: 'asc' }, { strand: 'asc' }, { title: 'asc' }],
  });

  // Build response: topics with per-child coverage
  const topicData = topics.map(t => {
    const childCoverage: Record<string, { inPlan: boolean; status: string | null }> = {};
    for (const child of children) {
      const plan = planByProfile[child.id];
      if (!plan) {
        childCoverage[child.id] = { inPlan: false, status: null };
        continue;
      }

      const isKnown = plan.knownTopics.includes(t.id);
      const isSkipped = plan.skippedTopics.includes(t.id);
      const taskStatus = topicChildStatus[t.id]?.[child.id] || null;

      childCoverage[child.id] = {
        inPlan: !isKnown && !isSkipped,
        status: taskStatus,
      };
    }

    const info = SUBJECT_INFO[t.subject] || { name: t.subject, icon: '📚' };
    return {
      ...t,
      subjectDisplay: info.name,
      subjectIcon: info.icon,
      childCoverage,
    };
  });

  // Get available levels from data
  const levels = Array.from(new Set(topics.map(t => t.level))).sort((a, b) => a - b);

  return NextResponse.json({
    topics: topicData,
    children,
    levels,
    totalTopics: topics.length,
  });
}

// PATCH /api/syllabus — Toggle a topic for a child
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { profileId, topicId, action } = body; // action: 'add' | 'remove' | 'known'

  if (!profileId || !topicId || !action) {
    return NextResponse.json({ error: 'Missing required fields: profileId, topicId, action' }, { status: 400 });
  }

  // Validate action
  if (!['add', 'remove', 'known'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action. Must be add, remove, or known' }, { status: 400 });
  }

  // Find the child's active student plan
  const studentPlan = await prisma.studentPlan.findFirst({
    where: { profileId, isActive: true },
    orderBy: { createdAt: 'desc' },
  });

  if (!studentPlan) {
    return NextResponse.json({ error: 'No active plan found for this student' }, { status: 404 });
  }

  // Get current data
  const knownTopics: string[] = JSON.parse(studentPlan.knownTopics || '[]');
  const skippedTopics: string[] = JSON.parse(studentPlan.skippedTopics || '[]');

  if (action === 'remove') {
    // Mark as skipped — remove from knownTopics if present, add to skippedTopics
    const newKnown = knownTopics.filter(id => id !== topicId);
    if (!skippedTopics.includes(topicId)) {
      skippedTopics.push(topicId);
    }

    // Also mark existing future tasks for this topic as 'not-needed'
    await prisma.dailyPlanTask.updateMany({
      where: {
        topicId,
        dailyPlan: { studentPlanId: studentPlan.id },
        status: 'pending',
      },
      data: { status: 'not-needed' },
    });

    await prisma.studentPlan.update({
      where: { id: studentPlan.id },
      data: {
        knownTopics: JSON.stringify(newKnown),
        skippedTopics: JSON.stringify(skippedTopics),
      },
    });

    return NextResponse.json({ success: true, action: 'removed', topicId });
  }

  if (action === 'known') {
    // Mark as already known (skip from plan)
    if (!knownTopics.includes(topicId)) {
      knownTopics.push(topicId);
    }
    const newSkipped = skippedTopics.filter(id => id !== topicId);

    // Mark future pending tasks as 'not-needed'
    await prisma.dailyPlanTask.updateMany({
      where: {
        topicId,
        dailyPlan: { studentPlanId: studentPlan.id },
        status: 'pending',
      },
      data: { status: 'not-needed' },
    });

    await prisma.studentPlan.update({
      where: { id: studentPlan.id },
      data: {
        knownTopics: JSON.stringify(knownTopics),
        skippedTopics: JSON.stringify(newSkipped),
      },
    });

    return NextResponse.json({ success: true, action: 'marked-known', topicId });
  }

  if (action === 'add') {
    // Re-add — remove from knownTopics and skippedTopics
    const newKnown = knownTopics.filter(id => id !== topicId);
    const newSkipped = skippedTopics.filter(id => id !== topicId);

    await prisma.studentPlan.update({
      where: { id: studentPlan.id },
      data: {
        knownTopics: JSON.stringify(newKnown),
        skippedTopics: JSON.stringify(newSkipped),
      },
    });

    return NextResponse.json({ success: true, action: 'added', topicId, note: 'Regenerate future plans for this change to take effect in daily tasks' });
  }

  return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
}
