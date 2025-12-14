import { Personagem } from "./personagem.js";
import { Acao } from "./acao.js";

export class Guerreiro extends Personagem {
    private _defesa: number; 

    constructor(id: number, nome: string, ataque: number, defesa: number) {
        super(id, nome, ataque);
        this._defesa = defesa;
    }

    atacar(alvo: Personagem): Acao {
        if (!this.estaVivo()) throw new Error(`${this._nome} está morto, não pode atacar.`);
        
        let valorAtaque = this._ataque;
 
        // Regra: +30% de dano se a vida < 30%
        if (this.vida < 30) {
            valorAtaque = valorAtaque * 1.3;
            console.log(`${this.nome} está furioso! Dano aumentado em 30%.`);
        }

        this._danoCausadoTotal += valorAtaque;

        alvo.receberDano(valorAtaque);

        return new Acao(0, this, alvo, "Ataque de Guerreiro", valorAtaque);
    }

    // Sobrescrevemos o receberDano para aplicar a defesa
    receberDano(valor: number): void {
        // Regra: Se ataque < defesa, não surte efeito
        if (valor < this._defesa) {
            console.log(`O ataque de ${valor} não superou a defesa de ${this._defesa} do Guerreiro!`);
            return; 
        }

        const danoReal = valor - this._defesa;
        super.receberDano(danoReal);
    }
}