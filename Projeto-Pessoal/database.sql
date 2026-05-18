# ESMERALD — Warzone Competitive Hub

Sistema web desenvolvido como protótipo de SA para auxiliar jogadores de Warzone na análise de armas, criação de loadouts, acompanhamento de ranking e salvamento de configurações favoritas.

## Estrutura dos arquivos

```text
esmerald/
├── index.html      # Estrutura da página e seções do sistema
├── style.css       # Visual, responsividade, animações e glassmorphism
├── script.js       # Funcionalidades: armas, login, ranking, construtor e loadouts
├── database.sql    # Banco de dados MySQL do projeto
└── README.md       # Explicação do projeto
```

## Como executar o site

1. Extraia o arquivo ZIP.
2. Abra a pasta do projeto.
3. Clique duas vezes em `index.html` ou abra com a extensão Live Server no VS Code.
4. O site será carregado no navegador.

## Principais funcionalidades

- Página inicial com carrossel de banners.
- Dashboard com dados simulados do meta.
- Arsenal com cards de armas.
- Construtor de loadout com seleção de acessórios.
- Gráfico radar usando Chart.js.
- Ranking de armas por taxa de uso.
- Login e cadastro simulados no navegador.
- Salvamento de loadouts usando LocalStorage.

## Banco de dados

O arquivo `database.sql` contém a estrutura MySQL para uma versão futura com backend real.

Ele possui tabelas para:

- Usuários.
- Categorias de armas.
- Armas.
- Tipos de acessórios.
- Acessórios.
- Compatibilidade entre armas e acessórios.
- Loadouts salvos.
- Ranking de armas.
- Banners da página inicial.
- Estatísticas gerais do sistema.

## Observação importante

A versão atual do site funciona apenas no front-end. Os dados das armas ficam no arquivo `script.js`, e os usuários/loadouts são salvos no navegador pelo LocalStorage.

O banco `database.sql` foi criado para documentar e preparar a evolução do projeto para uma versão com backend e banco real.

## Tecnologias usadas

- HTML
- CSS
- JavaScript
- Chart.js
- Font Awesome
- Google Fonts
- MySQL

## Onde estão as partes principais no código

### `index.html`

- Menu superior: `<nav class="navbar">`
- Página inicial: `<section id="home-section">`
- Dashboard: `<section id="dashboard-section">`
- Arsenal: `<section id="arsenal-section">`
- Construtor: `<section id="builder-section">`
- Ranking: `<section id="ranking-section">`
- Loadouts salvos: `<section id="saved-section">`
- Login/cadastro: `<div id="authModal" class="modal">`

### `style.css`

- Fundo e bolhas de luz: `.glass-bg`, `.light-orb`, `.orb-1`, `.orb-2`, `.orb-3`, `.orb-4`
- Efeito de vidro: `.glass`, `.glass-card`
- Menu: `.navbar`, `.nav-container`, `.nav-links`
- Cards: `.stat-card`, `.weapon-card`, `.feature`
- Ranking: `.ranking-header`, `.ranking-row`
- Responsividade: `@media (max-width: 800px)`

### `script.js`

- Banco de armas em JavaScript: `const weaponsDB`
- Login/cadastro local: `updateAuthUI()`, `openAuthModal()`, `closeAuthModal()`
- Construtor de loadout: `renderAttachments()`, `updateBuilderStats()`
- Arsenal: `renderArsenal()`
- Ranking: `renderRanking()`
- Salvar loadout: `saveCurrentLoadout()`
- Mostrar loadouts salvos: `renderSavedLoadouts()`
- Carrossel: `updateBanner()`, `nextBanner()`, `prevBanner()`
- Navegação suave: `scrollToSection()`

## Explicação curta para apresentação

O ESMERALD é uma plataforma web para jogadores de Warzone acompanharem o meta competitivo. O sistema permite visualizar armas, comparar estatísticas, montar loadouts, salvar builds e consultar um ranking. A versão atual usa HTML, CSS e JavaScript puro, com LocalStorage para simular login e salvamento de dados. O banco MySQL foi criado para representar como os dados seriam organizados em uma versão completa com backend.
