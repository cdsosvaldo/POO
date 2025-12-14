"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batalha = void 0;
var fs = require("fs");
var guerreiro_js_1 = require("./guerreiro.js");
var mago_js_1 = require("./mago.js");
var arqueiro_js_1 = require("./arqueiro.js");
var troll_js_1 = require("./troll.js");
var Batalha = /** @class */ (function () {
    function Batalha() {
        this.personagens = [];
        this.acoes = [];
        this.contadorIdAcao = 1;
    }
    Batalha.prototype.adicionarPersonagem = function (p) {
        var existe = this.personagens.find(function (person) { return person.nome === p.nome; });
        if (existe) {
            throw new Error("Já existe um personagem com este nome.");
        }
        this.personagens.push(p);
    };
    Batalha.prototype.consultarPersonagem = function (nome) {
        var p = this.personagens.find(function (person) { return person.nome === nome; });
        if (!p)
            throw new Error("Personagem não encontrado.");
        return p;
    };
    Batalha.prototype.buscarPorId = function (id) {
        var p = this.personagens.find(function (person) { return person.id === id; });
        if (!p)
            throw new Error("ID não encontrado.");
        return p;
    };
    Batalha.prototype.turno = function (atacanteId, defensorId) {
        var atacante = this.buscarPorId(atacanteId);
        var defensor = this.buscarPorId(defensorId);
        // Validações para não se atacar, nem atacar estando morto ou atacar um personagem morto.
        if (atacanteId === defensorId)
            throw new Error("Não pode atacar a si mesmo.");
        if (!atacante.estaVivo())
            throw new Error("Atacante está morto.");
        if (!defensor.estaVivo())
            throw new Error("Alvo já está morto.");
        console.log(">>> ".concat(atacante.nome, " ataca ").concat(defensor.nome, "!"));
        var acao = atacante.atacar(defensor);
        // Ajusta ID da ação e registra
        acao.id = this.contadorIdAcao++;
        // Registra nos históricos 
        this.acoes.push(acao);
        atacante.registrarAcao(acao);
        defensor.registrarAcao(acao); // Ficamos pensando se registraria no alvo que ele sofreu ação, decidimos que sim.
    };
    Batalha.prototype.verificarVencedor = function () {
        var vivos = this.personagens.filter(function (p) { return p.estaVivo(); });
        if (vivos.length === 1) {
            return vivos[0];
        }
        return null; // Ainda tem batalha
    };
    Batalha.prototype.listarPersonagens = function () {
        return this.personagens;
    };
    Batalha.prototype.salvarDados = function () {
        // Precisamos salvar o "tipo" da classe para recriar depois
        var dadosParaSalvar = this.personagens.map(function (p) {
            return {
                tipo: p.constructor.name,
                dados: p
            };
        });
        fs.writeFileSync('batalha_dados.json', JSON.stringify(dadosParaSalvar, null, 2));
        console.log("Dados salvos com sucesso!");
    };
    Batalha.prototype.carregarDados = function () {
        var _this = this;
        if (!fs.existsSync('batalha_dados.json'))
            return;
        var dadosRaw = fs.readFileSync('batalha_dados.json', 'utf-8');
        var listaObjetos = JSON.parse(dadosRaw);
        this.personagens = [];
        listaObjetos.forEach(function (item) {
            var novoPersonagem;
            var d = item.dados;
            if (item.tipo === "Guerreiro") {
                novoPersonagem = new guerreiro_js_1.Guerreiro(d._id, d._nome, d._ataque, d._defesa);
            }
            else if (item.tipo === "Mago") {
                novoPersonagem = new mago_js_1.Mago(d._id, d._nome, d._ataque);
            }
            else if (item.tipo === "Arqueiro") {
                novoPersonagem = new arqueiro_js_1.Arqueiro(d._id, d._nome, d._ataque, d._ataqueMultiplo);
            }
            else if (item.tipo === "Troll") {
                novoPersonagem = new troll_js_1.Troll(d._id, d._nome, d.ataque);
            }
            else {
                return;
            }
            // Restaurar vida (pois o construtor reseta para 100)
            novoPersonagem._vida = d._vida;
            _this.personagens.push(novoPersonagem);
        });
        console.log("Dados carregados com sucesso!");
    };
    return Batalha;
}());
exports.Batalha = Batalha;
