axios.defaults.headers.common['Authorization'] = 'aluW4tSyFUpSO8EQrjs9k6wI'



let nomeUsuario = prompt('Qual é o seu nome?')

let objetoUsuario = 
{
    name: nomeUsuario
}

let promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', objetoUsuario)

promessa.then(renderizarResposta)
promessa.catch(perguntarNovamente)

function renderizarResposta(resposta){
    console.log(resposta.status)
}

function perguntarNovamente() {

    nomeUsuario = prompt('Qual é o seu nome?')

    objetoUsuario = 
    {
    name: nomeUsuario
    }

    promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', objetoUsuario)

    promessa.then(renderizarResposta)
    promessa.catch(perguntarNovamente)

    function renderizarResposta(resposta){
        console.log(resposta.status)
    }
}

setInterval(permaneceOnline, 5000)

function permaneceOnline() {
    
    let promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', objetoUsuario)
    promessa.then(renderizarStatus)

    function renderizarStatus(resposta) {
        console.log(resposta)
    }

}




