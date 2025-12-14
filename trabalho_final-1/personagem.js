"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personagem = void 0;
/* Deixei a classe Personagem como abstrata porque, além de não fazer sentido no contexto do jogo poder criar um personagem sem uma classe,
eu forço as outras classes a criarem seu próprio método atacar. Caso eu queria implementar um novo personagem,
se eu esquecer de implementar o método atacar próprio do personagem, o código da um erro ao compilar.
*/
var Personagem = /** @class */ (function () {
    function Personagem(id, nome, ataque) {
        // extra de estatísticas do personagem, fizemos depois
        this._danoCausadoTotal = 0;
        this._id = id;
        this._nome = nome;
        this._vida = 100;
        this._ataque = ataque;
        this._historico = [];
        this._vivo = true;
    }
    Object.defineProperty(Personagem.prototype, "nome", {
        // Getters para acessar os dados protegidos
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "vida", {
        get: function () {
            return this._vida;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "historico", {
        get: function () {
            return this._historico;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "ataque", {
        get: function () {
            return this._ataque;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "danoCausadoTotal", {
        get: function () {
            return this._danoCausadoTotal;
        },
        enumerable: false,
        configurable: true
    });
    Personagem.prototype.estaVivo = function () {
        return this._vida > 0;
    };
    Personagem.prototype.receberDano = function (valor) {
        this._vida -= valor;
        if (this._vida < 0) {
            this._vida = 0;
        }
        if (this._vida === 0) {
            this._vivo = false;
        }
    };
    Personagem.prototype.registrarAcao = function (acao) {
        this._historico.push(acao);
    };
    // Ataque que os magos vão usar para causar dano verdadeiro nos guerreiros
    // O guerreiro não vai sobrescrever este, então ele sempre afeta a vida direto
    Personagem.prototype.receberDanoDireto = function (valor) {
        this._vida -= valor;
        if (this._vida < 0) {
            this._vida = 0;
        }
        if (this._vida === 0) {
            this._vivo = false;
        }
        console.log("".concat(this.nome, " sofreu ").concat(valor, " de dano direto (ignorou defesa)!"));
    };
    return Personagem;
}());
exports.Personagem = Personagem;
