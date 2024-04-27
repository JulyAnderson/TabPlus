// Definição da classe GeradorObstaculos
export class GeradorObstaculos {
  constructor(ELEMENTO) {
    // Use `this.obstaculos` para acessar a propriedade da instância
    this.obstaculos = ELEMENTO;
  };

  // Método para gerar obstáculos
  gerarObstaculos() {
    const obstaculosTipos = [
      'obstaculo1', 'obstaculo1', 'obstaculo1', // Maior probabilidade para obstáculo 1
      'obstaculo2', 'obstaculo2',                // Probabilidade intermediária para obstáculo 2
      'obstaculo3'                               // Menor probabilidade para obstáculo 3
    ];

    const escolherObstaculo = () => {
      const indexAleatorio = Math.floor(Math.random() * obstaculosTipos.length);
      return obstaculosTipos[indexAleatorio];
    };

    const obstaculoEscolhido = escolherObstaculo();
    const obstaculo = document.createElement('div');
    obstaculo.classList.add(obstaculoEscolhido);

    // Use `this.obstaculos` para adicionar o obstáculo ao elemento fornecido
    this.obstaculos.appendChild(obstaculo);

    // Adiciona um event listener para o evento animationend
    obstaculo.addEventListener('animationend', () => {
      // Remove o obstáculo atual após o término da animação
      obstaculo.remove();

      // Gera um novo obstáculo
      this.gerarObstaculos();
  });
  }}
  