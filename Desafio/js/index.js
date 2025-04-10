const weatherURL = "http://api.weatherapi.com/v1/current.json?key=3d9c4822c52848ce88b134021250404&q="
const defaultCity = "Maceió"

function getCity(){
    if(document.getElementById("searchBar").value != ''){
        return document.getElementById("searchBar").value
        
    }else{
        return defaultCity
        }
}

async function callApi(url, city) {
    const resposta = await fetch(url + city);

    if(resposta.status === 200) {
        const dados = await resposta.json();
        //console.log(dados)
        createElements(dados, city)
    }else{
        console.log(resposta.status)
    }
    
}

function createElements(dados, city){   

    const cidade = document.getElementById("h2-clima")
    const img = document.getElementById("img-status")
    const temperatura = document.getElementById("temperatura")
    const umidade = document.getElementById("umidade")
    const vel_vento = document.getElementById("vel-vento")

    cidade.innerHTML =  "Clima em " + city
    img.src = "https:" + dados.current.condition.icon
    temperatura.innerText = `Temperatura: ${dados.current.temp_c}° C`
    umidade.innerText = `Umidade: ${dados.current.humidity} %`
    vel_vento.innerText = `Velocidade do vento: ${dados.current.wind_kph} km/h`

    let texto = document.createElement("input")
    texto.innerText
    }


function run(){

 callApi(weatherURL, getCity())

}