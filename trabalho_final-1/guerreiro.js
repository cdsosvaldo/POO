"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guerreiro = void 0;
var personagem_js_1 = require("./personagem.js");
var acao_js_1 = require("./acao.js");
var Guerreiro = /** @class */ (function (_super) {
    __extends(Guerreiro, _super);
    function Guerreiro(id, nome, ataque, defesa) {
        var _this = _super.call(this, id, nome, ataque) || this;
        _this._defesa = defesa;
        return _this;
    }
    Guerreiro.prototype.atacar = function (alvo) {
        if (!this.estaVivo())
            throw new Error("".concat(this._nome, " est\u00E1 morto, n\u00E3o pode atacar."));
        var valorAtaque = this._ataque;
        // Regra: +30% de dano se a vida < 30% (30% de 100 é 30)
        if (this.vida < 30) {
            valorAtaque = valorAtaque * 1.3;
            console.log("".concat(this.nome, " est\u00E1 furioso! Dano aumentado em 30%."));
        }
        this._danoCausadoTotal += valorAtaque;
        // Chama o receberDano do alvo
        alvo.receberDano(valorAtaque);
        // Retorna a ação para registro
        return new acao_js_1.Acao(0, this, alvo, "Ataque de Guerreiro", valorAtaque);
    };
    // Sobrescrevemos o receberDano para aplicar a defesa
    Guerreiro.prototype.receberDano = function (valor) {
        // Regra: Se ataque < defesa, não surte efeito
        if (valor < this._defesa) {
            console.log("O ataque de ".concat(valor, " n\u00E3o superou a defesa de ").concat(this._defesa, " do Guerreiro!"));
            return;
        }
        var danoReal = valor - this._defesa;
        _super.prototype.receberDano.call(this, danoReal);
    };
    return Guerreiro;
}(personagem_js_1.Personagem));
exports.Guerreiro = Guerreiro;
