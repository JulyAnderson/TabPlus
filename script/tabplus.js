import { ELEMENTS,IMAGES } from './constantes.js';
import { IniciarJogo } from './iniciar_jogo.js';
import { Matematica } from './matematica.js';
import { GeradorObstaculos } from './obstaculo.js';

let gameOverInicio = false;
const iniciarJogo = new IniciarJogo(ELEMENTS, loop);
const gerador = new GeradorObstaculos(ELEMENTS.obstaculos);



function loop() {
    ELEMENTS.personagem.classList.add('personagem-animado');
    gerador.gerarObstaculos();

    const operacaoData = Matematica.gerarOperacao();
    const { conta, resposta } = operacaoData;
    const opcoes = Matematica.gerarOpcoes(resposta);
  
    const questao = document.createElement('h2');
    questao.textContent = conta;
    ELEMENTS.operacao.appendChild(questao);
  
    for (let i = 0; i < opcoes.length; i++) {
        const botao = document.createElement('button');
        botao.textContent = opcoes[i];
        botao.addEventListener('click', () => verificarResposta(opcoes[i], resposta));
        ELEMENTS.respostas.appendChild(botao);
    }
};

const jump = () => {
    ELEMENTS.personagem.classList.add("jump");

    setTimeout(() => {
        ELEMENTS.personagem.classList.remove("jump");
    }, 1000);
};

function verificarResposta(respostaSelecionada, respostaCorreta) {
  if (respostaSelecionada === respostaCorreta) {
      jump();
      setTimeout(() => {
          limparTela();
          loop(); // Regenera as operações e opções
      }, 1000);
  } else {
      gameOverInicio = true;
      gameOver();
  }
};

function limparTela() {
    ELEMENTS.operacao.innerHTML = '';
    ELEMENTS.respostas.innerHTML = '';
    limparObstaculos();
    //ELEMENTS.personagem.classList.remove('personagem-animado');
    const botaoReiniciar = document.querySelector('.botao-reiniciar');
    if (botaoReiniciar) {
        botaoReiniciar.remove();
    }
    const img = document.querySelector('.game-over');
    if (img) {
        img.remove();
    }
};

function limparObstaculos() {
  const divObstaculos = ELEMENTS.obstaculos;
  divObstaculos.innerHTML = ''; // Remove todos os elementos filhos
};

function detectCollision(objetoA, objetoB) {
    return objetoA.x < objetoB.x + objetoB.width &&
        objetoA.x + objetoA.width > objetoB.x &&
        objetoA.y < objetoB.y + objetoB.height &&
        objetoA.y + objetoA.height > objetoB.y;
};

function gameOver() {
    const div = ELEMENTS.obstaculos;
    const obstaculos = div.children;
    const obstaculo = obstaculos[0];
    const obstaculounico = document.querySelector(`.${obstaculo.className}`);
    const personagem_animado = ELEMENTS.personagemAnimado;
    console.log(personagem_animado)

    if (gameOverInicio || detectCollision(obstaculounico, personagem_animado)) {
        limparTela();
        const img = document.createElement("img");
        img.src= IMAGES.gameOver;
        img.classList.add('game-over');
        ELEMENTS.board.appendChild(img);
        const botaoReiniciar = document.createElement('button');
        botaoReiniciar.textContent = "Reiniciar Jogo";
        botaoReiniciar.classList.add( "botao-reiniciar");
        ELEMENTS.board.appendChild(botaoReiniciar);
        botaoReiniciar.addEventListener('click', reiniciarJogo);
    }
};

function reiniciarJogo() {
  gameOverInicio = false; // Reseta a flag de game over
  limparTela(); // Limpa a tela
  loop(); // Inicia o loop do jogo novamente
};
