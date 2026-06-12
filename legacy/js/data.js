// ── Static curriculum data + demo seed ──────────────────────────────
const SURAHS=[["Al-Fatihah",7],["Al-Baqarah",286],["Aal Imran",200],["An-Nisa",176],["Al-Ma'idah",120],["Al-An'am",165],["Al-A'raf",206],["Al-Anfal",75],["At-Tawbah",129],["Yunus",109],["Hud",123],["Yusuf",111],["Ar-Ra'd",43],["Ibrahim",52],["Al-Hijr",99],["An-Nahl",128],["Al-Isra",111],["Al-Kahf",110],["Maryam",98],["Ta-Ha",135],["Al-Anbiya",112],["Al-Hajj",78],["Al-Mu'minun",118],["An-Nur",64],["Al-Furqan",77],["Ash-Shu'ara",227],["An-Naml",93],["Al-Qasas",88],["Al-Ankabut",69],["Ar-Rum",60],["Luqman",34],["As-Sajdah",30],["Al-Ahzab",73],["Saba",54],["Fatir",45],["Ya-Sin",83],["As-Saffat",182],["Sad",88],["Az-Zumar",75],["Ghafir",85],["Fussilat",54],["Ash-Shura",53],["Az-Zukhruf",89],["Ad-Dukhan",59],["Al-Jathiyah",37],["Al-Ahqaf",35],["Muhammad",38],["Al-Fath",29],["Al-Hujurat",18],["Qaf",45],["Adh-Dhariyat",60],["At-Tur",49],["An-Najm",62],["Al-Qamar",55],["Ar-Rahman",78],["Al-Waqi'ah",96],["Al-Hadid",29],["Al-Mujadila",22],["Al-Hashr",24],["Al-Mumtahanah",13],["As-Saff",14],["Al-Jumu'ah",11],["Al-Munafiqun",11],["At-Taghabun",18],["At-Talaq",12],["At-Tahrim",12],["Al-Mulk",30],["Al-Qalam",52],["Al-Haqqah",52],["Al-Ma'arij",44],["Nuh",28],["Al-Jinn",28],["Al-Muzzammil",20],["Al-Muddaththir",56],["Al-Qiyamah",40],["Al-Insan",31],["Al-Mursalat",50],["An-Naba",40],["An-Nazi'at",46],["Abasa",42],["At-Takwir",29],["Al-Infitar",19],["Al-Mutaffifin",36],["Al-Inshiqaq",25],["Al-Buruj",22],["At-Tariq",17],["Al-A'la",19],["Al-Ghashiyah",26],["Al-Fajr",30],["Al-Balad",20],["Ash-Shams",15],["Al-Layl",21],["Ad-Duha",11],["Ash-Sharh",8],["At-Tin",8],["Al-Alaq",19],["Al-Qadr",5],["Al-Bayyinah",8],["Az-Zalzalah",8],["Al-Adiyat",11],["Al-Qari'ah",11],["At-Takathur",8],["Al-Asr",3],["Al-Humazah",9],["Al-Fil",5],["Quraysh",4],["Al-Ma'un",7],["Al-Kawthar",3],["Al-Kafirun",6],["An-Nasr",3],["Al-Masad",5],["Al-Ikhlas",4],["Al-Falaq",5],["An-Nas",6]];

const SUBJECTS=[
 {id:"quran",name:"Quran",icon:"📖"},
 {id:"tajweed",name:"Tajweed",icon:"🎙️"},
 {id:"arabic",name:"Arabic",icon:"✍️"},
 {id:"islamic",name:"Islamic Studies",icon:"🕌"},
 {id:"adhkar",name:"Adhkar",icon:"🤲"},
 {id:"math",name:"Math",icon:"🔢"},
 {id:"science",name:"Science",icon:"🔬"},
 {id:"english",name:"English",icon:"📝"},
 {id:"reading",name:"Reading",icon:"📚"}
];
function subj(id){return SUBJECTS.find(s=>s.id===id)||{id:id,name:id,icon:"📌"};}

const SKILLS={
 math:["Counting to 100","Addition within 20","Subtraction within 20","Place value","Multiplication tables","Division basics","Fractions intro","Telling time","Money & coins","Word problems"],
 science:["Living vs non-living","Plant life cycle","Animal habitats","Weather & seasons","The five senses","States of matter","The solar system","Simple machines","Human body basics","Food chains"],
 english:["Letter sounds (phonics)","Sight words","Reading fluency","Reading comprehension","Handwriting","Spelling patterns","Sentence building","Grammar basics","Story writing","Vocabulary"],
 arabic:["Alphabet recognition","Letter forms (begin/mid/end)","Harakat (vowels)","Joining letters","Basic vocabulary","Simple sentences","Listening comprehension","Conversation basics"],
 tajweed:["Makharij (articulation points)","Noon sakinah rules","Meem sakinah rules","Madd (elongation)","Qalqalah","Stopping & starting"],
 islamic:["Pillars of Islam","Pillars of Iman","Wudu steps","Salah how-to","Seerah: Makkah period","Seerah: Madinah period","Names of Allah (basics)","Stories of the Prophets","Daily adhkar","Manners (Adab)"]
};
const LEVELS=["Not started","Practicing","Proficient","Mastered"];

const REC_BOOKS=[["The Story of the Elephant","Hajera Memon"],["Ilyas and Duck Search for Allah","Omar Khawaja"],["Migo and Ali: Love for the Prophets","Zanib Mian"],["The Best Eid Ever","Asma Mobin-Uddin"],["My First Quran Storybook","Saniyasnain Khan"],["Allah Made Everything","Zain Bhikha"],["Golden Domes and Silver Lanterns","Hena Khan"],["I Say Alhamdulillah","Noor H. Dee"],["The Gift of Ramadan","Rabiah York Lumbard"],["365 Days with the Prophet Muhammad","Nurdan Damla"]];

const STD_DAY=[
 ["quran","Memorize new ayahs","After Fajr"],
 ["adhkar","Morning adhkar","After Fajr"],
 ["math","Math practice","Morning"],
 ["english","Reading & phonics","Morning"],
 ["arabic","Arabic letters & words","After Dhuhr"],
 ["islamic","Seerah story time","After Dhuhr"],
 ["reading","Read a book for 15 minutes","After Asr"]
];

// ── Demo seed ───────────────────────────────────────────────────────
function seedState(){
 const d=function(off){const x=new Date();x.setDate(x.getDate()+off);return x.toISOString().slice(0,10);};
 let n=0; const mk=function(c,s,t,slot,date,status){n++;return {id:"seed"+n,childId:c,subject:s,title:t,slot:slot,date:date,status:status,notes:"",score:null,doneAt:status==="done"?Date.now()-n*60000:null};};
 const kids=["k1","k2","k3"];
 const tasks=[];
 kids.forEach(function(k){
  // two fully completed past days for streaks
  [-2,-1].forEach(function(off){STD_DAY.forEach(function(p){tasks.push(mk(k,p[0],p[1],p[2],d(off),"done"));});});
  // today: mixed progress
  STD_DAY.forEach(function(p,i){tasks.push(mk(k,p[0],p[1],p[2],d(0),i<2?"done":(i<4?"taught":"planned")));});
  // tomorrow: planned
  STD_DAY.forEach(function(p){tasks.push(mk(k,p[0],p[1],p[2],d(1),"planned"));});
 });
 return {
  users:[
   {id:"u-admin",role:"admin",name:"Abu Yusuf (Father)",pin:"1234",avatar:"🧔"},
   {id:"u-teacher",role:"teacher",name:"Umm Yusuf (Mother)",pin:"1234",avatar:"🧕"},
   {id:"k1",role:"student",name:"Yusuf",age:9,grade:"Grade 3",avatar:"👦",pin:"1111"},
   {id:"k2",role:"student",name:"Maryam",age:7,grade:"Grade 1",avatar:"👧",pin:"2222"},
   {id:"k3",role:"student",name:"Ibrahim",age:5,grade:"KG",avatar:"🧒",pin:"3333"}
  ],
  tasks:tasks,
  quran:{ // childId -> {surahIndex: memorizedAyahs}
   k1:{0:7,113:5,112:4,111:6,110:3,109:5,108:3,107:7,106:4,105:5,104:2},
   k2:{0:7,113:5,112:4,111:6,110:3},
   k3:{0:7,113:5,112:2}
  },
  mastery:{ // childId -> {"subject:skillIndex": level 0-3}
   k1:{"math:0":3,"math:1":3,"math:2":2,"math:3":2,"math:4":1,"english:0":3,"english:1":3,"english:2":2,"arabic:0":3,"arabic:1":2,"tajweed:0":1,"islamic:0":3,"islamic:1":3,"islamic:2":3,"science:0":2},
   k2:{"math:0":3,"math:1":2,"english:0":3,"english:1":2,"arabic:0":2,"islamic:0":3,"islamic:2":2,"science:0":1},
   k3:{"math:0":1,"english:0":1,"arabic:0":1,"islamic:0":2}
  },
  books:[
   {id:"b1",childId:"k1",title:"Migo and Ali: Love for the Prophets",author:"Zanib Mian",status:"finished",rating:5},
   {id:"b2",childId:"k1",title:"My First Quran Storybook",author:"Saniyasnain Khan",status:"reading",rating:0},
   {id:"b3",childId:"k2",title:"Ilyas and Duck Search for Allah",author:"Omar Khawaja",status:"finished",rating:4},
   {id:"b4",childId:"k3",title:"Allah Made Everything",author:"Zain Bhikha",status:"reading",rating:0}
  ],
  settings:{
   prayerSlots:[
    {name:"After Fajr",desc:"Quran memorization & morning adhkar"},
    {name:"Morning",desc:"Core academics (Math, English, Science)"},
    {name:"After Dhuhr",desc:"Arabic & Islamic studies"},
    {name:"After Asr",desc:"Reading & projects"},
    {name:"After Maghrib",desc:"Family review & evening adhkar"}
   ],
   rewards:{streakGoal:7,rewardNote:"Family trip to the park!"}
  }
 };
}
