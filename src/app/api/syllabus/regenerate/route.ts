import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateYearlyPlan, savePlanToDb } from '@/lib/daily-planner';

// POST /api/syllabus/regenerate — Regenerate future daily plans for a child
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { profileId } = body;

  if (!profileId) {
    return NextResponse.json({ error: 'Missing profileId' }, { status: 400 });
  }

  // Find the active student plan
  const studentPlan = await prisma.studentPlan.findFirst({
    where: { profileId, isActive: true },
    orderBy: { createdAt: 'desc' },
  });

  if (!studentPlan) {
    return NextResponse.json({ error: 'No active plan found for this student' }, { status: 404 });
  }

  // Get today's date
  const today = new Date().toISOString().split('T')[0];

  // Delete ALL future daily plans (from tomorrow onwards)
  const deleted = await prisma.dailyPlan.deleteMany({
    where: {
      studentPlanId: studentPlan.id,
      date: { gt: today }, // strictly future days
    },
  });

  // Also delete today's plan if it hasn't been started (no completed tasks)
  const todayPlan = await prisma.dailyPlan.findUnique({
    where: { studentPlanId_date: { studentPlanId: studentPlan.id, date: today } },
    include: { tasks: { where: { status: 'completed' }, take: 1 } },
  });

  if (todayPlan && todayPlan.tasks.length === 0) {
    // No completed tasks today — safe to regenerate today too
    await prisma.dailyPlan.delete({
      where: { id: todayPlan.id },
    });
  }

  // Determine which topics are known (knownTopics) and which are manually skipped (skippedTopics)
  const knownTopicIds: string[] = JSON.parse(studentPlan.knownTopics || '[]');
  const skippedTopicIds: string[] = JSON.parse(studentPlan.skippedTopics || '[]');
  const allExcluded = Array.from(new Set([...knownTopicIds, ...skippedTopicIds]));

  // Regenerate plan from today
  const startDate = today;
  const yearlyPlan = await generateYearlyPlan(studentPlan.id, startDate, allExcluded);

  // Save to DB
  await savePlanToDb(studentPlan.id, yearlyPlan);

  return NextResponse.json({
    success: true,
    deletedDays: deleted.count,
    regeneratedDays: yearlyPlan.length,
    startDate,
    message: `Deleted ${deleted.count} future day(s) and regenerated ${yearlyPlan.length} day(s) from today.`,
  });
}
