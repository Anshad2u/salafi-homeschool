import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedHomeScience() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='home-science'"
  );
  if (Number(existing[0]?.cnt ?? 0) > 0) {
    console.log('  Home Science topics already exist — skipping.');
    return;
  }
  console.log('Seeding home science (health/nutrition/cooking) curriculum...');

  await prisma.$executeRawUnsafe(`INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES
('hs-001','home-science','hs-nutrition',0,'0-1','Healthy eating — breast milk and first foods','Breast milk is the best first food. Introduction to balanced eating: fruits, vegetables, grains, protein, dairy.','introduction',3,'["visual","verbal"]','[""]','food charts, healthy foods'),
('hs-002','home-science','hs-nutrition',0,'0-1','Washing hands before eating','Learn that clean hands prevent sickness. Wash with soap and water before every meal. Sunnah: wash hands before and after eating.','introduction',5,'["hands-on"]','[""]','soap, water, handwashing poster'),
('hs-003','home-science','hs-nutrition',1,'1-2','Fruits and vegetables — colors of health','Learn about different fruits and vegetables by color. Red (tomatoes), green (spinach), orange (carrots), yellow (bananas).','introduction',3,'["visual","hands-on"]','["hs-001"]','fruit/veg pictures, real foods'),
('hs-004','home-science','hs-nutrition',1,'1-2','Water — the best drink','Water is the healthiest drink. Learn to drink water throughout the day. Avoid too much sugar and fizzy drinks.','introduction',3,'["verbal"]','["hs-001"]','water bottle, drink tracker'),
('hs-005','home-science','hs-nutrition',2,'2-3','The food groups — MyPlate','Learn the 5 food groups: grains, protein, vegetables, fruits, dairy. Make a balanced plate for each meal.','introduction',3,'["visual","hands-on"]','["hs-001"]','MyPlate poster, play food'),
('hs-006','home-science','hs-nutrition',2,'2-3','Halal food — what Muslims eat','Learn about halal and haram food. "Eat of what is lawful and good." (Quran 2:168). Meat must be slaughtered in Allah''s name.','introduction',3,'["verbal"]','["hs-005"]','food cards, halal guide'),
('hs-007','home-science','hs-nutrition',2,'2-3','Sunnah foods — honey, dates, olives','Learn about foods mentioned in the Quran and Hadith: honey (surah An-Nahl), dates, olives, figs, pomegranates, Zamzam water.','introduction',3,'["visual","verbal"]','["hs-006"]','food samples, picture cards'),
('hs-008','home-science','hs-nutrition',3,'3-4','Reading food labels — basics','Look at food packages: what''s in this? Sugar, salt, fat content. Learn to choose healthier options.','practice',2,'["visual","hands-on"]','["hs-005"]','food packages, label guide'),
('hs-009','home-science','hs-nutrition',3,'3-4','Portion sizes — how much to eat','Learn appropriate serving sizes. Use hands as a guide: palm = protein, fist = vegetables, cupped hand = grains.','practice',2,'["visual","hands-on"]','["hs-005"]','portion guide, plate'),
('hs-010','home-science','hs-nutrition',3,'3-4','Meal planning — balanced day','Plan a full day of meals: breakfast, lunch, dinner, snacks. Include all food groups. Follow Sunnah eating habits.','practice',2,'["hands-on"]','["hs-005"]','meal planning worksheet'),
('hs-011','home-science','hs-cooking',3,'3-4','Kitchen safety — rules for kids','Hot stoves are for adults. Sharp knives are for adults. Always ask permission. Wash hands before cooking. Sunnah: say Bismillah.','introduction',2,'["verbal"]','[""]','kitchen safety poster'),
('hs-012','home-science','hs-cooking',3,'3-4','Simple cooking — washing and preparing vegetables','Wash vegetables under running water. Tear lettuce, peel carrots (with supervision), mix salad. First cooking skills.','practice',2,'["hands-on"]','["hs-011"]','vegetables, bowl, knife (safe)'),
('hs-013','home-science','hs-cooking',4,'4-5','Making simple meals — sandwiches and wraps','Make a healthy sandwich: choose bread, add protein (hummus, cheese, chicken), add vegetables. Make a wrap with different fillings.','practice',3,'["hands-on"]','["hs-012"]','bread, fillings, cutting board'),
('hs-014','home-science','hs-cooking',4,'4-5','Making drinks — smoothies and juices','Make a fruit smoothie: banana + milk + honey. Make fresh orange juice. Learn to use a blender safely (with adult).','practice',3,'["hands-on"]','["hs-013"]','blender, fruits, cups'),
('hs-015','home-science','hs-cooking',4,'4-5','Measuring ingredients — cups and spoons','Learn to measure: 1 cup, 1/2 cup, 1/4 cup, tablespoon, teaspoon. Follow a simple recipe with measurements.','practice',2,'["hands-on"]','["hs-013"]','measuring cups, recipe'),
('hs-016','home-science','hs-cooking',5,'5-6','Cooking with heat — simple stove recipes','Make scrambled eggs, boil pasta, heat soup. Learn to use the stove safely with adult supervision. Turn knobs carefully.','practice',3,'["hands-on"]','["hs-013"]','stove, pan, ingredients'),
('hs-017','home-science','hs-cooking',5,'5-6','Following a recipe — step by step','Read a recipe from start to finish. Gather ingredients. Follow each step in order. Clean up as you go.','practice',3,'["hands-on"]','["hs-016"]','recipe book, ingredients'),
('hs-018','home-science','hs-cooking',5,'5-6','Cooking for others — hospitality in Islam','"Whoever believes in Allah and the Last Day, let him be generous to his guest." (Bukhari/Muslim). Cook a meal for family or neighbors.','practice',3,'["hands-on"]','["hs-017"]','recipe, ingredients, serving dishes'),
('hs-019','home-science','hs-firstaid',4,'4-5','First aid basics — minor cuts and scrapes','Clean a small cut with water. Apply a plaster/bandage. "If you save a life, it is as if you saved all of mankind." (Quran 5:32)','practice',2,'["hands-on"]','[""]','first aid kit, practice'),
('hs-020','home-science','hs-firstaid',4,'4-5','When to call for help — emergency numbers','Learn emergency numbers. When to call: fire, ambulance, police. Always tell an adult first.','practice',2,'["verbal"]','["hs-019"]','emergency card, phone'),
('hs-021','home-science','hs-firstaid',5,'5-6','Burns and scalds — what to do','Cool a burn under cold running water for 10 minutes. Don''t put butter or toothpaste on burns. Seek medical help for serious burns.','practice',2,'["verbal","hands-on"]','["hs-019"]','burn first aid poster'),
('hs-022','home-science','hs-firstaid',5,'5-6','Choking basics — what to do','If someone is choking: encourage coughing, back blows (for children), call for help. Prevention: eat slowly, chew food well.','practice',2,'["verbal","hands-on"]','["hs-019"]','first aid guide'),
('hs-023','home-science','hs-firstaid',6,'6-7','CPR basics — awareness level','Learn what CPR is (cardiopulmonary resuscitation). Know when it''s needed. Awareness only — actual CPR requires training.','practice',2,'["verbal"]','["hs-019"]','CPR awareness poster'),
('hs-024','home-science','hs-firstaid',6,'6-7','Allergies and asthma — awareness','Learn about common allergies (nuts, dairy, pollen). Know the signs of an allergic reaction. Asthma: what it is, how to help.','practice',2,'["verbal"]','["hs-022"]','allergy awareness cards'),
('hs-025','home-science','hs-household',3,'3-4','Cleaning up — tidying your room','Make your bed every morning. Put toys back in their place. "Cleanliness is part of faith." (Muslim)','practice',3,'["hands-on"]','[""]','cleaning checklist, timer'),
('hs-026','home-science','hs-household',4,'4-5','Laundry basics — sorting and washing','Sort clothes by color (whites, colors, darks). Learn to use a washing machine (with supervision). Fold and put away clothes.','practice',3,'["hands-on"]','["hs-025"]','laundry baskets, washing machine'),
('hs-027','home-science','hs-household',4,'4-5','Setting the table — meal preparation','Set the table for meals: plate, cup, fork, knife, spoon. Clear the table after eating. Wash or load dishes.','practice',2,'["hands-on"]','["hs-025"]','dishes, cutlery, table'),
('hs-028','home-science','hs-household',5,'5-6','Basic sewing — buttons and hems','Thread a needle, sew a button, fix a small tear. Practical skill for maintaining clothes.','practice',2,'["hands-on"]','[""]','needle, thread, buttons, fabric'),
('hs-029','home-science','hs-household',5,'5-6','Gardening — growing food','Plant seeds (herbs, vegetables). Water regularly. Understand sunlight, soil, and water needs. "If the Hour is about to be established and one of you has a palm shoot in his hand and is able to plant it before the Hour, let him do so." (Ahmad)','practice',3,'["hands-on"]','[""]','seeds, soil, pots, watering can'),
('hs-030','home-science','hs-household',6,'6-7','Cooking a full meal — breakfast, lunch, or dinner','Plan, shop for, and cook a complete meal. From recipe selection to serving. Independence in the kitchen.','mastery',4,'["hands-on"]','["hs-017"]','kitchen, ingredients, recipe'),
('hs-031','home-science','hs-household',6,'6-7','Budgeting and shopping — buying groceries','Make a shopping list, compare prices, stick to a budget. "The wise person is one who controls himself and works for the hereafter." (Ahmad)','practice',3,'["verbal","hands-on"]','["hs-008"]','shopping list, price comparison'),
('hs-032','home-science','hs-household',6,'6-7','Home maintenance basics — fixing things','Know how to: change a lightbulb, unclog a drain, use a screwdriver, hang a picture. Basic DIY skills.','practice',2,'["hands-on"]','[""]','toolkit, practice items')`);

  console.log('  Seeded 32 home science topics (hs-001 to hs-032)');
}
