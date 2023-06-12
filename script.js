axios.defaults.headers.common['Authorization'] = 'aluW4tSyFUpSO8EQrjs9k6wI'

let nomeUsuario = prompt('Qual é o seu nome?')
while (nomeUsuario === '' || nomeUsuario === null){
nomeUsuario = prompt('Digite um nome válido')
}

let objetoUsuario = 
{
    name: nomeUsuario
}

let promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', objetoUsuario)

promessa.then(renderizarResposta)
promessa.catch(perguntarNovamente)

function renderizarResposta(){
    let promessa = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
    promessa.then(renderizarMensagens)

    function renderizarMensagens(mensagens){

        console.log('Renderizar mensagens, atualizando a cada 3s')

        arrayMensagens = mensagens.data
        
        let divMensagens = document.querySelector('main')

        divMensagens.innerHTML = ''

        for( i = 0; i < arrayMensagens.length; i++ ){

        divMensagens.innerHTML +=
        `
        <div class="mensagem" data-test="message"><p><span class="fonte-time">(${arrayMensagens[i].time})</span> <b>${arrayMensagens[i].from}</b> para <b>${arrayMensagens[i].to}</b>: ${arrayMensagens[i].text}</p></div>
        
        `
        } 
    }
}

function enviarMensagem(){
    let inputMensagem = document.querySelector('.digitar-msg')
    let mensagemASerEnviada = inputMensagem.value
    
    let objetoASerEnviado = {
        from: nomeUsuario,
	    to: "Todos",
	    text: mensagemASerEnviada,
	    type: "message"
    }

    if (mensagemASerEnviada !== '' && mensagemASerEnviada !== null) {
    let promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', objetoASerEnviado)
    promessa.then(inputMensagem.value = '', renderizarResposta)
    promessa.catch(atualizar)
    }
}

function perguntarNovamente() {

    nomeUsuario = prompt('Digite outro nome, pois esse já está em uso')
    
    while (nomeUsuario === '' || nomeUsuario == null) {
        nomeUsuario = prompt('Digite um nome válido')
    }

    objetoUsuario = 
    {
        name: nomeUsuario
    }

    promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', objetoUsuario)

    promessa.then(renderizarResposta)
    promessa.catch(perguntarNovamente)
}

setInterval(permaneceOnline, 5000)

setInterval(renderizarResposta, 3000)

function permaneceOnline() {    
    let promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', objetoUsuario)
    promessa.then(console.log('Permanecer online, atualizando a cada 5s'))
}

function atualizar() {
    window.location.reload()
}


const inputEnter = document.querySelector('.digitar-msg');
inputEnter.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) {
    enviarMensagem()
    inputEnter.value = '';
  }
});