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
    box.innerHTML = ` 
        <h2>Nome da Cidade</h2>
        <p>Temperatura</p>
        <img>
        <p>umidade</p>
        <button>Sugestao de roupa</button>
        <p>Resposta da AI</p>
    
    
    
    `
}
    
