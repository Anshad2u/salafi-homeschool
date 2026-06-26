import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedEnglishEnhanced() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='english'"
  );
  const cnt = Number(existing[0]?.cnt ?? 0);
  if (cnt >= 100) {
    console.log('  English already enhanced (' + cnt + ' topics) — skipping.');
    return;
  }
  console.log('Seeding enhanced English curriculum (' + cnt + ' existing)...');

  const t: [string,string,string,number,string,string,string,string,number,string,string,string][] = [
    // Phonics — Letter Sounds (eng-lphon)
    ['ep-01','english','eng-lphon',1,'1-2','Letter names A-Z','Sing the ABC song. Point to each letter as you sing. Learn that each letter has a name AND a sound.','introduction',5,'["verbal"]','[""]','alphabet poster, ABC song'],
    ['ep-02','english','eng-lphon',1,'1-2','Letter sounds - first 6','Learn sounds: /a/ (apple), /b/ (ball), /c/ (cat), /d/ (dog), /e/ (egg), /f/ (fish). Practice making sounds.','introduction',5,'["verbal"]','["ep-01"]','sound cards'],
    ['ep-03','english','eng-lphon',2,'2-3','Letter sounds - next 6','Learn: /g/ (go), /h/ (hat), /i/ (ink), /j/ (jump), /k/ (kite), /l/ (lion). Review previous sounds.','practice',5,'["verbal"]','["ep-02"]','sound cards'],
    ['ep-04','english','eng-lphon',2,'2-3','Letter sounds - next 6','Learn: /m/ (map), /n/ (net), /o/ (on), /p/ (pen), /q/ (queen), /r/ (run). Review all learned sounds.','practice',5,'["verbal"]','["ep-03"]','sound cards'],
    ['ep-05','english','eng-lphon',3,'3-4','Letter sounds - next 6','Learn: /s/ (sun), /t/ (top), /u/ (up), /v/ (van), /w/ (win), /x/ (box). Review all sounds.','practice',5,'["verbal"]','["ep-04"]','sound cards'],
    ['ep-06','english','eng-lphon',3,'3-4','Letter sounds - final 5','Learn: /y/ (yes), /z/ (zoo). Review ALL 26 sounds. Quick quiz: show letter, say sound.','practice',5,'["verbal"]','["ep-05"]','sound quiz cards'],
    ['ep-07','english','eng-lphon',2,'2-3','Short vowel sounds','Learn: /a/ (cat), /e/ (bed), /i/ (sit), /o/ (hot), /u/ (cup). Short vowels inside words.','practice',5,'["verbal"]','["ep-02"]','vowel cards'],
    ['ep-08','english','eng-lphon',3,'3-4','Long vowel sounds','Learn: /a_e/ (cake), /e_e/ (these), /i_e/ (bike), /o_e/ (home), /u_e/ (cute). Magic e changes the vowel.','practice',5,'["verbal"]','["ep-07"]','magic e cards'],
    ['ep-09','english','eng-lphon',4,'4-5','Consonant blends','Learn: bl, br, cl, cr, dr, fl, fr, gl, gr, pl, pr, sl, sm, sn, sp, st, sw, tr. Words like black, brick, clap.','practice',5,'["verbal"]','["ep-06"]','blend cards'],
    ['ep-10','english','eng-lphon',4,'4-5','Digraphs - two letters one sound','Learn: sh (ship), ch (chip), th (this), wh (when), ph (phone). Two letters make one sound.','practice',5,'["verbal"]','["ep-06"]','digraph cards'],
    ['ep-11','english','eng-lphon',5,'5-6','R-controlled vowels','Learn: ar (car), er (her), ir (bird), or (for), ur (turn). The r changes the vowel sound.','practice',3,'["verbal"]','["ep-08"]','r-controlled cards'],
    ['ep-12','english','eng-lphon',5,'5-6','Diphthongs','Learn: oi (oil), oy (boy), ou (out), ow (cow). Two vowel sounds together.','practice',3,'["verbal"]','["ep-08"]','diphthong cards'],

    // Sight Words (eng-sight)
    ['es-01','english','eng-sight',2,'2-3','First sight words - the, a, I','Learn to recognize: the, a, I. These words appear everywhere. Read them instantly, not sounding out.','practice',5,'["verbal"]','["ep-02"]','sight word flashcards'],
    ['es-02','english','eng-sight',2,'2-3','Sight words - is, it, in, on','Learn: is, it, in, on. Practice in sentences: It is a cat. The cat is on the mat.','practice',5,'["verbal"]','["es-01"]','sight word cards'],
    ['es-03','english','eng-sight',3,'3-4','Sight words - and, to, he, she','Learn: and, to, he, she. Make sentences: He and she went to the park.','practice',5,'["verbal"]','["es-02"]','sight word sentences'],
    ['es-04','english','eng-sight',3,'3-4','Sight words - was, are, for, with','Learn: was, are, for, with. Practice reading simple sentences with these words.','practice',5,'["verbal"]','["es-03"]','sentence cards'],
    ['es-05','english','eng-sight',4,'4-5','Sight words - they, we, you, his, her','Learn: they, we, you, his, her. Read and write sentences using these words.','practice',5,'["verbal"]','["es-04"]','sight word worksheet'],
    ['es-06','english','eng-sight',4,'4-5','Sight words - that, this, from, have','Learn: that, this, from, have. These 100 sight words make up 50% of all writing.','practice',5,'["verbal"]','["es-05"]','sight word bingo'],

    // Reading (eng-reading)
    ['er-01','english','eng-reading',2,'2-3','CVC words - cat, dog, pen','Sound out consonant-vowel-consonant words: c-a-t cat, d-o-g dog, p-e-n pen. Blend the sounds.','practice',5,'["verbal"]','["ep-06"]','CVC word cards'],
    ['er-02','english','eng-reading',3,'3-4','CVC words with short vowels','Read: sit, hot, cup, bed, map. All CVC with short vowels. Practice blending quickly.','practice',5,'["verbal"]','["er-01"]','CVC worksheets'],
    ['er-03','english','eng-reading',3,'3-4','CCVC and CVCC words','Read: stop (CCVC), lamp (CVCC), step (CCVC), hand (CVCC). Blending 4-letter words.','practice',5,'["verbal"]','["er-02"]','4-letter word cards'],
    ['er-04','english','eng-reading',4,'4-5','Magic e words','Read: cake, bike, home, cute, these. The silent e makes the first vowel long. Compare: cap vs cape.','practice',5,'["verbal"]','["ep-08"]','magic e word pairs'],
    ['er-05','english','eng-reading',4,'4-5','Blend words','Read: black, stream, splash, friend. Words with consonant blends. Sound out carefully.','practice',5,'["verbal"]','["ep-09"]','blend word cards'],
    ['er-06','english','eng-reading',5,'5-6','Digraph words','Read: ship, chip, this, when, phone. Words with digraphs (sh, ch, th, wh, ph).','practice',5,'["verbal"]','["ep-10"]','digraph word cards'],
    ['er-07','english','eng-reading',5,'5-6','Two-syllable words','Read: happy, water, rabbit, kitten. Clap the syllables. Read each syllable then blend.','practice',5,'["verbal"]','["ep-06"]','syllable cards'],
    ['er-08','english','eng-reading',6,'6-7','Simple sentences','Read: The cat sat on the mat. I can see a big dog. Read with fluency and understanding.','practice',5,'["verbal"]','["er-07"]','sentence strips'],
    ['er-09','english','eng-reading',6,'6-7','Short stories with comprehension','Read a short story. Answer: Who is in the story? What happened? Why? Build comprehension skills.','practice',5,'["verbal"]','["er-08"]','story books, comprehension cards'],

    // Writing (eng-writing)
    ['ew-01','english','eng-writing',1,'1-2','Holding a pencil correctly','Practice grip: thumb and index finger, pencil rests on middle finger. Draw lines and circles.','practice',5,'["hands-on"]','[""]','pencil, paper'],
    ['ew-02','english','eng-writing',1,'1-2','Tracing straight lines','Trace vertical, horizontal, and diagonal lines. These are the foundation of letter formation.','practice',5,'["hands-on"]','["ew-01"]','tracing worksheets'],
    ['ew-03','english','eng-writing',2,'2-3','Tracing letters A-M','Trace uppercase and lowercase letters A through M. Focus on correct formation and size.','practice',5,'["hands-on"]','["ew-02"]','letter tracing sheets'],
    ['ew-04','english','eng-writing',2,'2-3','Tracing letters N-Z','Trace uppercase and lowercase letters N through Z. Review all 26 letters.','practice',5,'["hands-on"]','["ew-03"]','letter tracing sheets'],
    ['ew-05','english','eng-writing',3,'3-4','Writing own name','Practice writing your first name. Start with a capital letter, then lowercase. Write it 5 times.','practice',5,'["hands-on"]','["ew-04"]','name writing paper'],
    ['ew-06','english','eng-writing',3,'3-4','Writing CVC words','Write: cat, dog, pen, sit, hot. Sound out each letter as you write it.','practice',3,'["hands-on"]','["ew-05"]','word writing sheets'],
    ['ew-07','english','eng-writing',4,'4-5','Writing simple sentences','Write: I see a cat. The dog is big. Use a capital letter at the start and a period at the end.','practice',3,'["hands-on"]','["ew-06"]','sentence writing paper'],
    ['ew-08','english','eng-writing',5,'5-6','Writing a paragraph','Write 3-5 sentences about a topic: My Family, My Favorite Animal. Include details.','practice',3,'["hands-on"]','["ew-07"]','writing notebook'],
    ['ew-09','english','eng-writing',6,'6-7','Writing a short story','Write a story with a beginning, middle, and end. Use descriptive words. Read it to someone.','practice',3,'["hands-on"]','["ew-08"]','story writing template'],

    // Grammar (eng-grammar)
    ['eg-01','english','eng-grammar',3,'3-4','Nouns - names of things','A noun is a person, place, or thing: boy, school, book. Find nouns in a sentence.','introduction',3,'["verbal"]','["er-01"]','noun sorting game'],
    ['eg-02','english','eng-grammar',3,'3-4','Verbs - action words','A verb shows action: run, eat, write, read. Every sentence needs a verb.','introduction',3,'["verbal"]','["eg-01"]','verb cards'],
    ['eg-03','english','eng-grammar',4,'4-5','Adjectives - describing words','Adjectives describe nouns: big dog, red apple, happy child. Add more detail to your sentences.','practice',3,'["verbal"]','["eg-01"]','adjective cards'],
    ['eg-04','english','eng-grammar',4,'4-5','Singular and plural','One cat = cats. One box = boxes. Learn the rules: add -s, -es, change -y to -ies.','practice',3,'["verbal"]','["eg-01"]','plural rules cards'],
    ['eg-05','english','eng-grammar',5,'5-6','Capital letters and periods','Start every sentence with a capital letter. End with a period, question mark, or exclamation mark.','practice',3,'["verbal"]','["ew-07"]','punctuation cards'],
    ['eg-06','english','eng-grammar',5,'5-6','Sentence structure','A sentence has a subject and a verb: The boy runs. The cat sleeps. Practice making complete sentences.','practice',3,'["verbal"]','["eg-02"]','sentence building blocks'],
    ['eg-07','english','eng-grammar',6,'6-7','Past and present tense','Present: I walk. Past: I walked. Learn common past tense forms: -ed ending, irregular verbs (went, ate).','practice',3,'["verbal"]','["eg-02"]','tense cards'],
    ['eg-08','english','eng-grammar',6,'6-7','Question words','Learn: Who? What? Where? When? Why? How? Ask and answer questions about a story.','practice',3,'["verbal"]','["eg-06"]','question word cards'],
  ];

  for (let i = 0; i < t.length; i += 5) {
    const batch = t.slice(i, i + 5);
    const values = batch.map(r =>
      `('${r[0]}','${r[1]}','${r[2]}',${r[3]},'${r[4]}','${r[5]}','${r[6]}','${r[7]}',${r[8]},'${r[9]}','${r[10]}','${r[11]}')`
    ).join(',');
    await prisma.$executeRawUnsafe(
      `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
    );
    console.log(`  Batch ${Math.floor(i/5)+1}: English topics ${i+1}-${Math.min(i+5,t.length)}`);
  }
  console.log(`  Seeded ${t.length} enhanced English topics`);
}
