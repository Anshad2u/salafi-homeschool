import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedArabic() {
    const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
      "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='arabic'"
    );
    if (Number(existing[0]?.cnt ?? 0) > 0) {
      console.log('  Seeding Arabic topics already exist — skipping.');
      return;
    }
  5|  console.log('Seeding Arabic language curriculum...');

  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('ar-001','arabic','arabic-auditory',0,'0-1','Listening to Arabic at home','Play Quran and Arabic nasheeds daily. Baby absorbs Arabic sounds from birth — the melody and rhythm of the language of the Quran.','introduction',7,'["listening"]','[""]','Quran audio, Arabic nasheeds'),
('ar-002','arabic','arabic-auditory',0,'0-1','Arabic lullabies','Sing simple Arabic lullabies and adhkar to baby. Familiarizes with Arabic phonemes from birth.','introduction',7,'["listening","verbal"]','[""]','lullaby collection'),
('ar-003','arabic','arabic-auditory',1,'1-2','Arabic greetings','Say Assalamu Alaikum, Ahlan, Marhaba. Baby begins to recognize common Arabic phrases.','introduction',5,'["verbal"]','["ar-001"]','daily greeting routine'),
('ar-004','arabic','arabic-auditory',1,'1-2','Arabic number words','Say: wahid, ithnayn, thalatha, arba''a, khamsa (1-5). Count objects in Arabic during play.','introduction',3,'["verbal"]','["ar-003"]','counting objects'),
('ar-005','arabic','arabic-alphabet',2,'2-3','Arabic alphabet — first 7 letters','Learn: Alif (ا), Ba (ب), Ta (ت), Tha (ث), Jeem (ج), Ha (خ), Kha (خ). Practice recognition and sounds.','introduction',3,'["visual","verbal"]','["ar-001"]','letter flashcards, poster'),
('ar-006','arabic','arabic-alphabet',2,'2-3','Arabic alphabet — next 7 letters','Learn: Dal (د), Thal (ذ), Ra (ر), Zay (ز), Seen (س), Sheen (ش), Saad (ص). Practice recognition.','introduction',3,'["visual","verbal"]','["ar-005"]','letter flashcards'),
('ar-007','arabic','arabic-alphabet',2,'2-3','Arabic alphabet — next 7 letters','Learn: Daad (ض), Taa (ط), Dhaa (ظ), Ain (ع), Ghain (غ), Faf (ف), Qaf (ق).','introduction',3,'["visual","verbal"]','["ar-006"]','letter flashcards'),
('ar-008','arabic','arabic-alphabet',2,'2-3','Arabic alphabet — final 7 letters','Learn: Kaf (ك), Lam (ل), Meem (م), Noon (ن), Ha (ه), Waw (و), Yaa (ي). Complete alphabet!','introduction',3,'["visual","verbal"]','["ar-007"]','letter flashcards, completion chart'),
('ar-009','arabic','arabic-harakat',2,'2-3','Harakat: Fatha (َ), Kasra (ِ), Damma (ُ)','Three short vowels. Fatha = aa, Kasra = ee, Damma = oo. Practice with Alif, Ba, Ta.','introduction',3,'["visual","verbal"]','["ar-005"]','harakat worksheet'),
('ar-010','arabic','arabic-harakat',2,'2-3','Harakat: Sukun (ْ) and Shadda (ّ)','Sukun = no vowel (stop). Shadda = double consonant (stress). Example: مَدْرَسَة (school).','introduction',2,'["visual","verbal"]','["ar-009"]','practice sheet'),
('ar-011','arabic','arabic-writing',3,'3-4','Writing Arabic letters — isolated form','Practice writing each of the 28 letters in isolated form with correct stroke order. Start with Alif, Ba, Ta.','practice',3,'["hands-on"]','["ar-005"]','tracing worksheets, sand tray, whiteboard'),
('ar-012','arabic','arabic-writing',3,'3-4','Arabic letter forms — initial, medial, final','Each Arabic letter changes shape depending on position: initial (beginning), medial (middle), final (end), or isolated.','practice',3,'["visual","hands-on"]','["ar-011"]','position cards, workbook'),
('ar-013','arabic','arabic-words',3,'3-4','Simple Arabic words — Bismillah','Read: بِسْمِ ٱللَّٰهِ. Understand each letter and harakat. Bismillah = In the name of Allah.','introduction',2,'["verbal","visual"]','["ar-009","ar-011"]','Quran, word cards'),
('ar-014','arabic','arabic-words',3,'3-4','Simple Arabic words — Salam, Khair, Nour','Learn: سلام (peace), خير (good), نور (light). 5-10 common words from Quran.','introduction',2,'["verbal"]','["ar-009"]','word cards, picture matching'),
('ar-015','arabic','arabic-reading',4,'4-5','Joining letters into words','Read simple 3-4 letter Arabic words by joining letters. Example: كِتَاب (book), قَلَم (pen).','practice',3,'["verbal","hands-on"]','["ar-012"]','reading workbook'),
('ar-016','arabic','arabic-reading',4,'4-5','Reading simple Arabic sentences','Read: بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ. All words with proper harakat.','practice',3,'["verbal"]','["ar-015"]','Quran, reading cards'),
('ar-017','arabic','arabic-vocabulary',4,'4-5','Arabic colors and numbers','Learn: ahmar (red), azraq (blue), akhdar (green), asfar (yellow). Numbers 1-10 in Arabic.','introduction',2,'["verbal","visual"]','["ar-004"]','color cards, number chart'),
('ar-018','arabic','arabic-vocabulary',4,'4-5','Arabic body parts and family','Learn: head (ra''s), hand (yad), eye (''ayn). Father (ab), mother (umm), brother (akhi), sister (ukhti).','introduction',2,'["verbal","visual"]','["ar-017"]','body chart, family tree'),
('ar-019','arabic','arabic-grammar',5,'5-6','Arabic noun types','Learn: ism (noun), fi''l (verb), harf (preposition). Examples: Muhammad (ism), kataba (fi''l), min (harf).','introduction',3,'["verbal","visual"]','["ar-016"]','grammar chart'),
('ar-020','arabic','arabic-grammar',5,'5-6','Arabic sentence structure','Subject + Predicate pattern. Example: ٱلْوَلَدُ صَغِيرٌ (The boy is small). Practice building sentences.','practice',3,'["verbal"]','["ar-019"]','sentence building cards'),
('ar-021','arabic','arabic-grammar',5,'5-6','Arabic definite article (ال)','The prefix ال (al-) makes a noun definite. Examples: kitab = a book, al-kitab = the book. Sun and moon letters.','practice',3,'["verbal"]','["ar-019"]','practice sheet'),
('ar-022','arabic','arabic-reading',5,'5-6','Reading Quran with harakat fluently','Read Surah An-Nas, Al-Falaq, Al-Ikhlas, and Al-Fatiha with full harakat and correct pronunciation.','practice',4,'["verbal"]','["ar-016"]','Quran mushaf'),
('ar-023','arabic','arabic-reading',5,'5-6','Arabic greetings and daily phrases','Master: Assalamu Alaikum, JazakAllahu Khairan, SubhanAllah, Alhamdulillah, Allahu Akbar, Bismillah, InshaAllah, Ma shaAllah.','practice',3,'["verbal"]','["ar-003"]','phrase cards, role play'),
('ar-024','arabic','arabic-conversation',5,'5-6','Arabic conversation — introductions','Introduce yourself: Ismi... (my name is...), Min... (I am from...), Uhibbu... (I love...). Practice dialogues.','practice',2,'["verbal"]','["ar-023"]','dialogue cards'),
('ar-025','arabic','arabic-grammar',6,'6-7','Arabic verb conjugation — past tense','Learn: kataba (he wrote), katabtu (I wrote), katabna (we wrote), katabtum (you all wrote). Practice 5 common verbs.','practice',3,'["verbal"]','["ar-019"]','conjugation table, workbook'),
('ar-026','arabic','arabic-grammar',6,'6-7','Arabic verb conjugation — present tense','Learn: aktubu (I write), yaktubu (he writes), naktubu (we write). Present tense patterns.','practice',3,'["verbal"]','["ar-025"]','conjugation table'),
('ar-027','arabic','arabic-grammar',6,'6-7','Arabic plural forms — broken and sound plurals','Sound plural: mudarris (male teacher) → mudarriseen. Broken plural: kitab (book) → kutub (books). Common patterns.','practice',3,'["verbal"]','["ar-025"]','plural chart'),
('ar-028','arabic','arabic-vocabulary',6,'6-7','Common Quran vocabulary — top 100 words','Learn the most frequent 100 Arabic words in the Quran: Allah, Rabb, Rahman, rahim, amanu, sallu, zakah, sawm, etc.','practice',4,'["verbal"]','["ar-022"]','vocabulary list, flashcards'),
('ar-029','arabic','arabic-conversation',6,'6-7','Arabic conversation — daily life','Describe your day in Arabic: breakfast (futur), school (madrasah), play (la''ib), pray (salla). Build simple paragraphs.','practice',3,'["verbal"]','["ar-024"]','picture prompts'),
('ar-030','arabic','arabic-writing',6,'6-7','Arabic handwriting practice','Write short paragraphs in Arabic. Practice neat handwriting with proper letter connections and spacing.','practice',3,'["hands-on"]','["ar-011","ar-012"]','Arabic ruled notebook, pen')`);

  console.log('  Seeded 30 Arabic topics (ar-001 to ar-030)');
}
