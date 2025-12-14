import { Personagem } from "./personagem.js";
import { Guerreiro } from "./guerreiro.js";
import { Arqueiro } from "./arqueiro.js";
import { Acao } from "./acao.js";

export class Mago extends Personagem { 
    
    constructor(id: number, nome: string, ataque: number) {
        super(id, nome, ataque);
    }

    atacar(alvo: Personagem): Acao {
        if (!this.estaVivo()) throw new Error("Mago morto não lança feitiços.");

        let danoCalculado = this._ataque;

        // Regra: Dano dobrado em Arqueiros
        if (alvo instanceof Arqueiro) {
            danoCalculado = danoCalculado * 2;
            console.log("Dano super efetivo contra Arqueiro!");
        }

        // Regra: Mago perde 10 de vida ao atacar
        this.receberDano(10); 
        this.registrarAcao(new Acao(0, this, this, "Custo de Mana (Vida)", 10));
 
        // Regra: Ignora defesa do guerreiro
        
        if (alvo instanceof Guerreiro) {
            console.log("A magia atravessou a armadura do Guerreiro!");
            alvo.receberDanoDireto(danoCalculado);
        } else {
            alvo.receberDano(danoCalculado);
        }

        return new Acao(0, this, alvo, "Magia lançada", danoCalculado);
    }
}