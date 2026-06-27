import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedEnglishESL() {
  // Check if ESL-specific speaking strand already exists
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='english' AND strand='eng-speaking'"
  );
  const speakingCnt = Number(existing[0]?.cnt ?? 0);
  if (speakingCnt > 0) {
    console.log('  ESL English already enhanced (' + speakingCnt + ' speaking topics) — skipping.');
    return;
  }
  console.log('  Seeding comprehensive ESL English topics...');

  const eng = 'english';
  const t: [string,string,string,number,string,string,string,string,number,string,string,string][] = [

    // ═══════════════════════════════════════════════
    // SPEAKING & ORAL LANGUAGE (eng-speaking)
    // CRITICAL for ESL — most important new strand
    // ═══════════════════════════════════════════════

    // Level 0-1 (Baby/Toddler) — pre-verbal & first words
    ['eel-sp01',eng,'eng-speaking',0,'0-1','Responding to voices and sounds','Turn toward sounds. Smile when spoken to. Babble and coo back. Respond with sounds to show you are listening.','introduction',4,'["hands-on"]','[""]','rattle, bell, your voice'],
    ['eel-sp02',eng,'eng-speaking',1,'1-2','First words — mama, dada, bye, hi','Practice saying first meaningful words: mama, dada, hi, bye, no, yes. Repeat words after others.','introduction',4,'["verbal"]','["eel-sp01"]','mirror, family photos'],
    ['eel-sp03',eng,'eng-speaking',1,'1-2','Simple greetings — hi, hello, bye','Wave and say hi/hello when greeting. Say bye when leaving. Respond to greetings from others.','practice',4,'["verbal"]','["eel-sp02"]','greeting cards, hand puppet'],

    // Level 2-3 (Preschool)
    ['eel-sp04',eng,'eng-speaking',2,'2-3','Introducing myself','Say: My name is [name]. Ask: What is your name? Practice with friends and family.','practice',3,'["verbal"]','["eel-sp03"]','name tags, mirror'],
    ['eel-sp05',eng,'eng-speaking',2,'2-3','Expressing needs','Say: I want water. I need help. More please. Thank you. Practice asking politely.','practice',3,'["verbal"]','["eel-sp04"]','snack time, drink cup'],
    ['eel-sp06',eng,'eng-speaking',2,'2-3','Answering yes/no questions','Do you want milk? Are you happy? Is this a cat? Practice answering Yes, I do / No, I do not.','practice',3,'["verbal"]','["eel-sp05"]','picture cards, toys'],
    ['eel-sp07',eng,'eng-speaking',2,'2-3','Following one-step instructions','Stand up. Sit down. Come here. Give me the ball. Touch your nose. Follow simple directions.','practice',4,'["hands-on"]','["eel-sp04"]','chair, toys, flashcards'],
    ['eel-sp08',eng,'eng-speaking',3,'3-4','Describing objects','Say: It is big. It is red. It is soft. Describe toys using size, color, texture. Make descriptive sentences.','practice',3,'["verbal","hands-on"]','["eel-sp04"]','variety of objects, toys'],
    ['eel-sp09',eng,'eng-speaking',3,'3-4','Asking simple questions','What is this? Where is the cat? Who is she? Practice asking questions with rising intonation.','practice',3,'["verbal"]','["eel-sp06"]','question cards, mystery bag'],

    // Level 4-5 (Kindergarten)
    ['eel-sp10',eng,'eng-speaking',4,'4-5','Expressing feelings','Say: I am happy. I feel sad. I am hungry. I am tired. Use feeling words in complete sentences.','practice',3,'["verbal"]','["eel-sp06"]','feeling cards, emotion chart'],
    ['eel-sp11',eng,'eng-speaking',4,'4-5','Describing pictures','I see a red ball. The boy is running. There are three cats. Describe what is happening in a picture.','practice',3,'["verbal","visual"]','["eel-sp08"]','picture books, scene cards'],
    ['eel-sp12',eng,'eng-speaking',4,'4-5','Asking for help politely','Say: Can you help me please? I do not understand. Could you repeat that? Practice polite requests.','practice',3,'["verbal"]','["eel-sp09"]','role play scenarios'],
    ['eel-sp13',eng,'eng-speaking',4,'4-5','Taking turns in conversation','Ask a question. Listen to the answer. Respond. Do not interrupt. Take turns speaking in a group.','practice',3,'["verbal"]','["eel-sp11"]','group discussion, turn-taking cards'],
    ['eel-sp14',eng,'eng-speaking',4,'4-5','Retelling simple stories','First... Then... Finally. Retell a simple story using picture prompts. Include beginning, middle, end.','practice',3,'["verbal","visual"]','["eel-sp11"]','story sequencing cards'],

    // Level 6-7 (Grade 1-2)
    ['eel-sp15',eng,'eng-speaking',5,'5-6','Show and tell presentation','Bring a favorite toy or photo. Describe it in 3-4 sentences. Answer questions from listeners.','practice',3,'["verbal"]','["eel-sp14"]','show and tell objects'],
    ['eel-sp16',eng,'eng-speaking',5,'5-6','Expressing opinions','Say: I like cats because they are fluffy. I think pizza is yummy. My favorite color is blue.','practice',3,'["verbal"]','["eel-sp10"]','opinion cards, picture prompts'],
    ['eel-sp17',eng,'eng-speaking',5,'5-6','Describing a process','Say: First, wash your hands. Next, get a plate. Then, put food on it. Finally, eat. Use sequence words.','practice',3,'["verbal","hands-on"]','["eel-sp14"]','sequencing cards, daily routine'],
    ['eel-sp18',eng,'eng-speaking',6,'6-7','Role playing common scenarios','Practice: ordering food at a restaurant. Visiting the doctor. Shopping at a store. Use full sentences.','practice',3,'["verbal"]','["eel-sp15"]','role play props, scenario cards'],
    ['eel-sp19',eng,'eng-speaking',6,'6-7','Giving simple directions','Say: Turn left. Go straight. It is next to the school. Practice giving and following basic directions.','practice',3,'["verbal"]','["eel-sp17"]','map, classroom layout'],
    ['eel-sp20',eng,'eng-speaking',6,'6-7','Pronunciation practice — tricky ESL sounds','Practice: /th/ (this, that, think), /r/ vs /l/ (rice/lice), /v/ vs /w/ (very/well). Correct mouth position.','practice',4,'["verbal"]','["eel-sp15"]','mirror, pronunciation cards'],

    // ═══════════════════════════════════════════════
    // THEMATIC VOCABULARY (eng-vocab)
    // Systematic vocabulary building for ESL
    // ═══════════════════════════════════════════════

    // Level 1-2 (Toddler)
    ['eel-vc01',eng,'eng-vocab',1,'1-2','Colors — red, blue, yellow, green','Learn color names. Point to red objects. Sort colored blocks. I see a red apple.','introduction',4,'["visual","hands-on"]','[""]','colored blocks, color cards'],
    ['eel-vc02',eng,'eng-vocab',1,'1-2','Numbers 1 to 5','Count to 5. Hold up fingers. Count toys: one, two, three, four, five.','introduction',4,'["verbal","hands-on"]','[""]','counting toys, number cards'],
    ['eel-vc03',eng,'eng-vocab',2,'2-3','Body parts — head to toes','Point and name: head, eyes, ears, nose, mouth, hands, fingers, legs, feet, toes. Sing Head Shoulders.','introduction',4,'["verbal","hands-on"]','[""]','body poster, song, mirror'],
    ['eel-vc04',eng,'eng-vocab',2,'2-3','Family members','Say: mama, papa, baby, brother, sister. Identify family in photos. This is my mother.','introduction',3,'["visual","verbal"]','[""]','family photos, family cards'],
    ['eel-vc05',eng,'eng-vocab',2,'2-3','Pets and farm animals','Name: cat, dog, bird, fish, cow, duck, pig, horse, sheep, chicken. What sound does each make?','introduction',3,'["visual","verbal"]','[""]','animal flashcards, animal sounds'],
    ['eel-vc06',eng,'eng-vocab',2,'2-3','Common foods','Name: apple, banana, bread, milk, water, egg, rice, cheese, meat, juice. I eat an apple.','introduction',4,'["visual","hands-on"]','[""]','food flashcards, real food'],
    ['eel-vc07',eng,'eng-vocab',2,'2-3','Toys and playthings','Name: ball, doll, car, blocks, teddy bear, puzzle, crayon, book. This is my toy car.','introduction',3,'["visual","hands-on"]','[""]','toy flashcards, real toys'],
    ['eel-vc08',eng,'eng-vocab',2,'2-3','Clothes','Name: shirt, pants, shoes, socks, hat, jacket, dress, coat. I wear a red shirt.','introduction',3,'["visual","hands-on"]','[""]','clothes flashcards, dressing up'],
    ['eel-vc09',eng,'eng-vocab',2,'2-3','Daily routines','Words: wake up, eat breakfast, brush teeth, wash hands, get dressed, go to bed. In the morning, I...','introduction',3,'["visual","verbal"]','[""]','routine picture cards'],

    // Level 3-4 (Nursery/Pre-K)
    ['eel-vc10',eng,'eng-vocab',3,'3-4','Colors expanded','Add: pink, purple, orange, brown, gray, black, white, light/dark. Describe objects with color + noun.','practice',3,'["visual","hands-on"]','["eel-vc01"]','paint, color mixing, color cards'],
    ['eel-vc11',eng,'eng-vocab',3,'3-4','Numbers 1 to 20','Count to 20. Count objects up to 20. Recognize written numbers. How many? There are 12.','practice',3,'["verbal","hands-on"]','["eel-vc02"]','number cards, counting objects'],
    ['eel-vc12',eng,'eng-vocab',3,'3-4','More body parts','Add: knee, shoulder, elbow, chin, cheek, thumb, wrist, ankle, heel. Touch your left knee.','practice',3,'["verbal","hands-on"]','["eel-vc03"]','body diagram, stickers'],
    ['eel-vc13',eng,'eng-vocab',3,'3-4','Extended family','Say: grandmother, grandfather, uncle, aunt, cousin. This is my grandmother. She is kind.','practice',3,'["visual","verbal"]','["eel-vc04"]','family tree poster'],
    ['eel-vc14',eng,'eng-vocab',3,'3-4','Wild animals','Name: lion, elephant, monkey, giraffe, tiger, zebra, bear, snake, frog, rabbit, mouse. Where does a lion live?','practice',3,'["visual","verbal"]','["eel-vc05"]','wild animal cards, safari game'],
    ['eel-vc15',eng,'eng-vocab',3,'3-4','Fruits and vegetables','Name: orange, grapes, carrot, tomato, potato, onion, cucumber, strawberry, banana, apple. I like carrots.','practice',3,'["visual","hands-on"]','["eel-vc06"]','fruit/veg flashcards, real produce'],
    ['eel-vc16',eng,'eng-vocab',3,'3-4','Drinks and mealtime','Words: water, milk, juice, tea, cup, bowl, plate, spoon, fork, napkin. Set the table vocabulary.','practice',3,'["visual","hands-on"]','["eel-vc06"]','kitchen items, play food'],
    ['eel-vc17',eng,'eng-vocab',3,'3-4','Rooms in the house','Name: kitchen, bedroom, bathroom, living room, dining room, hallway. Where is the bed? In the bedroom.','practice',3,'["visual","verbal"]','[""]','house picture cards, dollhouse'],
    ['eel-vc18',eng,'eng-vocab',3,'3-4','School objects','Name: book, pencil, eraser, ruler, bag, desk, chair, board, crayon, glue, scissors. Open your book.','practice',3,'["visual","hands-on"]','[""]','school supplies, classroom tour'],
    ['eel-vc19',eng,'eng-vocab',3,'3-4','Feelings and emotions','Say: happy, sad, angry, scared, surprised, tired, hungry, thirsty, excited. How do you feel?','practice',3,'["visual","verbal"]','[""]','emotion flashcards, mirror faces'],
    ['eel-vc20',eng,'eng-vocab',3,'3-4','Position words','Learn: in, on, under, next to, behind, in front of, between. The cat is on the chair. The ball is under the table.','practice',3,'["hands-on"]','[""]','box, toy, preposition cards'],
    ['eel-vc21',eng,'eng-vocab',3,'3-4','Simple opposites','Learn: big/little, hot/cold, fast/slow, wet/dry, up/down, day/night, open/closed, full/empty.','practice',3,'["visual","hands-on"]','[""]','opposite cards, real examples'],

    // Level 4-5 (Kindergarten)
    ['eel-vc22',eng,'eng-vocab',4,'4-5','Community places','Name: school, park, shop, hospital, library, mosque, playground, bank, post office. Where do you go?','practice',3,'["visual","verbal"]','[""]','community flashcards, map'],
    ['eel-vc23',eng,'eng-vocab',4,'4-5','Occupations','Name: doctor, teacher, farmer, driver, cook, police, firefighter, nurse, pilot, shopkeeper. A teacher works at school.','practice',3,'["visual","verbal"]','[""]','occupation cards, dress-up props'],
    ['eel-vc24',eng,'eng-vocab',4,'4-5','Transportation','Name: car, bus, train, plane, boat, bike, truck, taxi, helicopter, ship. I go to school by bus.','practice',3,'["visual","verbal"]','[""]','transport flashcards, toy vehicles'],
    ['eel-vc25',eng,'eng-vocab',4,'4-5','Action verbs','Say: run, jump, eat, drink, sleep, read, write, draw, sing, dance, swim, climb, throw, catch. The boy is running.','practice',3,'["visual","hands-on"]','[""]','verb cards, action charades'],
    ['eel-vc26',eng,'eng-vocab',4,'4-5','Describing words (adjectives)','Learn: long/short, tall/short, heavy/light, loud/quiet, soft/hard, sweet/sour, clean/dirty. Describe everything.','practice',3,'["visual","hands-on"]','["eel-vc21"]','adjective sorting, mystery bags'],
    ['eel-vc27',eng,'eng-vocab',4,'4-5','Furniture and household items','Name: couch, table, chair, bed, lamp, fridge, stove, TV, clock, shelf, mirror, cupboard. The lamp is on the table.','practice',3,'["visual","hands-on"]','["eel-vc17"]','household flashcards, catalog'],
    ['eel-vc28',eng,'eng-vocab',4,'4-5','Nature and outdoors','Name: tree, flower, grass, river, lake, mountain, sky, sun, moon, star, cloud, rainbow, garden.','practice',2,'["visual","verbal"]','[""]','nature cards, outdoor walk'],
    ['eel-vc29',eng,'eng-vocab',4,'4-5','Days and months','Days of the week (Monday-Sunday). Months of the year (January-December). Today is Monday.','practice',3,'["verbal","visual"]','[""]','calendar, days/months chart'],
    ['eel-vc30',eng,'eng-vocab',4,'4-5','Weather vocabulary','Learn: rainy, sunny, cloudy, windy, snowy, foggy, hot, warm, cool, cold. What is the weather like today?','practice',3,'["visual","verbal"]','[""]','weather chart, thermometer'],
    ['eel-vc31',eng,'eng-vocab',4,'4-5','Clothes for seasons','Summer: shorts, t-shirt, sandals. Winter: coat, sweater, boots, gloves, scarf, hat. I wear a coat in winter.','practice',3,'["visual","hands-on"]','["eel-vc08"]','seasonal clothes sorting'],

    // Level 5-6 (Grade 1)
    ['eel-vc32',eng,'eng-vocab',5,'5-6','Food groups and healthy eating','Groups: fruits, vegetables, grains, meat, dairy. Sort food by group. What is healthy?','practice',3,'["visual","hands-on"]','["eel-vc15"]','food group cards, plate sorting'],
    ['eel-vc33',eng,'eng-vocab',5,'5-6','Sports and hobbies','Name: soccer, swimming, running, cycling, basketball, tennis, drawing, reading, puzzles, cooking. My hobby is reading.','practice',2,'["visual","verbal"]','["eel-vc25"]','sport cards, hobby sorting'],
    ['eel-vc34',eng,'eng-vocab',5,'5-6','Community helpers and services','Learn: hairdresser, dentist, vet, mechanic, postman, cleaner, gardener. Who helps us?','practice',2,'["visual","verbal"]','["eel-vc23"]','helper cards, community game'],
    ['eel-vc35',eng,'eng-vocab',5,'5-6','Time words and sequence','Learn: morning, afternoon, evening, night, today, yesterday, tomorrow, now, later, before, after.','practice',2,'["verbal","visual"]','["eel-vc29"]','time of day cards, daily schedule'],
    ['eel-vc36',eng,'eng-vocab',5,'5-6','Shapes and sizes','Learn: circle, square, triangle, rectangle, star, heart, oval, diamond. Sort by shape and size.','practice',2,'["visual","hands-on"]','[""]','shape blocks, shape hunt'],
    ['eel-vc37',eng,'eng-vocab',5,'5-6','Countries and flags (basic)','Learn: Saudi Arabia, USA, UK, India, Egypt, UAE, Australia, Malaysia. Recognize flags and say where people live.','practice',2,'["visual"]','[""]','globe, flag cards, world map'],
    ['eel-vc38',eng,'eng-vocab',6,'6-7','Synonyms and shades of meaning','Walk/march/stride/stomp. Big/huge/gigantic. Small/tiny/miniature. Happy/glad/joyful. Choose precise words.','practice',3,'["verbal"]','["eel-vc26"]','synonym cards, thesaurus'],
    ['eel-vc39',eng,'eng-vocab',6,'6-7','Homophones','Words that sound same but differ: see/sea, hear/here, write/right, sun/son, flour/flower, tail/tale.','practice',2,'["visual","verbal"]','[""]','homophone cards, matching game'],
    ['eel-vc40',eng,'eng-vocab',6,'6-7','Compound words','Rain + coat = raincoat. Bed + room = bedroom. Cup + cake = cupcake. Tooth + brush = toothbrush. Pop + corn = popcorn.','practice',3,'["hands-on"]','[""]','compound word puzzles'],
    ['eel-vc41',eng,'eng-vocab',6,'6-7','Abstract vocabulary','Character words: kind, brave, honest, fair, generous, patient, friendly, helpful, polite, gentle.','practice',3,'["verbal"]','[""]','character cards, story discussion'],
    ['eel-vc42',eng,'eng-vocab',6,'6-7','Topic vocabulary sets','At the restaurant: menu, order, waiter, food, bill. At the zoo: cage, ticket, animals, guide. At the park: bench, path, play, picnic.','practice',3,'["verbal","visual"]','["eel-vc22"]','topic scene cards, role play'],
    ['eel-vc43',eng,'eng-vocab',6,'6-7','Collective nouns (basic)','A group of... birds (flock), fish (school), cows (herd), flowers (bouquet), stars (constellation), people (crowd).','practice',2,'["visual","verbal"]','[""]','collective noun cards, matching'],
    ['eel-vc44',eng,'eng-vocab',6,'6-7','Prefixes and suffixes (basic)','Prefix: un- (happy/unhappy), re- (do/redo), pre- (school/preschool). Suffix: -ful (help/helpful), -less (care/careless).','practice',2,'["verbal"]','[""]','prefix/suffix cards, word building'],
    ['eel-vc45',eng,'eng-vocab',6,'6-7','Common idioms for ESL learners','Learn: It is raining cats and dogs. Time flies. Break a leg. Let the cat out of the bag. Piece of cake.','practice',2,'["verbal","visual"]','[""]','idiom cards, illustrated idioms'],

    // ═══════════════════════════════════════════════
    // LISTENING COMPREHENSION (eng-listening)
    // Essential for ESL — training the ear
    // ═══════════════════════════════════════════════

    ['eel-lc01',eng,'eng-listening',2,'2-3','Listening to environmental sounds','Close eyes. Identify sounds: bell, water, door, bird, car. What do you hear?','introduction',3,'["hands-on"]','[""]','sound maker, audio'],
    ['eel-lc02',eng,'eng-listening',2,'2-3','Following simple instructions','Listen and do: Touch your nose. Clap your hands. Stand up. Sit down. Pick up the ball.','practice',4,'["hands-on"]','["eel-sp07"]','none needed'],
    ['eel-lc03',eng,'eng-listening',3,'3-4','Listening for key words in songs','Sing action songs: Wheels on the Bus, If You Are Happy. Listen for key words and do the actions.','practice',3,'["verbal","hands-on"]','[""]','action song playlist'],
    ['eel-lc04',eng,'eng-listening',3,'3-4','Following two-step instructions','Listen and do: Pick up the pencil and put it on the table. Stand up and turn around.','practice',3,'["hands-on"]','["eel-lc02"]','classroom objects for tasks'],
    ['eel-lc05',eng,'eng-listening',4,'4-5','Listening to stories for details','Listen to a short story. Answer: Who? What happened? Where? Retell in your own words.','practice',3,'["verbal","visual"]','[""]','picture book, audio story'],
    ['eel-lc06',eng,'eng-listening',4,'4-5','Minimal pairs — vowel discrimination','Listen: ship vs sheep. bat vs bet. full vs fool. pin vs pen. Can you hear the difference? Say both.','practice',3,'["verbal"]','[""]','minimal pair cards, audio'],
    ['eel-lc07',eng,'eng-listening',4,'4-5','Minimal pairs — consonant discrimination','Listen: fan vs van. thin vs tin. rice vs lice. very vs well. feel vs veal. Hear and produce the difference.','practice',3,'["verbal"]','["eel-lc06"]','mirror for mouth position'],
    ['eel-lc08',eng,'eng-listening',5,'5-6','Following multi-step instructions','Listen: Take the red crayon, draw a circle, color it blue, and write your name. Carry out 3-4 step directions.','practice',3,'["hands-on"]','["eel-lc04"]','crayons, paper, objects'],
    ['eel-lc09',eng,'eng-listening',5,'5-6','Listening for main idea and details','Listen to a paragraph. What is the main idea? Find three details. Practice active listening.','practice',3,'["verbal"]','["eel-lc05"]','short audio passages'],
    ['eel-lc10',eng,'eng-listening',6,'6-7','Listen and draw','Listen to a description: Draw a house with a red roof, a green tree next to it, and a yellow sun in the sky.','practice',3,'["hands-on"]','["eel-lc08"]','paper, crayons, descriptive prompts'],
    ['eel-lc11',eng,'eng-listening',6,'6-7','Understanding questions about a text','After listening to a passage, answer: what, where, when, why, how questions. Find evidence.','practice',3,'["verbal"]','["eel-lc09"]','comprehension question cards'],
    ['eel-lc12',eng,'eng-listening',6,'6-7','Following classroom instructions','Listen: Take out your book, turn to page 10, find the picture of the elephant, and read the sentence below.','practice',3,'["hands-on"]','["eel-lc08"]','book, worksheets'],

    // ═══════════════════════════════════════════════
    // PHONICS EXPANSION (eng-lphon)
    // Word families, rhyming, additional phonics
    // ═══════════════════════════════════════════════

    ['eel-ph01',eng,'eng-lphon',2,'2-3','Rhyming words','Words that end the same: cat, hat, bat, rat, mat. Can you think of a word that rhymes with dog?','practice',4,'["verbal"]','[""]','rhyming cards, song'],
    ['eel-ph02',eng,'eng-lphon',2,'2-3','Word family — at words','Learn: cat, hat, bat, rat, mat, pat, sat, fat. Read and write all -at words.','practice',3,'["verbal"]','["eel-ph01"]','word family cards'],
    ['eel-ph03',eng,'eng-lphon',3,'3-4','Word families — an, ap, ag','an: can, man, pan, fan, van. ap: cap, map, nap, tap. ag: bag, rag, tag, wag.','practice',3,'["verbal"]','["eel-ph02"]','word family flip book'],
    ['eel-ph04',eng,'eng-lphon',3,'3-4','Word families — ig, ip, it','ig: pig, wig, big, dig, fig. ip: lip, zip, tip, rip, sip. it: sit, hit, bit, lit, kit.','practice',3,'["verbal"]','["eel-ph03"]','word building tiles'],
    ['eel-ph05',eng,'eng-lphon',3,'3-4','Word families — op, ot, og','op: top, hop, mop, pop, stop. ot: hot, pot, dot, not, spot. og: dog, log, frog, hog.','practice',3,'["verbal"]','["eel-ph04"]','word family sorting'],
    ['eel-ph06',eng,'eng-lphon',3,'3-4','Word family — ug, un, ut','ug: bug, rug, hug, mug, jug, plug. un: sun, run, fun, bun, gun. ut: cut, hut, nut, but.','practice',3,'["verbal"]','["eel-ph05"]','word family cards'],
    ['eel-ph07',eng,'eng-lphon',4,'4-5','Word families — ake, ine, ight','ake: cake, make, lake, bake, take, snake. ine: nine, line, fine, mine, vine. ight: light, night, right, fight.','practice',3,'["verbal"]','["eel-ph06"]','word pattern cards'],
    ['eel-ph08',eng,'eng-lphon',4,'4-5','Word families — ate, ide, one','ate: late, gate, plate, skate. ide: ride, wide, slide, hide. one: bone, cone, phone, stone.','practice',3,'["verbal"]','["eel-ph07"]','word building activity'],
    ['eel-ph09',eng,'eng-lphon',5,'5-6','Phoneme manipulation','Change the first sound: cat -> hat, cat -> bat, cat -> sat. Change the vowel: cat -> cut, cat -> cot.','practice',3,'["verbal"]','[""]','letter tiles, sound boxes'],
    ['eel-ph10',eng,'eng-lphon',5,'5-6','Diphthong word families','oi/oy: coin, join, oil, boil, boy, toy, joy. ou/ow: out, shout, house, cow, down, town.','practice',3,'["verbal"]','[""]','diphthong word cards'],
    ['eel-ph11',eng,'eng-lphon',6,'6-7','Soft c and g','c: cat (/k/) vs city (/s/). g: goat (/g/) vs giraffe (/j/). Rule: c/g before e,i,y is usually soft.','practice',2,'["verbal"]','[""]','soft c/g word sort'],
    ['eel-ph12',eng,'eng-lphon',6,'6-7','Silent letters (basic)','kn- (knee, know, knife), wr- (write, wrong, wrap), mb (thumb, lamb, comb), -le (table, apple, little).','practice',2,'["verbal"]','[""]','silent letter word cards'],

    // ═══════════════════════════════════════════════
    // SPELLING (eng-spelling)
    // Systematic spelling for ESL
    // ═══════════════════════════════════════════════

    ['eel-spg01',eng,'eng-spelling',3,'3-4','Spelling CVC words','Sound out and spell: c-a-t = cat. d-o-g = dog. p-e-n = pen. Write each letter as you say its sound.','practice',4,'["hands-on"]','["er-01"]','letter tiles, spelling paper'],
    ['eel-spg02',eng,'eng-spelling',4,'4-5','Spelling with digraphs','Spell: sh-i-p = ship. ch-i-p = chip. th-i-s = this. wh-e-n = when. Use digraph knowledge for spelling.','practice',3,'["hands-on"]','["eel-spg01"]','digraph cards, spelling board'],
    ['eel-spg03',eng,'eng-spelling',4,'4-5','Spelling magic e words','Spell: c-a-k-e = cake. b-i-k-e = bike. h-o-m-e = home. The magic e is silent but makes the vowel long.','practice',3,'["hands-on"]','["er-04"]','magic e word cards'],
    ['eel-spg04',eng,'eng-spelling',5,'5-6','Spelling blends','Spell: s-t-o-p = stop. b-l-a-c-k = black. g-r-i-n = grin. s-p-l-a-sh = splash. Blend carefully.','practice',3,'["hands-on"]','["eel-spg01"]','blend word list, letter tiles'],
    ['eel-spg05',eng,'eng-spelling',5,'5-6','Adding -ed and -ing','Rules: walk/walked/walking (add). hop/hopped/hopping (double p). make/made/making (drop e).','practice',3,'["hands-on"]','[""]','verb cards, suffix rules chart'],
    ['eel-spg06',eng,'eng-spelling',5,'5-6','Adding -s and -es','cat/cats (add s). box/boxes (add es). baby/babies (y to ies). Practice making plurals.','practice',3,'["hands-on"]','["eg-04"]','plural spelling cards'],
    ['eel-spg07',eng,'eng-spelling',6,'6-7','Spelling common sight words','Spell: because, said, could, would, should, people, friend, every, many, very. Learn tricky parts.','practice',4,'["hands-on"]','[""]','sight word spelling list'],
    ['eel-spg08',eng,'eng-spelling',6,'6-7','Common spelling patterns','AI/AY: rain, play. EE/EA: tree, meat. OA/OW: boat, snow. IE/IGH: pie, light. OE: toe. Identify patterns.','practice',3,'["hands-on"]','[""]','spelling pattern cards'],
    ['eel-spg09',eng,'eng-spelling',6,'6-7','Spelling rules — doubling','Rule: CVC words before adding -ing/-ed: run/running, swim/swimming, stop/stopped. When to double.','practice',2,'["hands-on"]','["eel-spg05"]','spelling rules poster'],
    ['eel-spg10',eng,'eng-spelling',6,'6-7','Dictionary skills for spelling','Use an alphabetized word list to find spellings. Learn guide words. Practice looking up words.','practice',2,'["hands-on"]','["eel-spg07"]','simple dictionary, word list'],
    ['eel-spg11',eng,'eng-spelling',6,'6-7','Homophone spellings','Learn the spelling difference: their/there/they are. your/you are. its/it is. Write correctly in sentences.','practice',2,'["hands-on"]','["eel-vc39"]','homophone sentence practice'],

  ];

  for (let i = 0; i < t.length; i += 5) {
    const batch = t.slice(i, i + 5);
    const values = batch.map(r =>
      `('${r[0]}','${r[1]}','${r[2]}',${r[3]},'${r[4]}','${r[5]}','${r[6]}','${r[7]}',${r[8]},'${r[9]}','${r[10]}','${r[11]}')`
    ).join(',');
    await prisma.$executeRawUnsafe(
      `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
    );
    console.log(`  ESL Batch ${Math.floor(i/5)+1}: topics ${i+1}-${Math.min(i+5,t.length)}`);
  }
  console.log(`  Seeded ${t.length} ESL English topics`);
}
