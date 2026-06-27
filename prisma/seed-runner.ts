import { seedMathEnhanced } from './curriculum-math-enhanced';
import { seedEnglishESL } from './curriculum-english-esl';
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
import { seedSafety } from './curriculum-safety';
import { seedAkhlaqEQ } from './curriculum-akhlaq-eq';
import { seedEnhancements } from './curriculum-enhancements';
import { seedArabicEnhanced } from './curriculum-arabic-enhanced';
import { seedEnglishEnhanced } from './curriculum-english-enhanced';
import { seedScienceEnhanced } from './curriculum-science-enhanced';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== Seeding all curriculum subjects ===');
  
  // Core Islamic subjects
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
  await seedSafety();
  
  // Science comprehensive expansion (cross-verified with NGSS, UK NC, CBSE, ACARA, Singapore)
  await seedScienceEnhanced();

  // Enhancements
  await seedAkhlaqEQ();
  await seedEnhancements();
  await seedArabicEnhanced();
  await seedEnglishEnhanced();
  
  // ESL English comprehensive expansion (Speaking, Vocabulary, Listening, Spelling, Phonics)
  await seedEnglishESL();
  
  // Math comprehensive expansion (Singapore Math, IXL, UK NC, Montessori, Evan-Moor)
  await seedMathEnhanced();

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
