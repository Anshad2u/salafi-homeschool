import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateTaskStatus, getTodayPlan } from '@/lib/daily-planner';

// GET /api/daily-plans?profileId=xxx&date=2026-06-13
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.profileId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const profileId = searchParams.get('profileId') || session.user.profileId;
  const date = searchParams.get('date');

  if (!date) {
    // Default to today's plan for the student
    const plan = await getTodayPlan(profileId);
    return NextResponse.json({ plan });
  }

  // Find the active plan for this student
  const studentPlan = await prisma.studentPlan.findFirst({
    where: { profileId, isActive: true },
    orderBy: { createdAt: 'desc' },
  });
  if (!studentPlan) return NextResponse.json({ plan: null });

  // Get the plan for this specific date
  let dailyPlan = await prisma.dailyPlan.findUnique({
    where: { studentPlanId_date: { studentPlanId: studentPlan.id, date } },
    include: {
      tasks: {
        include: { topic: true },
        orderBy: { subject: 'asc' },
      },
    },
  });

  // If no plan for this date, check for overdue tasks from previous days
  if (!dailyPlan) {
    const previousPlan = await prisma.dailyPlan.findFirst({
      where: {
        studentPlanId: studentPlan.id,
        date: { lt: date },
      },
      orderBy: { date: 'desc' },
      include: { tasks: true },
    });

    if (previousPlan) {
      const overdueTasks = previousPlan.tasks.filter(t => t.status === 'pending' || t.status === 'carried-over');
      if (overdueTasks.length > 0) {
        const dayNumber = previousPlan.dayNumber + 1;
        dailyPlan = await prisma.dailyPlan.create({
          data: {
            studentPlanId: studentPlan.id,
            date,
            dayNumber,
          },
          include: { tasks: { include: { topic: true }, orderBy: { subject: 'asc' } } },
        });

        const planId = dailyPlan.id;
        await prisma.dailyPlanTask.createMany({
          data: overdueTasks.map(t => ({
            dailyPlanId: planId,
            topicId: t.topicId,
            subject: t.subject,
            status: 'carried-over',
          })),
        });

        // Refresh
        dailyPlan = await prisma.dailyPlan.findUnique({
          where: { id: dailyPlan.id },
          include: { tasks: { include: { topic: true }, orderBy: { subject: 'asc' } } },
        });
      }
    }
  }

  return NextResponse.json({ plan: dailyPlan });
}

// PATCH /api/daily-plans — Update a task's status
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.profileId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { taskId, status, feedback } = body;

  if (!taskId || !status) {
    return NextResponse.json({ error: 'Missing taskId or status' }, { status: 400 });
  }

  const validStatuses = ['completed', 'skipped', 'not-needed', 'pending'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const updated = await updateTaskStatus(taskId, status as 'completed' | 'skipped' | 'not-needed', feedback);
  return NextResponse.json({ task: updated });
}
