// ── Kid (Student) views: my day checklist + my stars ────────────────────
const PRAISES=["Masha\u2019Allah! 🌟","Allahumma barik! 💚","Amazing work! 🎉","You did it! 🚀","Superstar! ⭐","Barakallahu feek! 🌙"];
function renderKidDay(el){
 const me=Auth.user;const date=todayStr();const ts=tasksFor(date,me.id);
 const done=ts.filter(function(t){return t.status==="done";}).length;
 const pct=ts.length?Math.round(100*done/ts.length):0;
 const rw=Store.state.settings.rewards;
 el.innerHTML='<div class="kid-hero"><div style="font-size:3rem">'+me.avatar+'</div><div class="hello">Assalamu alaikum, '+esc(me.name)+'! 👋</div><div class="kid-streak">🔥 '+streak(me.id)+'-day streak · goal: '+rw.streakGoal+' days</div></div>'+
 (ts.length&&done===ts.length?'<div class="celebrate-banner">🎉 Alhamdulillah! You finished EVERYTHING today! 🎉'+(rw.rewardNote?'<br><small>Streak reward: '+esc(rw.rewardNote)+'</small>':'')+'</div>':'')+
 '<div class="card"><div class="row"><strong>'+done+' of '+ts.length+' done</strong>'+bar(pct)+'</div></div>'+
 (ts.length?ts.map(function(t){
  const d=t.status==="done";
  return '<div class="kid-task '+(d?"done":"")+'" onclick="kidTick(\''+t.id+'\')"><div class="kt-check">'+(d?"✓":"")+'</div><div style="flex:1"><div class="kt-title">'+esc(t.title)+'</div><div class="kt-sub">'+subj(t.subject).name+' · '+esc(t.slot||"")+'</div></div><span class="kt-ico">'+subj(t.subject).icon+'</span></div>';
 }).join(""):'<div class="card"><p class="muted">No tasks today — enjoy your free day! 🏖️</p></div>');
}
window.kidTick=function(id){
 const t=taskById(id);if(!t||t.childId!==Auth.user.id)return;
 if(t.status==="done"){setTaskStatus(id,"planned");}
 else{setTaskStatus(id,"done");celebrate();toast(PRAISES[Math.floor(Math.random()*PRAISES.length)]);}
 App.render();
};

function renderKidStars(el){
 const me=Auth.user;const earned=earnedBadges(me.id).map(function(b){return b.id;});
 el.innerHTML='<div class="kid-hero"><div class="hello">⭐ My Stars & Badges</div><p class="muted">Keep going, '+esc(me.name)+'!</p></div>'+
 '<div class="grid grid-stats"><div class="stat"><div class="big">'+surahsDone(me.id)+'</div><div class="lbl">Surahs 📖</div></div><div class="stat"><div class="big">'+ayahsMemorized(me.id)+'</div><div class="lbl">Ayahs ✨</div></div><div class="stat"><div class="big">'+masteredCount(me.id)+'</div><div class="lbl">Skills 🏆</div></div><div class="stat"><div class="big">'+finishedBooks(me.id)+'</div><div class="lbl">Books 📚</div></div></div><br>'+
 '<div class="card"><h2>My week</h2>'+weekChart(function(d){return completion(d,me.id);})+'</div>'+
 '<h2 style="margin:6px 0 10px">Badges</h2><div class="badge-grid">'+BADGE_DEFS.map(function(b){
  const has=earned.indexOf(b.id)>=0;
  return '<div class="badge-tile '+(has?"":"locked")+'"><div class="b-ico">'+b.icon+'</div><div class="b-name">'+b.name+'</div><div class="b-desc">'+b.desc+'</div></div>';
 }).join("")+'</div>';
}
