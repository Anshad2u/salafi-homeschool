import { seedTajweed } from './curriculum-tajweed';
import { seedTafsir } from './curriculum-tafsir';
import { seedArabic } from './curriculum-arabic';
import { seedAkhlaq } from './curriculum-akhlaq';
import { seedQuranMemorization } from './curriculum-quran-mem';
import { seedIslamicCurriculum } from './curriculum-islamic';
import { seedAdhkar } from './curriculum-adhkar';
import { seedMuttoon } from './curriculum-muttoon';
import { seedCoding } from './curriculum-coding';
import { seedComputer } from './curriculum-computer';
import { seedHomeScience } from './curriculum-home-science';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== Seeding all new curriculum subjects ===');
  
  // Islamic subjects
  await seedTajweed();
  await seedTafsir();
  await seedArabic();
  await seedAkhlaq();
  await seedQuranMemorization();
  await seedIslamicCurriculum();
  
  // New subjects
  await seedAdhkar();
  await seedMuttoon();
  await seedCoding();
  await seedComputer();
  await seedHomeScience();
  
  const count = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    'SELECT COUNT(*) as cnt FROM "CurriculumTopic"'
  );
  console.log('Total topics in DB: ' + Number(count[0]?.cnt ?? 0));
  
  await prisma.$disconnect();
  console.log('=== Done! ===');
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
