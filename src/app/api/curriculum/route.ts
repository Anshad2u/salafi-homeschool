import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/curriculum?level=3 — Get topics for a given level
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = parseInt(searchParams.get('level') || '3', 10);

  const topics = await prisma.curriculumTopic.findMany({
    where: {
      level: { in: [Math.max(0, level - 1), level] },
    },
    orderBy: [{ subject: 'asc' }, { level: 'asc' }, { title: 'asc' }],
  });

  return NextResponse.json({ topics, count: topics.length });
}
