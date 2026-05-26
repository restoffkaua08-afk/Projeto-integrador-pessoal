import { useEffect, useMemo, useState } from "react";
import { carregarArmas } from "./services/api.js";

const slots = [
  ["muzzle", "Boca"],
  ["barrel", "Cano"],
  ["underbarrel", "Acoplamento"],
  ["mag", "Carregador"],
  ["optic", "Mira"]
];

const attachmentsBase = {
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

const imagens = [
  "https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603373_myYg5WDPyja669cX4gMLRO7FdxxhbPtS.jpg",
  "https://t3.ftcdn.net/jpg/06/10/02/84/360_F_610028426_rb5JCwgkZucqtLNLod4BCRrOLLSAnA9u.jpg",
  "https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603356_YdbRu1rIdBdIvS2D5DigkeQU8YspIHlT.jpg",
  "https://t3.ftcdn.net/jpg/06/93/57/14/360_F_693571489_k8HHi7Owa04ijypL2Dj3qHoUg10Vjt4I.jpg",
  "https://t3.ftcdn.net/jpg/05/36/36/68/360_F_536366823_XcGr4cJ2FTl4hTZq4fOH2g3cMmZxx2tV.jpg",
  "https://t3.ftcdn.net/jpg/11/63/70/32/360_F_1163703261_2Dqx3XnVNUmbGdSbS6h8pvvCjTTS6T6R.jpg"
];

const armasFallback = [
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
].map((item, index) => ({
  id: index + 1,
  name: item[0],
  category: item[1],
  status: item[2],
  baseDmg: item[3],
  fireRate: item[4],
  baseMob: item[5],
  baseAcc: item[6],
  recoil: item[7],
  usage: item[8],
  winRate: item[9],
  image: imagens[index % imagens.length],
  attachments: attachmentsBase,
  statMods: modsBase
}));

const banners = [
  {
    title: "Meta competitivo",
    subtitle: "Armas, rankings, códigos e builds em uma interface tática.",
    image: imagens[0]
  },
  {
    title: "Construtor Gunsmith",
    subtitle: "Monte loadouts, compare atributos e copie o código final.",
    image: imagens[5]
  },
  {
    title: "Arquivo pessoal",
    subtitle: "Salve suas builds favoritas e recupere quando precisar.",
    image: imagens[4]
  }
];

function n(valor, padrao) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : padrao;
}

function normalizarArma(arma, index) {
  const base = armasFallback[index % armasFallback.length];
  return {
    id: arma.id ?? base.id,
    name: arma.name ?? arma.nome ?? base.name,
    category: arma.category ?? arma.categoria ?? base.category,
    status: arma.status ?? arma.status_meta ?? base.status,
    baseDmg: n(arma.baseDmg ?? arma.dano_base, base.baseDmg),
    fireRate: n(arma.fireRate ?? arma.cadencia_tiro, base.fireRate),
    baseMob: n(arma.baseMob ?? arma.mobilidade_base, base.baseMob),
    baseAcc: n(arma.baseAcc ?? arma.precisao_base, base.baseAcc),
    recoil: n(arma.recoil ?? arma.controle_recuo, base.recoil),
    usage: n(arma.usage ?? arma.taxa_uso, base.usage),
    winRate: n(arma.winRate ?? arma.taxa_vitoria, base.winRate),
    image: arma.image ?? arma.imagem_url ?? base.image,
    attachments: arma.attachments ?? attachmentsBase,
    statMods: arma.statMods ?? modsBase
  };
}

function anexosIniciais(arma) {
  return Object.fromEntries(slots.map(([slot]) => [slot, arma.attachments?.[slot]?.[0] || "None"]));
}

function limitar(valor) {
  return Math.max(0, Math.min(100, Math.round(valor)));
}

function calcularStats(arma, anexos) {
  let damage = arma.baseDmg;
  let mobility = arma.baseMob;
  let accuracy = arma.baseAcc;
  let recoilControl = arma.recoil;

  Object.entries(anexos).forEach(([slot, escolhido]) => {
    const mod = arma.statMods?.[slot]?.[escolhido];
    if (!mod) return;
    damage += mod.damage || 0;
    mobility += mod.mobility || 0;
    accuracy += mod.accuracy || 0;
    recoilControl += mod.recoilControl || 0;
  });

  return {
    damage: limitar(damage),
    mobility: limitar(mobility),
    accuracy: limitar(accuracy),
    recoilControl: limitar(recoilControl)
  };
}

function gerarCodigo(arma, anexos) {
  const texto = `${arma.name}-${Object.values(anexos).join("-")}`;
  let hash = 0;
  for (let i = 0; i < texto.length; i++) hash = (hash * 31 + texto.charCodeAt(i)) % 9999;
  const nome = arma.name.replace(/[^a-z0-9]/gi, "").slice(0, 4).toUpperCase();
  const cano = String(anexos.barrel || "BASE").replace(/[^a-z0-9]/gi, "").slice(0, 4).toUpperCase();
  return `${nome}-${cano}-${String(hash).padStart(4, "0")}`;
}

function copiar(texto, aviso) {
  navigator.clipboard?.writeText(texto).then(
    () => aviso("Código copiado"),
    () => {
      const area = document.createElement("textarea");
      area.value = texto;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      aviso("Código copiado");
    }
  );
}

function Radar({ stats }) {
  const lista = [
    ["Dano", stats.damage],
    ["Mobilidade", stats.mobility],
    ["Precisão", stats.accuracy],
    ["Controle", stats.recoilControl]
  ];

  return (
    <div className="radar">
      <div className="score">
        <strong>{Math.round((stats.damage + stats.mobility + stats.accuracy + stats.recoilControl) / 4)}</strong>
        <span>Score</span>
      </div>
      {lista.map(([nome, valor]) => (
        <div className="bar" key={nome}>
          <div><strong>{nome}</strong><span>{valor}</span></div>
          <i style={{ width: `${valor}%` }} />
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [armas, setArmas] = useState(armasFallback);
  const [armaAtual, setArmaAtual] = useState(armasFallback[0]);
  const [anexos, setAnexos] = useState(anexosIniciais(armasFallback[0]));
  const [menu, setMenu] = useState(false);
  const [secao, setSecao] = useState("home");
  const [banner, setBanner] = useState(0);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [modalArma, setModalArma] = useState(null);
  const [toast, setToast] = useState("");
  const [authAberto, setAuthAberto] = useState(false);
  const [modoAuth, setModoAuth] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [usuarios, setUsuarios] = useState(() => JSON.parse(localStorage.getItem("esmerald_users") || "[]"));
  const [usuarioAtual, setUsuarioAtual] = useState(() => localStorage.getItem("esmerald_user") || "");
  const [salvos, setSalvos] = useState(() => JSON.parse(localStorage.getItem("esmerald_loadouts") || "[]"));
  const [comparar, setComparar] = useState(null);

  useEffect(() => {
    carregarArmas()
      .then((dados) => {
        const lista = Array.isArray(dados?.weapons) && dados.weapons.length
          ? dados.weapons.map(normalizarArma)
          : armasFallback;
        setArmas(lista);
        setArmaAtual(lista[0]);
        setAnexos(anexosIniciais(lista[0]));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setBanner((valor) => (valor + 1) % banners.length), 5200);
    return () => clearInterval(timer);
  }, []);

  function aviso(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2300);
  }

  function irPara(id) {
    setSecao(id);
    setMenu(false);
    document.getElementById(`${id}-section`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function escolherArma(arma, mover = true) {
    setArmaAtual(arma);
    setAnexos(anexosIniciais(arma));
    setModalArma(null);
    if (mover) irPara("builder");
    aviso(`${arma.name} carregada`);
  }

  function criarConta() {
    if (!form.name || !form.email || !form.password) return aviso("Preencha todos os campos");
    if (usuarios.some((u) => u.email === form.email)) return aviso("Email já cadastrado");

    const prox = [...usuarios, { name: form.name, email: form.email, password: form.password }];
    setUsuarios(prox);
    localStorage.setItem("esmerald_users", JSON.stringify(prox));
    setUsuarioAtual(form.name);
    localStorage.setItem("esmerald_user", form.name);
    setAuthAberto(false);
    aviso(`Bem-vindo, ${form.name}`);
  }

  function entrar() {
    const usuario = usuarios.find((u) => u.email === form.email && u.password === form.password);
    if (!usuario) return aviso("Email ou senha inválidos");

    setUsuarioAtual(usuario.name);
    localStorage.setItem("esmerald_user", usuario.name);
    setAuthAberto(false);
    aviso(`Bem-vindo, ${usuario.name}`);
  }

  function sair() {
    setUsuarioAtual("");
    localStorage.removeItem("esmerald_user");
    aviso("Logout efetuado");
  }

  const stats = calcularStats(armaAtual, anexos);
  const codigo = gerarCodigo(armaAtual, anexos);

  const categorias = useMemo(() => ["Todas", ...new Set(armas.map((a) => a.category))], [armas]);
  const filtradas = useMemo(() => armas.filter((a) => {
    const okCategoria = categoria === "Todas" || a.category === categoria;
    const okBusca = `${a.name} ${a.category} ${a.status}`.toLowerCase().includes(busca.toLowerCase());
    return okCategoria && okBusca;
  }), [armas, categoria, busca]);

  const ranking = useMemo(() => [...armas].sort((a, b) => b.usage - a.usage), [armas]);
  const meusSalvos = salvos.filter((s) => s.user === usuarioAtual);

  function salvarLoadout() {
    if (!usuarioAtual) {
      setAuthAberto(true);
      return aviso("Faça login para salvar loadouts");
    }

    const nome = prompt("Nome do loadout:");
    if (!nome) return;

    const item = {
      id: Date.now(),
      user: usuarioAtual,
      name: nome,
      weaponName: armaAtual.name,
      weapon: armaAtual,
      attachments: anexos,
      stats,
      code: codigo
    };

    const prox = [...salvos, item];
    setSalvos(prox);
    localStorage.setItem("esmerald_loadouts", JSON.stringify(prox));
    aviso("Loadout salvo");
  }

  function removerLoadout(id) {
    const prox = salvos.filter((s) => s.id !== id);
    setSalvos(prox);
    localStorage.setItem("esmerald_loadouts", JSON.stringify(prox));
    aviso("Loadout removido");
  }

  function limparMeus() {
    const prox = salvos.filter((s) => s.user !== usuarioAtual);
    setSalvos(prox);
    localStorage.setItem("esmerald_loadouts", JSON.stringify(prox));
    setComparar(null);
    aviso("Arquivo limpo");
  }

  function carregarSalvo(item) {
    const arma = normalizarArma(item.weapon || armaAtual, 0);
    setArmaAtual(arma);
    setAnexos(item.attachments || anexosIniciais(arma));
    irPara("builder");
    aviso("Loadout carregado");
  }

  const links = [
    ["home", "Início"],
    ["dashboard", "Comando"],
    ["arsenal", "Arsenal"],
    ["builder", "Construtor"],
    ["ranking", "Ranking"],
    ["saved", "Arquivo"]
  ];

  return (
    <>
      <div className="bg" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />

      <nav className="topbar">
        <div className="topbar-inner">
          <button className="hamburger" onClick={() => setMenu(true)}>☰</button>
          <button className="brand" onClick={() => irPara("home")}>ESMERALD</button>
          <div className="top-actions">
            {usuarioAtual ? (
              <div className="user-badge"><span>{usuarioAtual}</span><button onClick={sair}>Sair</button></div>
            ) : (
              <button className="btn outline" onClick={() => setAuthAberto(true)}>Entrar</button>
            )}
          </div>
        </div>
      </nav>

      <aside className={`sidebar ${menu ? "open" : ""}`}>
        <div className="sidebar-head">
          <strong>ESMERALD</strong>
          <button onClick={() => setMenu(false)}>×</button>
        </div>
        <p>Warzone Competitive Hub</p>
        <div className="side-links">
          {links.map(([id, label]) => <button key={id} className={secao === id ? "active" : ""} onClick={() => irPara(id)}><span>{label}</span><i>›</i></button>)}
        </div>
        <div className="side-code">
          <small>Build atual</small>
          <strong>{codigo}</strong>
          <button onClick={() => copiar(codigo, aviso)}>Copiar código</button>
        </div>
      </aside>
      {menu && <button className="overlay" onClick={() => setMenu(false)} />}

      <main>
        <section id="home-section" className="hero section">
          <div className="hero-copy panel">
            <span className="eyebrow">Warzone Competitive Hub</span>
            <h1>Loadouts, meta e códigos de armamento.</h1>
            <p>Analise armas, monte builds, compare atributos, copie códigos e salve loadouts em uma plataforma com visual de vitrine profissional.</p>
            <div className="actions">
              <button className="btn primary" onClick={() => irPara("arsenal")}>Ver arsenal</button>
              <button className="btn outline" onClick={() => irPara("builder")}>Montar loadout</button>
            </div>
          </div>

          <div className="carousel panel">
            <div className="carousel-track" style={{ transform: `translateX(-${banner * 100}%)` }}>
              {banners.map((b) => (
                <article className="slide" key={b.title}>
                  <img src={b.image} alt={b.title} />
                  <div><span>Intel ativa</span><h2>{b.title}</h2><p>{b.subtitle}</p></div>
                </article>
              ))}
            </div>
            <div className="carousel-buttons">
              <button onClick={() => setBanner((banner - 1 + banners.length) % banners.length)}>‹</button>
              <button onClick={() => setBanner((banner + 1) % banners.length)}>›</button>
            </div>
          </div>
        </section>

        <section className="stats">
          <article className="panel"><strong>{armas.length}</strong><span>Armas mapeadas</span></article>
          <article className="panel"><strong>{ranking[0]?.usage.toFixed(1)}%</strong><span>Uso da líder</span></article>
          <article className="panel"><strong>{ranking[0]?.winRate.toFixed(1)}%</strong><span>Taxa de vitória</span></article>
          <article className="panel"><strong>{meusSalvos.length}</strong><span>Loadouts salvos</span></article>
        </section>

        <section id="dashboard-section" className="section dashboard panel">
          <div>
            <span className="eyebrow">Comando</span>
            <h2>Intel de Campo</h2>
            <p>Resumo do meta atual, com destaque para a arma mais usada e opção direta para montar uma build competitiva.</p>
            <div className="mini-grid">
              <article><strong>{ranking[0]?.name}</strong><span>líder do meta</span></article>
              <article><strong>{ranking[0]?.category}</strong><span>classe</span></article>
              <article><strong>{ranking[0]?.status}</strong><span>status</span></article>
            </div>
            <button className="btn primary" onClick={() => escolherArma(ranking[0] || armaAtual)}>Montar loadout da líder</button>
          </div>
          <div className="featured">
            <img src={ranking[0]?.image || armaAtual.image} alt={ranking[0]?.name || armaAtual.name} />
            <h3>{ranking[0]?.name}</h3>
            <p>{ranking[0]?.usage.toFixed(1)}% uso · {ranking[0]?.winRate.toFixed(1)}% vitória</p>
          </div>
        </section>

        <section id="arsenal-section" className="section">
          <div className="section-head">
            <div><span className="eyebrow">Arsenal</span><h2>Cards de armamento</h2><p>Clique em abrir para ver detalhes ou copie o código direto pelo card.</p></div>
            <div className="filters">
              <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar arma..." />
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>{categorias.map((c) => <option key={c}>{c}</option>)}</select>
            </div>
          </div>

          <div className="weapon-grid">
            {filtradas.map((arma) => {
              const cod = gerarCodigo(arma, anexosIniciais(arma));
              return (
                <article className="weapon-card panel" key={arma.id}>
                  <button className="weapon-img" onClick={() => setModalArma(arma)}><img src={arma.image} alt={arma.name} /><span>{arma.status}</span></button>
                  <div className="weapon-body">
                    <small>{arma.category}</small>
                    <h3>{arma.name}</h3>
                    <div className="chips"><span>{arma.usage.toFixed(1)}% uso</span><span>{arma.winRate.toFixed(1)}% vitória</span></div>
                    <code>{cod}</code>
                    <div className="actions"><button className="btn outline" onClick={() => setModalArma(arma)}>Abrir</button><button className="btn primary" onClick={() => copiar(cod, aviso)}>Copiar código</button></div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="builder-section" className="section builder panel">
          <div>
            <span className="eyebrow">Gunsmith</span>
            <h2>Construtor de Loadout</h2>
            <p>Configure acessórios, veja impacto nos atributos e gere um código único da build.</p>

            <label className="field"><span>Arma</span><select value={armaAtual.name} onChange={(e) => escolherArma(armas.find((a) => a.name === e.target.value), false)}>{armas.map((a) => <option key={a.id}>{a.name}</option>)}</select></label>

            <div className="slot-grid">
              {slots.map(([slot, label]) => (
                <label className="field slot-field" key={slot}>
                  <span>{label}</span>
                  <select value={anexos[slot] || ""} onChange={(e) => setAnexos({ ...anexos, [slot]: e.target.value })}>{(armaAtual.attachments?.[slot] || ["None"]).map((a) => <option key={a}>{a}</option>)}</select>
                </label>
              ))}
            </div>

            <div className="code-box">
              <span>Código do armamento</span>
              <strong>{codigo}</strong>
              <button className="btn primary" onClick={() => copiar(codigo, aviso)}>Copiar código</button>
              <button className="btn outline" onClick={salvarLoadout}>Salvar loadout</button>
            </div>
          </div>

          <div>
            <div className="preview">
              <img src={armaAtual.image} alt={armaAtual.name} />
              <div><small>{armaAtual.category}</small><h3>{armaAtual.name}</h3><p>{armaAtual.status}</p></div>
            </div>
            <Radar stats={stats} />
            {comparar && (
              <div className="compare">
                <span className="eyebrow">Comparação</span>
                <h3>{comparar.name}</h3>
                <div className="compare-grid">
                  <article><span>Dano</span><strong>{comparar.stats.damage} → {stats.damage}</strong></article>
                  <article><span>Mobilidade</span><strong>{comparar.stats.mobility} → {stats.mobility}</strong></article>
                  <article><span>Precisão</span><strong>{comparar.stats.accuracy} → {stats.accuracy}</strong></article>
                  <article><span>Controle</span><strong>{comparar.stats.recoilControl} → {stats.recoilControl}</strong></article>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="ranking-section" className="section ranking panel">
          <div className="section-head"><div><span className="eyebrow">Ranking</span><h2>Meta Ranking</h2><p>Ordenado por taxa de uso, com vitória e status competitivo.</p></div></div>
          <div className="ranking-list">
            {ranking.map((arma, index) => (
              <article className="rank-row" key={arma.id}>
                <div className="rank-name"><strong>#{index + 1}</strong><img src={arma.image} alt={arma.name} /><div><span>{arma.name}</span><small>{arma.category}</small></div></div>
                <div><strong>{arma.usage.toFixed(1)}%</strong><span>uso</span></div>
                <div><strong>{arma.winRate.toFixed(1)}%</strong><span>vitória</span></div>
                <div><strong>{arma.status}</strong><span>status</span></div>
                <button className="btn outline" onClick={() => escolherArma(arma)}>Montar</button>
              </article>
            ))}
          </div>
        </section>

        <section id="saved-section" className="section saved panel">
          <div className="section-head"><div><span className="eyebrow">Arquivo</span><h2>Loadouts salvos</h2><p>Copie, carregue, compare ou remova suas builds salvas.</p></div><button className="btn danger" onClick={limparMeus}>Limpar meus loadouts</button></div>
          {!usuarioAtual ? (
            <div className="empty"><h3>Entre para salvar loadouts</h3><button className="btn primary" onClick={() => setAuthAberto(true)}>Entrar</button></div>
          ) : meusSalvos.length === 0 ? (
            <div className="empty"><h3>Nenhum loadout salvo</h3><p>Monte uma build no construtor e clique em salvar.</p></div>
          ) : (
            <div className="saved-grid">
              {meusSalvos.map((item) => (
                <article className="saved-card" key={item.id}>
                  <small>{item.weaponName}</small><h3>{item.name}</h3><code>{item.code}</code>
                  <div className="saved-actions">
                    <button className="btn primary" onClick={() => copiar(item.code, aviso)}>Copiar</button>
                    <button className="btn outline" onClick={() => carregarSalvo(item)}>Usar</button>
                    <button className="btn outline" onClick={() => { setComparar(item); irPara("builder"); }}>Comparar</button>
                    <button className="btn danger" onClick={() => removerLoadout(item.id)}>Remover</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>© 2026 ESMERALD · Warzone Competitive Hub · Kauã Restoff de Oliveira</footer>

      {modalArma && (
        <div className="modal" onClick={() => setModalArma(null)}>
          <div className="modal-card panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalArma(null)}>×</button>
            <img src={modalArma.image} alt={modalArma.name} />
            <div><span className="eyebrow">{modalArma.category}</span><h2>{modalArma.name}</h2><p>Status competitivo: {modalArma.status}</p>
              <div className="modal-stats"><article><span>Dano</span><strong>{modalArma.baseDmg}</strong></article><article><span>Cadência</span><strong>{modalArma.fireRate}</strong></article><article><span>Precisão</span><strong>{modalArma.baseAcc}</strong></article><article><span>Vitória</span><strong>{modalArma.winRate.toFixed(1)}%</strong></article></div>
              <code>{gerarCodigo(modalArma, anexosIniciais(modalArma))}</code>
              <div className="actions"><button className="btn primary" onClick={() => escolherArma(modalArma)}>Carregar no construtor</button><button className="btn outline" onClick={() => copiar(gerarCodigo(modalArma, anexosIniciais(modalArma)), aviso)}>Copiar código</button></div>
            </div>
          </div>
        </div>
      )}

      {authAberto && (
        <div className="modal" onClick={() => setAuthAberto(false)}>
          <div className="auth-card panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setAuthAberto(false)}>×</button>
            <h2>{modoAuth === "login" ? "Entrar" : "Criar conta"}</h2>
            <div className="tabs"><button className={modoAuth === "login" ? "active" : ""} onClick={() => setModoAuth("login")}>Login</button><button className={modoAuth === "signup" ? "active" : ""} onClick={() => setModoAuth("signup")}>Cadastrar</button></div>
            {modoAuth === "signup" && <input placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}
            <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Senha" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button className="btn primary full" onClick={modoAuth === "login" ? entrar : criarConta}>{modoAuth === "login" ? "Entrar" : "Criar conta"}</button>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
