import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedAkhlaq() {
    const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
      "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='akhlaq'"
    );
    if (Number(existing[0]?.cnt ?? 0) > 0) {
      console.log('  Seeding akhlaq topics already exist — skipping.');
      return;
    }
  5|  console.log('Seeding akhlaq (Islamic character) curriculum...');

  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('ak-001','akhlaq','akhlaq-foundation',0,'0-1','Being gentle with baby siblings','Learn to touch and hold gently. Say "Alhamdulillah" when baby is happy. Model gentleness in family.','introduction',2,'["modeling"]','[""]','family interaction'),
('ak-002','akhlaq','akhlaq-foundation',0,'0-1','Saying Bismillah before eating','Parent says Bismillah before feeding baby. Baby absorbs the routine of starting with Allah''s name.','introduction',5,'["routine","modeling"]','[""]','mealtime routine'),
('ak-003','akhlaq','akhlaq-foundation',1,'1-2','Saying please and thank you','Learn: "Please" (min fadlak) and "Thank you" (shukran). Use when asking for or receiving something.','introduction',5,'["verbal","modeling"]','["ak-001"]','daily interaction, role play'),
('ak-004','akhlaq','akhlaq-foundation',1,'1-2','Sharing with others','Offer food and toys to siblings and friends. Prophet ﷺ said: "None of you truly believes until he loves for his brother what he loves for himself." (Bukhari)','introduction',3,'["verbal","hands-on"]','["ak-003"]','sharing games, snack time'),
('ak-005','akhlaq','akhlaq-foundation',2,'2-3','Honesty (Al-Sidq)','Tell the truth even when it''s hard. Prophet ﷺ said: "Truthfulness leads to righteousness." (Bukhari/Muslim)','practice',3,'["verbal","role-play"]','["ak-003"]','story cards, truth game'),
('ak-006','akhlaq','akhlaq-foundation',2,'2-3','Kindness to animals','Be gentle with pets and animals. Prophet ﷺ said: "Whoever kills a sparrow for no reason will be questioned." (Muslim)','practice',3,'["verbal","hands-on"]','["ak-003"]','pet care, animal stories'),
('ak-007','akhlaq','akhlaq-foundation',2,'2-3','Patience basics (Sabr)','When things are hard or you don''t get what you want, say "Inna lillahi wa inna ilayhi raji''un." Wait calmly.','practice',3,'["verbal"]','["ak-005"]','patience stories, sticker chart'),
('ak-008','akhlaq','akhlaq-foundation',2,'2-3','Respecting parents','Obey parents, don''t interrupt when they speak, help them. Allah says: "Your Lord has decreed that you worship none but Him, and that you be kind to parents." (17:23)','practice',3,'["verbal","modeling"]','["ak-003"]','Quran verse, role play'),
('ak-009','akhlaq','akhlaq-building',3,'3-4','Truthfulness in all situations','Always tell the truth. Lying destroys trust. Prophet ﷺ said: "Truthfulness leads to righteousness and righteousness leads to Paradise." (Bukhari/Muslim)','practice',3,'["verbal","role-play"]','["ak-005"]','truth stories, trust exercises'),
('ak-010','akhlaq','akhlaq-building',3,'3-4','Generosity (Al-Karam)','Give to others — food, time, smiles. Prophet ﷺ was the most generous of people. Give even when you have little.','practice',3,'["verbal","hands-on"]','["ak-004"]','charity jar, giving activities'),
('ak-011','akhlaq','akhlaq-building',3,'3-4','Respecting elders','Stand when an elder enters, serve them first, speak respectfully. Prophet ﷺ said: "He is not one of us who does not show mercy to our young ones." (Tirmidhi)','practice',3,'["verbal","modeling"]','["ak-008"]','elder visit, role play'),
('ak-012','akhlaq','akhlaq-building',3,'3-4','Cleaning up after oneself','Keep your space tidy. Islam teaches cleanliness: "Cleanliness is half of faith." (Muslim) Put things back after use.','practice',3,'["hands-on"]','["ak-003"]','cleaning routine, chart'),
('ak-013','akhlaq','akhlaq-building',4,'4-5','Gratitude to Allah (Shukr)','Thank Allah for everything — food, health, family, faith. Say Alhamdulillah often. "If you are grateful, I will surely give you more." (14:7)','practice',3,'["verbal","hands-on"]','["ak-010"]','gratitude journal, Alhamdulillah jar'),
('ak-014','akhlaq','akhlaq-building',4,'4-5','Courage in doing right','Stand up for what is right even when alone. "The best jihad is a word of truth before a tyrant ruler." (Tirmidhi)','practice',3,'["verbal","role-play"]','["ak-009"]','courage stories, discussion'),
('ak-015','akhlaq','akhlaq-building',4,'4-5','Avoiding jealousy (Hasad)','Don''t be jealous of what others have. Allah gives everyone differently. Instead, be happy and make dua for them.','practice',3,'["verbal"]','["ak-007"]','story cards, discussion'),
('ak-016','akhlaq','akhlaq-building',4,'4-5','Respecting neighbors','Good neighbor rights in Islam. Prophet ﷺ said: "Jibril kept telling me about neighbor rights until I thought he would make them heirs." (Bukhari)','practice',3,'["verbal","hands-on"]','["ak-011"]','neighbor visit, gift making'),
('ak-017','akhlaq','akhlaq-building',5,'5-6','Modesty in dress and behavior','Islam teaches modesty for both boys and girls. Dress to please Allah, not to show off. "Tell the believing men to lower their gaze." (24:30)','practice',3,'["verbal"]','["ak-013"]','modesty discussion, clothing choices'),
('ak-018','akhlaq','akhlaq-building',5,'5-6','Controlling anger','Anger is natural but must be controlled. Prophet ﷺ said: "Do not become angry." When angry, sit down, make wudu, say A''udhu billahi min ash-Shaytan.','practice',3,'["verbal","role-play"]','["ak-007"]','anger management cards, wudu practice'),
('ak-019','akhlaq','akhlaq-building',5,'5-6','Being punctual','Respect others'' time. Come to salah on time. Prophet ﷺ said: "Which deed is most beloved to Allah?" He said: "Salah on its time." (Bukhari/Muslim)','practice',3,'["verbal"]','["ak-017"]','clock practice, schedule chart'),
('ak-020','akhlaq','akhlaq-building',5,'5-6','Charity (Sadaqah)','Give regularly, even small amounts. Prophet ﷺ said: "Every act of charity is accepted." Smile as charity. Help others as charity.','practice',3,'["verbal","hands-on"]','["ak-010"]','sadaqah jar, charity project'),
('ak-021','akhlaq','akhlaq-mastery',6,'6-7','Islamic etiquette in all situations','Comprehensive adab: entering/leaving home, entering/leaving mosque, eating/drinking, sleeping/waking, speaking, walking.','practice',3,'["verbal","role-play"]','["ak-017","ak-011"]','etiquette cards, daily checklist'),
('ak-022','akhlaq','akhlaq-mastery',6,'6-7','Good speech — avoiding lying and backbiting','"Whoever believes in Allah and the Last Day, let him speak good or remain silent." (Bukhari/Muslim). No lying, backbiting, or gossip.','practice',3,'["verbal"]','["ak-009"]','speech chart, hadith cards'),
('ak-023','akhlaq','akhlaq-mastery',6,'6-7','Brotherhood and sisterhood in Islam','"The believers in their mutual love, mercy, and compassion are like one body." (Muslim). Help, support, and care for each other.','practice',3,'["verbal","hands-on"]','["ak-016"]','community project, group activity'),
('ak-024','akhlaq','akhlaq-mastery',6,'6-7','Justice and fairness (Al-Adl)','"O you who believe, be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves." (4:135).','practice',3,'["verbal","role-play"]','["ak-009"]','fairness scenarios, discussion'),
('ak-025','akhlaq','akhlaq-mastery',6,'6-7','Trustworthiness (Al-Amanah)','Keep promises, return what is borrowed, be reliable. "Fulfill the covenant, for the covenant will be questioned about." (17:34)','practice',3,'["verbal","role-play"]','["ak-009"]','promise-keeping game, discussion')`);

  console.log('  Seeded 25 akhlaq topics (ak-001 to ak-025)');
}
