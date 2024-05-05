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
let turnId = 0
let operations = []


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
    return { fator1, fator2, resposta, conta };    
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

function verificarResposta(respostaSelecionada, respostaCorreta, fator1, fator2,resposta) {
    if (respostaSelecionada === respostaCorreta) {
        score++; // Incrementa a pontuação
        atualizarScore(); // Atualiza a exibição na tela


        jump(fator1, fator2, resposta);
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
async function jump(fator1, fator2, resposta) {
    if (!isJumping) {
      isJumping = true;
  
      try {
        const turnId = await createTurn(); // Criar um novo turno e obter o turnId
        
        await postOperation(fator1, fator2, resposta, turnId); // Postar operação com turnId
  
        ELEMENTS.personagem.classList.add("jump");
        setTimeout(() => {
          ELEMENTS.personagem.classList.remove("jump");
          isJumping = false; // Pulo terminou
        }, 1000);
  
      } catch (error) {
        console.error("Erro no salto:", error);
      }
    }
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
async function gameOver() {
    console.log("Game Over!");
  
    try {
      const turnId = await createTurn(); // Criar um novo turno
  
      if (!turnId) {
        console.error("Erro ao obter turnId."); // Verificação adicional
        return;
      }
  
      await postOperation(fator1, fator2, resposta, turnId); // Postar operação com turnId
  
      // Lógica do game over
      limparTela(); 
  
      const img = document.createElement("img");
      img.src = IMAGES.gameOver;
      img.classList.add("game-over");
      ELEMENTS.board.appendChild(img);
  
      const botaoReiniciar = document.createElement("button");
      botaoReiniciar.textContent = "Reiniciar Jogo";
      botaoReiniciar.classList.add("botao-reiniciar");
      ELEMENTS.board.appendChild(botaoReiniciar);
      botaoReiniciar.addEventListener("click", reiniciarJogo);
  
    } catch (error) {
      console.error("Erro ao processar o Game Over:", error); // Tratamento de erro
    }
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

async function fetchEstudantes() {
    try {
      const estudantes = await getAllStudents(); // Buscar todos os estudantes
      const estudante = estudantes[0]; // Obter o primeiro estudante
      return estudante;
    } catch (error) {
      console.error("Erro ao buscar estudantes:", error);
      throw error;
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
  
  