import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedEnhancements() {
  console.log('Seeding enhancement topics...');

  // Life Skills: Financial + Time Management
  const lsExisting = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='life-skills' AND strand='ls-finance'"
  );
  if (Number(lsExisting[0]?.cnt ?? 0) === 0) {
    const financeTopics: [string,string,string,number,string,string,string,string,number,string,string,string][] = [
      ['ls-101','life-skills','ls-finance',2,'2-3','Needs vs wants','Needs: food, water, shelter. Wants: toys, candy. Learn to tell the difference.','introduction',3,'["verbal"]','[""]','sorting cards'],
      ['ls-102','life-skills','ls-finance',2,'2-3','Coins and money','Learn to recognize coins: 1 SAR, 5 SAR, 10 SAR. Money is used to buy things we need.','introduction',3,'["hands-on"]','["ls-101"]','play money'],
      ['ls-103','life-skills','ls-finance',3,'3-4','Saving money','Save money in a piggy bank. Goal: save up for something special. Watch your savings grow.','practice',5,'["hands-on"]','["ls-102"]','piggy bank'],
      ['ls-104','life-skills','ls-finance',3,'3-4','Charity Sadaqah','Give a little of what you have to help others. The upper hand is better than the lower hand.','practice',3,'["verbal"]','["ls-103"]','sadaqah box'],
      ['ls-105','life-skills','ls-finance',4,'4-5','Halal earning','Earn money through honest work. The honest merchant will be with the Prophets. Never cheat.','practice',2,'["verbal"]','["ls-101"]','role play shop'],
      ['ls-106','life-skills','ls-finance',4,'4-5','Budget basics','Before buying: Do I need this? Can I afford it? Plan how to spend pocket money wisely.','practice',2,'["verbal"]','["ls-103"]','budget worksheet'],
      ['ls-107','life-skills','ls-finance',5,'5-6','Zakat basics','Zakat is obligatory charity: 2.5% of savings given to the poor. Understand why Muslims give zakat.','practice',2,'["verbal"]','["ls-104"]','zakat worksheet'],
      ['ls-108','life-skills','ls-finance',6,'6-7','Halal vs haram spending','Never spend on haram things. Spend on what is good and beneficial.','practice',2,'["verbal"]','["ls-105"]','spending discussion'],
    ];

    const timeTopics: [string,string,string,number,string,string,string,string,number,string,string,string][] = [
      ['ls-201','life-skills','ls-time',2,'2-3','Daily routines','Morning: wake up, brush teeth, pray, eat. Night: pray, read Quran, sleep. Follow a routine.','introduction',3,'["routine"]','[""]','routine chart'],
      ['ls-202','life-skills','ls-time',3,'3-4','Following a schedule','Use a visual timer to know: it is Quran time now. Follow the daily schedule.','practice',3,'["routine","hands-on"]','["ls-201"]','visual timer'],
      ['ls-203','life-skills','ls-time',3,'3-4','Cleaning up - tidy as you go','Do not leave a mess. Put toys back after playing. Cleanliness is part of faith.','practice',5,'["routine","hands-on"]','["ls-201"]','cleanup timer'],
      ['ls-204','life-skills','ls-time',4,'4-5','Simple goal setting','Set a small goal: I want to memorize Al-Fatiha this week. Break it into steps. Check off each step.','practice',2,'["verbal","hands-on"]','["ls-202"]','goal worksheet'],
      ['ls-205','life-skills','ls-time',4,'4-5','Waiting your turn','When waiting: do not interrupt, wait calmly. The best of people are patient.','practice',3,'["verbal"]','["ls-202"]','patience game'],
      ['ls-206','life-skills','ls-time',5,'5-6','Planning my day','Make a morning checklist: brush teeth, get dressed, pray, eat, pack bag. Check off each item.','practice',3,'["routine","hands-on"]','["ls-202"]','checklist template'],
      ['ls-207','life-skills','ls-time',5,'5-6','Deadline awareness','I need to finish this by tomorrow. Learn to manage time for tasks. Take advantage of five before five.','practice',2,'["verbal"]','["ls-204"]','deadline worksheet'],
      ['ls-208','life-skills','ls-time',6,'6-7','Weekly review','Every week: review what you accomplished, what needs more work, plan next week.','practice',2,'["verbal","hands-on"]','["ls-206"]','weekly review journal'],
    ];

    const allLS = [...financeTopics, ...timeTopics];
    for (let i = 0; i < allLS.length; i += 5) {
      const batch = allLS.slice(i, i + 5);
      const values = batch.map(t =>
        `('${t[0]}','${t[1]}','${t[2]}',${t[3]},'${t[4]}','${t[5]}','${t[6]}','${t[7]}',${t[8]},'${t[9]}','${t[10]}','${t[11]}')`
      ).join(',');
      await prisma.$executeRawUnsafe(
        `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
      );
    }
    console.log(`  Seeded ${allLS.length} life-skills enhancement topics`);
  }

  // Science: Environmental Stewardship
  const scExisting = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='science' AND strand='sc-environment'"
  );
  if (Number(scExisting[0]?.cnt ?? 0) === 0) {
    const envTopics: [string,string,string,number,string,string,string,string,number,string,string,string][] = [
      ['se-001','science','sc-environment',1,'1-2','Allah created trees and flowers','Look at trees, flowers, and plants. Say SubhanAllah! Allah made them beautiful and green.','introduction',3,'["visual"]','[""]','nature walk'],
      ['se-002','science','sc-environment',2,'2-3','Caring for animals','Be gentle with animals. Give them water. Do not hurt them. Whoever kills a sparrow will cry to Allah on Judgment Day.','introduction',3,'["verbal","hands-on"]','["se-001"]','bird feeder'],
      ['se-003','science','sc-environment',2,'2-3','Do not waste water','Turn off the tap while brushing. Use only what you need. Do not waste even at a flowing river.','practice',5,'["routine"]','["se-001"]','conservation chart'],
      ['se-004','science','sc-environment',3,'3-4','Planting seeds','Plant seeds in a pot. Water them. Watch them grow. If the Hour is about to be established and you have a palm shoot, plant it.','practice',3,'["hands-on"]','["se-001"]','seeds and pots'],
      ['se-005','science','sc-environment',3,'3-4','Reduce Reuse Recycle','Do not throw everything away. Use things again. Recycle paper, plastic, glass. Be creative with what you have.','practice',3,'["hands-on"]','["se-001"]','recycling bins'],
      ['se-006','science','sc-environment',4,'4-5','Nature journal','Draw what you see outside: birds, insects, clouds. Write a sentence. In the creation of heavens and earth are signs for those of understanding.','practice',3,'["hands-on"]','["se-001"]','nature journal'],
      ['se-007','science','sc-environment',4,'4-5','Litter and pollution','Litter hurts animals. Pick up litter when you see it. The earth is green and beautiful and Allah has appointed you His stewards.','practice',2,'["verbal","hands-on"]','["se-005"]','outdoor cleanup'],
      ['se-008','science','sc-environment',5,'5-6','Protecting our planet','Save energy, plant trees, do not waste. Be mindful of progress and its impact on the earth.','practice',2,'["verbal"]','["se-006"]','weather tracking'],
      ['se-009','science','sc-environment',5,'5-6','Islamic scientists','Learn about Ibn Sina, Al-Biruni, Ibn Al-Haytham. Muslims were pioneers in studying nature.','practice',2,'["verbal"]','["se-006"]','scientist cards'],
      ['se-010','science','sc-environment',6,'6-7','Being khalifah of the earth','Allah made you steward of the earth. Care for it: save water, reduce waste, plant trees. Do not cause corruption on the earth.','practice',3,'["verbal","hands-on"]','["se-007"]','environmental project'],
    ];
    for (let i = 0; i < envTopics.length; i += 5) {
      const batch = envTopics.slice(i, i + 5);
      const values = batch.map(t =>
        `('${t[0]}','${t[1]}','${t[2]}',${t[3]},'${t[4]}','${t[5]}','${t[6]}','${t[7]}',${t[8]},'${t[9]}','${t[10]}','${t[11]}')`
      ).join(',');
      await prisma.$executeRawUnsafe(
        `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
      );
    }
    console.log(`  Seeded ${envTopics.length} science environmental topics`);
  }

  // Computer: Media Literacy
  const coExisting = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='computer' AND strand='co-media'"
  );
  if (Number(coExisting[0]?.cnt ?? 0) === 0) {
    const mediaTopics: [string,string,string,number,string,string,string,string,number,string,string,string][] = [
      ['cm-001','computer','co-media',2,'2-3','Screen time balance','Screens are for limited time. More time playing, reading, and being outside.','introduction',2,'["verbal"]','[""]','screen time chart'],
      ['cm-002','computer','co-media',3,'3-4','What is on the screen - is it real?','Not everything on TV or tablet is real. Cartoons are drawings. Ads try to sell things. Question what you see.','introduction',2,'["verbal"]','["cm-001"]','real vs fake cards'],
      ['cm-003','computer','co-media',3,'3-4','Safe shows and games','Choose age-appropriate content. Ask a parent before watching something new. If something feels wrong, turn it off.','practice',2,'["verbal"]','["cm-002"]','content selection guide'],
      ['cm-004','computer','co-media',4,'4-5','Ads want you to buy','Ads make things look amazing but they are trying to sell you something. Do you really need this?','practice',2,'["verbal"]','["cm-002"]','ad analysis activity'],
      ['cm-005','computer','co-media',4,'4-5','Screen time rules','Follow screen time rules: 1 hour max. Take breaks every 20 minutes. Look away from the screen. Do things in moderation.','practice',2,'["routine"]','["cm-001"]','screen time tracker'],
      ['cm-006','computer','co-media',5,'5-6','Cyberbullying','Bullying online is still bullying. Do not send mean messages. If someone bullies you, tell an adult and block them.','practice',2,'["verbal"]','["cm-004"]','cyberbullying scenarios'],
      ['cm-007','computer','co-media',5,'5-6','Personal information privacy','Never share: full name, address, school, phone, photos without parent permission. Be careful what you share.','practice',2,'["verbal"]','["cm-004"]','privacy checklist'],
      ['cm-008','computer','co-media',6,'6-7','Digital footprint','Everything you post online can be seen by anyone and lasts forever. Think before you post. Would I say this in front of my parents?','practice',2,'["verbal"]','["cm-006"]','digital footprint discussion'],
      ['cm-009','computer','co-media',6,'6-7','Fake news','Not everything online is true. Check: Who wrote this? Is it from a trusted source? Verify before you believe.','practice',2,'["verbal"]','["cm-008"]','fake vs real activity'],
    ];
    for (let i = 0; i < mediaTopics.length; i += 5) {
      const batch = mediaTopics.slice(i, i + 5);
      const values = batch.map(t =>
        `('${t[0]}','${t[1]}','${t[2]}',${t[3]},'${t[4]}','${t[5]}','${t[6]}','${t[7]}',${t[8]},'${t[9]}','${t[10]}','${t[11]}')`
      ).join(',');
      await prisma.$executeRawUnsafe(
        `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
      );
    }
    console.log(`  Seeded ${mediaTopics.length} computer media literacy topics`);
  }

  console.log('  Enhancement topics seeded successfully');
}
