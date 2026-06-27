import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedTajweedEnhanced() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='tajweed' AND strand='tj-sifaat'"
  );
  const cnt = Number(existing[0]?.cnt ?? 1);
  if (cnt > 0) {
    console.log('  Tajweed enhanced already seeded — skipping.');
    return;
  }
  console.log('  Seeding comprehensive Tajweed & Quran expansion...');

  const j = 'tajweed';
  const t = [
    // ════════════════════════════════════════════════════════════
    // SIFAAT (tj-sifaat) - Letter Characteristics
    // ════════════════════════════════════════════════════════════
    ['tej-sf01',j,'tj-sifaat',4,'4-5','Introduction to Sifaat','Learn that every Arabic letter has characteristics (sifaat). Some are loud, some are soft. Some are strong. These make each letter unique.','introduction',2,'["verbal","visual"]','[""]','sifaat poster, letter charts'],
    ['tej-sf02',j,'tj-sifaat',4,'4-5','Hams and Jahr','Hams (whisper: breath flows out) — 10 letters: ف ح ث ش س ت ص ك ه. Jahr (loud: breath stops) — all other letters. Practice both.','practice',3,'["verbal"]','["tej-sf01"]','hams/jahr chart, practice cards'],
    ['tej-sf03',j,'tj-sifaat',4,'4-5','Shiddah, Rakhawah, and Tawassut','Shiddah (strong: sound stops) — 8 letters: أ ج د ق ط ب ك. Rakhawah (soft: sound flows). Tawassut (medium) — 5 letters.','practice',3,'["verbal"]','["tej-sf02"]','strength chart, drill cards'],
    ['tej-sf04',j,'tj-sifaat',5,'5-6','Istila (Heavy/Full Mouth)','7 letters always heavy: خ ص ض ط ظ غ ق. Mouth rises when pronouncing. All others are Istifal (light, mouth stays down).','practice',3,'["verbal","visual"]','["tej-sf01"]','heavy letter chart, mirror'],
    ['tej-sf05',j,'tj-sifaat',5,'5-6','Itbaq and Infitah','Itbaq (adhesion: tongue sticks to roof): ص ض ط ظ. Infitah (open: tongue stays down): all other letters.','practice',2,'["verbal"]','["tej-sf04"]','practice words from Quran'],
    ['tej-sf06',j,'tj-sifaat',5,'5-6','Izlaq and Ismat','Izlaq (quick: edge of tongue/lips) — 6 letters: ف ر ل م ن ب. Ismat (held back: deep in mouth) — remaining 22 letters.','practice',2,'["verbal"]','["tej-sf01"]','articulation practice'],
    ['tej-sf07',j,'tj-sifaat',5,'5-6','Safir (Whistling Letters)','Three whistling letters: ص (sad), ز (zay), س (seen). Air passes between tongue and teeth producing a whistle sound.','practice',3,'["verbal"]','[""]','safir examples, drill words'],
    ['tej-sf08',j,'tj-sifaat',6,'6-7','Qalqalah in Detail (Echo Sound)','Qalqalah letters: ق ط ب ج د (qutbujad). When they have sukoon, make an echoing sound. Three levels: strongest (ق ط), medium (ج), weakest (ب د).','practice',3,'["verbal"]','[""]','qalqalah examples, practice surahs'],
    ['tej-sf09',j,'tj-sifaat',6,'6-7','Leen (Soft Pronunciation)','Two leen letters: و and ي when they have sukoon and preceded by fatha. Soft gentle sound: خَوْف, بَيْت, قُرَيْش.','practice',3,'["verbal"]','[""]','leen word cards, practice list'],
    ['tej-sf10',j,'tj-sifaat',6,'6-7','Inhiraf (Inclination)','Two letters with inclination: ر and ل. The sound inclines from the articulation point. Practice correct pronunciation.','practice',2,'["verbal"]','[""]','drill cards, teacher guidance'],
    ['tej-sf11',j,'tj-sifaat',6,'6-7','Ghunnah (Nasalization)','Ghunnah is a nasal sound from the nose. It is a characteristic of ن and م. Duration: 2 counts. Occurs in noon and meem mushaddad.','practice',3,'["verbal"]','[""]','ghunnah examples, nose-pinch test'],

    // ════════════════════════════════════════════════════════════
    // MADD RULES (tj-madd) - Elongation
    // ════════════════════════════════════════════════════════════
    ['tej-md01',j,'tj-madd',4,'4-5','Madd Asli (Natural Elongation)','Natural madd: alif madd (2 counts), waw madd (2 counts), ya madd (2 counts). No reason for extension beyond 2 counts.','practice',3,'["verbal"]','[""]','madd asli chart, Quranic examples'],
    ['tej-md02',j,'tj-madd',5,'5-6','Madd Muttasil (Connected Elongation)','Madd letter followed by hamza IN THE SAME WORD. Length: 4-5 counts. Example: جَاءَ, السُّوَء, شَيْء.','practice',3,'["verbal"]','["tej-md01"]','Quranic examples, practice list'],
    ['tej-md03',j,'tj-madd',5,'5-6','Madd Munfasil (Separated Elongation)','Madd letter at end of one word and hamza at start of next word. Length: 4-5 counts. Example: يَا أَيُّهَا.','practice',3,'["verbal"]','["tej-md01"]','Quranic examples, mushaf search'],
    ['tej-md04',j,'tj-madd',5,'5-6','Madd Lazim (Obligatory Elongation)','Madd followed by sukoon or shaddah. Length: 6 counts. Types: Kalimi (word) and Harfi (letter). Example: الْحَاقَّة, الم.','practice',3,'["verbal"]','["tej-md02","tej-md03"]','madd lazim examples, heavy practice'],
    ['tej-md05',j,'tj-madd',6,'6-7','Madd Arid Lil-Sukoon','Madd letter before a letter that gets a temporary sukoon when stopping. Length: 2, 4, or 6 counts. Very common in Quran.','practice',3,'["verbal"]','["tej-md01"]','Quranic examples, stopping practice'],
    ['tej-md06',j,'tj-madd',6,'6-7','Madd Leen (Soft Elongation)','Leen letter followed by hamza or sukoon. Leen with sukoon when stopping: 2-4-6 counts. Example: بَيْت, خَوْف.','practice',3,'["verbal"]','["tej-sf09","tej-md05"]','leen madd examples'],
    ['tej-md07',j,'tj-madd',6,'6-7','Madd Badal (Exchange Elongation)','When hamza comes before a madd letter. Length: 2 counts only. Example: آدَم (originally أَأْدَم).','practice',2,'["verbal"]','["tej-md01"]','examples from Quran, drill'],
    ['tej-md08',j,'tj-madd',6,'6-7','Madd Tamkeen (Strengthening Elongation)','When two ya letters come together, first with kasra and shaddah, second with sukoon. Length: 2 counts. Example: حُيِّيتُم, نَبِيِّين.','practice',2,'["verbal"]','["tej-md01"]','Quranic examples, practice'],
    ['tej-md09',j,'tj-madd',6,'6-7','Madd Iwad (Compensation Elongation)','Compensation tanween fatha when stopping. Length: 1 alif (2 counts). Example: كَرِيماً -> كَرِيمَا (when stopping).','practice',2,'["verbal"]','["tej-md05"]','stopping practice, examples'],
    ['tej-md10',j,'tj-madd',6,'6-7','Madd Farqi (Distinguishing Elongation)','Madd added to distinguish between a question and a statement. Length: 6 counts. Example in the Quran: آلذَّكَرَيْن (6:143).','practice',2,'["verbal","visual"]','["tej-md04"]','Quranic examples, teacher explanation'],

    // ════════════════════════════════════════════════════════════
    // WAQF & IBTIDA (tj-waqf) - Stopping and Starting
    // ════════════════════════════════════════════════════════════
    ['tej-wq01',j,'tj-waqf',4,'4-5','Introduction to Waqf (Stopping)','Waqf means to stop at the end of a word. We stop to take a breath. Learn the correct way to stop in recitation.','introduction',2,'["verbal"]','[""]','Quran mushaf, waqf sign poster'],
    ['tej-wq02',j,'tj-waqf',5,'5-6','Compulsory Stop (م)','The letter م written in the mushaf means a compulsory stop. You MUST stop here. If you do not, the meaning changes.','practice',2,'["verbal","visual"]','["tej-wq01"]','Quranic examples, mushaf practice'],
    ['tej-wq03',j,'tj-waqf',5,'5-6','Permitted and Preferred Stops','ج = permitted to stop (both ways OK). صلي = better to STOP. قلى = better to CONTINUE. Practice each sign in the mushaf.','practice',3,'["verbal","visual"]','["tej-wq02"]','waqf sign reference card'],
    ['tej-wq04',j,'tj-waqf',5,'5-6','Prohibited Stop (لا)','لا means DO NOT STOP. If you stop here accidentally, you must go back a few words. The meaning changes if you stop.','practice',2,'["verbal"]','["tej-wq02"]','Quranic examples, mushaf practice'],
    ['tej-wq05',j,'tj-waqf',6,'6-7','Stopping on Word Endings','When stopping: tanween fatha becomes alif (كَرِيمًا -> كَرِيمَا). Tanween kasra/damma becomes sukoon. Ta marbuta becomes ha (رَحْمَة -> رَحْمَه).','practice',4,'["verbal"]','["tej-wq01"]','stopping rule chart, practice text'],
    ['tej-wq06',j,'tj-waqf',6,'6-7','Hamzat al-Wasl (Connecting Hamza)','When starting a word with hamzat al-wasl, pronounce the hamza. When continuing from previous word, skip the hamza. Example: بِسْمِ الله vs بِسْمِ ٱللَّه.','practice',3,'["verbal"]','[""]','wasl examples, start/continue practice'],
    ['tej-wq07',j,'tj-waqf',6,'6-7','Ibtida (Starting After Stopping)','After stopping, how do you start again? You can go back to the beginning of the verse or a meaningful phrase. Never start on a word that changes meaning.','practice',3,'["verbal"]','["tej-wq05"]','ibtida practice with mushaf'],
    ['tej-wq08',j,'tj-waqf',6,'6-7','Waqf Practice with Surahs','Practice stopping rules with Juz Amma surahs. Read a verse, stop correctly, then start again. Teacher checks each stop.','practice',4,'["verbal"]','["tej-wq03","tej-wq04","tej-wq05"]','Quran mushaf, waqf checklist'],

    // ════════════════════════════════════════════════════════════
    // TAFKHEEM & TARQEEQ (tj-tafkheem) - Heavy & Light
    // ════════════════════════════════════════════════════════════
    ['tej-tf01',j,'tj-tafkheem',4,'4-5','Seven Heavy Letters','The 7 letters of Istila: خ ص ض ط ظ غ ق. They always have a full mouth sound (tafkheem). All other letters are light (tarqeeq).','practice',3,'["verbal","visual"]','[""]','heavy letters poster, drill cards'],
    ['tej-tf02',j,'tj-tafkheem',5,'5-6','Rules of Letter Ra (Heavy or Light)','Ra (ر) can be HEAVY (thick) or LIGHT (thin). HEAVY: ر with fatha/damma, sukoon with fatha/damma before. LIGHT: ر with kasra.','practice',3,'["verbal"]','["tej-tf01"]','ra rule chart, Quranic examples'],
    ['tej-tf03',j,'tj-tafkheem',5,'5-6','Lam of Allah (Laam al-Jalalah)','Lam in the word الله: HEAVY (thick) when preceded by fatha or damma (قالَ الله). LIGHT (thin) when preceded by kasra (بِسْمِ الله).','practice',3,'["verbal"]','["tej-tf01"]','laam al-jalalah examples, practice'],
    ['tej-tf04',j,'tj-tafkheem',5,'5-6','Alif with Tafkheem and Tarqeeq','Alif takes the same heaviness/lightness as the letter before it. After heavy letter: heavy alif. After light letter: light alif.','practice',2,'["verbal"]','["tej-tf01"]','alif examples, practice words'],
    ['tej-tf05',j,'tj-tafkheem',6,'6-7','Tafkheem Practice with Quranic Verses','Practice reading verses that contain heavy and light letters. Learn to switch smoothly between both in one verse.','practice',4,'["verbal"]','["tej-tf02","tej-tf03"]','practice surahs, teacher guidance'],

    // ════════════════════════════════════════════════════════════
    // TAJWEED IN SALAH (tj-salah) - Applying in Prayer
    // ════════════════════════════════════════════════════════════
    ['tej-sl01',j,'tj-salah',5,'5-6','Al-Fatihah with Tajweed in Salah','Recite Al-Fatihah with complete tajweed: izhar on noon in (اهدنا), ghunnah on meem in (عليهم), qalqalah on (ولَا الضَّالِّين), proper madd.','practice',3,'["verbal"]','[""]','color-coded mushaf, audio reference'],
    ['tej-sl02',j,'tj-salah',5,'5-6','Reciting Short Surahs with Tajweed','Recite Ikhlas, Falaq, Nas in salah with correct: tashdeed (الله الصَّمَد), ghunnah (مِن شَرّ), madd (الْفَلَق), qalqalah (أَحَد).','practice',4,'["verbal"]','["tej-sl01"]','color-coded mushaf, checklist'],
    ['tej-sl03',j,'tj-salah',5,'5-6','Waqf During Salah Recitation','Apply correct stopping at the end of each verse. Do not stop in the middle of verses in Al-Fatihah. Pause after Amin.','practice',3,'["verbal"]','["tej-wq01"]','salah practice, teacher guidance'],
    ['tej-sl04',j,'tj-salah',6,'6-7','Loud and Silent Recitation','Jahr (loud): Fajr, Maghrib, Isha first two rakah. Sirr (silent): Dhuhr, Asr, third rakah of Maghrib, last two of Isha.','practice',2,'["verbal"]','[""]','salah schedule, practice'],
    ['tej-sl05',j,'tj-salah',6,'6-7','Additional Recitations in Salah','Learn what to recite besides Al-Fatihah: last ten surahs for short, Al-Ala or Al-Ghashiyah for longer in Fajr. Duas in rukoo and sujood.','practice',3,'["verbal"]','["tej-sl01"]','salah dua cards, reference list'],
    ['tej-sl06',j,'tj-salah',6,'6-7','Dua Qunoot with Tajweed','Learn Dua Qunoot recited in Witr prayer. Proper waqf at each phrase. Correct madd and ghunnah throughout.','practice',3,'["verbal"]','["tej-sl01"]','qunoot text with tajweed marks'],

    // ════════════════════════════════════════════════════════════
    // QURAN MEMORIZATION EXPANSION (tj-quran-memorize)
    // ════════════════════════════════════════════════════════════
    ['tej-hf01',j,'tj-quran-memorize',4,'4-5','Memorize Surah Al-Adiyat (100)','Memorize Surah Al-Adiyat. Apply: qalqalah on (وَالْعَادِيَات), sukoon practice. Meaning: oath by horses.','practice',5,'["verbal"]','[""]','Quran, audio, rewards chart'],
    ['tej-hf02',j,'tj-quran-memorize',4,'4-5','Memorize Surah Al-Qariah (101)','Memorize Surah Al-Qariah. Apply: heavy ra in (الْقَارِعَة), madd in (الْمَوَازِين). Meaning: The Striking Hour.','practice',5,'["verbal"]','["tej-hf01"]','Quran, audio, revision tracker'],
    ['tej-hf03',j,'tj-quran-memorize',4,'4-5','Memorize Surah At-Takathur (102)','Memorize Surah At-Takathur. Apply: ghunnah in (حَتَّى زُرْتُم), waqf practice. Meaning: Competition in worldly increase.','practice',5,'["verbal"]','["tej-hf02"]','Quran, audio, revision cards'],
    ['tej-hf04',j,'tj-quran-memorize',5,'5-6','Memorize Surah Al-Alaq (96)','Memorize Surah Al-Alaq (first 5 verses first). Apply: ghunnah on (خَلَقَ), waqf at (بِاسْمِ). Meaning: The Clot / First Revelation.','practice',6,'["verbal"]','["tej-hf03"]','Quran, tafsir of first revelation'],
    ['tej-hf05',j,'tj-quran-memorize',5,'5-6','Memorize Surah Al-Qadr (97)','Memorize Surah Al-Qadr. Apply: madd in (لَيْلَةُ الْقَدْرِ), sukoon and tashdeed practice. Meaning: Night of Decree.','practice',5,'["verbal"]','["tej-hf04"]','Quran, virtues of Laylatul Qadr'],
    ['tej-hf06',j,'tj-quran-memorize',5,'5-6','Memorize Surah Al-Bayyinah (98)','Memorize Surah Al-Bayyinah (longer surah). Apply: all tajweed rules together. Meaning: The Clear Proof.','practice',6,'["verbal"]','["tej-hf05"]','Quran, color-coded, teacher check'],
    ['tej-hf07',j,'tj-quran-memorize',5,'5-6','Memorize Surah At-Tin (95)','Memorize Surah At-Tin. Apply: leen in (بِبَعْث), qalqalah in (الْحَاكِمِين). Meaning: Oath by the Fig and Olive.','practice',5,'["verbal"]','["tej-hf06"]','Quran, fruit/nature connection'],
    ['tej-hf08',j,'tj-quran-memorize',5,'5-6','Memorize Surah Ash-Sharh (94)','Memorize Surah Ash-Sharh. Apply: ghunnah in (فَلَا تَنْهَر), ra rules. Meaning: The Opening of the Heart (Consolation).','practice',4,'["verbal"]','["tej-hf07"]','Quran, tafsir of Prophet story'],
    ['tej-hf09',j,'tj-quran-memorize',5,'5-6','Memorize Surah Ad-Duha (93)','Memorize Surah Ad-Duha. Apply: madd munfasil (وَاللَّيْلِ إِذَا), waqf at end of each verse. Meaning: The Morning Brightness.','practice',5,'["verbal"]','["tej-hf08"]','Quran, tafsir of Prophets consolation'],
    ['tej-hf10',j,'tj-quran-memorize',5,'5-6','Memorize Surah Al-Fatihah (1)','Memorize Surah Al-Fatihah with COMPLETE tajweed. Every rule applied. This is the most recited surah in our lives.','mastery',6,'["verbal"]','[""]','color-coded mushaf, audio of Qari'],
    ['tej-hf11',j,'tj-quran-memorize',6,'6-7','Memorize Surah Al-Ala (87)','Memorize Surah Al-Ala. Apply: heavy ra (الْأَعْلَى), madd lazim (الْأَعْلَى). Meaning: The Most High.','practice',6,'["verbal"]','["tej-hf10","tej-hf09"]','Quran, teacher guidance'],
    ['tej-hf12',j,'tj-quran-memorize',6,'6-7','Memorize Surah At-Tariq (86)','Memorize Surah At-Tariq. Apply: qalqalah (وَالسَّمَاء وَالطَّارِق), ikhfa. Meaning: The Nightcomer.','practice',5,'["verbal"]','["tej-hf11"]','Quran, reflection on creation'],
    ['tej-hf13',j,'tj-quran-memorize',6,'6-7','Memorize Surah Al-Buruj (85)','Memorize Surah Al-Buruj (long surah). Apply: madd lazim (بُرُوج), ikhfa and idgham throughout. Meaning: The Constellations.','practice',7,'["verbal"]','["tej-hf12"]','Quran, story of the People of the Ditch'],
    ['tej-hf14',j,'tj-quran-memorize',6,'6-7','Memorize Surah Al-Ghashiyah (88)','Memorize Surah Al-Ghashiyah. Apply: ra rules, ghunnah practice throughout. Meaning: The Overwhelming Event.','practice',6,'["verbal"]','["tej-hf13"]','Quran, reflection on Paradise and Hell'],
    ['tej-hf15',j,'tj-quran-memorize',6,'6-7','Memorize Surah Al-Inshiqaq (84)','Memorize Surah Al-Inshiqaq. Apply: madd iwad at end of verses, waqf practice. Meaning: The Splitting Open.','practice',6,'["verbal"]','["tej-hf14"]','Quran, connects to Judgment Day theme'],
    ['tej-hf16',j,'tj-quran-memorize',6,'6-7','Daily Hifz Revision Routine','Create a revision system: new surah + yesterday + last week + last month. 15 minutes daily. Use the three-cycle method.','practice',7,'["verbal"]','[""]','revision planner, surah checklist'],
    ['tej-hf17',j,'tj-quran-memorize',6,'6-7','Recite All Surahs from An-Nas to Ad-Duha','Master recitation from An-Nas (114) to Ad-Duha (93). All 22 surahs with full tajweed. Teacher assessment.','mastery',10,'["verbal"]','["tej-hf10"]','complete Juz Amma list, teacher feedback'],

    // ════════════════════════════════════════════════════════════
    // QURAN UNDERSTANDING EXPANSION (tj-quran-understand)
    // ════════════════════════════════════════════════════════════
    ['tej-qa01',j,'tj-quran-understand',4,'4-5','Key Quranic Vocabulary for Children','Learn common Quranic words: رَبّ (Lord), رَحْمَن (Most Gracious), رَحِيم (Most Merciful), الْحَمْد (praise), مَلِك (King), هُدَى (guidance), نُور (light).','practice',4,'["verbal","visual"]','[""]','Quranic word cards, poster'],
    ['tej-qa02',j,'tj-quran-understand',4,'4-5','Connecting Surahs: An-Nas to Al-Falaq','These surahs are called Al-Muawwidhatayn (the two refuges). We seek refuge from different types of evil. Learn the connection.','practice',2,'["verbal"]','[""]','surah connection chart'],
    ['tej-qa03',j,'tj-quran-understand',5,'5-6','Tafsir of Al-Fatihah for Children','Surah Al-Fatihah has 7 verses. We praise Allah (ayah 1-2), ask for guidance (ayah 5-6), and learn about the straight path (ayah 6-7).','practice',3,'["verbal","visual"]','["tej-hf10"]','Al-Fatihah poster with tafsir, story cards'],
    ['tej-qa04',j,'tj-quran-understand',5,'5-6','Tafsir of Short Surahs','Learn the simple meanings of Ikhlas, Falaq, Nas, Kahfirun, Nasr. Each surah teaches a lesson about tawheed, protection, and worship.','practice',3,'["verbal","visual"]','[""]','tafsir picture cards, storybooks'],
    ['tej-qa05',j,'tj-quran-understand',5,'5-6','Quranic Themes: Tawheed','The most important theme in the Quran: Oneness of Allah. Surah Ikhlas (pure tawheed), Al-Baqarah 163 (Your God is One).','practice',2,'["verbal"]','[""]','Quranic verses on tawheed list'],
    ['tej-qa06',j,'tj-quran-understand',6,'6-7','Quranic Themes: Prophethood','Find verses about prophets: Muhammad, Musa, Ibrahim, Nuh, Isa (peace be upon them). Stories of messengers.','practice',3,'["verbal"]','[""]','prophet story cards, Quranic references'],
    ['tej-qa07',j,'tj-quran-understand',6,'6-7','Quranic Themes: Day of Judgment','Learn what the Quran says about the Last Day. Surahs: Al-Qariah, Az-Zalzalah, Al-Inshiqaq, At-Takwir. What happens?','practice',3,'["verbal","visual"]','[""]','Quran verses on Day of Judgment'],
    ['tej-qa08',j,'tj-quran-understand',6,'6-7','What I Recite in Salah Means','Understand every word you say in prayer: Al-Fatihah, short surahs, rukoo and sujood duas, tashahhud. Know the meaning so you feel the prayer.','practice',4,'["verbal"]','["tej-qa03"]','salah meaning cards, poster'],
  ];

  for (let i = 0; i < t.length; i += 5) {
    const batch = t.slice(i, i + 5);
    const values = batch.map(r =>
      `('${r[0]}','${r[1]}','${r[2]}',${r[3]},'${r[4]}','${r[5]}','${r[6]}','${r[7]}',${r[8]},'${r[9]}','${r[10]}','${r[11]}')`
    ).join(',');
    await prisma.$executeRawUnsafe(
      `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
    );
    console.log(`  Tajweed Batch ${Math.floor(i/5)+1}: topics ${i+1}-${Math.min(i+5,t.length)}`);
  }
  console.log(`  Seeded ${t.length} Tajweed & Quran topics`);
}
