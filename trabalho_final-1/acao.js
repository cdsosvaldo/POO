"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acao = void 0;
/*
Aqui deixei origem e alvo como null para mostrar notificações do jogo que não são derivadas dos personagens que estão lutando,
assim não precisa criar um personagem falso e ''sujar'' o histórico da batalha.
*/
var Acao = /** @class */ (function () {
    function Acao(id, origem, alvo, descricao, valorDano) {
        this.id = id;
        this.origem = origem;
        this.alvo = alvo;
        this.descricao = descricao;
        this.valorDano = valorDano;
        this.dataHora = new Date();
    }
    return Acao;
}());
exports.Acao = Acao;
