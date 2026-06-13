#!/usr/bin/env python
"""Generate comprehensive homeschool curriculum database for ages 0-7."""
import json, os

def topic(id, subject, strand, level, age, title, desc, cat="introduction", sessions=2, tags=None, prereqs=None, mats=""):
    return {"id":id,"subject":subject,"strand":strand,"level":level,"ageGroup":age,"title":title,"description":desc,"category":cat,"estimatedSessions":sessions,"tags":tags or ["verbal"],"prerequisites":prereqs or [],"materials":mats}

all_topics = []

# ═══════════════════════════════════════════════════════════
# QURAN (arabic-letters, quran-recitation, quran-memorization, tajweed, quran-understanding, quran-stories)
# ═══════════════════════════════════════════════════════════
S="quran"
# --- Arabic Letters (Hijaiyah) ---
letters = ["Alif","Ba","Ta","Tha","Jeem","Ha","Kha","Dal","Dhal","Ra","Zay","Seen","Sheen","Sad","Dad","Ta (emphatic)","Za (emphatic)","Ayn","Ghayn","Fa","Qaf","Kaf","Lam","Meem","Noon","Ha","Waw","Ya"]
for i,ltr in enumerate(letters):
    all_topics.append(topic(f"s-ar-letters-{i+1:03d}",S,"arabic-letters",1,"0-1",f"Recognize Arabic letter: {ltr}",f"Learn to identify and pronounce the Hijaiyah letter {ltr} by sight and sound","introduction",3,["visual","verbal"],[""],"tajweed card, letter poster"))
    all_topics.append(topic(f"s-ar-write-{i+1:03d}",S,"arabic-letters",2,"1-2",f"Write Arabic letter: {ltr}",f"Practice writing the letter {ltr} in isolated form with proper stroke order","practice",2,["hands-on"],[f"s-ar-letters-{i+1:03d}"],"tracing worksheet, sand tray"))
    if i<10:
        all_topics.append(topic(f"s-ar-pos-{i+1:03d}",S,"arabic-letters",3,"2-3",f"Letter {ltr} in word positions",f"Learn how {ltr} changes shape in initial, medial, and final positions","practice",3,["visual","hands-on"],[f"s-ar-write-{i+1:03d}"],"position cards"))

# Madd letters
for m in ["Alif Madd","Waw Madd","Ya Madd"]:
    slug=m.lower().replace(" ","-")
    all_topics.append(topic(f"s-madd-{slug}",S,"arabic-letters",3,"2-3",f"Learn {m} elongation",f"Understand extended vowel sound with {m} in Quranic text","introduction",3,["verbal","visual"],["s-ar-letters-001"],"audio clips, letter cards"))

# Sukoon and Shaddah
all_topics.append(topic("s-sukoon",S,"arabic-letters",4,"3-4","Sukoon (no vowel)","Learn to identify and pronounce sukoon mark on Arabic letters","introduction",2,["verbal","visual"],["s-madd-alif-madd"],"tajweed chart"))
all_topics.append(topic("s-shaddah",S,"arabic-letters",4,"3-4","Shaddah (doubling)","Learn shaddah mark indicating letter doubling in Quranic recitation","introduction",2,["verbal","visual"],["s-sukoon"],"tajweed chart"))
all_topics.append(topic("s-tanween",S,"arabic-letters",5,"4-5","Tanween (nunation)","Learn the three tanween marks: fathah, kasrah, dammah with nun sound","practice",3,["verbal"],["s-shaddah"],"recitation examples"))

# --- Quran Recitation (Tilawah) ---
short_surahs = [
    ("An-Nas",114,"Seeking refuge in Allah from evil"),("Al-Falaq",113,"Morning and evening refuge"),
    ("Al-Ikhlas",112,"Pure monotheism - Allah is One"),("Al-Kafirun",109,"Rejection of polytheism"),
    ("Al-Masad",111,"Warning to Abu Lahab"),("An-Nasr",110,"Divine help and victory"),
    ("Al-Asr",103,"Time and human loss"),("Al-Humazah",104,"Warning against backbiting"),
    ("Al-Fil",105,"Elephant army destroyed"),("Quraysh",106,"Allah's provision to Quraysh"),
    ("Al-Ma'un",107,"Neglect of orphans and prayer"),("Al-Kawthar",108,"Abundance from Allah"),
    ("Al-Fatihah",1,"Opening chapter - essence of worship"),
]
for i,(name,idx,lesson) in enumerate(short_surahs):
    lv = 1 if i<4 else (2 if i<8 else 3)
    age = "3-4" if lv==1 else ("4-5" if lv==2 else "5-6")
    all_topics.append(topic(f"s-recite-{idx:03d}",S,"quran-recitation",lv,age,f"Recite Surah {name}",f"Learn to recite Surah {name} ({idx}) from Quran with correct pronunciation. Lesson: {lesson}","practice",4,["verbal"],[f"s-ar-letters-001"],f"Quran mushaf, audio recitation"))
    all_topics.append(topic(f"s-mean-{idx:03d}",S,"quran-understanding",lv,age,f"Meaning of Surah {name}",f"Understand the basic meaning and key lesson of Surah {name}: {lesson}","introduction",2,["verbal","visual"],[f"s-recite-{idx:03d}"],"translated Quran, story cards"))

# Medium surahs
medium_surahs = [
    ("Al-Bayyinah",98,"Clear proof of prophethood"),("Az-Zalzalah",99,"Earthquake of the Day of Judgment"),
    ("Al-Adiyat",100,"Horses in battle"),("Al-Qariah",101,"The Striking Hour"),
    ("At-Takathur",102,"Competition in worldly increase"),
    ("Al-Mutaffifin",83,"Warning against fraud"),("Al-Infitar",82,"The splitting of the sky"),
    ("Al-Inshiqaq",84,"The cleaving of the sky"),("Al-Buruj",85,"Stories of the people of the ditch"),
    ("At-Tin",95,"Oath by fig and olive"),
]
for i,(name,idx,lesson) in enumerate(medium_surahs):
    all_topics.append(topic(f"s-recite-{idx:03d}",S,"quran-recitation",4,"3-4",f"Recite Surah {name}",f"Learn to recite Surah {name} ({idx}). Lesson: {lesson}","practice",4,["verbal"],[f"s-recite-114"],"Quran mushaf, audio"))
    all_topics.append(topic(f"s-mean-{idx:03d}",S,"quran-understanding",4,"3-4",f"Meaning of Surah {name}",f"Understand the message of Surah {name}: {lesson}","introduction",2,["verbal"],[f"s-recite-{idx:03d}"],"translated Quran"))

# --- Quran Memorization (Hifz) ---
for i,(name,idx,_) in enumerate(short_surahs[:7]):
    lv = 2 if i<3 else (3 if i<5 else 4)
    age = "2-3" if lv==2 else ("3-4" if lv==3 else "4-5")
    all_topics.append(topic(f"hifz-{idx:03d}",S,"quran-memorization",lv,age,f"Memorize Surah {name}",f"Commit Surah {name} to memory with fluency","mastery",5,["verbal"],[f"s-recite-{idx:03d}"],"revision chart, reward stickers"))

# --- Tajweed ---
tajweed_topics = [
    (2,"2-3","Makharij basics - letter exit points","Learn the basic articulation points (makharij) for Arabic letters","introduction",["verbal","visual"],"",["s-ar-letters-001"]),
    (3,"2-3","Noon Sakinah rules","Learn when noon sakinah gets ghunnah (nasalization) vs idgham","practice",["verbal"],"",["s-sukoon"]),
    (4,"3-4","Meem Sakinah rules","Learn the three rules of meem sakinah: idgham, ikhfa, izhar","practice",["verbal"],"",["s-shaddah"]),
    (5,"4-5","Lam Shamsiyah and Qamariyah","Learn when lam is pronounced and when it is silent","practice",["verbal","visual"],"",["s-shaddah"]),
    (6,"4-5","Madd rules (elongation)","Learn the different types of madd and their durations (2, 4, 6 counts)","mastery",["verbal"],"",["s-madd-alif-madd"]),
    (7,"5-6","Rules of stopping (Waqf)","Learn where to pause and not pause during recitation","practice",["verbal"],"",["s-recite-001"]),
    (8,"5-6","Qalqalah (echoing sound)","Learn qalqalah in letters Jeem, Ba, Dal, Ta, Qaf when sukoon is on them","mastery",["verbal"],"",["s-sukoon"]),
    (9,"6-7","Advanced tajweed application","Apply all tajweed rules fluently in continuous recitation","mastery",["verbal"],"",["s-recite-001","s-tajweed-007"]),
]
for i,(lv,age,title,desc,cat,tags,mat,prereq) in enumerate(tajweed_topics):
    all_topics.append(topic(f"s-tajweed-{i+1:03d}",S,"tajweed",lv,age,title,desc,cat,3,tags,prereq,mat or "tajweed chart"))

print(f"Quran topics so far: {len([t for t in all_topics if t['subject']=='quran'])}")

# ═══════════════════════════════════════════════════════════
# ISLAMIC STUDIES
# ═══════════════════════════════════════════════════════════
S2="islamic-studies"

aqeedah = [
    (1,"0-1","Allah is the Creator","Show child the beauty of nature and say 'Allah made this' — building awareness of Creator","introduction",["visual","verbal"],"",[]),
    (2,"1-2","Allah sees me and hears me","Teach child that Allah watches over us always — builds consciousness (taqwa)","introduction",["verbal"],"",[]),
    (3,"1-2","Allah is One (Tawheed)","Simple lesson: Allah is One, no partners. Say 'La ilaha illallah' together","introduction",["verbal"],"",[]),
    (4,"2-3","Allah sent the Quran","Teach that Allah's final book is the Quran, sent to Prophet Muhammad ﷺ","introduction",["verbal","visual"],"",["is-aq-003"]),
    (5,"2-3","Allah sent many prophets","Learn that Allah sent prophets to guide people — starting with Adam","introduction",["verbal"],"",["is-aq-003"]),
    (6,"3-4","Angels are Allah's creation","Learn about Jibril, Mikail, Israfil, Azrael — angels do Allah's commands","introduction",["verbal","visual"],"",[]),
    (7,"3-4","The Four Holy Books","Learn: Taurat (Musa), Zaboor (Dawud), Injeel (Isa), Quran (Muhammad ﷺ)","introduction",["verbal"],"",["is-aq-004"]),
    (8,"4-5","Day of Judgment basics","People will be judged for their deeds — be ready by doing good","introduction",["verbal"],"",[]),
    (9,"5-6","Predestination (Qadr)","Everything happens by Allah's will and wisdom — trust Allah","practice",["verbal"],"",[]),
    (10,"5-6","The Five Pillars overview","Shahada, Salah, Zakat, Sawm, Hajj — the foundation of Islam","introduction",["verbal"],"",[]),
    (11,"6-7","Iman in detail","Deepen understanding of six articles of faith with Quranic evidence","mastery",["verbal"],"",["is-aq-010"]),
]
for i,(lv,age,title,desc,cat,tags,mat,prereq) in enumerate(aqeedah):
    all_topics.append(topic(f"is-aq-{i+1:03d}",S2,"aqeedah",lv,age,title,desc,cat,2,tags,prereq,mat))

seerah = [
    (1,"2-3","Birth of Prophet Muhammad ﷺ","Learn about the special night of the Prophet's birth in Makkah","introduction",["verbal"],"",[]),
    (2,"2-3","Halimah the wet nurse","Young Muhammad ﷺ was cared for by Halimah in the desert","introduction",["verbal"],"",["is-se-001"]),
    (3,"3-4","The young Prophet in Makkah","Childhood and youth of Prophet ﷺ — known as Al-Amin (the trustworthy)","introduction",["verbal"],"",[]),
    (4,"3-4","Khadijah r.a. — first wife","Prophet ﷺ married Khadijah, a noble and supportive woman","introduction",["verbal"],"",[]),
    (5,"4-5","Revelation in Cave Hira","Angel Jibril brought the first revelation: 'Iqra bismi rabbika' (Read!)","introduction",["verbal","visual"],"",["is-aq-004"]),
    (6,"4-5","Early Muslims in Makkah","Learn about early believers: Abu Bakr, Ali, Zayd, Sumayyah r.a.","introduction",["verbal"],"",["is-se-005"]),
    (7,"5-6","The Hijrah to Madinah","Prophet ﷺ migrated from Makkah to Madinah — the start of Islamic calendar","practice",["verbal","visual"],"",["is-se-006"]),
    (8,"5-6","Life in Madinah","Building the mosque, brotherhood between Muhajireen and Ansar","practice",["verbal"],"",["is-se-007"]),
    (9,"6-7","Key battles: Badr and Uhud","Lessons from the early battles — trust in Allah and obedience","practice",["verbal"],"",["is-se-008"]),
    (10,"6-7","Conquest of Makkah","Peaceful return to Makkah — forgiveness and mercy of Prophet ﷺ","practice",["verbal"],"",["is-se-009"]),
    (11,"6-7","Character of Prophet ﷺ","His kindness, patience, honesty, humor, and mercy to all","mastery",["verbal"],"",[]),
]
for i,(lv,age,title,desc,cat,tags,mat,prereq) in enumerate(seerah):
    all_topics.append(topic(f"is-se-{i+1:03d}",S2,"seerah",lv,age,title,desc,cat,2,tags,prereq,mat))

prophets = [
    (1,"2-3","Prophet Adam a.s. — first human","Allah created Adam from clay and taught him all names","introduction",["verbal"],"",[]),
    (2,"3-4","Prophet Nuh a.s. — the ark","Nuh built the ark by Allah's command and saved the believers","introduction",["verbal","visual"],"",[]),
    (3,"3-4","Prophet Ibrahim a.s. — friend of Allah","Ibrahim searched for Allah and destroyed idols — father of prophets","introduction",["verbal"],"",[]),
    (4,"4-5","Prophet Ismail a.s. — sacrifice","Ibrahim's willingness to sacrifice his son — lesson of obedience","introduction",["verbal"],"",["is-pr-003"]),
    (5,"3-4","Prophet Lut a.s. — standing for truth","Lut warned his people against evil — lesson of courage","introduction",["verbal"],"",[]),
    (6,"4-5","Prophet Yusuf a.s. — patience and beauty","Yusuf's story: thrown in well, Egypt, patience, reunion with family","introduction",["verbal"],"",[]),
    (7,"4-5","Prophet Musa a.s. — birth in the river","Baby Musa in the basket, raised by Fir'awn, staff miracle","introduction",["verbal"],"",[]),
    (8,"5-6","Prophet Sulaiman a.s. — wisdom and kingdom","Sulaiman's kingdom, speaking with ants and birds, judgment","introduction",["verbal"],"",[]),
    (9,"5-6","Prophet Dawud a.s. — shepherd and king","Dawud's devotion, psalms (Zaboor), defeating Jalut","introduction",["verbal"],"",[]),
    (10,"5-6","Prophet Yunus a.s. — patience in darkness","Yunus swallowed by whale, his prayer from the darkness — repentance","introduction",["verbal"],"",[]),
    (11,"6-7","Prophet Isa a.s. — birth and miracles","Isa born to Maryam, miracles by Allah's permission, not divine","introduction",["verbal"],"",[]),
    (12,"6-7","Prophet Ayyub a.s. — patience in suffering","Ayyub lost everything but never lost faith — Allah restored him","introduction",["verbal"],"",[]),
]
for i,(lv,age,title,desc,cat,tags,mat,prereq) in enumerate(prophets):
    all_topics.append(topic(f"is-pr-{i+1:03d}",S2,"prophets-stories",lv,age,title,desc,cat,2,tags,prereq,mat))

# Fiqh
fiqh = [
    (1,"2-3","Cleanliness is half of faith","Learn that Allah loves cleanliness — washing hands, face, body","introduction",["verbal","hands-on"],"",[]),
    (2,"3-4","Wudu steps (ablution)","Learn the 6 steps of wudu: face, arms, head, ears, feet","practice",["hands-on","verbal"],"",["is-fq-001"]),
    (3,"3-4","When to make wudu","Before salah, after using toilet, after sleeping, after touching dogs","practice",["verbal"],"",["is-fq-002"]),
    (4,"3-4","Allah wants us to pray","Learn that salah is a gift from Allah — talking to Him 5 times a day","introduction",["verbal"],"",[]),
    (5,"4-5","Steps of Salah — standing","Learn the physical positions: standing (qiyam), hands on chest","practice",["hands-on","verbal"],"",["is-fq-004"]),
    (6,"4-5","Steps of Salah — bowing and prostrating","Learn ruku and sujud — the most important parts of salah","practice",["hands-on"],"",["is-fq-005"]),
    (7,"4-5","The 5 daily prayers","Fajr, Dhuhr, Asr, Maghrib, Isha — names and approximate times","introduction",["verbal","visual"],"",[]),
    (8,"5-6","Saying the Adhan","Learn the words of the adhan and its meaning","practice",["verbal"],"",["is-fq-007"]),
    (9,"5-6","Praying in congregation","Learn to pray behind imam in the mosque — standing in rows","practice",["verbal"],"",["is-fq-006"]),
    (10,"5-6","Fasting basics (Ramadan)","Learn why we fast, what breaks the fast, the reward of Ramadan","introduction",["verbal"],"",[]),
    (11,"6-7","Complete salah with confidence","Pray all 5 daily prayers independently with correct recitation","mastery",["verbal","hands-on"],"",["is-fq-006"]),
    (12,"6-7","Zakat and charity concepts","Learn about giving to those in need — the 2.5% rule, voluntary sadaqah","introduction",["verbal"],"",[]),
    (13,"6-7","Hajj basics","Learn about the pilgrimage to Makkah — what pilgrims do and why","introduction",["verbal","visual"],"",[]),
]
for i,(lv,age,title,desc,cat,tags,mat,prereq) in enumerate(fiqh):
    all_topics.append(topic(f"is-fq-{i+1:03d}",S2,"fiqh",lv,age,title,desc,cat,3,tags,prereq,mat))

# Adhkar and Duas
duas = [
    (1,"1-2","Bismillah before eating","Say Bismillah before every meal — thanking Allah for food","introduction",["verbal"],"",[]),
    (2,"1-2","Alhamdulillah after eating","Say Alhamdulillah after finishing food","introduction",["verbal"],"",["is-dc-001"]),
    (3,"2-3","Dua before sleep","Learn: Bismika Allahumma amutu wa ahya — In Your name O Allah I die and live","introduction",["verbal"],"",[]),
    (4,"2-3","Dua when waking up","Learn: Alhamdulillahilladhi ahyana ba'da ma amatana — praise to Allah who revived us","introduction",["verbal"],"",[]),
    (5,"3-4","Entering the mosque","Learn: Allahumma aftah li abwaba rahmatik — O Allah open for me the doors of Your mercy","practice",["verbal"],"",[]),
    (6,"3-4","Leaving the mosque","Learn: Allahumma inni as'aluka min fadlik — O Allah I ask You from Your bounty","practice",["verbal"],"",[]),
    (7,"3-4","Dua when leaving home","Bismillahi tawakkaltu 'alallah — In Allah's name I trust Allah","practice",["verbal"],"",[]),
    (8,"3-4","Dua when entering home","Bismillahi walajna — In the name of Allah we enter","practice",["verbal"],"",[]),
    (9,"4-5","Morning adhkar (simplified)","Say key morning remembrances: Ayat al-Kursi, 3x Ikhlas/Falaq/Nas, Subhanallah 33x","practice",["verbal"],"",[]),
    (10,"4-5","Evening adhkar (simplified)","Say key evening remembrances — same as morning but at Maghrib time","practice",["verbal"],"",[]),
    (11,"5-6","Dua when looking in mirror","Allahumma kama hassanta khalqi fahsin khuluqi — O Allah as You made my appearance beautiful, make my character beautiful","practice",["verbal"],"",[]),
    (12,"5-6","Dua for parents","Rabbi irhamhuma kama rabbayani sagheera — My Lord have mercy on them as they raised me when I was small","practice",["verbal"],"",[]),
    (13,"6-7","Dua when traveling","Subhanalladhi sakhkhara lana hadha — Glorified is He who put this at our service","practice",["verbal"],"",[]),
    (14,"6-7","Complete morning/evening adhkar","Recite full set of morning and evening adhkar from memory","mastery",["verbal"],"",["is-dc-009"]),
]
for i,(lv,age,title,desc,cat,tags,mat,prereq) in enumerate(duas):
    all_topics.append(topic(f"is-dc-{i+1:03d}",S2,"adhkar-duas",lv,age,title,desc,cat,2,tags,prereq,mat))

# Adab and Character
adab = [
    (1,"1-2","Saying please and thank you","Learn polite words: please, thank you, jazakAllahu khairan","introduction",["verbal"],"",[]),
    (2,"2-3","Being kind to parents","Respect mom and dad — help them, speak gently, obey them","introduction",["verbal"],"",[]),
    (3,"2-3","Saying Assalamu Alaikum","Greet people with Islamic greeting — to family, friends, strangers","introduction",["verbal"],"",[]),
    (4,"3-4","Sharing with others","Learn to share toys, food, and time with siblings and friends","practice",["hands-on"],"",[]),
    (5,"3-4","Telling the truth","Honesty is a sign of a believer — Prophet ﷺ was Al-Amin","practice",["verbal"],"",[]),
    (6,"3-4","Not interrupting others","Wait for your turn to speak — raise your hand or wait for a pause","practice",["verbal"],"",[]),
    (7,"4-5","Visiting the sick","Learn to visit sick family and neighbors — bring comfort and make dua","practice",["verbal"],"",[]),
    (8,"4-5","Feeding others","Prophet ﷺ said: the best of you is the one who feeds others","practice",["hands-on"],"",[]),
    (9,"4-5","Being patient (Sabr)","When things are hard, say 'Inna lillahi wa inna ilayhi raji'un' — be patient","practice",["verbal"],"",[]),
    (10,"5-6","Respecting elders","Stand for elders, speak respectfully, serve them food first","practice",["verbal"],"",[]),
    (11,"5-6","Animal rights in Islam","Prophet ﷺ said: whoever kills a sparrow for no reason will be questioned — be kind to animals","practice",["verbal"],"",[]),
    (12,"6-7","Neighbor rights","Prophet ﷺ said: Jibril kept reminding me about neighbor rights","practice",["verbal"],"",[]),
    (13,"6-7","Gratitude (Shukr)","Thank Allah in every situation — gratitude increases blessings","practice",["verbal"],"",[]),
]
for i,(lv,age,title,desc,cat,tags,mat,prereq) in enumerate(adab):
    all_topics.append(topic(f"is-ad-{i+1:03d}",S2,"adab-character",lv,age,title,desc,cat,2,tags,prereq,mat))

print(f"Islamic Studies topics: {len([t for t in all_topics if t['subject']=='islamic-studies'])}")
print(f"Total so far: {len(all_topics)}")
