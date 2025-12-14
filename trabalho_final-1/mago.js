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
exports.Mago = void 0;
var personagem_js_1 = require("./personagem.js");
var guerreiro_js_1 = require("./guerreiro.js");
var arqueiro_js_1 = require("./arqueiro.js");
var acao_js_1 = require("./acao.js");
var Mago = /** @class */ (function (_super) {
    __extends(Mago, _super);
    function Mago(id, nome, ataque) {
        return _super.call(this, id, nome, ataque) || this;
    }
    Mago.prototype.atacar = function (alvo) {
        if (!this.estaVivo())
            throw new Error("Mago morto não lança feitiços.");
        var danoCalculado = this._ataque;
        // Regra: Dano dobrado em Arqueiros
        if (alvo instanceof arqueiro_js_1.Arqueiro) {
            danoCalculado = danoCalculado * 2;
            console.log("Dano super efetivo contra Arqueiro!");
        }
        // Regra: Mago perde 10 de vida ao atacar
        this.receberDano(10);
        this.registrarAcao(new acao_js_1.Acao(0, this, this, "Custo de Mana (Vida)", 10));
        // Regra: Ignora defesa do guerreiro
        if (alvo instanceof guerreiro_js_1.Guerreiro) {
            console.log("A magia atravessou a armadura do Guerreiro!");
            alvo.receberDanoDireto(danoCalculado);
        }
        else {
            alvo.receberDano(danoCalculado);
        }
        return new acao_js_1.Acao(0, this, alvo, "Magia lançada", danoCalculado);
    };
    return Mago;
}(personagem_js_1.Personagem));
exports.Mago = Mago;
