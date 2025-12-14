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
exports.Troll = void 0;
var personagem_js_1 = require("./personagem.js");
var acao_js_1 = require("./acao.js");
var Troll = /** @class */ (function (_super) {
    __extends(Troll, _super);
    function Troll(id, nome, ataque) {
        var _this = _super.call(this, id, nome, ataque) || this;
        _this._vida = 120; // Deixamos o troll com vida extra
        return _this;
    }
    Troll.prototype.atacar = function (alvo) {
        if (!this.estaVivo())
            throw new Error("O troll está morto, não pode atacar.");
        // Nosso troll é forte, mas desastrado, então deixamos a classe com 20% de chance de errar o ataque :)
        var chanceErro = Math.random(); // Gerar entre 0.0 e 1.0
        if (chanceErro < 0.2) {
            return new acao_js_1.Acao(0, this, null, "O troll tentou atacar mas foi burro e errou...", 0);
        }
        // Se acertar, causa dano normal
        this._danoCausadoTotal += this._ataque;
        alvo.receberDano(this._ataque);
        return new acao_js_1.Acao(0, this, alvo, "Pancada de Troll", this._ataque);
    };
    return Troll;
}(personagem_js_1.Personagem));
exports.Troll = Troll;
