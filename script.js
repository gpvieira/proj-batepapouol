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
    let promessa = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
    promessa.then(renderizarMensagens)

    function renderizarMensagens(mensagens){
        console.log(mensagens)
        arrayMensagens = mensagens.data
        console.log(arrayMensagens)

        let divMensagens = document.querySelector('main')

        divMensagens.innerHTML = ''

        for( i = 0; i < arrayMensagens.length; i++ ){

        divMensagens.innerHTML +=
        `
        <div class="mensagem"><p><span class="fonte-time">(${arrayMensagens[i].time})</span> <b>${arrayMensagens[i].from}</b> para <b>${arrayMensagens[i].to}</b>: ${arrayMensagens[i].text}</p></div>
        
        `
        } 
    }
}

function enviarMensagem(){
    let inputMensagem = document.querySelector('.digitar-msg')
    let mensagemASerEnviada = inputMensagem.value
    console.log(mensagemASerEnviada)

    let objetoASerEnviado = {
        from: nomeUsuario,
	    to: "Todos",
	    text: mensagemASerEnviada,
	    type: "message"
    }

    let promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', objetoASerEnviado)
    promessa.then(renderizarResposta)
    promessa.catch(atualizar)
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

function atualizar() {
    window.location.reload()
}




