export class Matematica {
    static gerarOperacao() {
      const fatoresFrequentes = () => [0, 1, 2, 5, 10][Math.floor(Math.random() * 5)];
      const fatoresSegundoMaisFrequentes = () => [3, 4][Math.floor(Math.random() * 2)];
      const fatoresMenosFrequentes = () => [6, 7, 8, 9][Math.floor(Math.random() * 4)];
  
      let fator1, fator2;
  
      const randomIndex = Math.random();
      if (randomIndex < 0.5) {
        fator1 = fatoresFrequentes();
      } else if (randomIndex < 0.75) {
        fator1 = fatoresSegundoMaisFrequentes();
      } else {
        fator1 = fatoresMenosFrequentes();
      }
  
      const randomIndex2 = Math.random();
      if (randomIndex2 < 0.5) {
        fator2 = fatoresFrequentes();
      } else if (randomIndex2 < 0.75) {
        fator2 = fatoresSegundoMaisFrequentes();
      } else {
        fator2 = fatoresMenosFrequentes();
      }
  
      const conta = `${fator1} x ${fator2}`;
  
      return { conta: conta, resposta: fator1 * fator2, fator1, fator2 };
    }
  
    static shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    static gerarOpcoes(respostaCorreta) {
      const opcoes = [respostaCorreta];
      while (opcoes.length < 3) {
        const respostaIncorreta = Math.floor(Math.random() * 100);
        if (!opcoes.includes(respostaIncorreta)) {
          opcoes.push(respostaIncorreta);
        }
      }
      return this.shuffleArray(opcoes);
    }
  }
  