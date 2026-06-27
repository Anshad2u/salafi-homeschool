import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedEQEnhanced() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='akhlaq' AND strand='akhlaq-eq-enhanced'"
  );
  const cnt = Number(existing[0]?.cnt ?? 1);
  if (cnt > 0) {
    console.log('  EQ enhanced already seeded — skipping.');
    return;
  }
  console.log('  Seeding comprehensive Emotional Intelligence expansion...');

  const a = 'akhlaq';
  const t = [
    // ═══════════════════════════════════════════════════════════
    // FRIENDSHIP & SOCIAL SKILLS
    // ═══════════════════════════════════════════════════════════
    ['eqe-001',a,'akhlaq-eq-enhanced',4,'4-5','Making Friends: How to Start','Smile, say Assalamu Alaykum, ask their name, ask questions (What do you like to play?). Share something about yourself. The believer is friendly and easy to get along with.','practice',3,'["hands-on"]','[""]','conversation starter cards, role-play prompts, friendship bingo'],
    ['eqe-002',a,'akhlaq-eq-enhanced',4,'4-5','Being a Good Friend','Good friends: share, listen, help, tell the truth, keep promises, defend each other. Bad friends: tease, ignore, lie, get you in trouble. The Prophet said: A person follows the religion of their close friend.','practice',3,'["verbal","hands-on"]','["eqe-001"]','good friend checklist, friendship sorting game, hadith cards'],
    ['eqe-003',a,'akhlaq-eq-enhanced',4,'4-5','Friendship Conflicts: Fixing Disagreements','Fights happen between friends. Steps: calm down, talk about the problem, listen to their side, say sorry if you hurt them, find a solution together. The Prophet settled disputes with justice and mercy.','practice',3,'["verbal","hands-on"]','["eqe-002"]','conflict resolution steps poster, role-play scenarios, peace cards'],
    ['eqe-004',a,'akhlaq-eq-enhanced',5,'5-6','Peer Pressure: Saying No','When friends push you to do wrong: say No firmly, suggest a better idea, walk away if needed. You do not have to follow the crowd. The Prophet said: The strong person is not the one who wrestles, but the one who controls himself when angry.','practice',3,'["verbal","hands-on"]','[""]','peer pressure scenarios, No thank you scripts, confidence cards'],
    ['eqe-005',a,'akhlaq-eq-enhanced',4,'4-5','Reading Body Language','Faces and bodies show feelings: crossed arms (defensive), looking down (sad), big smile (happy), fidgeting (nervous). Learn to read others feelings so you can respond kindly.','practice',2,'["visual","hands-on"]','[""]','emotion cards with faces, body language charades, feelings poster'],
    ['eqe-006',a,'akhlaq-eq-enhanced',5,'5-6','Bullying: What It Is and What to Do','Bullying: repeated mean behavior (hitting, name-calling, leaving someone out, online teasing). If bullied: tell a trusted adult, stay with friends, do not fight back, ignore the bully. Bullying is haram.','practice',4,'["verbal","visual"]','["eqe-004"]','bullying vs conflict cards, help network poster, tell a adult guide'],
    ['eqe-007',a,'akhlaq-eq-enhanced',5,'5-6','Teamwork and Cooperation','Working together: listen to others ideas, share tasks, encourage teammates, take turns leading. Prophet Muhammad consulted his companions. Together we can achieve more.','practice',2,'["hands-on"]','[""]','team challenge activities, group project checklist, consultation (shura) cards'],

    // ═══════════════════════════════════════════════════════════
    // EMOTIONAL REGULATION & COPING
    // ═══════════════════════════════════════════════════════════
    ['eqe-008',a,'akhlaq-eq-enhanced',4,'4-5','Dealing with Jealousy (Hasad)','Feeling jealous when someone has something you want. It is natural but do not let it grow. Say: Masha Allah, barakallah. Be happy for others. The Prophet warned against hasad.','practice',3,'["verbal"]','[""]','hasad awareness cards, gratitude activity, dua for contentment (qanaah)'],
    ['eqe-009',a,'akhlaq-eq-enhanced',4,'4-5','Honesty Builds Trust','Truthfulness is a sign of faith. When you lie, people stop trusting you. Even small lies hurt. The Prophet was called Al-Amin (the Trustworthy). Always tell the truth, even when it is hard.','practice',3,'["verbal","hands-on"]','[""]','honesty stories, trust building game, Al-Amin activity'],
    ['eqe-010',a,'akhlaq-eq-enhanced',5,'5-6','Self-Control: Pause Before You Act','When you want to do something: STOP (Stop, Take a breath, Observe, Proceed). Count to 5 before reacting. Think: Is this a good choice? Will it please Allah? Self-control is a superpower.','practice',3,'["hands-on"]','[""]','STOP poster, impulse control game, self-control tracker'],
    ['eqe-011',a,'akhlaq-eq-enhanced',5,'5-6','Coping with Change: New Baby, Moving, New School','Change is hard. Talk about your feelings. Look for good things in the new situation. Ask Allah for help. Remember: every change comes from Allah, and He knows what is best for us.','practice',3,'["verbal","hands-on"]','["eqe-008"]','change coping cards, feelings journal, new situation tips sheet'],
    ['eqe-012',a,'akhlaq-eq-enhanced',6,'6-7','Dealing with Grief and Loss','When someone we love dies: it is okay to be sad. Say Inna lillahi wa inna ilayhi rajiun. Make dua for them. Give charity on their behalf. Remember: Jannah is waiting for the believers. Allah does not give more than we can bear.','practice',3,'["verbal"]','["eqe-011"]','grief support cards, dua for deceased, Jannah visualization activity'],
    ['eqe-013',a,'akhlaq-eq-enhanced',5,'5-6','Managing Embarrassment','Embarrassment is a feeling from faith (haya). When embarrassed: take a deep breath, remember everyone makes mistakes, smile, move on. Do not let embarrassment stop you from learning or trying new things.','practice',2,'["verbal"]','[""]','haya (modesty) vs embarrassment cards, funny mistake stories, confidence tips'],
    ['eqe-014',a,'akhlaq-eq-enhanced',5,'5-6','Mindfulness: Being Present','Pay attention to right now: how your breath feels, the sounds around you, the taste of your food. Say Bismillah and focus. Mindfulness helps with worry and helps us be grateful.','practice',3,'["hands-on"]','[""]','mindfulness bell, breathing star, 5 senses activity, dhikr focus cards'],
    ['eqe-015',a,'akhlaq-eq-enhanced',5,'5-6','Handling Criticism','When someone tells you something to improve: do not get defensive. Listen carefully. Ask: Is there truth here? If yes, work on it. If no, let it go. Constructive criticism helps us grow.','practice',2,'["verbal"]','[""]','criticism sorting activity, growth mindset cards, prophet receiving feedback story'],
    ['eqe-016',a,'akhlaq-eq-enhanced',4,'4-5','Dealing with Fear','Everyone feels scared sometimes: new places, darkness, tests, separation. Say: Hasbunallahu wa nimal wakeel. Tell someone you trust. Allah is the Protector (Al-Hafeedh). Fear is normal but do not let it control you.','practice',3,'["verbal","hands-on"]','[""]','fear coping toolbox cards, bravery challenge, Allah as Protector poster'],
    ['eqe-017',a,'akhlaq-eq-enhanced',5,'5-6','Managing Boredom','Boredom is a feeling that says: find something meaningful. Ideas: read Quran, help with chores, draw, play outside, learn a new skill, memorize a hadith. The Prophet was never idle - he was always doing something beneficial.','practice',2,'["hands-on"]','[""]','boredom buster jar ideas, productive activity list, daily schedule plan'],

    // ═══════════════════════════════════════════════════════════
    // SELF-AWARENESS & IDENTITY
    // ═══════════════════════════════════════════════════════════
    ['eqe-018',a,'akhlaq-eq-enhanced',5,'5-6','Respecting Differences','People look different, speak different languages, like different things. Allah created us in different nations and tribes so we may know one another. Difference is not bad - it is beautiful.','practice',2,'["verbal","visual"]','[""]','diversity poster, culture sharing activity, Quran 49:13 verse card'],
    ['eqe-019',a,'akhlaq-eq-enhanced',5,'5-6','Contentment: Qanaah','Qanaah means being happy with what Allah gave you. Not always wanting more. Look at those who have less, not those who have more. The Prophet said: Richness is not having many possessions, but richness is contentment of the soul.','practice',3,'["verbal","hands-on"]','[""]','qanaah story cards, gratitude jar, contentment checklist'],
    ['eqe-020',a,'akhlaq-eq-enhanced',4,'4-5','Positive Self-Talk','The way you talk to yourself matters. Instead of I cannot do it, say: I will try my best. Instead of I am stupid, say: I am still learning. Allah is with those who strive. Be your own best supporter.','practice',3,'["hands-on"]','[""]','affirmation cards, positive self-talk mirror activity, thought swap game'],
    ['eqe-021',a,'akhlaq-eq-enhanced',4,'4-5','Responsibility: Being Trustworthy','When you are given a task or a secret, take it seriously. Do your homework. Feed your pet on time. Return what was borrowed. The Prophet said: The signs of a hypocrite are three: lies, breaks promises, betrays trusts.','practice',3,'["hands-on"]','[""]','responsibility chart, amanah activity cards, trustworthiness stories'],
    ['eqe-022',a,'akhlaq-eq-enhanced',5,'5-6','Goal Setting for Children','Set a goal: something you want to achieve. Make it specific: Memorize 5 Quran verses this month. Break it into small steps. Track progress. Celebrate when you achieve it. The Prophet encouraged striving for good.','practice',3,'["hands-on"]','[""]','goal setting template, progress tracker, achievement stickers'],
    ['eqe-023',a,'akhlaq-eq-enhanced',5,'5-6','Assertiveness: Standing Up for Yourself','Speak up politely but firmly. Say: I do not like that. Please stop. That is not okay. You have the right to say no to things that make you uncomfortable. Assertiveness is different from aggression.','practice',3,'["verbal","hands-on"]','["eqe-004"]','assertiveness vs aggression poster, I-statements practice, role-play cards'],

    // ═══════════════════════════════════════════════════════════
    // EMPATHY & COMPASSION
    // ═══════════════════════════════════════════════════════════
    ['eqe-024',a,'akhlaq-eq-enhanced',4,'4-5','Empathy in Action: Helping Others','When someone is sad or hurt: ask Are you okay?, listen, offer help, do something kind. The Prophet helped everyone: the poor, the old, orphans, widows, and even animals. Be useful to others.','practice',3,'["hands-on"]','["ae-004"]','helping others checklist, kindness challenge, empathy in action cards'],
    ['eqe-025',a,'akhlaq-eq-enhanced',4,'4-5','Forgiving Others for Allahs Sake','When someone wrongs you: it is okay to be upset, but try to forgive. Forgiveness frees your heart. The Prophet forgave everyone, even those who harmed him most. Forgive for Allahs reward.','practice',3,'["verbal","hands-on"]','[""]','forgiveness stories, forgiving others worksheet, making peace activity'],
    ['eqe-026',a,'akhlaq-eq-enhanced',3,'3-4','Thanking People: Gratitude Social','Say Jazakallah Khair when someone helps you. Thank your parents, teachers, friends. A simple thank you makes people feel appreciated. The Prophet said: Whoever does not thank people has not thanked Allah.','practice',2,'["hands-on"]','[""]','thank you note templates, gratitude circle activity, jazakallah cards'],
    ['eqe-027',a,'akhlaq-eq-enhanced',5,'5-6','Personal Boundaries: My Body, My Rules','Your body belongs to you. No one has the right to touch you in ways that make you uncomfortable. Say NO loudly. Tell a trusted adult. Secrets about touch should never be kept. Allah loves you and wants you safe.','practice',4,'["verbal","visual"]','["eqe-023"]','body safety poster, safe/unsafe touch cards, trusted adult network sheet'],
    ['eqe-028',a,'akhlaq-eq-enhanced',4,'4-5','Tattling vs Telling: Knowing the Difference','Tattling: trying to get someone in trouble. Telling: keeping someone safe. Ask yourself: Is this to help someone or to hurt someone? If someone is in danger, tell a grown-up right away.','practice',2,'["verbal","hands-on"]','[""]','tattle vs tell sorting, scenarios cards, is this helpful? checklist'],

    // ═══════════════════════════════════════════════════════════
    // DIGITAL & MODERN LIFE SKILLS
    // ═══════════════════════════════════════════════════════════
    ['eqe-029',a,'akhlaq-eq-enhanced',5,'5-6','Digital Etiquette: Kindness Online','Treat people online the way you would treat them in person. Do not say mean things behind a screen. Do not share embarrassing photos. Think before you post. Your online words are recorded.','practice',3,'["verbal","visual"]','[""]','digital etiquette poster, online vs offline comparison, digital footprint awareness'],
    ['eqe-030',a,'akhlaq-eq-enhanced',6,'6-7','Social Media Awareness','Not everything online is true. People show only the best parts of their lives. Do not compare yourself. Limit screen time. Talk to parents about what you see. Social media can be useful but also harmful.','practice',3,'["verbal"]','["eqe-029"]','social media pros/cons cards, comparison trap awareness, screen time agreement'],
    ['eqe-031',a,'akhlaq-eq-enhanced',5,'5-6','Making Good Decisions: 5-Step Process','When you have a choice: 1) What is the problem? 2) What are my options? 3) What would happen for each? 4) What is the best choice? 5) Did it work? Ask: Would this please Allah?','practice',3,'["verbal","hands-on"]','[""]','decision-making poster, good choice scenarios, pros and cons worksheet'],

    // ═══════════════════════════════════════════════════════════
    // CHARACTER & VIRTUES
    // ═══════════════════════════════════════════════════════════
    ['eqe-032',a,'akhlaq-eq-enhanced',4,'4-5','Sportsmanship: Winning and Losing','Win with humility (say Alhamdulillah, do not boast). Lose with grace (say Masha Allah, well played, try again next time). The Prophet raced with Aisha and said: You won!','practice',2,'["hands-on"]','[""]','sportsmanship rules poster, fair play certificates, game scenarios'],
    ['eqe-033',a,'akhlaq-eq-enhanced',4,'4-5','Sibling Relationships: Brothers and Sisters','Siblings are gifts from Allah. Share, do not hit, help each other, do not compare. The older should help the younger. The younger should respect the older. The Prophet said: The best of you are the best to their families.','practice',3,'["verbal","hands-on"]','[""]','sibling kindness challenge, family tree activity, baby/brother helper cards'],
    ['eqe-034',a,'akhlaq-eq-enhanced',5,'5-6','Patience: When Things Dont Happen Fast','Waiting is hard. When you feel impatient: take deep breaths, remember Allah is with the patient, distract yourself with something good, ask for help. The reward of patience is Jannah.','practice',3,'["verbal","hands-on"]','["ae-014"]','patience activities, waiting timer, sabr reward chart'],
    ['eqe-035',a,'akhlaq-eq-enhanced',5,'5-6','Dealing with Loneliness','Sometimes we feel alone. Remember: Allah is always with you. Reach out to family or friends. Do something you enjoy. Read Quran. Make dua. You are never truly alone when you have Allah.','practice',2,'["verbal","hands-on"]','[""]','loneliness coping cards, dua for companionship, connection challenge'],
  ];

  for (let i = 0; i < t.length; i += 5) {
    const batch = t.slice(i, i + 5);
    const values = batch.map(r =>
      `('${r[0]}','${r[1]}','${r[2]}',${r[3]},'${r[4]}','${r[5]}','${r[6]}','${r[7]}',${r[8]},'${r[9]}','${r[10]}','${r[11]}')`
    ).join(',');
    await prisma.$executeRawUnsafe(
      `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
    );
    console.log(`  EQ Batch ${Math.floor(i/5)+1}: topics ${i+1}-${Math.min(i+5,t.length)}`);
  }
  console.log(`  Seeded ${t.length} EQ topics`);
}
