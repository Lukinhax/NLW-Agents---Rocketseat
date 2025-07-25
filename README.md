# 💡 Projeto: Assistente de Meta – NLW Agents (Rocketseat)

Este projeto foi desenvolvido durante o evento **NLW - Agents** promovido pela [Rocketseat](https://www.rocketseat.com.br/), com foco em criar uma aplicação web que se conecta com a Inteligência Artificial **Google Gemini**, oferecendo **dicas, builds e estratégias atualizadas para jogos populares**.

---

## 🚀 Funcionalidades

- Consulta de estratégias e builds para:
  - **League of Legends (LoL)**
  - **CS:GO**
  - **Valorant**
- Integração com a **API do Google Gemini**
- Interface responsiva e moderna
- Conversão automática de **Markdown para HTML** (com Showdown.js)
- Exibição direta da resposta da IA na tela
- Lógica condicional que adapta a pergunta conforme o jogo selecionado

---

## 🧰 Tecnologias utilizadas

- **HTML5** – Estruturação da página
- **CSS3** – Estilização e responsividade
- **JavaScript (puro)** – Lógica de funcionamento, requisições, manipulação DOM
- **Google Gemini API** – Inteligência artificial para gerar respostas contextualizadas
- **Showdown.js** – Conversão de respostas em Markdown para HTML

---

## 🧠 Lógica dinâmica com engenharia de prompt

O projeto implementa uma **estrutura condicional (`if...else`)** para detectar qual jogo o usuário selecionou no formulário e, com base nisso, envia um **prompt personalizado** para o Google Gemini.

Cada jogo possui um prompt com **linguagem, regras e exemplos específicos**, otimizados por **engenharia de prompt**:

### 🔹 League of Legends (LoL)
- Dicas de builds, runas, estratégias e patch atual
- Foco em campeões e metas competitivas

### 🔹 CS:GO
- Táticas de ataque/defesa (CT/TR), economia, mapas e utilitários (smoke, flash, molotov)
- Padrões realistas com exemplos claros

### 🔹 Valorant
- Escolha de agentes, composições de time, estratégias por mapa
- Sinergia de habilidades e posicionamento tático

Essa abordagem garante que a IA responda com **coerência e profundidade**, focando em qualidade e atualidade.

---

## 🛠️ Como abrir e executar o projeto

- Para visualizar o projeto basta copiar o arquivo para a sua maquina e rodar o arquivo index, que ele abrirá o projeto no seu navegador.

- Para executar o projeto você precisa de uma API Key da Google Gemini(É gratuito). Em seguida cole-a no campo "Informe a API KEY do Gemini"
- Escolha um jogo (LoL, Valorant ou CS:GO)
- Digite sua pergunta
- Por fim, clique no botão perguntar. 

