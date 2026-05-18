<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>ESMERALD · Warzone Competitive Hub</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- COMENTÁRIO: Fundo visual do site. As divs abaixo criam as luzes/bolhas azuis usadas no efeito moderno. -->
  <div class="glass-bg"></div>
  <div class="light-orb orb-1"></div>
  <div class="light-orb orb-2"></div>
  <div class="light-orb orb-3"></div>
  <div class="light-orb orb-4"></div>

  <!-- COMENTÁRIO: Menu superior. Cada item usa data-section para o JavaScript saber para qual seção rolar. -->
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">ESMERALD</div>
      <div class="menu-toggle" id="menuToggle"><i class="fas fa-bars"></i></div>
      <ul class="nav-links" id="navLinks">
        <li><a data-section="home" class="nav-section active">INÍCIO</a></li>
        <li><a data-section="dashboard" class="nav-section">COMANDO</a></li>
        <li><a data-section="arsenal" class="nav-section">ARSENAL</a></li>
        <li><a data-section="builder" class="nav-section">CONSTRUTOR</a></li>
        <li><a data-section="ranking" class="nav-section">RANKING</a></li>
        <li><a data-section="saved" class="nav-section">ARQUIVO</a></li>
      </ul>
      <div class="auth-buttons" id="authContainer"></div>
    </div>
  </nav>

  <main>
    <!-- ===================================================================== -->
    <!-- SEÇÃO INÍCIO (LANDING PAGE) - CARROSSEL DE BANNERS                    -->
    <section id="home-section">
      <div class="container">
        <div class="hero-landing">
          <h1>INTELIGÊNCIA TÁTICA<br>PARA WARZONE</h1>
          <p>Analise o meta real, construa loadouts perfeitos e domine o competitivo com dados de especialistas.</p>
          <button class="btn-primary" id="goToDashboardBtn">ACESSAR SISTEMA</button>
        </div>
        <div class="stats-container">
          <div class="stat-card"><div class="stat-number">+2.1M</div><div>Simulações TTK</div></div>
          <div class="stat-card"><div class="stat-number">87%</div><div>Precisão Meta</div></div>
          <div class="stat-card"><div class="stat-number">+12K</div><div>Loadouts Criados</div></div>
        </div>

        <!-- =================== CARROSSEL DE BANNERS =================== -->
        <!-- SUBSTITUA OS LINKS DAS IMAGENS ABAIXO PELAS SUAS PRÓPRIAS -->
        <!-- ============================================================= -->
        <div class="banner-container">
          <div class="banner-track" id="bannerTrack">
            <!-- BANNER 1 - MODO ROYALE BLACK OPS 6 -->
            <div class="banner-slide">
              <img src="https://t3.ftcdn.net/jpg/06/35/91/98/360_F_635919818_eRo1Iie9KQlPJSK0HvMp96p4wCmUKkiW.jpg" alt="warzone royale">
              <div class="banner-overlay">
                <h3>Modo Royale · Black Ops 6</h3>
                <p>Novo mapa e mecânicas de combate</p>
              </div>
            </div>
            <!-- BANNER 2 - RESSURGÊNCIA MODO DUO -->
            <div class="banner-slide">
              <img src="https://t3.ftcdn.net/jpg/11/63/70/32/360_F_1163703261_2Dqx3XnVNUmbGdSbS6h8pvvCjTTS6T6R.jpg" alt="resurgence duo">
              <div class="banner-overlay">
                <h3>Ressurgência · Modo Duo</h3>
                <p>Volte à ação com seu parceiro</p>
              </div>
            </div>
            <!-- BANNER 3 - NOVO PACOTE ADICIONADO -->
            <div class="banner-slide">
              <img src="https://t3.ftcdn.net/jpg/05/36/36/68/360_F_536366823_XcGr4cJ2FTl4hTZq4fOH2g3cMmZxx2tV.jpg" alt="novo pacote">
              <div class="banner-overlay">
                <h3>Novo Pacote Adicionado!</h3>
                <p>Operador Shadow Company + skins exclusivas</p>
              </div>
            </div>
          </div>
          <div class="carousel-controls">
            <button class="carousel-btn" id="bannerPrev"><i class="fas fa-chevron-left"></i></button>
            <button class="carousel-btn" id="bannerNext"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>

        <div class="features-container">
          <div class="feature glass-card"><i class="fas fa-gun"></i><h3>Construtor Tático</h3><p>Monte sua arma com attachments reais e veja estatísticas em tempo real</p></div>
          <div class="feature glass-card"><i class="fas fa-chart-line"></i><h3>Meta Ranking</h3><p>Top armas por uso e taxa de vitória — atualizado diariamente</p></div>
          <div class="feature glass-card"><i class="fas fa-database"></i><h3>Arquivo Pessoal</h3><p>Salve seus loadouts favoritos e acesse de qualquer lugar</p></div>
        </div>
      </div>
    </section>

    <!-- ===================================================================== -->
    <!-- SEÇÃO COMANDO (DASHBOARD)                                             -->
    <section id="dashboard-section">
      <div class="container">
        <div class="glass" style="padding: 2rem;">
          <div class="dashboard-grid">
            <div class="dashboard-info">
              <h2 style="font-size: 1.8rem;">Intel de Campo</h2>
              <p style="color:#94a3b8; margin: 0.5rem 0 1rem;">Dados extraídos de partidas ranqueadas - atualização automática</p>
              <div class="dashboard-stats">
                <div class="stat-badge"><div class="value" id="liveUsage">34.2</div><div>Uso (MK35 ISR)</div></div>
                <div class="stat-badge"><div class="value" id="liveWin">56.3</div><div>Taxa de Vitória</div></div>
                <div class="stat-badge"><div class="value" id="liveTrend">+2.1</div><div>Tendência (7d)</div></div>
              </div>
              <button class="btn-primary" id="heroBuilderBtn">Criar Loadout</button>
            </div>
            <!-- ======================== DESTAQUE DA DASHBOARD ======================== -->
            <!-- AQUI VOCÊ PODE SUBSTITUIR O ÍCONE POR UMA IMAGEM DE ARMA              -->
            <!-- EXEMPLO: <img src="SEU_LINK_DA_IMAGEM" style="max-width:200px;">      -->
            <!-- ======================================================================= -->
            <div class="weapon-visual">
              <i class="fas fa-gun"></i>  <!-- SUBSTITUA ESSA LINHA POR UMA TAG <img> SE DESEJAR -->
              <p style="margin-top: 1rem; font-weight: 600;">MK35 ISR · Meta absoluto</p>
              <p style="font-size: 0.8rem; color:#64748b;">Maior taxa de escolha para longo alcance</p>
            </div>
          </div>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; margin-top: 2rem;">
          <div class="info-card" style="flex:1;"><strong>Tempo de Abate (3 placas):</strong> 612ms · <strong>Dano por tiro:</strong> 43</div>
          <div class="info-card" style="flex:1;"><strong>Patch Season 2:</strong> MK35 ISR lidera o meta · VST SMG em alta</div>
          <div class="info-card" style="flex:1;"><strong>Comunidade Ativa:</strong> 189.000 operadores · 3.1M simulações</div>
        </div>
      </div>
    </section>

    <!-- ===================================================================== -->
    <!-- SEÇÃO ARSENAL (TODAS AS ARMAS)                                        -->
    <!-- AS IMAGENS SÃO DEFINIDAS DENTRO DO JAVASCRIPT, NA CONST weaponsDB     */
    /* DENTRO DE CADA ARMA, SUBSTITUA A PROPRIEDADE "image" PELO SEU LINK     */
    /* AS NOVAS ARMAS ESTÃO NO TOPO COM COMENTÁRIOS DESTACADOS                */
    /* ===================================================================== -->
    <section id="arsenal-section">
      <div class="container">
        <h2 style="font-size: 1.8rem;">Arsenal Completo</h2>
        <p style="color:#94a3b8; margin-bottom: 1rem;">Selecione uma arma para carregar no construtor</p>
        <div class="arsenal-grid" id="arsenalGrid"></div>
      </div>
    </section>

    <!-- ===================================================================== -->
    <!-- SEÇÃO CONSTRUTOR                                                     -->
    <!-- ===================================================================== -->
    <!-- COMENTÁRIO: Área do construtor. Aqui aparecem a seleção de arma, acessórios e gráfico radar. -->
    <section id="builder-section">
      <div class="container">
        <div class="glass" style="padding: 2rem;">
          <h2 style="font-size: 1.8rem;">Gunsmith · Construtor</h2>
          <div class="builder-layout">
            <div class="attachments-panel">
              <select id="weaponSelectBuilder" style="width:100%; margin-bottom:1rem;"></select>
              <div id="attachmentList"></div>
              <button id="saveLoadoutBtn" class="btn-primary" style="margin-top:1rem; width:100%;">Salvar Loadout</button>
            </div>
            <div class="attachments-panel">
              <canvas id="radarBuilderCanvas" width="300" height="280"></canvas>
              <div id="buildCodeDisplay" style="margin-top:1rem; text-align:center; font-family: monospace;"></div>
            </div>
          </div>
          <div id="statComparison" style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 1.5rem; justify-content: center;"></div>
        </div>
      </div>
    </section>

    <!-- ===================================================================== -->
    <!-- SEÇÃO RANKING                                                        -->
    <!-- ===================================================================== -->
    <section id="ranking-section">
      <div class="container">
        <div class="glass" style="padding: 2rem;">
          <h2 style="font-size: 1.8rem;">Meta Ranking · Top Armas</h2>
          <p style="color:#94a3b8; margin-bottom: 1rem;">Baseado em dados reais da comunidade (atualizado a cada 6h)</p>
          <div class="ranking-dashboard" id="rankingDashboard"></div>
        </div>
      </div>
    </section>

    <!-- ===================================================================== -->
    <!-- SEÇÃO ARQUIVO (LOADOUTS SALVOS)                                       -->
    <!-- ===================================================================== -->
    <section id="saved-section">
      <div class="container">
        <div class="glass" style="padding: 2rem;">
          <h2 style="font-size: 1.8rem;">Meus Loadouts</h2>
          <div id="savedLoadoutsContainer"></div>
          <button id="clearAllLoadouts" class="btn-outline" style="border-color:#ef4444; color:#ef4444; margin-top:1rem;">Limpar Todos</button>
        </div>
      </div>
    </section>
  </main>
  <footer>© 2026 ESMERALD — Dados dinâmicos integrados | Sistema de inteligência competitiva</footer>

  <!-- COMENTÁRIO: Modal de login/cadastro. O JavaScript abre, fecha e salva os dados no LocalStorage. -->
  <!-- MODAL DE LOGIN/CADASTRO -->
  <div id="authModal" class="modal">
    <div class="modal-content">
      <div style="display:flex; gap:1rem; margin-bottom:1rem;">
        <button id="showLoginBtn" class="btn-outline" style="flex:1;">LOGIN</button>
        <button id="showSignupBtn" class="btn-outline" style="flex:1;">CADASTRAR</button>
      </div>
      <div id="loginForm">
        <input type="email" id="loginEmail" placeholder="Email">
        <input type="password" id="loginPassword" placeholder="Senha">
        <button id="doLoginBtn" class="btn-primary" style="width:100%; margin-top:1rem;">ENTRAR</button>
      </div>
      <div id="signupForm" style="display:none;">
        <input type="text" id="signupName" placeholder="Nome">
        <input type="email" id="signupEmail" placeholder="Email">
        <input type="password" id="signupPassword" placeholder="Senha">
        <button id="doSignupBtn" class="btn-primary" style="width:100%; margin-top:1rem;">CRIAR CONTA</button>
      </div>
      <button id="closeModalBtn" class="btn-outline" style="margin-top:1rem; width:100%;">FECHAR</button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>