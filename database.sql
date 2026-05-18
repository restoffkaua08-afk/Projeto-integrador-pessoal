// ESMERALD - script.js
// Arquivo responsável pelas funcionalidades do sistema:
// banco de armas em JavaScript, login/cadastro local, construtor de loadout, gráfico, ranking, carrossel e salvamento no navegador.

// =====================================================================
    // BANCO DE ARMAS (TODAS AS ARMAS OFICIAIS DO WARZONE BO6/BO7)
    // AS PRIMEIRAS 12 ARMAS SÃO AS NOVAS SOLICITADAS (TOP DO META)
    // DENTRO DE CADA ARMA, SUBSTITUA A URL DA IMAGEM EM "image"
    // =====================================================================
    const weaponsDB = [
      // ========== NOVAS ARMAS (META ATUAL) - COLOQUE SUAS IMAGENS AQUI ==========
      { id:0, name:"MK35 ISR", category:"Fuzil Assalto", baseDmg:43, fireRate:680, baseMob:68, baseAcc:89, recoil:74, usage:38.4, winRate:56.3, 
        image:"https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603373_myYg5WDPyja669cX4gMLRO7FdxxhbPtS.jpg", 
        attachments:{ muzzle:["Monolithic Suppressor","Compensator","Flash Hider"], barrel:["LongShot Barrel","Precision Barrel","Factory"], underbarrel:["FTAC Ripper","Commando","Ranger"], mag:["40 Round","45 Round","50 Drum"], optic:["VLK 4x","Aim Op","Cronen"] }, statMods:{ muzzle:{"Monolithic Suppressor":{damage:2,mobility:-1}}, barrel:{"LongShot Barrel":{damage:3,mobility:-2}}, underbarrel:{"FTAC Ripper":{accuracy:4}}, mag:{"40 Round":{mobility:-1}} } },
      { id:1, name:"Peacekeeper Mk1", category:"Fuzil Assalto", baseDmg:41, fireRate:720, baseMob:74, baseAcc:87, recoil:72, usage:34.1, winRate:54.2, 
        image:"https://t3.ftcdn.net/jpg/06/10/02/84/360_F_610028426_rb5JCwgkZucqtLNLod4BCRrOLLSAnA9u.jpg", 
        attachments:{ muzzle:["Monolithic","Compensator"], barrel:["Prolite","Task Force"], underbarrel:["Merc","Commando"], mag:["40 Round","50 Drum"], optic:["Micro Reflex","Red Dot"] }, statMods:{} },
      { id:2, name:"Voyak KT-3", category:"Fuzil Assalto", baseDmg:42, fireRate:700, baseMob:70, baseAcc:86, recoil:75, usage:31.8, winRate:53.7, 
        image:"https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603356_YdbRu1rIdBdIvS2D5DigkeQU8YspIHlT.jpg", 
        attachments:{ muzzle:["Silenciador","Break"], barrel:["KAS-10","Precision"], underbarrel:["Guard","Ranger"], mag:["40 Mags","50 Drum"], optic:["Holotherm","VLK"] }, statMods:{} },
      { id:3, name:"VST", category:"Submetralhadora", baseDmg:35, fireRate:960, baseMob:95, baseAcc:82, recoil:69, usage:33.2, winRate:54.9, 
        image:"https://t3.ftcdn.net/jpg/06/93/57/14/360_F_693571489_k8HHi7Owa04ijypL2Dj3qHoUg10Vjt4I.jpg", 
        attachments:{ muzzle:["Supressor","Flash"], barrel:["Rapid Fire","Short"], underbarrel:["Merc","Guard"], mag:["50 Drum","40 Mags"], optic:["Micro Reflex","Red Dot"] }, statMods:{} },
      { id:4, name:"Razor 9mm", category:"Submetralhadora", baseDmg:36, fireRate:940, baseMob:96, baseAcc:83, recoil:70, usage:32.5, winRate:54.1, 
        image:"https://t3.ftcdn.net/jpg/05/36/36/68/360_F_536366823_XcGr4cJ2FTl4hTZq4fOH2g3cMmZxx2tV.jpg", 
        attachments:{ muzzle:["Monolithic","Compensator"], barrel:["Stabilizer","Short"], underbarrel:["FTAC","Ranger"], mag:["40 Mags","50 Drum"], optic:["Cronen","Red Dot"] }, statMods:{} },
      { id:5, name:"Kogot-7", category:"Submetralhadora", baseDmg:34, fireRate:970, baseMob:97, baseAcc:81, recoil:68, usage:30.8, winRate:53.4, 
        image:"https://t3.ftcdn.net/jpg/11/63/70/32/360_F_1163703261_2Dqx3XnVNUmbGdSbS6h8pvvCjTTS6T6R.jpg", 
        attachments:{ muzzle:["Supressor","Flash"], barrel:["Rapid","Stabilized"], underbarrel:["Merc","Guard"], mag:["50 Drum","30 Mags"], optic:["Micro","Red Dot"] }, statMods:{} },
      { id:6, name:"Dravec 45", category:"Submetralhadora", baseDmg:37, fireRate:890, baseMob:91, baseAcc:84, recoil:72, usage:29.4, winRate:52.9, 
        image:"https://t3.ftcdn.net/jpg/06/35/91/98/360_F_635919818_eRo1Iie9KQlPJSK0HvMp96p4wCmUKkiW.jpg", 
        attachments:{ muzzle:["Compensator","Flash"], barrel:["Long","Short"], underbarrel:["Ranger","Guard"], mag:["45 Mags","50 Drum"], optic:["Reflex","Red Dot"] }, statMods:{} },
      { id:7, name:"Hawker HX", category:"Fuzil Precisão", baseDmg:99, fireRate:45, baseMob:43, baseAcc:96, recoil:86, usage:25.3, winRate:60.1, 
        image:"https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603373_myYg5WDPyja669cX4gMLRO7FdxxhbPtS.jpg", 
        attachments:{ muzzle:["Silenciador","Break"], barrel:["FJX 22\"","Factory"], underbarrel:["Bipod","None"], mag:["Explosive","High Velocity"], optic:["Thermal","Sniper Scope"] }, statMods:{} },
      { id:8, name:"Strider 300", category:"Fuzil Precisão", baseDmg:97, fireRate:50, baseMob:45, baseAcc:94, recoil:84, usage:23.7, winRate:58.6, 
        image:"https://t3.ftcdn.net/jpg/06/10/02/84/360_F_610028426_rb5JCwgkZucqtLNLod4BCRrOLLSAnA9u.jpg", 
        attachments:{ muzzle:["Silenciador","Monolithic"], barrel:["22\" OMX","Short"], underbarrel:["Ranger","Bipod"], mag:["5 Round","10 Round"], optic:["Raptor","Thermal"] }, statMods:{} },
      { id:9, name:"Velox 5.7", category:"Pistola", baseDmg:52, fireRate:320, baseMob:96, baseAcc:84, recoil:82, usage:18.5, winRate:48.2, 
        image:"https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603356_YdbRu1rIdBdIvS2D5DigkeQU8YspIHlT.jpg", 
        attachments:{ muzzle:["Monolithic","Compensator"], barrel:["Leve","Padrão"], underbarrel:["None"], mag:["15 Mags","30 Mags"], optic:["Mini","Red Dot"] }, statMods:{} },
      
      // ========== ARMAS LEGADO (MANTER COMO ESTÃO) ==========
      { id:10, name:"TAQ-56", category:"Fuzil Assalto", baseDmg:41, fireRate:710, baseMob:72, baseAcc:86, recoil:72, usage:34.2, winRate:54.8, 
        image:"https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603373_myYg5WDPyja669cX4gMLRO7FdxxhbPtS.jpg", 
        attachments:{ muzzle:["Monolithic Suppressor","Compensator","Flash Hider"], barrel:["Prolite Barrel","LongShot Barrel","18\" Precision"], underbarrel:["FTAC Ripper","Commando","Merc"], mag:["40 Round","45 Round","60 Drum"], optic:["Aim Op","VLK 4x","Cronen"] }, 
        statMods:{ muzzle:{"Monolithic Suppressor":{damage:2,mobility:-1},"Compensator":{recoilControl:4}}, barrel:{"Prolite Barrel":{accuracy:4,mobility:1},"LongShot Barrel":{damage:2,mobility:-2}}, underbarrel:{"FTAC Ripper":{accuracy:3},"Commando":{recoilControl:4}}, mag:{"40 Round":{mobility:-1},"45 Round":{mobility:-2}} } 
      },
      { id:11, name:"ISO HAVOC", category:"Submetralhadora", baseDmg:34, fireRate:980, baseMob:94, baseAcc:81, recoil:68, usage:29.5, winRate:53.2, 
        image:"https://t3.ftcdn.net/jpg/11/63/70/32/360_F_1163703261_2Dqx3XnVNUmbGdSbS6h8pvvCjTTS6T6R.jpg", 
        attachments:{ muzzle:["Supressor","Flash Hider","Compensator"], barrel:["Rapid Fire","Stabilizer","Short"], underbarrel:["Merc","Guard","Ranger"], mag:["50 Drum","40 Mags","30 Mags"], optic:["Micro Reflex","Red Dot","Holographic"] }, statMods:{} 
      },
      { id:12, name:"FJX Imperium", category:"Fuzil Precisão", baseDmg:98, fireRate:48, baseMob:44, baseAcc:95, recoil:85, usage:24.1, winRate:59.1, 
        image:"https://t3.ftcdn.net/jpg/06/93/57/14/360_F_693571489_k8HHi7Owa04ijypL2Dj3qHoUg10Vjt4I.jpg", 
        attachments:{ muzzle:["Silenciador","Break","Monolithic"], barrel:["FJX 22\"","Factory","Short"], underbarrel:["Bipod","None","Ranger"], mag:["Explosive","Standard","High Velocity"], optic:["Thermal","Sniper Scope","Dual Zoom"] }, statMods:{} 
      }
    ];

    // =====================================================================
    // VARIÁVEIS GLOBAIS E LÓGICA DO SISTEMA (NÃO ALTERAR A MENOS QUE SAIBA)
    // =====================================================================
    let currentWeapon = weaponsDB[0];
    let selectedAttachments = { muzzle:"Monolithic Suppressor", barrel:"LongShot Barrel", underbarrel:"FTAC Ripper", mag:"40 Round", optic:"VLK 4x" };

// Reseta os acessórios para as primeiras opções compatíveis da arma atual.
// Isso evita bug ao trocar de arma pelo select ou pelo card do Arsenal.
function resetSelectedAttachments() {
  selectedAttachments = {
    muzzle: currentWeapon.attachments.muzzle[0],
    barrel: currentWeapon.attachments.barrel[0],
    underbarrel: currentWeapon.attachments.underbarrel[0],
    mag: currentWeapon.attachments.mag[0],
    optic: currentWeapon.attachments.optic[0]
  };
}
    // COMENTÁRIO: Dados salvos localmente no navegador. Em uma versão com backend, isso viraria banco de dados.
let savedLoadouts = JSON.parse(localStorage.getItem("esmerald_loadouts") || "[]");
    let users = JSON.parse(localStorage.getItem("esmerald_users") || "[]");
    let currentUser = localStorage.getItem("esmerald_user") || null;
    let radarChart = null;
    let bannerInterval;

    // Exibe mensagens rápidas no canto da tela para confirmar ações do usuário.
function showToast(msg){ let t=document.createElement("div"); t.innerText=msg; t.style.cssText="position:fixed; bottom:20px; right:20px; padding:10px 16px; background:#0a1922; border:1px solid #3b82f6; border-radius:12px; z-index:9999; font-size:0.8rem;"; document.body.appendChild(t); setTimeout(()=>t.remove(),2500); }
    // Atualiza o botão de login ou mostra o usuário logado no menu.
function updateAuthUI(){ let c=document.getElementById("authContainer"); if(!c) return; if(currentUser){ c.innerHTML=`<div class="user-badge"><span>${currentUser}</span> <button id="logoutBtn" class="btn-outline" style="padding:0.2rem 0.8rem;">SAIR</button></div>`; document.getElementById("logoutBtn")?.addEventListener("click",()=>{ currentUser=null; localStorage.removeItem("esmerald_user"); updateAuthUI(); renderSavedLoadouts(); showToast("Logout efetuado"); }); } else { c.innerHTML=`<button id="showAuthModalBtn" class="btn-outline" style="padding:0.4rem 1rem;">ENTRAR</button>`; document.getElementById("showAuthModalBtn")?.addEventListener("click",()=>openAuthModal()); } }
    function openAuthModal(){ document.getElementById("authModal").style.display="flex"; }
    function closeAuthModal(){ document.getElementById("authModal").style.display="none"; }
    document.getElementById("showLoginBtn")?.addEventListener("click",()=>{ document.getElementById("loginForm").style.display="block"; document.getElementById("signupForm").style.display="none"; });
    document.getElementById("showSignupBtn")?.addEventListener("click",()=>{ document.getElementById("loginForm").style.display="none"; document.getElementById("signupForm").style.display="block"; });
    document.getElementById("doLoginBtn")?.addEventListener("click",()=>{ let e=document.getElementById("loginEmail").value, p=document.getElementById("loginPassword").value; let u=users.find(u=>u.email===e && u.password===p); if(u){ currentUser=u.name; localStorage.setItem("esmerald_user",currentUser); updateAuthUI(); renderSavedLoadouts(); closeAuthModal(); showToast(`Bem-vindo, ${currentUser}`); } else showToast("Email ou senha inválidos"); });
    document.getElementById("doSignupBtn")?.addEventListener("click",()=>{ let n=document.getElementById("signupName").value, e=document.getElementById("signupEmail").value, p=document.getElementById("signupPassword").value; if(!n||!e||!p){ showToast("Preencha todos os campos"); return; } if(users.find(u=>u.email===e)){ showToast("Email já cadastrado"); return; } users.push({name:n,email:e,password:p}); localStorage.setItem("esmerald_users",JSON.stringify(users)); currentUser=n; localStorage.setItem("esmerald_user",currentUser); updateAuthUI(); renderSavedLoadouts(); closeAuthModal(); showToast(`Conta criada! Bem-vindo, ${n}`); });
    document.getElementById("closeModalBtn")?.addEventListener("click",closeAuthModal);

    // Calcula os atributos finais da arma e atualiza os cards + gráfico radar.
function updateBuilderStats(){ let b=currentWeapon, dDmg=0,dMob=0,dAcc=0; Object.keys(selectedAttachments).forEach(s=>{ let a=selectedAttachments[s]; if(b.statMods[s]&&b.statMods[s][a]){ let m=b.statMods[s][a]; dDmg+=m.damage||0; dMob+=m.mobility||0; dAcc+=m.accuracy||0; } }); let fD=Math.max(20,b.baseDmg+dDmg), fM=Math.max(30,b.baseMob+dMob), fA=Math.min(100,b.baseAcc+dAcc); document.getElementById("statComparison").innerHTML=`<div class="stat-badge">DANO<br><strong style="font-size:1.8rem;">${fD}</strong></div><div class="stat-badge">MOBILIDADE<br><strong style="font-size:1.8rem;">${fM}</strong></div><div class="stat-badge">PRECISÃO<br><strong style="font-size:1.8rem;">${fA}</strong></div>`; if(radarChart) radarChart.destroy(); let ctx=document.getElementById("radarBuilderCanvas").getContext("2d"); radarChart=new Chart(ctx,{ type:'radar', data:{ labels:['Dano','Mobilidade','Precisão','Controle'], datasets:[{ label:b.name, data:[fD,fM,fA,b.recoil], backgroundColor:'rgba(59,130,246,0.2)', borderColor:'#3b82f6', borderWidth:2 }] }, options:{ scales:{ r:{ min:0,max:100,ticks:{color:'#94a3b8'} } } } }); let code=`${b.name.substring(0,3)}-${selectedAttachments.barrel.substring(0,4)}-${Math.floor(100+Math.random()*900)}`; document.getElementById("buildCodeDisplay").innerHTML=`BUILD CODE: ${code} <button id="copyBuildCode" class="btn-outline" style="margin-left:8px;">COPIAR</button>`; document.getElementById("copyBuildCode")?.addEventListener("click",()=>{ navigator.clipboard.writeText(code); showToast("Código copiado"); }); }
    // Monta os selects de acessórios de acordo com a arma selecionada.
function renderAttachments(){ let c=document.getElementById("attachmentList"); if(!c) return; let slots=["muzzle","barrel","underbarrel","mag","optic"]; c.innerHTML=slots.map(s=>`<div class="attach-slot"><label>${s.toUpperCase()}</label><select id="select_${s}">${currentWeapon.attachments[s].map(opt=>`<option value="${opt}" ${selectedAttachments[s]===opt?'selected':''}>${opt}</option>`).join('')}</select></div>`).join(''); slots.forEach(s=>{ document.getElementById(`select_${s}`).addEventListener("change",(e)=>{ selectedAttachments[s]=e.target.value; updateBuilderStats(); }); }); updateBuilderStats(); }
    // Cria os cards de armas que aparecem na seção Arsenal.
function renderArsenal(){ let c=document.getElementById("arsenalGrid"); if(c) c.innerHTML=weaponsDB.map(w=>`<div class="weapon-card" onclick="selectWeaponForBuilder('${w.name}')"><img src="${w.image}"><h3>${w.name}</h3><p>${w.category}</p><div style="color:#60a5fa;">${w.usage}% uso · ${w.winRate}% vitória</div></div>`).join(''); }
    window.selectWeaponForBuilder=function(name){
  let w=weaponsDB.find(w=>w.name===name);
  if(w){
    currentWeapon=w;
    resetSelectedAttachments();
    let select=document.getElementById("weaponSelectBuilder");
    if(select) select.value=currentWeapon.name;
    renderAttachments();
    document.getElementById("builder-section").scrollIntoView({behavior:"smooth"});
    showToast(`${w.name} carregado no construtor`);
  }
};
    // Ordena as armas pela taxa de uso e monta a tabela de ranking.
function renderRanking(){ let c=document.getElementById("rankingDashboard"); if(!c) return; let sorted=[...weaponsDB].sort((a,b)=>b.usage-a.usage); c.innerHTML=`<div class="ranking-header"><div>ARMA</div><div>USO</div><div>VITÓRIA</div><div>TREND</div></div>`+sorted.map((w,idx)=>`<div class="ranking-row"><div><span style="color:#fbbf24; font-weight:800;">#${idx+1}</span> <img src="${w.image}" class="rank-img"> ${w.name}</div><div><div style="background:#1f3a4b; border-radius:20px; height:6px; width:100px;"><div style="width:${w.usage}%; background:#3b82f6; height:6px; border-radius:20px;"></div></div> ${w.usage}%</div><div>${w.winRate}%</div><div class="trend-up" style="color:#10b981;">▲ +${(Math.random()*2).toFixed(1)}%</div></div>`).join(''); }
    // Salva o loadout atual no LocalStorage. Precisa estar logado.
function saveCurrentLoadout(){ if(!currentUser){ showToast("Faça login para salvar loadouts"); openAuthModal(); return; } let name=prompt("Nome do loadout:"); if(!name) return; savedLoadouts.push({ id:Date.now(), name, user:currentUser, weaponName:currentWeapon.name, buildCode: document.getElementById("buildCodeDisplay")?.innerText?.split("BUILD CODE:")[1]?.trim()||"COD" }); localStorage.setItem("esmerald_loadouts",JSON.stringify(savedLoadouts)); showToast("Loadout salvo"); renderSavedLoadouts(); }
    // Mostra os loadouts salvos pelo usuário logado.
function renderSavedLoadouts(){ let c=document.getElementById("savedLoadoutsContainer"); if(!c) return; let userLoadouts=savedLoadouts.filter(l=>l.user===currentUser); if(userLoadouts.length===0){ c.innerHTML="<div class='glass' style='padding:1.5rem; text-align:center;'>Nenhum loadout salvo ainda. Use o construtor e clique em SALVAR.</div>"; return; } c.innerHTML=userLoadouts.map(ld=>`<div style="background:#071e2c; padding:1rem; border-radius:20px; margin-bottom:0.8rem; display:flex; justify-content:space-between; align-items:center;"><div><strong>${ld.name}</strong><br>${ld.weaponName} · <code>${ld.buildCode}</code></div><button class="deleteLoadout btn-outline" data-id="${ld.id}" style="border-color:#ef4444; color:#ef4444;">REMOVER</button></div>`).join(''); document.querySelectorAll(".deleteLoadout").forEach(btn=>{ btn.addEventListener("click",(e)=>{ let id=parseInt(btn.dataset.id); savedLoadouts=savedLoadouts.filter(l=>l.id!==id); localStorage.setItem("esmerald_loadouts",JSON.stringify(savedLoadouts)); renderSavedLoadouts(); showToast("Loadout removido"); }); }); }
    document.getElementById("saveLoadoutBtn")?.addEventListener("click",saveCurrentLoadout);
    document.getElementById("clearAllLoadouts")?.addEventListener("click",()=>{ if(confirm("Limpar todos os loadouts?")){ savedLoadouts=savedLoadouts.filter(l=>l.user!==currentUser); localStorage.setItem("esmerald_loadouts",JSON.stringify(savedLoadouts)); renderSavedLoadouts(); showToast("Todos os loadouts foram removidos"); } });

    let bannerIdx=0, track=document.getElementById("bannerTrack");
    // Controla o deslocamento visual do carrossel de banners.
function updateBanner(){ if(track) track.style.transform=`translateX(-${bannerIdx*100}%)`; }
    function nextBanner(){ bannerIdx=(bannerIdx+1)%3; updateBanner(); }
    function prevBanner(){ bannerIdx=(bannerIdx-1+3)%3; updateBanner(); }
    document.getElementById("bannerNext")?.addEventListener("click",nextBanner);
    document.getElementById("bannerPrev")?.addEventListener("click",prevBanner);
    bannerInterval=setInterval(nextBanner,5500);

    setInterval(()=>{ let u=document.getElementById("liveUsage"), w=document.getElementById("liveWin"), t=document.getElementById("liveTrend"); if(u&&w&&t){ u.innerText=(parseFloat(u.innerText)+(Math.random()*0.6-0.3)).toFixed(1); w.innerText=(parseFloat(w.innerText)+(Math.random()*0.4-0.2)).toFixed(1); t.innerText="+"+(Math.random()*2+0.5).toFixed(1); } },3500);

    // Faz a rolagem suave para as seções ao clicar no menu.
function scrollToSection(id){ document.getElementById(id).scrollIntoView({ behavior:"smooth", block:"start" }); }
    document.querySelectorAll(".nav-section").forEach(link=>{ link.addEventListener("click",(e)=>{ e.preventDefault(); let sec=link.getAttribute("data-section"); if(sec==="home") scrollToSection("home-section"); else if(sec==="dashboard") scrollToSection("dashboard-section"); else if(sec==="arsenal") scrollToSection("arsenal-section"); else if(sec==="builder") scrollToSection("builder-section"); else if(sec==="ranking") scrollToSection("ranking-section"); else if(sec==="saved") scrollToSection("saved-section"); document.querySelectorAll(".nav-section").forEach(l=>l.classList.remove("active")); link.classList.add("active"); }); });
    document.getElementById("heroBuilderBtn")?.addEventListener("click",()=>scrollToSection("builder-section"));
    document.getElementById("goToDashboardBtn")?.addEventListener("click",()=>scrollToSection("dashboard-section"));
    document.getElementById("menuToggle")?.addEventListener("click",()=>document.getElementById("navLinks").classList.toggle("active"));

    let ws=document.getElementById("weaponSelectBuilder");
    if(ws){
  ws.innerHTML=weaponsDB.map(w=>`<option value="${w.name}" ${currentWeapon.name===w.name?'selected':''}>${w.name}</option>`).join('');
  ws.onchange=()=>{
    currentWeapon=weaponsDB.find(w=>w.name===ws.value);
    resetSelectedAttachments();
    renderAttachments();
  };
}
    renderAttachments(); renderArsenal(); renderRanking(); renderSavedLoadouts(); updateAuthUI();
