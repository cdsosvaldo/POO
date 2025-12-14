import { Personagem } from "./personagem.js";
import { Acao } from "./acao.js";

export class Troll extends Personagem {
    
    constructor(id:number, nome: string, ataque: number) {
        super(id, nome, ataque);
        this._vida = 120; // Deixamos o troll com vida extra
    }

    atacar(alvo: Personagem): Acao {
        if(!this.estaVivo()) throw new Error("O troll está morto, não pode atacar.")
        
        // Nosso troll é forte, mas desastrado, então deixamos a classe com 20% de chance de errar o ataque :)
        const chanceErro = Math.random() // Gerar entre 0.0 e 1.0

        if (chanceErro < 0.2) {
            return new Acao(0, this, null, "O troll tentou atacar mas foi burro e errou...", 0);
        } 

    this._danoCausadoTotal += this._ataque;
    alvo.receberDano(this._ataque);
    return new Acao(0, this, alvo, "Pancada de Troll", this._ataque);
    }
}