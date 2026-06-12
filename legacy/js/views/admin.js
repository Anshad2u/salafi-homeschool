// ── Admin (Father) views: dashboard, planning, settings, reports ────────
function renderAdminDashboard(el){
 const t=todayStr(),ks=kids();
 const all=tasksFor(t),done=all.filter(function(x){return x.status==="done";}).length;
 const pct=all.length?Math.round(100*done/all.length):0;
 const totalSurahs=ks.reduce(function(a,k){return a+surahsDone(k.id);},0);
 const streaks=ks.map(function(k){return streak(k.id);});
 const bestStreak=streaks.length?Math.max.apply(null,streaks):0;
 const alerts=[];
 ks.forEach(function(k){const c=completion(t,k.id);if(c!==null&&c<50)alerts.push("⚠️ "+esc(k.name)+" is behind today ("+c+"% complete)");});
 ks.forEach(function(k){["quran","math","english"].forEach(function(s){let any=false;for(let i=0;i<7;i++){if(tasksFor(todayStr(-i),k.id).some(function(x){return x.subject===s&&x.status==="done";})){any=true;break;}}if(!any)alerts.push("📌 "+esc(k.name)+": no completed "+subj(s).name+" task in the last 7 days");});});
 const recent=Store.state.tasks.filter(function(x){return x.status==="done"&&x.doneAt;}).sort(function(a,b){return b.doneAt-a.doneAt;}).slice(0,8);
 el.innerHTML=
  '<h1>Family Dashboard</h1><p class="muted">'+fmtDate(t)+' · monitoring all learning activity</p><br>'+
  '<div class="grid grid-stats">'+
   '<div class="stat"><div class="big">'+all.length+'</div><div class="lbl">Tasks today</div></div>'+
   '<div class="stat"><div class="big">'+pct+'%</div><div class="lbl">Completed today</div></div>'+
   '<div class="stat"><div class="big">'+totalSurahs+'</div><div class="lbl">Surahs memorized</div></div>'+
   '<div class="stat"><div class="big">'+bestStreak+'🔥</div><div class="lbl">Best streak</div></div>'+
  '</div><br>'+
  (alerts.length?'<div class="card"><h2>Needs attention</h2>'+alerts.map(function(a){return '<div class="alert">'+a+'</div>';}).join("")+'</div>':'')+
  '<div class="card"><h2>Family completion — last 7 days</h2>'+weekChart(function(d){const vals=ks.map(function(k){return completion(d,k.id);}).filter(function(v){return v!==null;});return vals.length?Math.round(vals.reduce(function(a,b){return a+b;},0)/vals.length):0;})+'</div>'+
  '<div class="grid grid-2">'+ks.map(function(k){
   const c=completion(t,k.id);
   return '<div class="card"><div class="row"><span style="font-size:1.6rem">'+k.avatar+'</span><div><strong>'+esc(k.name)+'</strong><div class="muted">'+esc(k.grade||"")+' · 🔥 '+streak(k.id)+'-day streak</div></div></div>'+
    '<br><div class="row"><span class="muted" style="min-width:86px">Today: '+(c===null?"–":c+"%")+'</span>'+bar(c)+'</div>'+
    '<br><div class="row muted" style="gap:14px"><span>📖 '+surahsDone(k.id)+' surahs</span><span>🏆 '+masteredCount(k.id)+' mastered</span><span>📚 '+finishedBooks(k.id)+' books</span></div></div>';
  }).join("")+'</div>'+
  '<div class="card"><h2>Recent activity</h2>'+(recent.length?recent.map(function(x){const u=userById(x.childId);return '<div class="task"><span class="t-ico">'+subj(x.subject).icon+'</span><div class="t-main"><div class="t-title">'+esc(u?u.name:"?")+' completed: '+esc(x.title)+'</div><div class="t-sub">'+subj(x.subject).name+' · '+fmtDate(x.date)+'</div></div><span class="tag tag-done">done</span></div>';}).join(""):'<p class="muted">No completed tasks yet.</p>')+'</div>';
}

function renderPlanning(el){
 const slots=Store.state.settings.prayerSlots;
 let days='';
 for(let i=0;i<7;i++){
  const d=todayStr(i);const ts=tasksFor(d);
  days+='<div class="card"><h3>'+fmtDate(d)+(i===0?' · Today':'')+'</h3>'+(ts.length?ts.map(function(x){const u=userById(x.childId);return '<div class="task"><span class="t-ico">'+(u?u.avatar:"?")+'</span><div class="t-main"><div class="t-title">'+esc(x.title)+'</div><div class="t-sub">'+subj(x.subject).icon+' '+subj(x.subject).name+' · '+esc(x.slot||"")+'</div></div><span class="tag tag-'+x.status+'">'+x.status+'</span><button class="btn btn-sm btn-danger" onclick="delTask(\''+x.id+'\')">✕</button></div>';}).join(""):'<p class="muted">Nothing planned.</p>')+'</div>';
 }
 el.innerHTML='<h1>Planning</h1><p class="muted">Plan lessons — tasks appear instantly on the teacher and student pages</p><br>'+
 '<div class="card"><h2>Add a lesson / task</h2><form id="planForm" onsubmit="planSubmit(event)"><div class="grid grid-2">'+
  '<label>Child<select name="child"><option value="all">👨‍👩‍👧‍👦 All children</option>'+kids().map(function(k){return '<option value="'+k.id+'">'+k.avatar+' '+esc(k.name)+'</option>';}).join("")+'</select></label>'+
  '<label>Date<input type="date" name="date" value="'+todayStr()+'" required></label>'+
  '<label>Subject<select name="subject">'+SUBJECTS.map(function(s){return '<option value="'+s.id+'">'+s.icon+' '+s.name+'</option>';}).join("")+'</select></label>'+
  '<label>Time slot<select name="slot">'+slots.map(function(s){return '<option>'+esc(s.name)+'</option>';}).join("")+'</select></label>'+
 '</div><br><label>Task title<input name="title" placeholder="e.g. Memorize Surah Al-Fil ayah 1-3" required></label><br><label>Notes (optional)<input name="notes" placeholder="Any instructions for the teacher"></label><br>'+
 '<div class="row"><button class="btn" type="submit">＋ Plan task</button><button class="btn btn-soft" type="button" onclick="planStdDay()">⚡ Add standard day</button></div></form></div>'+
 '<h2>Next 7 days</h2>'+days;
}
window.planSubmit=function(ev){ev.preventDefault();const f=ev.target;const c=f.child.value;const targets=c==="all"?kids().map(function(k){return k.id;}):[c];targets.forEach(function(k){addTask({childId:k,subject:f.subject.value,title:f.title.value.trim(),slot:f.slot.value,date:f.date.value,notes:f.notes.value.trim()});});toast("Task planned ✓");App.render();};
window.planStdDay=function(){const f=document.getElementById("planForm");const c=f.child.value;const date=f.date.value;const targets=c==="all"?kids().map(function(k){return k.id;}):[c];targets.forEach(function(k){STD_DAY.forEach(function(p){addTask({childId:k,subject:p[0],title:p[1],slot:p[2],date:date});});});toast("Standard day added ✓");App.render();};
window.delTask=function(id){removeTask(id);App.render();};

function renderSettings(el){
 const st=Store.state.settings;
 const parents=Store.state.users.filter(function(u){return u.role!=="student";});
 el.innerHTML='<h1>Settings</h1><p class="muted">Configure everything about the homeschool</p><br>'+
 '<div class="card"><h2>👧 Children</h2>'+kids().map(function(k){return '<div class="task"><span class="t-ico">'+k.avatar+'</span><div class="t-main grid grid-2">'+
  '<input value="'+esc(k.name)+'" onchange="updUser(\''+k.id+'\',\'name\',this.value)">'+
  '<input value="'+esc(k.grade||"")+'" placeholder="Grade" onchange="updUser(\''+k.id+'\',\'grade\',this.value)">'+
  '<input type="number" value="'+(k.age||"")+'" placeholder="Age" onchange="updUser(\''+k.id+'\',\'age\',this.value)">'+
  '<input value="'+esc(k.pin)+'" maxlength="4" placeholder="PIN" onchange="updUser(\''+k.id+'\',\'pin\',this.value)">'+
 '</div><button class="btn btn-sm btn-danger" onclick="delKid(\''+k.id+'\')">Remove</button></div>';}).join("")+
 '<br><form onsubmit="addKidSubmit(event)" class="row"><input name="name" placeholder="Child name" required style="flex:2;min-width:120px"><input name="age" type="number" placeholder="Age" style="flex:1;min-width:70px"><input name="grade" placeholder="Grade" style="flex:1;min-width:90px"><input name="pin" placeholder="4-digit PIN" maxlength="4" pattern="[0-9]{4}" required style="flex:1;min-width:110px"><button class="btn btn-sm">＋ Add child</button></form></div>'+
 '<div class="card"><h2>🔑 Parent PINs</h2>'+parents.map(function(u){return '<div class="row" style="margin-bottom:8px"><span style="flex:1">'+u.avatar+' '+esc(u.name)+'</span><input value="'+esc(u.pin)+'" maxlength="4" style="width:110px" onchange="updUser(\''+u.id+'\',\'pin\',this.value)"></div>';}).join("")+'</div>'+
 '<div class="card"><h2>🕔 Daily structure (prayer-time slots)</h2>'+st.prayerSlots.map(function(s,i){return '<div class="row" style="margin-bottom:8px"><input value="'+esc(s.name)+'" style="flex:1;min-width:110px" onchange="updSlot('+i+',\'name\',this.value)"><input value="'+esc(s.desc)+'" style="flex:2;min-width:150px" onchange="updSlot('+i+',\'desc\',this.value)"><button class="btn btn-sm btn-danger" onclick="delSlot('+i+')">✕</button></div>';}).join("")+'<button class="btn btn-soft btn-sm" onclick="addSlot()">＋ Add slot</button></div>'+
 '<div class="card"><h2>🎁 Rewards</h2><label>Streak goal (days)<input type="number" min="1" value="'+st.rewards.streakGoal+'" onchange="updReward(\'streakGoal\',this.value)"></label><br><label>Reward when the goal is reached<input value="'+esc(st.rewards.rewardNote)+'" onchange="updReward(\'rewardNote\',this.value)"></label></div>'+
 '<div class="card"><h2>🗄️ Data</h2><p class="muted">Restore the original demo data. This erases all changes.</p><br><button class="btn btn-danger" onclick="resetData()">Reset demo data</button></div>';
}
window.updUser=function(id,field,val){const u=userById(id);if(!u)return;u[field]=field==="age"?Number(val):String(val);Store.save();toast("Saved ✓");};
window.delKid=function(id){const u=userById(id);if(!u)return;if(!confirm("Remove "+u.name+" and all their data?"))return;Store.state.users=Store.state.users.filter(function(x){return x.id!==id;});Store.state.tasks=Store.state.tasks.filter(function(x){return x.childId!==id;});Store.state.books=Store.state.books.filter(function(x){return x.childId!==id;});delete Store.state.quran[id];delete Store.state.mastery[id];Store.save();App.render();};
window.addKidSubmit=function(ev){ev.preventDefault();const f=ev.target;const avatars=["👦","👧","🧒","👶"];Store.state.users.push({id:uid(),role:"student",name:f.name.value.trim(),age:Number(f.age.value)||null,grade:f.grade.value.trim(),avatar:avatars[Math.floor(Math.random()*avatars.length)],pin:f.pin.value});Store.save();toast("Child added ✓");App.render();};
window.updSlot=function(i,field,val){Store.state.settings.prayerSlots[i][field]=val;Store.save();toast("Saved ✓");};
window.addSlot=function(){Store.state.settings.prayerSlots.push({name:"New slot",desc:""});Store.save();App.render();};
window.delSlot=function(i){Store.state.settings.prayerSlots.splice(i,1);Store.save();App.render();};
window.updReward=function(field,val){Store.state.settings.rewards[field]=field==="streakGoal"?Number(val):val;Store.save();toast("Saved ✓");};
window.resetData=function(){if(!confirm("Reset ALL data back to the demo state?"))return;Store.reset();Auth.user=null;App.route=null;App.render();};

function renderReports(el){
 if(!kids().length){el.innerHTML='<p class="muted">No children yet — add one in Settings.</p>';return;}
 if(!window._rKid||!userById(window._rKid))window._rKid=kids()[0].id;
 const k=userById(window._rKid);
 let sum=0,cnt=0;for(let i=0;i<30;i++){const c=completion(todayStr(-i),k.id);if(c!==null){sum+=c;cnt++;}}
 const avg=cnt?Math.round(sum/cnt):0;
 const q=quranOf(k.id);
 const qRows=Object.keys(q).sort(function(a,b){return a-b;}).map(function(i){const full=q[i]>=SURAHS[i][1];return '<tr><td>'+(Number(i)+1)+'. '+esc(SURAHS[i][0])+'</td><td>'+q[i]+' / '+SURAHS[i][1]+' ayahs</td><td>'+(full?'<span class="tag tag-done">memorized</span>':'<span class="tag tag-taught">in progress</span>')+'</td></tr>';}).join("");
 const mTables=Object.keys(SKILLS).map(function(s){
  const rows=SKILLS[s].map(function(name,i){const l=skillLevel(k.id,s,i);return '<tr><td>'+esc(name)+'</td><td><span class="chip on-'+l+'">'+LEVELS[l]+'</span></td></tr>';}).join("");
  return '<h3>'+subj(s).icon+' '+subj(s).name+'</h3><table><tbody>'+rows+'</tbody></table><br>';
 }).join("");
 const bks=booksOf(k.id);
 el.innerHTML='<div class="row spread no-print"><h1>Progress Report</h1><button class="btn" onclick="window.print()">🖨️ Print</button></div>'+
 '<div class="no-print"><br><select onchange="window._rKid=this.value;App.render()">'+kids().map(function(x){return '<option value="'+x.id+'" '+(x.id===k.id?"selected":"")+'>'+x.avatar+' '+esc(x.name)+'</option>';}).join("")+'</select><br><br></div>'+
 '<div class="card"><h2>'+k.avatar+' '+esc(k.name)+'</h2><p class="muted">'+esc(k.grade||"")+' · Age '+(k.age||"–")+' · Report date: '+fmtDate(todayStr())+'</p><br><div class="grid grid-stats">'+
 '<div class="stat"><div class="big">'+avg+'%</div><div class="lbl">30-day completion</div></div>'+
 '<div class="stat"><div class="big">'+surahsDone(k.id)+'</div><div class="lbl">Surahs memorized</div></div>'+
 '<div class="stat"><div class="big">'+masteredCount(k.id)+'</div><div class="lbl">Skills mastered</div></div>'+
 '<div class="stat"><div class="big">'+finishedBooks(k.id)+'</div><div class="lbl">Books finished</div></div></div></div>'+
 '<div class="card"><h2>📖 Quran memorization</h2>'+(qRows?'<table><thead><tr><th>Surah</th><th>Progress</th><th>Status</th></tr></thead><tbody>'+qRows+'</tbody></table>':'<p class="muted">Not started yet.</p>')+'</div>'+
 '<div class="card"><h2>🎯 Skill mastery (IXL-style)</h2>'+mTables+'</div>'+
 '<div class="card"><h2>📚 Reading log</h2>'+(bks.length?'<table><thead><tr><th>Book</th><th>Status</th><th>Rating</th></tr></thead><tbody>'+bks.map(function(b){return '<tr><td>'+esc(b.title)+'</td><td>'+b.status+'</td><td>'+(b.rating?"★".repeat(b.rating):"–")+'</td></tr>';}).join("")+'</tbody></table>':'<p class="muted">No books logged.</p>')+'</div>'+
 '<div class="card"><h2>🏅 Badges earned</h2><div class="row">'+(earnedBadges(k.id).map(function(b){return '<span class="chip on-3">'+b.icon+' '+b.name+'</span>';}).join(" ")||'<span class="muted">None yet.</span>')+'</div></div>';
}
