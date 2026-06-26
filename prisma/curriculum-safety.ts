import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedSafety() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='safety'"
  );
  if (Number(existing[0]?.cnt ?? 0) > 0) {
    console.log('  Safety topics already exist — skipping.');
    return;
  }
  console.log('Seeding safety curriculum...');
  const s = 'safety';

  const topics: [string,string,string,number,string,string,string,string,number,string,string,string][] = [
    ['sf-001',s,'safety-body',1,'1-2','My body belongs to me','Learn that your body is yours. No one should touch you in ways that feel uncomfortable. Say NO and tell a trusted adult.','introduction',3,'["verbal"]','[""]','body safety picture book'],
    ['sf-002',s,'safety-body',2,'2-3','Private parts are private','Private parts are covered by clothing. No one should see or touch them except parent for cleaning or doctor with parent present.','introduction',3,'["verbal"]','["sf-001"]','body safety book'],
    ['sf-003',s,'safety-body',2,'2-3','Safe touch vs unsafe touch','Safe touch: hugs from parents. Unsafe touch: anywhere private, any touch that hurts. If something feels wrong, tell someone.','introduction',3,'["verbal"]','["sf-001"]','touch chart'],
    ['sf-004',s,'safety-body',3,'3-4','My body is my responsibility','Take care of your body - it is an amanah from Allah. Eat well, sleep well, keep clean.','practice',2,'["verbal"]','["sf-002"]','daily routine chart'],
    ['sf-005',s,'safety-body',3,'3-4','No secrets about body safety','No one should ask you to keep body safety secrets. Good secrets vs bad secrets. Always tell a trusted adult.','practice',2,'["verbal"]','["sf-002"]','secret sorting cards'],
    ['sf-006',s,'safety-body',3,'3-4','Safe adults - who to tell','Identify 3-5 trusted adults: parents, teacher, grandparents. If one adult does not listen, tell another.','practice',2,'["verbal"]','["sf-005"]','trusted adult worksheet'],
    ['sf-007',s,'safety-body',4,'4-5','Saying NO assertively','Practice saying NO loudly and firmly. Practice walking away. Practice telling a trusted adult. Role-play scenarios.','practice',3,'["hands-on"]','["sf-006"]','role play cards'],
    ['sf-008',s,'safety-body',4,'4-5','Online safety - basics','Never share photos, name, school, or address online. Tell a parent if you see something scary online.','practice',2,'["verbal"]','["sf-006"]','online safety poster'],
    ['sf-009',s,'safety-stranger',2,'2-3','Who is a safe stranger?','Not all strangers are dangerous but be careful. Safe strangers: police, shop manager, parent with children.','introduction',2,'["verbal"]','["sf-001"]','stranger safety cards'],
    ['sf-010',s,'safety-stranger',3,'3-4','Tricky people','Predators are usually known people. A tricky person is any adult who asks you to break rules or keep secrets.','introduction',2,'["verbal"]','["sf-009"]','tricky people scenarios'],
    ['sf-011',s,'safety-stranger',3,'3-4','The buddy system','Always be with a friend or adult. If you get lost, stay where you are and ask for help.','practice',2,'["verbal"]','["sf-009"]','buddy system practice'],
    ['sf-012',s,'safety-stranger',4,'4-5','What to do if approached','Say NO loudly. Run to a safe place. Tell a trusted adult. Never accept gifts or rides from strangers.','practice',3,'["hands-on"]','["sf-010"]','role play practice'],
    ['sf-013',s,'safety-road',1,'1-2','Holding hands near roads','Always hold an adults hand near roads and parking lots. Roads are dangerous.','introduction',5,'["routine"]','[""]','road safety walks'],
    ['sf-014',s,'safety-road',2,'2-3','Stop Look Listen Think','Before crossing: STOP at the edge, LOOK left-right-left, LISTEN for cars, THINK if safe. Practice every time.','practice',5,'["hands-on"]','["sf-013"]','road crossing practice'],
    ['sf-015',s,'safety-road',3,'3-4','Traffic lights and signs','Red = stop. Green = go. Yellow = wait. Learn basic road signs. Practice crossing at traffic lights.','practice',3,'["verbal","hands-on"]','["sf-014"]','traffic light cards'],
    ['sf-016',s,'safety-road',4,'4-5','Bicycle and scooter safety','Always wear a helmet. Ride on the pavement. Never ride near busy roads. Use hand signals.','practice',3,'["hands-on"]','["sf-014"]','helmet and bicycle'],
    ['sf-017',s,'safety-road',5,'5-6','Road safety independence','Cross roads safely on your own in quiet areas. Know your address and phone number.','practice',3,'["hands-on"]','["sf-016"]','road safety quiz'],
    ['sf-018',s,'safety-fire',2,'2-3','Fire is hot','Fire and hot things can burn you. Never touch matches, lighters, or candles. Tell an adult if you see fire.','introduction',2,'["verbal"]','[""]','fire safety picture cards'],
    ['sf-019',s,'safety-fire',3,'3-4','Stop Drop and Roll','If clothes catch fire: STOP, DROP to the ground, ROLL back and forth. Practice this.','practice',3,'["hands-on"]','["sf-018"]','practice area'],
    ['sf-020',s,'safety-fire',4,'4-5','Fire escape plan','Know two ways out of every room. Have a meeting point outside. When alarm rings, go outside quickly.','practice',2,'["verbal","hands-on"]','["sf-019"]','escape plan worksheet'],
    ['sf-021',s,'safety-fire',4,'4-5','What to do if there is a fire','Get out quickly. Do not hide. Do not go back for toys. Call for help.','practice',2,'["verbal"]','["sf-020"]','fire drill practice'],
    ['sf-022',s,'safety-water',2,'2-3','Water can be dangerous','Never go near water without an adult. Ponds, rivers, and even buckets can be dangerous.','introduction',2,'["verbal"]','[""]','water safety pictures'],
    ['sf-023',s,'safety-water',3,'3-4','Pool and beach safety','Never swim alone. Stay where you can see an adult. Do not run near pools. Wear a life jacket on boats.','practice',2,'["verbal"]','["sf-022"]','pool rules poster'],
    ['sf-024',s,'safety-water',4,'4-5','Water rescue - do not jump in','If someone is in trouble: do not jump in! Shout for help. Throw a rope. Call for an adult.','practice',2,'["verbal","hands-on"]','["sf-023"]','rescue demonstration'],
    ['sf-025',s,'safety-emergency',3,'3-4','Emergency numbers','Fire: 998. Police: 999. Ambulance: 997. Know your home address and parents phone number.','practice',2,'["verbal"]','[""]','emergency card'],
    ['sf-026',s,'safety-emergency',4,'4-5','When to call for help','Call emergency services if: fire, someone is hurt, someone is in danger. Say your name, address, what happened.','practice',2,'["verbal"]','["sf-025"]','phone practice'],
    ['sf-027',s,'safety-emergency',5,'5-6','Basic first response','If someone is hurt: stay calm, get an adult, do not move them if badly hurt. First, get help.','practice',2,'["verbal"]','["sf-026"]','first aid scenarios'],
    ['sf-028',s,'safety-home',1,'1-2','Hot and cold be careful','Hot food and water can burn. Cold ice can hurt. Learn to say hot and cold and be careful.','introduction',3,'["verbal"]','[""]','temperature sorting game'],
    ['sf-029',s,'safety-home',2,'2-3','Kitchen rules','Never touch the stove, oven, or kettle. Ask an adult for help. The kitchen is for grown-ups unless helping safely.','practice',2,'["verbal"]','["sf-028"]','kitchen safety poster'],
    ['sf-030',s,'safety-home',2,'2-3','Medicine is not candy','Never take medicine without an adult. Medicine is for sick people. Only take what parent gives you.','practice',2,'["verbal"]','[""]','medicine safety cards'],
    ['sf-031',s,'safety-home',3,'3-4','Electrical safety','Never put fingers in plugs. Do not play with switches. Water and electricity do not mix.','practice',2,'["verbal"]','[""]','electrical safety poster'],
    ['sf-032',s,'safety-home',3,'3-4','What to do if lost','Stay where you are. Do not go with anyone. Ask a parent with children or shop assistant for help.','practice',2,'["verbal"]','["sf-006"]','lost scenario practice'],
    ['sf-033',s,'safety-home',4,'4-5','Earthquake safety','If ground shakes: DROP to ground, take COVER under table, HOLD ON until it stops. Then go outside carefully.','practice',2,'["hands-on"]','[""]','earthquake drill'],
    ['sf-034',s,'safety-home',5,'5-6','Know your address','Memorize: your full name, address, parents phone number. Write it down and keep it in your pocket.','practice',2,'["verbal"]','["sf-032"]','emergency info card'],
    ['sf-035',s,'safety-home',5,'5-6','Home alone rules','If home alone: do not open door to strangers, do not tell anyone you are alone, call a trusted adult.','practice',2,'["verbal"]','["sf-006"]','home alone scenario cards'],
  ];

  // Insert in batches of 5
  for (let i = 0; i < topics.length; i += 5) {
    const batch = topics.slice(i, i + 5);
    const values = batch.map(t =>
      `('${t[0]}','${t[1]}','${t[2]}',${t[3]},'${t[4]}','${t[5]}','${t[6]}','${t[7]}',${t[8]},'${t[9]}','${t[10]}','${t[11]}')`
    ).join(',');
    await prisma.$executeRawUnsafe(
      `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
    );
    console.log(`  Batch ${Math.floor(i/5)+1}: safety topics ${i+1}-${Math.min(i+5,topics.length)}`);
  }
  console.log(`  Seeded ${topics.length} safety topics (sf-001 to sf-035)`);
}
