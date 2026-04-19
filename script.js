/*
    Logica de programaçao
     -Algoritimos (Passo a Passo)

        Fluxo basico

     [x] Descobrir quando o botão foi clicado
     [x] Pegar o nome da ciade que o input recebeu
     [x] Enviar a cidade para o servidor
     [x] Pegar a resposta e colocar na tela
     

        Fluxo de voz

    [x]  Descobrir quando o botão foi clicado
    [x]  Começa a ouvir a transcriçao
    [x]  Enviar a transcruçao para o servidor
    [x]  Pegar a resposta e colocar na tela


        Fluxo da AI

    [x]  Pega os dados da cidade
    [x]  Enviar dados para AI
    [x]  Colocar os dados na tela
*/
require('dotenv').config();
let kayIA = process.env.GROQ_API_KEY;


async function cliqueiNobotao() {
    let city = document.querySelector(".input-city").value;
    let box = document.querySelector(".box");
    let kay = "5da69d42739af4096f319e9a9ea077cc";
    
    let endereco = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${kay}&units=metric&lang=pt_br`;

    /*https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}*/

    let RespostaServidor = await fetch(endereco);
    let dadosJson = await RespostaServidor.json();
    console.log(dadosJson);

    // math.floor() *Arrendondar pra baixo
    box.innerHTML = ` 
        <h2 class="cidade">${dadosJson.name}</h2>
        <p class="temp">${Math.floor(dadosJson.main.temp)} °C</p>
        <img class="icon" src="https://openweathermap.org/payload/api/media/file/${dadosJson.weather[0].icon}.png">
        <p class="umidade">Umidade: ${dadosJson.main.humidity}%</p>
        <button class="btn-IA" onclick="pedirsugestao()">Sugestao de roupa</button>
        <p class="respot-IA"  ></p>
    
    `;
}

function detectavoz() {
    let reconhecimeto = new window.webkitSpeechRecognition();
    reconhecimeto.lang = "pt-BR";
    reconhecimeto.start();

    reconhecimeto.onresult = function (evento) {
        let texto = evento.results[0][0].transcript;

        document.querySelector(".input-city").value = texto;
        cliqueiNobotao();
    };
}
async function pedirsugestao() {
    let temperatura = document.querySelector(".temp").textContent;
    let city = document.querySelector(".input-city").textContent;
    let humidade = document.querySelector(".umidade").textContent;

    let resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + kayIA,
        },
        body: JSON.stringify({
            messages: [
                {
                    role: "user",
                    content: `Me de uma sujestao de qual roupa usar hoje
                        estou na cidade: ${city}, a temperatura atual é : ${temperatura}
                        e a humidade está em: ${humidade}.
                        Me de sugestao em duas frases curtas
                    
                    
                    `,
                },
            ],
            "model": "meta-llama/llama-4-scout-17b-16e-instruct"
        }),
    });

    let dados = await resposta.json()
        document.querySelector(".respot-IA").innerHTML = dados.choices[0].message.content
        console.log(dados)

}
   

/*
    Metodos ou verbos HPPT (method: " ")
    -GET: pegar dados do servidor
    -POST: Enviar dados do servidor / receber dados do servidor
    -PUT: Atualizar dados no servidor
    -DELETE: Deletar dados no servidor


*/
