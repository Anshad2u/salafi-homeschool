import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedArabicESL() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='arabic' AND strand='ar-speaking'"
  );
  const cnt = Number(existing[0]?.cnt ?? 1);
  if (cnt > 0) {
    console.log('  Arabic ESL already seeded (' + cnt + ' speaking topics) — skipping.');
    return;
  }
  console.log('  Seeding comprehensive Arabic expansion...');

  const a = 'arabic';
  const t = [
    // ════════════════════════════════════════════════════════
    // SPEAKING & CONVERSATION (ar-speaking) - NEW
    // ════════════════════════════════════════════════════════
    ['aar-sp01',a,'ar-speaking',1,'1-2','Simple Arabic greetings','Learn: السلام عليكم (peace be upon you), وعليكم السلام (and upon you peace). Wave and greet.','practice',3,'["verbal","visual"]','[""]','greeting flashcards, puppet'],
    ['aar-sp02',a,'ar-speaking',1,'1-2','Saying Bismillah','Say: بسم الله (In the name of Allah) before eating, drinking, and starting things. Practice every day.','practice',3,'["verbal"]','[""]','Bismillah poster, snack time practice'],
    ['aar-sp03',a,'ar-speaking',2,'2-3','My name is...','Learn to say: اسمي... (My name is...). أنا... (I am...). Practice introducing yourself in Arabic.','practice',3,'["verbal"]','["aar-sp01"]','name tags, circle time'],
    ['aar-sp04',a,'ar-speaking',2,'2-3','Saying Alhamdulillah','Learn: الحمد لله (All praise is for Allah). Say after eating, after finishing tasks, when happy.','practice',3,'["verbal"]','["aar-sp02"]','Alhamdulillah stickers'],
    ['aar-sp05',a,'ar-speaking',3,'3-4','Asking How are you?','Learn to ask: كيف حالك؟ (How are you?). Answer: أنا بخير (I am fine), الحمد لله.','practice',3,'["verbal"]','["aar-sp03"]','role-play cards, puppets'],
    ['aar-sp06',a,'ar-speaking',3,'3-4','Expressing feelings in Arabic','Learn: أنا سعيد (I am happy), أنا حزين (I am sad), أنا تعبان (I am tired), أنا جائع (I am hungry).','practice',3,'["verbal","visual"]','["aar-sp05"]','feeling flashcards in Arabic'],
    ['aar-sp07',a,'ar-speaking',4,'4-5','Counting aloud 1-20','Count objects aloud in Arabic from 1 to 20. Practice counting toys, fingers, books.','practice',3,'["verbal","hands-on"]','[""]','counting objects, number chart'],
    ['aar-sp08',a,'ar-speaking',4,'4-5','Describing what I see','Practice saying: أرى... (I see...). أرى قطة. أرى كتابا. Describe objects around the room.','practice',3,'["verbal"]','["aar-sp05"]','classroom objects, pointing game'],
    ['aar-sp09',a,'ar-speaking',4,'4-5','Saying please and thank you','Learn: من فضلك (please), شكرا (thank you), عفوا (you are welcome). Use daily.','practice',3,'["verbal"]','[""]','polite words poster, role-play'],
    ['aar-sp10',a,'ar-speaking',5,'5-6','Simple dialogues','Role-play: You are at the store. المشتري: كم ثمن هذا؟ (How much is this?). البائع: خمس ريالات (5 riyals).','practice',3,'["verbal"]','["aar-sp05"]','dialogue cards, props'],
    ['aar-sp11',a,'ar-speaking',5,'5-6','Asking and answering questions','Learn: What is this? هذا؟ ما. Where? أين؟. Who? من؟. Practice asking and answering in pairs.','practice',3,'["verbal"]','[""]','question word cards, partner game'],
    ['aar-sp12',a,'ar-speaking',5,'5-6','Telling my age','Learn: عمري ... سنوات (I am ... years old). كم عمرك؟ (How old are you?). Practice in circle.','practice',2,'["verbal"]','["aar-sp07"]','age number cards'],
    ['aar-sp13',a,'ar-speaking',6,'6-7','Describing my family','Learn: هذه أمي (This is my mother). هذا أبي (This is my father). عندي أخ (I have a brother).','practice',3,'["verbal","visual"]','[""]','family photos, family tree'],
    ['aar-sp14',a,'ar-speaking',6,'6-7','Telling about my day','Learn: أستيقظ صباحا (I wake up in morning), أذهب إلى المدرسة (I go to school), ألعب (I play).','practice',3,'["verbal"]','[""]','daily routine cards'],
    ['aar-sp15',a,'ar-speaking',6,'6-7','Making dua in Arabic','Learn short daily duas: قبل النوم (before sleep), عند الاستيقاظ (upon waking), عند دخول البيت (entering home).','practice',3,'["verbal"]','["aar-sp04"]','dua cards, dua poster'],
    ['aar-sp16',a,'ar-speaking',6,'6-7','Simple presentation','Stand in front and say: السلام عليكم, اسمي..., عندي... سنوات, أحب... Show your favorite toy and describe it.','practice',3,'["verbal"]','["aar-sp13","aar-sp12"]','show and tell items'],

    // ════════════════════════════════════════════════════════
    // LISTENING COMPREHENSION (ar-listening) - NEW
    // ════════════════════════════════════════════════════════
    ['aar-li01',a,'ar-listening',1,'1-2','Listening for letter sounds','Teacher says: أ. Find the Alif card. Listen and point to the letter you hear.','practice',3,'["verbal","visual"]','[""]','letter cards, sound matching game'],
    ['aar-li02',a,'ar-listening',2,'2-3','Following simple instructions','Listen: قف (stand up), اجلس (sit down), افتح الكتاب (open the book), أغمض عينيك (close your eyes).','practice',3,'["verbal","hands-on"]','[""]','instruction cards, movement game'],
    ['aar-li03',a,'ar-listening',3,'3-4','Identifying words by sound','Listen to a word: قَلَم. Find the picture of a pen. Build listening vocabulary.','practice',3,'["verbal","visual"]','["aar-li01"]','picture cards, listening bingo'],
    ['aar-li04',a,'ar-listening',4,'4-5','Listening to short stories','Teacher reads a simple story in Arabic. Ask: Who? What? Where? Use pictures to help understand.','practice',3,'["verbal"]','[""]','Arabic story book, comprehension cards'],
    ['aar-li05',a,'ar-listening',4,'4-5','Listening for details','Listen to a description: إنها كبيرة وحمراء (It is big and red). ما هي؟ (What is it?). Answer: تفاحة (Apple).','practice',3,'["verbal"]','["aar-li04"]','description cards, object guessing'],
    ['aar-li06',a,'ar-listening',5,'5-6','Minimal pairs: ض vs ظ','Learn the difference between ض (dad) and ظ (dha). Listen: رمضان vs عظيم. Can you hear the difference?','practice',2,'["verbal"]','[""]','minimal pair cards, repetition drill'],
    ['aar-li07',a,'ar-listening',5,'5-6','Minimal pairs: س vs ص','Learn the difference between س (seen) and ص (sad). Listen: سيف vs صيف. Practice pronunciation.','practice',2,'["verbal"]','[""]','minimal pair cards, drill'],
    ['aar-li08',a,'ar-listening',6,'6-7','Listen and draw','Teacher describes a scene in Arabic: هناك بيت كبير. أمام البيت شجرة. (There is a big house. In front of the house is a tree). Draw it.','practice',3,'["hands-on"]','["aar-li05"]','paper, crayons, description cards'],

    // ════════════════════════════════════════════════════════
    // QAIDAH / QURAN READING (ar-qaidah) - NEW
    // ════════════════════════════════════════════════════════
    ['aar-qa01',a,'ar-qaidah',2,'2-3','Similar looking letters','Learn letters that look alike: ب ت ث, ج ح خ, د ذ, ر ز, س ش, ص ض, ط ظ, ع غ, ف ق. Compare and contrast.','practice',5,'["visual","verbal"]','[""]','comparison chart, letter sorting'],
    ['aar-qa02',a,'ar-qaidah',3,'3-4','Letters with different forms review','Review: each letter has beginning, middle, end, and isolated form. Practice connecting letters in a word.','practice',3,'["visual","hands-on"]','[""]','letter form chart, magnetic letters'],
    ['aar-qa03',a,'ar-qaidah',3,'3-4','Tanween (double vowels)','Tanween fatha: ـً (an). Tanween kasra: ـٍ (in). Tanween damma: ـٌ (un). Read words with tanween.','practice',5,'["verbal","visual"]','[""]','tanween cards, practice sheet'],
    ['aar-qa04',a,'ar-qaidah',4,'4-5','Madd letters (long vowels)','Alif madd: ا (aa). Waw madd: و (uu). Ya madd: ي (ii). Read: كِتاب, قُول, بَاب, يَقُول.','practice',5,'["verbal","visual"]','[""]','madd letter poster, word cards'],
    ['aar-qa05',a,'ar-qaidah',4,'4-5','Standing movements (khari harakaat)','Small alif stands for long fatha. Small waw for long damma. Small ya for long kasra. Read these in words.','practice',3,'["verbal","visual"]','["aar-qa04"]','standing movements chart'],
    ['aar-qa06',a,'ar-qaidah',4,'4-5','Leen letters (soft letters)','Waw sakin preceded by fatha (و). Ya sakin preceded by fatha (ي). Read: خَوْف, بَيْت, شَيْء.','practice',3,'["verbal"]','[""]','leen letter cards, word list'],
    ['aar-qa07',a,'ar-qaidah',5,'5-6','Shaddah with sukoon practice','Read words with shaddah AND sukoon: مُحَمَّد, إِنَّ. Two sounds: hold the letter.','practice',5,'["verbal"]','[""]','shaddah practice cards'],
    ['aar-qa08',a,'ar-qaidah',5,'5-6','Muqattaat (abbreviated Quranic letters)','Learn the special letter combinations: الم, الر, المص, كهيعص, طه, يس, ص, حم. Know these from the Quran.','practice',3,'["verbal","visual"]','[""]','Muqattaat poster, Quran verses'],
    ['aar-qa09',a,'ar-qaidah',6,'6-7','Tafkheem and Tarqeeq (heavy and light letters)','Heavy letters: خ ص ض ط ظ غ ق. All others are light. Letter ر can be both. Practice pronunciation.','practice',3,'["verbal"]','[""]','heavy/light letter chart, drill cards'],
    ['aar-qa10',a,'ar-qaidah',6,'6-7','Makharij (articulation points)','Learn where each letter comes from: throat, tongue, lips, nose. Group letters by makhraj.','practice',3,'["verbal","visual"]','[""]','articulation diagram, mouth chart'],
    ['aar-qa11',a,'ar-qaidah',6,'6-7','Reading Quranic verses slowly','Read short surahs with correct pronunciation: Al-Fatiha, Al-Ikhlas, Al-Falaq, An-Nas. Focus on each letter.','practice',5,'["verbal"]','[""]','Quran, tajweed color-coded mushaf'],

    // ════════════════════════════════════════════════════════
    // ISLAMIC EXPRESSIONS & ADHKAR (ar-expressions) - NEW
    // ════════════════════════════════════════════════════════
    ['aar-ex01',a,'ar-expressions',1,'1-2','Bismillah before everything','Say: بسم الله before: eating, drinking, entering home, starting any action.','practice',3,'["verbal"]','[""]','Bismillah poster, cue cards'],
    ['aar-ex02',a,'ar-expressions',1,'1-2','Alhamdulillah for everything','Say: الحمد لله when: finishing a meal, completing a task, feeling good. Be thankful.','practice',3,'["verbal"]','[""]','Alhamdulillah chart'],
    ['aar-ex03',a,'ar-expressions',2,'2-3','Mashallah and Subhanallah','Mashallah (ما شاء الله) — when you see something beautiful. Subhanallah (سبحان الله) — when you see something amazing.','practice',3,'["verbal"]','[""]','nature picture cards, tasbeeh'],
    ['aar-ex04',a,'ar-expressions',2,'2-3','In sha Allah','Say: إن شاء الله when talking about the future. I will do it tomorrow, in sha Allah.','practice',3,'["verbal"]','[""]','future planning cards'],
    ['aar-ex05',a,'ar-expressions',3,'3-4','Assalamu Alaykum and reply','Greeting: السلام عليكم ورحمة الله وبركاته. Reply: وعليكم السلام ورحمة الله وبركاته. Full version.','practice',3,'["verbal"]','[""]','greeting dialogue cards'],
    ['aar-ex06',a,'ar-expressions',3,'3-4','Jazakallah khair','Say: جزاك الله خيرا (May Allah reward you with good). Use to thank someone properly in Islam.','practice',3,'["verbal"]','[""]','thank you cards'],
    ['aar-ex07',a,'ar-expressions',4,'4-5','Daily morning and evening adhkar','Learn short duas for morning: أصبحنا وأصبح الملك لله. Evening: أمسينا وأمسى الملك لله.','practice',3,'["verbal"]','[""]','morning/evening adhkar cards'],
    ['aar-ex08',a,'ar-expressions',4,'4-5','Dua for entering and leaving home','Enter: بسم الله ولجنا وبسم الله خرجنا وعلى الله ربنا توكلنا. Leave: بسم الله توكلت على الله ولا حول ولا قوة إلا بالله.','practice',3,'["verbal"]','[""]','home dua poster'],
    ['aar-ex09',a,'ar-expressions',5,'5-6','Dua before and after eating','Before: اللهم بارك لنا فيما رزقتنا وقنا عذاب النار. After: الحمد لله الذي أطعمنا وسقانا وجعلنا من المسلمين.','practice',3,'["verbal"]','[""]','dining adhkar cards'],
    ['aar-ex10',a,'ar-expressions',5,'5-6','Dua for sleeping and waking','Before sleep: باسمك اللهم أموت وأحيا. Upon waking: الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور.','practice',3,'["verbal"]','[""]','sleep/wake dua cards'],
    ['aar-ex11',a,'ar-expressions',6,'6-7','Dua for entering and leaving masjid','Entering: اللهم افتح لي أبواب رحمتك. Leaving: اللهم إني أسألك من فضلك.','practice',2,'["verbal"]','[""]','masjid etiquette cards'],
    ['aar-ex12',a,'ar-expressions',6,'6-7','Dua when sneezing','Learn: When you sneeze say: الحمد لله. Others say: يرحمك الله. Reply: يهديكم الله ويصلح بالكم.','practice',2,'["verbal"]','[""]','sneeze etiquette role-play'],

    // ════════════════════════════════════════════════════════
    // EXPANDED VOCABULARY (ar-vocab)
    // ════════════════════════════════════════════════════════
    ['aar-vc01',a,'ar-vocab',2,'2-3','Clothes in Arabic','Learn: قميص (shirt), بنطلون (pants), فستان (dress), حذاء (shoes), جورب (socks), حجاب (hijab).','practice',3,'["visual","verbal"]','[""]','clothing flashcards, dress-up game'],
    ['aar-vc02',a,'ar-vocab',2,'2-3','Toys in Arabic','Learn: لعبة (toy), كرة (ball), دمية (doll), سيارة (car), قطار (train), مكعبات (blocks).','practice',3,'["visual","verbal"]','[""]','toy flashcards, toy basket activity'],
    ['aar-vc03',a,'ar-vocab',3,'3-4','Transport in Arabic','Learn: سيارة (car), حافلة (bus), طائرة (airplane), قطار (train), سفينة (ship), دراجة (bicycle).','practice',3,'["visual","verbal"]','[""]','transport flashcards, vehicle sounds'],
    ['aar-vc04',a,'ar-vocab',3,'3-4','More food and drinks','Learn: دجاج (chicken), لحم (meat), سمك (fish), بيض (eggs), جبن (cheese), زبادي (yogurt), عصير (juice), شاي (tea).','practice',3,'["visual","verbal"]','[""]','food flashcards, shopping game'],
    ['aar-vc05',a,'ar-vocab',4,'4-5','Fruits and vegetables expanded','Learn: برتقال (orange), عنب (grapes), فراولة (strawberry), بطيخ (watermelon), خيار (cucumber), جزر (carrot), فلفل (pepper).','practice',3,'["visual","verbal"]','[""]','fruit/vegetable flashcards, sorting game'],
    ['aar-vc06',a,'ar-vocab',4,'4-5','Occupations in Arabic','Learn: طبيب (doctor), مهندس (engineer), معلم (teacher), مزارع (farmer), شرطي (police), طيار (pilot), نجار (carpenter).','practice',3,'["visual","verbal"]','[""]','occupation flashcards, dress-up role play'],
    ['aar-vc07',a,'ar-vocab',4,'4-5','Shapes in Arabic','Learn: دائرة (circle), مربع (square), مثلث (triangle), مستطيل (rectangle), نجمة (star), قلب (heart).','practice',3,'["visual","hands-on"]','[""]','shape blocks, shape hunt game'],
    ['aar-vc08',a,'ar-vocab',5,'5-6','Opposites in Arabic','Learn: كبير/صغير (big/small), طويل/قصير (tall/short), سريع/بطيء (fast/slow), حار/بارد (hot/cold), جديد/قديم (new/old).','practice',3,'["visual","verbal"]','[""]','opposite cards, matching game'],
    ['aar-vc09',a,'ar-vocab',5,'5-6','Emotions and feelings','Learn: فرحان (happy), حزين (sad), غاضب (angry), خائف (scared), متفاجئ (surprised), متعب (tired).','practice',3,'["visual","verbal"]','[""]','emotion flashcards, feelings chart'],
    ['aar-vc10',a,'ar-vocab',5,'5-6','Nature and outdoors','Learn: شجرة (tree), زهرة (flower), نهر (river), جبل (mountain), بحر (sea), سماء (sky), قمر (moon), شمس (sun).','practice',3,'["visual","verbal"]','[""]','nature cards, outdoor walk activity'],
    ['aar-vc11',a,'ar-vocab',5,'5-6','Time words in Arabic','Learn: اليوم (today), أمس (yesterday), غدا (tomorrow), صباح (morning), مساء (evening), ليل (night).','practice',2,'["verbal","visual"]','[""]','time word cards, daily schedule'],
    ['aar-vc12',a,'ar-vocab',6,'6-7','Days of the week in Arabic','Learn: يوم الأحد (Sunday), الإثنين (Monday), الثلاثاء (Tuesday), الأربعاء (Wednesday), الخميس (Thursday), الجمعة (Friday), السبت (Saturday).','practice',3,'["verbal","visual"]','[""]','days chart, weekly planner'],
    ['aar-vc13',a,'ar-vocab',6,'6-7','Months in Arabic','Learn: محرم, صفر, ربيع الأول, ربيع الآخر, جمادى الأولى, جمادى الآخرة, رجب, شعبان, رمضان, شوال, ذو القعدة, ذو الحجة.','practice',3,'["verbal","visual"]','[""]','Islamic months chart, Ramadan activity'],
    ['aar-vc14',a,'ar-vocab',6,'6-7','Sports and activities','Learn: كرة القدم (football), سباحة (swimming), جري (running), ركوب الدراجة (cycling), كرة السلة (basketball).','practice',2,'["visual","verbal"]','[""]','sport flashcards, action game'],
    ['aar-vc15',a,'ar-vocab',6,'6-7','In the kitchen','Learn: ثلاجة (fridge), فرن (oven), مغسلة (sink), كوب (cup), طبق (plate), ملعقة (spoon), شوكة (fork), سكين (knife).','practice',2,'["visual","verbal"]','[""]','kitchen flashcards, matching game'],
    ['aar-vc16',a,'ar-vocab',6,'6-7','Colors expanded','Learn new colors: بنفسجي (purple), زهري (pink), بني (brown), رمادي (gray), برتقالي (orange), أسود (black), أبيض (white).','practice',2,'["visual","verbal"]','[""]','color chart, color hunt activity'],

    // ════════════════════════════════════════════════════════
    // EXTENDED GRAMMAR (ar-grammar)
    // ════════════════════════════════════════════════════════
    ['aar-gr01',a,'ar-grammar',3,'3-4','Definite article Al','The ال (Al) makes a noun definite. كتاب (a book) vs الكتاب (the book). Practice adding Al to nouns.','practice',3,'["verbal","hands-on"]','[""]','Al- cards, definite/indefinite sorting'],
    ['aar-gr02',a,'ar-grammar',4,'4-5','Demonstrative pronouns: this and that','هذا (this m), هذه (this f), ذلك (that m), تلك (that f). Point and say.','practice',3,'["verbal","visual"]','[""]','demonstrative cards, pointing game'],
    ['aar-gr03',a,'ar-grammar',4,'4-5','Dual form (Muthanna)','For two things: كتابان (two books), مُعَلِّمان (two teachers). Add ان or ين to nouns.','practice',3,'["verbal","visual"]','[""]','dual cards, pair matching'],
    ['aar-gr04',a,'ar-grammar',5,'5-6','Sound masculine and feminine plurals','Masculine plural: مُعَلِّمون (teachers). Feminine plural: مُعَلِّمات (female teachers). Regular endings.','practice',3,'["verbal","visual"]','[""]','plural cards, singular/plural charts'],
    ['aar-gr05',a,'ar-grammar',5,'5-6','Broken plurals (Jamu Taksir)','Words change shape: كتاب (book) -> كُتُب (books). قلم (pen) -> أقلام (pens). Learn common patterns.','practice',3,'["verbal","visual"]','[""]','broken plural cards, word sort game'],
    ['aar-gr06',a,'ar-grammar',5,'5-6','Attached pronouns (Dhamair Muttasila)','My: ي (kitabi my book). Your: ك (kitabuka). His: ه (kitabuhu). Her: ها (kitabuha). Our: نا (kitabuna).','practice',3,'["verbal","hands-on"]','[""]','pronoun cards, sentence building'],
    ['aar-gr07',a,'ar-grammar',6,'6-7','Past tense verbs (Fiil Madhi)','Learn past verb forms: كتب (he wrote), كتبت (I wrote), كتبنا (we wrote). Focus on common verbs.','practice',3,'["verbal"]','[""]','verb conjugation chart, drill cards'],
    ['aar-gr08',a,'ar-grammar',6,'6-7','Present tense verbs (Fiil Mudari)','Learn present verb forms: يكتب (he writes), أكتب (I write), نكتب (we write). Compare to past tense.','practice',3,'["verbal"]','[""]','present tense chart, conjugation practice'],
    ['aar-gr09',a,'ar-grammar',6,'6-7','Nominal sentences (Jumlah Ismiyyah)','Sentence starts with a noun: الطالب مجتهد (The student is hardworking). Subject + predicate.','practice',3,'["verbal"]','[""]','sentence building cards, grammar chart'],
    ['aar-gr10',a,'ar-grammar',6,'6-7','Verbal sentences (Jumlah Filiyyah)','Sentence starts with a verb: كتب الطالب (The student wrote). Verb + subject + object.','practice',3,'["verbal"]','[""]','sentence building cards, grammar chart'],

    // ════════════════════════════════════════════════════════
    // EXTENDED READING (ar-reading)
    // ════════════════════════════════════════════════════════
    ['aar-re01',a,'ar-reading',4,'4-5','Reading words with shaddah','Practice reading words with shaddah: مُحَمَّد, إنَّ, شَدَّة, رَبَّنا. Double the letter sound.','practice',3,'["verbal"]','[""]','shaddah word cards, practice list'],
    ['aar-re02',a,'ar-reading',5,'5-6','Reading short stories','Read a simple Arabic story: الأسد والفأر (The Lion and the Mouse). Understand the meaning.','practice',3,'["verbal","visual"]','[""]','Arabic storybook, comprehension questions'],
    ['aar-re03',a,'ar-reading',5,'5-6','Reading comprehension: Who, What, Where','Read a paragraph. Answer: من؟ (Who?), ماذا؟ (What?), أين؟ (Where?). Use complete sentences.','practice',3,'["verbal"]','[""]','reading passage, question cards'],
    ['aar-re04',a,'ar-reading',6,'6-7','Reading comprehension: Main idea','Read a short text. What is the main idea? Summarize in one sentence in Arabic.','practice',3,'["verbal"]','["aar-re03"]','reading passages, main idea cards'],
    ['aar-re05',a,'ar-reading',6,'6-7','Reading Arabic poetry for children','Read simple Arabic nursery rhymes and poems. Learn rhythm and rhyme in Arabic.','practice',2,'["verbal"]','[""]','Arabic poem cards, audio recordings'],
    ['aar-re06',a,'ar-reading',6,'6-7','Synonyms and antonyms in Arabic','Learn words with the same meaning: كبير = ضخم (big). Opposite: كبير vs صغير. Expand reading vocabulary.','practice',2,'["verbal"]','[""]','synonym/antonym cards, word sort'],
    ['aar-re07',a,'ar-reading',6,'6-7','Writing simple sentences in Arabic','Write: هذا كتابي (This is my book). أنا أحب المدرسة (I love school). Practice correct letter connections.','practice',3,'["hands-on"]','[""]','writing notebook, sentence templates'],
    ['aar-re08',a,'ar-reading',6,'6-7','Writing a short paragraph','Write 3-4 sentences about: My family, My pet, My favorite food. Use correct grammar and vocabulary.','practice',3,'["hands-on"]','["aar-re07"]','writing prompts, vocabulary bank'],
  ];

  for (let i = 0; i < t.length; i += 5) {
    const batch = t.slice(i, i + 5);
    const values = batch.map(r =>
      `('${r[0]}','${r[1]}','${r[2]}',${r[3]},'${r[4]}','${r[5]}','${r[6]}','${r[7]}',${r[8]},'${r[9]}','${r[10]}','${r[11]}')`
    ).join(',');
    await prisma.$executeRawUnsafe(
      `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
    );
    console.log(`  Arabic Batch ${Math.floor(i/5)+1}: topics ${i+1}-${Math.min(i+5,t.length)}`);
  }
  console.log(`  Seeded ${t.length} Arabic topics`);
}
