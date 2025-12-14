import { Personagem } from "./personagem.js"; 

/*
Aqui deixei origem e alvo como null para mostrar notificações do jogo que não são derivadas dos personagens que estão lutando,
assim não precisa criar um personagem falso e ''sujar'' o histórico da batalha.
*/

export class Acao {
    id: number;
    origem: Personagem | null;
    alvo: Personagem | null;
    descricao: string;
    valorDano: number;
    dataHora: Date;

    constructor(id: number, origem: Personagem | null, alvo: Personagem | null, descricao: string, valorDano: number) {
        this.id = id;
        this.origem = origem;
        this.alvo = alvo;
        this.descricao = descricao;
        this.valorDano = valorDano;
        this.dataHora = new Date();
    } 
}