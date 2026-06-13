#!/usr/bin/env python
"""Part 3: Science + Social Studies + Art/PE + Life Skills."""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from gen_curriculum_part1 import topic, all_topics

# ═══════════════════════════════════════════════════════════
# SCIENCE
# ═══════════════════════════════════════════════════════════
SC="science"

life = [
    (1,"0-1","My body — head, tummy, toes","Point to and name body parts during play and bath","introduction",1,["visual","hands-on"],[],"body chart"),
    (2,"1-2","Five senses — see, hear, touch, smell, taste","Explore each sense with safe objects: soft blanket, sweet fruit","introduction",2,["hands-on"],[],"sensory bin"),
    (3,"2-3","Identifying body parts","Name and point to 10+ body parts accurately","practice",1,["hands-on"],[],"body poster"),
    (4,"2-3","Plants grow from seeds","Plant a seed in soil, water it, watch it grow over weeks","introduction",1,["hands-on"],[],"seeds, soil, pot"),
    (5,"3-4","Plant parts: roots, stem, leaves, flower","Label parts of a plant using a real plant or diagram","practice",2,["visual","hands-on"],[],"plant diagram"),
    (6,"3-4","What plants need: water, sun, soil","Experiment: give one plant water+sun, deny another","practice",3,["hands-on"],[],"2 pots, seeds, water"),
    (7,"3-4","Animal groups: mammals, birds, fish","Sort animals into groups by characteristics","practice",2,["visual"],[],"animal cards"),
    (8,"3-4","Pet care basics","How to feed, water, and gently handle a pet","practice",1,["hands-on"],[],"pet care chart"),
    (9,"4-5","Life cycle of a butterfly","Egg → caterpillar → chrysalis → butterfly","practice",2,["visual","hands-on"],[],"life cycle puzzle"),
    (10,"4-5","Life cycle of a plant","Seed → sprout → plant → flower → fruit → seed","practice",2,["hands-on"],[],"growth journal"),
    (11,"4-5","Human body: skeleton basics","Learn major bones: skull, spine, ribs, arms, legs","introduction",2,["visual"],[],"skeleton poster"),
    (12,"4-5","Human body: 5 senses detailed","Each sense organ: eyes, ears, nose, tongue, skin","practice",2,["verbal","hands-on"],[],"senses sorting"),
    (13,"5-6","Animal habitats","Match animals to habitats: ocean, desert, forest, arctic, farm","practice",2,["visual"],[],"habitat diorama"),
    (14,"5-6","Food chains","Simple chains: grass → rabbit → fox, sun → plant → caterpillar → bird","practice",2,["visual"],[],"food chain cards"),
    (15,"5-6","Human body systems (simple)","Digestive, respiratory, circulatory — what each does","introduction",2,["visual"],[],"body system poster"),
    (16,"6-7","Plant biology: photosynthesis","Plants use sunlight + water + CO2 to make food","practice",2,["verbal","visual"],[],"diagram, experiment"),
    (17,"6-7","Animal classification (Kingdoms)","Vertebrates vs invertebrates, 5 vertebrate classes","practice",3,["verbal"],[],"classification chart"),
    (18,"6-7","Cells — basic unit of life","All living things are made of cells (simple overview)","introduction",2,["visual"],[],"cell diagram"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(life):
    all_topics.append(topic(f"sc-ls-{i+1:03d}",SC,"life-science",lv,age,title,desc,cat,2,tags,prereq,mat))

physical = [
    (2,"2-3","Pushes and pulls","Explore pushing a toy car and pulling a wagon","introduction",1,["hands-on"],[],"toy car, wagon"),
    (3,"2-3","Things that roll vs slide","Test different objects — which roll, which slide, why?","introduction",1,["hands-on"],[],"balls, blocks, boxes"),
    (4,"3-4","Magnets attract metals","Explore what magnets stick to and what they don't","practice",2,["hands-on"],[],"magnets, metal objects"),
    (5,"3-4","Hot and cold water","Feel warm vs cold water safely — temperature concepts","practice",1,["hands-on"],[],"bowls, warm/cold water"),
    (6,"3-4","Sink or float","Test objects in water — predict and observe which sink and float","practice",2,["hands-on"],[],"water tub, various objects"),
    (7,"4-5","Matter: solid, liquid, gas","Explore ice (solid), water (liquid), steam (gas)","practice",2,["hands-on"],[],"ice, water, kettle"),
    (8,"4-5","Light and shadow","Use a flashlight to make shadows — light travels straight","practice",2,["hands-on"],[],"flashlight, objects"),
    (9,"4-5","Sound: vibrations","Feel vibrations from a drum, a guitar string, throat","practice",2,["hands-on"],[],"drum, rubber band"),
    (10,"5-6","Simple machines: ramp","Roll objects down ramps at different angles — understand inclined plane","practice",2,["hands-on"],[],"ramp, balls, blocks"),
    (11,"5-6","Simple machines: wheel and axle","Observe how wheels make things easier to move","practice",2,["hands-on"],[],"toy cars, wheels"),
    (12,"5-6","Magnetism: attract and repel","Two magnets can push apart or pull together — poles","practice",2,["hands-on"],[],"bar magnets"),
    (13,"6-7","States of matter experiments","Freeze, melt, boil — observe transitions between states","practice",3,["hands-on"],[],"ice, water, pot, heat"),
    (14,"6-7","Sound: pitch and volume","High/low sounds, loud/quiet — what changes the pitch?","practice",2,["hands-on"],[],"glasses, water, rubber bands"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(physical):
    all_topics.append(topic(f"sc-ps-{i+1:03d}",SC,"physical-science",lv,age,title,desc,cat,2,tags,prereq,mat))

earth = [
    (2,"2-3","Sand, water, and rocks","Explore natural materials at a park or beach","introduction",1,["hands-on"],[],"outdoor exploration"),
    (3,"3-4","Rocks come in different sizes and colors","Collect and sort rocks by size, color, texture","practice",1,["hands-on"],[],"rock collection"),
    (4,"3-4","Soil is where plants grow","Dig in soil, find worms, plant seeds","practice",1,["hands-on"],[],"garden, trowel"),
    (5,"4-5","Water cycle: evaporation, condensation, precipitation","Simple demonstration: water in jar, sun, rain simulation","practice",2,["hands-on"],[],"jar, water, ice"),
    (6,"4-5","Mountains, valleys, rivers","Identify landforms on maps and in pictures","practice",2,["visual"],[],"map, globe"),
    (7,"5-6","Volcanoes — how they work","Simple model: baking soda + vinegar eruption","practice",2,["hands-on"],[],"baking soda, vinegar, bottle"),
    (8,"5-6","Earthquakes — tectonic plates","Simple demonstration of plate movement","practice",2,["hands-on"],[],"crackers, frosting"),
    (9,"6-7","Fossils and ancient life","What fossils are, how they form, what they tell us","introduction",2,["visual"],[],"fossil pictures, dig kit"),
    (10,"6-7","Natural resources","Renewable vs non-renewable: water, trees, oil, sun","practice",2,["verbal"],[],"sorting cards"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(earth):
    all_topics.append(topic(f"sc-es-{i+1:03d}",SC,"earth-science",lv,age,title,desc,cat,2,tags,prereq,mat))

space = [
    (2,"2-3","The sun gives us light and warmth","Feel the sun, observe shadows change throughout day","introduction",1,["hands-on"],[],"outdoor observation"),
    (3,"3-4","The moon changes shape each night","Observe moon phases over a month — draw what you see","practice",2,["visual","hands-on"],[],"moon journal"),
    (4,"3-4","Stars twinkle in the night sky","Look at stars — they are very far away suns","introduction",1,["visual"],[],"star gazing"),
    (5,"4-5","The sun, moon, and Earth","Learn that Earth goes around the sun, moon goes around Earth","introduction",2,["visual"],[],"ball, lamp, globe"),
    (6,"4-5","Day and night caused by Earth spinning","Use a ball and lamp to demonstrate Earth's rotation","practice",2,["hands-on"],[],"ball, flashlight"),
    (7,"5-6","The 8 planets of our solar system","Learn planet names, order, and key features","practice",3,["visual"],[],"planet cards, song"),
    (8,"5-6","Astronauts and space travel","How astronauts live and work in space","introduction",1,["visual"],[],"space videos, books"),
    (9,"6-7","Seasons caused by Earth's tilt","Why we have summer, winter, spring, autumn","practice",2,["hands-on"],[],"globe, flashlight"),
    (10,"6-7","Build a solar system model","Create a scale model using balls of different sizes","practice",3,["hands-on"],[],"various balls, paint"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(space):
    all_topics.append(topic(f"sc-sp-{i+1:03d}",SC,"space",lv,age,title,desc,cat,2,tags,prereq,mat))

weather = [
    (1,"0-1","Feel the wind on your face","Go outside and feel the breeze — naming 'wind'","introduction",1,["hands-on"],[],"outdoor time"),
    (2,"2-3","Sunny, rainy, cloudy, windy","Look out the window and describe today's weather","introduction",1,["visual"],[],"weather chart"),
    (3,"3-4","Drawing weather symbols","Draw sun, cloud, rain, snow symbols for daily weather","practice",1,["hands-on"],[],"weather journal"),
    (4,"3-4","Different types of clouds","Fluffy cumulus, flat stratus, tall cumulonimbus","introduction",2,["visual"],[],"cloud chart"),
    (5,"4-5","Temperature — hot, warm, cool, cold","Read a simple thermometer","practice",2,["visual","hands-on"],[],"thermometer"),
    (6,"4-5","Weather and clothing","What to wear in different weather — raincoat, sunscreen, coat","practice",1,["verbal"],[],"dress-up clothes"),
    (7,"5-6","The four seasons","Spring, summer, autumn, winter — what changes in each","practice",2,["visual"],[],"season pictures"),
    (8,"5-6","Weather safety","What to do in thunderstorms, extreme heat, heavy rain","practice",1,["verbal"],[],"safety poster"),
    (9,"6-7","Keeping a weather journal","Record temperature, sky conditions, precipitation for 4 weeks","practice",3,["hands-on"],[],"thermometer, journal"),
    (10,"6-7","Climate vs weather","Weather is today; climate is average over time","introduction",2,["verbal"],[],"weather map"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(weather):
    all_topics.append(topic(f"sc-wx-{i+1:03d}",SC,"weather",lv,age,title,desc,cat,2,tags,prereq,mat))

env = [
    (2,"2-3","Trees are important","Trees give us shade, oxygen, fruit — plant a small tree","introduction",1,["hands-on"],[],"seedling"),
    (3,"3-4","Reduce, Reuse, Recycle","Learn the 3 Rs with examples at home","practice",2,["verbal","hands-on"],[],"recycling bins"),
    (4,"3-4","Saving water","Turn off tap while brushing, shorter showers","practice",1,["verbal"],[],"water-saving chart"),
    (5,"4-5","Food chains in nature","Sun → plants → insects → birds → hawks","practice",2,["visual"],[],"food chain puzzle"),
    (6,"4-5","Taking care of the Earth (Islamic duty)","Allah made us khalifah — caretakers of Earth","practice",1,["verbal"],[],"Quran verse cards"),
    (7,"5-6","Pollution and how to prevent it","Air, water, land pollution — what we can do to help","practice",2,["verbal"],[],"clean-up activity"),
    (8,"5-6","Endangered animals","Why some animals are endangered — what we can do","introduction",2,["visual"],[],"endangered animal cards"),
    (9,"6-7","Composting basics","Turn food scraps into soil — start a small compost","practice",3,["hands-on"],[],"compost bin"),
    (10,"6-7","Carbon footprint for kids","Simple actions: walk instead of drive, less waste, eat less meat","practice",2,["verbal"],[],"carbon calculator"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(env):
    all_topics.append(topic(f"sc-env-{i+1:03d}",SC,"environment",lv,age,title,desc,cat,2,tags,prereq,mat))

print(f"Science topics: {len([t for t in all_topics if t['subject']=='science'])}")

# ═══════════════════════════════════════════════════════════
# SOCIAL STUDIES
# ═══════════════════════════════════════════════════════════
SS="social-studies"

self_fam = [
    (0,"0-1","Recognizing faces — mom, dad","Baby looks at and recognizes family faces","introduction",1,["visual"],[],"family photos"),
    (1,"1-2","My name is...","Learn and say own first name","introduction",2,["verbal"],[],"name card"),
    (2,"2-3","My family members","Name family members: mom, dad, siblings, grandparents","introduction",1,["verbal","visual"],[],"family tree"),
    (3,"2-3","How old am I?","Know own age and birthday","introduction",1,["verbal"],[],"birthday calendar"),
    (4,"3-4","My feelings today","Identify and name current feelings: happy, sad, angry, scared","introduction",1,["verbal"],[],"feelings chart"),
    (5,"3-4","My favorite things","Share: favorite color, food, animal, game","introduction",1,["verbal"],[],"show and tell"),
    (6,"3-4","Boy or girl — we are all special","Understand gender — boys and girls can both do amazing things","introduction",1,["verbal"],[],"discussion"),
    (7,"4-5","My address and phone number","Memorize home address and a parent's phone number","practice",3,["verbal"],[],"address card"),
    (8,"4-5","My family tree","Draw a family tree with grandparents, parents, children","practice",2,["hands-on"],[],"family tree worksheet"),
    (9,"5-6","My personality traits","Am I shy or outgoing? Kind? Funny? Brave?","practice",1,["verbal"],[],"personality cards"),
    (10,"5-6","My goals and dreams","What I want to be when I grow up — goals for this year","practice",1,["verbal"],[],"dream board"),
    (11,"6-7","My community and me","How I fit into my neighborhood, school, mosque community","practice",2,["verbal"],[],"community map"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(self_fam):
    all_topics.append(topic(f"ss-sf-{i+1:03d}",SS,"self-family",lv,age,title,desc,cat,2,tags,prereq,mat))

community = [
    (2,"2-3","People who help us","Doctor, teacher, firefighter, police — what they do","introduction",1,["visual"],[],"community helper cards"),
    (3,"3-4","The mosque — our place of worship","Visit the mosque, learn adhan, understand congregational prayer","introduction",1,["visual","hands-on"],[],"mosque visit"),
    (4,"3-4","The market/supermarket","How we get food — shops, sellers, buying things","introduction",1,["hands-on"],[],"market visit"),
    (5,"4-5","Rules in our community","Traffic rules, school rules, mosque rules — why we have rules","practice",1,["verbal"],[],"rules poster"),
    (6,"4-5","Community helpers: mail carrier, baker, farmer","Expand knowledge of community workers","practice",1,["visual"],[],"picture cards"),
    (7,"5-6","Working together — cooperation","How communities work best when people help each other","practice",2,["verbal"],[],"group project"),
    (8,"5-6","Maps of our neighborhood","Draw a simple map of your street and nearby places","practice",2,["hands-on"],[],"paper, markers"),
    (9,"6-7","Types of communities: urban, suburban, rural","Compare city, suburb, and countryside communities","practice",2,["visual"],[],"photo cards"),
    (10,"6-7","Government basics","Who is in charge? Mayor, laws, voting — simple overview","introduction",2,["verbal"],[],"discussion"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(community):
    all_topics.append(topic(f"ss-co-{i+1:03d}",SS,"community",lv,age,title,desc,cat,2,tags,prereq,mat))

culture = [
    (2,"2-3","People look different — and that's beautiful","Celebrate diversity in appearance, clothing, language","introduction",1,["visual"],[],"diverse photos"),
    (3,"3-4","Our Islamic holidays: Eid al-Fitr, Eid al-Adha","Learn about the two Eids and how we celebrate","introduction",2,["verbal","hands-on"],[],"Eid preparations"),
    (4,"3-4","Food from different countries","Taste and learn about foods from different cultures","practice",1,["hands-on"],[],"world food tasting"),
    (5,"4-5","Clothing around the world","Traditional dress: thobe, kimono, sari, dashiki, kilt","introduction",1,["visual"],[],"world clothing book"),
    (6,"4-5","Languages around the world","People speak many languages — learn greetings in 5 languages","practice",2,["verbal"],[],"language cards"),
    (7,"5-6","Holidays and celebrations","Easter, Diwali, Chinese New Year — how people celebrate","introduction",1,["verbal"],[],"holidays book"),
    (8,"5-6","Music and dance from different cultures","Listen to music from around the world (nasheed focus)","practice",1,["verbal"],[],"world music playlist"),
    (9,"6-7","Different family traditions","How families around the world eat, celebrate, worship","practice",2,["verbal"],[],"research project"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(culture):
    all_topics.append(topic(f"ss-cu-{i+1:03d}",SS,"culture",lv,age,title,desc,cat,2,tags,prereq,mat))

geography = [
    (2,"2-3","My home, my street","Name where I live — my house is on my street","introduction",1,["verbal"],[],"neighborhood walk"),
    (3,"3-4","Map basics: symbols and directions","Learn: N, S, E, W — north, south, east, west","introduction",2,["visual"],[],"compass, simple map"),
    (4,"3-4","My city and my country","Know the name of your city and country","introduction",1,["verbal"],[],"map"),
    (5,"4-5","The 7 continents","Name and locate all 7 continents on a globe","practice",2,["visual","hands-on"],[],"globe, continent puzzle"),
    (6,"4-5","The 5 oceans","Name all 5 oceans and their locations","practice",2,["visual"],[],"world map"),
    (7,"5-6","Saudi Arabia — our home","Key cities: Makkah, Madinah, Riyadh, Jeddah — landmarks","practice",2,["visual"],[],"Saudi map"),
    (8,"5-6","Desert, forest, ocean, mountain biomes","Different biomes and what lives in each","practice",2,["visual"],[],"biome cards"),
    (9,"6-7","Famous landmarks: Kaaba, Eiffel Tower, Great Wall","Identify 10 world landmarks and their countries","practice",2,["visual"],[],"landmark cards"),
    (10,"6-7","Reading a map","Use a map key, scale, compass rose to navigate","practice",2,["hands-on"],[],"map, magnifying glass"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(geography):
    all_topics.append(topic(f"ss-geo-{i+1:03d}",SS,"geography",lv,age,title,desc,cat,2,tags,prereq,mat))

print(f"Social Studies topics: {len([t for t in all_topics if t['subject']=='social-studies'])}")

# ═══════════════════════════════════════════════════════════
# ART & MUSIC
# ═══════════════════════════════════════════════════════════
AM="art-music"

visual = [
    (1,"0-1","Finger painting exploration","Dip fingers in safe paint and make marks on paper","introduction",1,["hands-on"],[],"washable paint, paper"),
    (2,"1-2","Crayon scribbling","Hold crayons and make colorful marks freely","introduction",1,["hands-on"],[],"chunky crayons"),
    (3,"2-3","Drawing basic shapes in art","Draw circles, lines, and squares as art elements","practice",1,["hands-on"],[],"paper, crayons"),
    (4,"2-3","Colors: red, blue, yellow, green","Name primary and secondary colors","introduction",1,["visual"],[],"color wheel"),
    (5,"3-4","Mixing colors: blue+yellow=green","Explore mixing primary colors to make secondary colors","practice",2,["hands-on"],[],"paint, palette"),
    (6,"3-4","Drawing a person","Draw a stick figure then add details: face, clothes, hair","practice",2,["hands-on"],[],"paper, crayons"),
    (7,"4-5","Drawing from observation","Look at an object and draw what you see","practice",2,["hands-on"],[],"still life objects, paper"),
    (8,"4-5","Shading and texture","Add depth to drawings with light and dark areas","practice",2,["hands-on"],[],"pencils, paper"),
    (9,"5-6","Islamic geometric patterns","Draw simple geometric patterns inspired by Islamic art","practice",2,["hands-on"],[],"ruler, compass, paper"),
    (10,"5-6","Landscape drawing","Draw a scene: sky, ground, trees, buildings","practice",2,["hands-on"],[],"paper, colored pencils"),
    (11,"6-7","Calligraphy: Arabic letters","Write Arabic letters beautifully using a calligraphy pen","practice",3,["hands-on"],[],"calligraphy pen, ink"),
    (12,"6-7","Self-portrait","Draw a detailed self-portrait using a mirror","practice",2,["hands-on"],[],"mirror, paper, pencils"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(visual):
    all_topics.append(topic(f"am-va-{i+1:03d}",AM,"visual-arts",lv,age,title,desc,cat,2,tags,prereq,mat))

music_voc = [
    (1,"1-2","Singing along to nasheed","Listen to and join in simple Islamic nasheeds","introduction",1,["verbal"],[],"nasheed audio"),
    (2,"2-3","Clapping to rhythm","Clap hands in time with a beat or song","practice",1,["hands-on"],[],"rhythm games"),
    (3,"3-4","Singing ABC song and counting songs","Sing familiar children's songs with correct words","practice",1,["verbal"],[],"song cards"),
    (4,"3-4","Call and response singing","Teacher sings a line, kids repeat — Islamic nasheed style","practice",1,["verbal"],[],"nasheed collection"),
    (5,"4-5","Body percussion: snap, clap, stomp","Create rhythms using only the body","practice",2,["hands-on"],[],"none"),
    (6,"4-5","Dynamics: loud and soft","Sing or play soft (piano) and loud (forte)","practice",1,["verbal"],[],"none"),
    (7,"5-6","Arabic nasheed recitation","Learn and perform nasheeds praising Allah and Prophet ﷺ","practice",2,["verbal"],[],"nasheed lyrics"),
    (8,"5-6","Listening to classical Islamic nasheeds","Appreciate the beauty of vocal-only Islamic music","introduction",1,["verbal"],[],"nasheed playlist"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(music_voc):
    all_topics.append(topic(f"am-mu-{i+1:03d}",AM,"music",lv,age,title,desc,cat,2,tags,prereq,mat))

crafts = [
    (1,"1-2","Tearing paper into pieces","Tear colored paper — develop fine motor skills","introduction",1,["hands-on"],[],"colored paper"),
    (2,"2-3","Gluing paper shapes","Cut or tear shapes and glue them to make a picture","practice",2,["hands-on"],[],"paper, glue, scissors"),
    (3,"3-4","Paper folding (origami) basics","Fold paper into simple shapes: boat, hat, plane","practice",2,["hands-on"],[],"square paper"),
    (4,"3-4","Clay modeling","Roll, squash, and shape clay into animals, food, objects","practice",2,["hands-on"],[],"playdough or clay"),
    (5,"4-5","Bead threading necklaces","Thread colorful beads onto string to make jewelry","practice",2,["hands-on"],[],"beads, string"),
    (6,"4-5","Collage making","Cut pictures from magazines and glue into a theme collage","practice",2,["hands-on"],[],"magazines, scissors, glue"),
    (7,"5-6","Paper weaving","Cut and weave paper strips to make a woven pattern","practice",2,["hands-on"],[],"colored paper strips"),
    (8,"5-6","Card making for Eid","Design and make handmade Eid greeting cards","practice",2,["hands-on"],[],"card stock, decorations"),
    (9,"6-7","Build a 3D model","Build a model of a mosque, house, or spaceship from recycled materials","practice",3,["hands-on"],[],"cardboard, tape, paint"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(crafts):
    all_topics.append(topic(f"am-cr-{i+1:03d}",AM,"crafts",lv,age,title,desc,cat,2,tags,prereq,mat))

drama = [
    (2,"2-3","Pretend play: kitchen, shop","Role-play everyday scenarios with toys","introduction",1,["hands-on"],[],"play kitchen, shop toys"),
    (3,"3-4","Puppet shows","Use hand puppets to act out a short story","practice",2,["hands-on"],[],"paper bag puppets"),
    (4,"3-4","Acting out Prophet stories","Role-play stories of Prophets with simple costumes","practice",2,["verbal","hands-on"],[],"scarves, props"),
    (5,"4-5","Telling a story with pictures","Use drawings to tell a sequential story","practice",2,["hands-on","verbal"],[],"paper, crayons"),
    (6,"5-6","Islamic story performance","Perform a short Islamic story for family","practice",3,["verbal"],[],"script, costumes"),
    (7,"6-7","Creating and performing a skit","Write and perform a short skit with a moral lesson","practice",3,["verbal","hands-on"],[],"script materials"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(drama):
    all_topics.append(topic(f"am-dr-{i+1:03d}",AM,"drama",lv,age,title,desc,cat,2,tags,prereq,mat))

print(f"Art & Music topics: {len([t for t in all_topics if t['subject']=='art-music'])}")

# ═══════════════════════════════════════════════════════════
# PHYSICAL EDUCATION
# ═══════════════════════════════════════════════════════════
PE="physical-education"

gross = [
    (0,"0-1","Tummy time and reaching","Baby lies on tummy and reaches for toys — builds neck/arm strength","introduction",1,["hands-on"],[],"soft mat, toys"),
    (1,"1-2","Pulling up to stand","Practice pulling up on furniture to stand","milestone",2,["hands-on"],[],"stable furniture"),
    (2,"1-2","Walking independently","Take first steps — practice walking with support then alone","milestone",3,["hands-on"],[],"open space"),
    (3,"2-3","Running safely","Run short distances without falling","practice",2,["hands-on"],[],"open space"),
    (4,"2-3","Jumping with both feet","Jump off a small step or over a line","practice",2,["hands-on"],[],"chalk, small step"),
    (5,"3-4","Climbing playground equipment","Climb stairs, ladders, and small structures safely","practice",2,["hands-on"],[],"playground"),
    (6,"3-4","Throwing and catching a ball","Throw a ball to a partner and catch it","practice",2,["hands-on"],[],"soft ball"),
    (7,"3-4","Balancing on one foot","Stand on one foot for 5-10 seconds","practice",2,["hands-on"],[],"none"),
    (8,"4-5","Skipping and galloping","Learn to skip and gallop with coordination","practice",2,["hands-on"],[],"music"),
    (9,"4-5","Kicking a ball","Kick a ball toward a target or partner","practice",2,["hands-on"],[],"soccer ball"),
    (10,"5-6","Obstacle courses","Navigate through cones, hurdles, tunnels","practice",2,["hands-on"],[],"cones, hurdles"),
    (11,"5-6","Swimming basics","Enter water safely, float, paddle, basic strokes","practice",3,["hands-on"],[],"swimming pool"),
    (12,"6-7","Team relay races","Participate in relay races — passing baton, running fast","practice",1,["hands-on"],[],"baton, cones"),
    (13,"6-7","Martial arts basics (self-defense)","Learn basic stances and blocks (age-appropriate)","practice",2,["hands-on"],[],"open space"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(gross):
    all_topics.append(topic(f"pe-gm-{i+1:03d}",PE,"gross-motor",lv,age,title,desc,cat,2,tags,prereq,mat))

fine = [
    (0,"0-1","Grasping objects with hands","Reach for and grasp toys with whole hand then fingers","introduction",2,["hands-on"],[],"small toys"),
    (1,"1-2","Stacking 4+ blocks","Stack blocks one on top of another without them falling","practice",2,["hands-on"],[],"building blocks"),
    (2,"2-3","Threading large beads","Thread big beads onto a string","practice",2,["hands-on"],[],"large beads, string"),
    (3,"2-3","Using safety scissors","Cut along a straight line with child-safe scissors","practice",3,["hands-on"],[],"safety scissors, paper"),
    (4,"3-4","Drawing a circle and cross","Copy a circle and cross (+) shape on paper","practice",2,["hands-on"],[],"paper, crayon"),
    (5,"3-4","Puzzles: 12-24 pieces","Complete age-appropriate jigsaw puzzles independently","practice",2,["hands-on"],[],"puzzles"),
    (6,"4-5","Lacing cards","Thread yarn through holes on cards in patterns","practice",2,["hands-on"],[],"lacing cards"),
    (7,"4-5","Drawing a square and triangle","Copy a square and triangle on paper","practice",2,["hands-on"],[],"paper, pencil"),
    (8,"5-6","Building with LEGO or blocks","Follow instructions to build a specific structure","practice",2,["hands-on"],[],"LEGO set"),
    (9,"5-6","Tying shoelaces","Learn to tie shoelaces with a bow","practice",3,["hands-on"],[],"practice shoe"),
    (10,"6-7","Sewing basics","Thread a needle and do simple stitches on fabric","practice",3,["hands-on"],[],"needle, thread, fabric"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(fine):
    all_topics.append(topic(f"pe-fm-{i+1:03d}",PE,"fine-motor",lv,age,title,desc,cat,2,tags,prereq,mat))

health = [
    (1,"1-2","Handwashing with soap","Wash hands before eating, after toilet, after playing","introduction",2,["hands-on"],[],"soap, water"),
    (2,"2-3","Brushing teeth morning and night","Learn proper toothbrushing technique","practice",2,["hands-on"],[],"toothbrush, toothpaste"),
    (3,"2-3","Healthy foods: fruits and vegetables","Identify and name fruits and vegetables — eat the rainbow","introduction",1,["visual","hands-on"],[],"real fruits, veggies"),
    (4,"3-4","Food groups: grains, protein, dairy, fruits, veggies","Sort foods into groups","practice",2,["visual"],[],"food cards"),
    (5,"3-4","Water is the best drink","Drink water instead of sugary drinks — importance of hydration","practice",1,["verbal"],[],"water bottle"),
    (6,"4-5","Halal food basics","Learn what halal and haram foods are in Islam","introduction",2,["verbal"],[],"food cards"),
    (7,"4-5","Exercise and movement daily","Move your body every day for at least 30 minutes","practice",1,["verbal","hands-on"],[],"exercise chart"),
    (8,"5-6","Germs and hygiene","Germs make us sick — how they spread and how to prevent","practice",2,["visual","hands-on"],[],"glitter germs demo"),
    (9,"6-7","Balanced diet planning","Plan a day of halal meals using food groups","practice",2,["hands-on","verbal"],[],"meal planning worksheet"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(health):
    all_topics.append(topic(f"pe-hl-{i+1:03d}",PE,"health",lv,age,title,desc,cat,2,tags,prereq,mat))

sports = [
    (3,"3-4","Playing tag","Run, dodge, and tag — develop speed and agility","practice",1,["hands-on"],[],"open space"),
    (4,"3-4","Hide and seek","Count, hide, find — develop spatial awareness","practice",1,["hands-on"],[],"safe indoor/outdoor space"),
    (5,"4-5","Simon Says","Follow instructions only when preceded by 'Simon says'","practice",1,["verbal","hands-on"],[],"none"),
    (6,"4-5","Ball rolling and bowling","Roll a ball to knock down pins","practice",1,["hands-on"],[],"ball, plastic bottles"),
    (7,"5-6","Relay races","Team relay: running, passing objects, completing tasks","practice",1,["hands-on"],[],"cones, batons"),
    (8,"5-6","Parachute games","Group games using a play parachute","practice",1,["hands-on"],[],"play parachute"),
    (9,"6-7","Basketball basics","Dribble, pass, shoot at a low hoop","practice",2,["hands-on"],[],"basketball, hoop"),
    (10,"6-7","Soccer skills","Dribbling, passing, shooting at a goal","practice",2,["hands-on"],[],"soccer ball, goal"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(sports):
    all_topics.append(topic(f"pe-sg-{i+1:03d}",PE,"sports-games",lv,age,title,desc,cat,2,tags,prereq,mat))

print(f"PE topics: {len([t for t in all_topics if t['subject']=='physical-education'])}")

# ═══════════════════════════════════════════════════════════
# LIFE SKILLS
# ═══════════════════════════════════════════════════════════
LS="life-skills"

selfcare = [
    (1,"1-2","Taking off shoes","Learn to pull off own shoes","milestone",2,["hands-on"],[],"slip-on shoes"),
    (2,"2-3","Putting on shoes (slip-on)","Put on Velcro or slip-on shoes independently","practice",2,["hands-on"],[],"Velcro shoes"),
    (3,"2-3","Washing own hands","Turn on tap, soap, scrub, rinse, dry","practice",2,["hands-on"],[],"step stool, soap"),
    (4,"3-4","Brushing teeth independently","Apply toothpaste, brush all teeth, rinse, spit","practice",2,["hands-on"],[],"toothbrush, timer"),
    (5,"3-4","Getting dressed independently","Put on shirt, pants, socks without help","practice",3,["hands-on"],[],"clothing"),
    (6,"3-4","Using the toilet independently","Complete toilet routine: use, wipe, flush, wash hands","practice",3,["hands-on"],[],"none"),
    (7,"4-5","Buttoning and zipping","Fasten buttons and zippers on clothing","practice",3,["hands-on"],[],"practice shirt"),
    (8,"4-5","Bathing independently","Wash own body, hair, rinse — with supervision","practice",3,["hands-on"],[],"bath supplies"),
    (9,"5-6","Combing own hair","Brush or comb hair neatly","practice",1,["hands-on"],[],"comb, mirror"),
    (10,"6-7","Wudu independently","Perform wudu completely and correctly without help","mastery",3,["hands-on"],[],"wudu area"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(selfcare):
    all_topics.append(topic(f"ls-sc-{i+1:03d}",LS,"self-care",lv,age,title,desc,cat,2,tags,prereq,mat))

manners = [
    (1,"1-2","Saying please and thank you","Use polite words when asking for or receiving something","introduction",2,["verbal"],[],"model behavior"),
    (2,"2-3","Greeting people with Assalamu Alaikum","Say the Islamic greeting to everyone you meet","introduction",2,["verbal"],[],"greeting practice"),
    (3,"2-3","Saying sorry when wrong","Apologize sincerely when you make a mistake","introduction",2,["verbal"],[],"role play"),
    (4,"3-4","Sharing with others","Offer to share toys, food, and time","practice",2,["verbal","hands-on"],[],"sharing games"),
    (5,"3-4","Taking turns","Wait patiently for your turn in games and conversation","practice",2,["verbal"],[],"board games"),
    (6,"3-4","Using indoor voice","Speak at appropriate volume indoors","practice",2,["verbal"],[],"volume chart"),
    (7,"4-5","Table manners","Say Bismillah, eat with right hand, don't waste food","practice",2,["verbal"],[],"mealtime routine"),
    (8,"4-5","Visiting someone's home","Ring doorbell, greet, ask permission, say JazakAllahu Khairan when leaving","practice",2,["verbal"],[],"role play"),
    (9,"5-6","Phone etiquette","Answer politely, don't interrupt, pass phone to parent","practice",2,["verbal"],[],"toy phone"),
    (10,"6-7","Respecting elders","Stand for elders, address them properly, listen when they speak","practice",2,["verbal"],[],"discussion"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(manners):
    all_topics.append(topic(f"ls-mn-{i+1:03d}",LS,"manners",lv,age,title,desc,cat,2,tags,prereq,mat))

emotional = [
    (1,"1-2","Naming basic feelings: happy, sad, angry","Point to face cards and name the feeling","introduction",1,["visual"],[],"feelings faces cards"),
    (2,"2-3","I feel... when...","Express feelings with words: 'I feel sad when...'","practice",2,["verbal"],[],"feelings journal"),
    (3,"3-4","Managing anger: take deep breaths","When angry, stop, breathe, count to 5","practice",2,["verbal"],[],"breathing exercises"),
    (4,"3-4","Making friends: how to be a good friend","Be kind, share, listen, include others","practice",2,["verbal"],[],"friendship poster"),
    (5,"4-5","Empathy: how others feel","Think about how someone else feels before acting","practice",2,["verbal"],[],"story discussion"),
    (6,"4-5","Solving conflicts with words","Use words, not hands — 'I feel... when you...'","practice",2,["verbal"],[],"conflict resolution cards"),
    (7,"5-6","Patience (Sabr) in daily life","Wait for things without complaining — reward of patience","practice",2,["verbal"],[],"Quran/hadith on sabr"),
    (8,"5-6","Building confidence","Try new things, celebrate small wins, don't fear mistakes","practice",2,["verbal"],[],"achievement chart"),
    (9,"6-7","Dealing with disappointment","When things don't go our way — trust Allah's plan","practice",2,["verbal"],[],"discussion, stories"),
    (10,"6-7","Gratitude journal","Write 3 things you're grateful for each day","practice",1,["hands-on"],[],"journal, pen"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(emotional):
    all_topics.append(topic(f"ls-ei-{i+1:03d}",LS,"emotional",lv,age,title,desc,cat,2,tags,prereq,mat))

safety = [
    (2,"2-3","Holding hands near roads","Always hold an adult's hand when near traffic","introduction",2,["verbal"],[],"safety walk"),
    (3,"3-4","Crossing the road safely","Stop, look left, look right, look left again, cross","practice",2,["verbal","hands-on"],[],"road crossing practice"),
    (4,"3-4","Fire safety: stop, drop, roll","Learn what to do if clothes catch fire","practice",2,["verbal"],[],"safety poster"),
    (5,"3-4","Stranger awareness","Don't go with strangers, even if they offer candy","practice",2,["verbal"],[],"role play"),
    (6,"4-5","Calling emergency number (911/999)","Learn when and how to call for help","practice",2,["verbal"],[],"toy phone"),
    (7,"4-5","Water safety: don't swim alone","Always swim with an adult — never alone","practice",1,["verbal"],[],"pool safety talk"),
    (8,"5-6","Poison awareness","Don't eat unknown things, always check with an adult","practice",1,["verbal"],[],"safety labels"),
    (9,"6-7","Internet safety basics","Don't share personal info online, tell a parent about anything scary","practice",2,["verbal"],[],"family internet rules"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(safety):
    all_topics.append(topic(f"ls-sf-{i+1:03d}",LS,"safety",lv,age,title,desc,cat,2,tags,prereq,mat))

independence = [
    (2,"2-3","Picking up toys after play","Put toys back in their box or shelf","practice",2,["hands-on"],[],"labeled toy bins"),
    (3,"3-4","Setting the table","Put plate, cup, and spoon at each place","practice",2,["hands-on"],[],"real dishes"),
    (4,"3-4","Making the bed","Pull up sheets and arrange pillow","practice",2,["hands-on"],[],"child-size bed"),
    (5,"4-5","Helping with simple cooking","Wash vegetables, stir batter, set timer","practice",2,["hands-on"],[],"kitchen tools"),
    (6,"4-5","Feeding a pet","Give pet food and water at regular times","practice",2,["hands-on"],[],"pet food, bowl"),
    (7,"5-6","Washing dishes","Rinse and wash own plate and cup after eating","practice",2,["hands-on"],[],"basin, soap"),
    (8,"5-6","Packing own school bag","Put books, lunchbox, and water bottle in bag","practice",2,["hands-on"],[],"school bag"),
    (9,"6-7","Simple cleaning: sweeping, wiping","Sweep a small area, wipe a table","practice",2,["hands-on"],[],"child-size broom"),
    (10,"6-7","Organizing own things","Keep room tidy, put clothes in drawers, organize desk","practice",2,["hands-on"],[],"storage bins, labels"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(independence):
    all_topics.append(topic(f"ls-ind-{i+1:03d}",LS,"independence",lv,age,title,desc,cat,2,tags,prereq,mat))

print(f"Life Skills topics: {len([t for t in all_topics if t['subject']=='life-skills'])}")
print(f"\n{'='*50}")
print(f"GRAND TOTAL: {len(all_topics)} topics across all subjects")
print(f"{'='*50}")

# Save final merged curriculum
output = {
    "meta": {"version": "1.0.0", "totalTopics": len(all_topics)},
    "topics": all_topics
}
with open(os.path.join(os.path.dirname(__file__), 'curriculum-full.json'), 'w') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)
print(f"Saved to curriculum-full.json")

# Stats by subject
from collections import Counter
by_subject = Counter(t['subject'] for t in all_topics)
by_level = Counter(t['level'] for t in all_topics)
print("\nBy subject:")
for s, c in sorted(by_subject.items(), key=lambda x: -x[1]):
    print(f"  {s}: {c}")
print("\nBy level (age group):")
for l, c in sorted(by_level.items()):
    print(f"  Level {l}: {c}")
