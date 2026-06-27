import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedAqeedahEnhanced() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='islamic-studies' AND strand='aqeedah-enhanced'"
  );
  const cnt = Number(existing[0]?.cnt ?? 1);
  if (cnt > 0) {
    console.log('  Aqeedah enhanced already seeded — skipping.');
    return;
  }
  console.log('  Seeding comprehensive Aqeedah expansion...');

  const s = 'islamic-studies';
  const t = [
    // ═══════════════════════════════════════════════════════════
    // THREE FUNDAMENTAL PRINCIPLES (Usool al-Thalatha)
    // Based on: Shaykh Muhammad ibn Abd al-Wahhab's treatise
    // ═══════════════════════════════════════════════════════════
    ['is-ae01',s,'aqeedah-enhanced',4,'4-5','Knowing Your Lord (Who is your Lord?)','Your Lord is Allah who created you, created the heavens and the earth, and provides for you. Everything belongs to Him. The first question in the grave is: Who is your Lord?','practice',3,'["verbal","visual"]','[""]','Usool al-Thalatha book, picture of creation'],
    ['is-ae02',s,'aqeedah-enhanced',4,'4-5','Knowing Your Religion (What is your religion?)','Your religion is Islam: submit to Allah with Tawheed, obey Him, and stay away from shirk. The second question in the grave: What is your religion?','practice',3,'["verbal","visual"]','["is-ae01"]','Islam poster, 5 pillars chart'],
    ['is-ae03',s,'aqeedah-enhanced',4,'4-5','Knowing Your Prophet (Who is your Prophet?)','Our Prophet is Muhammad bin Abdullah (peace be upon him). He was sent to all people. We must believe in him, follow him, and love him. The third question: Who is your Prophet?','practice',3,'["verbal","visual"]','["is-ae01"]','Prophet biography card, seerah pictures'],
    ['is-ae04',s,'aqeedah-enhanced',5,'5-6','The Four Obligatory Matters','Every Muslim must learn: 1) Knowledge — learn about Allah, His Prophet, and Islam. 2) Action — practice what you learn. 3) Calling (Dawah) — invite others to good. 4) Patience — be patient in worship and in calling others.','practice',3,'["verbal"]','["is-ae01","is-ae02","is-ae03"]','four matters poster, activity sheet'],
    ['is-ae05',s,'aqeedah-enhanced',5,'5-6','The Three Questions of the Grave','When a person dies and is buried, two angels come: Munkar and Nakir. They ask three questions: Who is your Lord? What is your religion? Who is your Prophet? The believer answers correctly, the doubter does not.','practice',3,'["verbal"]','["is-ae01","is-ae02","is-ae03"]','grave questions cards, hadith references'],
    ['is-ae06',s,'aqeedah-enhanced',5,'5-6','The Answer of the Believer in the Grave','The believer says: My Lord is Allah, my religion is Islam, my Prophet is Muhammad (peace be upon him). Then a voice calls from heaven: My slave has spoken the truth!','practice',2,'["verbal"]','["is-ae05"]','reward chart for memorizing answers'],

    // ═══════════════════════════════════════════════════════════
    // THREE LEVELS OF RELIGION: ISLAM, IMAAN, IHSAN
    // Based on: Hadith of Jibril (Sahih Muslim)
    // ═══════════════════════════════════════════════════════════
    ['is-ae07',s,'aqeedah-enhanced',5,'5-6','The Three Levels of the Religion','Islam (outward submission), Iman (inner faith), and Ihsan (perfection of worship). The Prophet (peace be upon him) explained all three when Jibril came to him.','introduction',2,'["verbal"]','[""]','Hadith of Jibril poster, visual chart'],
    ['is-ae08',s,'aqeedah-enhanced',5,'5-6','Islam: The Five Pillars','The five pillars: Shahadah (bearing witness), Salah (prayer), Zakah (charity), Sawm (fasting Ramadan), Hajj (pilgrimage to Makkah). This is the foundation of Islam.','practice',3,'["verbal","visual"]','["is-ae07"]','five pillars chart, coloring page, song'],
    ['is-ae09',s,'aqeedah-enhanced',5,'5-6','Iman: The Six Pillars of Faith','Belief in: Allah, His angels, His books, His messengers, the Last Day, and the divine decree (Qadr, good and bad). These six are the pillars of faith (iman).','practice',3,'["verbal","visual"]','["is-ae07"]','six pillars poster, iman tree activity'],
    ['is-ae10',s,'aqeedah-enhanced',6,'6-7','Ihsan: Worshipping Allah Perfectly','Ihsan means to worship Allah as if you see Him, even though you do not see Him, you know that He sees you. This is the highest level of faith.','practice',3,'["verbal"]','["is-ae07"]','Ihsan self-check cards, awareness activity'],

    // ═══════════════════════════════════════════════════════════
    // TAWHEED IN DETAIL (Categories & Application)
    // Based on: Various Salafi Aqeedah curricula
    // ═══════════════════════════════════════════════════════════
    ['is-ae11',s,'aqeedah-enhanced',5,'5-6','Tawheed ar-Rububiyyah: Allah is the Creator','Allah alone creates everything, provides for everyone, gives life and causes death, controls the universe. Believing this is Tawheed of Lordship.','practice',3,'["verbal","visual"]','[""]','nature cards, creation scavenger hunt'],
    ['is-ae12',s,'aqeedah-enhanced',5,'5-6','Tawheed al-Uluhiyyah: Worshipping Allah Alone','Allah alone deserves our worship. We pray, fast, give charity, ask for help, and make dua ONLY to Allah. This is the meaning of Laa ilaaha illAllah.','practice',3,'["verbal"]','["is-ae11"]','Laa ilaaha illAllah chart, examples of worship'],
    ['is-ae13',s,'aqeedah-enhanced',5,'5-6','Tawheed al-Asma was-Sifaat: Allahs Names and Attributes','We believe in Allahs beautiful names and high attributes as they are revealed in the Quran and Sunnah, without changing them, denying them, or asking how they are.','practice',3,'["verbal"]','["is-ae11"]','Names of Allah poster, matching activity'],
    ['is-ae14',s,'aqeedah-enhanced',6,'6-7','Dua is Worship: Asking Only Allah','Making dua (supplication) is an act of worship. We ask Allah alone for help, guidance, forgiveness, and everything. Never ask a dead person or an idol for anything.','practice',3,'["verbal","hands-on"]','["is-ae12"]','dua cards, duas for daily life, reflection'],
    ['is-ae15',s,'aqeedah-enhanced',6,'6-7','Hope, Fear, and Love of Allah','We hope for Allahs mercy and Paradise. We fear His punishment and Hellfire. We love Allah more than anyone else. These three are acts of worship for Allah alone.','practice',3,'["verbal"]','["is-ae12"]','emotion cards, Quranic verses about hope and fear'],
    ['is-ae16',s,'aqeedah-enhanced',6,'6-7','Trust in Allah (Tawakkul)','Trust in Allah while taking the means. The Prophet (peace be upon him) said: If you trust in Allah as He should be trusted, He would provide for you as He provides for the birds.','practice',2,'["verbal"]','["is-ae12"]','bird hadith story, trust exercise'],
    ['is-ae17',s,'aqeedah-enhanced',6,'6-7','Slaughtering and Vows are for Allah Alone','We slaughter animals for food only in Allahs name (Bismillah). We make vows (nadhr) only to Allah. Never slaughter or make vows to anyone except Allah.','practice',2,'["verbal"]','["is-ae12"]','slaughtering rules, dhikr cards'],

    // ═══════════════════════════════════════════════════════════
    // SHIRK (Major, Minor, Hidden)
    // Based on: Kitab al-Tawheed, Kashf al-Shubuhaat
    // ═══════════════════════════════════════════════════════════
    ['is-ae18',s,'aqeedah-enhanced',5,'5-6','Shirk: The Greatest Sin','Shirk means worshipping anyone or anything besides Allah or along with Allah. Allah forgives all sins except shirk. This is the worst sin a person can do.','introduction',3,'["verbal"]','["is-ae12"]','shirk definition card, Quran verses'],
    ['is-ae19',s,'aqeedah-enhanced',5,'5-6','Major Shirk (Ash-Shirk al-Akbar)','Major shirk: making someone equal to Allah in worship. Examples: praying to a dead person, asking a prophet or angel for help (supernatural), bowing to an idol. This takes a person out of Islam.','practice',3,'["verbal"]','["is-ae18"]','tawheed vs shirk sorting cards'],
    ['is-ae20',s,'aqeedah-enhanced',5,'5-6','Minor Shirk (Ash-Shirk al-Asghar)','Minor shirk does not take a person out of Islam but is still a major sin. Examples: showing off in prayer (riya), swearing by other than Allah, saying If only such and such.','practice',3,'["verbal"]','["is-ae18"]','minor shirk examples cards, awareness activity'],
    ['is-ae21',s,'aqeedah-enhanced',6,'6-7','Hidden Shirk (Riya: Showing Off)','Riya means doing good deeds so that people see and praise you, not for Allah. The Prophet (peace be upon him) said: The thing I fear most for you is minor shirk (showing off).','practice',3,'["verbal"]','["is-ae20"]','sincerity check cards, hadith study'],
    ['is-ae22',s,'aqeedah-enhanced',6,'6-7','Shirk in the Past Nations','Many past nations fell into shirk. The people of Nuh worshipped idols. The people of Aad and Thamud went astray. Learn from their mistakes so we do not repeat them.','practice',2,'["verbal","visual"]','["is-ae19"]','prophet stories, historical examples'],

    // ═══════════════════════════════════════════════════════════
    // KAFIR, MUNAFIQ, FISQ - Understanding Categories
    // Based on: Aqeedah curricula for older children
    // ═══════════════════════════════════════════════════════════
    ['is-ae23',s,'aqeedah-enhanced',5,'5-6','Who is a Muslim and Who is a Kafir?','A Muslim believes in Allah, worships Allah alone, and follows Prophet Muhammad. A Kafir rejects Allah or worships others besides Allah. Learn the difference with kindness.','practice',2,'["verbal"]','["is-ae12"]','Muslim/Kafir sorting activity, loving for Allah'],
    ['is-ae24',s,'aqeedah-enhanced',6,'6-7','Major and Minor Kufr','Major kufr takes a person out of Islam (rejecting Allah, mocking the religion). Minor kufr is a sin but does not remove from Islam (being ungrateful to parents). Understanding the difference is important.','practice',2,'["verbal"]','["is-ae23"]','kufr types chart, examples discussion'],
    ['is-ae25',s,'aqeedah-enhanced',6,'6-7','Major and Minor Nifaq (Hypocrisy)','Major nifaq: pretending to be Muslim while hiding disbelief in the heart (like the hypocrites in Madinah). Minor nifaq: lying, breaking promises, being dishonest — still a sin but not out of Islam.','practice',2,'["verbal"]','[""]','hypocrisy signs hadith, self-reflection activity'],

    // ═══════════════════════════════════════════════════════════
    // NULLIFIERS OF ISLAM (Nawaaqid al-Islam)
    // Based on: Shaykh Muhammad ibn Abd al-Wahhab's 10 nullifiers
    // ═══════════════════════════════════════════════════════════
    ['is-ae26',s,'aqeedah-enhanced',6,'6-7','The 10 Nullifiers of Islam: Introduction','There are 10 things that nullify (destroy) a persons Islam. Learning them helps us protect our faith. The first nullifier: Shirk in worshipping Allah.','practice',3,'["verbal"]','["is-ae19"]','Nawaaqid chart, reference cards for home'],
    ['is-ae27',s,'aqeedah-enhanced',6,'6-7','Nullifiers 2-4: Intermediaries, Takfir, Judgment','Nullifiers: 2) Whoever sets intermediaries between himself and Allah (asking them for help). 3) Whoever does not consider the mushrikeen as disbelievers. 4) Whoever believes some guidance is better than the Prophets.','practice',3,'["verbal"]','["is-ae26"]','nullifiers reference cards, simplified examples'],
    ['is-ae28',s,'aqeedah-enhanced',6,'6-7','Nullifiers 5-7: Hating the Sunnah, Mocking, Magic','Nullifiers: 5) Hating anything the Prophet came with. 6) Mocking Islam or any part of it. 7) Practicing magic (sihr) or approving of it.','practice',3,'["verbal"]','["is-ae26"]','nullifiers reference cards, safety from magic'],
    ['is-ae29',s,'aqeedah-enhanced',6,'6-7','Nullifiers 8-10: Supporting Disbelievers, Leaving Prayer, Turning Away','Nullifiers: 8) Helping the disbelievers against Muslims. 9) Believing it is OK to leave the Sharia. 10) Turning away from learning and practicing Islam.','practice',3,'["verbal"]','["is-ae26"]','nullifiers reference cards, commitment chart'],

    // ═══════════════════════════════════════════════════════════
    // CONDITIONS OF LAA ILAAHA ILLALLAH
    // Based on: Shaykh Hafiz al-Hakami's poem
    // ═══════════════════════════════════════════════════════════
    ['is-ae30',s,'aqeedah-enhanced',6,'6-7','The 8 Conditions of Laa ilaaha illAllah (1-4)','Knowledge (know what it means), Certainty (no doubt), Sincerity (for Allah alone), Truthfulness (from the heart). A person must meet all conditions for the shahadah to benefit them.','practice',3,'["verbal"]','[""]','conditions of shahadah poster, chart'],
    ['is-ae31',s,'aqeedah-enhanced',6,'6-7','The 8 Conditions of Laa ilaaha illAllah (5-8)','Love (love Allah and His Prophet more than all), Submission (obey Allahs commands), Acceptance (accept Islam fully), Disbelief in Taghut (reject false gods). Complete all eight.','practice',3,'["verbal"]','["is-ae30"]','conditions of shahadah poster, quiz card'],

    // ═══════════════════════════════════════════════════════════
    // AL-WALA WAL-BARA (Loyalty & Disavowal)
    // ═══════════════════════════════════════════════════════════
    ['is-ae32',s,'aqeedah-enhanced',5,'5-6','Loving Allah and His Messenger','We love Allah more than anyone. We love the Prophet more than our own parents and children. This love makes our faith complete. Being loyal to Islam means loving what Allah loves.','practice',3,'["verbal"]','[""]','love ranking activity, hadith of the 3 loves'],
    ['is-ae33',s,'aqeedah-enhanced',5,'5-6','Loving the Believers','Muslims are brothers and sisters. We love each other for Allahs sake. We help each other, visit each other, and make dua for each other. This is part of our faith.','practice',2,'["verbal","hands-on"]','["is-ae32"]','brotherhood cards, friendship activity'],
    ['is-ae34',s,'aqeedah-enhanced',6,'6-7','Disavowing Shirk and Its People','We hate shirk and everything Allah hates. But we treat people with kindness and call them to Islam with wisdom. We hate the sin, not the sinner.','practice',2,'["verbal"]','["is-ae18","is-ae32"]','hate the sin love the sinner cards, discussion'],
    ['is-ae35',s,'aqeedah-enhanced',6,'6-7','Taking the Disbelievers as Allies','We do not take disbelievers as allies or protectors over Muslims. We can be kind and fair to them but we do not follow their religion or prefer them over Muslims.','practice',2,'["verbal"]','["is-ae33"]','wala wal-bara chart, examples from seerah'],

    // ═══════════════════════════════════════════════════════════
    // BIDAH (Innovation) & FOLLOWING THE SUNNAH
    // ═══════════════════════════════════════════════════════════
    ['is-ae36',s,'aqeedah-enhanced',5,'5-6','Following the Sunnah of the Prophet','The Prophet (peace be upon him) taught us how to worship Allah. We follow his way in everything: prayer, fasting, eating, sleeping. The Sunnah is the best path.','practice',3,'["verbal"]','[""]','Sunnah practice chart, daily Sunnah tracker'],
    ['is-ae37',s,'aqeedah-enhanced',6,'6-7','What is Bidah? Why Is It Dangerous?','Bidah is an innovation in religion — adding something new to worship that the Prophet did not do or teach. It is dangerous because it makes the religion different from what Allah revealed.','practice',3,'["verbal"]','["is-ae36"]','sunnah vs bidah sorting activity, hadith about bidah'],
    ['is-ae38',s,'aqeedah-enhanced',6,'6-7','Examples of Bidah and How to Avoid It','Examples: celebrating the Prophets birthday (Mawlid), adding extra prayers not taught by the Prophet. We stick to the Quran and Sunnah. The best guidance is the guidance of Muhammad.','practice',3,'["verbal"]','["is-ae37"]','examples cards, staying on the straight path chart'],

    // ═══════════════════════════════════════════════════════════
    // THE SAVED SECT & AHLUL-SUNNAH
    // ═══════════════════════════════════════════════════════════
    ['is-ae39',s,'aqeedah-enhanced',5,'5-6','Who Are Ahlus-Sunnah wal-Jamaah?','Ahlus-Sunnah wal-Jamaah are the Muslims who follow the Quran and the Sunnah exactly as the Companions understood them. They are the main body of Muslims.','practice',2,'["verbal"]','["is-ae36"]','companions poster, ahlus-sunnah banner'],
    ['is-ae40',s,'aqeedah-enhanced',6,'6-7','The 73 Sects and the Saved Sect','The Prophet (peace be upon him) said: My ummah will split into 73 groups. All are in the Fire except one. The Companions asked: Who is it? He said: Those who follow what I and my Companions are upon.','practice',2,'["verbal"]','["is-ae39"]','sects diagram, hadith card, love for the saved sect'],
    ['is-ae41',s,'aqeedah-enhanced',6,'6-7','The Path of the Righteous Predecessors (Salaf)','The Salaf are the first three generations: Companions, Followers, and the Followers of the Followers. They are the best of this ummah. We follow their understanding of Islam.','practice',2,'["verbal"]','["is-ae40"]','generations timeline, salaf poster'],
    ['is-ae42',s,'aqeedah-enhanced',6,'6-7','Loving and Respecting the Companions','We love all the Companions of the Prophet (peace be upon him). They sacrificed everything for Islam. We do not speak badly about them. Abu Bakr, Umar, Uthman, Ali are the best of them.','practice',2,'["verbal"]','["is-ae39"]','companions flashcards, virtues hadith'],

    // ═══════════════════════════════════════════════════════════
    // IMAN: INCREASE AND DECREASE
    // ═══════════════════════════════════════════════════════════
    ['is-ae43',s,'aqeedah-enhanced',5,'5-6','Iman Increases with Good Deeds','Iman (faith) goes up and down. It increases when we do good deeds: pray, read Quran, give charity, remember Allah. Help your iman grow every day.','practice',2,'["verbal","hands-on"]','[""]','iman chart, good deed tracker, sticker reward'],
    ['is-ae44',s,'aqeedah-enhanced',5,'5-6','Iman Decreases with Sin','Iman decreases when we sin, forget Allah, or neglect our prayers. To protect our iman, we stay away from bad friends, bad words, and bad actions. Ask Allah to keep your iman strong.','practice',2,'["verbal"]','["is-ae43"]','iman protection cards, repentance activity'],
    ['is-ae45',s,'aqeedah-enhanced',6,'6-7','Repentance (Tawbah): How to Return to Allah','When we sin, Allah wants us to repent. The conditions: stop the sin, feel regret, resolve not to go back, and if it involves another person, make it right with them. Allah loves those who repent.','practice',3,'["verbal"]','["is-ae44"]','tawbah cards, Allahs forgiveness hadith'],

    // ═══════════════════════════════════════════════════════════
    // DEATH & THE HEREAFTER
    // Based on: Al-Aqeedah al-Wasitiyyah, for older children
    // ═══════════════════════════════════════════════════════════
    ['is-ae46',s,'aqeedah-enhanced',5,'5-6','The Reality of Death','Every soul will taste death. Death is not the end; it is the door to the next life. When a believer dies, the angels give good news. When a disbeliever dies, it is a terrible punishment.','practice',2,'["verbal"]','[""]','Quran verses about death, reflection cards'],
    ['is-ae47',s,'aqeedah-enhanced',6,'6-7','The Trial of the Grave','After burial, two angels (Munkar and Nakir) come and ask: Who is your Lord? What is your religion? Who is your Prophet? The believer answers with confidence, the doubter cannot answer.','practice',3,'["verbal"]','["is-ae05","is-ae46"]','grave trial cards, strengthening iman activity'],
    ['is-ae48',s,'aqeedah-enhanced',6,'6-7','The Blessings and Punishment of the Grave','The grave is either a garden from Paradise or a pit from Hellfire. Believers are given a window to Paradise. Disbelievers are given a window to Hellfire. May Allah protect us.','practice',3,'["verbal"]','["is-ae47"]','grave illustration, protective duas cards'],

    // ═══════════════════════════════════════════════════════════
    // THE LAST DAY: SIGNS & EVENTS
    // Based on: Aqeedah curricula for children
    // ═══════════════════════════════════════════════════════════
    ['is-ae49',s,'aqeedah-enhanced',5,'5-6','Signs of the Day of Judgment','The Prophet (peace be upon him) told us about the signs of the Last Day: when people build tall buildings, when time passes quickly, when knowledge is taken away, when Fitnah appears everywhere.','practice',2,'["verbal"]','[""]','minor signs card set, discussion activity'],
    ['is-ae50',s,'aqeedah-enhanced',6,'6-7','The Day of Judgment: What Happens?','The trumpet is blown by Israfil. The sky splits, mountains become like wool, every person will be raised from their grave. Everyone will be judged for every deed, big and small.','practice',3,'["verbal","visual"]','["is-ae49"]','Day of Judgment sequencing cards, Quran descriptions'],
    ['is-ae51',s,'aqeedah-enhanced',6,'6-7','The Scales and the Bridge','The deeds will be weighed on the Scale (Mizan). Good deeds on one side, bad deeds on the other. Then everyone must cross the Bridge (Siraat) over Hellfire. The believers cross safely, the sinners may fall.','practice',3,'["verbal"]','["is-ae50"]','mizan explanation, siraat crossing story'],
    ['is-ae52',s,'aqeedah-enhanced',6,'6-7','Paradise (Jannah): What Allah Has Prepared','Jannah is a place of eternal happiness: rivers of milk and honey, beautiful gardens, palaces, delicious fruits, and the greatest reward: seeing Allahs face. Everything good that we can imagine and more.','practice',3,'["verbal","visual"]','["is-ae50"]','Jannah description cards, motivation for good deeds'],
    ['is-ae53',s,'aqeedah-enhanced',6,'6-7','Hellfire (Jahannam): Why We Fear It','Jahannam is a place of fire and punishment for those who rejected Allah and disobeyed His messengers. It is forever for the disbelievers. We fear it and ask Allah to protect us from it.','practice',2,'["verbal"]','["is-ae50"]','protective duas from Hellfire, Quran warnings'],
    ['is-ae54',s,'aqeedah-enhanced',6,'6-7','Seeing Allah in Paradise','The greatest blessing of Paradise is seeing Allah (Ruyatullah). The Prophet (peace be upon him) said: You will see your Lord on the Day of Judgment as you see the moon on a clear night.','practice',2,'["verbal"]','["is-ae52"]','hadith of seeing Allah, excitement for Jannah'],

    // ═══════════════════════════════════════════════════════════
    // DIVINE DECREE (Qadr) - COMPREHENSIVE
    // Based on: Aqeedah Wasitiyyah explanation
    // ═══════════════════════════════════════════════════════════
    ['is-ae55',s,'aqeedah-enhanced',6,'6-7','Belief in Qadr: The Four Levels','Belief in divine decree has four levels: 1) Allah knows everything. 2) Allah wrote everything in the Preserved Tablet. 3) Everything happens by Allahs will. 4) Allah creates everything, including our actions.','practice',2,'["verbal"]','[""]','Qadr levels chart, Quranic evidence cards'],

    // ═══════════════════════════════════════════════════════════
    // ALLAH'S NAMES & ATTRIBUTES (EXPANDED FOR OLDER CHILDREN)
    // ═══════════════════════════════════════════════════════════
    ['is-ae56',s,'aqeedah-enhanced',5,'5-6','Allahs Beautiful Names: The Most Merciful','Ar-Rahman (The Most Gracious) and Ar-Raheem (The Most Merciful). Allahs mercy encompasses everything. He forgives and is kind to His servants. Learn these two important names.','practice',3,'["verbal","visual"]','[""]','mercy rain activity, name cards, matching'],
    ['is-ae57',s,'aqeedah-enhanced',6,'6-7','Allah is Above His Creation (Al-Uluw)','Allah is above the heavens, above His throne (Arsh). He is not everywhere. He is above His creation but knows everything and is close to us by His knowledge.','practice',2,'["verbal","visual"]','[""]','Arsh diagram, Quran verses about Allahs highness'],
    ['is-ae58',s,'aqeedah-enhanced',6,'6-7','Allahs Attributes: Hearing, Seeing, Knowing','Allah hears everything, even the quietest whisper. He sees everything, even the smallest ant. He knows everything, even what is in our hearts. These are perfect attributes.','practice',2,'["verbal"]','[""]','Allahs attributes wheel, hadith Qudsi about His attributes'],
    ['is-ae59',s,'aqeedah-enhanced',6,'6-7','The Correct Way to Believe in Allahs Names','We believe in Allahs names as they are revealed, without: Tahrif (changing), Tatyil (denying), Takyif (asking how), Tamthil (making like creation). Allah is nothing like His creation.','practice',3,'["verbal"]','[""]','four rules poster, creed memorization'],

    // ═══════════════════════════════════════════════════════════
    // AQEEDAH PROOFS FROM THE QURAN & SUNNAH
    // ═══════════════════════════════════════════════════════════
    ['is-ae60',s,'aqeedah-enhanced',6,'6-7','Proving Allahs Existence Through Creation','Look at the sky, the mountains, the trees, the animals, and your own body! All of this proves that there is a Creator. Nothing creates itself. Allah is the Creator of everything.','practice',2,'["verbal","visual"]','[""]','nature walk, creation cards, fitrah discussion'],
    ['is-ae61',s,'aqeedah-enhanced',6,'6-7','Ayahs (Proofs) from the Quran for Tawheed','The Quran is full of verses commanding Tawheed and warning against shirk. Surah Al-Ikhlas is about Tawheed. Ayat al-Kursi mentions Allahs greatness. These verses protect our faith.','practice',2,'["verbal"]','[""]','Surah Al-Ikhlas poster, Ayat al-Kursi memorization'],
    ['is-ae62',s,'aqeedah-enhanced',6,'6-7','The Fitrah: Every Child is Born Muslim','Every child is born upon the fitrah (natural inclination to believe in Allah). It is the parents who make the child Jewish, Christian, or Magian. Your heart naturally knows Allah.','practice',2,'["verbal"]','[""]','fitrah hadith, discussion about innermost belief'],
  ];

  for (let i = 0; i < t.length; i += 5) {
    const batch = t.slice(i, i + 5);
    const values = batch.map(r =>
      `('${r[0]}','${r[1]}','${r[2]}',${r[3]},'${r[4]}','${r[5]}','${r[6]}','${r[7]}',${r[8]},'${r[9]}','${r[10]}','${r[11]}')`
    ).join(',');
    await prisma.$executeRawUnsafe(
      `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
    );
    console.log(`  Aqeedah Batch ${Math.floor(i/5)+1}: topics ${i+1}-${Math.min(i+5,t.length)}`);
  }
  console.log(`  Seeded ${t.length} Aqeedah topics`);
}
