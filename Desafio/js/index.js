const weatherURL =
  "http://api.weatherapi.com/v1/current.json?key=3d9c4822c52848ce88b134021250404&q=";
const newsURL =
  "https://gnews.io/api/v4/search?q=exemple&lang=en&max=3&apikey=e4082adb340ee17ad39ff1eabf7f1e6a";
const defaultCity = "Maceió";

function getCity() {
  if (document.getElementById("searchBar").value != "") {
    return document.getElementById("searchBar").value;
  } else {
    return defaultCity;
  }
}

async function callApiWeather(url, city) {
  const resposta = await fetch(url + city);
  if (resposta.status === 200) {
    const dados = await resposta.json();
    createWeather(dados, city);
    callNewsApi(dados.location.country);
  } else {
    console.log(resposta.status);
  }
}

async function callNewsApi(pais) {
  let urlCompleta = newsURL.replace("exemple", pais);

  const resposta = await fetch(urlCompleta);
  if (resposta.status === 200) {
    let dados = await resposta.json();
    createNews(dados);
    console.log(dados.articles[0]);
    console.log(dados.articles.length);
  } else {
    console.log(resposta.status);
  }
}

function createNews(dados) {
  for (i = 0; i < dados.articles.length; i++) {
    if (document.getElementById("div" + i).hasChildNodes() == false) {
      let titulo = document.createElement("h5");
      let paragrafo = document.createElement("p");
      let link = document.createElement("a");

      titulo.setAttribute("id", "titulo" + i);
      titulo.innerText = dados.articles[i].title;

      paragrafo.setAttribute("id", "p" + i);
      paragrafo.innerText = dados.articles[i].description;

      link.setAttribute("id", "link" + i);
      link.setAttribute("href", dados.articles[i].url);
      link.innerText = "Clique aqui para continuar lendo";
      link.setAttribute("target", "_blank");

      document.getElementById("div" + i).appendChild(titulo);
      document.getElementById("div" + i).appendChild(paragrafo);
      document.getElementById("div" + i).appendChild(link);
    } else {
      document.getElementById("titulo" + i).innerText = dados.articles[i].title;
      document.getElementById("p" + i).innerText =
        dados.articles[i].description;
      document
        .getElementById("link" + i)
        .setAttribute("href", dados.articles[i].url);
    }
  }
}

function createWeather(dados, city) {
  const cidade = document.getElementById("h3-clima");
  const img = document.getElementById("img-status");
  const temperatura = document.getElementById("temperatura");
  const umidade = document.getElementById("umidade");
  const vel_vento = document.getElementById("vel-vento");

  cidade.innerHTML = "Clima em " + city;
  img.src = "https:" + dados.current.condition.icon;
  temperatura.innerText = `Temperatura: ${dados.current.temp_c}° C`;
  umidade.innerText = `Umidade: ${dados.current.humidity} %`;
  vel_vento.innerText = `Velocidade do vento: ${dados.current.wind_kph} km/h`;

  let texto = document.createElement("input");
  texto.innerText;
}

function run() {
  callApiWeather(weatherURL, getCity());
}
