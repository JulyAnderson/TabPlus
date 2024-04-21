// Dimensões do tabuleiro
let board;
const BOARD_WIDTH = window.innerWidth * 0.8; // Subtrai 50 pixels da largura total
const BOARD_HEIGHT = window.innerHeight * 0.75; // Subtrai 50 pixels da altura total
let context;

// Dimensões do personagem
const PERSONAGEM_WIDTH = BOARD_WIDTH * 0.07;
const PERSONAGEM_HEIGHT = BOARD_HEIGHT * 0.15;
const PERSONAGEM_INITIAL_X = BOARD_WIDTH * 0.25;
const PERSONAGEM_INITIAL_Y = BOARD_HEIGHT - PERSONAGEM_HEIGHT;

let personagem = {
    x: PERSONAGEM_INITIAL_X,
    y: PERSONAGEM_INITIAL_Y,
    width: PERSONAGEM_WIDTH,
    height: PERSONAGEM_HEIGHT,
}

// Dimensões dos obstáculos
let obstaculoTerrestreArray = [];

const OBSTACULO_1_WIDTH = BOARD_WIDTH * 0.06;
const OBSTACULO_2_WIDTH = BOARD_WIDTH * 0.08;
const OBSTACULO_3_WIDTH = BOARD_WIDTH * 0.09;
const OBSTACULO_HEIGHT = BOARD_WIDTH * 0.07;
const OBSTACULO_INITIAL_X = BOARD_WIDTH;
const OBSTACULO_INITIAL_Y = BOARD_HEIGHT - OBSTACULO_HEIGHT;

let obstaculo1Img;
let obstaculo2Img;
let obstaculo3Img;

// física
let initialVelocityX = -3;

// Taxa de aumento da velocidade dos obstáculos por resposta correta
let velocityIncreaseRate = 0.1;

let velocityX = initialVelocityX;
let velocityY = 0;
let gravity = .15;



let gameOver = false;
let score = 0;

// Caminhos das imagens
const PERSONAGEM_IMG_SRC = "./img/dino.png";
const PERSONAGEM_DEAD_IMG_SRC = "./img/dino-dead.png";
const OBSTACULO_1_IMG_SRC = "./img/cactus1.png";
const OBSTACULO_2_IMG_SRC = "./img/cactus2.png";
const OBSTACULO_3_IMG_SRC = "./img/cactus3.png";

window.addEventListener("DOMContentLoaded", function() {
    function verificarOrientacao() {
        if (window.innerHeight > window.innerWidth) {
            alert("Por favor, gire o dispositivo para a orientação paisagem para jogar.");
        }
    }

    verificarOrientacao();

    window.addEventListener("orientationchange", function() {
        verificarOrientacao();
    });
});

window.onload = function () {
    board = document.getElementById("board");
    board.height = BOARD_HEIGHT;
    board.width = BOARD_WIDTH;

    context = board.getContext("2d");

    personagemImg = new Image();
    personagemImg.src = PERSONAGEM_IMG_SRC;
    personagemImg.onload = function () {
        context.drawImage(personagemImg, personagem.x, personagem.y, personagem.width, personagem.height);
    }

    obstaculo1Img = new Image();
    obstaculo1Img.src = OBSTACULO_1_IMG_SRC;

    obstaculo2Img = new Image();
    obstaculo2Img.src = OBSTACULO_2_IMG_SRC;

    obstaculo3Img = new Image();
    obstaculo3Img.src = OBSTACULO_3_IMG_SRC;

    requestAnimationFrame(update);
    setInterval(placeObstaculo, 1100); //1000 ms = 1s

    atualizarTela();
}

function gerarOperacao() {
    let fator1, fator2;

    const fatoresFrequentes = () => {
        const fatores = [0, 1, 2, 5, 10];
        return fatores[Math.floor(Math.random() * fatores.length)];
    };
    const fatoresSegundoMaisFrequentes = () => {
        const fatores = [3, 4];
        return fatores[Math.floor(Math.random() * fatores.length)];
    };
    const fatoresMenosFrequentes = () => {
        const fatores = [6, 7, 8, 9];
        return fatores[Math.floor(Math.random() * fatores.length)];
    };

    const randomIndex = Math.random();
    if (randomIndex < 0.5) {
        fator1 = fatoresFrequentes();
    } else if (randomIndex < 0.75) {
        fator1 = fatoresSegundoMaisFrequentes();
    } else {
        fator1 = fatoresMenosFrequentes();
    }

    randomIndex2 = Math.random();
    if (randomIndex2 < 0.5) {
        fator2 = fatoresFrequentes();
    } else if (randomIndex2 < 0.75) {
        fator2 = fatoresSegundoMaisFrequentes();
    } else {
        fator2 = fatoresMenosFrequentes();
    }

    const operacao = `${fator1} x ${fator2}`;

    return { operacao: operacao, resposta: fator1 * fator2, fator1, fator2 };
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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

function atualizarTela() {
    let operacao = gerarOperacao();
    let respostaCorreta = operacao.resposta;
    let opcoes = gerarOpcoes(respostaCorreta);

    context.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    let perguntaElement = document.createElement("p");
    let perguntaFontSize = Math.min(BOARD_WIDTH * 0.1, BOARD_HEIGHT * 0.1);
    perguntaElement.style.font = perguntaFontSize + "px Courier";
    perguntaElement.textContent = operacao.operacao;
    perguntaElement.style.color = "black";
    perguntaElement.style.position = "absolute";
    perguntaElement.style.left = "50%";
    perguntaElement.style.top = "4%";
    perguntaElement.style.transform = "translateX(-50%)";
    perguntaElement.style.zIndex = "1";
    document.body.appendChild(perguntaElement);

    let buttonWidth = BOARD_WIDTH * 0.1;
    let buttonHeight = BOARD_HEIGHT * 0.1;
    let buttonMargin = BOARD_WIDTH * 0.01;
    let totalButtonWidth = (buttonWidth * 3) + (buttonMargin * 2);
    let buttonStartX = ((BOARD_WIDTH - totalButtonWidth) / 2) + (totalButtonWidth / 2.5);

    for (let i = 0; i < 3; i++) {
        let button = document.createElement("button");
        button.textContent = opcoes[i];
        button.style.width = buttonWidth + "px";
        button.style.height = buttonHeight + "px";
        button.style.position = "absolute";
        button.style.left = buttonStartX + (i * (buttonWidth + buttonMargin)) + "px";
        button.style.top = BOARD_HEIGHT * 0.4 + "px";

        button.style.font = "3rem Courier";
        button.style.fontWeight = "bold";
        button.style.color = "black";
        button.style.textAlign = "center";
        let buttonFontSize = Math.min(BOARD_WIDTH * 0.05, BOARD_HEIGHT * 0.05);
        button.style.font = buttonFontSize + "px Courier";

        button.onclick = function () {
            if (this.textContent == respostaCorreta) {
                velocityY = -BOARD_HEIGHT / 60;
                score++;
                document.body.removeChild(perguntaElement);
                atualizarTela();
            } else {
                gameOverWrongAnswer(respostaCorreta);
                this.style.backgroundColor = "gray";
                this.style.color = "white";
                let buttons = document.querySelectorAll("button");
                buttons.forEach((button, index) => {
                    if (opcoes[index] == respostaCorreta) {
                        button.style.backgroundColor = "green";
                    }
                });
            }
        };

        document.body.appendChild(button);

    }
}

// Função para aumentar a velocidade dos obstáculos
function increaseObstacleSpeed() {
    velocityX += velocityIncreaseRate;
}

// Dentro da função de clique do botão de resposta correta
if (this.textContent == respostaCorreta) {
    velocityY = -BOARD_HEIGHT / 60;
    score++;
    increaseObstacleSpeed(); // Aumenta a velocidade dos obstáculos
    document.body.removeChild(perguntaElement);
    atualizarTela();
}

// Função update onde você atualiza a posição dos obstáculos
function update() {
    requestAnimationFrame(update);

    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    velocityY += gravity;
    personagem.y = Math.min(personagem.y + velocityY, PERSONAGEM_INITIAL_Y)
    context.drawImage(personagemImg, personagem.x, personagem.y, personagem.width, personagem.height);

    for (let i = 0; i < obstaculoTerrestreArray.length; i++) {
        let obstaculo = obstaculoTerrestreArray[i];

        obstaculo.x += velocityX; // Atualiza a posição horizontal com base na velocidade atual

        context.drawImage(obstaculo.img, obstaculo.x, obstaculo.y, obstaculo.width, obstaculo.height);

        if (detectCollision(personagem, obstaculo)) {
            gameOver = true;
            personagemImg.src = PERSONAGEM_DEAD_IMG_SRC;
            gameOverWrongAnswer(resposta);
        }
    }

    let scoreFontSize = Math.min(BOARD_WIDTH * 0.03, BOARD_HEIGHT * 0.03);
    context.font = scoreFontSize * 2 + "px Courier";
    context.fillStyle = "black";
    context.fillText(score, BOARD_WIDTH * 0.015, BOARD_HEIGHT * 0.09);
}

function placeObstaculo() {
    if (gameOver) {
        return;
    }

    let obstaculo = {
        img: null,
        x: OBSTACULO_INITIAL_X,
        y: OBSTACULO_INITIAL_Y,
        width: null,
        height: OBSTACULO_HEIGHT
    }

    let placeObstaculoChance = Math.random();

    if (placeObstaculoChance > 0.98) {
        obstaculo.img = obstaculo3Img;
        obstaculo.width = OBSTACULO_3_WIDTH;
        obstaculoTerrestreArray.push(obstaculo);
    }
    else if (placeObstaculoChance > 0.90) {
        obstaculo.img = obstaculo2Img;
        obstaculo.width = OBSTACULO_2_WIDTH;
        obstaculoTerrestreArray.push(obstaculo);
    }
    else if (placeObstaculoChance > 0.80) {
        obstaculo.img = obstaculo1Img;
        obstaculo.width = OBSTACULO_1_WIDTH;
        obstaculoTerrestreArray.push(obstaculo);
    }
    if (obstaculoTerrestreArray.length > 5) {
        obstaculoTerrestreArray.shift();
    }
}

function detectCollision(objetoA, objetoB) {
    return objetoA.x < objetoB.x + objetoB.width &&
        objetoA.x + objetoA.width > objetoB.x &&
        objetoA.y < objetoB.y + objetoB.height &&
        objetoA.y + objetoA.height > objetoB.y;
}

function gameOverWrongAnswer(respostaCorreta) {
    gameOver = true;
    let gameOverMessage = document.createElement("p");
    gameOverMessage.textContent = `GAME OVER! A resposta correta é: ${respostaCorreta}`;
    gameOverMessage.style.font = "1rem Courier";
    gameOverMessage.style.color = "black";
    gameOverMessage.style.position = "absolute";
    gameOverMessage.style.left = "50%";
    gameOverMessage.style.top = "30%";
    gameOverMessage.style.transform = "translateX(-50%)";
    document.body.appendChild(gameOverMessage);

    for (let i = 0; i < obstaculoTerrestreArray.length; i++) {
        let obstaculo = obstaculoTerrestreArray[i];
        if (detectCollision(personagem, obstaculo)) {
            let collisionMessage = document.createElement("p");
            collisionMessage.textContent = "Você colidiu com um obstáculo!";
            collisionMessage.style.font = "1rem Courier";
            collisionMessage.style.color = "black";
            collisionMessage.style.position = "absolute";
            collisionMessage.style.left = "50%";
            collisionMessage.style.top = "40%";
            collisionMessage.style.transform = "translateX(-50%)";
            document.body.appendChild(collisionMessage);
            break;
        }
    }

    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        document.body.removeChild(button);
    });

    let restartButton = document.createElement("button");
    restartButton.textContent = "Reiniciar";
    restartButton.style.width = "150px";
    restartButton.style.height = "50px";
    restartButton.style.position = "absolute";
    restartButton.style.left = "50%";
    restartButton.style.top = "50%";
    restartButton.style.transform = "translateX(-50%)";
    restartButton.onclick = function() {
        location.reload();
    };
    document.body.appendChild(restartButton);
}
