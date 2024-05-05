import { ELEMENTS, IMAGES } from './constantes.js';
import { IniciarJogo } from './iniciar_jogo.js';
import { Matematica } from './matematica.js';
import { GeradorObstaculos } from './obstaculo.js';
import { postOperation, getAllStudents, PostTurn} from './requisiçõesFetch.js';

// Inicialização do jogo
let intervalId;
let score = 0; // Contador de pontuação
let iniciarJogo = new IniciarJogo(ELEMENTS, loop);
let gerador = new GeradorObstaculos(ELEMENTS.obstaculos);
let operations = []; // Armazena as operações para envio posterior
let isJumping = false; // Variável para controlar se o personagem está pulando

// Função principal do jogo
function loop() {
    gerador.gerarObstaculos();
    setTimeout(() => {
        gameLoop(); // Loop de colisão depois de obstáculos serem gerados
    }, 50); // Pequeno atraso para garantir que elementos estejam prontos

    iniciarJogoAnimacao();
    const operacaoData = gerarQuestaoMatematica();
    
    adicionarVerificacao(operacaoData); // Adiciona a operação à lista de operações acumuladas
}

// Função para adicionar a operação gerada à lista de operações acumuladas
function adicionarVerificacao(operacaoData) {
    operations.push(operacaoData); // Armazena a operação para envio posterior
}

// Função para iniciar a animação do jogo
function iniciarJogoAnimacao() {
    ELEMENTS.personagem.classList.add("personagem-animado");
    ELEMENTS.personagem.classList.remove("personagem");
}

// Função para gerar questões matemáticas
function gerarQuestaoMatematica() {
    const operacaoData = Matematica.gerarOperacao();
    const { conta, resposta, fator1, fator2 } = operacaoData;
    const opcoes = Matematica.gerarOpcoes(resposta);

    adicionarQuestao(conta); // Exibe a operação na tela
    adicionarOpcoes(opcoes, resposta); // Adiciona as opções para escolha

    return { fator1, fator2, resposta, conta };    
}

// Função para adicionar a questão ao DOM
function adicionarQuestao(conta) {
    const questao = document.createElement("h2");
    questao.textContent = conta;
    ELEMENTS.operacao.appendChild(questao);
}

// Função para adicionar opções ao DOM
function adicionarOpcoes(opcoes, respostaCorreta) {
    opcoes.forEach(opcao => {
        const botao = document.createElement("button");
        botao.textContent = opcao;
        botao.addEventListener("click", () => verificarResposta(opcao, respostaCorreta));
        ELEMENTS.respostas.appendChild(botao);
    });
}

// Verificar resposta e atualizar score
function verificarResposta(respostaSelecionada, respostaCorreta) {
    if (respostaSelecionada === respostaCorreta) {
        score++; // Incrementa a pontuação
        atualizarScore(); // Atualiza a exibição na tela

        jump(); // O pulo agora não faz postagens para a API
        setTimeout(() => {
            limparTela();
            loop(); // Regenera as operações e opções
        }, 1000);
    } else {
        gameOver(); // Envia as operações acumuladas para a API
    }
}

// Função para pular
function jump() {
    if (!isJumping) {
        isJumping = true;
        ELEMENTS.personagem.classList.add("jump");
        setTimeout(() => {
            ELEMENTS.personagem.classList.remove("jump");
            isJumping = false;
        }, 1000);
    }
}

// Funções de limpeza e reinício do jogo
function limparTela() {
    ELEMENTS.operacao.innerHTML = "";
    ELEMENTS.respostas.innerHTML = "";
    limparObstaculos();
    removerElementosExtra();
}

// Função para limpar obstáculos
function limparObstaculos() {
    ELEMENTS.obstaculos.innerHTML = '';
}

// Funções de colisão e game over
function detectCollision(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

// Função para verificar colisões
function gameLoop() {
    if (!isJumping) {
        const obstaculos = ELEMENTS.obstaculos.children;
        const personagem = ELEMENTS.personagem;

        for (const obstaculo of obstaculos) {
            if (detectCollision(personagem, obstaculo)) {
                gameOver(); // Envia as operações acumuladas para a API
                clearInterval(intervalId); // Para o loop
                return;
            }
        }
    }
}

// Função para o Game Over e envio de operações acumuladas
async function gameOver() {
    console.log("Game Over!");

    try {
        const turnId = await createTurn(); // Criar um turno para enviar operações

        // Enviar todas as operações para a API com o turno
        for (const op of operations) {
            await postOperation(op.fator1, op.fator2, op.resposta, turnId);
        }

        // Limpar a lista de operações após envio
        operations = [];

        // Mostrar a tela de game over e opção para reiniciar
        limparTela();

        const img = document.createElement("img");
        img.src = IMAGES.gameOver;
        img.classList.add("game-over");
        ELEMENTS.board.appendChild(img);

        const botaoReiniciar = document.createElement("button");
        botaoReiniciar.textContent = "Reiniciar Jogo";
        botaoReiniciar.classList.add("botao-reiniciar");
        ELEMENTS.board.appendChild(botaoReiniciar);

        botaoReiniciar.addEventListener("click", reiniciarJogo); // Reiniciar o jogo

    } catch (error) {
        console.error("Erro ao processar o Game Over:", error);
        throw error; // Rethrow para propagar erro
    }
}

function reiniciarJogo() {
    // Remover elementos de game over
    const gameOverElement = document.querySelector('.game-over');
    const botaoReiniciar = document.querySelector('.botao-reiniciar');

    if (gameOverElement) {
        gameOverElement.remove();
    }

    if (botaoReiniciar) {
        botaoReiniciar.remove();
    }

    // Reinicializar o jogo
    limparTela(); 
    score = 0; // Reinicializa a pontuação
    atualizarScore(); 

    iniciarJogo = new IniciarJogo(ELEMENTS, loop);
    gerador = new GeradorObstaculos(ELEMENTS.obstaculos); 

    loop(); // Reinicia o loop
    intervalId = setInterval(gameLoop, 1); // Reinicia o loop de colisão
}

// Atualizar a pontuação
function atualizarScore() {
    const scoreElement = ELEMENTS.score; // Verifica a existência do elemento
    if (scoreElement) {
        scoreElement.textContent = `Pontuação: ${score}`;
    }
}

// Função para remover elementos extras
function removerElementosExtra() {
    const botaoReiniciar = document.querySelector('.botao-reiniciar');
    if (botaoReiniciar) {
        botaoReiniciar.remove();
    }

    const img = document.querySelector('.game-over');
    if (img) {
        img.remove();
    }
}

async function createTurn() {
    try {
      const estudantes = await getAllStudents(); // Buscar todos os estudantes
      if (!estudantes || estudantes.length === 0) {
        throw new Error("Nenhum estudante encontrado."); // Verifica se há estudantes
      }
  
      const estudante = estudantes[0]; // Obter o primeiro estudante
      const studentId = estudante.id; // Obter o `studentId`
  
      const turnResponse = await PostTurn(studentId); // Criar um turno com o `studentId`
      const turnId = turnResponse.id; // Obter o `turnId`
      
      return turnId;
    } catch (error) {
      console.error("Erro ao criar turno:", error); // Tratar exceção adequadamente
      throw error; // Rethrow para propagar erro
    }
  }
  