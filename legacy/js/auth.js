// ── Role-based login with kid-friendly PIN pad ──────────────────────
const Auth={
 user:null,
 init(){const id=sessionStorage.getItem("shs-user");if(id)this.user=userById(id)||null;},
 login(u){this.user=u;sessionStorage.setItem("shs-user",u.id);},
 logout(){this.user=null;sessionStorage.removeItem("shs-user");App.route=null;App.render();}
};
let _loginSel=null,_pinBuf="";
function renderLogin(el){
 const roleLabel={admin:"Admin · Father",teacher:"Teacher · Mother",student:"Student"};
 el.innerHTML='<div class="login-wrap">'+
  '<div class="login-hero"><div class="login-logo">🕌</div><h1>Salafi Homeschool</h1><p class="muted">Bismillah — who is signing in today?</p></div>'+
  '<div class="user-grid">'+Store.state.users.map(function(u){
    return '<button class="user-card role-'+u.role+'" onclick="pickUser(\''+u.id+'\')"><span class="user-avatar">'+u.avatar+'</span><span class="user-name">'+esc(u.name)+'</span><span class="user-role">'+roleLabel[u.role]+(u.grade?" · "+esc(u.grade):"")+'</span></button>';
  }).join("")+'</div>'+
  (_loginSel?renderPinPad():"")+
  '</div>';
}
function renderPinPad(){
 const u=userById(_loginSel);
 const dots='<div class="pin-dots">'+[0,1,2,3].map(function(i){return '<span class="pin-dot '+(i<_pinBuf.length?"on":"")+'"></span>';}).join("")+'</div>';
 const keys=[1,2,3,4,5,6,7,8,9,"⌫",0,"✕"];
 return '<div class="pin-overlay" id="pinOverlay"><div class="pin-box">'+
  '<div class="pin-head"><span class="user-avatar">'+u.avatar+'</span><strong>'+esc(u.name)+'</strong><p class="muted">Enter your 4-digit PIN</p></div>'+dots+
  '<div class="pinpad">'+keys.map(function(k){return '<button class="pin-key" onclick="pinKey(\''+k+'\')">'+k+'</button>';}).join("")+'</div>'+
  '</div></div>';
}
function pickUser(id){_loginSel=id;_pinBuf="";App.render();}
function pinKey(k){
 if(k==="✕"){_loginSel=null;_pinBuf="";App.render();return;}
 if(k==="⌫"){_pinBuf=_pinBuf.slice(0,-1);App.render();return;}
 if(_pinBuf.length>=4)return;
 _pinBuf+=k;
 if(_pinBuf.length===4){
  const u=userById(_loginSel);
  if(u&&u.pin===_pinBuf){_loginSel=null;_pinBuf="";Auth.login(u);App.render();return;}
  _pinBuf="";App.render();
  const box=document.querySelector(".pin-box");if(box){box.classList.add("shake");setTimeout(function(){box.classList.remove("shake");},500);}
  return;
 }
 App.render();
}
