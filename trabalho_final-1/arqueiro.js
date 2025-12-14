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
exports.Arqueiro = void 0;
var personagem_js_1 = require("./personagem.js");
var acao_js_1 = require("./acao.js");
var Arqueiro = /** @class */ (function (_super) {
    __extends(Arqueiro, _super);
    function Arqueiro(id, nome, ataque, ataqueMultiplo) {
        var _this = _super.call(this, id, nome, ataque) || this;
        _this._ataqueMultiplo = ataqueMultiplo;
        return _this;
    }
    Arqueiro.prototype.atacar = function (alvo) {
        if (!this.estaVivo())
            throw new Error("".concat(this._nome, " est\u00E1 morto, n\u00E3o pode atacar."));
        // Sorteio 50%
        var sorteio = Math.random(); // vai gerar um número entre 0.0 e 1.0
        var danoFinal = this._ataque;
        var descricao = "Flecha normal";
        if (sorteio > 0.5) {
            danoFinal = this._ataque * this._ataqueMultiplo;
            descricao = "Disparo Múltiplo!";
            console.log("Sorte! Ataque múltiplo ativado.");
        }
        this._danoCausadoTotal += danoFinal;
        alvo.receberDano(danoFinal);
        return new acao_js_1.Acao(0, this, alvo, descricao, danoFinal);
    };
    return Arqueiro;
}(personagem_js_1.Personagem));
exports.Arqueiro = Arqueiro;
