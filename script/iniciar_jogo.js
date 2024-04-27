export class IniciarJogo {
  constructor(ELEMENTS, iniciarLoop) {
    ELEMENTS.iniciar.addEventListener('click', () => {
      // Primeiro, remove o botão de iniciar e a imagem do personagem estático
      if (ELEMENTS.iniciar) {
        ELEMENTS.iniciar.remove(); // Remove o botão de iniciar
        console.log("elemento botão removido")
      }

      if (ELEMENTS.personagem) {
        ELEMENTS.personagem.innerHTML = ''; // Remove a imagem do personagem estático
        console.log("elemento personagem removido")
      }

      // Agora, chama a função que inicia o loop do jogo
      if (typeof iniciarLoop === 'function') {
        iniciarLoop(); // Chama o loop apenas após remover os elementos
      }
    });
  }
}
