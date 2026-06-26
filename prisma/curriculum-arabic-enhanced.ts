import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedArabicEnhanced() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='arabic'"
  );
  const cnt = Number(existing[0]?.cnt ?? 0);
  if (cnt >= 60) {
    console.log('  Arabic already enhanced (' + cnt + ' topics) — skipping.');
    return;
  }
  console.log('Seeding enhanced Arabic curriculum (' + cnt + ' existing)...');

  const t: [string,string,string,number,string,string,string,string,number,string,string,string][] = [
    // Alphabet Recognition (ar-alpha)
    ['ar-a01','arabic','ar-alpha',1,'1-2','Arabic alphabet - Alif to Ya','Look at the Arabic alphabet poster. Learn letter names: Alif, Ba, Ta, Tha, Jeem... Point and say each letter.','introduction',5,'["visual"]','[""]','alphabet poster, flashcards'],
    ['ar-a02','arabic','ar-alpha',1,'1-2','Letter sounds - short vowels','Learn that each letter has a sound. Alif says "a", Ba says "b". Practice making letter sounds.','introduction',5,'["visual","verbal"]','["ar-a01"]','letter sound cards'],
    ['ar-a03','arabic','ar-alpha',2,'2-3','Identifying letters by shape','Can you find Alif? Where is Ba? Point to the letter I say. Match letters to their shapes.','practice',5,'["visual"]','["ar-a01"]','letter matching game'],
    ['ar-a04','arabic','ar-alpha',2,'2-3','Letters in your name','Find the Arabic letters in your name. Which letters do you know? Which are new?','practice',3,'["hands-on"]','["ar-a03"]','name worksheet'],
    ['ar-a05','arabic','ar-alpha',3,'3-4','Letter order and sequence','Put the alphabet in order from Alif to Ya. Sing the Arabic alphabet song. Practice daily.','practice',3,'["verbal"]','["ar-a03"]','alphabet sequencing cards'],
    ['ar-a06','arabic','ar-alpha',3,'3-4','Different forms of each letter','Letters look different at the beginning, middle, and end of a word. Ba at start vs Ba at end.','practice',3,'["visual"]','["ar-a05"]','letter form chart'],
    ['ar-a07','arabic','ar-alpha',4,'4-5','Letter recognition speed test','How many letters can you name in 1 minute? Practice identifying letters quickly and accurately.','practice',3,'["verbal"]','["ar-a05"]','timer, letter cards'],
    ['ar-a08','arabic','ar-alpha',4,'4-5','Letters and their positions','Which letter is first in this word? Which is last? Which is in the middle? Practice position awareness.','practice',2,'["verbal"]','["ar-a06"]','position worksheets'],

    // Letter Formation (ar-writing)
    ['ar-w01','arabic','ar-writing',2,'2-3','Tracing Arabic letters','Trace over dotted Arabic letters with your finger, then with a pencil. Start with Alif (vertical line).','practice',5,'["hands-on"]','["ar-a01"]','tracing worksheets, pencil'],
    ['ar-w02','arabic','ar-writing',2,'2-3','Writing Alif and Ba','Alif is a straight line down. Ba is a flat line with a dot below. Practice writing 5 times each.','practice',5,'["hands-on"]','["ar-w01"]','writing notebook'],
    ['ar-w03','arabic','ar-writing',3,'3-4','Writing all 28 letters','Write each letter from Alif to Ya. Focus on correct shape and size. Use lined paper.','practice',5,'["hands-on"]','["ar-w02"]','lined paper, pencil'],
    ['ar-w04','arabic','ar-writing',3,'3-4','Writing letters in words','Write simple words: باب (door), قلم (pen), كتاب (book). Connect letters in a word.','practice',3,'["hands-on"]','["ar-w03"]','word cards, writing notebook'],
    ['ar-w05','arabic','ar-writing',4,'4-5','Writing with short vowels','Add fatha, kasra, damma to words. Write: كَتَبَ (he wrote), كَتَبْتُ (I wrote).','practice',3,'["hands-on"]','["ar-w03"]','vowel worksheets'],
    ['ar-w06','arabic','ar-writing',5,'5-6','Writing simple sentences','Write short sentences in Arabic: هذا كتاب (This is a book). أنا طالب (I am a student).','practice',3,'["hands-on"]','["ar-w04"]','sentence templates'],

    // Reading with Harakat (ar-reading)
    ['ar-r01','arabic','ar-reading',2,'2-3','Reading simple letters with fatha','Alif with fatha says "a" (like apple). Ba with fatha says "ba". Practice: اَ بَ تَ ثَ','practice',3,'["verbal"]','["ar-a02"]','fatha cards'],
    ['ar-r02','arabic','ar-reading',2,'2-3','Reading letters with kasra','Alif with kasra says "i" (like igloo). Ba with kasra says "bi". Practice: اِ بِ تِ ثِ','practice',3,'["verbal"]','["ar-r01"]','kasra cards'],
    ['ar-r03','arabic','ar-reading',3,'3-4','Reading letters with damma','Alif with damma says "u" (like up). Ba with damma says "bu". Practice: اُ بُ تُ ثُ','practice',3,'["verbal"]','["ar-r02"]','damma cards'],
    ['ar-r04','arabic','ar-reading',3,'3-4','Reading 2-letter words','Read simple words: بَبَ (door), أَبَ (father), تَبَ (heat). Sound out each letter.','practice',5,'["verbal"]','["ar-r03"]','2-letter word cards'],
    ['ar-r05','arabic','ar-reading',4,'4-5','Reading 3-letter words','Read: كِتَاب (book), قَلَم (pen), مَكْتَب (desk). Sound out all three letters.','practice',5,'["verbal"]','["ar-r04"]','3-letter word cards'],
    ['ar-r06','arabic','ar-reading',4,'4-5','Reading with sukoon','Sukoon means no vowel. Read: مَكْتَب (maktab - desk), كِتَاب (kitaab - book). Practice sukoon words.','practice',3,'["verbal"]','["ar-r05"]','sukoon practice cards'],
    ['ar-r07','arabic','ar-reading',5,'5-6','Reading simple sentences','Read: هذا قَلَم (This is a pen). هذِهِ كِتَاب (This is a book). Identify subject and object.','practice',5,'["verbal"]','["ar-r06"]','sentence reading cards'],
    ['ar-r08','arabic','ar-reading',5,'5-6','Reading short paragraphs','Read a short paragraph about a family or school. Answer: Who? What? Where? Build reading comprehension.','practice',3,'["verbal"]','["ar-r07"]','reading passages'],
    ['ar-r09','arabic','ar-reading',6,'6-7','Reading Quranic words','Read simple words from the Quran: رَحْمَن (Most Merciful), عَلِيم (All-Knowing), كَرِيم (Generous).','practice',3,'["verbal"]','["ar-r07"]','Quranic word cards'],
    ['ar-r10','arabic','ar-reading',6,'6-7','Reading with tashdeed and tanween','Read words with tashdeed (emphasis): مُحَمَّد. Read tanween: كِتَان (books). Advanced reading skills.','practice',3,'["verbal"]','["ar-r09"]','advanced reading worksheets'],

    // Basic Vocabulary (ar-vocab)
    ['ar-v01','arabic','ar-vocab',1,'1-2','Colors in Arabic','Learn: أَحْمَر (red), أَزْرَق (blue), أَخْضَر (green), أَصْفَر (yellow), أَبْيَض (white), أَسْوَد (black).','introduction',3,'["visual"]','[""]','color flashcards'],
    ['ar-v02','arabic','ar-vocab',1,'1-2','Numbers 1-10 in Arabic','Learn: واحِد (1), اثْنان (2), ثَلاثَة (3), أَرْبَعَة (4), خَمْسَة (5), سِتَّة (6), سَبْعَة (7), ثَمانية (8), تِسْعَة (9), عَشَرَة (10).','introduction',3,'["visual","verbal"]','[""]','number cards'],
    ['ar-v03','arabic','ar-vocab',2,'2-3','Family words','Learn: أَب (father), أُم (mother), أَخ (brother), أُخْت (sister), جَدّ (grandfather), جَدَّة (grandmother).','introduction',3,'["verbal"]','[""]','family tree poster'],
    ['ar-v04','arabic','ar-vocab',2,'2-3','Food words','Learn: خُبْز (bread), مَاء (water), حَلِيب (milk), تُفّاح (apple), مَوْز (banana), أُرْز (rice).','introduction',3,'["visual","verbal"]','[""]','food flashcards'],
    ['ar-v05','arabic','ar-vocab',3,'3-4','Body parts','Learn: رَأْس (head), عَيْن (eye), أُذُن (ear), فَم (mouth), يَد (hand), رِجْل (leg), قَلْب (heart).','practice',3,'["visual"]','["ar-v03"]','body poster'],
    ['ar-v06','arabic','ar-vocab',3,'3-4','Animals','Learn: قِطّة (cat), كَلْب (dog), طَيّر (bird), حِصان (horse), بَقَرَة (cow), خَرُوف (sheep).','practice',3,'["visual"]','["ar-v03"]','animal flashcards'],
    ['ar-v07','arabic','ar-vocab',4,'4-5','House and furniture','Learn: بَيْت (house), بَاب (door), نافِذَة (window), طاوِلَة (table), كُرْسِي (chair), سَرِير (bed).','practice',3,'["visual"]','["ar-v03"]','house poster'],
    ['ar-v08','arabic','ar-vocab',4,'4-5','School and objects','Learn: مَدْرَسَة (school), كِتَاب (book), قَلَم (pen), وَرَقَة (paper), حَقيبة (bag), سَبُّورة (whiteboard).','practice',3,'["visual"]','["ar-v04"]','school items cards'],
    ['ar-v09','arabic','ar-vocab',5,'5-6','Weather words','Learn: شَمْس (sun), قَمَر (moon), سَحاب (clouds), مَطَر (rain), رِيح (wind), ثَلْج (snow).','practice',3,'["visual"]','["ar-v01"]','weather cards'],
    ['ar-v10','arabic','ar-vocab',5,'5-6','Actions (verbs)','Learn: ذَهَبَ (went), جاءَ (came), أَكَلَ (ate), شَرِبَ (drank), كَتَبَ (wrote), قَرَأَ (read).','practice',3,'["verbal"]','["ar-v06"]','action verb cards'],
    ['ar-v11','arabic','ar-vocab',6,'6-7','Common phrases','Learn: بِسْمِ الله (In the name of Allah), جَزاكَ اللهُ خَيْرا (May Allah reward you), ما شاء الله (Mashallah), إن شاء الله (Inshaallah).','practice',3,'["verbal"]','["ar-v03"]','phrase cards'],
    ['ar-v12','arabic','ar-vocab',6,'6-7','Greetings and daily expressions','Learn: السَّلامُ عَلَيْكُم (Peace be upon you), كَيْفَ حالُك (How are you?), أَنَا بِخَير (I am fine), شُكْرا (Thank you).','practice',3,'["verbal"]','["ar-v11"]','conversation practice'],

    // Basic Grammar (ar-grammar)
    ['ar-g01','arabic','ar-grammar',3,'3-4','Nouns (Ism) - what is a noun?','A noun is a name: مُحَمَّد (Muhammad), كِتَاب (book), مَدْرَسَة (school). Point and name things in Arabic.','introduction',2,'["verbal"]','["ar-r04"]','noun sorting game'],
    ['ar-g02','arabic','ar-grammar',3,'3-4','Verbs (Fil) - action words','A verb is an action: كَتَبَ (he wrote), ذَهَبَ (he went), جَاءَ (he came). Verbs show what someone does.','introduction',2,'["verbal"]','["ar-g01"]','verb cards'],
    ['ar-g03','arabic','ar-grammar',4,'4-5','Singular and plural','One book = كِتَاب. Many books = كُتُب. One student = طالِب. Many students = طُلّاب. Plurals can change the word shape.','practice',3,'["verbal"]','["ar-g01"]','singular/plural cards'],
    ['ar-g04','arabic','ar-grammar',4,'4-5','Gender - masculine and feminine','Masculine ends in ة sound: مُحَمَّد. Feminine often ends in ة: فاطِمَة. Learn to tell which is which.','practice',3,'["verbal"]','["ar-g01"]','gender sorting game'],
    ['ar-g05','arabic','ar-grammar',5,'5-6','Basic sentence structure','Arabic sentences can start with a noun or verb. هذَا كِتَاب (This is a book). كَتَبَ مُحَمَّد (Muhammad wrote).','practice',3,'["verbal"]','["ar-g03"]','sentence building blocks'],
    ['ar-g06','arabic','ar-grammar',5,'5-6','Pronouns - I, you, he, she','Learn: أَنَا (I), أَنْتَ (you m), أَنْتِ (you f), هُوَ (he), هِيَ (she), نَحْنُ (we).','practice',3,'["verbal"]','["ar-g01"]','pronoun flashcards'],
    ['ar-g07','arabic','ar-grammar',6,'6-7','Prepositions - in, on, under','Learn: فِي (in), عَلَى (on), تَحْتَ (under), بَيْنَ (between), إِلَى (to). Use in sentences.','practice',3,'["verbal"]','["ar-g05"]','preposition cards'],
    ['ar-g08','arabic','ar-grammar',6,'6-7','Questions - who, what, where','Learn: مَن (who), ماذا (what), أَيْنَ (where), مَتى (when), كَيْفَ (how). Ask and answer simple questions.','practice',3,'["verbal"]','["ar-g07"]','question cards'],
  ];

  for (let i = 0; i < t.length; i += 5) {
    const batch = t.slice(i, i + 5);
    const values = batch.map(r =>
      `('${r[0]}','${r[1]}','${r[2]}',${r[3]},'${r[4]}','${r[5]}','${r[6]}','${r[7]}',${r[8]},'${r[9]}','${r[10]}','${r[11]}')`
    ).join(',');
    await prisma.$executeRawUnsafe(
      `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
    );
    console.log(`  Batch ${Math.floor(i/5)+1}: Arabic topics ${i+1}-${Math.min(i+5,t.length)}`);
  }
  console.log(`  Seeded ${t.length} enhanced Arabic topics`);
}
