import { postSchoolClass, postStudent } from './requisiçõesFetch.js';

const gameForm = document.getElementById('game-form');
const iniciarButton = document.querySelector('.iniciar');

export class IniciarJogo {
  constructor(ELEMENTS, iniciarLoop) {
    ELEMENTS.iniciar.addEventListener('click', async () => {

      const aluno = document.getElementById('aluno').value;
      const turma = document.getElementById('turma').value;
      const ano = document.getElementById('ano').value;

      // Adicionar validação, por exemplo:
      if (!aluno || !turma || !ano) {
        alert('Preencha todos os campos');
        return;
      }

      try {
        // Adicionar lógica para enviar os dados para o backend
        const schoolClass = await postSchoolClass(turma, ano);
        const student = await postStudent(aluno, schoolClass.id);

        // Agora, chama a função que inicia o loop do jogo
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
    });
  }
}
