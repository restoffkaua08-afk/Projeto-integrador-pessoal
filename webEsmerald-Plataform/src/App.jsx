import { useEffect, useMemo, useState } from "react";
import { carregarArmas } from "./services/api.js";

const imagens = [
  "https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603373_myYg5WDPyja669cX4gMLRO7FdxxhbPtS.jpg",
  "https://t3.ftcdn.net/jpg/06/10/02/84/360_F_610028426_rb5JCwgkZucqtLNLod4BCRrOLLSAnA9u.jpg",
  "https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603356_YdbRu1rIdBdIvS2D5DigkeQU8YspIHlT.jpg",
  "https://t3.ftcdn.net/jpg/06/93/57/14/360_F_693571489_k8HHi7Owa04ijypL2Dj3qHoUg10Vjt4I.jpg",
  "https://t3.ftcdn.net/jpg/05/36/36/68/360_F_536366823_XcGr4cJ2FTl4hTZq4fOH2g3cMmZxx2tV.jpg",
  "https://t3.ftcdn.net/jpg/11/63/70/32/360_F_1163703261_2Dqx3XnVNUmbGdSbS6h8pvvCjTTS6T6R.jpg"
];

const slots = [
  ["muzzle", "Boca"],
  ["barrel", "Cano"],
  ["underbarrel", "Acoplamento"],
  ["mag", "Carregador"],
  ["optic", "Mira"]
];

const anexosBase = {
  muzzle: ["Monolithic Suppressor", "Compensator", "Flash Hider"],
  barrel: ["LongShot Barrel", "Precision Barrel", "Factory"],
  underbarrel: ["FTAC Ripper", "Commando", "Ranger"],
  mag: ["40 Round", "45 Round", "50 Drum"],
  optic: ["VLK 4x", "Aim Op", "Cronen"]
};

const modsBase = {
  muzzle: {
    "Monolithic Suppressor": { damage: 2, mobility: -1 },
    "Compensator": { recoilControl: 4 },
    "Flash Hider": { accuracy: 1 }
  },
  barrel: {
    "LongShot Barrel": { damage: 3, mobility: -2 },
    "Precision Barrel": { accuracy: 4, recoilControl: 1 },
    "Factory": {}
  },
  underbarrel: {
    "FTAC Ripper": { accuracy: 4 },
    "Commando": { recoilControl: 4 },
    "Ranger": { recoilControl: 2, mobility: -1 }
  },
  mag: {
    "40 Round": { mobility: -1 },
    "45 Round": { mobility: -2 },
    "50 Drum": { mobility: -4, recoilControl: 1 }
  },
  optic: {
    "VLK 4x": { accuracy: 2 },
    "Aim Op": { accuracy: 1 },
    "Cronen": { accuracy: 1, recoilControl: 1 }
  }
};

const fallback = [
  ["MK35 ISR", "Fuzil Assalto", "Meta absoluto", 43, 680, 68, 89, 74, 38.4, 56.3],
  ["Peacekeeper Mk1", "Fuzil Assalto", "Alta", 41, 720, 74, 87, 72, 34.1, 54.2],
  ["Voyak KT-3", "Fuzil Assalto", "Alta", 42, 700, 70, 86, 75, 31.8, 53.7],
  ["VST", "Submetralhadora", "Alta", 35, 960, 95, 82, 69, 33.2, 54.9],
  ["Razor 9mm", "Submetralhadora", "Alta", 36, 940, 96, 83, 70, 32.5, 54.1],
  ["Kogot-7", "Submetralhadora", "Alta", 34, 970, 97, 81, 68, 30.8, 53.4],
  ["Dravec 45", "Submetralhadora", "Alta", 37, 890, 91, 84, 72, 29.4, 52.9],
  ["Hawker HX", "Fuzil Precisão", "Alta", 99, 45, 43, 96, 86, 25.3, 60.1],
  ["Strider 300", "Fuzil Precisão", "Estável", 97, 50, 45, 94, 84, 23.7, 58.6],
  ["Velox 5.7", "Pistola", "Estável", 52, 320, 96, 84, 82, 18.5, 48.2],
  ["TAQ-56", "Fuzil Assalto", "Alta", 41, 710, 72, 86, 72, 34.2, 54.8],
  ["ISO HAVOC", "Submetralhadora", "Alta", 34, 980, 94, 81, 68, 29.5, 53.2],
  ["FJX Imperium", "Fuzil Precisão", "Alta", 98, 48, 44, 95, 85, 24.1, 59.1]
].map((a, i) => ({
  id: i + 1,
  name: a[0],
  category: a[1],
  status: a[2],
  baseDmg: a[3],
  fireRate: a[4],
  baseMob: a[5],
  baseAcc: a[6],
  recoil: a[7],
  usage: a[8],
  winRate: a[9],
  image: imagens[i % imagens.length],
  attachments: anexosBase,
  statMods: modsBase
}));

const banners = [
  { title: "Meta competitivo", subtitle: "Armas, rankings, códigos e builds em uma interface tática.", image: imagens[0] },
  { title: "Construtor Gunsmith", subtitle: "Monte loadouts, compare atributos e copie o código final.", image: imagens[5] },
  { title: "Arquivo pessoal", subtitle: "Salve suas builds favoritas e recupere quando precisar.", image: imagens[4] }
];

function numero(valor, padrao) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : padrao;
}

function normalizar(arma, i) {
  const b = fallback[i % fallback.length];
  return {
    id: arma.id ?? b.id,
    name: arma.name ?? arma.nome ?? b.name,
    category: arma.category ?? arma.categoria ?? b.category,
    status: arma.status ?? arma.status_meta ?? b.status,
    baseDmg: numero(arma.baseDmg ?? arma.dano_base, b.baseDmg),
    fireRate: numero(arma.fireRate ?? arma.cadencia_tiro, b.fireRate),
    baseMob: numero(arma.baseMob ?? arma.mobilidade_base, b.baseMob),
    baseAcc: numero(arma.baseAcc ?? arma.precisao_base, b.baseAcc),
    recoil: numero(arma.recoil ?? arma.controle_recuo, b.recoil),
    usage: numero(arma.usage ?? arma.taxa_uso, b.usage),
    winRate: numero(arma.winRate ?? arma.taxa_vitoria, b.winRate),
    image: arma.image ?? arma.imagem_url ?? b.image,
    attachments: arma.attachments ?? anexosBase,
    statMods: arma.statMods ?? modsBase
  };
}

function iniciais(arma) {
  return Object.fromEntries(slots.map(([s]) => [s, arma.attachments?.[s]?.[0] || "None"]));
}

function clamp(v) {
  return Math.max(0, Math.min(100, Math.round(v)));
}

function calc(arma, anexos) {
  let damage = arma.baseDmg;
  let mobility = arma.baseMob;
  let accuracy = arma.baseAcc;
  let recoilControl = arma.recoil;

  Object.entries(anexos).forEach(([slot, nome]) => {
    const mod = arma.statMods?.[slot]?.[nome];
    if (!mod) return;
    damage += mod.damage || 0;
    mobility += mod.mobility || 0;
    accuracy += mod.accuracy || 0;
    recoilControl += mod.recoilControl || 0;
  });

  return { damage: clamp(damage), mobility: clamp(mobility), accuracy: clamp(accuracy), recoilControl: clamp(recoilControl) };
}

function codigo(arma, anexos) {
  const txt = `${arma.name}-${Object.values(anexos).join("-")}`;
  let h = 0;
  for (let i = 0; i < txt.length; i++) h = (h * 31 + txt.charCodeAt(i)) % 9999;
  return `${arma.name.replace(/[^a-z0-9]/gi, "").slice(0, 4).toUpperCase()}-${String(anexos.barrel || "BASE").replace(/[^a-z0-9]/gi, "").slice(0, 4).toUpperCase()}-${String(h).padStart(4, "0")}`;
}

function Radar({ stats }) {
  const linhas = [["Dano", stats.damage], ["Mobilidade", stats.mobility], ["Precisão", stats.accuracy], ["Controle", stats.recoilControl]];
  return (
    <div className="radar">
      <div className="score"><strong>{Math.round((stats.damage + stats.mobility + stats.accuracy + stats.recoilControl) / 4)}</strong><span>Score</span></div>
      {linhas.map(([n, v]) => <div className="bar" key={n}><div><strong>{n}</strong><span>{v}</span></div><i style={{ width: `${v}%` }} /></div>)}
    </div>
  );
}

export default function App() {
  const [armas, setArmas] = useState(fallback);
  const [arma, setArma] = useState(fallback[0]);
  const [anexos, setAnexos] = useState(iniciais(fallback[0]));
  const [menu, setMenu] = useState(false);
  const [secao, setSecao] = useState("home");
  const [banner, setBanner] = useState(0);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [auth, setAuth] = useState(false);
  const [authModo, setAuthModo] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [usuarios, setUsuarios] = useState(() => JSON.parse(localStorage.getItem("esmerald_users") || "[]"));
  const [usuario, setUsuario] = useState(() => localStorage.getItem("esmerald_user") || "");
  const [salvos, setSalvos] = useState(() => JSON.parse(localStorage.getItem("esmerald_loadouts") || "[]"));
  const [comparar, setComparar] = useState(null);

  useEffect(() => {
    carregarArmas()
      .then((dados) => {
        const lista = Array.isArray(dados?.weapons) && dados.weapons.length ? dados.weapons.map(normalizar) : fallback;
        setArmas(lista);
        setArma(lista[0]);
        setAnexos(iniciais(lista[0]));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBanner((v) => (v + 1) % banners.length), 5200);
    return () => clearInterval(t);
  }, []);

  function avisar(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2300);
  }

  function ir(id) {
    setSecao(id);
    setMenu(false);
    document.getElementById(`${id}-section`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function copiar(txt) {
    navigator.clipboard?.writeText(txt);
    avisar("Código copiado");
  }

  function escolher(a, mover = true) {
    if (!a) return;
    setArma(a);
    setAnexos(iniciais(a));
    setModal(null);
    if (mover) ir("builder");
    avisar(`${a.name} carregada`);
  }

  function criarConta() {
    if (!form.name || !form.email || !form.password) return avisar("Preencha todos os campos");
    if (usuarios.some((u) => u.email === form.email)) return avisar("Email já cadastrado");
    const prox = [...usuarios, { name: form.name, email: form.email, password: form.password }];
    setUsuarios(prox);
    localStorage.setItem("esmerald_users", JSON.stringify(prox));
    setUsuario(form.name);
    localStorage.setItem("esmerald_user", form.name);
    setAuth(false);
    avisar(`Bem-vindo, ${form.name}`);
  }

  function entrar() {
    const u = usuarios.find((x) => x.email === form.email && x.password === form.password);
    if (!u) return avisar("Email ou senha inválidos");
    setUsuario(u.name);
    localStorage.setItem("esmerald_user", u.name);
    setAuth(false);
    avisar(`Bem-vindo, ${u.name}`);
  }

  function sair() {
    setUsuario("");
    localStorage.removeItem("esmerald_user");
    avisar("Logout efetuado");
  }

  const stats = calc(arma, anexos);
  const cod = codigo(arma, anexos);
  const cats = useMemo(() => ["Todas", ...new Set(armas.map((a) => a.category))], [armas]);
  const filtradas = useMemo(() => armas.filter((a) => (categoria === "Todas" || a.category === categoria) && `${a.name} ${a.category} ${a.status}`.toLowerCase().includes(busca.toLowerCase())), [armas, categoria, busca]);
  const ranking = useMemo(() => [...armas].sort((a, b) => b.usage - a.usage), [armas]);
  const meus = salvos.filter((s) => s.user === usuario);

  function salvar() {
    if (!usuario) {
      setAuth(true);
      return avisar("Faça login para salvar loadouts");
    }
    const nome = prompt("Nome do loadout:");
    if (!nome) return;
    const item = { id: Date.now(), user: usuario, name: nome, weaponName: arma.name, weapon: arma, attachments: anexos, stats, code: cod };
    const prox = [...salvos, item];
    setSalvos(prox);
    localStorage.setItem("esmerald_loadouts", JSON.stringify(prox));
    avisar("Loadout salvo");
  }

  function remover(id) {
    const prox = salvos.filter((s) => s.id !== id);
    setSalvos(prox);
    localStorage.setItem("esmerald_loadouts", JSON.stringify(prox));
    avisar("Loadout removido");
  }

  function carregar(item) {
    const a = normalizar(item.weapon || arma, 0);
    setArma(a);
    setAnexos(item.attachments || iniciais(a));
    ir("builder");
    avisar("Loadout carregado");
  }

  function limpar() {
    const prox = salvos.filter((s) => s.user !== usuario);
    setSalvos(prox);
    localStorage.setItem("esmerald_loadouts", JSON.stringify(prox));
    setComparar(null);
    avisar("Arquivo limpo");
  }

  const links = [["home", "Início"], ["dashboard", "Comando"], ["arsenal", "Arsenal"], ["builder", "Construtor"], ["ranking", "Ranking"], ["saved", "Arquivo"]];

  return (
    <>
      <div className="bg" /><div className="orb orb-a" /><div className="orb orb-b" /><div className="orb orb-c" />

      <nav className="topbar"><div className="topbar-inner"><button className="hamburger" onClick={() => setMenu(true)}>☰</button><button className="brand" onClick={() => ir("home")}>ESMERALD</button><div className="top-actions">{usuario ? <div className="user-badge"><span>{usuario}</span><button onClick={sair}>Sair</button></div> : <button className="btn outline" onClick={() => setAuth(true)}>Entrar</button>}</div></div></nav>

      <aside className={`sidebar ${menu ? "open" : ""}`}><div className="sidebar-head"><strong>ESMERALD</strong><button onClick={() => setMenu(false)}>×</button></div><p>Warzone Competitive Hub</p><div className="side-links">{links.map(([id, label]) => <button key={id} className={secao === id ? "active" : ""} onClick={() => ir(id)}><span>{label}</span><i>›</i></button>)}</div><div className="side-code"><small>Build atual</small><strong>{cod}</strong><button onClick={() => copiar(cod)}>Copiar código</button></div></aside>
      {menu && <button className="overlay" onClick={() => setMenu(false)} />}

      <main>
        <section id="home-section" className="hero section"><div className="hero-copy panel"><span className="eyebrow">Warzone Competitive Hub</span><h1>Loadouts, meta e códigos de armamento.</h1><p>Analise armas, monte builds, compare atributos, copie códigos e salve loadouts em uma plataforma com visual de vitrine profissional.</p><div className="actions"><button className="btn primary" onClick={() => ir("arsenal")}>Ver arsenal</button><button className="btn outline" onClick={() => ir("builder")}>Montar loadout</button></div></div><div className="carousel panel"><div className="carousel-track" style={{ transform: `translateX(-${banner * 100}%)` }}>{banners.map((b) => <article className="slide" key={b.title}><img src={b.image} alt={b.title} /><div><span>Intel ativa</span><h2>{b.title}</h2><p>{b.subtitle}</p></div></article>)}</div><div className="carousel-buttons"><button onClick={() => setBanner((banner - 1 + banners.length) % banners.length)}>‹</button><button onClick={() => setBanner((banner + 1) % banners.length)}>›</button></div></div></section>

        <section className="stats"><article className="panel"><strong>{armas.length}</strong><span>Armas mapeadas</span></article><article className="panel"><strong>{ranking[0]?.usage.toFixed(1)}%</strong><span>Uso da líder</span></article><article className="panel"><strong>{ranking[0]?.winRate.toFixed(1)}%</strong><span>Taxa de vitória</span></article><article className="panel"><strong>{meus.length}</strong><span>Loadouts salvos</span></article></section>

        <section id="dashboard-section" className="section dashboard panel"><div><span className="eyebrow">Comando</span><h2>Intel de Campo</h2><p>Resumo do meta atual, com destaque para a arma mais usada e opção direta para montar uma build competitiva.</p><div className="mini-grid"><article><strong>{ranking[0]?.name}</strong><span>líder do meta</span></article><article><strong>{ranking[0]?.category}</strong><span>classe</span></article><article><strong>{ranking[0]?.status}</strong><span>status</span></article></div><button className="btn primary" onClick={() => escolher(ranking[0] || arma)}>Montar loadout da líder</button></div><div className="featured"><img src={ranking[0]?.image || arma.image} alt={ranking[0]?.name || arma.name} /><h3>{ranking[0]?.name}</h3><p>{ranking[0]?.usage.toFixed(1)}% uso · {ranking[0]?.winRate.toFixed(1)}% vitória</p></div></section>

        <section id="arsenal-section" className="section"><div className="section-head"><div><span className="eyebrow">Arsenal</span><h2>Cards de armamento</h2><p>Clique em abrir para ver detalhes ou copie o código direto pelo card.</p></div><div className="filters"><input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar arma..." /><select value={categoria} onChange={(e) => setCategoria(e.target.value)}>{cats.map((c) => <option key={c}>{c}</option>)}</select></div></div><div className="weapon-grid">{filtradas.map((a) => { const c = codigo(a, iniciais(a)); return <article className="weapon-card panel" key={a.id}><button className="weapon-img" onClick={() => setModal(a)}><img src={a.image} alt={a.name} /><span>{a.status}</span></button><div className="weapon-body"><small>{a.category}</small><h3>{a.name}</h3><div className="chips"><span>{a.usage.toFixed(1)}% uso</span><span>{a.winRate.toFixed(1)}% vitória</span></div><code>{c}</code><div className="actions"><button className="btn outline" onClick={() => setModal(a)}>Abrir</button><button className="btn primary" onClick={() => copiar(c)}>Copiar código</button></div></div></article>; })}</div></section>

        <section id="builder-section" className="section builder panel"><div><span className="eyebrow">Gunsmith</span><h2>Construtor de Loadout</h2><p>Configure acessórios, veja impacto nos atributos e gere um código único da build.</p><label className="field"><span>Arma</span><select value={arma.name} onChange={(e) => escolher(armas.find((a) => a.name === e.target.value), false)}>{armas.map((a) => <option key={a.id}>{a.name}</option>)}</select></label><div className="slot-grid">{slots.map(([slot, label]) => <label className="field slot-field" key={slot}><span>{label}</span><select value={anexos[slot] || ""} onChange={(e) => setAnexos({ ...anexos, [slot]: e.target.value })}>{(arma.attachments?.[slot] || ["None"]).map((a) => <option key={a}>{a}</option>)}</select></label>)}</div><div className="code-box"><span>Código do armamento</span><strong>{cod}</strong><button className="btn primary" onClick={() => copiar(cod)}>Copiar código</button><button className="btn outline" onClick={salvar}>Salvar loadout</button></div></div><div><div className="preview"><img src={arma.image} alt={arma.name} /><div><small>{arma.category}</small><h3>{arma.name}</h3><p>{arma.status}</p></div></div><Radar stats={stats} />{comparar && <div className="compare"><span className="eyebrow">Comparação</span><h3>{comparar.name}</h3><div className="compare-grid"><article><span>Dano</span><strong>{comparar.stats.damage} → {stats.damage}</strong></article><article><span>Mobilidade</span><strong>{comparar.stats.mobility} → {stats.mobility}</strong></article><article><span>Precisão</span><strong>{comparar.stats.accuracy} → {stats.accuracy}</strong></article><article><span>Controle</span><strong>{comparar.stats.recoilControl} → {stats.recoilControl}</strong></article></div></div>}</div></section>

        <section id="ranking-section" className="section ranking panel"><div className="section-head"><div><span className="eyebrow">Ranking</span><h2>Meta Ranking</h2><p>Ordenado por taxa de uso, com vitória e status competitivo.</p></div></div><div className="ranking-list">{ranking.map((a, i) => <article className="rank-row" key={a.id}><div className="rank-name"><strong>#{i + 1}</strong><img src={a.image} alt={a.name} /><div><span>{a.name}</span><small>{a.category}</small></div></div><div><strong>{a.usage.toFixed(1)}%</strong><span>uso</span></div><div><strong>{a.winRate.toFixed(1)}%</strong><span>vitória</span></div><div><strong>{a.status}</strong><span>status</span></div><button className="btn outline" onClick={() => escolher(a)}>Montar</button></article>)}</div></section>

        <section id="saved-section" className="section saved panel"><div className="section-head"><div><span className="eyebrow">Arquivo</span><h2>Loadouts salvos</h2><p>Copie, carregue, compare ou remova suas builds salvas.</p></div><button className="btn danger" onClick={limpar}>Limpar meus loadouts</button></div>{!usuario ? <div className="empty"><h3>Entre para salvar loadouts</h3><button className="btn primary" onClick={() => setAuth(true)}>Entrar</button></div> : meus.length === 0 ? <div className="empty"><h3>Nenhum loadout salvo</h3><p>Monte uma build no construtor e clique em salvar.</p></div> : <div className="saved-grid">{meus.map((item) => <article className="saved-card" key={item.id}><small>{item.weaponName}</small><h3>{item.name}</h3><code>{item.code}</code><div className="saved-actions"><button className="btn primary" onClick={() => copiar(item.code)}>Copiar</button><button className="btn outline" onClick={() => carregar(item)}>Usar</button><button className="btn outline" onClick={() => { setComparar(item); ir("builder"); }}>Comparar</button><button className="btn danger" onClick={() => remover(item.id)}>Remover</button></div></article>)}</div>}</section>
      </main>

      <footer>© 2026 ESMERALD · Warzone Competitive Hub · Kauã Restoff de Oliveira</footer>

      {modal && <div className="modal" onClick={() => setModal(null)}><div className="modal-card panel" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setModal(null)}>×</button><img src={modal.image} alt={modal.name} /><div><span className="eyebrow">{modal.category}</span><h2>{modal.name}</h2><p>Status competitivo: {modal.status}</p><div className="modal-stats"><article><span>Dano</span><strong>{modal.baseDmg}</strong></article><article><span>Cadência</span><strong>{modal.fireRate}</strong></article><article><span>Precisão</span><strong>{modal.baseAcc}</strong></article><article><span>Vitória</span><strong>{modal.winRate.toFixed(1)}%</strong></article></div><code>{codigo(modal, iniciais(modal))}</code><div className="actions"><button className="btn primary" onClick={() => escolher(modal)}>Carregar no construtor</button><button className="btn outline" onClick={() => copiar(codigo(modal, iniciais(modal)))}>Copiar código</button></div></div></div></div>}

      {auth && <div className="modal" onClick={() => setAuth(false)}><div className="auth-card panel" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setAuth(false)}>×</button><h2>{authModo === "login" ? "Entrar" : "Criar conta"}</h2><div className="tabs"><button className={authModo === "login" ? "active" : ""} onClick={() => setAuthModo("login")}>Login</button><button className={authModo === "signup" ? "active" : ""} onClick={() => setAuthModo("signup")}>Cadastrar</button></div>{authModo === "signup" && <input placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}<input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><input placeholder="Senha" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><button className="btn primary full" onClick={authModo === "login" ? entrar : criarConta}>{authModo === "login" ? "Entrar" : "Criar conta"}</button></div></div>}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
