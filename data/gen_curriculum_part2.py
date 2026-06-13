#!/usr/bin/env python
"""Part 2: English Language Arts + Mathematics curriculum topics."""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from gen_curriculum_part1 import topic, all_topics

# ═══════════════════════════════════════════════════════════
# ENGLISH LANGUAGE ARTS
# ═══════════════════════════════════════════════════════════
S="english"

# --- Letter Recognition (all 26 letters) ---
letters_en = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
for i,ltr in enumerate(letters_en):
    lv = 1 if i<5 else (2 if i<13 else 3)
    age = "0-1" if lv==1 else ("1-2" if lv==2 else "2-3")
    all_topics.append(topic(f"en-lr-{i+1:03d}",S,"letter-recognition",lv,age,f"Recognize letter {ltr}",f"Identify uppercase letter {ltr} by name and sound","introduction",2,["visual","verbal"],[],"letter flashcard, sandpaper letter"))
    all_topics.append(topic(f"en-lr-l-{i+1:03d}",S,"letter-recognition",2,"1-2",f"Lowercase {ltr.lower()}",f"Identify lowercase letter {ltr.lower()} — match with uppercase pair","introduction",2,["visual"],[f"en-lr-{i+1:03d}"],"letter matching game"))
    all_topics.append(topic(f"en-lw-{i+1:03d}",S,"letter-recognition",2,"2-3",f"Write letter {ltr}",f"Practice writing uppercase {ltr} and lowercase {ltr.lower()} with correct formation","practice",2,["hands-on"],[f"en-lr-l-{i+1:03d}"],"tracing worksheet, whiteboard"))

# --- Phonemic Awareness ---
phonics_topics = [
    (1,"1-2","Identifying beginning sounds","Listen and identify the first sound in simple words (cat = /c/)","introduction",2,["verbal"],[],"picture cards"),
    (2,"1-2","Identifying ending sounds","Listen and identify the last sound in simple words (dog = /g/)","introduction",2,["verbal"],["en-pa-001"],"picture cards"),
    (3,"2-3","Rhyming words","Identify words that rhyme: cat/hat, dog/log, sun/run","practice",2,["verbal"],[],"rhyme cards, books"),
    (4,"2-3","Blending sounds","Blend individual sounds: c-a-t → cat, d-o-g → dog","practice",3,["verbal"],[],"sound blocks"),
    (5,"2-3","Segmenting sounds","Break words into sounds: cat → /c/ /a/ /t/","practice",3,["verbal"],[],"elkonin boxes"),
    (6,"3-4","Middle sounds","Identify the vowel sound in the middle of CVC words","practice",2,["verbal"],["en-pa-004"],"sorting mats"),
    (7,"3-4","Deleting sounds","Remove a sound: cat without /c/ = at","practice",2,["verbal"],[],"manipulatives"),
    (8,"4-5","Substituting sounds","Change a sound: cat → hat (change /c/ to /h/)","practice",2,["verbal"],["en-pa-005"],"word cards"),
    (9,"4-5","Syllable clapping","Clap out syllables: but-ter-fly, el-e-phant","practice",1,["verbal","hands-on"],[],"rhythm sticks"),
    (10,"5-6","Compound words","Combine two words: sun + flower = sunflower, ice + cream = ice cream","practice",2,["verbal"],[],"word puzzle cards"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(phonics_topics):
    all_topics.append(topic(f"en-pa-{i+1:03d}",S,"phonemic-awareness",lv,age,title,desc,cat,2,tags,prereq,mat))

# --- Phonics ---
phonics_rules = [
    (2,"2-3","Short vowel a: cat, hat, mat","Learn the short /a/ sound in CVC words","practice",3,["verbal"],[],"phonics cards"),
    (3,"2-3","Short vowel e: bed, pen, red","Learn the short /e/ sound in CVC words","practice",3,["verbal"],[],"phonics cards"),
    (4,"2-3","Short vowel i: sit, big, pin","Learn the short /i/ sound in CVC words","practice",3,["verbal"],[],"phonics cards"),
    (5,"2-3","Short vowel o: hot, dog, pot","Learn the short /o/ sound in CVC words","practice",3,["verbal"],[],"phonics cards"),
    (6,"2-3","Short vowel u: cup, run, fun","Learn the short /u/ sound in CVC words","practice",3,["verbal"],[],"phonics cards"),
    (7,"3-4","Consonant blends: bl, cl, fl, gl","Read and write words with beginning blends: block, clap, flag, glad","practice",3,["verbal"],[],"blend cards"),
    (8,"3-4","Consonant blends: br, cr, dr, fr","Read words: brown, crab, drum, frog","practice",3,["verbal"],["en-ph-007"],"blend cards"),
    (9,"3-4","Consonant blends: st, sp, sk, sm","Read words: stop, spin, skip, smile","practice",3,["verbal"],[],"blend cards"),
    (10,"3-4","Digraphs: sh, ch, th","Learn special sound pairs: ship, chat, this","practice",3,["verbal"],[],"digraph posters"),
    (11,"3-4","Digraphs: wh, ph, ng, nk","Learn: when, phone, ring, sink","practice",3,["verbal"],[],"digraph posters"),
    (12,"3-4","Long vowel a: cake, make, lake","Learn the magic-e rule: silent e makes vowel long","practice",3,["verbal"],[],"word cards"),
    (13,"4-5","Long vowel i: bike, kite, time","Magic-e with i: i_e makes long /i/ sound","practice",3,["verbal"],[],"word cards"),
    (14,"4-5","Long vowel o: bone, home, rose","Magic-e with o: o_e makes long /o/ sound","practice",3,["verbal"],[],"word cards"),
    (15,"4-5","Long vowel u: cute, tube, fuse","Magic-e with u: u_e makes long /u/ sound","practice",3,["verbal"],[],"word cards"),
    (16,"4-5","Vowel teams: ai, ay (long a)","Read: rain, play, train, day","practice",3,["verbal"],[],"vowel team chart"),
    (17,"4-5","Vowel teams: ea, ee (long e)","Read: tea, tree, read, see","practice",3,["verbal"],[],"vowel team chart"),
    (18,"4-5","Vowel teams: oa, oe (long o)","Read: boat, coat, toe, hoe","practice",3,["verbal"],[],"vowel team chart"),
    (19,"5-6","R-controlled vowels: ar, er, ir, or, ur","Learn: car, her, bird, for, burn","practice",3,["verbal"],[],"r-controlled poster"),
    (20,"5-6","Diphthongs: oi, oy, ou, ow","Learn: coin, boy, out, cow","practice",3,["verbal"],[],"diphthong chart"),
    (21,"5-6","Silent letters: kn, wr, gn, mb","Learn: know, write, gnaw, lamb","practice",2,["verbal"],[],"silent letter cards"),
    (22,"5-6","Soft c and soft g","c makes /s/ before e,i,y (city, center); g makes /j/ (gem, gym)","practice",2,["verbal"],[],"sorting activity"),
    (23,"6-7","Multisyllable decoding","Break long words into syllables to read: but-ter-flies, el-e-phant","mastery",3,["verbal"],[],"syllable cards"),
    (24,"6-7","Irregular/sight word reading","Read common irregular words: the, said, was, would, could, should","mastery",3,["verbal"],[],"sight word list"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(phonics_rules):
    all_topics.append(topic(f"en-ph-{i+1:03d}",S,"phonics",lv,age,title,desc,cat,2,tags,prereq,mat))

# --- Sight Words ---
sight_levels = [
    (2,"2-3","Pre-primer sight words (10)","the, a, I, is, it, to, and, in, we, see","practice",3,["verbal"],[],"flashcards, word wall"),
    (3,"3-4","Primer sight words (20)","can, you, he, she, my, like, go, do, at, he, was, for, on, are, as, with, his, they, I, said","practice",3,["verbal"],["en-sw-001"],"sight word bingo"),
    (4,"4-5","First grade sight words (20)","have, come, some, what, when, where, which, who, how, many, each, every, little, much, very, its, our, their, would, could","practice",3,["verbal"],["en-sw-002"],"sight word games"),
    (5,"5-6","Second grade sight words (20)","been, before, after, again, also, always, because, been, both, does, don't, every, first, goes, great, just, know, laugh, never, only","practice",2,["verbal"],["en-sw-003"],"word journal"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(sight_levels):
    all_topics.append(topic(f"en-sw-{i+1:03d}",S,"sight-words",lv,age,title,desc,cat,3,tags,prereq,mat))

# --- Reading & Comprehension ---
reading_topics = [
    (2,"2-3","Picture reading","Look at pictures to tell what a story is about","introduction",1,["visual"],[],"picture books"),
    (3,"3-4","Reading CVC words independently","Read simple 3-letter words: cat, dog, pen, sun, bus","practice",3,["verbal"],[],"decodable books"),
    (4,"3-4","Reading simple sentences","Read 3-4 word sentences: 'The cat sat.' 'I can run.'","practice",3,["verbal"],["en-rd-002"],"guided readers"),
    (5,"4-5","Story elements","Identify characters, setting, beginning, middle, end in stories","practice",2,["verbal","visual"],[],"story maps"),
    (6,"4-5","Retelling stories","Retell a story in correct sequence using transition words","practice",2,["verbal"],[],"story sequencing cards"),
    (7,"4-5","Making predictions","Look at cover and title, predict what the book is about before reading","practice",2,["verbal"],[],"picture books"),
    (8,"5-6","Answering who, what, where, when, why","Answer comprehension questions after reading a passage","practice",2,["verbal"],[],"comprehension worksheets"),
    (9,"5-6","Main idea and details","Identify the main idea and supporting details in a text","practice",2,["verbal"],[],"graphic organizers"),
    (10,"5-6","Cause and effect","Identify cause and effect relationships in stories","practice",2,["verbal"],[],"cause-effect charts"),
    (11,"6-7","Reading short chapters","Read short chapter books independently with comprehension","mastery",5,["verbal"],[],"chapter books"),
    (12,"6-7","Author's purpose","Understand why an author writes: to entertain, inform, or persuade","practice",2,["verbal"],[],"text examples"),
    (13,"6-7","Compare and contrast","Compare characters, settings, or events across two stories","practice",2,["verbal"],[],"venn diagram"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(reading_topics):
    all_topics.append(topic(f"en-rd-{i+1:03d}",S,"reading",lv,age,title,desc,cat,2,tags,prereq,mat))

# --- Writing ---
writing_topics = [
    (1,"0-1","Scribbling with crayons","Hold crayon and make marks on paper — early writing exposure","introduction",1,["hands-on"],[],"chunky crayons, paper"),
    (2,"1-2","Tracing vertical and horizontal lines","Practice drawing straight lines (top to bottom, left to right)","introduction",2,["hands-on"],[],"tracing worksheets"),
    (3,"2-3","Tracing shapes","Trace circles, squares, triangles, and zigzag lines","practice",2,["hands-on"],[],"tracing workbook"),
    (4,"2-3","Copying simple shapes","Copy: circle, cross, square, triangle without tracing","practice",2,["hands-on"],["en-wr-003"],"lined paper"),
    (5,"3-4","Writing own name","Write first name with correct letter formation and size","practice",3,["hands-on"],[],"name tracing card"),
    (6,"3-4","Labeling pictures","Write labels for pictures: cat, dog, sun, house","practice",2,["hands-on","verbal"],[],"picture dictionary"),
    (7,"4-5","Writing simple sentences","Write 3-5 word sentences independently: 'I like cats.'","practice",3,["hands-on"],[],"sentence starters"),
    (8,"4-5","Capital letters and periods","Use capital at start and period at end of every sentence","practice",2,["verbal","hands-on"],[],"writing checklist"),
    (9,"5-6","Writing a paragraph","Write 3-5 sentences about a topic with a beginning, middle, end","practice",3,["verbal","hands-on"],[],"graphic organizer"),
    (10,"5-6","Question marks and exclamation marks","Use ? for questions and ! for excitement — learn when to use each","practice",2,["verbal"],[],"punctuation poster"),
    (11,"6-7","Creative writing","Write short stories, journal entries, and descriptive paragraphs","practice",3,["hands-on"],[],"writing journal"),
    (12,"6-7","Letter writing","Write a friendly letter: greeting, body, closing, signature","practice",2,["hands-on"],[],"letter template"),
    (13,"6-7","Writing complete sentences","Use subject + verb + object; avoid fragments and run-ons","practice",2,["verbal"],[],"sentence building kit"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(writing_topics):
    all_topics.append(topic(f"en-wr-{i+1:03d}",S,"writing",lv,age,title,desc,cat,2,tags,prereq,mat))

# --- Grammar ---
grammar_topics = [
    (2,"2-3","Naming words (nouns)","Learn that naming words are people, places, or things","introduction",2,["verbal"],[],"noun cards"),
    (3,"3-4","Action words (verbs)","Learn that verbs are doing words: run, jump, eat, sleep","introduction",2,["verbal"],[],"action cards"),
    (4,"3-4","Describing words (adjectives)","Learn that adjectives describe nouns: big dog, red ball","introduction",2,["verbal"],[],"picture cards"),
    (5,"4-5","Singular and plural nouns","cat → cats, baby → babies, foot → feet — rules for making plurals","practice",2,["verbal"],[],"noun sorting game"),
    (6,"4-5","A and an articles","Use 'a' before consonant sounds, 'an' before vowel sounds","practice",2,["verbal"],[],"worksheet"),
    (7,"5-6","Pronouns: I, you, he, she, it, we, they","Replace nouns with pronouns to avoid repetition","practice",2,["verbal"],[],"pronoun cards"),
    (8,"5-6","Sentence parts: subject and predicate","Every sentence has who/what (subject) and does what (predicate)","practice",2,["verbal"],[],"sentence strips"),
    (9,"6-7","Present, past, and future tense","walk/walked/will walk — learn to change verb tenses","practice",2,["verbal"],[],"tense timeline"),
    (10,"6-7","Conjunctions: and, but, or, so","Join two sentences: 'I like cats and dogs.' 'I wanted to go but it rained.'","practice",2,["verbal"],[],"conjunction cards"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(grammar_topics):
    all_topics.append(topic(f"en-gr-{i+1:03d}",S,"grammar",lv,age,title,desc,cat,2,tags,prereq,mat))

# --- Literature ---
lit_topics = [
    (1,"0-1","Board books and touch-and-feel","Explore sturdy books with textures — develop love of books","introduction",1,["visual","hands-on"],[],"board books"),
    (2,"1-2","Read-aloud time","Listen to short stories being read aloud — develop attention span","introduction",1,["verbal"],[],"picture books"),
    (3,"2-3","Fairy tales and fables","Classic tales: Three Little Pigs, Goldilocks, Lion and Mouse","introduction",1,["verbal"],[],"fairy tale collection"),
    (4,"3-4","Identifying story characters","Name the main characters and what they look like","introduction",2,["verbal"],[],"story books"),
    (5,"3-4","Poetry: nursery rhymes","Recite and memorize nursery rhymes: Twinkle Twinkle, Baa Baa Black Sheep","practice",1,["verbal"],[],"poetry book"),
    (6,"4-5","Folk tales from different cultures","Read stories from African, Asian, Middle Eastern, and European traditions","introduction",1,["verbal"],[],"multicultural story collection"),
    (7,"4-5","Identifying the moral/lesson","After reading, identify what the story teaches us","practice",2,["verbal"],[],"discussion prompts"),
    (8,"5-6","Fiction vs non-fiction","Distinguish between make-believe stories and factual books","practice",2,["verbal"],[],"book sorting"),
    (9,"5-6","Character feelings and motivations","Discuss why characters did what they did and how they felt","practice",2,["verbal"],[],"feeling charts"),
    (10,"6-7","Chapter book reading","Read and discuss simple chapter books independently","practice",5,["verbal"],[],"age-appropriate chapter books"),
    (11,"6-7","Writing book reports","Write a short summary: title, author, characters, favorite part, recommendation","practice",2,["hands-on","verbal"],[],"book report template"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(lit_topics):
    all_topics.append(topic(f"en-lit-{i+1:03d}",S,"literature",lv,age,title,desc,cat,2,tags,prereq,mat))

print(f"English topics: {len([t for t in all_topics if t['subject']=='english'])}")

# ═══════════════════════════════════════════════════════════
# MATHEMATICS
# ═══════════════════════════════════════════════════════════
SM="mathematics"

# --- Number Sense ---
ns_topics = [
    (0,"0-1","Counting objects 1-5","Touch and count fingers, toes, toys — one-to-one correspondence","introduction",2,["hands-on","verbal"],[],"counting toys, fingers"),
    (1,"1-2","Rote counting 1-10","Sing counting songs and rote count to 10","introduction",2,["verbal"],[],"number songs, rhymes"),
    (2,"2-3","Recognizing numerals 1-5","Match numeral to quantity: see '3' and show 3 fingers","practice",3,["visual","hands-on"],[],"number cards, manipulatives"),
    (3,"2-3","Rote counting 1-20","Count to 20 with accuracy","practice",2,["verbal"],[],"number line"),
    (4,"3-4","Recognizing numerals 1-10","Identify all digits 0-9 and order them","practice",2,["visual"],[],"number puzzle"),
    (5,"3-4","Counting objects 1-20","Count groups of objects up to 20","practice",2,["hands-on"],[],"counting bears, cubes"),
    (6,"3-4","Comparing numbers","Which is more? Which is less? Greater than, less than, equal","practice",2,["visual"],[],"comparing cards"),
    (7,"3-4","Number order","Put numbers 1-20 in order","practice",2,["hands-on"],[],"number cards"),
    (8,"4-5","Skip counting by 2s","Count: 2, 4, 6, 8, 10... using pairs","practice",2,["verbal","hands-on"],[],"counting by 2s chart"),
    (9,"4-5","Skip counting by 5s","Count: 5, 10, 15, 20... using hands","practice",2,["verbal"],[],"hundreds chart"),
    (10,"4-5","Skip counting by 10s","Count: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100","practice",2,["verbal"],[],"base-10 blocks"),
    (11,"4-5","Recognizing numerals 1-20","Read and write all numerals 1-20","practice",2,["visual","hands-on"],[],"number writing worksheet"),
    (12,"5-6","Counting to 100","Count accurately to 100 by 1s","practice",3,["verbal"],[],"hundreds chart"),
    (13,"5-6","Place value: tens and ones","Understand that 23 = 2 tens + 3 ones using base-10 blocks","practice",3,["hands-on","visual"],[],"base-10 blocks"),
    (14,"5-6","Reading and writing numbers to 100","Read numerals 0-100 and write them from dictation","practice",2,["visual","hands-on"],[],"number cards"),
    (15,"5-6","Comparing numbers to 100","Use >, <, = to compare two-digit numbers","practice",2,["verbal"],[],"comparison symbols"),
    (16,"6-7","Place value: hundreds, tens, ones","Understand 3-digit numbers: 456 = 4 hundreds + 5 tens + 6 ones","mastery",3,["hands-on"],[],"base-10 blocks"),
    (17,"6-7","Counting to 1000","Count by 1s, 10s, and 100s to 1000","practice",3,["verbal"],[],"thousands chart"),
    (18,"6-7","Number patterns","Identify and extend number patterns: +2, +5, +10 sequences","practice",2,["verbal"],[],"pattern blocks"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(ns_topics):
    all_topics.append(topic(f"m-ns-{i+1:03d}",SM,"number-sense",lv,age,title,desc,cat,2,tags,prereq,mat))

# --- Operations ---
ops_topics = [
    (3,"3-4","Adding 1 to a number","Learn that adding 1 gives the next number: 3+1=4","introduction",2,["hands-on"],[],"number line, counters"),
    (4,"3-4","Combining two groups","Put 2 objects and 3 objects together = 5 total","practice",2,["hands-on"],[],"counting bears"),
    (5,"4-5","Addition within 10","Add two numbers whose sum is ≤10: 3+4=7","practice",3,["hands-on","verbal"],[],"ten frame"),
    (6,"4-5","Subtraction within 10","Take away objects: 7-3=4 — understand removal","practice",3,["hands-on"],[],"counters, subtraction cards"),
    (7,"4-5","Addition within 20 (no regrouping)","Add single-digit numbers: 8+5=13","practice",3,["hands-on"],[],"number line"),
    (8,"5-6","Addition within 20 (with regrouping)","Add with carrying: 9+6=15, 8+7=15","practice",3,["hands-on"],[],"base-10 blocks"),
    (9,"5-6","Subtraction within 20","Subtract single-digit from teen: 15-7=8","practice",3,["hands-on"],[],"ten frames"),
    (10,"5-6","Understanding equals sign","The = sign means 'the same as' — both sides are equal","practice",2,["verbal"],[],"balance scale"),
    (11,"6-7","Addition within 100","Add two-digit numbers with regrouping: 34+27=61","practice",3,["hands-on"],[],"base-10 blocks"),
    (12,"6-7","Subtraction within 100","Subtract two-digit numbers with regrouping: 52-18=34","practice",3,["hands-on"],[],"base-10 blocks"),
    (13,"6-7","Word problems (addition)","Solve word problems: 'Ali had 5 apples and got 3 more. How many?","practice",2,["verbal"],[],"word problem cards"),
    (14,"6-7","Word problems (subtraction)","Solve: 'Maryam had 12 cookies and ate 4. How many left?","practice",2,["verbal"],[],"word problem cards"),
    (15,"5-6","Patterns: growing patterns","Extend growing patterns: 1, 2, 4, 7, 11 (+1, +2, +3, +4)","practice",2,["verbal","visual"],[],"pattern strips"),
    (16,"5-6","Patterns: repeating patterns","Identify and create AB, ABB, ABC, AABBCC patterns","practice",2,["hands-on"],[],"pattern blocks, beads"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(ops_topics):
    all_topics.append(topic(f"m-op-{i+1:03d}",SM,"operations",lv,age,title,desc,cat,2,tags,prereq,mat))

# --- Geometry ---
geo_topics = [
    (2,"2-3","Circles","Identify and describe a circle — round, no corners","introduction",1,["visual","hands-on"],[],"shape blocks"),
    (3,"2-3","Squares","Identify and describe a square — 4 equal sides, 4 corners","introduction",1,["visual","hands-on"],[],"shape blocks"),
    (4,"2-3","Triangles","Identify and describe a triangle — 3 sides, 3 corners","introduction",1,["visual","hands-on"],[],"shape blocks"),
    (5,"3-4","Rectangles","Identify and describe a rectangle — 4 sides, 2 long and 2 short","practice",1,["visual","hands-on"],[],"shape blocks"),
    (6,"3-4","Hexagons and ovals","Identify hexagon (6 sides) and oval (elongated circle)","practice",1,["visual"],[],"pattern blocks"),
    (7,"3-4","Sorting by shape","Sort objects into groups by their shape","practice",2,["hands-on"],[],"mixed shape collection"),
    (8,"4-5","3D shapes: cube, sphere, cone, cylinder","Identify basic 3D shapes and their flat surfaces","practice",2,["hands-on"],[],"3D shape models"),
    (9,"4-5","Position words","Above, below, beside, between, in front of, behind","practice",2,["verbal","hands-on"],[],"toy figures"),
    (10,"4-5","Symmetry","Fold a shape in half — are both sides the same? Mirror line","practice",2,["hands-on"],[],"symmetry mirrors"),
    (11,"5-6","Halves and fourths (fractions intro)","Fold paper in half and fourths — understand equal parts","practice",2,["hands-on"],[],"paper, scissors"),
    (12,"5-6","Composing shapes","Combine two shapes to make a new shape: 2 triangles = square","practice",2,["hands-on"],[],"pattern blocks"),
    (13,"6-7","Identifying angles","Right angle (corner), acute (small), obtuse (big)","practice",2,["visual"],[],"angle cards, protractor"),
    (14,"6-7","Area introduction","Cover a shape with unit squares — how many fit inside?","practice",2,["hands-on"],[],"grid paper, tiles"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(geo_topics):
    all_topics.append(topic(f"m-geo-{i+1:03d}",SM,"geometry",lv,age,title,desc,cat,2,tags,prereq,mat))

# --- Measurement ---
meas_topics = [
    (2,"2-3","Big and small","Compare object sizes: which is bigger, which is smaller?","introduction",1,["visual","hands-on"],[],"different sized objects"),
    (3,"3-4","Long and short","Compare lengths: which is longer, which is shorter?","introduction",1,["hands-on"],[],"string, blocks"),
    (4,"3-4","Heavy and light","Compare weight using a balance scale","practice",1,["hands-on"],[],"balance scale"),
    (5,"4-5","Measuring with non-standard units","Measure length using paper clips, blocks, hand spans","practice",2,["hands-on"],[],"paper clips, blocks"),
    (6,"4-5","Tall and short","Compare heights — who is tallest?","practice",1,["hands-on"],[],"measuring tape"),
    (7,"5-6","Inches and centimeters","Introduction to standard units of length","practice",2,["hands-on"],[],"ruler, measuring tape"),
    (8,"5-6","Pounds and kilograms","Introduction to weight units","practice",2,["hands-on"],[],"balance scale, weights"),
    (9,"5-6","Cups and liters","Introduction to volume/capacity","practice",2,["hands-on"],[],"measuring cups, water"),
    (10,"6-7","Reading a ruler (inches)","Measure objects to the nearest inch using a ruler","practice",2,["hands-on"],[],"ruler"),
    (11,"6-7","Reading a ruler (centimeters)","Measure objects to the nearest centimeter","practice",2,["hands-on"],[],"metric ruler"),
    (12,"5-6","Graphing: tally marks","Record data using tally marks","practice",2,["hands-on"],[],"tally chart"),
    (13,"6-7","Bar graphs","Read and create simple bar graphs from data","practice",2,["visual","hands-on"],[],"grid paper, stickers"),
    (14,"5-6","Calendar skills","Read a calendar: days of week, months, today's date","practice",2,["visual"],[],"classroom calendar"),
    (15,"5-6","Time: o'clock","Tell time to the hour on analog clock","practice",3,["visual","hands-on"],[],"teaching clock"),
    (16,"6-7","Time: half past","Tell time to the half hour: half past 3, half past 7","practice",3,["visual"],[],"teaching clock"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(meas_topics):
    all_topics.append(topic(f"m-meas-{i+1:03d}",SM,"measurement",lv,age,title,desc,cat,2,tags,prereq,mat))

# --- Money ---
money_topics = [
    (4,"4-5","Coin recognition: penny, nickel, dime, quarter","Identify US coins by appearance and value","introduction",2,["visual","hands-on"],[],"real coins, coin chart"),
    (5,"5-6","Counting coins","Count pennies, then add nickels, dimes: total value","practice",3,["hands-on"],[],"coin sets"),
    (5,"5-6","Bill recognition: $1, $5, $10","Identify paper money and their values","introduction",1,["visual"],[],"play money"),
    (6,"6-7","Making change","Calculate change from simple purchases","practice",3,["hands-on"],[],"play money, cash register"),
    (6,"6-7","Adding money amounts","Add different coins and bills to make a total","practice",2,["hands-on"],[],"coin sorting tray"),
    (4,"3-4","Coins of Saudi Arabia ( Riyal)","Learn about the most common Saudi coins","introduction",2,["visual"],[],"real Saudi coins"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(money_topics):
    all_topics.append(topic(f"m-money-{i+1:03d}",SM,"money-time",lv,age,title,desc,cat,2,tags,prereq,mat))

# --- Patterns & Logic ---
pat_topics = [
    (2,"2-3","Color patterns: red, blue, red, blue","Continue simple alternating color patterns","introduction",1,["visual","hands-on"],[],"colored beads"),
    (3,"3-4","Size patterns: big, small, big, small","Continue patterns based on size","practice",1,["hands-on"],[],"different sized objects"),
    (4,"3-4","Shape patterns","Continue patterns with different shapes","practice",1,["visual","hands-on"],[],"pattern blocks"),
    (5,"4-5","Growing patterns","1, 2, 3, 4... 2, 4, 6, 8... patterns that increase","practice",2,["verbal"],[],"number charts"),
    (6,"4-5","Sorting and classifying","Sort objects by multiple attributes: color AND shape","practice",2,["hands-on"],[],"attribute blocks"),
    (7,"5-6","Logic puzzles","Simple logic: if this, then that — process of elimination","practice",2,["verbal"],[],"logic puzzle cards"),
    (8,"6-7","Number patterns and rules","Find the rule in a number pattern and extend it","practice",2,["verbal"],[],"pattern worksheets"),
]
for i,(lv,age,title,desc,cat,_,tags,prereq,mat) in enumerate(pat_topics):
    all_topics.append(topic(f"m-pat-{i+1:03d}",SM,"patterns",lv,age,title,desc,cat,2,tags,prereq,mat))

print(f"Math topics: {len([t for t in all_topics if t['subject']=='mathematics'])}")
print(f"Total so far: {len(all_topics)}")

# Save all accumulated topics
with open(os.path.join(os.path.dirname(__file__), 'curriculum-part2.json'), 'w') as f:
    json.dump(all_topics, f, indent=2, ensure_ascii=False)
print(f"Saved to curriculum-part2.json")
