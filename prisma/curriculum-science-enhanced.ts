import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedScienceEnhanced() {
  const existing = await prisma.$queryRawUnsafe<{cnt: number}[]>(
    "SELECT COUNT(*) as cnt FROM \"CurriculumTopic\" WHERE subject='science'"
  );
  const cnt = Number(existing[0]?.cnt ?? 0);
  if (cnt >= 100) {
    console.log('  Science already enhanced (' + cnt + ' topics) — skipping.');
    return;
  }
  console.log('Seeding comprehensive science curriculum (' + cnt + ' existing)...');
  const s = 'science';

  const t: [string,string,string,number,string,string,string,string,number,string,string,string][] = [
    // ────────────── LIFE SCIENCE: HUMAN BODY ──────────────
    // Level 0 (0-1): Basic body awareness
    ['sci-hb01',s,'sc-life-body',0,'0-1','My body — head, tummy, toes','Point to and name body parts during play, bath, and dressing. Touch head, tummy, hands, feet.','introduction',3,'["visual","hands-on"]','[""]','body chart, mirror'],
    ['sci-hb02',s,'sc-life-body',1,'1-2','Five senses — see, hear, touch, smell, taste','Explore each sense with safe objects: soft blanket, sweet fruit, flower, bell, warm milk. Say what you sense.','introduction',3,'["hands-on"]','["sci-hb01"]','sensory bin, feely bags'],
    ['sci-hb03',s,'sc-life-body',2,'2-3','Identifying body parts','Name and point to 15+ body parts accurately: head, shoulders, knees, toes, eyes, ears, mouth, nose.','practice',3,'["verbal","hands-on"]','["sci-hb01"]','body poster, song'],
    ['sci-hb04',s,'sc-life-body',2,'2-3','My body parts and what they do','Eyes see, ears hear, legs walk, hands grab. Every body part has a job. Understand basic functions.','practice',3,'["verbal"]','["sci-hb03"]','body function cards'],
    ['sci-hb05',s,'sc-life-body',2,'2-3','My teeth — brushing and care','Brush teeth twice a day. Visiting the dentist helps keep teeth strong. Tooth decay hurts.','practice',3,'["hands-on"]','["sci-hb03"]','toothbrush, teeth model'],
    ['sci-hb06',s,'sc-life-body',3,'3-4','Germs and handwashing','Germs are tiny living things that can make us sick. Washing hands with soap removes germs. Sing ABCs while washing.','practice',3,'["hands-on"]','["sci-hb03"]','glitter, soap, sink'],
    ['sci-hb07',s,'sc-life-body',3,'3-4','Five senses — deep dive','Each sense has a specific organ: eyes (sight), ears (hearing), nose (smell), tongue (taste), skin (touch). Test each sense.','practice',3,'["verbal","hands-on"]','["sci-hb02"]','senses sorting activity'],
    ['sci-hb08',s,'sc-life-body',4,'4-5','Human skeleton basics','Learn major bones: skull protects brain, ribs protect heart and lungs, spine keeps us upright. Feel your own bones.','practice',3,'["visual"]','["sci-hb03"]','skeleton poster, x-ray images'],
    ['sci-hb09',s,'sc-life-body',4,'4-5','Muscles help us move','Muscles pull on bones to make us move. Strong muscles help us run, jump, and lift. Exercise makes muscles stronger.','practice',2,'["hands-on"]','["sci-hb08"]','muscle diagram, exercise'],
    ['sci-hb10',s,'sc-life-body',5,'5-6','Digestive system','Food goes mouth → oesophagus → stomach → intestines. Learn what each part does. Where does food go after you swallow?','practice',2,'["visual","hands-on"]','["sci-hb08"]','digestive system diagram, model'],
    ['sci-hb11',s,'sc-life-body',5,'5-6','Respiratory system — how we breathe','We breathe in oxygen through our nose/mouth → trachea → lungs. Lungs fill like balloons. Diaphragm helps pull air in.','practice',2,'["verbal","hands-on"]','["sci-hb08"]','lung model balloon activity'],
    ['sci-hb12',s,'sc-life-body',5,'5-6','Heart and circulation','Heart pumps blood through blood vessels. Blood carries oxygen and food to all body parts. Feel your pulse.','practice',2,'["visual","hands-on"]','["sci-hb08"]','stethoscope, circulatory diagram'],
    ['sci-hb13',s,'sc-life-body',6,'6-7','Nutrition and food groups','Food groups: grains, proteins, fruits, vegetables, dairy. Each group helps the body differently. Eat a rainbow of colours.','practice',2,'["verbal","visual"]','["sci-hb10"]','food group plate, food cards'],
    ['sci-hb14',s,'sc-life-body',6,'6-7','Exercise and health','Exercise strengthens heart, muscles, and bones. 60 minutes of active play daily. Why movement is good for you.','practice',2,'["hands-on"]','["sci-hb12"]','physical activities, heart rate check'],
    ['sci-hb15',s,'sc-life-body',6,'6-7','Cells — basic unit of life','All living things are made of cells. Cells are tiny — you need a microscope to see them. Different cells do different jobs.','introduction',2,'["visual"]','["sci-hb16"]','cell diagram, magnifying glass'],

    // ────────────── LIFE SCIENCE: PLANTS ──────────────
    ['sci-pl01',s,'sc-life-plants',2,'2-3','Plants grow from seeds','Plant a seed in soil, water it, watch it grow over weeks. A tiny seed becomes a big plant.','introduction',2,'["hands-on"]','[""]','seeds, soil, pots'],
    ['sci-pl02',s,'sc-life-plants',3,'3-4','Plant parts: roots, stem, leaves, flower','Label parts of a plant. Roots hold plant and drink water. Stem carries water up. Leaves catch sunlight. Flowers make seeds.','practice',2,'["visual","hands-on"]','["sci-pl01"]','plant diagram, real plant'],
    ['sci-pl03',s,'sc-life-plants',3,'3-4','What plants need to grow','Plants need: water, sunlight, soil (nutrients), and air. Experiment: compare plant with vs without sunlight.','practice',3,'["hands-on"]','["sci-pl01"]','2 pots, seeds, water, light/dark'],
    ['sci-pl04',s,'sc-life-plants',4,'4-5','Life cycle of a plant','Seed → sprout → seedling → mature plant → flower → fruit → new seeds. The cycle repeats.','practice',2,'["visual","hands-on"]','["sci-pl02"]','life cycle cards, growth journal'],
    ['sci-pl05',s,'sc-life-plants',4,'4-5','Trees — deciduous vs evergreen','Deciduous trees lose leaves in autumn. Evergreen trees keep leaves all year. Identify trees in your area.','practice',2,'["visual"]','["sci-pl02"]','leaf collection, tree ID cards'],
    ['sci-pl06',s,'sc-life-plants',5,'5-6','How plants make food (photosynthesis)','Plants use sunlight + water + CO2 to make their own food (photosynthesis). They produce oxygen that we breathe.','practice',2,'["visual"]','["sci-pl03"]','photosynthesis diagram'],
    ['sci-pl07',s,'sc-life-plants',5,'5-6','Flowers, fruits, and seeds','Flowers make fruits. Fruits contain seeds. Seeds can grow into new plants. Different ways seeds travel: wind, water, animals.','practice',2,'["visual","hands-on"]','["sci-pl04"]','fruit dissection, seed collection'],
    ['sci-pl08',s,'sc-life-plants',6,'6-7','Plant adaptation','Desert plants store water (cactus). Water plants have air pockets (lily pads). Plants adapt to where they live.','practice',2,'["visual"]','["sci-pl06"]','adaptation cards, examples'],

    // ────────────── LIFE SCIENCE: ANIMALS ──────────────
    ['sci-an01',s,'sc-life-animals',2,'2-3','Pets and farm animals','Name common animals: cat, dog, cow, chicken, sheep. What sound does each make? What do they eat?','introduction',2,'["visual","verbal"]','[""]','animal flashcards'],
    ['sci-an02',s,'sc-life-animals',3,'3-4','Animal groups: mammals, birds, fish, reptiles','Sort animals by characteristics. Mammals have fur and feed milk. Birds have feathers and lay eggs. Fish live in water.','practice',2,'["visual"]','["sci-an01"]','animal sorting cards'],
    ['sci-an03',s,'sc-life-animals',3,'3-4','What animals need to survive','All animals need: food, water, air, shelter. Different animals eat different things. Basic needs of pets.','practice',2,'["verbal","hands-on"]','["sci-an01"]','animal care chart'],
    ['sci-an04',s,'sc-life-animals',4,'4-5','Life cycle of a butterfly','Egg → caterpillar → chrysalis → butterfly. Watch this transformation happen. Raise caterpillars if possible.','practice',3,'["hands-on"]','["sci-an02"]','butterfly kit, life cycle puzzle'],
    ['sci-an05',s,'sc-life-animals',4,'4-5','Life cycle of a frog','Eggs (spawn) → tadpole → froglet → adult frog. Frogs change dramatically as they grow.','practice',2,'["visual","hands-on"]','["sci-an02"]','frog life cycle cards'],
    ['sci-an06',s,'sc-life-animals',4,'4-5','Parent animals and their babies','Baby animals look like their parents but not exactly. Animals care for their young in different ways.','practice',2,'["verbal","visual"]','["sci-an02"]','animal parent/baby matching game'],
    ['sci-an07',s,'sc-life-animals',4,'4-5','Living vs non-living things','Living things: eat, grow, breathe, reproduce, respond. Non-living things do none of these. Sort and classify.','practice',2,'["verbal"]','["sci-an02"]','living/non-living sorting cards'],
    ['sci-an08',s,'sc-life-animals',5,'5-6','Animal habitats','Match animals to habitats: forest, ocean, desert, arctic, farm, rainforest. Why do certain animals live where they do?','practice',3,'["visual"]','["sci-an02"]','habitat diorama, sorting game'],
    ['sci-an09',s,'sc-life-animals',5,'5-6','Herbivores, carnivores, omnivores','Herbivores eat plants. Carnivores eat meat. Omnivores eat both. Sort animals by what they eat. Teeth tell us what animals eat.','practice',3,'["visual","verbal"]','["sci-an02"]','diet sorting cards, skull/teeth images'],
    ['sci-an10',s,'sc-life-animals',5,'5-6','Food chains','Sun → plant → herbivore → carnivore. Every living thing gets energy from food. Simple food chains in local habitat.','practice',2,'["visual","hands-on"]','["sci-an08"]','food chain cards, arrow game'],
    ['sci-an11',s,'sc-life-animals',5,'5-6','Insects and minibeasts','Explore insects and small creatures: ants, worms, beetles, spiders (arachnids). Use a magnifying glass outside.','practice',3,'["hands-on"]','["sci-an08"]','magnifying glass, bug catcher'],
    ['sci-an12',s,'sc-life-animals',6,'6-7','Animal classification (vertebrates)','5 classes of vertebrates: mammals, birds, reptiles, amphibians, fish. Each has distinct features.','practice',2,'["visual"]','["sci-an02"]','classification chart'],
    ['sci-an13',s,'sc-life-animals',6,'6-7','Endangered animals','Some animals are endangered (few left). Why: habitat loss, hunting, pollution. How we can help protect them.','practice',2,'["visual","verbal"]','["sci-an08"]','endangered species cards'],
    ['sci-an14',s,'sc-life-animals',6,'6-7','Animal adaptations','How animals are adapted to their environment: camels store water, polar bears have thick fur, penguins have blubber.','practice',2,'["visual"]','["sci-an08"]','adaptation game, examples'],

    // ────────────── PHYSICAL SCIENCE: MATTER ──────────────
    ['sci-ps01',s,'sc-physical',2,'2-3','Hot and cold water','Feel warm vs cold water. Temperature describes how hot or cold something is. Learn hot/cold/warm/cool.','introduction',2,'["hands-on"]','[""]','bowls, warm/cold water'],
    ['sci-ps02',s,'sc-physical',2,'2-3','Sink or float','Test objects in water. Predict: will it sink or float? Why do some things float and others sink?','practice',2,'["hands-on"]','[""]','water tub, various objects'],
    ['sci-ps03',s,'sc-physical',3,'3-4','Matter: solid, liquid, gas','Solids hold their shape. Liquids flow and take the shape of their container. Gases spread out and fill the space.','practice',2,'["hands-on"]','["sci-ps01"]','ice, water, balloon, cups'],
    ['sci-ps04',s,'sc-physical',3,'3-4','Objects and materials','Objects are made of materials. Table = wood. Cup = plastic. Window = glass. Identify what things are made of.','practice',2,'["hands-on"]','[""]','object/material sorting activity'],
    ['sci-ps05',s,'sc-physical',4,'4-5','Everyday materials and their properties','Wood: hard, strong. Metal: shiny, hard. Glass: transparent, fragile. Fabric: soft, flexible. Plastic: waterproof, light.','practice',2,'["hands-on"]','["sci-ps04"]','material samples, property cards'],
    ['sci-ps06',s,'sc-physical',4,'4-5','States of matter experiments','Freeze water into ice (solid). Melt ice into water (liquid). Boil water into steam (gas). Observe all 3 states.','practice',2,'["hands-on"]','["sci-ps03"]','ice, water, kettle'],
    ['sci-ps07',s,'sc-physical',4,'4-5','Material suitability','Why are raincoats made of plastic? Why are windows made of glass? Why are bricks used for houses? Match material to use.','practice',2,'["verbal","hands-on"]','["sci-ps05"]','suitability sorting cards'],
    ['sci-ps08',s,'sc-physical',5,'5-6','Changing materials','Materials can change: bend, twist, stretch, squash. Clay can be shaped. Paper can be folded. Some changes are reversible.','practice',2,'["hands-on"]','["sci-ps05"]','playdough, paper, fabric, wire'],
    ['sci-ps09',s,'sc-physical',5,'5-6','Recycling materials','Paper, plastic, glass, metal, and organic waste can be recycled. Sort waste into correct bins. Why recycling is important.','practice',2,'["hands-on"]','["sci-ps07"]','recycling bins, waste sorting game'],
    ['sci-ps10',s,'sc-physical',6,'6-7','Advanced states of matter','Melting, freezing, evaporation, condensation. Water cycle connects all 4 processes. Apply to real world.','practice',3,'["hands-on"]','["sci-ps06"]','water cycle diagram, experiment'],
    ['sci-ps11',s,'sc-physical',6,'6-7','Chemical vs physical changes','Physical change: shape changes (clay, paper). New material formed: baking, rusting, burning. Safe examples only.','practice',2,'["hands-on"]','["sci-ps08"]','baking soda/vinegar, ice melting'],

    // ────────────── PHYSICAL SCIENCE: FORCES ──────────────
    ['sci-fo01',s,'sc-physical',2,'2-3','Pushes and pulls','Explore pushing a toy car away and pulling it closer. Push opens a door, pull closes it.','introduction',2,'["hands-on"]','[""]','toy car, wagon, door'],
    ['sci-fo02',s,'sc-physical',2,'2-3','Things that roll vs slide','Test round objects (balls, wheels) vs flat objects (blocks, boxes). Round things roll more easily.','practice',2,'["hands-on"]','["sci-fo01"]','balls, blocks, ramp'],
    ['sci-fo03',s,'sc-physical',3,'3-4','Magnets attract metals','Explore what magnets stick to. Iron and steel are attracted. Plastic, wood, paper are not. Test everything.','practice',2,'["hands-on"]','[""]','magnets, metal/non-metal objects'],
    ['sci-fo04',s,'sc-physical',4,'4-5','Gravity — what goes up must come down','Gravity pulls everything toward Earth. Why we do not float away. Drop objects: they all fall down.','practice',2,'["hands-on"]','["sci-fo01"]','various objects to drop'],
    ['sci-fo05',s,'sc-physical',4,'4-5','Magnets: attract and repel','Two magnets can pull together (attract) or push apart (repel). Poles: north and north repel, north and south attract.','practice',2,'["hands-on"]','["sci-fo03"]','bar magnets, compass'],
    ['sci-fo06',s,'sc-physical',5,'5-6','Friction — rough vs smooth','Rough surfaces create more friction (slows things down). Smooth surfaces have less friction (things slide easier). Test different surfaces.','practice',2,'["hands-on"]','["sci-fo04"]','ramp with different surfaces, toy car'],
    ['sci-fo07',s,'sc-physical',5,'5-6','Simple machines: ramp (inclined plane)','A ramp makes it easier to move things up. Less force needed over a longer distance. Experiment with different ramp angles.','practice',2,'["hands-on"]','["sci-fo02"]','ramp, balls, blocks, books'],
    ['sci-fo08',s,'sc-physical',5,'5-6','Simple machines: wheel and axle','Wheels reduce friction and make moving things easier. Why suitcases have wheels, carts are easier than carrying.','practice',2,'["hands-on"]','["sci-fo07"]','toy cars, wheel comparison'],
    ['sci-fo09',s,'sc-physical',6,'6-7','Simple machines: lever, pulley, wedge','Levers lift heavy things (see-saw). Pulleys raise flags. Wedges split things (axe, knife). Demonstrate each.','practice',2,'["hands-on"]','["sci-fo07"]','lever, pulley, wedge examples'],
    ['sci-fo10',s,'sc-physical',6,'6-7','Buoyancy — why boats float','Objects float if they are less dense than water. Shape matters: a flat piece of clay floats, a ball of clay sinks.','practice',2,'["hands-on"]','["sci-ps02"]','clay, foil, water tub'],

    // ────────────── PHYSICAL SCIENCE: LIGHT & SOUND ──────────────
    ['sci-ls01',s,'sc-physical',3,'3-4','Light and shadow','Light travels in straight lines. Objects block light and create shadows. Make shadow puppets.','practice',2,'["hands-on"]','[""]','flashlight, objects, white wall'],
    ['sci-ls02',s,'sc-physical',4,'4-5','Objects need light to be seen','We see objects when light bounces off them into our eyes. In complete darkness, we cannot see anything.','practice',2,'["hands-on"]','["sci-ls01"]','dark box, flashlight, toys'],
    ['sci-ls03',s,'sc-physical',4,'4-5','Sunlight safety','NEVER look directly at the sun — it can blind you. Wear sunglasses, a hat, and sunscreen on sunny days.','practice',2,'["verbal"]','[""]','sunglasses, sun safety poster'],
    ['sci-ls04',s,'sc-physical',5,'5-6','Sound: vibrations make sound','Pluck a rubber band: it vibrates and makes a sound. Touch your throat while talking — you feel vibration.','practice',2,'["hands-on"]','[""]','rubber bands, drum, tuning fork'],
    ['sci-ls05',s,'sc-physical',5,'5-6','Sound travels through materials','Sound travels through air (clapping), water (ringing bell), and solids (tap on table, hear through floor). Compare.','practice',2,'["hands-on"]','["sci-ls04"]','alarm clock, water, table tapping'],
    ['sci-ls06',s,'sc-physical',6,'6-7','Pitch and volume','Pitch = high or low (short rubber band = high pitch, long = low). Volume = loud or soft (how hard you strike).','practice',2,'["hands-on"]','["sci-ls04"]','glasses with water, guitar strings'],
    ['sci-ls07',s,'sc-physical',6,'6-7','Light: transparent, translucent, opaque','Transparent: see through clearly (glass). Translucent: see through blurry (wax paper). Opaque: cannot see through (wood).','practice',2,'["hands-on"]','["sci-ls01"]','materials to test with flashlight'],
    ['sci-ls08',s,'sc-physical',6,'6-7','Rainbows and colour','Sunlight passing through water droplets creates rainbows. Colours of the rainbow: ROYGBIV. Mix coloured light.','practice',2,'["hands-on"]','["sci-ls01"]','prism, CD, spray bottle'],

    // ────────────── EARTH SCIENCE ──────────────
    ['sci-es01',s,'sc-earth',2,'2-3','Sand, water, and rocks','Explore natural materials at a park or beach. Feel sand, wet and dry. Rocks are hard. Water flows.','introduction',2,'["hands-on"]','[""]','outdoor exploration, sand tray'],
    ['sci-es02',s,'sc-earth',3,'3-4','Rocks come in different sizes and colours','Collect and sort rocks by size (big/small), colour (dark/light), texture (smooth/rough). Where do we find rocks?','practice',2,'["hands-on"]','["sci-es01"]','rock collection, magnifying glass'],
    ['sci-es03',s,'sc-earth',3,'3-4','Soil is where plants grow','Dig in soil, observe layers, find worms and insects. Different types: sandy soil, clay soil, garden soil.','practice',2,'["hands-on"]','["sci-es01"]','garden, trowel, soil samples'],
    ['sci-es04',s,'sc-earth',4,'4-5','Water cycle','Water evaporates from lakes/oceans → forms clouds (condensation) → falls as rain/snow (precipitation) → flows back.','practice',2,'["hands-on"]','["sci-ps06"]','jar, water, ice, plastic wrap'],
    ['sci-es05',s,'sc-earth',4,'4-5','Landforms: mountains, valleys, rivers','Identify landforms on maps and pictures. Mountains are high. Valleys are low between mountains. Rivers flow to oceans.','practice',2,'["visual"]','[""]','map, globe, landform cards'],
    ['sci-es06',s,'sc-earth',4,'4-5','Natural resources','Resources from Earth: water, wood, oil, coal, sunlight, wind. Renewable vs non-renewable. We depend on Earth.','practice',2,'["verbal"]','[""]','resource sorting cards'],
    ['sci-es07',s,'sc-earth',5,'5-6','Volcanoes','How volcanoes form: magma rises from inside Earth, erupts as lava. Build a baking soda/vinegar volcano model.','practice',2,'["hands-on"]','["sci-es05"]','baking soda, vinegar, bottle'],
    ['sci-es08',s,'sc-earth',5,'5-6','Earthquakes','The Earth crust is made of plates. Plates move and sometimes shake — earthquake. Build structures that withstand shakes.','practice',2,'["hands-on"]','["sci-es05"]','crackers, frosting, building blocks'],
    ['sci-es09',s,'sc-earth',5,'5-6','Weathering and erosion','Wind and water wear down rocks over time. Sand on beaches is tiny bits of rock. Water can carve canyons (Grand Canyon).','practice',2,'["hands-on"]','["sci-es02"]','sand, water, rocks, dripping water'],
    ['sci-es10',s,'sc-earth',6,'6-7','Fossils and ancient life','Fossils are remains of plants/animals from millions of years ago. They show us what lived long ago. How fossils form.','practice',2,'["visual","hands-on"]','["sci-es08"]','fossil pictures, dig kit, plaster cast'],
    ['sci-es11',s,'sc-earth',6,'6-7','Rocks and the rock cycle','Igneous (volcanic), sedimentary (layers), metamorphic (changed by heat/pressure). Rocks change over millions of years.','practice',2,'["visual","hands-on"]','["sci-es09"]','rock sample set, rock cycle diagram'],
    ['sci-es12',s,'sc-earth',6,'6-7','Caring for Earth resources','Conservation means not wasting resources. Turn off lights, save water, reduce waste. Every small action helps.','practice',2,'["verbal"]','["sci-es06"]','conservation checklist'],

    // ────────────── WEATHER & CLIMATE ──────────────
    ['sci-we01',s,'sc-weather',0,'0-1','Feel the wind on your face','Go outside and feel the breeze. Wind is moving air. Feel it, hear it, watch leaves blow.','introduction',2,'["hands-on"]','[""]','outside time, wind chime'],
    ['sci-we02',s,'sc-weather',1,'1-2','Sunny, rainy, cloudy, windy','Look out the window and describe the weather. Draw a simple weather symbol: ☀️🌧️☁️🌬️','introduction',2,'["visual"]','["sci-we01"]','weather chart, symbols'],
    ['sci-we03',s,'sc-weather',3,'3-4','Drawing weather symbols','Draw sun, cloud, rain, snow, wind symbols. Use them on a daily weather calendar for the month.','practice',2,'["hands-on"]','["sci-we02"]','weather journal, crayons'],
    ['sci-we04',s,'sc-weather',3,'3-4','Different types of clouds','Cumulus (fluffy), Stratus (flat/grey), Cirrus (wispy high), Cumulonimbus (tall storm clouds). Identify clouds in the sky.','practice',2,'["visual"]','["sci-we02"]','cloud chart, sky observation'],
    ['sci-we05',s,'sc-weather',4,'4-5','Temperature — reading a thermometer','Read temperature: below freezing (ice), cold, cool, warm, hot. Celsius scale. Measure temperature indoors and out.','practice',2,'["hands-on"]','["sci-we02"]','thermometer, hot/cold water'],
    ['sci-we06',s,'sc-weather',4,'4-5','Weather and the seasons','Four seasons: spring (new growth), summer (hot), autumn (leaves fall), winter (cold, snow). What changes in each?','practice',2,'["visual","verbal"]','["sci-we02"]','season cards, seasonal clothing'],
    ['sci-we07',s,'sc-weather',5,'5-6','Day length changes through the year','Summer days are longer (more sunlight). Winter days are shorter. Sunrise and sunset times change. Track day length.','practice',2,'["hands-on"]','["sci-we06"]','sunrise/sunset chart, calendar'],
    ['sci-we08',s,'sc-weather',5,'5-6','Weather safety','Thunderstorms: stay inside, away from windows. Lightning: don\'t stand under trees. Extreme heat: drink water.','practice',2,'["verbal"]','["sci-we02"]','weather safety poster'],
    ['sci-we09',s,'sc-weather',6,'6-7','Keeping a weather journal','Record temperature, sky conditions, wind, and precipitation daily for 4 weeks. Look for patterns.','practice',3,'["hands-on"]','["sci-we05"]','thermometer, weather journal'],
    ['sci-we10',s,'sc-weather',6,'6-7','Climate vs weather','Weather is what happens today. Climate is the average weather pattern over many years. Different places have different climates.','practice',2,'["verbal","visual"]','["sci-we09"]','climate map, weather cards'],

    // ────────────── SPACE ──────────────
    ['sci-sp01',s,'sc-space',2,'2-3','The sun gives us light and warmth','Feel the sun on your skin. The sun is a star — very hot, very far away. Never look directly at it.','introduction',2,'["hands-on"]','[""]','outdoor observation, sunglasses'],
    ['sci-sp02',s,'sc-space',3,'3-4','The moon changes shape','Observe moon phases for a month. New moon → crescent → half → full → back to new. Draw what you see.','practice',2,'["visual","hands-on"]','["sci-sp01"]','moon phase chart, flashlight, ball'],
    ['sci-sp03',s,'sc-space',3,'3-4','Stars twinkle at night','Stars are suns very far away. They twinkle because of Earth\'s atmosphere. Some make patterns (constellations).','practice',2,'["visual"]','["sci-sp01"]','star chart, constellation cards'],
    ['sci-sp04',s,'sc-space',4,'4-5','The sun, moon, and Earth','Earth goes around the sun (1 year). Moon goes around Earth (1 month). Our solar system family.','practice',2,'["visual","hands-on"]','["sci-sp02"]','ball (Earth), lamp (sun), small ball (moon)'],
    ['sci-sp05',s,'sc-space',4,'4-5','Day and night','Earth spins like a top. When your side faces the sun = day. When your side faces away = night. One spin = 1 day.','practice',2,'["hands-on"]','["sci-sp04"]','ball, flashlight, globe'],
    ['sci-sp06',s,'sc-space',5,'5-6','The 8 planets','Planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Learn order and one fact about each.','practice',2,'["visual"]','["sci-sp04"]','planet cards, solar system song'],
    ['sci-sp07',s,'sc-space',5,'5-6','Astronauts and space travel','How astronauts live in space — sleeping floating, eating from pouches. Rockets carry astronauts. International Space Station.','practice',2,'["visual"]','["",""]','space videos, rocket model'],
    ['sci-sp08',s,'sc-space',5,'5-6','Constellations','Stars form patterns: Big Dipper, Orion, Little Dipper. Ancient people used stars for navigation. Find a constellation.','practice',2,'["visual","hands-on"]','["sci-sp03"]','star map, constellation torch'],
    ['sci-sp09',s,'sc-space',6,'6-7','Seasons — why they happen','Earth is tilted. When your part tilts toward sun = summer (more direct sun). Away = winter (less direct sun).','practice',2,'["hands-on"]','["sci-sp05"]','globe, flashlight, tilt demonstration'],
    ['sci-sp10',s,'sc-space',6,'6-7','Build a solar system model','Create a scale model using balls. Place planets in order at relative distances. A walkable solar system outside.','practice',3,'["hands-on"]','["sci-sp06"]','various balls, paint, long string'],

    // ────────────── ENGINEERING & DESIGN (NEW) ──────────────
    ['sci-en01',s,'sc-engineering',2,'2-3','What is engineering?','Engineers solve problems. They build bridges, roads, toys, computers. Engineers ask: "How can I make this better?"','introduction',2,'["verbal"]','[""]','examples of structures'],
    ['sci-en02',s,'sc-engineering',3,'3-4','Building tall towers','Build the tallest tower you can using blocks or cups. Why does it fall? How can you make it stronger? Test and improve.','practice',2,'["hands-on"]','["sci-en01"]','blocks, cups, cardboard'],
    ['sci-en03',s,'sc-engineering',3,'3-4','Problem solving — ask and test','When something doesn\'t work: (1) Ask why (2) Try a fix (3) Test it (4) Try again. Engineers repeat this cycle.','practice',2,'["hands-on"]','["sci-en01"]','simple puzzles, challenges'],
    ['sci-en04',s,'sc-engineering',4,'4-5','Design a bridge','Design a bridge from paper/cardboard that can hold a toy. Test its strength. Improve the design. Compare with others.','practice',3,'["hands-on"]','["sci-en02"]','paper, cardboard, tape, coins, toy'],
    ['sci-en05',s,'sc-engineering',4,'4-5','Tools help us work','Tools make tasks easier: hammer, screwdriver, scissors, wheelbarrow. Match tools to their jobs. Safety first.','practice',2,'["hands-on"]','["",""]','child-safe tools, tool matching game'],
    ['sci-en06',s,'sc-engineering',5,'5-6','Build a wind-powered car','Design and build a simple car that moves using wind (blow or fan). Test different sails. Which goes further?','practice',3,'["hands-on"]','["sci-en04"]','cardboard, straws, wheels, paper sails'],
    ['sci-en07',s,'sc-engineering',5,'5-6','Waterproofing a house','Design a roof that keeps water out. Test paper vs plastic vs fabric. Which material is best? Why?','practice',2,'["hands-on"]','["sci-ps07"]','lego house, materials, spray bottle'],
    ['sci-en08',s,'sc-engineering',6,'6-7','Build a simple circuit','Battery + wire + bulb = light! Complete and incomplete circuits. What happens when you add a switch?','practice',3,'["hands-on"]','["",""]','battery, wire, bulb, switch'],
    ['sci-en09',s,'sc-engineering',6,'6-7','Design a parachute','Design and build a parachute that falls slowly. Test with different materials and string lengths. Which design works best?','practice',2,'["hands-on"]','["sci-fo04"]','plastic bag, tissue, string, toy figure'],
    ['sci-en10',s,'sc-engineering',6,'6-7','Rube Goldberg simple machine','Create a chain reaction using ramps, dominoes, balls, and pulleys. A simple task done in a complicated way. Fun engineering!','practice',3,'["hands-on"]','["sci-fo09"]','dominoes, ramps, balls, recycled items'],

    // ────────────── SCIENTIFIC PRACTICES (NEW) ──────────────
    ['sci-pr01',s,'sc-practices',2,'2-3','Observation — using your eyes','Look closely at an object. Describe: size, colour, shape, texture. Draw what you see. Scientists observe everything.','introduction',2,'["hands-on"]','[""]','interesting objects, magnifying glass'],
    ['sci-pr02',s,'sc-practices',2,'2-3','Asking questions','Scientists ask: "Why?" "How?" "What happens if?" Practice asking questions about things you see every day.','introduction',2,'["verbal"]','["sci-pr01"]','question cards, curious objects'],
    ['sci-pr03',s,'sc-practices',3,'3-4','Making predictions','Before an experiment, guess what will happen. "I think the rock will sink because it\'s heavy." Test your prediction.','practice',2,'["verbal","hands-on"]','["sci-pr02"]','prediction chart, sink/float activity'],
    ['sci-pr04',s,'sc-practices',3,'3-4','Comparing and sorting','Sort objects by size, colour, shape, texture. Compare two objects: how are they same? How different?','practice',2,'["hands-on"]','["sci-pr01"]','sorting objects, sorting hoops'],
    ['sci-pr05',s,'sc-practices',4,'4-5','Recording data — drawing and charts','Record observations by drawing and using simple tally charts. "How many sunny days this week?"','practice',2,'["hands-on"]','["sci-pr01"]','observation journal, pencils'],
    ['sci-pr06',s,'sc-practices',4,'4-5','Fair testing','Change ONE thing at a time. Keep everything else the same. Only then do you know what caused the result.','practice',2,'["hands-on"]','["sci-pr03"]','simple experiment materials'],
    ['sci-pr07',s,'sc-practices',5,'5-6','Simple experiments','Follow steps: (1) Question (2) Predict (3) Test (4) Observe (5) Conclude. "Does a plant grow towards light?"','practice',2,'["hands-on"]','["sci-pr05"]','experiment materials, recording sheet'],
    ['sci-pr08',s,'sc-practices',5,'5-6','Using measuring tools','Measure length (ruler), weight (scales), volume (measuring cup), time (stopwatch). Record measurements.','practice',2,'["hands-on"]','["sci-pr05"]','ruler, scales, cups, stopwatch'],
    ['sci-pr09',s,'sc-practices',6,'6-7','Graphs and data interpretation','Bar charts and pictograms help us see patterns in our data. Create a chart from your weather journal data.','practice',2,'["hands-on"]','["sci-pr07"]','graph paper, coloured pencils'],
    ['sci-pr10',s,'sc-practices',6,'6-7','Communicating findings','Share what you discovered. Present your experiment to family. Make a science poster. Scientists share their work.','practice',2,'["verbal","hands-on"]','["sci-pr07"]','poster materials, presentation tips'],
    ['sci-pr11',s,'sc-practices',6,'6-7','Science in everyday life','Science is all around us: cooking (chemistry), weather (meteorology), plants (biology), cars (physics). Science helps us every day.','practice',2,'["verbal"]','["sci-pr01"]','real-world science examples'],
  ];

  for (let i = 0; i < t.length; i += 5) {
    const batch = t.slice(i, i + 5);
    const values = batch.map(r =>
      `('${r[0]}','${r[1]}','${r[2]}',${r[3]},'${r[4]}','${r[5]}','${r[6]}','${r[7]}',${r[8]},'${r[9]}','${r[10]}','${r[11]}')`
    ).join(',');
    await prisma.$executeRawUnsafe(
      `INSERT INTO "CurriculumTopic" (id,subject,strand,level,"ageGroup",title,description,category,"estimatedSessions",tags,prerequisites,materials) VALUES ${values}`
    );
    console.log(`  Batch ${Math.floor(i/5)+1}: science topics ${i+1}-${Math.min(i+5,t.length)}`);
  }
  console.log(`  Seeded ${t.length} comprehensive science topics`);
}
