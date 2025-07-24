/*As variaveis abaixos estão armazenando toda a estrutura HTML referente ao ID selecionado, ou seja, estas varivaies armazenando toda a estrutura do input incluindo o valor inserido pelo usuário, toda a estrutura do button e etc*/
const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const form = document.getElementById('form')
const aiResponse = document.getElementById('aiResponse')

const markdownToHTML = (text) => { // aqui estamos declarando uma função chamada markdownToHTML que recebe por parametro a variavel text
    const converter = new showdown.Converter() //Neste código, está sendo criado um objeto baseado na classe showdown.Converter() da biblioteca Showdown. Esse objeto, chamado converter, agora possui métodos que podem ser usados — como o makeHtml(), que converte texto em Markdown para HTML.
    return converter.makeHtml(text) //Aqui eu estou chamando o método makeHtml que pega o texto em markdown armazenado pela variavel text e o converte em HTML, retornando assim HTML 
}

//Minha chave de API : AIzaSyA3JJU21-S_t5FjrZFBz3yWNk5o3brMoYY
async function perguntarAI(question, game, apiKey){ /*Aqui nós definimos a função como assincrona(async) ou seja ela fará uma solicitação neste caso a IA e só seguirá com execução depois que receber uma resposta. Estamos também recebendo os dados por parametro*/
    const model = "gemini-2.0-flash" //este é o modelo que iremos utilizar, para saber qual o modelo atual basta procurar google gemini documentos
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}` 
    const pergunta = `
    ## Especialidade 
    Você é um especialista assistente de meta para o jogo ${game}
    ## Tarefa
    Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas

    ## Regras
    - Se você não sabe a resposta, responda com "Não sei" e não tente inventar uma resposta.
    - Se a pergunta não está relacionada ao jogo, responda com 
    'Essa pergunta não está relacionada ao jogo'
    - Considere a data atual ${new Date().toLocaleString()}
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
    - Nunca responda itens que você não tenha certeza de que existe no patch atual. 

    ## Resposta 
    - Economize na resposta, seja direto e responda no máximo 500 caracteres. 
    - Responda em markdown
    - Não precisa fazer nem uma saudação ou despedida, apenas responda o que o usauário está querendo.  

    ## Exemplo de resposta
    pergunta do usuário: Melhor build rengar jungle 
    reposta: A build mais atual é: \n\n **Itens:**\n\n coloque os itens aqui. \n\n**Runs:**\n\nexemplo de runas\n\n

    ---
    Aqui está a pergunta do usúario:  ${question}
    `

    const contents = [{
        role: "user",
        parts : [{
            text: pergunta 
        }]
    }]
// O trecho acima está estruturando a pergunta para que ela possa ser enviada ao google gemini de um forma que ele seja capaz de compreender 

const tools = [{
    google_search: {}
}] // A constante tools(ferramenta), armazena a ferrramenta google_search que está sendo passado para o google gemini permitindo que a IA utilize o buscar do google para coletar informações atualizadas sobre os jogos.

//chamada API
const response = await fetch(geminiURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        contents,
        tools
    })
})
/* 
1- no código acima estamos enviando um requisição HTTP do tipo POST
2- definindo no headers(cabeçalho) que o corpo da requisição será no formato JSON
3-  no body estamos tranformando os dados contents e tools em uma string json
4- Em resumo, estamos enviando a pergunta(contents) e a permissão de busca(tools) via POST para o gemini 
*/

//Resposta AI
const data = await response.json() //espera pela respota da API e converte para objeto JavaScript
console.log(data) //Imprimi a resposta completa com todos os dados na terminal, 
return data.candidates[0].content.parts[0].text //Aqui ele vai retornar apenas a resposta gerada pelo Gemini

}//fecha a função  perguntarAI


async function enviarFormulario(event){
    event.preventDefault() //Impede que o site fique recarregando 
    /* Diferentemente das variáveis acima que armazenando toda a estrutura, as variáveis abaixo as utilizam para pegar apenas os valores inseridos/selecionados */
    const apiKey = apiKeyInput.value
    const game = gameSelect.value
    const question = questionInput.value

    console.log({apiKey, game, question});

    if(apiKey == '' || game == '' || question == ''){
        alert('Por favor, preencha todos os campos')
        return /*Este return está servindo para interromper a execução da função*/
    }

    askButton.disabled = true; /*este comando desabilita o botão*/
    askButton.textContent = 'Perguntando...'; /*este comando altera o texto interno do botão de 'perguntar' para 'perguntando'*/
    askButton.classList.add('loading'); /*este comando adiciona uma classe(loading) ao botão*/

    try{
        //perguntar para ia 
        const text = await perguntarAI(question, game,apiKey); /*Aqui estamos executando a função perguntarAI passando por parametro os dados, onde a pergunta ficará armazenada na variavel text*/
        aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text) //nós estamos pegando a estrutura html armazenada dentro da variavel aiResponse, e dentre toda a estrutura estamos pegando a que tem a classe response-content e chamando a função markToHTML e por prametro text, o que fará com o o conteúdo armazenado pela variavel text seja inserido dentro da estrutura html selecionada, porém já transformado de markdown para HTML, resumo: isto fará com que apareça na tela logo em baixo dos inputs a resposta da IA a nossa pergunta
        aiResponse.classList.remove('hidden')/*aqui ele está removendo a classe hidden de um elemento HTML com um identificador(id, class e etc) chamado aiResponse, fazendo com que a config css da classe hiden não seja mais aplicada, tornando a estrutura HTML visivel*/
    }catch(error){ /*Aqui estamos apenas exibindo no terminal o erro*/
        console.log('Error: ', error);
    }finally{ /*Aqui estamos restaurando o botão a funcionalidades, isto ocorrá de qualquer forma, ou seja, tendo erro ou não o botão volta ao normal*/
        askButton.disabled = false; /*desabilitamos a desabilitação do botão, ou seja, habilitamos o botão novamente, agora pode-se clicar nele novamnete*/
        askButton.textContent = 'Perguntar'; /*Alteramos o texto do botão para oque era antes */
        askButton.classList.remove('loading'); /*retiramos a classe loading do botão, retirando assim do botão as config CSS aplicadas a classe*/
    }
}

form.addEventListener('submit', enviarFormulario)
