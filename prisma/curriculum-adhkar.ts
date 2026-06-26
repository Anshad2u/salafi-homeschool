import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedAdhkar() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='adhkar'"
  );
  if (Number(existing[0]?.cnt ?? 0) > 0) {
    console.log('  Adhkar/Dua topics already exist — skipping.');
    return;
  }
  console.log('Seeding adhkar/dua curriculum...');

  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('dh-001','adhkar','adhkar-foundation',0,'0-1','Bismillah before eating','Parent says Bismillah before feeding baby. Baby absorbs the routine of starting with Allah''s name before every meal.','introduction',7,'["routine","verbal"]','[""]','mealtime routine'),
('dh-002','adhkar','adhkar-foundation',0,'0-1','Alhamdulillah after eating','Parent says Alhamdulillah after feeding. Baby hears gratitude to Allah after every meal.','introduction',7,'["routine","verbal"]','[""]','mealtime routine'),
('dh-003','adhkar','adhkar-foundation',0,'0-1','Quran as daily adhkar','Play Quran daily — it is the greatest dhikr. Baby absorbs the sounds of Surah Ar-Rahman, Al-Mulk, Al-Fatiha.','introduction',7,'["listening"]','[""]','Quran audio'),
('dh-004','adhkar','adhkar-foundation',1,'1-2','SubhanAllah — glorifying Allah','Learn to say SubhanAllah (Glory be to Allah) when we see beautiful things. Prophet ﷺ said: "Words of purification." (Muslim)','introduction',5,'["verbal"]','["dh-001"]','nature walks, picture cards'),
('dh-005','adhkar','adhkar-foundation',1,'1-2','Alhamdulillah — praising Allah','Learn to say Alhamdulillah (All praise is due to Allah) for everything — food, play, happiness. "The most beloved words to Allah." (Bukhari/Muslim)','introduction',5,'["verbal"]','["dh-002"]','daily routine'),
('dh-006','adhkar','adhkar-foundation',1,'1-2','Allahu Akbar — Allah is Greatest','Learn to say Allahu Akbar (Allah is the Greatest). Say it when we see amazing things, before salah, and in adhkar.','introduction',5,'["verbal"]','["dh-001"]','outdoor walks, prayer mat'),
('dh-007','adhkar','adhkar-foundation',2,'2-3','La ilaha illallah — there is no god but Allah','The most important statement in Islam. Learn to say it with meaning. "It is the best dhikr." (Ahmad)','introduction',5,'["verbal"]','["dh-006"]','repetition practice, nasheed'),
('dh-008','adhkar','adhkar-foundation',2,'2-3','Astaghfirullah — seeking forgiveness','Learn to say Astaghfirullah (I seek forgiveness from Allah) when we make mistakes. "By Allah, I seek forgiveness 100 times a day." (Muslim)','introduction',5,'["verbal"]','["dh-005"]','reflection cards'),
('dh-009','adhkar','adhkar-foundation',2,'2-3','Dua before sleeping','Learn: Bika Allahumma amut wa ahya (In Your name, O Allah, I die and I live). Said before sleeping. (Bukhari)','introduction',3,'["verbal"]','["dh-007"]','bedtime routine'),
('dh-010','adhkar','adhkar-foundation',2,'2-3','Dua when waking up','Learn: Alhamdulillahilladhi ahyana ba''da ma amatana wa ilayhin-nushoor (All praise is due to Allah who gave us life after death). (Bukhari)','introduction',3,'["verbal"]','["dh-009"]','morning routine'),
('dh-011','adhkar','adhkar-foundation',3,'3-4','Ayatul Kursi — the greatest verse','Memorize Ayatul Kursi (Quran 2:255). Prophet ﷺ said: "Whoever recites it before sleeping, Allah will send a guardian angel." (Bukhari/Muslim)','practice',5,'["verbal"]','["dh-007"]','Quran, practice card'),
('dh-012','adhkar','adhkar-foundation',3,'3-4','Surah Al-Falaq and An-Nas — seeking refuge','Memorize both surahs. Prophet ﷺ said: "Recite them morning and evening — they will protect you." (Abu Dawud/Tirmidhi)','practice',5,'["verbal"]','["dh-011"]','Quran'),
('dh-013','adhkar','adhkar-foundation',3,'3-4','Dua before and after eating','Before: Bismillah. After: Alhamdulillahilladhi at''amana wa saqana wa ja''alana muslimin. (Abu Dawud/Tirmidhi)','practice',3,'["verbal"]','["dh-001"]','mealtime chart'),
('dh-014','adhkar','adhkar-foundation',3,'3-4','Dua when entering and leaving mosque','Entering: Allahumma aftah li abwaba rahmatik. Leaving: Allahumma inni as''aluka min fadlik. (Muslim)','practice',3,'["verbal"]','["dh-007"]','mosque visits'),
('dh-015','adhkar','adhkar-foundation',3,'3-4','Dua when leaving home','Bismillahi tawakkaltu ''alallah wa la hawla wa la quwwata illa billah. "It will be said to you: You are guided, protected, and saved." (Abu Dawud/Tirmidhi)','practice',3,'["verbal"]','["dh-007"]','doorway practice'),
('dh-016','adhkar','adhkar-foundation',3,'3-4','Dua when entering home','Enter with Bismillah and salam to family. "When you enter your home, you will find barakah (blessing)." (Muslim)','practice',3,'["verbal"]','["dh-015"]','home routine'),
('dh-017','adhkar','adhkar-morning-evening',4,'4-5','Morning adhkar — overview and importance','Learn that morning adhkar are recited after Fajr before sunrise. Prophet ﷺ said: "Whoever says them will be protected until evening." (Abu Dawud)','introduction',3,'["verbal"]','["dh-011"]','morning routine chart'),
('dh-018','adhkar','adhkar-morning-evening',4,'4-5','Morning adhkar — core phrases','Learn the essential morning adhkar: SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (33x). Plus La ilaha illallah wahdahu la shareeka lah (10x).','practice',5,'["verbal"]','["dh-017"]','dhikr counter, morning chart'),
('dh-019','adhkar','adhkar-morning-evening',4,'4-5','Evening adhkar — core phrases','Same as morning but recited after Asr before Maghrib. Mirror the morning set. "The morning adhkar protect until evening, evening adhkar protect until morning."','practice',5,'["verbal"]','["dh-018"]','evening chart'),
('dh-020','adhkar','adhkar-morning-evening',4,'4-5','Dua for protection — morning and evening','Recite: A''udhu bi kalimatillahit-tammati min sharri ma khalaq (3x). "Whoever says them three times, nothing will harm him." (Muslim)','practice',3,'["verbal"]','["dh-018"]','protection cards'),
('dh-021','adhkar','adhkar-morning-evening',4,'4-5','Ayatul Kursi — morning and evening','Recite after every salah and in morning/evening adhkar. "Nothing prevents Paradise except death." (Muslim)','practice',3,'["verbal"]','["dh-011"]','Quran'),
('dh-022','adhkar','adhkar-morning-evening',4,'4-5','Istighfar — seeking forgiveness morning and evening','Say: Astaghfirullahal-''adheem alladhi la ilaha illa huwal-hayyul-qayyum wa astaghfiruh (3x). (Abu Dawud/Tirmidhi)','practice',3,'["verbal"]','["dh-018"]','forgiveness cards'),
('dh-023','adhkar','adhkar-morning-evening',5,'5-6','Complete morning adhkar set','Full set of morning adhkar from Hisnul Muslim: protection, tawhid, salawat upon Prophet ﷺ, and specific duas. Recite daily after Fajr.','practice',5,'["verbal"]','["dh-018"]','Hisnul Muslim book'),
('dh-024','adhkar','adhkar-morning-evening',5,'5-6','Complete evening adhkar set','Full set of evening adhkar from Hisnul Muslim. Mirror the morning set. Recite daily after Asr.','practice',5,'["verbal"]','["dh-023"]','Hisnul Muslim book'),
('dh-025','adhkar','adhkar-morning-evening',5,'5-6','Salawat upon the Prophet ﷺ','Learn the full salawat: Allahumma salli ''ala Muhammad wa ''ala aali Muhammad. "Whoever sends salah upon me, Allah will send ten upon him." (Muslim)','practice',3,'["verbal"]','["dh-023"]','salawat cards'),
('dh-026','adhkar','adhkar-morning-evening',5,'5-6','Dua before and after wudu','Before: Allahumma ij''alni minat-tawwabeen waj''alni minal-mutatahireen. After: Ashhadu an la ilaha illallah wahdahu la shareeka lah. (Abu Dawud/Tirmidhi)','practice',3,'["verbal"]','["dh-007"]','wudu practice'),
('dh-027','adhkar','adhkar-morning-evening',6,'6-7','Adhkar of the day — hourly remembrance','Learn to say SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (33x) throughout the day. "Like a charity for every creation." (Muslim)','practice',5,'["verbal"]','["dh-023"]','dhikr schedule'),
('dh-028','adhkar','adhkar-morning-evening',6,'6-7','Dua for distress — la hawla wa la quwwata illa billah','"La hawla wa la quwwata illa billah" — There is no power nor strength except with Allah. "It is a treasure from the treasures of Paradise." (Bukhari/Muslim)','practice',3,'["verbal"]','["dh-007"]','distress cards'),
('dh-029','adhkar','adhkar-morning-evening',6,'6-7','Dua when it rains — dua of Istisqa''','Learn the dua for rain: Allahumma sayyiban nafi''a. "O Allah, make it a beneficial rain." (Bukhari/Muslim)','practice',2,'["verbal"]','["dh-023"]','rainy day lesson'),
('dh-030','adhkar','adhkar-morning-evening',6,'6-7','Dua when traveling — safar dua','Learn: Subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrineen. "Glory be to Him who has subjected this to us." (Muslim)','practice',2,'["verbal"]','["dh-023"]','travel practice'),
('dh-031','adhkar','adhkar-morning-evening',6,'6-7','Dua for parents — dua for Ummi','Learn: Rabbirhamhuma kama rabbayani sagheera. "My Lord, have mercy on them as they raised me when I was small." (Quran 17:24)','practice',3,'["verbal"]','["dh-023"]','Quran, family discussion'),
('dh-032','adhkar','adhkar-morning-evening',6,'6-7','Dua for knowledge — Rabbi zidni ilma','Learn: Rabbi zidni ilma. "My Lord, increase me in knowledge." (Quran 20:114) The Prophet ﷺ would say this frequently.','practice',3,'["verbal"]','["dh-023"]','Quran, study routine')`);

  console.log('  Seeded 32 adhkar/dua topics (dh-001 to dh-032)');
}
