import { ELEMENTS, IMAGES } from './constantes.js';
import { IniciarJogo } from './iniciar_jogo.js';
import { Matematica } from './matematica.js';
import { GeradorObstaculos } from './obstaculo.js';
import { postarAluno, postarQuestao, postarTurmaAno } from './requisiçõesFetch.js';

// Inicialização do jogo
let intervalId;
let score = 0; // Contador de pontuação
let iniciarJogo = new IniciarJogo(ELEMENTS, loop);
let gerador = new GeradorObstaculos(ELEMENTS.obstaculos);

// Funções de utilidade
function verificarOrientacao() {
    if (window.innerHeight > window.innerWidth) {
        alert("Por favor, gire o dispositivo para a orientação paisagem para jogar.");
    }
}

// Função principal do jogo
function loop() {
    // Gerador de obstáculos primeiro
    gerador.gerarObstaculos();
    
    // Tempo para os obstáculos serem inseridos no DOM
    setTimeout(() => {
        gameLoop(); // Loop de colisão depois de obstáculos serem gerados
    }, 50); // Pequeno atraso para garantir que elementos estejam prontos

    iniciarJogoAnimacao();
    gerarQuestaoMatematica();
}

window.addEventListener("DOMContentLoaded", () => {
    verificarOrientacao();
    window.addEventListener("orientationchange", verificarOrientacao);
    iniciarJogo; // Para garantir que o jogo começou corretamente
    
    // Loop de colisão após o loop principal
    intervalId = setInterval(gameLoop, 5); 
});

function iniciarJogoAnimacao() {
    ELEMENTS.personagem.classList.add('personagem-animado');
    ELEMENTS.personagem.classList.remove('personagem')
}

// Função para gerar questões matemáticas
function gerarQuestaoMatematica() {
    const operacaoData = Matematica.gerarOperacao();
    const { conta, resposta, fator1, fator2 } = operacaoData;
    const opcoes = Matematica.gerarOpcoes(resposta);

    adicionarQuestao(conta);
    adicionarOpcoes(opcoes, resposta);
    console.log(operacaoData)
    return operacaoData;    
}

function adicionarQuestao(conta) {
    const questao = document.createElement('h2');
    questao.textContent = conta;
    ELEMENTS.operacao.appendChild(questao);
}

function adicionarOpcoes(opcoes, respostaCorreta) {
    opcoes.forEach(opcao => {
        const botao = document.createElement('button');
        botao.textContent = opcao;
        botao.addEventListener('click', () => verificarResposta(opcao, respostaCorreta));
        ELEMENTS.respostas.appendChild(botao);
    });
}

function verificarResposta(respostaSelecionada, respostaCorreta) {
    if (respostaSelecionada === respostaCorreta) {
        score++; // Incrementa a pontuação
        atualizarScore(); // Atualiza a exibição na tela
        jump();
        setTimeout(() => {
            limparTela();
            loop(); // Regenera as operações e opções
        }, 1000);
    } else {
        gameOver();
    }
}

let isJumping = false; // Variável para controlar se o personagem está pulando

// Função para iniciar o pulo do personagem
function jump() {
    if (!isJumping) { // Verifica se o personagem já está no ar
        isJumping = true; // Define que o personagem está pulando
        ELEMENTS.personagem.classList.add("jump");
        setTimeout(() => {
            ELEMENTS.personagem.classList.remove("jump");
            isJumping = false; // Define que o personagem terminou o pulo
        }, 1000);
    }
    gameLoop(); // Chama o gameLoop após o pulo
}

// Funções para limpeza e reinício do jogo
function limparTela() {
    ELEMENTS.operacao.innerHTML = '';
    ELEMENTS.respostas.innerHTML = '';
    limparObstaculos();
    removerElementosExtra();
}

function limparObstaculos() {
    ELEMENTS.obstaculos.innerHTML = '';
}

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

// Funções de detecção de colisões e game over
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

// Função para verificar colisões e terminar o jogo se houver
function gameLoop() {
    if (!isJumping) { // Verifica se o personagem está no ar
        const obstaculos = ELEMENTS.obstaculos.children;
        const personagem = ELEMENTS.personagem;

        for (const obstaculo of obstaculos) {
            if (detectCollision(personagem, obstaculo)) {
                gameOver(); 
                clearInterval(intervalId);
                return;
            }
        }
    }
}

// Função para terminar o jogo
function gameOver() {
    console.log("Game Over!");
    limparTela(); 

    const img = document.createElement("img");
    img.src = IMAGES.gameOver;
    img.classList.add('game-over');
    ELEMENTS.board.appendChild(img);

    const botaoReiniciar = document.createElement('button');
    botaoReiniciar.textContent = "Reiniciar Jogo";
    botaoReiniciar.classList.add("botao-reiniciar");
    ELEMENTS.board.appendChild(botaoReiniciar);
    botaoReiniciar.addEventListener('click', reiniciarJogo);
}

function reiniciarJogo() {

    // Remova a tela de game over e reinicie o jogo
    const gameOverElement = document.querySelector('.game-over');
    const botaoReiniciar = document.querySelector('.botao-reiniciar');
    
    if (gameOverElement) {
        gameOverElement.remove();
    }
    
    if (botaoReiniciar) {
        botaoReiniciar.remove();
    }
        
    // Reinicializa a lógica do jogo
    limparTela();
    
    score = 0; // Redefine a pontuação para zero ao reiniciar o jogo
    atualizarScore(); // Atualiza a exibição na tela
    
    iniciarJogo = new IniciarJogo(ELEMENTS, loop); // Cria uma nova instância de IniciarJogo
    gerador = new GeradorObstaculos(ELEMENTS.obstaculos); // Cria um novo gerador de obstáculos
    
    loop(); // Reinicia o loop do jogo
    intervalId = setInterval(gameLoop, 1); // Recomeça o loop de colisão
}


function atualizarScore() {
    // Atualiza a exibição da pontuação
    const scoreElement = ELEMENTS.score; // Um elemento no DOM para exibir a pontuação
    if (scoreElement) {
        scoreElement.textContent = `Pontuação: ${score}`;
    }
}


