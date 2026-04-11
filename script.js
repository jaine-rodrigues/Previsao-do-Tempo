/*
    Logica de programaçao
     -Algoritimos (Passo a Passo)

        Fluxo basico

     [x] Descobrir quando o botão foi clicado
     [x] Pegar o nome da ciade que o input recebeu
     [] Enviar a cidade para o servidor
     [] Pegar a resposta e colocar na tela
     [] 

        Fluxo de voz

    []  Descobrir quando o botão foi clicado
    []  Começa a ouvir a transcriçao
    []  Enviar a transcruçao para o servidor
    []  Pegar a resposta e colocar na tela


        Fluxo da AI

    []  Pega os dados da cidade
    []  Enviar dados para AI
    []  Colocar os dados na tela
*/ 




async function cliqueiNobotao(){
    let city = document.querySelector(".input-city").value
    let box =document.querySelector(".box")
    let kay ="5da69d42739af4096f319e9a9ea077cc"
    let endereco = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${kay}&units=metric&lang=pt_br`
    
    /*https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}*/

    let RespostaServidor = await fetch(endereco)
    let dadosJson = await RespostaServidor.json()
    console.log (dadosJson)
    box.innerHTML = ` 
        <h2 class="cidade">${dadosJson.name}</h2>
        <p class="temp">${dadosJson.main.temp} °C</p>
        <img class="icon" scr="https://openweathermap.org/payload/api/media/file/${dadosJson.weather[0].icon}@2x.png.png">
        <p class="umidade">${dadosJson.main.humidity}</p>
        <button class="btn-IA">Sugestao de roupa</button>
        <p class="respot-IA">Resposta da IA</p>
    
    `
}
    
