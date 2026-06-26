import { seedTajweed } from './curriculum-tajweed';
import { seedTafsir } from './curriculum-tafsir';
import { seedArabic } from './curriculum-arabic';
import { seedAkhlaq } from './curriculum-akhlaq';
import { seedQuranMemorization } from './curriculum-quran-mem';
import { seedCoreCurriculum } from './curriculum-core';

async function main() {
  console.log('=== Seeding ALL curriculum subjects ===');
  
  // Core subjects (Quran, English, Math, Science, etc.)
  await seedCoreCurriculum();
  
  // Islamic subjects
  await seedTajweed();
  await seedTafsir();
  await seedArabic();
  await seedAkhlaq();
  await seedQuranMemorization();
  
  console.log('=== All curriculum seeded successfully! ===');
}

main().catch(console.error);
