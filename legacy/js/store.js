// ── State, persistence and domain helpers ───────────────────────────
const Store={
 state:null,
 load(){const raw=localStorage.getItem("shs-state");this.state=raw?JSON.parse(raw):seedState();this.save();},
 save(){localStorage.setItem("shs-state",JSON.stringify(this.state));},
 reset(){localStorage.removeItem("shs-state");sessionStorage.removeItem("shs-user");this.load();}
};
function uid(){return "id"+Math.random().toString(36).slice(2,9)+Date.now().toString(36);}
function esc(s){return String(s==null?"":s).replace(/[&<>\"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
function todayStr(off){off=off||0;const d=new Date();d.setDate(d.getDate()+off);return d.toISOString().slice(0,10);}
function fmtDate(s){const d=new Date(s+"T00:00:00");return d.toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"});}
function kids(){return Store.state.users.filter(function(u){return u.role==="student";});}
function userById(id){return Store.state.users.find(function(u){return u.id===id;});}

// Tasks
function tasksFor(date,childId){return Store.state.tasks.filter(function(t){return t.date===date&&(!childId||t.childId===childId);});}
function addTask(o){const t=Object.assign({id:uid(),status:"planned",notes:"",score:null,doneAt:null},o);Store.state.tasks.push(t);Store.save();return t;}
function taskById(id){return Store.state.tasks.find(function(t){return t.id===id;});}
function setTaskStatus(id,status){const t=taskById(id);if(!t)return;t.status=status;t.doneAt=status==="done"?Date.now():null;Store.save();}
function removeTask(id){Store.state.tasks=Store.state.tasks.filter(function(t){return t.id!==id;});Store.save();}
function completion(date,childId){const ts=tasksFor(date,childId);if(!ts.length)return null;return Math.round(100*ts.filter(function(t){return t.status==="done";}).length/ts.length);}
function streak(childId){let s=0;if(completion(todayStr(0),childId)===100)s++;let i=1;while(i<120){const c=completion(todayStr(-i),childId);if(c===100){s++;i++;}else break;}return s;}

// Quran
function quranOf(childId){if(!Store.state.quran[childId])Store.state.quran[childId]={};return Store.state.quran[childId];}
function setQuran(childId,idx,val){const q=quranOf(childId);const max=SURAHS[idx][1];val=Math.max(0,Math.min(max,val));if(val===0)delete q[idx];else q[idx]=val;Store.save();}
function ayahsMemorized(childId){const q=quranOf(childId);let n=0;for(const k in q)n+=q[k];return n;}
function surahsDone(childId){const q=quranOf(childId);let n=0;for(const k in q)if(q[k]>=SURAHS[k][1])n++;return n;}

// Mastery (IXL-style levels)
function masteryOf(childId){if(!Store.state.mastery[childId])Store.state.mastery[childId]={};return Store.state.mastery[childId];}
function skillLevel(childId,s,i){return masteryOf(childId)[s+":"+i]||0;}
function setSkillLevel(childId,s,i,lvl){masteryOf(childId)[s+":"+i]=lvl;Store.save();}
function masteredCount(childId){const m=masteryOf(childId);let n=0;for(const k in m)if(m[k]===3)n++;return n;}

// Reading
function booksOf(childId){return Store.state.books.filter(function(b){return b.childId===childId;});}
function finishedBooks(childId){return booksOf(childId).filter(function(b){return b.status==="finished";}).length;}

// Badges
const BADGE_DEFS=[
 {id:"first",icon:"🌟",name:"First Step",desc:"Complete your first task",test:function(c){return Store.state.tasks.some(function(t){return t.childId===c&&t.status==="done";});}},
 {id:"perfect",icon:"💯",name:"Perfect Day",desc:"Finish every task in one day",test:function(c){for(let i=0;i<30;i++){if(completion(todayStr(-i),c)===100)return true;}return false;}},
 {id:"streak3",icon:"🔥",name:"3-Day Streak",desc:"3 perfect days in a row",test:function(c){return streak(c)>=3;}},
 {id:"streak7",icon:"⚡",name:"7-Day Streak",desc:"7 perfect days in a row",test:function(c){return streak(c)>=7;}},
 {id:"surah3",icon:"📖",name:"Surah Star",desc:"Memorize 3 surahs",test:function(c){return surahsDone(c)>=3;}},
 {id:"surah10",icon:"🕌",name:"Juz Amma Journey",desc:"Memorize 10 surahs",test:function(c){return surahsDone(c)>=10;}},
 {id:"book3",icon:"📚",name:"Bookworm",desc:"Finish 3 books",test:function(c){return finishedBooks(c)>=3;}},
 {id:"master5",icon:"🏆",name:"Skill Master",desc:"Master 5 skills",test:function(c){return masteredCount(c)>=5;}}
];
function earnedBadges(childId){return BADGE_DEFS.filter(function(b){return b.test(childId);});}

// Small UI helpers shared by views
function bar(pct,cls){pct=pct==null?0:pct;return '<div class="progress '+(cls||"")+'"><div class="progress-fill" style="width:'+pct+'%"></div></div>';}
function weekChart(getPct){let h="";for(let i=6;i>=0;i--){const d=todayStr(-i);const p=getPct(d);const v=p==null?0:p;h+='<div class="bar-col"><div class="bar-track"><div class="bar-fill" style="height:'+v+'%"></div></div><span class="bar-lbl">'+fmtDate(d).split(",")[0].slice(0,3)+'</span></div>';}
 return '<div class="bars">'+h+'</div>';}
