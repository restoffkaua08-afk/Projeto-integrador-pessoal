CREATE DATABASE IF NOT EXISTS esmerald_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE esmerald_db;

DROP TABLE IF EXISTS loadout_acessorios;
DROP TABLE IF EXISTS loadouts;
DROP TABLE IF EXISTS ranking_armas;
DROP TABLE IF EXISTS armas_acessorios;
DROP TABLE IF EXISTS acessorios;
DROP TABLE IF EXISTS tipos_acessorios;
DROP TABLE IF EXISTS armas;
DROP TABLE IF EXISTS categorias_armas;
DROP TABLE IF EXISTS banners;
DROP TABLE IF EXISTS estatisticas_sistema;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias_armas (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nome_categoria VARCHAR(80) NOT NULL UNIQUE,
  descricao TEXT
);
INSERT INTO categorias_armas (id_categoria, nome_categoria, descricao) VALUES 
(1, 'Fuzil Assalto', 'Armas equilibradas para médio e longo alcance.'),
(2, 'Submetralhadora', 'Armas leves para combate próximo.'),
(3, 'Fuzil Precisão', 'Armas de alto dano para longas distâncias.'),
(4, 'Pistola', 'Arma secundária leve.');

CREATE TABLE armas (
  id_arma INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  id_categoria INT NOT NULL,
  dano_base INT NOT NULL,
  cadencia_tiro INT NOT NULL,
  mobilidade_base INT NOT NULL,
  precisao_base INT NOT NULL,
  controle_recuo INT NOT NULL,
  taxa_uso DECIMAL(5,2) NOT NULL,
  taxa_vitoria DECIMAL(5,2) NOT NULL,
  imagem_url TEXT,
  status_meta ENUM('Meta absoluto','Alta','Estável','Baixa') DEFAULT 'Estável',
  descricao TEXT,
  FOREIGN KEY (id_categoria) REFERENCES categorias_armas(id_categoria)
);
INSERT INTO armas (id_arma,nome,id_categoria,dano_base,cadencia_tiro,mobilidade_base,precisao_base,controle_recuo,taxa_uso,taxa_vitoria,imagem_url,status_meta,descricao) VALUES
(1, 'MK35 ISR', 1, 43, 680, 68, 89, 74, 38.40, 56.30, 'https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603373_myYg5WDPyja669cX4gMLRO7FdxxhbPtS.jpg', 'Meta absoluto', 'Arma cadastrada no protótipo ESMERALD.'),
(2, 'Peacekeeper Mk1', 1, 41, 720, 74, 87, 72, 34.10, 54.20, 'https://t3.ftcdn.net/jpg/06/10/02/84/360_F_610028426_rb5JCwgkZucqtLNLod4BCRrOLLSAnA9u.jpg', 'Alta', 'Arma cadastrada no protótipo ESMERALD.'),
(3, 'Voyak KT-3', 1, 42, 700, 70, 86, 75, 31.80, 53.70, 'https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603356_YdbRu1rIdBdIvS2D5DigkeQU8YspIHlT.jpg', 'Alta', 'Arma cadastrada no protótipo ESMERALD.'),
(4, 'VST', 2, 35, 960, 95, 82, 69, 33.20, 54.90, 'https://t3.ftcdn.net/jpg/06/93/57/14/360_F_693571489_k8HHi7Owa04ijypL2Dj3qHoUg10Vjt4I.jpg', 'Alta', 'Arma cadastrada no protótipo ESMERALD.'),
(5, 'Razor 9mm', 2, 36, 940, 96, 83, 70, 32.50, 54.10, 'https://t3.ftcdn.net/jpg/05/36/36/68/360_F_536366823_XcGr4cJ2FTl4hTZq4fOH2g3cMmZxx2tV.jpg', 'Alta', 'Arma cadastrada no protótipo ESMERALD.'),
(6, 'Kogot-7', 2, 34, 970, 97, 81, 68, 30.80, 53.40, 'https://t3.ftcdn.net/jpg/11/63/70/32/360_F_1163703261_2Dqx3XnVNUmbGdSbS6h8pvvCjTTS6T6R.jpg', 'Alta', 'Arma cadastrada no protótipo ESMERALD.'),
(7, 'Dravec 45', 2, 37, 890, 91, 84, 72, 29.40, 52.90, 'https://t3.ftcdn.net/jpg/06/35/91/98/360_F_635919818_eRo1Iie9KQlPJSK0HvMp96p4wCmUKkiW.jpg', 'Alta', 'Arma cadastrada no protótipo ESMERALD.'),
(8, 'Hawker HX', 3, 99, 45, 43, 96, 86, 25.30, 60.10, 'https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603373_myYg5WDPyja669cX4gMLRO7FdxxhbPtS.jpg', 'Alta', 'Arma cadastrada no protótipo ESMERALD.'),
(9, 'Strider 300', 3, 97, 50, 45, 94, 84, 23.70, 58.60, 'https://t3.ftcdn.net/jpg/06/10/02/84/360_F_610028426_rb5JCwgkZucqtLNLod4BCRrOLLSAnA9u.jpg', 'Estável', 'Arma cadastrada no protótipo ESMERALD.'),
(10, 'Velox 5.7', 4, 52, 320, 96, 84, 82, 18.50, 48.20, 'https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603356_YdbRu1rIdBdIvS2D5DigkeQU8YspIHlT.jpg', 'Estável', 'Arma cadastrada no protótipo ESMERALD.'),
(11, 'TAQ-56', 1, 41, 710, 72, 86, 72, 34.20, 54.80, 'https://t4.ftcdn.net/jpg/05/68/60/33/360_F_568603373_myYg5WDPyja669cX4gMLRO7FdxxhbPtS.jpg', 'Alta', 'Arma cadastrada no protótipo ESMERALD.'),
(12, 'ISO HAVOC', 2, 34, 980, 94, 81, 68, 29.50, 53.20, 'https://t3.ftcdn.net/jpg/11/63/70/32/360_F_1163703261_2Dqx3XnVNUmbGdSbS6h8pvvCjTTS6T6R.jpg', 'Alta', 'Arma cadastrada no protótipo ESMERALD.'),
(13, 'FJX Imperium', 3, 98, 48, 44, 95, 85, 24.10, 59.10, 'https://t3.ftcdn.net/jpg/06/93/57/14/360_F_693571489_k8HHi7Owa04ijypL2Dj3qHoUg10Vjt4I.jpg', 'Alta', 'Arma cadastrada no protótipo ESMERALD.');

CREATE TABLE tipos_acessorios (
  id_tipo INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(30) NOT NULL UNIQUE,
  nome_tipo VARCHAR(80) NOT NULL
);
INSERT INTO tipos_acessorios (id_tipo,codigo,nome_tipo) VALUES 
(1, 'muzzle', 'Boca/Muzzle'),
(2, 'barrel', 'Cano/Barrel'),
(3, 'underbarrel', 'Acoplamento/Underbarrel'),
(4, 'mag', 'Carregador/Mag'),
(5, 'optic', 'Mira/Optic');

CREATE TABLE acessorios (
  id_acessorio INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  id_tipo INT NOT NULL,
  bonus_dano INT DEFAULT 0,
  bonus_mobilidade INT DEFAULT 0,
  bonus_precisao INT DEFAULT 0,
  bonus_controle_recuo INT DEFAULT 0,
  descricao TEXT,
  FOREIGN KEY (id_tipo) REFERENCES tipos_acessorios(id_tipo),
  UNIQUE KEY uk_acessorio_tipo (nome, id_tipo)
);
INSERT INTO acessorios (id_acessorio,nome,id_tipo,bonus_dano,bonus_mobilidade,bonus_precisao,bonus_controle_recuo,descricao) VALUES
(1, 'Monolithic Suppressor', 1, 2, -1, 0, 0, 'Acessório usado no construtor de loadouts.'),
(2, 'Compensator', 1, 0, 0, 0, 4, 'Acessório usado no construtor de loadouts.'),
(3, 'Flash Hider', 1, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(4, 'LongShot Barrel', 2, 3, -2, 0, 0, 'Acessório usado no construtor de loadouts.'),
(5, 'Precision Barrel', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(6, 'Factory', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(7, 'FTAC Ripper', 3, 0, 0, 4, 0, 'Acessório usado no construtor de loadouts.'),
(8, 'Commando', 3, 0, 0, 0, 4, 'Acessório usado no construtor de loadouts.'),
(9, 'Ranger', 3, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(10, '40 Round', 4, 0, -1, 0, 0, 'Acessório usado no construtor de loadouts.'),
(11, '45 Round', 4, 0, -2, 0, 0, 'Acessório usado no construtor de loadouts.'),
(12, '50 Drum', 4, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(13, 'VLK 4x', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(14, 'Aim Op', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(15, 'Cronen', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(16, 'Monolithic', 1, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(17, 'Prolite', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(18, 'Task Force', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(19, 'Merc', 3, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(20, 'Micro Reflex', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(21, 'Red Dot', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(22, 'Silenciador', 1, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(23, 'Break', 1, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(24, 'KAS-10', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(25, 'Precision', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(26, 'Guard', 3, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(27, '40 Mags', 4, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(28, 'Holotherm', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(29, 'VLK', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(30, 'Supressor', 1, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(31, 'Flash', 1, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(32, 'Rapid Fire', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(33, 'Short', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(34, 'Stabilizer', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(35, 'FTAC', 3, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(36, 'Rapid', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(37, 'Stabilized', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(38, '30 Mags', 4, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(39, 'Micro', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(40, 'Long', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(41, '45 Mags', 4, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(42, 'Reflex', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(43, 'FJX 22"', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(44, 'Bipod', 3, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(45, 'None', 3, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(46, 'Explosive', 4, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(47, 'High Velocity', 4, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(48, 'Thermal', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(49, 'Sniper Scope', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(50, '22" OMX', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(51, '5 Round', 4, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(52, '10 Round', 4, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(53, 'Raptor', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(54, 'Leve', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(55, 'Padrão', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(56, '15 Mags', 4, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(57, 'Mini', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(58, 'Prolite Barrel', 2, 0, 1, 4, 0, 'Acessório usado no construtor de loadouts.'),
(59, '18" Precision', 2, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(60, '60 Drum', 4, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(61, 'Holographic', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(62, 'Standard', 4, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.'),
(63, 'Dual Zoom', 5, 0, 0, 0, 0, 'Acessório usado no construtor de loadouts.');

CREATE TABLE armas_acessorios (
  id_arma INT NOT NULL,
  id_acessorio INT NOT NULL,
  slot VARCHAR(30) NOT NULL,
  PRIMARY KEY (id_arma, id_acessorio),
  FOREIGN KEY (id_arma) REFERENCES armas(id_arma),
  FOREIGN KEY (id_acessorio) REFERENCES acessorios(id_acessorio)
);
INSERT INTO armas_acessorios (id_arma,id_acessorio,slot) VALUES
(1, 1, 'muzzle'),
(1, 2, 'muzzle'),
(1, 3, 'muzzle'),
(1, 4, 'barrel'),
(1, 5, 'barrel'),
(1, 6, 'barrel'),
(1, 7, 'underbarrel'),
(1, 8, 'underbarrel'),
(1, 9, 'underbarrel'),
(1, 10, 'mag'),
(1, 11, 'mag'),
(1, 12, 'mag'),
(1, 13, 'optic'),
(1, 14, 'optic'),
(1, 15, 'optic'),
(2, 16, 'muzzle'),
(2, 2, 'muzzle'),
(2, 17, 'barrel'),
(2, 18, 'barrel'),
(2, 19, 'underbarrel'),
(2, 8, 'underbarrel'),
(2, 10, 'mag'),
(2, 12, 'mag'),
(2, 20, 'optic'),
(2, 21, 'optic'),
(3, 22, 'muzzle'),
(3, 23, 'muzzle'),
(3, 24, 'barrel'),
(3, 25, 'barrel'),
(3, 26, 'underbarrel'),
(3, 9, 'underbarrel'),
(3, 27, 'mag'),
(3, 12, 'mag'),
(3, 28, 'optic'),
(3, 29, 'optic'),
(4, 30, 'muzzle'),
(4, 31, 'muzzle'),
(4, 32, 'barrel'),
(4, 33, 'barrel'),
(4, 19, 'underbarrel'),
(4, 26, 'underbarrel'),
(4, 12, 'mag'),
(4, 27, 'mag'),
(4, 20, 'optic'),
(4, 21, 'optic'),
(5, 16, 'muzzle'),
(5, 2, 'muzzle'),
(5, 34, 'barrel'),
(5, 33, 'barrel'),
(5, 35, 'underbarrel'),
(5, 9, 'underbarrel'),
(5, 27, 'mag'),
(5, 12, 'mag'),
(5, 15, 'optic'),
(5, 21, 'optic'),
(6, 30, 'muzzle'),
(6, 31, 'muzzle'),
(6, 36, 'barrel'),
(6, 37, 'barrel'),
(6, 19, 'underbarrel'),
(6, 26, 'underbarrel'),
(6, 12, 'mag'),
(6, 38, 'mag'),
(6, 39, 'optic'),
(6, 21, 'optic'),
(7, 2, 'muzzle'),
(7, 31, 'muzzle'),
(7, 40, 'barrel'),
(7, 33, 'barrel'),
(7, 9, 'underbarrel'),
(7, 26, 'underbarrel'),
(7, 41, 'mag'),
(7, 12, 'mag'),
(7, 42, 'optic'),
(7, 21, 'optic'),
(8, 22, 'muzzle'),
(8, 23, 'muzzle'),
(8, 43, 'barrel'),
(8, 6, 'barrel'),
(8, 44, 'underbarrel'),
(8, 45, 'underbarrel'),
(8, 46, 'mag'),
(8, 47, 'mag'),
(8, 48, 'optic'),
(8, 49, 'optic'),
(9, 22, 'muzzle'),
(9, 16, 'muzzle'),
(9, 50, 'barrel'),
(9, 33, 'barrel'),
(9, 9, 'underbarrel'),
(9, 44, 'underbarrel'),
(9, 51, 'mag'),
(9, 52, 'mag'),
(9, 53, 'optic'),
(9, 48, 'optic'),
(10, 16, 'muzzle'),
(10, 2, 'muzzle'),
(10, 54, 'barrel'),
(10, 55, 'barrel'),
(10, 45, 'underbarrel'),
(10, 56, 'mag'),
(10, 38, 'mag'),
(10, 57, 'optic'),
(10, 21, 'optic'),
(11, 1, 'muzzle'),
(11, 2, 'muzzle'),
(11, 3, 'muzzle'),
(11, 58, 'barrel'),
(11, 4, 'barrel'),
(11, 59, 'barrel'),
(11, 7, 'underbarrel'),
(11, 8, 'underbarrel'),
(11, 19, 'underbarrel'),
(11, 10, 'mag'),
(11, 11, 'mag'),
(11, 60, 'mag'),
(11, 14, 'optic'),
(11, 13, 'optic'),
(11, 15, 'optic'),
(12, 30, 'muzzle'),
(12, 3, 'muzzle'),
(12, 2, 'muzzle'),
(12, 32, 'barrel'),
(12, 34, 'barrel'),
(12, 33, 'barrel'),
(12, 19, 'underbarrel'),
(12, 26, 'underbarrel'),
(12, 9, 'underbarrel'),
(12, 12, 'mag'),
(12, 27, 'mag'),
(12, 38, 'mag'),
(12, 20, 'optic'),
(12, 21, 'optic'),
(12, 61, 'optic'),
(13, 22, 'muzzle'),
(13, 23, 'muzzle'),
(13, 16, 'muzzle'),
(13, 43, 'barrel'),
(13, 6, 'barrel'),
(13, 33, 'barrel'),
(13, 44, 'underbarrel'),
(13, 45, 'underbarrel'),
(13, 9, 'underbarrel'),
(13, 46, 'mag'),
(13, 62, 'mag'),
(13, 47, 'mag'),
(13, 48, 'optic'),
(13, 49, 'optic'),
(13, 63, 'optic');

CREATE TABLE loadouts (
  id_loadout INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_arma INT NOT NULL,
  nome_loadout VARCHAR(100) NOT NULL,
  codigo_build VARCHAR(50),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_arma) REFERENCES armas(id_arma)
);
CREATE TABLE loadout_acessorios (
  id_loadout INT NOT NULL,
  id_acessorio INT NOT NULL,
  PRIMARY KEY (id_loadout, id_acessorio),
  FOREIGN KEY (id_loadout) REFERENCES loadouts(id_loadout) ON DELETE CASCADE,
  FOREIGN KEY (id_acessorio) REFERENCES acessorios(id_acessorio)
);
CREATE TABLE ranking_armas (
  id_ranking INT AUTO_INCREMENT PRIMARY KEY,
  id_arma INT NOT NULL,
  posicao INT NOT NULL,
  taxa_uso DECIMAL(5,2) NOT NULL,
  taxa_vitoria DECIMAL(5,2) NOT NULL,
  tendencia DECIMAL(5,2) DEFAULT 0.00,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_arma) REFERENCES armas(id_arma)
);
INSERT INTO ranking_armas (id_arma,posicao,taxa_uso,taxa_vitoria,tendencia) VALUES
(1, 1, 38.40, 56.30, 1.10),
(11, 2, 34.20, 54.80, 1.20),
(2, 3, 34.10, 54.20, 1.30),
(4, 4, 33.20, 54.90, 1.40),
(5, 5, 32.50, 54.10, 1.50),
(3, 6, 31.80, 53.70, 1.60),
(6, 7, 30.80, 53.40, 1.70),
(12, 8, 29.50, 53.20, 1.80),
(7, 9, 29.40, 52.90, 1.90),
(8, 10, 25.30, 60.10, 2.00),
(13, 11, 24.10, 59.10, 2.10),
(9, 12, 23.70, 58.60, 2.20),
(10, 13, 18.50, 48.20, 2.30);

CREATE TABLE banners (
  id_banner INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  subtitulo VARCHAR(255),
  imagem_url TEXT,
  ativo BOOLEAN DEFAULT TRUE,
  ordem INT DEFAULT 1
);
INSERT INTO banners (titulo, subtitulo, imagem_url, ativo, ordem) VALUES
('Modo Royale · Black Ops 6', 'Novo mapa e mecânicas de combate', 'https://t3.ftcdn.net/jpg/06/35/91/98/360_F_635919818_eRo1Iie9KQlPJSK0HvMp96p4wCmUKkiW.jpg', TRUE, 1),
('Ressurgência · Modo Duo', 'Volte à ação com seu parceiro', 'https://t3.ftcdn.net/jpg/11/63/70/32/360_F_1163703261_2Dqx3XnVNUmbGdSbS6h8pvvCjTTS6T6R.jpg', TRUE, 2),
('Novo Pacote Adicionado', 'Operador Shadow Company + skins exclusivas', 'https://t3.ftcdn.net/jpg/05/36/36/68/360_F_536366823_XcGr4cJ2FTl4hTZq4fOH2g3cMmZxx2tV.jpg', TRUE, 3);
CREATE TABLE estatisticas_sistema (
  id_estatistica INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  valor VARCHAR(50) NOT NULL,
  descricao TEXT
);
INSERT INTO estatisticas_sistema (nome, valor, descricao) VALUES
('Simulações TTK', '+2.1M', 'Quantidade simulada de testes de tempo de abate.'),
('Precisão Meta', '87%', 'Estimativa de precisão das recomendações de meta.'),
('Loadouts Criados', '+12K', 'Quantidade de loadouts criados pelos usuários.');
CREATE VIEW vw_armas_com_categoria AS
SELECT a.id_arma, a.nome AS arma, c.nome_categoria AS categoria, a.dano_base, a.cadencia_tiro,
       a.mobilidade_base, a.precisao_base, a.controle_recuo, a.taxa_uso, a.taxa_vitoria,
       a.status_meta, a.imagem_url
FROM armas a
INNER JOIN categorias_armas c ON a.id_categoria = c.id_categoria;

CREATE VIEW vw_ranking_completo AS
SELECT r.posicao, a.nome AS arma, c.nome_categoria AS categoria, r.taxa_uso, r.taxa_vitoria, r.tendencia, r.data_atualizacao
FROM ranking_armas r
INNER JOIN armas a ON r.id_arma = a.id_arma
INNER JOIN categorias_armas c ON a.id_categoria = c.id_categoria
ORDER BY r.posicao;

CREATE VIEW vw_acessorios_por_arma AS
SELECT a.nome AS arma, aa.slot, ac.nome AS acessorio, ta.nome_tipo
FROM armas_acessorios aa
INNER JOIN armas a ON aa.id_arma = a.id_arma
INNER JOIN acessorios ac ON aa.id_acessorio = ac.id_acessorio
INNER JOIN tipos_acessorios ta ON ac.id_tipo = ta.id_tipo
ORDER BY a.nome, aa.slot, ac.nome;

-- Consultas úteis para apresentar:
SELECT * FROM vw_armas_com_categoria;
SELECT * FROM vw_ranking_completo;
SELECT * FROM vw_acessorios_por_arma WHERE arma = 'MK35 ISR';
SELECT * FROM banners WHERE ativo = TRUE ORDER BY ordem;