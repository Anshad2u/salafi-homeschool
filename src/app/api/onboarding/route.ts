import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateYearlyPlan, savePlanToDb } from '@/lib/daily-planner';

// POST /api/onboarding — Create a student plan
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { profileId, age, knownTopicIds = [], startDate } = body;

  // Age to level mapping
  const ageLevelMap: Record<number, number> = {
    0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 6,
  };
  const level = ageLevelMap[age] ?? 3;
  const actualStartDate = startDate || new Date().toISOString().split('T')[0];

  // Create the student plan
  const plan = await prisma.studentPlan.create({
    data: {
      profileId,
      startDate: actualStartDate,
      onboardingAge: age,
      level,
      knownTopics: JSON.stringify(knownTopicIds),
      skippedTopics: '[]',
    },
  });

  // Generate the 365-day plan
  const yearlyPlan = await generateYearlyPlan(plan.id, actualStartDate, knownTopicIds);

  // Save to database
  await savePlanToDb(plan.id, yearlyPlan);

  return NextResponse.json({
    planId: plan.id,
    totalDays: yearlyPlan.length,
    totalTasks: yearlyPlan.reduce((sum: number, d: any) => sum + d.tasks.length, 0),
    firstDay: yearlyPlan[0],
  });
}

// GET /api/onboarding — Get current student plan info
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const plans = await prisma.studentPlan.findMany({
    where: { profileId: session.user.id },
    include: {
      dailyPlans: {
        take: 1,
        orderBy: { date: 'desc' },
        include: { tasks: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ plans });
}
