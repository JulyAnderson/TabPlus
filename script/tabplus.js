import { ELEMENTS, IMAGES } from './constantes.js';
import { IniciarJogo } from './iniciar_jogo.js';
import { Matematica } from './matematica.js';
import { GeradorObstaculos } from './obstaculo.js';
import { postOperation, getAllStudents, PostTurn, postStudent, postSchoolClass } from './requisiçõesFetch.js';
import { aluno, turma, ano } from './iniciar_jogo.js';


// Inicialização do jogo
let intervalId;
let score = 0; // Contador de pontuação
let iniciarJogo = new IniciarJogo(ELEMENTS, loop);
let gerador = new GeradorObstaculos(ELEMENTS.obstaculos);
let operations = []; // Armazena as operações para envio posterior
let isJumping = false; // Variável para controlar se o personagem está pulando
let jogoAtivo = true; // Sinalizador para controlar se o jogo está ativo

// Função principal do jogo
function loop() {
    if (!jogoAtivo) return; // Verifica se o jogo deve continuar

    gerador.gerarObstaculos();
    setTimeout(() => {
        if (jogoAtivo) {
            gameLoop(); // Loop de colisão depois de obstáculos serem gerados
        }
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

function detectCollision(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    const intersectX = rect1.right > rect2.left;
    const intersectY = rect1.bottom < rect2.top
    return intersectX || intersectY;
}


// Função para verificar colisões
function gameLoop() {
    if (!jogoAtivo) return; // Verifica se o jogo deve continuar

    intervalId = setInterval(() => {
        if (!isJumping) {
            const obstaculos = ELEMENTS.obstaculos.children;
            const personagem = ELEMENTS.personagem;
            for (const obstaculo of obstaculos) {
                if (detectCollision(personagem, obstaculo)) {
                    gameOver(); // Envia as operações acumuladas para a API
                    clearInterval(intervalId); // Parar o loop de colisão
                    jogoAtivo = false; // Define sinalizador para false
                    return;
                }
            }
        }
    }, 100); // Verifique colisões a cada 100 ms
}

async function gameOver() {
    console.log("Game Over!");

    // Pare todos os loops e defina o sinalizador para parar o jogo
    jogoAtivo = false;
    clearInterval(intervalId);
    limparTela()


    console.time("Tempo para enviar dados para o backend"); // Inicia a contagem do tempo

    try {
        // Exibir uma mensagem de espera para o usuário
        const aguardeDiv = document.createElement("div");
        aguardeDiv.id = "aguarde-mensagem";
        aguardeDiv.textContent = "Aguarde... Enviando dados para o servidor";
        ELEMENTS.board.appendChild(aguardeDiv);

        // Adicionar o botão de reiniciar, mas inicialmente desabilitado
        const botaoReiniciar = document.createElement("button");
        botaoReiniciar.textContent = "Reiniciar Jogo";
        botaoReiniciar.classList.add("botao-reiniciar");
        botaoReiniciar.disabled = true; // Desabilitado até completar o envio
        ELEMENTS.board.appendChild(botaoReiniciar);

        const img = document.createElement("img");
        img.src = IMAGES.gameOver;
        img.classList.add("game-over");
        ELEMENTS.board.appendChild(img);

        // Adicionar lógica para enviar os dados para o backend
        const schoolClass = await postSchoolClass(turma, ano);
        const student = await postStudent(aluno, schoolClass.id);
        const turnId = await createTurn(student.id);

        for (const op of operations) {
            await postOperation(op.fator1, op.fator2, op.resposta, turnId);
        }

        console.timeEnd("Tempo para enviar dados para o backend"); // Finaliza a contagem do tempo

        operations = []; // Limpar a lista de operações

        // Salvar informações do aluno no localStorage
        localStorage.setItem("aluno", aluno);
        localStorage.setItem("turma", turma);
        localStorage.setItem("ano", ano);


        // Remover a mensagem de "Aguarde..."
        aguardeDiv.remove();

        // Habilitar o botão de reiniciar após o envio bem-sucedido
        botaoReiniciar.disabled = false; // Agora o botão pode ser clicado
        botaoReiniciar.addEventListener("click", () => {
            window.location.reload(); //recarrega a página
        });

    } catch (error) {
        console.error("Erro ao processar o Game Over:", error);
        console.timeEnd("Tempo para enviar dados para o backend"); // Mostra o tempo, mesmo em caso de erro

        if (aguardeDiv) {
            aguardeDiv.remove(); // Remover a mensagem de "Aguarde..."
        }

        throw error; // Propagar o erro para tratamento posterior
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const reiniciarAluno = document.getElementById("aluno");
    const reiniciarTurma = document.getElementById("turma");
    const reiniciarAno = document.getElementById("ano");
    const iniciarBotao = document.querySelector(".iniciar");

    // Restaurar valores do localStorage
    reiniciarAluno.value = localStorage.getItem("aluno") ;
    reiniciarTurma.value = localStorage.getItem("turma") ;
    reiniciarAno.value = localStorage.getItem("ano") ;
    reiniciarAluno.value = aluno ? aluno : '';
    reiniciarTurma.value = turma ? turma : '';
    reiniciarAno.value = ano ? ano : '';

    // Verifica se todos os valores do localStorage são válidos
    const todosValoresPresentes = aluno && turma && ano;

    // Se todos os valores estiverem presentes, clicar automaticamente no botão iniciar
    if (todosValoresPresentes && iniciarBotao) {
        iniciarBotao.click(); // Clica automaticamente no botão
    }
});

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
