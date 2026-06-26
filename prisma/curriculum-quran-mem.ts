import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedQuranMemorization() {
    const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
      "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='quran' AND strand='quran-memorization'"
    );
    if (Number(existing[0]?.cnt ?? 0) > 0) {
      console.log('  Seeding Quran topics already exist — skipping.');
      return;
    }
  5|  console.log('Seeding Quran memorization curriculum...');

  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('qm-001','quran','quran-memorization',0,'0-1','Surah Al-Fatiha — listening exposure','Parent recites Al-Fatiha daily during salah. Baby hears it 17 times a day minimum. Absorb the sound and melody.','introduction',7,'["listening"]','[""]','Quran audio, prayer mat'),
('qm-002','quran','quran-memorization',0,'0-1','Surah An-Nas — listening exposure','Play Surah An-Nas (114) regularly. Baby becomes familiar with its rhythm and cadence.','introduction',7,'["listening"]','[""]','Quran audio'),
('qm-003','quran','quran-memorization',0,'0-1','Surah Al-Falaq — listening exposure','Play Surah Al-Falaq (113) — the chapter of seeking refuge with Allah from evil.','introduction',7,'["listening"]','[""]','Quran audio'),
('qm-004','quran','quran-memorization',1,'1-2','Surah Al-Fatiha — parent-led recitation','Parent recites Al-Fatiha while child listens and begins to repeat after first 3 verses.','practice',5,'["verbal"]','["qm-001"]','Quran, repetition'),
('qm-005','quran','quran-memorization',1,'1-2','Surah An-Nas — first attempts','Child tries to repeat "Qul a''uzu bi rabbin nas" after parent. Celebrate every effort.','practice',5,'["verbal"]','["qm-002"]','Quran'),
('qm-006','quran','quran-memorization',1,'1-2','Surah Al-Ikhlas — memorization','Memorize the shortest surah: "Qul huwallahu ahad" (4 verses). Teach that it equals 1/3 of the Quran in reward.','practice',5,'["verbal"]','["qm-004"]','Quran'),
('qm-007','quran','quran-memorization',2,'2-3','Surah Al-Falaq — memorization','Memorize: "Qul a''uzu bi rabbil-falaq" (5 verses). Seek refuge with Allah from evil.','practice',4,'["verbal"]','["qm-006"]','Quran'),
('qm-008','quran','quran-memorization',2,'2-3','Surah An-Nas — memorization','Memorize: "Qul a''uzu bi rabbin-nas" (6 verses). Seek refuge with Allah from whispering Shaytan.','practice',4,'["verbal"]','["qm-007"]','Quran'),
('qm-009','quran','quran-memorization',2,'2-3','Surah Al-Kafirun — memorization','"La u''dinu ma tu''dun" (6 verses). To you your religion, to me mine. No compromise in Tawhid.','practice',4,'["verbal"]','["qm-008"]','Quran'),
('qm-010','quran','quran-memorization',2,'2-3','Surah An-Nasr — memorization','"Idha ja''a nasrullah" (3 verses). When victory comes, glorify Allah and seek forgiveness.','practice',3,'["verbal"]','["qm-009"]','Quran'),
('qm-011','quran','quran-memorization',3,'3-4','Surah Al-Masad — memorization','"Tabbat yada abi lahab" (5 verses). Story of Abu Lahab — consequence of opposing Islam.','practice',4,'["verbal"]','["qm-010"]','Quran'),
('qm-012','quran','quran-memorization',3,'3-4','Surah Al-Qariah — memorization','"Al-Qariah" (11 verses). The Striking Hour — people scattered like moths, weighed on the scale.','practice',4,'["verbal"]','["qm-011"]','Quran'),
('qm-013','quran','quran-memorization',3,'3-4','Surah At-Takathur — memorization','"Al-takathur" (8 verses). Competition for more wealth distracts from the truth.','practice',4,'["verbal"]','["qm-012"]','Quran'),
('qm-014','quran','quran-memorization',3,'3-4','Surah Al-Adiyat — memorization','"Al-adiyat" (11 verses). By galloping horses — humans are ungrateful to Allah.','practice',4,'["verbal"]','["qm-013"]','Quran'),
('qm-015','quran','quran-memorization',3,'3-4','Surah Al-Qariah — memorization and review','Full review of Al-Qariah, At-Takathur, and Al-Adiyat. Recite from mushaf with proper tajweed.','practice',4,'["verbal"]','["qm-014"]','Quran mushaf'),
('qm-016','quran','quran-memorization',4,'4-5','Surah Al-A''la — memorization','"Sabbihisma rabbikal a''la" (19 verses). Glorify the name of your Lord, the Most High.','practice',4,'["verbal"]','["qm-015"]','Quran'),
('qm-017','quran','quran-memorization',4,'4-5','Surah Al-Ghashiyah — memorization','"Al-ghashiyah" (26 verses). The overwhelming event — humble faces, tired and thirsty.','practice',4,'["verbal"]','["qm-016"]','Quran'),
('qm-018','quran','quran-memorization',4,'4-5','Surah Al-Fajr — memorization','"Wal-fajr" (30 verses). By the dawn and ten nights — be patient and worship your Lord.','practice',4,'["verbal"]','["qm-017"]','Quran'),
('qm-019','quran','quran-memorization',4,'4-5','Surah Al-Balad — memorization','"Wal-balad" (20 verses). By this city — Allah created man to strive. Two paths: gratitude vs ingratitude.','practice',4,'["verbal"]','["qm-018"]','Quran'),
('qm-020','quran','quran-memorization',4,'4-5','Surah Ash-Shams — memorization','"Wash-shams" (15 verses). By the sun and its brightness — Allah showed truth from falsehood.','practice',4,'["verbal"]','["qm-019"]','Quran'),
('qm-021','quran','quran-memorization',5,'5-6','Surah Al-Layl — memorization','"Wal-layl" (21 verses). By the night and day — Allah made them as signs.','practice',4,'["verbal"]','["qm-020"]','Quran'),
('qm-022','quran','quran-memorization',5,'5-6','Surah Ad-Duha — memorization','"Wad-duha" (11 verses). By the morning light — your Lord has not abandoned you.','practice',4,'["verbal"]','["qm-021"]','Quran'),
('qm-023','quran','quran-memorization',5,'5-6','Surah Ash-Sharh — memorization','"Alam nashrah" (8 verses). Did We not expand your breast? After hardship comes ease.','practice',4,'["verbal"]','["qm-022"]','Quran'),
('qm-024','quran','quran-memorization',5,'5-6','Surah At-Tin — memorization','"Wat-tin" (8 verses). By the fig and olive — Allah created man in the best form.','practice',4,'["verbal"]','["qm-023"]','Quran'),
('qm-025','quran','quran-memorization',5,'5-6','Surah Al-Alaq — memorization','"Iqra bismi rabbik" (19 verses). The first revelation — "Read in the name of your Lord."','practice',4,'["verbal"]','["qm-024"]','Quran'),
('qm-026','quran','quran-memorization',6,'6-7','Surah Al-Qadr — memorization','"Inna anzalnahu" (5 verses). The Night of Power — better than 1000 months.','practice',3,'["verbal"]','["qm-025"]','Quran'),
('qm-027','quran','quran-memorization',6,'6-7','Surah Al-Bayyinah — memorization','"Lam yakunilladhina kafaru" (8 verses). The clear proof — disbelievers until clear evidence comes.','practice',4,'["verbal"]','["qm-026"]','Quran'),
('qm-028','quran','quran-memorization',6,'6-7','Surah Az-Zalzalah — memorization','"Iza zulzilatil ard" (8 verses). The earth will shake — every atom of good and evil will be weighed.','practice',4,'["verbal"]','["qm-027"]','Quran'),
('qm-029','quran','quran-memorization',6,'6-7','Review: Juz Amma — first 10 surahs','Comprehensive review of surahs 108-114 plus Al-Qariah, At-Takathur, Al-Adiyat. Recite with tajweed.','practice',5,'["verbal"]','["qm-028"]','Quran mushaf, tajweed checklist'),
('qm-030','quran','quran-memorization',6,'6-7','Review: Juz Amma — second 5 surahs','Review surahs 99-104: Az-Zalzalah through Al-Masad. Recite from memory with proper pronunciation.','practice',5,'["verbal"]','["qm-029"]','Quran mushaf')`);

  console.log('  Seeded 30 Quran memorization topics (qm-001 to qm-030)');
}
