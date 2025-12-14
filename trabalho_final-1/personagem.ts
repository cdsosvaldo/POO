import { Acao } from "./acao.js"; 

/* Deixei a classe Personagem como abstrata porque, além de não fazer sentido no contexto do jogo poder criar um personagem sem uma classe, 
eu forço as outras classes a criarem seu próprio método atacar. Caso eu queria implementar um novo personagem,
se eu esquecer de implementar o método atacar próprio do personagem, o código da um erro ao compilar.
*/

export abstract class Personagem {
    protected _id: number;
    protected _nome: string;
    protected _vida: number;
    protected _ataque: number;
    protected _historico: Acao[];
    protected _vivo: boolean;
    protected _danoCausadoTotal: number = 0; 

    constructor(id: number, nome: string, ataque: number) {
        this._id = id;
        this._nome = nome;
        this._vida = 100;
        this._ataque = ataque;
        this._historico = [];
        this._vivo = true;
    }

    get nome(): string { 
        return this._nome;
    }
    get vida(): number { 
        return this._vida; 
    }
    get id(): number { 
        return this._id; 
    }
    get historico(): Acao[] { 
        return this._historico; 
    }
    get ataque(): number { 
        return this._ataque; 
    }
    get danoCausadoTotal(): number {
        return this._danoCausadoTotal;
    }
    

    estaVivo(): boolean {
        return this._vida > 0;
    }

    abstract atacar(alvo: Personagem): Acao;

    receberDano(valor: number): void {
        this._vida -= valor;

        if (this._vida < 0) {
            this._vida = 0;
        }

        if (this._vida === 0) {
            this._vivo = false;
        }
    }

    registrarAcao(acao: Acao): void {
        this._historico.push(acao);
    }

    // Ataque que os magos vão usar para causar dano verdadeiro nos guerreiros
    // O guerreiro não vai sobrescrever este, então ele sempre afeta a vida direto
    receberDanoDireto(valor: number): void {
        this._vida -= valor;
        if (this._vida < 0) {
            this._vida = 0;
        }
        if (this._vida === 0) {
            this._vivo = false;
        }
        console.log(`${this.nome} sofreu ${valor} de dano direto (ignorou defesa)!`);
    }
}