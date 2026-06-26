import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedAkhlaqEQ() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='akhlaq' AND strand='akhlaq-emotions'"
  );
  if (Number(existing[0]?.cnt ?? 0) > 0) {
    console.log('  Akhlaq EQ topics already exist — skipping.');
    return;
  }
  console.log('Seeding akhlaq emotional intelligence topics...');

  const topics: [string,string,string,number,string,string,string,string,number,string,string,string][] = [
    ['ae-001','akhlaq','akhlaq-emotions',1,'1-2','Happy and sad - naming feelings','Learn to name basic feelings: happy, sad, angry, scared. Point to your face. Feelings are from Allah - all are okay to feel.','introduction',3,'["visual","verbal"]','[""]','feelings flashcards'],
    ['ae-002','akhlaq','akhlaq-emotions',1,'1-2','When I feel angry what to do','It is okay to feel angry. It is NOT okay to hit or scream. Say I feel angry. Take deep breaths. Walk away. Tell someone.','introduction',3,'["verbal"]','["ae-001"]','calming corner'],
    ['ae-003','akhlaq','akhlaq-emotions',2,'2-3','Calm down plan - breathing with dhikr','When upset: Stop, Take 3 deep breaths saying Bismillah, Say La hawla wa la quwwata illa billah, Talk to someone.','practice',3,'["verbal"]','["ae-002"]','calm-down chart'],
    ['ae-004','akhlaq','akhlaq-emotions',2,'2-3','Empathy - how others feel','How would you feel if someone took your toy? Put yourself in someones shoes. The Prophet felt sad when others were sad.','practice',3,'["verbal"]','["ae-001"]','feelings cards'],
    ['ae-005','akhlaq','akhlaq-emotions',2,'2-3','Sharing and taking turns','Sharing makes others happy. Take turns with toys. The believer is generous and good to others.','practice',5,'["hands-on"]','["ae-004"]','sharing games'],
    ['ae-006','akhlaq','akhlaq-emotions',3,'3-4','Naming complex feelings','Learn: jealous, embarrassed, proud, grateful, lonely, excited. I feel ___ because ___. Build emotional vocabulary.','practice',3,'["verbal"]','["ae-001"]','feelings journal'],
    ['ae-007','akhlaq','akhlaq-emotions',3,'3-4','Calming techniques - the toolbox','Toolbox: deep breathing, counting to 10, walking away, dhikr, drawing, talking to someone, making wudu.','practice',3,'["hands-on"]','["ae-003"]','calm-down toolbox'],
    ['ae-008','akhlaq','akhlaq-emotions',3,'3-4','Conflict resolution - I feel statements','When upset: (1) Say how you feel (2) Say what happened (3) Say what you need. Practice with role play.','practice',3,'["verbal","hands-on"]','["ae-004"]','conflict cards'],
    ['ae-009','akhlaq','akhlaq-emotions',3,'3-4','Apologizing and forgiving','I am sorry - say it mean it then make it right. Forgiveness: the best of people are those who are best to people.','practice',3,'["verbal"]','["ae-004"]','apology scenarios'],
    ['ae-010','akhlaq','akhlaq-emotions',4,'4-5','Understanding anger - the volcano model','Anger builds like a volcano. Signs: clenched fists, hot face. When feeling it building: use calm-down tools BEFORE it erupts.','practice',3,'["visual","verbal"]','["ae-007"]','volcano poster'],
    ['ae-011','akhlaq','akhlaq-emotions',4,'4-5','Self-confidence - I am enough','Allah made you special. You do not need to be like anyone else. We have created man in the best of stature. Focus on your strengths.','practice',2,'["verbal"]','["ae-001"]','strengths poster'],
    ['ae-012','akhlaq','akhlaq-emotions',4,'4-5','Dealing with disappointment','Sometimes things do not go our way. That is okay. Perhaps you dislike something and it is good for you. Try again.','practice',2,'["verbal"]','["ae-007"]','story examples'],
    ['ae-013','akhlaq','akhlaq-emotions',5,'5-6','Gratitude journaling - daily shukr','Write 3 things you are grateful for every day. If you are grateful I will increase you. Gratitude changes how you see the world.','practice',5,'["hands-on"]','["ae-001"]','gratitude journal'],
    ['ae-014','akhlaq','akhlaq-emotions',5,'5-6','Patience Sabr - real strength','Sabr is not just waiting - it is staying strong while waiting. Indeed the patient will be given their reward without account.','practice',3,'["verbal"]','["ae-007"]','sabr stories'],
    ['ae-015','akhlaq','akhlaq-emotions',5,'5-6','Being a good listener','Listen to understand not just to wait for your turn. Make eye contact. Do not interrupt. When two people converse let neither interrupt.','practice',3,'["verbal","hands-on"]','["ae-008"]','listening activities'],
    ['ae-016','akhlaq','akhlaq-emotions',6,'6-7','Managing worry and anxiety','When worried: Say Hasbunallah wa ni mal wakeel. Talk to someone you trust. Write down your worry. Ask: can I do something about this?','practice',3,'["verbal","hands-on"]','["ae-007"]','worry jar'],
    ['ae-017','akhlaq','akhlaq-emotions',6,'6-7','Resilience - bouncing back','When you fail: It is okay. What did I learn? Try again. The Prophet faced many hardships but never gave up.','practice',3,'["verbal"]','["ae-014"]','resilience stories'],
    ['ae-018','akhlaq','akhlaq-emotions',6,'6-7','Being kind to yourself','Talk to yourself the way you would talk to your best friend. Do not say I am stupid - say I am learning. Allah is Al-Lateef.','practice',2,'["verbal"]','["ae-011"]','self-talk cards'],
  ];

  for (let i = 0; i < topics.length; i += 5) {
    const batch = topics.slice(i, i + 5);
    const values = batch.map(t =>
      `('${t[0]}','${t[1]}','${t[2]}',${t[3]},'${t[4]}','${t[5]}','${t[6]}','${t[7]}',${t[8]},'${t[9]}','${t[10]}','${t[11]}')`
    ).join(',');
    await prisma.$executeRawUnsafe(
      `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
    );
    console.log(`  Batch ${Math.floor(i/5)+1}: akhlaq EQ topics ${i+1}-${Math.min(i+5,topics.length)}`);
  }
  console.log(`  Seeded ${topics.length} akhlaq EQ topics (ae-001 to ae-018)`);
}
