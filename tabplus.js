
const personagem = document.querySelector('.personagem');
const personagem_animado = document.querySelector('.personagem-animado');
const iniciar = document.querySelector('.iniciar');
const operacao = document.querySelector('.texto-centralizado');
const respostas = document.querySelector('.respostas');
const obstaculos= document.querySelector('.obstaculos');

iniciar.addEventListener('click', () => {
    // Remove o botão de iniciar
    iniciar.remove();
  
    // Remove a imagem do personagem estático
    const imagemPersonagem = personagem.querySelector('img');
    if (imagemPersonagem) {
      imagemPersonagem.remove();
    }
  
    // Inicia o loop principal do jogo
    iniciarLoop();
  });

function iniciarLoop() {
    // Adiciona a classe "personagem-animado" ao personagem
    personagem.classList.add('personagem-animado');
  
    // Gera a operação matemática e as opções de resposta
    const operacaoData = gerarOperacao();
    const { conta, resposta, fator1, fator2 } = operacaoData;
    const opcoes = gerarOpcoes(resposta);
  
    // Exibe a operação matemática na tela
    const questao = document.createElement('h2');
    questao.textContent = conta;
    operacao.appendChild(questao);
  
    // Cria e exibe as opções de resposta na tela
    for (let i = 0; i < opcoes.length; i++) {
      const botao = document.createElement('button');
      botao.textContent = opcoes[i];
      botao.addEventListener('click', () => verificarResposta(opcoes[i], resposta));
      respostas.appendChild(botao);
    }
  
    // Gera obstáculos (se necessário)
    gerarObstaculos();
  
    // Define o tempo para a próxima iteração do loop
    setTimeout(() => {
      limparTela();
      iniciarLoop();
    }, tempoAtual);
  }


const jump = () => {
    personagem.classList.add("jump");

    setTimeout( () =>{

        personagem.classList.remove("jump")

    },1000)

};

function gerarObstaculos() {
    // Limpa obstáculos antigos
    obstaculos.innerHTML = '';
  
    // Define as probabilidades para cada obstáculo
    // O obstáculo 1 tem a maior probabilidade, seguido pelo 2 e, por fim, o 3
    const obstaculosTipos = [
      'obstaculo1', 'obstaculo1', 'obstaculo1', // Maior probabilidade para obstáculo 1
      'obstaculo2', 'obstaculo2',                // Probabilidade intermediária para obstáculo 2
      'obstaculo3'                               // Menor probabilidade para obstáculo 3
    ];
  
    // Função para escolher aleatoriamente um obstáculo baseado nas probabilidades
    function escolherObstaculo() {
      const indexAleatorio = Math.floor(Math.random() * obstaculosTipos.length);
      return obstaculosTipos[indexAleatorio];
    }
  
    // Escolhe um obstáculo para adicionar ao board
    const obstaculoEscolhido = escolherObstaculo(); // Obtém o obstáculo aleatório
    const obstaculo = document.createElement('div'); // Cria o obstáculo
    obstaculo.classList.add(obstaculoEscolhido); // Adiciona a classe do obstáculo escolhido
    obstaculos.appendChild(obstaculo); // Adiciona ao elemento pai
  
    // Define tempos de espera individuais para cada obstáculo
    const tempoEspera = {
      obstaculo1: 4000, // 4 segundos para obstáculo 1
      obstaculo2: 3000, // 3 segundos para obstáculo 2
      obstaculo3: 2000  // 2 segundos para obstáculo 3
    };
  
    // Define o tempo de espera de acordo com o obstáculo escolhido
    const tempoAtual = tempoEspera[obstaculoEscolhido];
  
    setTimeout(() => {
      //código para remover o obstáculo após o tempo de espera
      obstaculo.remove()
    }, tempoAtual);
  }

  // Gera uma operação matemática aleatória
function gerarOperacao() {
    // Funções auxiliares para gerar fatores aleatórios
    const fatoresFrequentes = () => [0, 1, 2, 5, 10][Math.floor(Math.random() * 5)];
    const fatoresSegundoMaisFrequentes = () => [3, 4][Math.floor(Math.random() * 2)];
    const fatoresMenosFrequentes = () => [6, 7, 8, 9][Math.floor(Math.random() * 4)];

    let fator1, fator2;

    // Seleciona aleatoriamente os fatores
    const randomIndex = Math.random();
    if (randomIndex < 0.5) {
        fator1 = fatoresFrequentes();
    } else if (randomIndex < 0.75) {
        fator1 = fatoresSegundoMaisFrequentes();
    } else {
        fator1 = fatoresMenosFrequentes();
    }

    const randomIndex2 = Math.random();
    if (randomIndex2 < 0.5) {
        fator2 = fatoresFrequentes();
    } else if (randomIndex2 < 0.75) {
        fator2 = fatoresSegundoMaisFrequentes();
    } else {
        fator2 = fatoresMenosFrequentes();
    }

    const conta = `${fator1} x ${fator2}`;

    return { conta: conta, resposta: fator1 * fator2, fator1, fator2 };
}


// Embaralha um array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Gera opções de resposta
function gerarOpcoes(respostaCorreta) {
    const opcoes = [respostaCorreta];
    while (opcoes.length < 3) {
        const respostaIncorreta = Math.floor(Math.random() * 100);
        if (!opcoes.includes(respostaIncorreta)) {
            opcoes.push(respostaIncorreta);
        }
    }
    return shuffleArray(opcoes);
}

function verificarResposta(respostaSelecionada, respostaCorreta) {
    // Verifica se a resposta selecionada está correta
    if (respostaSelecionada === respostaCorreta) {
        jump()
    } else {
      console.log('Resposta incorreta!');
    }
  
    // Limpa a tela para a próxima iteração
    limparTela();
    iniciarLoop();
  }

  function limparTela() {
    // Remove a operação matemática da tela
    operacao.innerHTML = '';
  
    // Remove as opções de resposta da tela
    respostas.innerHTML = '';
  
    // Remove a classe "personagem-animado" do personagem
    personagem.classList.remove('personagem-animado');
  }
  