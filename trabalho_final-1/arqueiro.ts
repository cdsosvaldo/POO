import { Personagem } from "./personagem.js";
import { Acao } from "./acao.js"; 

export class Arqueiro extends Personagem {
    private _ataqueMultiplo: number;

    constructor(id: number, nome: string, ataque: number, ataqueMultiplo: number) {
        super(id, nome, ataque);
        this._ataqueMultiplo = ataqueMultiplo;
    }

    atacar(alvo: Personagem): Acao {
        if (!this.estaVivo()) throw new Error(`${this._nome} está morto, não pode atacar.`);

        // Sorteio 50%
        const sorteio = Math.random(); // vai gerar um número entre 0.0 e 1.0
        let danoFinal = this._ataque;
        let descricao = "Flecha normal"; 

        if (sorteio > 0.5) {
            danoFinal = this._ataque * this._ataqueMultiplo;
            descricao = "Disparo Múltiplo!";
            console.log("Sorte! Ataque múltiplo ativado.");
        }
        
        this._danoCausadoTotal += danoFinal;
        
        alvo.receberDano(danoFinal);
        
        return new Acao(0, this, alvo, descricao, danoFinal);
    }
}