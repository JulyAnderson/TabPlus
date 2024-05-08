// Declaração de variáveis globais para aluno, turma e ano
let aluno = '';
let turma = '';
let ano = '';
let dataAtual = new Date();

// Extrair o ano atual
let anoAtual = dataAtual.getFullYear();

const gameForm = document.getElementById('game-form');
const iniciarButton = document.querySelector('.iniciar');

export class IniciarJogo {
  constructor(ELEMENTS, iniciarLoop) {
    ELEMENTS.iniciar.addEventListener('click', async () => {

      aluno = document.getElementById('aluno').value;
      ano = document.getElementById('ano').value;
      turma = document.getElementById('turma').value;
      

      const respostaDiv = document.createElement('div')
      respostaDiv.className = "respostas"
      ELEMENTS.board.appendChild(respostaDiv)

      // Adicionar validação:
      if (!aluno || !turma || !ano) {
        alert('Preencha todos os campos');
        return 
      }
      try {
        //função que inicia o loop do jogo
        if (typeof iniciarLoop === 'function') {
            iniciarLoop(); // Chama o loop apenas após remover os elementos
        }
    } catch (error) {
        console.error('Erro ao iniciar o jogo:', error);
    }

        // Primeiro, remove o botão de iniciar e a imagem do personagem estático
    if (ELEMENTS.iniciar) {
      ELEMENTS.iniciar.remove(); // Remove o botão de iniciar
    }

    if (ELEMENTS.personagem) {
      ELEMENTS.personagem.innerHTML = ''; // Remove a imagem do personagem estático
    }
    if (ELEMENTS.formulario) {
      ELEMENTS.formulario.remove(); // Remove o formulário
    }

    });
  }
}

// Exportar as variáveis globais para uso em outros módulos
export { aluno, turma, ano, anoAtual };



