// ── Teacher (Mother) views: today, quran, skills, reading ───────────────
window._tOff=0;
function kidTabs(curVar){
 const cur=window[curVar];
 return '<div class="tabs">'+kids().map(function(k){return '<button class="tab '+(k.id===cur?"active":"")+'" onclick="window.'+curVar+'=\''+k.id+'\';App.render()">'+k.avatar+' '+esc(k.name)+'</button>';}).join("")+'</div>';
}
function ensureKid(curVar){if(!kids().length)return false;if(!window[curVar]||!userById(window[curVar]))window[curVar]=kids()[0].id;return true;}

function renderTeacherToday(el){
 const date=todayStr(window._tOff);
 el.innerHTML='<h1>Teaching Day</h1>'+
 '<div class="row spread" style="margin:10px 0"><button class="btn btn-soft btn-sm" onclick="window._tOff--;App.render()">← Prev</button><strong>'+fmtDate(date)+(window._tOff===0?" · Today":"")+'</strong><button class="btn btn-soft btn-sm" onclick="window._tOff++;App.render()">Next →</button></div>'+
 kids().map(function(k){
  const ts=tasksFor(date,k.id);const c=completion(date,k.id);
  return '<div class="card"><div class="row spread"><div class="row"><span style="font-size:1.5rem">'+k.avatar+'</span><strong>'+esc(k.name)+'</strong></div><span class="muted">'+(c===null?"no tasks":c+"% done")+'</span></div><br>'+
  (ts.length?ts.map(taskRow).join(""):'<p class="muted">Nothing planned for '+esc(k.name)+'.</p>')+
  '<br><form class="row" onsubmit="quickAdd(event,\''+k.id+'\',\''+date+'\')"><select name="subject" style="flex:1;min-width:130px">'+SUBJECTS.map(function(s){return '<option value="'+s.id+'">'+s.icon+' '+s.name+'</option>';}).join("")+'</select><input name="title" placeholder="Quick add a task" required style="flex:2;min-width:150px"><button class="btn btn-sm">＋</button></form></div>';
 }).join("");
}
function taskRow(x){
 const academic=["math","science","english","arabic"].indexOf(x.subject)>=0;
 let actions='';
 if(x.status==="planned")actions='<button class="btn btn-sm" onclick="markTaught(\''+x.id+'\')">Mark taught</button>';
 else if(x.status==="taught")actions='<span class="tag tag-taught">taught</span> <button class="btn btn-sm" onclick="markDone(\''+x.id+'\')">Mark done</button>';
 else actions='<span class="tag tag-done">✓ done</span> <button class="btn btn-sm btn-soft" onclick="reopenTask(\''+x.id+'\')">Reopen</button>';
 return '<div class="task"><span class="t-ico">'+subj(x.subject).icon+'</span><div class="t-main"><div class="t-title">'+esc(x.title)+'</div><div class="t-sub">'+subj(x.subject).name+' · '+esc(x.slot||"any time")+'</div>'+
 '<input class="note-input" value="'+esc(x.notes)+'" placeholder="Lesson notes…" onchange="setNote(\''+x.id+'\',this.value)"></div>'+
 (academic?'<input class="score-input" type="number" min="0" max="100" value="'+(x.score==null?"":x.score)+'" placeholder="%" title="Assessment score" onchange="setScore(\''+x.id+'\',this.value)">':'')+
 '<div class="row">'+actions+'</div></div>';
}
window.markTaught=function(id){setTaskStatus(id,"taught");App.render();};
window.markDone=function(id){setTaskStatus(id,"done");App.render();};
window.reopenTask=function(id){setTaskStatus(id,"planned");App.render();};
window.setScore=function(id,v){const t=taskById(id);if(!t)return;t.score=v===""?null:Math.max(0,Math.min(100,Number(v)));Store.save();toast("Score saved ✓");};
window.setNote=function(id,v){const t=taskById(id);if(!t)return;t.notes=v;Store.save();};
window.quickAdd=function(ev,kid,date){ev.preventDefault();const f=ev.target;addTask({childId:kid,subject:f.subject.value,title:f.title.value.trim(),slot:"",date:date});toast("Task added ✓");App.render();};

function renderQuran(el){
 if(!ensureKid("_qKid")){el.innerHTML='<p class="muted">No children yet.</p>';return;}
 const kid=window._qKid;const q=quranOf(kid);
 const order=[0];for(let i=113;i>=1;i--)order.push(i);
 el.innerHTML='<h1>Quran Memorization</h1><p class="muted">Track surah and ayah-level progress</p><br>'+kidTabs("_qKid")+
 '<div class="grid grid-stats"><div class="stat"><div class="big">'+surahsDone(kid)+'</div><div class="lbl">Surahs memorized</div></div><div class="stat"><div class="big">'+ayahsMemorized(kid)+'</div><div class="lbl">Ayahs memorized</div></div><div class="stat"><div class="big">'+Math.round(100*surahsDone(kid)/114)+'%</div><div class="lbl">Of the Quran</div></div><div class="stat"><div class="big">114</div><div class="lbl">Total surahs</div></div></div><br>'+
 '<div class="card">'+order.map(function(idx){
  const total=SURAHS[idx][1];const v=q[idx]||0;const pct=Math.round(100*v/total);
  return '<div class="task"><div class="t-main"><div class="t-title">'+(idx+1)+'. '+esc(SURAHS[idx][0])+(v>=total?' ✅':'')+'</div><div class="row" style="margin-top:4px">'+bar(pct)+'<span class="t-sub" style="min-width:64px;text-align:right">'+v+' / '+total+'</span></div></div>'+
  '<div class="row"><button class="btn btn-sm btn-soft" onclick="qAdj(\''+kid+'\','+idx+',-1)">−</button><button class="btn btn-sm btn-soft" onclick="qAdj(\''+kid+'\','+idx+',1)">＋</button><button class="btn btn-sm" onclick="qFull(\''+kid+'\','+idx+')">✓ Full</button></div></div>';
 }).join("")+'</div>';
}
window.qAdj=function(kid,idx,d){setQuran(kid,idx,(quranOf(kid)[idx]||0)+d);App.render();};
window.qFull=function(kid,idx){setQuran(kid,idx,SURAHS[idx][1]);toast("Masha\u2019Allah! Surah complete 🎉");App.render();};

function renderSkills(el){
 if(!ensureKid("_sKid")){el.innerHTML='<p class="muted">No children yet.</p>';return;}
 const kid=window._sKid;
 el.innerHTML='<h1>Skill Mastery</h1><p class="muted">IXL-style mastery levels per skill</p><br>'+kidTabs("_sKid")+
 Object.keys(SKILLS).map(function(s){
  return '<div class="card"><h3>'+subj(s).icon+' '+subj(s).name+'</h3>'+SKILLS[s].map(function(name,i){
   const l=skillLevel(kid,s,i);
   return '<div class="task"><div class="t-main"><div class="t-title">'+esc(name)+'</div></div><div class="row">'+LEVELS.map(function(lbl,li){return '<button class="chip on-'+li+(li===l?" sel":"")+'" onclick="setSkill(\''+kid+'\',\''+s+'\','+i+','+li+')">'+lbl+'</button>';}).join("")+'</div></div>';
  }).join("")+'</div>';
 }).join("");
}
window.setSkill=function(kid,s,i,l){setSkillLevel(kid,s,i,l);if(l===3){toast("Skill mastered! 🏆");}App.render();};

function renderReading(el){
 if(!ensureKid("_bKid")){el.innerHTML='<p class="muted">No children yet.</p>';return;}
 const kid=window._bKid;const bks=booksOf(kid);
 el.innerHTML='<h1>Reading Log</h1><p class="muted">Little-Lit-style book tracking</p><br>'+kidTabs("_bKid")+
 '<div class="card"><h2>Books · '+finishedBooks(kid)+' finished</h2>'+
 (bks.length?bks.map(function(b){
  let stars='';for(let i=1;i<=5;i++)stars+='<span onclick="setRating(\''+b.id+'\','+i+')">'+(i<=b.rating?"★":"☆")+'</span>';
  return '<div class="task"><span class="t-ico">📕</span><div class="t-main"><div class="t-title">'+esc(b.title)+'</div><div class="t-sub">'+esc(b.author||"")+'</div><div class="stars">'+stars+'</div></div>'+
  '<select style="width:auto" onchange="setBookStatus(\''+b.id+'\',this.value)">'+["reading","finished","wishlist"].map(function(st){return '<option '+(st===b.status?"selected":"")+'>'+st+'</option>';}).join("")+'</select>'+
  '<button class="btn btn-sm btn-danger" onclick="delBook(\''+b.id+'\')">✕</button></div>';
 }).join(""):'<p class="muted">No books yet — add one below.</p>')+
 '<br><form class="row" onsubmit="addBookSubmit(event,\''+kid+'\')"><input name="title" placeholder="Book title" required style="flex:2;min-width:150px"><input name="author" placeholder="Author" style="flex:1;min-width:120px"><button class="btn btn-sm">＋ Add</button></form></div>'+
 '<div class="card"><h2>✨ Recommended Islamic books</h2>'+REC_BOOKS.map(function(b,i){
  const has=bks.some(function(x){return x.title===b[0];});
  return '<div class="task"><span class="t-ico">📗</span><div class="t-main"><div class="t-title">'+esc(b[0])+'</div><div class="t-sub">'+esc(b[1])+'</div></div>'+(has?'<span class="tag tag-done">added</span>':'<button class="btn btn-sm btn-soft" onclick="addRec('+i+',\''+kid+'\')">＋ Add</button>')+'</div>';
 }).join("")+'</div>';
}
window.addBookSubmit=function(ev,kid){ev.preventDefault();const f=ev.target;Store.state.books.push({id:uid(),childId:kid,title:f.title.value.trim(),author:f.author.value.trim(),status:"reading",rating:0});Store.save();toast("Book added ✓");App.render();};
window.addRec=function(i,kid){Store.state.books.push({id:uid(),childId:kid,title:REC_BOOKS[i][0],author:REC_BOOKS[i][1],status:"reading",rating:0});Store.save();toast("Book added ✓");App.render();};
window.setBookStatus=function(id,v){const b=Store.state.books.find(function(x){return x.id===id;});if(!b)return;b.status=v;Store.save();if(v==="finished")toast("Book finished! 📚");App.render();};
window.setRating=function(id,n){const b=Store.state.books.find(function(x){return x.id===id;});if(!b)return;b.rating=n;Store.save();App.render();};
window.delBook=function(id){Store.state.books=Store.state.books.filter(function(x){return x.id!==id;});Store.save();App.render();};
