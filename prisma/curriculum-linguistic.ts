import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedLinguisticCurriculum() {
  console.log("Seeding linguistic curriculum (tajweed, tafsir, arabic)...");

  // ============================================================
  // TAJWEED - Rules of Quran Recitation
  // ============================================================

  // --- Level 0: Baby (0-1) - Listening Foundation ---
  console.log("  Batch 1: tajweed level 0");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tj-001','tajweed','tajweed-listening',0,'0-1','Listening to Quran Recitation','Expose child to beautiful Quran recitation daily — listen for 5-10 minutes during calm moments','introduction',5,'["auditory"]','[""]','quran audio player, speakers'),
('tj-002','tajweed','tajweed-listening',0,'0-1','Identifying Quran vs Speech','Help child distinguish between the sound of Quran recitation and normal speech patterns','introduction',3,'["auditory"]','["tj-001"]','quran audio, normal speech recordings'),
('tj-003','tajweed','tajweed-listening',0,'0-1','Rhythmic Response to Quran','Observe child moving, calming, or responding to the rhythm of Quran recitation','introduction',3,'["auditory","hands-on"]','["tj-001"]','quran audio'),
('tj-004','tajweed','tajweed-listening',0,'0-1','Soothing with Quran','Use Quran recitation to calm and soothe the child during fussy or restless moments','introduction',3,'["auditory"]','[""]','quran audio'),
('tj-005','tajweed','tajweed-listening',0,'0-1','Familiarity with Short Surahs','Child becomes familiar with the sound of Al-Fatiha, Al-Ikhlas through daily repetition','introduction',5,'["auditory"]','[""]','quran audio, prayer mat'),
('tj-006','tajweed','tajweed-listening',0,'0-1','Quran vs Nasheed vs Speech','Begin differentiating between Quran recitation, nasheed melodies, and everyday speech','introduction',2,'["auditory"]','["tj-002"]','quran audio, nasheed audio'),
('tj-007','tajweed','tajweed-listening',0,'0-1','Parent Recitation Model','Child observes parent reciting Quran with proper tajweed as a natural daily habit','introduction',5,'["visual","auditory"]','[""]','mushaf, parent presence'),
('tj-008','tajweed','tajweed-listening',0,'0-1','Exploring the Mushaf','Allow child to safely hold, touch, and explore the mushaf under supervision','introduction',3,'["hands-on","visual"]','[""]','child-safe mushaf');`);

  // --- Level 1: Toddler (1-2) - Early Listening ---
  console.log("  Batch 2: tajweed level 1");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tj-009','tajweed','tajweed-listening',1,'1-2','Responding to Quran Sound','Child turns toward or shows awareness when Quran recitation begins to play','introduction',3,'["auditory"]','["tj-001"]','quran audio'),
('tj-010','tajweed','tajweed-listening',1,'1-2','Imitating Simple Sounds','Encourage child to imitate simple Quran sounds like Alif, Lam, Meem','introduction',3,'["auditory","verbal"]','["tj-009"]','parent model, quran audio'),
('tj-011','tajweed','tajweed-listening',1,'1-2','Recognizing Bismillah','Child can identify when Bismillah is being recited in any context','introduction',3,'["auditory"]','["tj-005"]','quran audio'),
('tj-012','tajweed','tajweed-listening',1,'1-2','Enjoying Quran Melodies','Child shows preference for Quran recitation — smiles, claps, or dances along','introduction',3,'["auditory"]','["tj-001"]','quran audio'),
('tj-013','tajweed','tajweed-listening',1,'1-2','Pausing with the Reciter','Notice when the reciter pauses and child attention shifts accordingly','introduction',2,'["auditory"]','["tj-009"]','quran audio'),
('tj-014','tajweed','tajweed-listening',1,'1-2','Identifying Allah in Recitation','Child can pick out the word Allah when heard in Quran recitation','introduction',3,'["auditory"]','["tj-009"]','quran audio, parent guidance'),
('tj-015','tajweed','tajweed-listening',1,'1-2','Quran Bedtime Routine','Listen to Quran as part of the bedtime routine every night','introduction',5,'["auditory"]','[""]','quran audio, bedtime setup'),
('tj-016','tajweed','tajweed-listening',1,'1-2','Pointing to the Mushaf','Child can point to the mushaf when asked and show interest in it','introduction',2,'["visual","hands-on"]','["tj-008"]','mushaf');`);

  // --- Level 2: Early Preschool (2-3) - Makharij Foundations ---
  console.log("  Batch 3: tajweed level 2");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tj-017','tajweed','tajweed-makharij',2,'2-3','Introduction to Makharij','Learn that each Arabic letter has a specific point of articulation (makhraj) in the mouth and throat','introduction',2,'["visual","auditory"]','["tj-010"]','makharij chart, mirror'),
('tj-018','tajweed','tajweed-makharij',2,'2-3','Alif - Open Mouth Makhraj','Practice Alif: mouth opens naturally, sound comes from the chest — the simplest letter','practice',3,'["auditory","hands-on"]','["tj-017"]','mirror, tajweed cards'),
('tj-019','tajweed','tajweed-makharij',2,'2-3','Ba, Ta, Tha - Tongue Tip Letters','Ba: tip of tongue touches lower teeth. Ta: tip on upper gum. Tha: tongue between teeth with whisper','practice',3,'["auditory","hands-on"]','["tj-018"]','mirror, tajweed cards'),
('tj-020','tajweed','tajweed-makharij',2,'2-3','Jeem, Ha, Kha - Mouth and Throat','Jeem: middle of mouth. Ha: middle of throat like fogging glass. Kha: upper throat with rasp','practice',3,'["auditory","hands-on"]','["tj-019"]','mirror, tissue paper for Ha sound'),
('tj-021','tajweed','tajweed-makharij',2,'2-3','Dal, Thal, Ra, Zay - Tongue Tip','Dal and Thal: tongue tip on upper gum. Ra: slight vibration. Zay: same position with voicing','practice',3,'["auditory","hands-on"]','["tj-017"]','mirror, tajweed cards'),
('tj-022','tajweed','tajweed-makharij',2,'2-3','Seen and Sheen - Teeth and Tongue','Seen: tip of tongue between front teeth with hiss. Sheen: same but with shhh sound','practice',3,'["auditory","hands-on"]','["tj-021"]','mirror'),
('tj-023','tajweed','tajweed-makharij',2,'2-3','Sad and Dad - Side of Tongue','Sad: side of tongue touches upper molars with whistle. Dad: same with heavy voicing','practice',3,'["auditory","hands-on"]','["tj-022"]','mirror, tajweed cards'),
('tj-024','tajweed','tajweed-makharij',2,'2-3','Taa and Dha - Pressed Tongue','Taa: tip of tongue pressed firmly behind upper front teeth. Dha: same position with voicing','practice',3,'["auditory","hands-on"]','["tj-023"]','mirror'),
('tj-025','tajweed','tajweed-makharij',2,'2-3','Ain and Ghain - Deep Throat','Ain: constrict the upper throat (deep). Ghain: same area with a rattling gargle sound','practice',3,'["auditory","hands-on"]','["tj-020"]','mirror, tajweed cards'),
('tj-026','tajweed','tajweed-makharij',2,'2-3','Fa, Qaf, Kaf - Lips and Palate','Fa: upper teeth touch lower lip. Qaf: back of tongue touches soft palate. Kaf: back on hard palate','practice',3,'["auditory","hands-on"]','["tj-019"]','mirror, tajweed cards'),
('tj-027','tajweed','tajweed-makharij',2,'2-3','Lam, Noon, Ha - Tongue and Throat','Lam: tongue tip touches upper gum. Noon: tongue tip with nasal. Ha: empty breath from throat','practice',3,'["auditory","hands-on"]','["tj-021"]','mirror, tajweed cards'),
('tj-028','tajweed','tajweed-makharij',2,'2-3','Mim, Waw, Ya, Hamza - Completion','Mim: lips together. Waw: lips rounded. Ya: tongue arches to palate. Hamza: glottal stop','practice',3,'["auditory","hands-on"]','["tj-026"]','mirror, tajweed cards');`);

  // --- Level 3: Preschool (3-4) - Noon Sakinah & Meem Sakinah ---
  console.log("  Batch 4: tajweed level 3");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tj-029','tajweed','tajweed-sakinah',3,'3-4','Noon Sakinah and Tanween Introduction','Learn that Noon Sakinah (نْ) is a Noon with no harakah, and Tanween (fathatan, kasratan, dammatan) triggers the same rules','introduction',2,'["visual","auditory"]','["tj-028"]','tajweed chart, mushaf'),
('tj-030','tajweed','tajweed-sakinah',3,'3-4','Izhar - Clear Pronunciation','When Noon Sakinah or Tanween comes before ء ه ع غ خ ح, pronounce the Noon clearly without nasal sound','practice',3,'["auditory","verbal"]','["tj-029"]','tajweed chart, example words list'),
('tj-031','tajweed','tajweed-sakinah',3,'3-4','Idgham - Merging Letters','When Noon Sakinah comes before ي و ن م ل ر, merge into the next letter with Ghunnah (nasal sound for 2 counts)','practice',3,'["auditory","verbal"]','["tj-029"]','tajweed chart, example words list'),
('tj-032','tajweed','tajweed-sakinah',3,'3-4','Ikhfa - Hiding','When Noon Sakinah comes before the 15 remaining letters, hide the Noon and produce a nasal sound for 2 counts','practice',3,'["auditory","verbal"]','["tj-029"]','tajweed chart, list of 15 Ikhfa letters'),
('tj-033','tajweed','tajweed-sakinah',3,'3-4','Iqlab - Changing to Meem','When Noon Sakinah comes before ب (Ba), change it to a Meem sound with nasalization','practice',2,'["auditory","verbal"]','["tj-029"]','tajweed chart, example words'),
('tj-034','tajweed','tajweed-sakinah',3,'3-4','Noon Sakinah Practice in Words','Practice identifying and applying all four rules (Izhar, Idgham, Ikhfa, Iqlab) in common words','practice',3,'["auditory","verbal"]','["tj-030","tj-031","tj-032","tj-033"]','word cards, mushaf'),
('tj-035','tajweed','tajweed-sakinah',3,'3-4','Meem Sakinah Introduction','Learn that Meem Sakinah (مْ) has three rules depending on which letter follows it','introduction',2,'["visual","auditory"]','["tj-028"]','tajweed chart'),
('tj-036','tajweed','tajweed-sakinah',3,'3-4','Meem Sakinah Izhar Halqi','When Meem Sakinah comes before Ha (ه), pronounce clearly from the throat — no merging','practice',2,'["auditory","verbal"]','["tj-035"]','example words from short surahs'),
('tj-037','tajweed','tajweed-sakinah',3,'3-4','Meem Sakinah Idgham Shafawi','When Meem Sakinah comes before Meem (م), merge the two Meems with nasal sound','practice',2,'["auditory","verbal"]','["tj-035"]','example words'),
('tj-038','tajweed','tajweed-sakinah',3,'3-4','Meem Sakinah Ikhfa Shafawi','When Meem Sakinah comes before any letter other than Meem or Ha, hide it with a nasal sound','practice',2,'["auditory","verbal"]','["tj-035"]','example words'),
('tj-039','tajweed','tajweed-sakinah',3,'3-4','Sakinah Rules in Short Surahs','Apply Noon and Meem Sakinah rules while reciting Surahs Al-Falaq (113) and An-Nas (114)','practice',3,'["auditory","verbal"]','["tj-034","tj-038"]','mushaf, tajweed mushaf'),
('tj-040','tajweed','tajweed-sakinah',3,'3-4','Sakinah Rules Review and Check','Comprehensive review of all Noon and Meem Sakinah rules with oral quiz and identification','mastery',2,'["auditory","verbal"]','["tj-039"]','quiz cards, tajweed mushaf');`);

  // --- Level 4: Pre-K (4-5) - Madd & Qalqalah ---
  console.log("  Batch 5: tajweed level 4");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tj-041','tajweed','tajweed-madd',4,'4-5','Introduction to Madd (Elongation)','Learn that Madd means stretching a vowel sound (Alif, Waw, or Ya) for a specific number of counts','introduction',2,'["visual","auditory"]','["tj-040"]','tajweed chart'),
('tj-042','tajweed','tajweed-madd',4,'4-5','Madd Asli - Natural Elongation','The natural elongation of Alif after Fatha, Waw after Damma, Ya after Kasra — hold for 2 counts','practice',3,'["auditory","verbal"]','["tj-041"]','mushaf, counting tool'),
('tj-043','tajweed','tajweed-madd',4,'4-5','Madd Lazim - Required Elongation','Mandatory elongation of 4-5 counts found in specific words like Al-Haaqqah, Al-Qaari''ah','practice',3,'["auditory","verbal"]','["tj-041"]','mushaf, word list'),
('tj-044','tajweed','tajweed-madd',4,'4-5','Madd Munfasil - Permitted Between Words','Elongation when Madd letter ends one word and Hamzatul Wasl begins the next — can extend 2-5 counts','practice',3,'["auditory","verbal"]','["tj-041"]','mushaf'),
('tj-045','tajweed','tajweed-madd',4,'4-5','Madd Muttasil - Required Connected','When Madd letter and Hamzatul Qaws are in the same word — extend 4-5 counts (mandatory)','practice',3,'["auditory","verbal"]','["tj-041"]','mushaf, example word list'),
('tj-046','tajweed','tajweed-madd',4,'4-5','Madd Arid Lissukun - Before Stop','When Madd letter is followed by Sukun or when stopping (Waqf) — extend 2-4 counts','practice',3,'["auditory","verbal"]','["tj-042"]','mushaf'),
('tj-047','tajweed','tajweed-madd',4,'4-5','Madd Badal - Exchange Elongation','When Hamzatul Wasl meets Madd letter at the beginning of a word — 2 counts only (exchange)','practice',2,'["auditory","verbal"]','["tj-041"]','mushaf, example words'),
('tj-048','tajweed','tajweed-qalqalah',4,'4-5','Introduction to Qalqalah (Echo)','Learn the echo-like bounce produced when Sukun sits on five special letters: ب ج د ط ز','introduction',2,'["auditory","visual"]','["tj-040"]','tajweed chart, mirror'),
('tj-049','tajweed','tajweed-qalqalah',4,'4-5','Qalqalah Sughra - Small Echo','Light echo within a word when one of the five letters has Sukun but is not at the end of a stop','practice',3,'["auditory","verbal"]','["tj-048"]','mushaf, example words'),
('tj-050','tajweed','tajweed-qalqalah',4,'4-5','Qalqalah Kubra - Strong Echo','Strong echo when one of the five letters is stopped upon at end of ayah — must be pronounced clearly','practice',3,'["auditory","verbal"]','["tj-049"]','mushaf, example words'),
('tj-051','tajweed','tajweed-qalqalah',4,'4-5','Five Qalqalah Letters: ب ج د ط ز','Memorize and practice the five Qalqalah letters — Ba, Jeem, Dal, Taa, Zay','practice',2,'["visual","auditory"]','["tj-048"]','tajweed flashcards'),
('tj-052','tajweed','tajweed-mastery',4,'4-5','Full Tajweed Practice with Al-Fatiha','Apply all learned rules — Madd, Qalqalah, Sakinah — while reciting Surah Al-Fatiha completely','mastery',4,'["auditory","verbal"]','["tj-047","tj-051"]','tajweed mushaf, audio reference');`);

  // --- Level 5: Kindergarten (5-6) - Advanced Makharij & Rules ---
  console.log("  Batch 6: tajweed level 5");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tj-053','tajweed','tajweed-makharij',5,'5-6','Advanced Makharij - Ghain and Ain','Ghain and Ain originate from the deepest part of the throat (Adnal Halq) — practice distinguishing them','practice',3,'["auditory","hands-on"]','["tj-025"]','mirror, tajweed chart'),
('tj-054','tajweed','tajweed-makharij',5,'5-6','Advanced Makharij - Kha and Ha','Kha from the middle of the throat (Wasat al-Halq) with rasp. Ha from the top of chest (Aqsa al-Halq) as empty breath','practice',3,'["auditory","hands-on"]','["tj-020"]','mirror, tissue test'),
('tj-055','tajweed','tajweed-lam',5,'5-6','Lam Shamsiyyah - Assimilated Lam','When Lam is followed by a Sun letter (ت ث د ذ ر ز س ش ص ض ط ظ ل ن), Lam is assimilated and the next letter is doubled','practice',3,'["auditory","verbal"]','["tj-027"]','word list, mushaf'),
('tj-056','tajweed','tajweed-lam',5,'5-6','Lam Qamariyyah - Clear Lam','When Lam is followed by a Moon letter (ء ب ج ح خ ع غ ف ق ك م ه و ي), Lam is pronounced clearly','practice',3,'["auditory","verbal"]','["tj-055"]','word list, mushaf'),
('tj-057','tajweed','tajweed-hamza',5,'5-6','Hamzatul Wasl - Connecting Hamza','The connecting hamza (ٱ) at the start of a word — skip pronunciation when preceded by another word','practice',3,'["auditory","verbal"]','["tj-028"]','mushaf, word list'),
('tj-058','tajweed','tajweed-hamza',5,'5-6','Hamzatul Qaws - Stopping Hamza','The hamza (ء) that produces a glottal stop — always pronounced with a break in airflow','practice',3,'["auditory","verbal"]','["tj-057"]','mushaf, example words'),
('tj-059','tajweed','tajweed-makharij',5,'5-6','Taa Marbuta and Haa Marbuta','Taa Marbuta (ة) is pronounced as Ha at rest but Taa when Tanween is applied; Haa Marbuta (ـه) stays Ha','practice',2,'["auditory","visual"]','["tj-027"]','word cards, mushaf'),
('tj-060','tajweed','tajweed-makharij',5,'5-6','Alif Maqsura vs Yaa','Alif Maqsura (ى) at end of words is pronounced as long A not Yaa; Yaa (ي) with dots is pronounced','practice',2,'["visual","auditory"]','["tj-028"]','word cards, mushaf'),
('tj-061','tajweed','tajweed-mastery',5,'5-6','Combined Rules in Surah Al-Qaf','Practice all tajweed rules together — makharij, Madd, Sakinah, Qalqalah — in Surah Al-Qaf','practice',4,'["auditory","verbal"]','["tj-052","tj-056"]','tajweed mushaf, audio'),
('tj-062','tajweed','tajweed-mastery',5,'5-6','Ghunnah (Nasal Sound) Mastery','Perfect the nasal sound used in Idgham and Meem Sakinah — sustain for 2 counts consistently','practice',3,'["auditory","verbal"]','["tj-038"]','tajweed chart'),
('tj-063','tajweed','tajweed-mastery',5,'5-6','Identifying and Correcting Common Mistakes','Learn the most common tajweed errors and how to self-correct through practice and listening','practice',2,'["auditory","verbal"]','["tj-061"]','tajweed checklist'),
('tj-064','tajweed','tajweed-mastery',5,'5-6','Recitation with Tajweed - Surah An-Nasr','Apply all rules to Surah An-Nasr (110) — a short surah packed with multiple tajweed rules','practice',3,'["auditory","verbal"]','["tj-061"]','mushaf, audio');`);

  // --- Level 6: Grade 1-2 (6-7) - Mastery & Fluency ---
  console.log("  Batch 7: tajweed level 6");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tj-065','tajweed','tajweed-mastery',6,'6-7','Complete Tajweed Rules Review','Review all tajweed categories: Makharij, Sakinah rules, Madd, Qalqalah, Ghunnah, Lam rules','mastery',3,'["visual","auditory"]','["tj-064"]','tajweed chart, checklist'),
('tj-066','tajweed','tajweed-waqf',6,'6-7','Waqf (Stopping) Rules Introduction','Learn that proper stopping in recitation is part of tajweed and changes letter pronunciation','introduction',2,'["auditory","verbal"]','["tj-065"]','mushaf, waqf symbols chart'),
('tj-067','tajweed','tajweed-waqf',6,'6-7','Types of Waqf: Taam, Kafi, Hasan','Waqf Taam: mandatory full stop. Waqf Kafi: sufficient to continue. Waqf Hasan: good but better to continue','practice',3,'["auditory","verbal"]','["tj-066"]','mushaf, waqf symbols chart'),
('tj-068','tajweed','tajweed-waqf',6,'6-7','Ibtida - Starting After a Stop','How to properly begin reciting after a Waqf — which letter to restart from and what rules apply','practice',2,'["auditory","verbal"]','["tj-067"]','mushaf'),
('tj-069','tajweed','tajweed-mastery',6,'6-7','Reciting from Mushaf Fluently','Read continuously from the mushaf for 1-2 pages applying all tajweed rules without stopping','practice',5,'["auditory","verbal"]','["tj-065"]','mushaf, audio reference'),
('tj-070','tajweed','tajweed-mastery',6,'6-7','Tajweed Color Markings in Mushaf','Identify and understand the color-coding system in tajweed mushafs: green=Madd, blue=Ghunnah, red=Qalqalah','practice',2,'["visual"]','["tj-065"]','color-coded tajweed mushaf'),
('tj-071','tajweed','tajweed-mastery',6,'6-7','Al-Fatiha Complete Mastery','Recite Surah Al-Fatiha flawlessly with every tajweed rule applied correctly from Bismillah to Ameen','mastery',4,'["auditory","verbal"]','["tj-069"]','mushaf, recording for self-review'),
('tj-072','tajweed','tajweed-mastery',6,'6-7','Surahs Al-Falaq and An-Nas Mastery','Recite Al-Falaq (113) and An-Nas (114) with all rules — every Madd, every Sakinah, every Qalqalah','mastery',4,'["auditory","verbal"]','["tj-071"]','mushaf'),
('tj-073','tajweed','tajweed-mastery',6,'6-7','Murattal Recitation Style','Practice the clear, measured recitation style used in teaching and daily prayer (not Tajweed style)','practice',3,'["auditory","verbal"]','["tj-069"]','mushaf, audio of Murattal reciters'),
('tj-074','tajweed','tajweed-mastery',6,'6-7','Self-Assessment and Error Correction','Use a tajweed checklist to evaluate own recitation and identify areas needing improvement','mastery',2,'["verbal"]','["tj-070"]','tajweed checklist, recording device'),
('tj-075','tajweed','tajweed-terminology',6,'6-7','Tajweed Terminology in Arabic','Learn Arabic names: Madd (مَدّ), Ghunnah (غُنَّة), Qalqalah (قلقلة), Idgham (إدغام), Ikhfa (إخفاء), Izhar (إظهار), Iqlab (إقلاب)','practice',2,'["visual","verbal"]','["tj-065"]','glossary flashcards'),
('tj-076','tajweed','tajweed-mastery',6,'6-7','Practical Recitation Test - Full Passage','Recite a passage of 10+ ayat from the mushaf demonstrating all learned tajweed rules accurately','mastery',3,'["auditory","verbal"]','["tj-069"]','mushaf, evaluation rubric');`);

  // ============================================================
  // TAFSIR - Understanding the Quran
  // ============================================================

  // --- Level 0: Baby (0-1) - Foundations ---
  console.log("  Batch 8: tafsir level 0");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tf-001','tafsir','tafsir-foundations',0,'0-1','Allah Speaks to Us Through Quran','Establish that the Quran is Allah direct speech to mankind, heard by the child daily','introduction',5,'["auditory"]','[""]','quran audio, parent presence'),
('tf-002','tafsir','tafsir-foundations',0,'0-1','Surah Al-Fatiha in Daily Prayer','Child hears Al-Fatiha recited in every prayer — building familiar association','introduction',5,'["auditory"]','[""]','prayer mat, parent model'),
('tf-003','tafsir','tafsir-foundations',0,'0-1','Bismillah - Allah Name Before Everything','Child hears Bismillah before eating, reading, and starting any action','introduction',5,'["auditory"]','[""]','meal time, daily routine'),
('tf-004','tafsir','tafsir-foundations',0,'0-1','Hearing the Meaning of Bismillah','Parent explains simply: Bismillah means we start with Allah name','introduction',3,'["auditory"]','["tf-003"]','parent voice'),
('tf-005','tafsir','tafsir-foundations',0,'0-1','The Quran is Allah Special Book','Begin teaching that the Quran is unlike any other book — it is from Allah','introduction',3,'["auditory","visual"]','[""]','child-safe mushaf'),
('tf-006','tafsir','tafsir-foundations',0,'0-1','Surah Al-Ikhlas - Allah is One','Hear Al-Ikhlas daily — the purest statement of Tawheed (monotheism)','introduction',5,'["auditory"]','[""]','quran audio'),
('tf-007','tafsir','tafsir-foundations',0,'0-1','Surah An-Nas - Allah Protects Us','Hear Surah An-Nas as evening protection — Allah is the Protector and King','introduction',3,'["auditory"]','[""]','quran audio'),
('tf-008','tafsir','tafsir-foundations',0,'0-1','Surah Al-Falaq - Seeking Protection','Hear Al-Falaq as morning protection — seeking refuge in Allah from all harm','introduction',3,'["auditory"]','[""]','quran audio');`);

  // --- Level 1: Toddler (1-2) - Early Understanding ---
  console.log("  Batch 9: tafsir level 1");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tf-009','tafsir','tafsir-foundations',1,'1-2','Bismillah Means In the Name of Allah','Teach: Bismillah = In the name of Allah, the Most Gracious (Ar-Rahman), the Most Merciful (Ar-Raheem)','introduction',3,'["verbal"]','["tf-003"]','picture cards'),
('tf-010','tafsir','tafsir-foundations',1,'1-2','Al-Fatiha - Praise of Allah','Al-Fatiha opens with Alhamdulillah — all praise and thanks belong to Allah alone','introduction',3,'["verbal"]','["tf-002"]','simple translation, picture cards'),
('tf-011','tafsir','tafsir-foundations',1,'1-2','Allah is the Lord of All Worlds','Al-Fatiha says Rabb al-Alamin — Allah takes care of everything in all worlds','introduction',2,'["verbal","visual"]','["tf-010"]','nature pictures, globe'),
('tf-012','tafsir','tafsir-foundations',1,'1-2','We Worship Only Allah','Iyyaka na''budu — we worship You alone, Allah, and no other','introduction',2,'["verbal"]','["tf-010"]','prayer mat'),
('tf-013','tafsir','tafsir-foundations',1,'1-2','Al-Falaq - Allah Protects from Evil','Surah Al-Falaq teaches us to seek Allah protection from darkness, envy, and evil','introduction',2,'["verbal","auditory"]','["tf-008"]','quran audio'),
('tf-014','tafsir','tafsir-foundations',1,'1-2','Al-Ikhlas - Allah is One and Enough','Say He is Allah the One — surah teaches pure Tawheed in simple, powerful words','introduction',2,'["verbal","auditory"]','["tf-006"]','quran audio, picture cards'),
('tf-015','tafsir','tafsir-foundations',1,'1-2','Saying Ameen After Al-Fatiha','Teach child to say Ameen after Al-Fatiha in prayer — it means O Allah, accept our supplication','introduction',2,'["verbal"]','["tf-010"]','prayer mat'),
('tf-016','tafsir','tafsir-foundations',1,'1-2','The Quran Guides Us','The Quran is a guide (Huda) for people — it teaches us what is right and what is wrong','introduction',2,'["verbal"]','["tf-005"]','child-safe mushaf');`);

  // --- Level 2: Early Preschool (2-3) - Short Surahs ---
  console.log("  Batch 10: tafsir level 2");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tf-017','tafsir','tafsir-short-surahs',2,'2-3','Surah Al-Ikhlas - Tawheed Explained','Allah is the One (Ahad), the Eternal (As-Samad) — He neither begets nor is begotten, nothing is like Him','introduction',3,'["verbal","visual"]','["tf-014"]','simple tafsir book, picture cards'),
('tf-018','tafsir','tafsir-short-surahs',2,'2-3','Surah Al-Falaq - Morning and Evening Protection','Seek refuge in Allah from all evil He created — darkness, envy, and harmful whispers','introduction',3,'["verbal","auditory"]','["tf-013"]','quran audio, morning adhkar chart'),
('tf-019','tafsir','tafsir-short-surahs',2,'2-3','Surah An-Nas - Protection from Shaytan','Seek refuge in Allah, the King (Malik) and God (Ilah) of mankind, from the evil whisperer (Al-Waswas)','introduction',3,'["verbal","auditory"]','["tf-007"]','quran audio, evening adhkar chart'),
('tf-020','tafsir','tafsir-foundations',2,'2-3','Why the Quran Was Revealed','Allah sent the Quran to guide people (Huda), give good news (Bushra), and warn them (Nadhira)','introduction',2,'["verbal"]','["tf-016"]','story cards'),
('tf-021','tafsir','tafsir-foundations',2,'2-3','Allah Signs in the Sky (Ayat)','The stars, moon, sun, and clouds are all signs (Ayat) of Allah power and perfect creation','introduction',2,'["visual","verbal"]','[""]','nature pictures, outdoor walk'),
('tf-022','tafsir','tafsir-foundations',2,'2-3','Allah Signs in the Earth (Ayat)','Mountains, rivers, trees, and animals all point to Allah as the Creator and Sustainer','introduction',2,'["visual","verbal"]','[""]','nature pictures, outdoor walk'),
('tf-023','tafsir','tafsir-short-surahs',2,'2-3','Al-Fatiha Verse by Verse (Simplified)','Walk through each verse: All praise, Lord of worlds, Master of Judgment, You alone we worship, Guide us to the straight path','introduction',3,'["verbal","visual"]','["tf-010"]','verse cards, simple tafsir'),
('tf-024','tafsir','tafsir-foundations',2,'2-3','What is a Surah?','A Surah is a chapter of the Quran — there are 114 surahs in total, revealed over 23 years','introduction',2,'["verbal","visual"]','[""]','mushaf, numbered surah chart'),
('tf-025','tafsir','tafsir-foundations',2,'2-3','What is an Ayah?','An Ayah is a verse of the Quran — each ayah is a sign (proof) from Allah','introduction',2,'["verbal","visual"]','["tf-024"]','mushaf, verse pointing'),
('tf-026','tafsir','tafsir-foundations',2,'2-3','The Quran Cannot Be Changed','Allah promised to protect the Quran (Hifz) — it is the same today as it was revealed 1400 years ago','introduction',2,'["verbal"]','["tf-005"]','simple explanation, mushaf');`);

  // --- Level 3: Preschool (3-4) - Juz Amma Surahs (105-114) ---
  console.log("  Batch 11: tafsir level 3");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tf-027','tafsir','tafsir-juz-amma',3,'3-4','Surah Al-Fil (105) - The Elephant','Abraha came with elephants to destroy the Kaaba, but Allah sent Ababil birds that destroyed them with stones of clay','introduction',2,'["verbal","visual"]','["tf-025"]','story cards, picture book'),
('tf-028','tafsir','tafsir-juz-amma',3,'3-4','Surah Quraysh (106) - Allah Provides','Allah gave Quraysh security and provision — safe travel in winter and summer','introduction',2,'["verbal"]','["tf-027"]','simple tafsir'),
('tf-029','tafsir','tafsir-juz-amma',3,'3-4','Surah Al-Ma''un (107) - Small Kindnesses','The Day of Judgment will be hard for those who don''t pray and don''t feed the orphan','introduction',2,'["verbal"]','["tf-028"]','simple tafsir'),
('tf-030','tafsir','tafsir-juz-amma',3,'3-4','Surah Al-Kawthar (108) - Abundant Good','Allah gave Prophet Muhammad ﷺ the river of Kawthar in Paradise — so pray and sacrifice for your Lord','introduction',2,'["verbal"]','["tf-029"]','simple tafsir'),
('tf-031','tafsir','tafsir-juz-amma',3,'3-4','Surah Al-Kafirun (109) - Disbelief','Say to disbelievers: you worship what you worship, I worship what I worship — our paths are different','introduction',2,'["verbal"]','["tf-030"]','simple tafsir'),
('tf-032','tafsir','tafsir-juz-amma',3,'3-4','Surah An-Nasr (110) - Help of Allah','When Allah help comes and people enter Islam in crowds, glorify Allah and seek forgiveness','introduction',2,'["verbal"]','["tf-031"]','simple tafsir'),
('tf-033','tafsir','tafsir-juz-amma',3,'3-4','Surah Al-Lahab (111) - Abu Lahab','Abu Lahab, the uncle of Prophet ﷺ, rejected Islam and his wealth will not avail him','introduction',2,'["verbal"]','["tf-032"]','simple tafsir, seerah connection'),
('tf-034','tafsir','tafsir-juz-amma',3,'3-4','Surah Al-Ikhlas (112) - Pure Tawheed Review','Complete review with deeper understanding: He is Allah the One, As-Samad, He begets not','mastery',2,'["verbal","auditory"]','["tf-017"]','simple tafsir'),
('tf-035','tafsir','tafsir-juz-amma',3,'3-4','Surah Al-Falaq (113) - Seeking Refuge Review','Complete review: seek refuge in the Lord of Daybreak (Rabb al-Falaq) from all evil','mastery',2,'["verbal","auditory"]','["tf-018"]','simple tafsir'),
('tf-036','tafsir','tafsir-juz-amma',3,'3-4','Surah An-Nas (114) - Mankind Review','Complete review: seek refuge in the Lord (Rabb), King (Malik), and God (Ilah) of mankind','mastery',2,'["verbal","auditory"]','["tf-019"]','simple tafsir'),
('tf-037','tafsir','tafsir-juz-amma',3,'3-4','Why Makkans Rejected the Quran','The people of Makkah were proud and didn''t want to follow the truth — lessons about arrogance','introduction',2,'["verbal"]','["tf-034"]','story cards, seerah stories'),
('tf-038','tafsir','tafsir-juz-amma',3,'3-4','Key Lessons from Juz Amma','Summary: Tawheed, seeking Allah protection, kindness to orphans, trusting Allah, preparing for Hereafter','mastery',2,'["verbal"]','["tf-037"]','review chart, discussion');`);

  // --- Level 4: Pre-K (4-5) - Surahs 93-104 and Quran Stories ---
  console.log("  Batch 12: tafsir level 4");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tf-039','tafsir','tafsir-makki-surahs',4,'4-5','Surah Ad-Duha (93) - Morning Light','Allah did not abandon the Prophet ﷺ — He will give him abundantly, so be grateful','introduction',2,'["verbal"]','["tf-038"]','simple tafsir, discussion'),
('tf-040','tafsir','tafsir-makki-surahs',4,'4-5','Surah Ash-Sharh (94) - Relief After Hardship','Inna ma''al usri yusra — every difficulty comes with ease, trust Allah plan','introduction',2,'["verbal"]','["tf-039"]','simple tafsir'),
('tf-041','tafsir','tafsir-makki-surahs',4,'4-5','Surah At-Tin (95) - The Fig and Olive','Allah created humans in the best form (Ahsan Taqweem) — what causes them to fall is rejecting faith','introduction',2,'["verbal","visual"]','["tf-040"]','simple tafsir, pictures of fig and olive trees'),
('tf-042','tafsir','tafsir-makki-surahs',4,'4-5','Surah Al-Alaq (96) - The First Revelation','The very first ayah revealed: Iqra Bismi Rabbik alladhi khalaq — Read in the name of your Lord who created','introduction',2,'["verbal","visual"]','["tf-041"]','simple tafsir, cave of Hira story cards'),
('tf-043','tafsir','tafsir-makki-surahs',4,'4-5','Surah Al-Qadr (97) - Night of Power','Laylat al-Qadr is better than a thousand months — angels and Jibril descend by Allah permission','introduction',2,'["verbal"]','["tf-042"]','simple tafsir, Laylatul Qadr connection'),
('tf-044','tafsir','tafsir-makki-surahs',4,'4-5','Surah Al-Bayyinah (98) - Clear Proof','The clear proof came to the People of the Book — they should have followed the unlettered Prophet ﷺ','introduction',2,'["verbal"]','["tf-043"]','simple tafsir'),
('tf-045','tafsir','tafsir-makki-surahs',4,'4-5','Surah Az-Zalzalah (99) - Earthquake','When the earth shakes with its quake, people will see their deeds — even an ant weight will be seen','introduction',2,'["verbal","visual"]','["tf-044"]','simple tafsir, earthquake video'),
('tf-046','tafsir','tafsir-makki-surahs',4,'4-5','Surah Al-Adiyat (100) - Galloping Horses','Swearing by galloping horses — humans are ungrateful (Kafara) to their Lord','introduction',2,'["verbal","visual"]','["tf-045"]','simple tafsir, horse pictures'),
('tf-047','tafsir','tafsir-makki-surahs',4,'4-5','Surah Al-Qariah (101) - The Striking Hour','The Day of Judgment (Al-Qariah) strikes — people scattered like scattered moths','introduction',2,'["verbal","visual"]','["tf-046"]','simple tafsir, Day of Judgment pictures'),
('tf-048','tafsir','tafsir-makki-surahs',4,'4-5','Surah At-Takathur (102) - Competition in Wealth','People compete in worldly gain until they visit the graves — remember the Hereafter','introduction',2,'["verbal"]','["tf-047"]','simple tafsir'),
('tf-049','tafsir','tafsir-makki-surahs',4,'4-5','Surah Al-Asr (103) - The Declining Day','By time (Al-Asr), all people are in loss except those who believe, do good deeds, and advise each other','introduction',2,'["verbal"]','["tf-048"]','simple tafsir, discussion'),
('tf-050','tafsir','tafsir-makki-surahs',4,'4-5','Surah Al-Humazah (104) - The Slanderer','Woe to those who mock others and hoard wealth — Allah will test them in the flame of fire','introduction',2,'["verbal"]','["tf-049"]','simple tafsir'),
('tf-051','tafsir','tafsir-stories',4,'4-5','Story of Prophet Yusuf (Joseph) in Quran','Yusuf thrown in well by brothers, went to Egypt, became minister — trust in Allah plan through hardship','introduction',3,'["verbal","visual"]','["tf-037"]','story book, Yusuf coloring pages'),
('tf-052','tafsir','tafsir-stories',4,'4-5','Story of Prophet Musa (Moses) in Quran','Baby in the basket on the Nile, grew up in Fir''awn palace, spoke to Allah at the bush, led Bani Israel to freedom','introduction',3,'["verbal","visual"]','["tf-037"]','story book, Musa coloring pages');`);

  // --- Level 5: Kindergarten (5-6) - Surahs 78-92 ---
  console.log("  Batch 13: tafsir level 5");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tf-053','tafsir','tafsir-makki-surahs',5,'5-6','Surah An-Naba (78) - The Great News','About the Day of Judgment — what will make you understand its greatness?','introduction',2,'["verbal"]','["tf-050"]','simple tafsir'),
('tf-054','tafsir','tafsir-makki-surahs',5,'5-6','Surah An-Naziat (79) - Those Who Extract','Angels who gently extract souls — Pharaoh and those before him denied the truth','introduction',2,'["verbal"]','["tf-053"]','simple tafsir'),
('tf-055','tafsir','tafsir-makki-surahs',5,'5-6','Surah Abasa (80) - He Frowned','The Prophet ﷺ frowned at a blind man who wanted to learn — Allah corrected him gently','introduction',2,'["verbal"]','["tf-054"]','simple tafsir, seerah context'),
('tf-056','tafsir','tafsir-makki-surahs',5,'5-6','Surah At-Takwir (81) - The Folding Up','When the sun is wrapped up, stars fall, mountains move — the Day of Judgment unfolds','introduction',2,'["verbal","visual"]','["tf-055"]','simple tafsir'),
('tf-057','tafsir','tafsir-makki-surahs',5,'5-6','Surah Al-Infitar (82) - The Bursting Open','The sky bursts open, the earth spreads out — every soul will know what it brought forward','introduction',2,'["verbal"]','["tf-056"]','simple tafsir'),
('tf-058','tafsir','tafsir-makki-surahs',5,'5-6','Surah Al-Mutaffifin (83) - The Cheats','Woe to those who give less than due when measuring — they will meet on a Day certain','introduction',2,'["verbal"]','["tf-057"]','simple tafsir, fairness discussion'),
('tf-059','tafsir','tafsir-makki-surahs',5,'5-6','Surah Al-Inshiqaq (84) and Al-Buruj (85)','When the sky is torn open and the earth is extended — and the story of the people of the ditch who were burned for faith','introduction',3,'["verbal","visual"]','["tf-058"]','simple tafsir, story illustration'),
('tf-060','tafsir','tafsir-makki-surahs',5,'5-6','Surah At-Tariq (86) and Al-Ala (87)','The morning star and the Most High — by the night visitor and by what created, Allah is the Best Designer','introduction',2,'["verbal"]','["tf-059"]','simple tafsir'),
('tf-061','tafsir','tafsir-makki-surahs',5,'5-6','Surah Al-Ghashiyah (88) and Al-Fajr (89)','The overwhelming Day and the dawn — have they not looked at the camel, the sky, the mountains?','introduction',2,'["verbal","visual"]','["tf-060"]','simple tafsir'),
('tf-062','tafsir','tafsir-makki-surahs',5,'5-6','Surah Al-Balad (90), Ash-Shams (91), Al-Layl (92)','The city (Makkah), the sun, and the night — Allah created man in hardship but gave him ease','introduction',2,'["verbal","visual"]','["tf-061"]','simple tafsir, Makkah pictures'),
('tf-063','tafsir','tafsir-themes',5,'5-6','Historical Context of Makki Surahs','These surahs were revealed in Makkah before the Hijrah — they focus on Tawheed, the Hereafter, and warning','introduction',2,'["verbal"]','["tf-053"]','seerah timeline'),
('tf-064','tafsir','tafsir-themes',5,'5-6','Key Themes: Day of Judgment and Trust in Allah','Many surahs describe the Day of Judgment — what will happen and how to prepare through faith and good deeds','practice',2,'["verbal","visual"]','["tf-056"]','theme chart, discussion guide');`);

  // --- Level 6: Grade 1-2 (6-7) - Surahs 67-77 and Tafsir Skills ---
  console.log("  Batch 14: tafsir level 6");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('tf-071','tafsir','tafsir-makki-surahs',6,'6-7','Surah Al-Mulk (67) - The Dominion','Blessed is He who placed dominion in His hands — He gives life and death, and tests you in good and bad','introduction',2,'["verbal"]','["tf-064"]','tafsir book, mushaf'),
('tf-072','tafsir','tafsir-makki-surahs',6,'6-7','Surah Al-Qalam (68) - The Pen','By the Pen (Al-Qalam) and what they inscribe — the Prophet ﷺ is not mad, he will be honored','introduction',2,'["verbal"]','["tf-071"]','tafsir book'),
('tf-073','tafsir','tafsir-makki-surahs',6,'6-7','Surah Al-Haqqah (69) - The Inevitable','The Day of Judgment is certain (Haqq) — what will overwhelm them when eyes are humbled','introduction',2,'["verbal"]','["tf-072"]','tafsir book, discussion'),
('tf-074','tafsir','tafsir-makki-surahs',6,'6-7','Surah Al-Ma''arij (70) - The Ascending Stairways','People ask about the punishment — it is for those who disbelieve in Allah and don''t pray','introduction',2,'["verbal"]','["tf-073"]','tafsir book'),
('tf-075','tafsir','tafsir-makki-surahs',6,'6-7','Surah Nuh (71) - Prophet Noah','Nuh called his people for 950 years — only a few believed, the rest drowned in the flood','introduction',2,'["verbal","visual"]','["tf-074"]','tafsir book, Nuh story cards'),
('tf-076','tafsir','tafsir-makki-surahs',6,'6-7','Surah Al-Jinn (72) - The Jinn','Some Jinn heard the Quran and believed — they have their own world, choices, and accountability','introduction',2,'["verbal"]','["tf-075"]','tafsir book'),
('tf-077','tafsir','tafsir-makki-surahs',6,'6-7','Surah Al-Muzzammil (73) - The Wrapped One','Rise at night (Qiyam) for prayer, recite the Quran slowly — be patient with the disbelievers','introduction',2,'["verbal"]','["tf-076"]','tafsir book, Tahajjud discussion'),
('tf-078','tafsir','tafsir-makki-surahs',6,'6-7','Surah Al-Muddaththir (74) - The Cloaked One','Warn your people — the fire of Allah, kindled by stones prepared for the disbelievers','introduction',2,'["verbal"]','["tf-077"]','tafsir book'),
('tf-079','tafsir','tafsir-makki-surahs',6,'6-7','Surah Al-Qiyamah (75) - The Resurrection','By the Day of Resurrection — does humanity think We cannot reassemble the bones','introduction',2,'["verbal"]','["tf-078"]','tafsir book'),
('tf-080','tafsir','tafsir-makki-surahs',6,'6-7','Surah Al-Insan (76) - The Human','We created humans from a drop — then tested them with hearing, sight, and heart','introduction',2,'["verbal"]','["tf-079"]','tafsir book'),
('tf-081','tafsir','tafsir-makki-surahs',6,'6-7','Surah Al-Mursalat (77) - The Sent Forth','By the winds sent forth (Al-Mursalat) — what you are promised will surely happen','introduction',2,'["verbal"]','["tf-080"]','tafsir book'),
('tf-082','tafsir','tafsir-themes',6,'6-7','Quranic Argumentation and Evidence','Learn how the Quran presents arguments — oaths by creation, parables, stories, and logical reasoning','practice',3,'["verbal"]','["tf-071"]','tafsir book, analysis worksheet'),
('tf-083','tafsir','tafsir-skills',6,'6-7','How to Do Basic Tafsir Yourself','Method: read the ayah, understand the Arabic words, check the context, then draw practical lessons','practice',3,'["verbal"]','["tf-082"]','simple tafsir book, notebook'),
('tf-084','tafsir','tafsir-themes',6,'6-7','Advanced Themes: The Hereafter','Deep discussion of Jannah, Jahannam, the Sirat bridge, the Scale (Meezan), and how to prepare','practice',3,'["verbal","visual"]','["tf-082"]','tafsir book, poster');`);

  // ============================================================
  // ARABIC - Language of the Quran
  // ============================================================

  // --- Level 0: Baby (0-1) - Listening Foundation ---
  console.log("  Batch 15: arabic level 0");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('ar-001','arabic','arabic-listening',0,'0-1','Listening to Quran in Arabic','Expose child to the beauty of Arabic through daily Quran recitation — 5-10 minutes during calm moments','introduction',5,'["auditory"]','[""]','quran audio, speakers'),
('ar-002','arabic','arabic-listening',0,'0-1','Hearing Arabic Adhkar','Child hears daily adhkar (morning and evening remembrance) in Arabic throughout the day','introduction',5,'["auditory"]','[""]','adhkar audio, daily routine'),
('ar-003','arabic','arabic-listening',0,'0-1','Recognizing Arabic Sounds','Child begins to notice the unique sounds of Arabic — the deep Ain, the throaty Kha, the soft Lam','introduction',3,'["auditory"]','["ar-001"]','quran audio'),
('ar-004','arabic','arabic-listening',0,'0-1','Arabic Lullabies and Nasheeds','Gentle Arabic nasheeds and lullabies familiarize the child with Arabic melodic patterns','introduction',3,'["auditory"]','[""]','nasheed audio'),
('ar-005','arabic','arabic-listening',0,'0-1','Parent Speaking Arabic Phrases','Parent uses basic Arabic phrases daily: Bismillah, Alhamdulillah, Assalamu Alaikum, JazakAllahu Khairan','introduction',5,'["auditory"]','[""]','parent model'),
('ar-006','arabic','arabic-listening',0,'0-1','Response to Arabic Sounds','Child shows awareness, calm, or excitement when hearing Arabic sounds and recitation','introduction',2,'["auditory"]','["ar-001"]','quran audio, nasheed'),
('ar-007','arabic','arabic-listening',0,'0-1','Exploring Arabic Script','Allow child to safely look at and touch pages with Arabic text under supervision','introduction',2,'["visual","hands-on"]','[""]','children''s Quran, Arabic book'),
('ar-008','arabic','arabic-listening',0,'0-1','Differentiating Arabic from English','Begin noticing that Arabic sounds different from English — different rhythm, flow, and melodic patterns','introduction',2,'["auditory"]','["ar-001"]','multilingual audio');`);

  // --- Level 1: Toddler (1-2) - Early Sound Recognition ---
  console.log("  Batch 16: arabic level 1");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('ar-009','arabic','arabic-phrases',1,'1-2','Arabic Greeting: Assalamu Alaikum','Teach child to say Assalamu Alaikum (Peace be upon you) and respond Wa Alaikum Assalam','introduction',3,'["verbal"]','["ar-005"]','role play, mirror'),
('ar-010','arabic','arabic-phrases',1,'1-2','Saying Bismillah Before Actions','Teach child to say Bismillah (بِسْمِ اللَّهِ) before eating, drinking, and starting any activity','introduction',3,'["verbal"]','["ar-005"]','daily routine integration'),
('ar-011','arabic','arabic-phrases',1,'1-2','Alhamdulillah - Thanking Allah','Teach child to say Alhamdulillah (الْحَمْدُ لِلَّهِ) when happy, after eating, and in gratitude','introduction',3,'["verbal"]','["ar-005"]','mealtime routine'),
('ar-012','arabic','arabic-phrases',1,'1-2','Recognizing First Arabic Letters','Point out Alif (أ) and Ba (ب) when heard in Quran and name them','introduction',3,'["visual","auditory"]','["ar-003"]','letter cards, poster'),
('ar-013','arabic','arabic-phrases',1,'1-2','Imitating Arabic Sounds','Encourage child to try making Arabic sounds — especially Alif, Ba, Lam, Meem','introduction',3,'["verbal","auditory"]','["ar-012"]','parent model, mirror'),
('ar-014','arabic','arabic-vocabulary',1,'1-2','Arabic Colors in Daily Life','Point out and name colors: Abyad (أَبْيَض white), Aswad (أَسْوَد black), Ahmar (أَحْمَر red)','introduction',3,'["verbal","visual"]','[""]','colorful objects'),
('ar-015','arabic','arabic-vocabulary',1,'1-2','Arabic Counting 1-3','Teach child to count: Wahid (وَاحِد 1), Ithnain (اِثْنَان 2), Thalathah (ثَلَاثَة 3)','introduction',2,'["verbal"]','[""]','counting toys'),
('ar-016','arabic','arabic-vocabulary',1,'1-2','Arabic Food Words','Name foods in Arabic: Khubz (خُبْز bread), Laban (لَبَن milk), Maa (مَاء water), Tamr (تَمْر dates)','introduction',2,'["verbal"]','[""]','food items, pictures');`);

  // --- Level 2: Early Preschool (2-3) - Alphabet Recognition ---
  console.log("  Batch 17: arabic level 2");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('ar-017','arabic','arabic-alphabet',2,'2-3','Arabic Alphabet Introduction','Learn that Arabic has 28 Hijaiyah letters and they are written from right to left (Yamin ila Yasar)','introduction',2,'["visual"]','["ar-012"]','alphabet poster, mushaf'),
('ar-018','arabic','arabic-alphabet',2,'2-3','First Group: Alif to Jeem','Learn to recognize and pronounce Alif (أ), Ba (ب), Ta (ت), Tha (ث), Jeem (ج)','practice',3,'["visual","verbal"]','["ar-017"]','letter cards, flashcards'),
('ar-019','arabic','arabic-alphabet',2,'2-3','Second Group: Ha to Kha','Learn Ha (ح throat), Kha (خ throat with rasp), Dal (د), Thal (ذ), Ra (ر)','practice',3,'["visual","verbal"]','["ar-018"]','letter cards, mirror for throat letters'),
('ar-020','arabic','arabic-alphabet',2,'2-3','Third Group: Zay to Seen','Learn Zay (ز), Seen (س with teeth), Sheen (ش), Sad (ص with side tongue)','practice',3,'["visual","verbal"]','["ar-019"]','letter cards'),
('ar-021','arabic','arabic-alphabet',2,'2-3','Fourth Group: Dad to Ain','Learn Dad (ض), Taa (ط), Dha (ظ), Ain (ع deep throat), Ghain (غ deep throat)','practice',3,'["visual","verbal"]','["ar-020"]','letter cards, mirror'),
('ar-022','arabic','arabic-alphabet',2,'2-3','Fifth Group: Fa to Kaf','Learn Fa (ف lip), Qaf (ق back palate), Kaf (ك hard palate), Lam (ل gum)','practice',3,'["visual","verbal"]','["ar-021"]','letter cards'),
('ar-023','arabic','arabic-alphabet',2,'2-3','Sixth Group: Meem to Ya','Learn Meem (م lips), Noon (ن tongue), Ha (ه throat), Waw (و), Yaa (ي), Hamza (ء)','practice',3,'["visual","verbal"]','["ar-022"]','letter cards'),
('ar-024','arabic','arabic-harakat',2,'2-3','Fatha - The Short A Vowel','A small diagonal line above a letter ( َ ) adds a short A sound: Ba (بَ) = Ba','practice',2,'["visual","verbal"]','["ar-023"]','harakat chart, letter cards'),
('ar-025','arabic','arabic-harakat',2,'2-3','Kasra - The Short I Vowel','A small diagonal line below a letter ( ِ ) adds a short I sound: Ba (بِ) = Bi','practice',2,'["visual","verbal"]','["ar-024"]','harakat chart, letter cards'),
('ar-026','arabic','arabic-harakat',2,'2-3','Damma - The Short U Vowel','A small comma-like mark above a letter ( ُ ) adds a short U sound: Ba (بُ) = Bu','practice',2,'["visual","verbal"]','["ar-025"]','harakat chart, letter cards'),
('ar-027','arabic','arabic-harakat',2,'2-3','Sukun - No Vowel Sound','A small circle above a letter ( ْ ) means no vowel — the letter is pronounced bare: Ba (بْ) = B','practice',2,'["visual","verbal"]','["ar-024"]','harakat chart'),
('ar-028','arabic','arabic-reading',2,'2-3','Reading Simple Two-Letter Words','Combine letters with harakat to read: Ab (أَب father), At (أَتَ come), As (أَسْ fire)','practice',3,'["verbal"]','["ar-026"]','word cards, reading chart');`);

  // --- Level 3: Preschool (3-4) - Letter Forms & Writing ---
  console.log("  Batch 18: arabic level 3");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('ar-029','arabic','arabic-letter-forms',3,'3-4','Letter Forms: Isolated, Initial, Medial, Final','Learn that Arabic letters change shape depending on their position in a word — four forms each','introduction',2,'["visual"]','["ar-027"]','position chart, letter cards'),
('ar-030','arabic','arabic-letter-forms',3,'3-4','Ba in All Positions','Practice Ba in isolated (ب), initial (بـ), medial (ـبـ), and final (ـب) forms','practice',2,'["visual","hands-on"]','["ar-029"]','tracing worksheet'),
('ar-031','arabic','arabic-letter-forms',3,'3-4','Taa and Tha in All Positions','Practice Taa and Tha in all four positions — note the dot placement differences','practice',2,'["visual","hands-on"]','["ar-030"]','tracing worksheet'),
('ar-032','arabic','arabic-letter-forms',3,'3-4','Jeem, Ha, Kha in All Positions','Practice these three related letters — same base shape, different dots and throat articulation','practice',2,'["visual","hands-on"]','["ar-031"]','tracing worksheet'),
('ar-033','arabic','arabic-writing',3,'3-4','Writing Alif and Lam','Practice writing Alif (vertical stroke ا) and Lam (vertical stroke with hook ل) with correct form','practice',2,'["hands-on"]','["ar-029"]','tracing worksheet, sand tray'),
('ar-034','arabic','arabic-writing',3,'3-4','Writing Ba, Ta, Tha','Practice writing the tooth-shaped letters with correct dot placement above or below','practice',3,'["hands-on"]','["ar-033"]','tracing worksheet, sand tray'),
('ar-035','arabic','arabic-words',3,'3-4','Basic Word: Bismillah (بِسْمِ اللَّهِ)','Learn to recognize and read Bismillah — break it down letter by letter with full harakat','practice',2,'["verbal","visual"]','["ar-034"]','word card, mushaf'),
('ar-036','arabic','arabic-words',3,'3-4','Basic Word: Salaam (سَلَام)','Learn Salaam meaning peace — and its connection to the greeting Assalamu Alaikum','practice',2,'["verbal"]','["ar-035"]','word card'),
('ar-037','arabic','arabic-words',3,'3-4','Basic Word: Allah (اللَّه)','Recognize the word Allah in the mushaf — it is the most important word in Arabic and Islam','practice',2,'["verbal","visual"]','["ar-035"]','word card, mushaf'),
('ar-038','arabic','arabic-words',3,'3-4','Basic Word: Quran (قُرْآن)','Learn the word Quran meaning the recitation — the Book of Allah revealed to Prophet Muhammad ﷺ','practice',2,'["verbal"]','["ar-037"]','word card, mushaf'),
('ar-039','arabic','arabic-words',3,'3-4','Basic Word: Rasul (رَسُول)','Learn Rasul meaning messenger — as in Rasulullah, the Messenger of Allah','practice',2,'["verbal"]','["ar-038"]','word card'),
('ar-040','arabic','arabic-numbers',3,'3-4','Arabic Numbers 1-10','Learn: Wahid (1), Ithnain (2), Thalathah (3), Arba''ah (4), Khamsah (5), Sittah (6), Saba''ah (7), Thamaniyah (8), Tis''ah (9), Asharah (10)','practice',3,'["verbal","hands-on"]','[""]','number cards, counting objects');`);

  // --- Level 4: Pre-K (4-5) - Joining & Sentences ---
  console.log("  Batch 19: arabic level 4");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('ar-041','arabic','arabic-joining',4,'4-5','Joining Letters into Words','Learn that Arabic is cursive — letters connect to each other when written in words','introduction',2,'["visual","hands-on"]','["ar-030"]','connecting letter worksheets'),
('ar-042','arabic','arabic-joining',4,'4-5','Non-Connecting Letters','Six letters that only connect from the right: Alif (ا), Dal (د), Thal (ذ), Ra (ر), Zay (ز), Waw (و)','practice',2,'["visual"]','["ar-041"]','chart, letter cards'),
('ar-043','arabic','arabic-reading',4,'4-5','Reading Three-Letter Words','Read trilateral root words: Kataba (كَتَبَ he wrote), Darasa (دَرَسَ he studied), Farada (فَرَضَ he created)','practice',3,'["verbal","visual"]','["ar-028"]','word cards, reading exercises'),
('ar-044','arabic','arabic-reading',4,'4-5','Reading Short Sentences','Read simple sentences: Huwa tilmidh (هُوَ تِلْمِيذ He is a student), Hiya mu''allimah (هِيَ مُعَلِّمَة She is a teacher)','practice',3,'["verbal"]','["ar-043"]','sentence cards'),
('ar-045','arabic','arabic-phrases',4,'4-5','Arabic Greeting Phrases Expanded','Practice: Assalamu Alaikum, Kayfa Halak (كَيْفَ حَالُك How are you), Ana bikhayr (أَنَا بِخَيْر I am fine), Shukran (شُكْرًا Thank you)','practice',2,'["verbal"]','["ar-009"]','conversation cards, role play'),
('ar-046','arabic','arabic-vocabulary',4,'4-5','Colors in Arabic - Complete Set','Abyad (أَبْيَض white), Aswad (أَسْوَد black), Ahmar (أَحْمَر red), Akhdar (أَخْضَر green), Azraq (أَزْرَق blue), Asfar (أَصْفَر yellow)','practice',3,'["visual","verbal"]','["ar-014"]','color cards, colored objects'),
('ar-047','arabic','arabic-numbers',4,'4-5','Numbers 1-10 in Arabic - Review and Write','Full review and writing practice: Wahid through Asharah with correct Arabic numerals','practice',3,'["verbal","hands-on"]','["ar-040"]','number cards, writing exercise'),
('ar-048','arabic','arabic-vocabulary',4,'4-5','Family Members in Arabic','Ab (أَب father), Umm (أُم mother), Akh (أَخ brother), Ukht (أُخْت sister), Ibn (اِبْن son), Bint (بِنْت daughter)','practice',2,'["verbal","visual"]','[""]','family tree chart, picture cards'),
('ar-049','arabic','arabic-vocabulary',4,'4-5','Body Parts in Arabic','Ra''s (رَأْس head), Ayn (عَيْن eye), Udhn (أُذْن ear), Famm (فَم mouth), Yad (يَد hand), Rijl (رِجْل leg)','practice',2,'["verbal","hands-on"]','[""]','body chart, pointing game'),
('ar-050','arabic','arabic-reading',4,'4-5','Reading Simple Quran Verses','Read short, simple verses with full harakat: Al-Fatiha 1:1-3 with Bismillah','practice',4,'["verbal"]','["ar-044"]','mushaf, reading guide'),
('ar-051','arabic','arabic-reading',4,'4-5','Understanding Harakat in Context','Read the same root with different harakat and notice how vowels change meaning completely','practice',3,'["verbal","visual"]','["ar-028"]','word comparison cards'),
('ar-052','arabic','arabic-writing',4,'4-5','Writing Full Arabic Words','Practice writing common words with correct letter joining: Salaam (سَلَام), Bismillah (بِسْمِ اللَّه), Allah (اللَّه), Quran (قُرْآن)','practice',3,'["hands-on"]','["ar-041"]','tracing worksheets, whiteboard');`);

  // --- Level 5: Kindergarten (5-6) - Grammar Basics ---
  console.log("  Batch 20: arabic level 5");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('ar-053','arabic','arabic-grammar',5,'5-6','Arabic Nouns (Ism - اِسْم)','Learn that Ism names something — person, place, or thing: Muhammad, Makkah, Kitaab (كِتَاب book)','introduction',2,'["visual","verbal"]','["ar-044"]','grammar chart, examples'),
('ar-054','arabic','arabic-grammar',5,'5-6','Arabic Verbs (Fi''l - فِعْل)','Learn that Fi''l is an action word — Kataba (كَتَبَ he wrote), Darasa (دَرَسَ he studied), Salaama (سَلَّمَ he greeted)','introduction',2,'["visual","verbal"]','["ar-053"]','grammar chart, action cards'),
('ar-055','arabic','arabic-grammar',5,'5-6','Arabic Prepositions (Harf - حَرْف)','Learn basic prepositions: Fi (فِي in), Alaa (عَلَى on), Ilaa (إِلَى to), Min (مِن from), ''Inda (عِنْدَ at/near)','introduction',2,'["visual","verbal"]','["ar-053"]','preposition cards, sentence building'),
('ar-056','arabic','arabic-grammar',5,'5-6','Basic Sentence Structure (Jumlah)','Arabic sentences are Fi''liyah (verb-first): Kataba al-walad (كَتَبَ الْوَلَدُ The boy wrote). Or Ismiyah (noun-first): Al-waladu kabir (الْوَلَدُ كَبِيرٌ The boy is big)','practice',3,'["verbal","visual"]','["ar-054"]','sentence building blocks'),
('ar-057','arabic','arabic-grammar',5,'5-6','Definite Article Al- (ال)','Learn that ال (Al) means the — makes a word definite: Al-Kitaab (الْكِتَاب the book), Al-Bab (الْبَاب the door)','practice',2,'["visual","verbal"]','["ar-056"]','article chart, word cards'),
('ar-058','arabic','arabic-reading',5,'5-6','Reading Fluency Practice','Read short paragraphs from the Quran or simple Arabic text with correct pronunciation and harakat','practice',4,'["verbal"]','["ar-050"]','graded readers, mushaf'),
('ar-059','arabic','arabic-reading',5,'5-6','Reading Surah Al-Fatiha Completely','Read the complete Al-Fatiha with full understanding of harakat and word meanings','mastery',4,'["verbal"]','["ar-058"]','mushaf, translation'),
('ar-060','arabic','arabic-reading',5,'5-6','Reading Surah Al-Ikhlas Completely','Read the complete Al-Ikhlas: Huwallahu Ahad, Allahu As-Samad, Lam yalid wa lam yulad','mastery',3,'["verbal"]','["ar-059"]','mushaf, translation'),
('ar-061','arabic','arabic-vocabulary',5,'5-6','Common Surah Vocabulary','Learn key words from surahs: Ar-Rahman (الرَّحْمَن Most Merciful), Al-Alamin (الْعَالَمِين worlds), Al-Malik (الْمَلِك the King)','practice',3,'["verbal","visual"]','["ar-058"]','vocabulary cards, mushaf'),
('ar-062','arabic','arabic-conversation',5,'5-6','Simple Arabic Conversation','Practice: Kayfa halak? Ana bikhayr, Shukran, Afwan (عَفْوًا you''re welcome), Ma''a salama (مَعَ السَّلَامَة goodbye)','practice',3,'["verbal"]','["ar-045"]','conversation cards, role play'),
('ar-063','arabic','arabic-writing',5,'5-6','Writing Simple Arabic Sentences','Write Ismiyah and Fi''liyah sentences: Al-waladu yaktubu (الْوَلَدُ يَكْتُبُ The boy writes), Al-babu kabir (الْبَابُ كَبِيرٌ The door is big)','practice',3,'["hands-on","verbal"]','["ar-056"]','exercise book, pencil'),
('ar-064','arabic','arabic-grammar',5,'5-6','Singular Noun Recognition (Mufrad)','Identify singular nouns (Mufrad) in Arabic text — one person, one object','practice',2,'["visual","verbal"]','["ar-053"]','text analysis, word cards');`);

  // --- Level 6: Grade 1-2 (6-7) - Verb Conjugation & Conversation ---
  console.log("  Batch 21: arabic level 6");
  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('ar-065','arabic','arabic-grammar',6,'6-7','Past Tense Verb Conjugation (Fi''l Madhi)','Conjugate Kataba: Katabtu (كَتَبْتُ I wrote), Katabta (كَتَبْتَ you m.), Katabti (كَتَبْتِ you f.), Kataba (كَتَبَ he), Katabat (كَتَبَت she), Katabna (كَتَبْنَا we), Katabtum (كَتَبْتُم you all), Katabuu (كَتَبُوا they m.)','practice',4,'["verbal","visual"]','["ar-054"]','conjugation chart, exercise book'),
('ar-066','arabic','arabic-grammar',6,'6-7','Present Tense Verb Conjugation (Fi''l Mudari'')','Conjugate Yaktubu: Aktubu (أَكْتُبُ), Taktubu (تَكْتُبُ), Yaktubu (يَكْتُبُ), Taktubu (تَكْتُبُ), Naktubu (نَكْتُبُ) with prefixes and suffixes','practice',4,'["verbal","visual"]','["ar-065"]','conjugation chart, exercise book'),
('ar-067','arabic','arabic-grammar',6,'6-7','Sound Masculine Plural (Jam'' Mudhakkar Salim)','Add ون or ين: Kataba → Katabuu (كَتَبُوا they m. wrote), Yaktub → Yaktubun (يَكْتُبُون they m. write)','practice',3,'["verbal","visual"]','["ar-065"]','plural chart, examples'),
('ar-068','arabic','arabic-grammar',6,'6-7','Sound Feminine Plural (Jam'' Mu''annath Salim)','Add نَ or ات: Katabat → Katabna (كَتَبْنَ they f. wrote), Mu''allimah → Mu''allimat (مُعَلِّمَات teachers)','practice',3,'["verbal","visual"]','["ar-067"]','plural chart, examples'),
('ar-069','arabic','arabic-grammar',6,'6-7','Broken Plural (Jam'' Taksir) Introduction','Some plurals change the root pattern: Kitaab → Kutub (كُتُب books), Maktab → Makatib (مَكَاتِب offices), Taalib → Tullaab (طُلَّاب students)','practice',3,'["verbal","visual"]','["ar-067"]','plural patterns chart, examples'),
('ar-070','arabic','arabic-vocabulary',6,'6-7','Common Surah Vocabulary - Advanced','Learn essential words: Yawm (يَوْم day), Qiyamah (قِيَامَة resurrection), Nas (نَاس mankind), Jinn (جِنّ), Al-Aakhirah (الْآخِرَة the Hereafter)','practice',3,'["verbal","visual"]','["ar-061"]','vocabulary cards, mushaf'),
('ar-071','arabic','arabic-vocabulary',6,'6-7','Arabic Phrases from Daily Worship','SubhanAllah (سُبْحَانَ اللَّه Glory be to Allah), Allahu Akbar (اللَّهُ أَكْبَر Allah is Greatest), Astaghfirullah (أَسْتَغْفِرُ اللَّه I seek Allah forgiveness)','practice',2,'["verbal"]','["ar-062"]','phrase cards, daily usage chart'),
('ar-072','arabic','arabic-conversation',6,'6-7','Extended Arabic Conversation','Practice: introductions, asking about family, describing daily activities, expressing needs and feelings','practice',3,'["verbal"]','["ar-062"]','conversation cards, role play scenarios'),
('ar-073','arabic','arabic-reading',6,'6-7','Reading Longer Quran Passages','Read 3-5 ayat from the Quran with proper harakat, pronunciation, and basic comprehension','practice',4,'["verbal"]','["ar-059"]','mushaf, translation, tafsir'),
('ar-074','arabic','arabic-reading',6,'6-7','Reading Without Harakat','Begin reading text without vowel marks — rely on context, memorized patterns, and word knowledge','practice',3,'["verbal"]','["ar-073"]','unvoweled text, mushaf'),
('ar-075','arabic','arabic-writing',6,'6-7','Writing Arabic Sentences from Dictation','Write full sentences from dictation — apply spelling rules, harakat, and letter joining correctly','practice',3,'["hands-on","verbal"]','["ar-063"]','exercise book, dictation passages'),
('ar-076','arabic','arabic-grammar',6,'6-7','The Five Nouns (Al-Asmaa Al-Khamsah)','Learn special nouns that change ending with tanween: Ism, Zayd, Muta''addi, Ghayr Mutawaqqif, Munada','practice',2,'["verbal","visual"]','["ar-064"]','grammar chart, examples');`);

  console.log("Seeded 230 linguistic curriculum topics");
  console.log("  Tajweed: tj-001 to tj-076 (76 topics across 7 levels)");
  console.log("  Tafsir: tf-001 to tf-084 (84 topics across 7 levels)");
  console.log("  Arabic: ar-001 to ar-076 (76 topics across 7 levels)");
}
