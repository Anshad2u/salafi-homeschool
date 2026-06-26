import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedTajweed() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='tajweed'"
  );
  if (Number(existing[0]?.cnt ?? 0) > 0) {
    console.log('  Tajweed topics already exist — skipping.');
    return;
  }
  console.log('Seeding tajweed curriculum...');

  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tj-001','tajweed','tajweed-foundations',0,'0-1','Listening to Quran at home','Play Quran recitation daily so baby absorbs the melodies. Start with Surah Ar-Rahman, Al-Mulk, and Al-Fatiha.','introduction',7,'["listening"]','[""]','Quran audio player'),
('tj-002','tajweed','tajweed-foundations',0,'0-1','Quran vs normal speech','Play Quran and then normal speech — baby begins to notice the difference in tone and rhythm.','introduction',3,'["auditory"]','[""]','audio clips'),
('tj-003','tajweed','tajweed-foundations',1,'1-2','Singing nasheeds','Listen to simple Islamic nasheeds with clear pronunciation. Develops ear for Arabic sounds.','introduction',5,'["listening","verbal"]','["tj-001"]','nasheed collection'),
('tj-004','tajweed','tajweed-foundations',1,'1-2','Repeating short phrases','Repeat after parent: Bismillah, Alhamdulillah, SubhanAllah. Builds pronunciation foundation.','practice',5,'["verbal"]','["tj-002"]','parent modeling'),
('tj-005','tajweed','tajweed-foundations',2,'2-3','Recognizing Arabic letters by sound','Listen to each Arabic letter and identify it. Focus on distinguishing similar sounds (ب/ت/ث).','introduction',3,'["auditory","visual"]','["tj-004"]','letter audio cards'),
('tj-006','tajweed','tajweed-foundations',2,'2-3','Harakat: Fatha, Kasra, Damma','Learn the three short vowels. Alif with fatha = aa, Ya with kasra = ee, Waw with damma = oo.','introduction',3,'["visual","verbal"]','["tj-005"]','harakat worksheet'),
('tj-007','tajweed','tajweed-makharij',2,'2-3','Makharij of Arabic letters overview','Introduction to where sounds come from: throat (ح, ع, غ), tongue tip (ت, د, ط), lips (ب, م, ف).','introduction',2,'["visual","verbal"]','["tj-005"]','mouth diagram, mirror'),
('tj-008','tajweed','tajweed-makharij',3,'3-4','Makharij — Throat letters','Learn the 6 throat letters: ه, ح, خ (deep) and ع, غ, ق (shallow). Practice each with correct throat position.','practice',3,'["verbal","hands-on"]','["tj-007"]','mirror, throat chart'),
('tj-009','tajweed','tajweed-makharij',3,'3-4','Makharij — Tongue letters','Learn tongue-tip letters: ت, ط, د, ض, ل, ن, ر. Tongue-mid: ك, ق, ج, ش, ص, س, ز. Tongue-back: ص, ض, ط, ظ.','practice',3,'["verbal","hands-on"]','["tj-007"]','mirror, tongue position chart'),
('tj-010','tajweed','tajweed-makharij',3,'3-4','Makharij — Lip letters','Learn lip letters: ب, م, ف, و. Practice rounding and pressing lips correctly.','practice',2,'["verbal"]','["tj-007"]','mirror'),
('tj-011','tajweed','tajweed-makharij',3,'3-4','Ghunnah — nasal sound','Learn ghunnah: a nasal resonance that comes from the nose. It appears in noon meem mushaddad and tanween.','practice',2,'["verbal"]','["tj-008"]','ghunnah audio examples'),
('tj-012','tajweed','tajweed-noon-meem',3,'3-4','Noon Sakinah — 4 rules intro','Learn that noon sakinah (noon with sukun) and tanween have 4 possible tajweed rules depending on the following letter.','introduction',3,'["verbal","visual"]','["tj-011"]','noon sakinah chart'),
('tj-013','tajweed','tajweed-noon-meem',3,'3-4','Izhar — 6 throat letters','Noon sakinah stays clear (no ghunnah) before: ه, ح, خ, ع, غ, ق. Example: مِنْ عِلْمٍ.','practice',3,'["verbal"]','["tj-012"]','practice sheet'),
('tj-014','tajweed','tajweed-noon-meem',3,'3-4','Idgham — 6 letters','Noon sakinah merges with next letter (with ghunnah for 4 letters, without for 2). Letters: ي, ر, م, ل, و, ن. Example: مِنْ يَوْمٍ = مِنْيَوْمٍ.','practice',3,'["verbal"]','["tj-012"]','practice sheet'),
('tj-015','tajweed','tajweed-noon-meem',3,'3-4','Ikhfa — 15 letters','Noon sakinah is hidden (ghunnah) before 15 letters. Example: مِنْ قَوْمٍ = مِنْقَوْمٍ (with nasal sound).','practice',3,'["verbal"]','["tj-012"]','practice sheet, ikhfa list'),
('tj-016','tajweed','tajweed-noon-meem',3,'3-4','Iqlab — letter ب only','Noon sakinah becomes meem before ب. Example: مِنْ بَعْدِ = مِمْ بَعْدِ. Ghunnah on the meem.','practice',2,'["verbal"]','["tj-012"]','practice sheet'),
('tj-017','tajweed','tajweed-meem',4,'4-5','Meem Sakinah — 3 rules','Learn the 3 rules: Idgham shafawi (before ب), Ikhfa shafawi (before 6 letters), Izhar shafawi (before remaining).','practice',3,'["verbal","visual"]','["tj-016"]','meem sakinah chart'),
('tj-018','tajweed','tajweed-madd',4,'4-5','Madd — Natural (2 counts)','Alif with fatha = 2 counts of elongation. The natural madd is the baseline length. Example: قَالَ.','practice',3,'["verbal"]','["tj-006"]','madd chart, audio'),
('tj-019','tajweed','tajweed-madd',4,'4-5','Madd — Required (4-5 counts)','Madd lazim — must elongate 4-5 counts. Occurs in hamzah, sukun, or shaddah situations. Example: آمَنُوا.','practice',3,'["verbal"]','["tj-018"]','practice sheet'),
('tj-020','tajweed','tajweed-madd',4,'4-5','Madd — Permitted (2 or 4-5 counts)','Madd munfasil — can extend 2 counts or 4-5 counts. Between hamzah of two words. Example: جَاءَ أَمْرُ.','practice',2,'["verbal"]','["tj-018"]','practice sheet'),
('tj-021','tajweed','tajweed-qalqalah',4,'4-5','Qalqalah — echo sound','Five letters produce echo when sukun follows: ب, ت, ج, د, ق. Example: قُلْ (the ل echoes). Small qalqalah in middle, big at end of word.','practice',3,'["verbal"]','["tj-008"]','qalqalah audio, practice sheet'),
('tj-022','tajweed','tajweed-lam',5,'5-6','Lam Shamsiyyah vs Qamariyyah','Shamsi (solar): lam assimilates with next letter (الشَّمْسِ). Qamari (lunar): lam stays clear (الْقَمَرِ). 14 letters each.','practice',3,'["verbal","visual"]','["tj-008"]','lam chart'),
('tj-023','tajweed','tajweed-hamza',5,'5-6','Hamzatul Wasl vs Hamzatul Qata','Wasl: connects when preceded by word (بِسْمِ). Qata: always pronounced with hamzah (قَالَ). Practice both types.','practice',3,'["verbal"]','["tj-006"]','practice sheet'),
('tj-024','tajweed','tajweed-advanced',5,'5-6','Advanced makharij — Ain and Ghain','Ain: mid-throat, constricted. Ghain: deep-throat, nasal. Practice distinguishing and producing both.','practice',2,'["verbal","hands-on"]','["tj-008"]','mirror, audio examples'),
('tj-025','tajweed','tajweed-advanced',5,'5-6','Madd Lazim Kalimi vs Harfi','Kalimi: in words like آدَمَ (4-5 counts). Harfi: in letter names like الٓمٓ (6 counts mandatory). Different rules.','practice',2,'["verbal"]','["tj-019"]','practice sheet'),
('tj-026','tajweed','tajweed-waqf',6,'6-7','Waqf — stopping rules','Know where to stop: mandatory stops, recommended stops, and places to avoid stopping. Practice reading and stopping correctly.','practice',3,'["verbal"]','["tj-022"]','mushaf, stopping marks'),
('tj-027','tajweed','tajweed-waqf',6,'6-7','Ibtida — starting after stop','After stopping on a word, how to start the next: start with hamzah if word begins with it, or with wasl.','practice',2,'["verbal"]','["tj-026"]','mushaf'),
('tj-028','tajweed','tajweed-mastery',6,'6-7','Full tajweed recitation practice','Recite a complete page from Juz Amma applying ALL tajweed rules learned: makharij, noon/meem, madd, qalqalah, waqf.','practice',4,'["verbal"]','["tj-026","tj-021","tj-015"]','mushaf, audio reference'),
('tj-029','tajweed','tajweed-mastery',6,'6-7','Tajweed assessment — read and self-correct','Record yourself reciting Surah Al-Mulk. Play back and identify mistakes. Compare with Qari recordings.','mastery',3,'["verbal"]','["tj-028"]','recording device, Qari audio'),
('tj-030','tajweed','tajweed-mastery',6,'6-7','Memorize tajweed rules summary','Create a personal tajweed cheat sheet with all rules: makharij, noon sakinah, meem sakinah, madd, qalqalah, waqf.','mastery',3,'["verbal","visual"]','["tj-028"]','paper, markers, reference books')`);

  console.log('  Seeded 30 tajweed topics (tj-001 to tj-030)');
}
