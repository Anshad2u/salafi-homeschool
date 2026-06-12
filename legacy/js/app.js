// ── App shell: router, nav, toast, confetti ────────────────────────────
const VIEWS={dashboard:renderAdminDashboard,planning:renderPlanning,reports:renderReports,settings:renderSettings,today:renderTeacherToday,quran:renderQuran,skills:renderSkills,reading:renderReading,myday:renderKidDay,stars:renderKidStars};
const NAVS={
 admin:[["dashboard","📊","Dashboard"],["planning","🗓️","Planning"],["reports","📑","Reports"],["settings","⚙️","Settings"]],
 teacher:[["today","☀️","Today"],["quran","📖","Quran"],["skills","🎯","Skills"],["reading","📚","Reading"]],
 student:[["myday","☀️","My Day"],["stars","⭐","My Stars"]]
};
const App={
 route:null,
 go(r){this.route=r;this.render();},
 render(){
  const el=document.getElementById("app");
  if(!Auth.user){document.body.dataset.theme="login";renderLogin(el);return;}
  const role=Auth.user.role;
  document.body.dataset.theme=role;
  const nav=NAVS[role];
  if(!this.route||!nav.some(function(n){return n[0]===App.route;}))this.route=nav[0][0];
  let navHtml='';
  nav.forEach(function(n){navHtml+='<button class="nav-btn '+(n[0]===App.route?"active":"")+'" onclick="App.go(\''+n[0]+'\')"><span class="nav-ico">'+n[1]+'</span><span>'+n[2]+'</span></button>';});
  el.innerHTML='<header class="topbar"><div class="topbar-inner"><div class="brand">🕌 <span>Salafi Homeschool</span></div><div class="userbox"><span class="avatar">'+Auth.user.avatar+'</span><span class="uname">'+esc(Auth.user.name)+'</span><button class="btn btn-ghost btn-sm" onclick="Auth.logout()">Logout</button></div></div></header>'+
  '<nav class="navbar no-print">'+navHtml+'</nav>'+
  '<main id="main" class="container"></main>';
  VIEWS[this.route](document.getElementById("main"));
 }
};
function toast(msg){const d=document.createElement("div");d.className="toast";d.textContent=msg;document.body.appendChild(d);setTimeout(function(){d.remove();},1600);}
function celebrate(){
 const colors=["#f59e0b","#22c55e","#3b82f6","#ec4899","#8b5cf6","#ef4444"];
 for(let i=0;i<26;i++){
  const p=document.createElement("div");p.className="confetti";
  p.style.left=Math.random()*100+"vw";p.style.background=colors[i%colors.length];p.style.animationDelay=(Math.random()*0.3)+"s";
  document.body.appendChild(p);setTimeout(function(){p.remove();},1900);
 }
}
Store.load();
Auth.init();
App.render();
