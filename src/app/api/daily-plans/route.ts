import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateTaskStatus, getTodayPlan } from '@/lib/daily-planner';

// GET /api/daily-plans — Get today's plan for the logged-in student
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.profileId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const plan = await getTodayPlan(session.user.profileId);
  return NextResponse.json({ plan });
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

  const validStatuses = ['completed', 'skipped', 'not-needed'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const updated = await updateTaskStatus(taskId, status as 'completed' | 'skipped' | 'not-needed', feedback);
  return NextResponse.json({ task: updated });
}
