/* ESMERALD - style.css
   Arquivo responsável por todo o visual do sistema:
   fundo escuro, glassmorphism, cards, menu, carrossel, ranking, responsividade e animações. */

* {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Estilo geral da página: fundo, fonte e cor padrão. */
body {
      background: #02070c;
      font-family: 'Inter', sans-serif;
      color: #e2e8f0;
      overflow-x: hidden;
      line-height: 1.5;
      scroll-behavior: smooth;
    }

    /* FUNDO COM BOLHAS DE LUZ (AZUL ESCURO) */
    .glass-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #030a12;
      z-index: -2;
    }
    
    /* BOLHAS FLUTUANTES (ATRÁS DO VIDRO) */
    .light-orb {
      position: fixed;
      border-radius: 50%;
      filter: blur(60px);
      pointer-events: none;
      z-index: -1;
      opacity: 0.4;
    }
    .orb-1 {
      width: 300px;
      height: 300px;
      background: #3b82f6;
      top: 10%;
      left: -100px;
      animation: floatOrb 20s ease-in-out infinite;
    }
    .orb-2 {
      width: 400px;
      height: 400px;
      background: #60a5fa;
      bottom: 5%;
      right: -150px;
      animation: floatOrb 25s ease-in-out infinite reverse;
    }
    .orb-3 {
      width: 200px;
      height: 200px;
      background: #1e40af;
      top: 40%;
      right: 20%;
      animation: floatOrb 18s ease-in-out infinite;
    }
    .orb-4 {
      width: 250px;
      height: 250px;
      background: #93c5fd;
      bottom: 20%;
      left: 10%;
      animation: floatOrb 22s ease-in-out infinite reverse;
    }
    @keyframes floatOrb {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
      50% { transform: translate(30px, -20px) scale(1.1); opacity: 0.5; }
    }

    /* GLASSMORPHISM */
    .glass {
      background: rgba(8, 20, 30, 0.55);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(59, 130, 246, 0.25);
      border-radius: 28px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    
    .glass-card {
      background: rgba(6, 16, 24, 0.5);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(59, 130, 246, 0.2);
      border-radius: 24px;
      transition: all 0.2s ease;
    }

    /* NAVEGAÇÃO */
    /* Menu fixo superior com efeito de vidro. */
.navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(3, 10, 18, 0.85);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(59, 130, 246, 0.3);
      padding: 0.8rem 5%;
    }
    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .logo {
      font-size: 1.8rem;
      font-weight: 800;
      background: linear-gradient(135deg, #f0f9ff, #3b82f6);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      letter-spacing: -0.5px;
    }
    .nav-links {
      display: flex;
      gap: 1.8rem;
      list-style: none;
      flex-wrap: wrap;
    }
    .nav-links a {
      color: #94a3b8;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: 0.2s;
      cursor: pointer;
    }
    .nav-links a.active, .nav-links a:hover {
      color: #60a5fa;
      text-shadow: 0 0 6px rgba(96, 165, 250, 0.4);
    }
    .menu-toggle {
      display: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #60a5fa;
    }
    .btn-primary {
      background: linear-gradient(105deg, #1e3a8a, #3b82f6);
      border: none;
      padding: 0.8rem 2rem;
      border-radius: 60px;
      font-weight: 700;
      color: white;
      cursor: pointer;
      transition: 0.2s;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.25);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    }
    .btn-outline {
      background: transparent;
      border: 1.5px solid #3b82f6;
      padding: 0.7rem 1.8rem;
      border-radius: 60px;
      font-weight: 600;
      color: #60a5fa;
      cursor: pointer;
      transition: 0.2s;
    }
    .btn-outline:hover {
      background: rgba(59, 130, 246, 0.15);
      border-color: #60a5fa;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem 5%;
    }
    section {
      margin-bottom: 4rem;
      scroll-margin-top: 90px;
    }

    /* HERO LANDING */
    .hero-landing {
      text-align: center;
      padding: 3rem 0 2rem;
    }
    .hero-landing h1 {
      font-size: 3.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #f0f9ff, #60a5fa);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      margin-bottom: 1rem;
    }
    .hero-landing p {
      color: #94a3b8;
      max-width: 600px;
      margin: 1rem auto;
    }

    /* CARROSSEL DE BANNERS */
    /* Carrossel da página inicial. */
.banner-container {
      position: relative;
      overflow: hidden;
      border-radius: 28px;
      margin: 2rem 0;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
    }
    .banner-track {
      display: flex;
      transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1);
    }
    .banner-slide {
      min-width: 100%;
      position: relative;
    }
    .banner-slide img {
      width: 100%;
      height: 420px;
      object-fit: cover;
    }
    .banner-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(0deg, #02070c, transparent);
      padding: 2rem;
    }
    .banner-overlay h3 {
      font-size: 1.8rem;
      font-weight: 700;
    }
    .carousel-controls {
      position: absolute;
      bottom: 1.5rem;
      right: 1.5rem;
      display: flex;
      gap: 0.8rem;
    }
    .carousel-btn {
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(8px);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid rgba(59, 130, 246, 0.5);
      color: white;
      cursor: pointer;
      transition: 0.2s;
    }
    .carousel-btn:hover {
      background: #1e40af;
    }

    /* STATS E FEATURES */
    .stats-container {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      margin: 2rem 0;
    }
    .stat-card {
      text-align: center;
      padding: 1.5rem 2rem;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 28px;
      border-bottom: 2px solid #3b82f6;
    }
    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      color: #60a5fa;
    }
    .features-container {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      justify-content: center;
      margin: 2rem 0;
    }
    .feature {
      width: 260px;
      padding: 2rem;
      text-align: center;
      transition: all 0.2s;
    }
    .feature:hover {
      transform: translateY(-5px);
      border-color: #3b82f6;
    }
    .feature i {
      font-size: 2.5rem;
      color: #60a5fa;
      margin-bottom: 1rem;
    }

    /* DASHBOARD (COMANDO) */
    .dashboard-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      align-items: center;
    }
    .dashboard-info {
      flex: 1;
    }
    .dashboard-stats {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      margin: 1.5rem 0;
    }
    .stat-badge {
      background: rgba(0, 0, 0, 0.4);
      padding: 1rem 1.5rem;
      border-radius: 24px;
      text-align: center;
      min-width: 110px;
    }
    .stat-badge .value {
      font-size: 2rem;
      font-weight: 800;
      color: #60a5fa;
    }
    .weapon-visual {
      flex: 1;
      text-align: center;
    }
    .weapon-visual i {
      font-size: 6rem;
      color: #60a5fa;
      filter: drop-shadow(0 0 20px #3b82f6);
      animation: floatWeapon 3s infinite;
    }
    @keyframes floatWeapon {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .info-card {
      background: rgba(2, 12, 20, 0.6);
      border-radius: 20px;
      padding: 1.2rem;
      border-left: 3px solid #3b82f6;
    }

    /* ARSENAL (CARDS DAS ARMAS) */
    /* Grade de cards das armas. */
.arsenal-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.8rem;
      margin-top: 2rem;
    }
    .weapon-card {
      background: rgba(4, 16, 24, 0.6);
      backdrop-filter: blur(8px);
      border-radius: 24px;
      padding: 1.2rem;
      border: 1px solid rgba(59, 130, 246, 0.2);
      cursor: pointer;
      transition: all 0.2s;
    }
    .weapon-card:hover {
      transform: translateY(-5px);
      border-color: #3b82f6;
      background: rgba(8, 28, 40, 0.7);
    }
    .weapon-card img {
      width: 100%;
      height: 140px;
      object-fit: cover;
      border-radius: 16px;
      margin-bottom: 0.8rem;
    }

    /* CONSTRUTOR */
    /* Layout da área do construtor de loadout. */
.builder-layout {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
    }
    .attachments-panel {
      flex: 2;
    }
    .attach-slot {
      background: rgba(4, 16, 24, 0.7);
      border-radius: 20px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .attach-slot label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #60a5fa;
      text-transform: uppercase;
      font-size: 0.7rem;
      letter-spacing: 1px;
    }
    select {
      background: #071e2c;
      border: 1px solid #3b82f6;
      border-radius: 40px;
      padding: 0.6rem 1rem;
      color: #e2e8f0;
      width: 100%;
      font-family: inherit;
    }
    /* RANKING */
    /* Estrutura visual da tabela de ranking. */
.ranking-header, .ranking-row {
      display: grid;
      grid-template-columns: 2.5fr 1fr 1fr 1fr;
      padding: 1rem;
      align-items: center;
      gap: 0.5rem;
    }
    .ranking-header {
      background: rgba(4, 16, 24, 0.8);
      border-radius: 20px;
      font-weight: 700;
      color: #60a5fa;
    }
    .ranking-row {
      background: rgba(2, 12, 20, 0.5);
      border-radius: 16px;
      margin-bottom: 0.5rem;
      transition: all 0.2s;
    }
    .ranking-row:hover {
      background: rgba(15, 35, 50, 0.7);
      transform: translateX(4px);
    }
    .rank-img {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      object-fit: cover;
      vertical-align: middle;
      margin-right: 10px;
    }

    /* MODAL DE LOGIN/CADASTRO */
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(12px);
      z-index: 1000;
      align-items: center;
      justify-content: center;
    }
    .modal-content {
      background: #0a1922;
      border-radius: 32px;
      padding: 2rem;
      max-width: 420px;
      width: 90%;
      border: 1px solid #3b82f6;
    }
    .modal-content input {
      width: 100%;
      padding: 0.8rem;
      margin: 0.5rem 0;
      background: #071e2c;
      border: 1px solid #3b82f6;
      border-radius: 12px;
      color: white;
    }
    .user-badge {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: #0a1922;
      padding: 0.3rem 1rem 0.3rem 1.5rem;
      border-radius: 40px;
      border: 1px solid rgba(59, 130, 246, 0.3);
    }
    footer {
      text-align: center;
      padding: 2rem;
      border-top: 1px solid rgba(59, 130, 246, 0.2);
      font-size: 0.7rem;
      color: #64748b;
    }

    /* Responsividade para celular/tablet. */
@media (max-width: 800px) {
      .nav-links {
        display: none;
        flex-direction: column;
        background: #030f18;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        padding: 1rem;
        z-index: 300;
        gap: 1rem;
      }
      .nav-links.active { display: flex; }
      .menu-toggle { display: block; }
      .hero-landing h1 { font-size: 2rem; }
      .banner-slide img { height: 220px; }
      .ranking-header, .ranking-row { grid-template-columns: 1.5fr 0.8fr 0.8fr 0.8fr; font-size: 0.7rem; }
      .dashboard-grid { flex-direction: column; text-align: center; }
    }
