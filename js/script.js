// ==========================================
// API 1: RandomUser (Página perfil.html)
// ==========================================
async function buscarPerfil() {
  const container = document.getElementById("resultado-api");
  container.innerHTML = "Carregando perfil do torcedor...";

  try {
    const resposta = await fetch("https://randomuser.me/api/?nat=br");
    const dados = await resposta.json();
    const usuario = dados.results[0];

    container.innerHTML = `
      <div style="margin-top: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: #fff;">
        <img src="${usuario.picture.large}" alt="Foto do torcedor" style="border-radius: 50%; margin-bottom: 10px;">
        <h3>${usuario.name.first} ${usuario.name.last}</h3>
        <p><strong>Cidade:</strong> ${usuario.location.city} - ${usuario.location.state}</p>
        <p><strong>E-mail:</strong> ${usuario.email}</p>
        <p><strong>Sócio-Torcedor Nº:</strong> #${usuario.login.salt.toUpperCase()}</p>
      </div>
    `;
  } catch (erro) {
    container.innerHTML = "Erro ao conectar com a API de perfil.";
    console.error(erro);
  }
}

// ==========================================
// API 2: TheSportsDB (Página campeonatos.html)
// ==========================================
async function buscarTime() {
  const nomeTime = document.getElementById("campo-time").value.trim();
  const container = document.getElementById("resultado-time");

  if (!nomeTime) {
    container.innerHTML = "Por favor, digite o nome de um clube.";
    return;
  }

  container.innerHTML = "Buscando informações do clube...";

  try {
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(nomeTime)}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (!dados.teams) {
      container.innerHTML = "Clube não encontrado. Tente outro nome (ex: Santos, Barcelona, Chelsea).";
      return;
    }

    const time = dados.teams[0];
    container.innerHTML = `
      <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: #fff;">
        <img src="${time.strBadge}" alt="Escudo do ${time.strTeam}" style="width: 80px; margin-bottom: 10px;">
        <h3>${time.strTeam} (${time.strCountry})</h3>
        <p><strong>Ano de Fundação:</strong> ${time.intFormedYear || "Não informado"}</p>
        <p><strong>Estádio:</strong> ${time.strStadium || "Não informado"}</p>
        <p><strong>Liga Principal:</strong> ${time.strLeague || "Não informada"}</p>
      </div>
    `;
  } catch (erro) {
    container.innerHTML = "Erro ao consultar a API de futebol.";
    console.error(erro);
  }
}

// ==========================================
// API 3: Open-Meteo (Página noticias.html)
// ==========================================
async function buscarTime() {
  const campo = document.getElementById("campo-time");
  const container = document.getElementById("resultado-time");
  if (!campo || !container) return;

  const nomeTime = campo.value.trim();
  if (!nomeTime) {
    container.innerHTML = "Por favor, digite o nome de um clube.";
    return;
  }

  container.innerHTML = "Buscando informações do clube...";

  try {
    const tituloFormatado = encodeURIComponent(nomeTime.replace(/\s+/g, "_"));
    const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${tituloFormatado}`;
    const resposta = await fetch(url);

    if (!resposta.ok) {
      container.innerHTML = "Clube não encontrado. Tente outro nome (ex: Flamengo, Palmeiras, Santos).";
      return;
    }

    const dados = await resposta.json();
    const imagemHtml = dados.thumbnail
      ? `<img src="${dados.thumbnail.source}" alt="${dados.title}" style="max-width: 140px; border-radius: 8px; margin-bottom: 10px;">`
      : "";

    container.innerHTML = `
      <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: #fff;">
        ${imagemHtml}
        <h3>${dados.title}</h3>
        <p>${dados.extract || "Descrição não disponível."}</p>
      </div>
    `;
  } catch (erro) {
    container.innerHTML = "Erro ao consultar a API de clubes.";
    console.error(erro);
  }
}

async function buscarResultados() {
  const container =
    document.getElementById("resultado-resultados") ||
    document.getElementById("resultado-api") ||
    document.getElementById("resposta");

  if (!container) return;

  container.innerHTML = "Buscando resultados recentes...";

  try {
    // Exemplo usando a API pública da Wikipedia para buscar partidas/resultados da Copa do Mundo ou Brasileirão
    const url = "https://pt.wikipedia.org/api/rest_v1/page/summary/Campeonato_Brasileiro_de_Futebol";
    const resposta = await fetch(url);

    if (!resposta.ok) {
      container.innerHTML = "Não foi possível carregar os dados no momento.";
      return;
    }

    const dados = await resposta.json();

    container.innerHTML = `
      <div style="margin-top: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: #fff;">
        <h3>${dados.title}</h3>
        <p>${dados.extract || "Informações indisponíveis no momento."}</p>
      </div>
    `;
  } catch (erro) {
    container.innerHTML = "Erro ao conectar com a API de resultados.";
    console.error(erro);
  }
}

async function buscarTimes() {
  const campo =
    document.getElementById("campo-time") ||
    document.getElementById("campo-times") ||
    document.getElementById("nome-time");

  const container =
    document.getElementById("resultado-times") ||
    document.getElementById("resultado-time") ||
    document.getElementById("resultado-api") ||
    document.getElementById("resposta");

  if (!container) return;

  const nomeTime = campo ? campo.value.trim() : "Flamengo";
  if (!nomeTime) {
    container.innerHTML = "Digite o nome de um time para buscar.";
    return;
  }

  container.innerHTML = "Buscando informações do time...";

  try {
    const tituloFormatado = encodeURIComponent(nomeTime.replace(/\s+/g, "_"));
    const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${tituloFormatado}`;
    const resposta = await fetch(url);

    if (!resposta.ok) {
      container.innerHTML = "Time não encontrado. Tente outro nome (ex: Palmeiras, Corinthians, São Paulo).";
      return;
    }

    const dados = await resposta.json();
    const imagemHtml = dados.thumbnail
      ? `<img src="${dados.thumbnail.source}" alt="${dados.title}" style="max-width: 140px; border-radius: 8px; margin-bottom: 10px;">`
      : "";

    container.innerHTML = `
      <div style="margin-top: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: #fff;">
        ${imagemHtml}
        <h3>${dados.title}</h3>
        <p>${dados.extract || "Informações indisponíveis no momento."}</p>
      </div>
    `;
  } catch (erro) {
    container.innerHTML = "Erro ao consultar a API de times.";
    console.error(erro);
  }
}

function responderQuiz(escolha) {
  const resposta =
    document.getElementById("resposta") ||
    document.getElementById("resultado-api") ||
    document.getElementById("resultado-time") ||
    document.getElementById("resultado-times") ||
    document.getElementById("resultado-clima");

  if (!resposta) return;

  if (escolha === "Brasil") {
    resposta.textContent = "Correto! O Brasil venceu a Copa do Mundo de 2002.";
  } else {
    resposta.textContent = "Quase! A seleção campeã da Copa do Mundo de 2002 foi o Brasil.";
  }
}

function mostrarTabela() {
  const container =
    document.getElementById("resultado-tabela") ||
    document.getElementById("resultado-api") ||
    document.getElementById("resposta");

  if (!container) return;

  container.innerHTML = `
    <div style="margin-top: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: #fff; overflow-x: auto;">
      <h3>Classificação de Exemplo</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background: #f4f4f4; text-align: left;">
            <th style="padding: 8px; border-bottom: 1px solid #ddd;">Pos</th>
            <th style="padding: 8px; border-bottom: 1px solid #ddd;">Time</th>
            <th style="padding: 8px; border-bottom: 1px solid #ddd;">PTS</th>
            <th style="padding: 8px; border-bottom: 1px solid #ddd;">V</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">1º</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">Flamengo</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">70</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">21</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">2º</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">Palmeiras</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">68</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">20</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">3º</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">Botafogo</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">65</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">19</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function mostrarAviso() {
  const resposta =
    document.getElementById("resposta") ||
    document.getElementById("resultado-api") ||
    document.getElementById("resultado-time") ||
    document.getElementById("resultado-times") ||
    document.getElementById("resultado-clima") ||
    document.getElementById("resultado-tabela");

  if (!resposta) return;

  const pagina = window.location.pathname.toLowerCase();

  if (pagina.includes("treinamento.html")) {
    resposta.textContent = "Dica de treino: aqueça bem, trabalhe passe, finalização e resistência física!";
  } else if (pagina.includes("historia.html")) {
    resposta.textContent = "O futebol moderno surgiu na Inglaterra no século XIX e conquistou o mundo.";
  } else if (pagina.includes("regras.html")) {
    resposta.textContent = "São 11 jogadores por time em dois tempos de 45 minutos, com apenas o goleiro podendo usar as mãos na área.";
  } else if (pagina.includes("posicoes.html")) {
    resposta.textContent = "Goleiro, zagueiros, laterais, volantes, meias e atacantes formam a equipe em campo.";
  } else if (pagina.includes("jogadores.html")) {
    resposta.textContent = "Grandes craques marcaram gerações com dribles, gols e liderança dentro de campo.";
  } else if (pagina.includes("galeria.html")) {
    resposta.textContent = "Momentos marcantes, estádios lotados e comemorações fazem parte da história do esporte.";
  } else if (pagina.includes("campeonatos.html")) {
    resposta.textContent = "Explore as principais competições nacionais e internacionais.";
  } else if (pagina.includes("noticias.html")) {
    resposta.textContent = "Fique por dentro das novidades e informações do futebol.";
  } else {
    resposta.textContent = "Bem-vindo à Central do Futebol! Use o menu acima para navegar.";
  }
}
