import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedCoreCurriculum() {
  console.log('Checking if core curriculum already exists...');
  
  const rows = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    'SELECT COUNT(*) as cnt FROM "CurriculumTopic"'
  );
  const cnt = Number(rows[0]?.cnt ?? 0);
  
  if (cnt > 0) {
    console.log('  ' + cnt + ' topics already exist — skipping core seed.');
    return;
  }
  
  console.log('  No topics found. Run the original seed-curriculum.ts first.');
}
