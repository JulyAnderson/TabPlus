//board
let board;
let boardWidth = window.innerWidth * 0.8; // Subtrai 50 pixels da largura total
let boardHeight = window.innerHeight * 0.75; // Subtrai 50 pixels da altura total
let context;

//personagem
let personagemWidth = boardWidth * 0.07;
let personagemHeight = boardHeight * 0.15;
let personagemX = boardWidth * 0.25;
let personagemY = boardHeight - personagemHeight;
let personagemImg;

let personagem = {
    x: personagemX,
    y: personagemY,
    width: personagemWidth,
    height: personagemHeight,
}

// obstáculo terrestre
let obstaculoTerrestreArray = [];

let obstaculo1Width = boardWidth * 0.06;
let obstaculo2Width = boardWidth * 0.08;
let obstaculo3Width = boardWidth * 0.09;

let obstaculoHeight = boardWidth * 0.07;
let obstaculoX = boardWidth;
let obstaculoY = boardHeight - obstaculoHeight;

let obstaculo1Img;
let obstaculo2Img;
let obstaculo3Img;

// física
let velocityX = -4;
let velocityY = 0;
let gravity = .15;

let gameOver = false;
let score = 0;

// board
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");


    personagemImg = new Image();
    personagemImg.src = "./img/dino.png";
    personagemImg.onload = function () {
        context.drawImage(personagemImg, personagem.x, personagem.y, personagem.width, personagem.height);
    }

    obstaculo1Img = new Image();
    obstaculo1Img.src = "./img/cactus1.png";

    obstaculo2Img = new Image();
    obstaculo2Img.src = "./img/cactus2.png";

    obstaculo3Img = new Image();
    obstaculo3Img.src = "./img/cactus3.png";

    requestAnimationFrame(update);
    setInterval(placeObstaculo, 1000); //1000 ms = 1s


    // Chamada adicionada para atualizar a tela com a pergunta e as opções
    atualizarTela();
}


function gerarOperacao() {
    let fator1 = Math.floor(Math.random() * 11); // Fator aleatório de 0 a 10
    let fator2 = Math.floor(Math.random() * 11); // Fator aleatório de 0 a 10
    let operacao = `${fator1} x ${fator2}`; // Concatenação dos fatores
    return { operacao: operacao, resposta: fator1 * fator2 }; // Retorna a operação e o resultado correto
}

// Função para determinar a frequência das tabuadas
function determinarFrequenciaTabuada() {
    let frequencia = Math.random(); // Gera um número aleatório entre 0 e 1

    if (frequencia > 0.9) {
        return [7,8,9]; // Menos frequente
    } else if (frequencia > 0.5) {
        return [3, 4, 6]; // Segunda mais frequente
    } else {
        return [0,1,2,5,10]; // Menos frequente
    }
}

// Função para escolher uma tabuada com base na frequência
function escolherTabuada() {
    let tabuadas = determinarFrequenciaTabuada();
    let indice = Math.floor(Math.random() * tabuadas.length);
    return tabuadas[indice];
}

// Função para embaralhar um array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para gerar as opções de resposta
function gerarOpcoes(respostaCorreta) {
    let opcoes = [respostaCorreta];
    for (let i = 0; i < 2; i++) {
        let respostaIncorreta = respostaCorreta;
        while (respostaIncorreta === respostaCorreta) {
            respostaIncorreta = Math.floor(Math.random() * 100);
        }
        opcoes.push(respostaIncorreta);
    }
    return shuffleArray(opcoes);
}

// Modifique a função atualizarTela() para adicionar feedback visual indicando a resposta correta
function atualizarTela() {
    let operacao = gerarOperacao();
    let tabuada = escolherTabuada();
    let respostaCorreta = operacao.resposta;
    let opcoes = gerarOpcoes(respostaCorreta);

    // Exibir a operação na tela
    context.clearRect(0, 0, boardWidth, boardHeight);
    let perguntaElement = document.createElement("p");
    let perguntaFontSize = Math.min(boardWidth * 0.1, boardHeight * 0.1); // Tamanho da fonte baseado nas dimensões da tela
    perguntaElement.style.font = perguntaFontSize + "px Courier";
    perguntaElement.textContent = operacao.operacao; // Conteúdo da pergunta
    perguntaElement.style.color = "black";
    perguntaElement.style.position = "absolute";
    perguntaElement.style.left = "50%";
    perguntaElement.style.top = "4%";
    perguntaElement.style.transform = "translateX(-50%)"; // Centraliza horizontalmente
    perguntaElement.style.zIndex = "1"; // Definindo o zIndex para que fique acima dos botões
    
    document.body.appendChild(perguntaElement);

    // Criar botões com as opções de resposta
    let buttonWidth = boardWidth * 0.1;
    let buttonHeight = boardHeight * 0.1;
    let buttonMargin = boardWidth * 0.01;
    let totalButtonWidth = (buttonWidth * 3) + (buttonMargin * 2); //largura total ocupada pelos botões
    let buttonStartX = ((boardWidth - totalButtonWidth) / 2) + (totalButtonWidth / 2.5); // Posição inicial X dos botões  
    let respostaCorretaIndex = opcoes.indexOf(respostaCorreta); // Índice da resposta correta

    for (let i = 0; i < 3; i++) {
        let button = document.createElement("button");
        button.textContent = opcoes[i];
        button.style.width = buttonWidth + "px";
        button.style.height = buttonHeight + "px";
        button.style.position = "absolute";
        button.style.left = buttonStartX + (i * (buttonWidth + buttonMargin)) + "px"; // Calcula a posição X do botão
        button.style.top = boardHeight*0.4 + "px"; // Centraliza verticalmente

        // Estilo do texto dentro do botão
        button.style.font = "3rem Courier"; // Tamanho da fonte maior
        button.style.fontWeight = "bold"; // Fonte em negrito
        button.style.color = "black"; // Cor do texto preta
        button.style.textAlign = "center"; // Alinhamento central do texto
        let buttonFontSize = Math.min(boardWidth * 0.05, boardHeight * 0.05); // Tamanho da fonte baseado nas dimensões da tela
        button.style.font = buttonFontSize + "px Courier";

        // Ação do botão (verifica se é a resposta correta)
        button.onclick = function () {
            if (this.textContent == respostaCorreta) {
                velocityY = -10; // habilita o pulo se a resposta estiver correta
                score++;
                document.body.removeChild(perguntaElement);
                atualizarTela(); // Chama a função para atualizar a tela com uma nova pergunta
            } else {
                gameOverWrongAnswer(perguntaElement, respostaCorreta); // Chama a função para encerrar o jogo
                this.style.backgroundColor = "gray"; // Altera o botão selecionado para cinza
                this.style.color = "white"; // Altera a cor do texto do botão selecionado para branco
                let buttons = document.querySelectorAll("button");
                buttons.forEach((button, index) => {
                    if (opcoes[index] == respostaCorreta) {
                        button.style.backgroundColor = "green"; // Destaca o botão correto em verde
                    }
                });
            }
        };

        document.body.appendChild(button);

    }
}

// Atualize a função update() para verificar se o jogo terminou após o jogador errar a resposta
function update() {
    requestAnimationFrame(update);

    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    // personagem
    velocityY += gravity;
    personagem.y = Math.min(personagem.y + velocityY, personagemY)
    context.drawImage(personagemImg, personagem.x, personagem.y, personagem.width, personagem.height);

   
    for (let i = 0; i < obstaculoTerrestreArray.length; i++) {
        let obstaculo = obstaculoTerrestreArray[i];

        
        // Atualiza a posição do obstáculo
        obstaculo.x += velocityX;

        // Renderiza o obstáculo
        context.drawImage(obstaculo.img, obstaculo.x, obstaculo.y, obstaculo.width, obstaculo.height);

        // Verifica a colisão com o personagem
        if (detectCollision(personagem, obstaculo)) {
            gameOver = true;
            let gameOverFontSize = Math.min(boardWidth * 0.05, boardHeight * 0.05); // Tamanho da fonte baseado nas dimensões da tela
            personagemImg.src = "./img/dino-dead.png";
            personagemImg.onload = function () {
                context.drawImage(personagemImg, personagem.x, personagem.y, personagem.width, personagem.height);
            }
            // Mostra "Game Over" quando o jogo terminar
            context.font = gameOverFontSize*2 + "px Courier";
            context.fillText("Game Over", board.width*0.39, board.height*0.7);
            context.fillStyle = "black";
        }
    }

    // score
    let scoreFontSize = Math.min(boardWidth * 0.03, boardHeight * 0.03); // Tamanho da fonte baseado nas dimensões da tela
    context.font = scoreFontSize*2 + "px Courier";
    context.fillStyle = "black";
    context.fillText(score, boardWidth*0.015, boardHeight*0.09);
}
function movePersonagem(e) {
    if (gameOver) {
        return;
    }

    if (e.code == "Space" || e.code == "ArrowUp") {
        //pulo
        velocityY = -10;
    } else if (e.code == "ArrowDown") {
        //obstáculo aéreo não implementado
    }
}


function placeObstaculo() {

    if (gameOver) {
        return;
    }

    // place obstaculo
    let obstaculo = {
        img: null,
        x: obstaculoX,
        y: obstaculoY,
        width: null,
        height: obstaculoHeight,
    }

    let placeObstaculoChance = Math.random();

    if (placeObstaculoChance > 0.90) { // 10% você consegue o obstáculo 3
        obstaculo.img = obstaculo3Img;
        obstaculo.width = obstaculo3Width;
        obstaculoTerrestreArray.push(obstaculo);
    }
    else if (placeObstaculoChance > 0.75) { // 30% você consegue um obstáculo 2
        obstaculo.img = obstaculo2Img;
        obstaculo.width = obstaculo2Width;
        obstaculoTerrestreArray.push(obstaculo);
    }
    else if (placeObstaculoChance > 0.60) { // 50% você consegue um obstáculo 1
        obstaculo.img = obstaculo1Img;
        obstaculo.width = obstaculo1Width;
        obstaculoTerrestreArray.push(obstaculo);
    }
    if (obstaculoTerrestreArray.length > 5) {
        obstaculoTerrestreArray.shift(); // "Remova o primeiro elemento do array para que o array não cresça constantemente."
    }
}

function detectCollision(objetoA, objetoB) {
    return objetoA.x < objetoB.x + objetoB.width &&   // O canto superior esquerdo de A não alcança o canto superior direito de B
        objetoA.x + objetoA.width > objetoB.x &&   // O canto superior direito de A passa pelo canto superior esquerdo de B
        objetoA.y < objetoB.y + objetoB.height &&  // O canto superior esquerdo de A não alcança o canto inferior esquerdo de B
        objetoA.y + objetoA.height > objetoB.y;    // O canto inferior esquerdo de A passa pelo canto superior esquerdo de B
}

// Função para lidar com o fim do jogo quando o jogador erra a resposta
function gameOverWrongAnswer(perguntaElement, respostaCorreta) {
    let gameOverFontSize = Math.min(boardWidth * 0.05, boardHeight * 0.05); // Tamanho da fonte baseado nas dimensões da tela
    gameOver = true;
    perguntaElement.textContent = `GAME OVER! A resposta correta era: ${respostaCorreta}`;
    perguntaElement.style.font = "2rem Courier";
    perguntaElement.style.font = gameOverFontSize + "px Courier";
}