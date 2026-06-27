import { seedEQEnhanced } from './curriculum-eq-enhanced';
import { seedHomeScienceEnhanced } from './curriculum-home-science-enhanced';
import { seedSeerahEnhanced } from './curriculum-seerah-enhanced';
import { seedFiqhEnhanced } from './curriculum-fiqh-enhanced';
import { seedAqeedahEnhanced } from './curriculum-aqeedah-enhanced';
import { seedTajweedEnhanced } from './curriculum-tajweed-enhanced';
import { seedArabicESL } from './curriculum-arabic-esl';
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
  
  // Arabic comprehensive expansion (Gateway to Arabic, Qaidah Nooraniah, I Love Arabic)
  await seedArabicESL();
  
  // Tajweed & Quran comprehensive expansion
  await seedTajweedEnhanced();
  
  // Aqeedah comprehensive expansion (3 Fundamentals, Nawaaqid, Shirk, Iman, Qadr)
  await seedAqeedahEnhanced();
  
  // Fiqh comprehensive expansion
  await seedFiqhEnhanced();
  
  // Seerah comprehensive expansion (Ibn Ishaq, Ibn Hisham, Ibn Kathir, Shama'il)
  await seedSeerahEnhanced();
  
  // Home Science comprehensive expansion (nutrition, cooking, first aid, household, safety, hygiene)
  await seedHomeScienceEnhanced();
  
  // Emotional Intelligence comprehensive expansion (friendship, coping, empathy, boundaries, digital)
  await seedEQEnhanced();

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
