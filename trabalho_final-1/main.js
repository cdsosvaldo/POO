"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var batalha_js_1 = require("./batalha.js");
var guerreiro_js_1 = require("./guerreiro.js");
var mago_js_1 = require("./mago.js");
var arqueiro_js_1 = require("./arqueiro.js");
var troll_js_1 = require("./troll.js");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var batalha = new batalha_js_1.Batalha();
var idCounter = 1;
// Função auxiliar para fazer perguntas ao usuário (Promise)
function pergunta(texto) {
    return new Promise(function (resolve) { return rl.question(texto, resolve); });
}
function menu() {
    return __awaiter(this, void 0, void 0, function () {
        var opcao, _a, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Tenta carregar dados ao iniciar, se eles já tiverem sido salvos escolhendo a opção 6
                    batalha.carregarDados();
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 17];
                    console.log("\n--- SISTEMA DE BATALHA ---");
                    console.log("1. Criar Personagem");
                    console.log("2. Listar Personagens");
                    console.log("3. Realizar Batalha (Turno)");
                    console.log("4. Rodar Simulação de Batalha"); // Extra que escolhemos para inserir no menu
                    console.log("5. Ver Logs de Ações");
                    console.log("6. Sair e Salvar");
                    console.log("--------------------------");
                    return [4 /*yield*/, pergunta("Escolha uma opção: ")];
                case 2:
                    opcao = _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 15, , 16]);
                    _a = opcao;
                    switch (_a) {
                        case "1": return [3 /*break*/, 4];
                        case "2": return [3 /*break*/, 6];
                        case "3": return [3 /*break*/, 7];
                        case "4": return [3 /*break*/, 9];
                        case "5": return [3 /*break*/, 11];
                        case "6": return [3 /*break*/, 12];
                    }
                    return [3 /*break*/, 13];
                case 4: return [4 /*yield*/, criarPersonagem()];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 6:
                    listar();
                    return [3 /*break*/, 14];
                case 7: return [4 /*yield*/, turnoBatalha()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 9: return [4 /*yield*/, rodarSimulacao()];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 11:
                    console.log(batalha.acoes);
                    return [3 /*break*/, 14];
                case 12:
                    batalha.salvarDados();
                    console.log("Salvando...");
                    rl.close();
                    return [2 /*return*/];
                case 13:
                    console.log("Opção inválida.");
                    _b.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    error_1 = _b.sent();
                    console.log("\n\u274C ERRO: ".concat(error_1.message));
                    return [3 /*break*/, 16];
                case 16: return [3 /*break*/, 1];
                case 17: return [2 /*return*/];
            }
        });
    });
}
function criarPersonagem() {
    return __awaiter(this, void 0, void 0, function () {
        var tipo, nome, ataque, _a, defesa, _b, multi, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("\nClasses disponíveis: 1-Guerreiro, 2-Mago, 3-Arqueiro, 4-Troll");
                    return [4 /*yield*/, pergunta("Escolha o tipo: ")];
                case 1:
                    tipo = _d.sent();
                    return [4 /*yield*/, pergunta("Nome do personagem: ")];
                case 2:
                    nome = _d.sent();
                    _a = Number;
                    return [4 /*yield*/, pergunta("Valor de Ataque: ")];
                case 3:
                    ataque = _a.apply(void 0, [_d.sent()]);
                    if (isNaN(ataque))
                        throw new Error("Ataque deve ser número.");
                    if (!(tipo === "1")) return [3 /*break*/, 5];
                    _b = Number;
                    return [4 /*yield*/, pergunta("Valor de Defesa: ")];
                case 4:
                    defesa = _b.apply(void 0, [_d.sent()]);
                    batalha.adicionarPersonagem(new guerreiro_js_1.Guerreiro(idCounter++, nome, ataque, defesa));
                    console.log("⚔️ Um novo guerreiro afiou sua espada!");
                    return [3 /*break*/, 9];
                case 5:
                    if (!(tipo === "2")) return [3 /*break*/, 6];
                    batalha.adicionarPersonagem(new mago_js_1.Mago(idCounter++, nome, ataque));
                    console.log("✨ Um novo mago preparou seus tomos de feitiço!");
                    return [3 /*break*/, 9];
                case 6:
                    if (!(tipo === "3")) return [3 /*break*/, 8];
                    _c = Number;
                    return [4 /*yield*/, pergunta("Multiplicador do ataque (ex: 2): ")];
                case 7:
                    multi = _c.apply(void 0, [_d.sent()]);
                    batalha.adicionarPersonagem(new arqueiro_js_1.Arqueiro(idCounter++, nome, ataque, multi));
                    console.log("🏹 Um novo arqueiro preparou seu arco e flecha!");
                    return [3 /*break*/, 9];
                case 8:
                    if (tipo === "4") {
                        batalha.adicionarPersonagem(new troll_js_1.Troll(idCounter++, nome, ataque));
                        console.log("🧌 Um novo troll surgiu da montanha!");
                    }
                    else {
                        console.log("Tipo inválido.");
                    }
                    _d.label = 9;
                case 9:
                    console.log("Personagem criado!");
                    return [2 /*return*/];
            }
        });
    });
}
function listar() {
    console.log("\n--- Lista de Lutadores ---");
    batalha.listarPersonagens().forEach(function (p) {
        var status = p.estaVivo() ? "VIVO" : "MORTO";
        console.log("[".concat(p.id, "] ").concat(p.nome, " (").concat(p.constructor.name, ") - Vida: ").concat(p.vida, " - ").concat(status));
    });
}
function turnoBatalha() {
    return __awaiter(this, void 0, void 0, function () {
        var idAtacante, _a, idDefensor, _b, atacante, defensor;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("\n--- INICIAR TURNO MANUAL ---");
                    batalha.listarPersonagens();
                    _a = Number;
                    return [4 /*yield*/, pergunta("ID do Atacante: ")];
                case 1:
                    idAtacante = _a.apply(void 0, [_c.sent()]);
                    _b = Number;
                    return [4 /*yield*/, pergunta("ID do Defensor: ")];
                case 2:
                    idDefensor = _b.apply(void 0, [_c.sent()]);
                    try {
                        atacante = batalha.buscarPorId(idAtacante);
                        defensor = batalha.buscarPorId(idDefensor);
                        if (!atacante || !defensor) {
                            console.log("❌ Erro: Um ou ambos os IDs são inválidos.");
                            return [2 /*return*/];
                        }
                        batalha.turno(idAtacante, idDefensor);
                        console.log("\n--- STATUS AP\u00D3S O ATAQUE ---");
                        console.log("\uD83D\uDC9A ".concat(atacante.nome, ": ").concat(atacante.vida, " de vida."));
                        console.log("\uD83D\uDC94 ".concat(defensor.nome, ": ").concat(defensor.vida, " de vida."));
                        if (!defensor.estaVivo()) {
                            console.log("\uD83D\uDC80 FIM DE LINHA: ".concat(defensor.nome, " foi nocauteado!"));
                        }
                        // --------------------------------------------------
                    }
                    catch (error) {
                        console.error("\n\u274C Erro durante o turno: ".concat(error instanceof Error ? error.message : "Erro desconhecido"));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Extra, escolhemos a opção do modo simulação
// Função auxiliar para criar um delay (pausa) sem travar o processador
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function rodarSimulacao() {
    return __awaiter(this, void 0, void 0, function () {
        var vivos, indexAtacante, indexDefensor, atacante, defensor, vencedor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("\n--- INICIANDO SIMULAÇÃO AUTOMÁTICA ---");
                    _a.label = 1;
                case 1:
                    if (!(batalha.verificarVencedor() === null)) return [3 /*break*/, 3];
                    vivos = batalha.listarPersonagens().filter(function (p) { return p.estaVivo(); });
                    // Se sobrou menos de 2, a batalha não pode mais continuar (ou acabou)
                    if (vivos.length < 2) {
                        return [3 /*break*/, 3];
                    }
                    indexAtacante = Math.floor(Math.random() * vivos.length);
                    indexDefensor = Math.floor(Math.random() * vivos.length);
                    // 2. Garante que não bata em si mesmo
                    while (indexAtacante === indexDefensor) {
                        indexDefensor = Math.floor(Math.random() * vivos.length);
                    }
                    atacante = vivos[indexAtacante];
                    defensor = vivos[indexDefensor];
                    console.log("\n---------------------------------------------------");
                    console.log("\n\u27A1\uFE0F  Rodada: ".concat(atacante.nome, " (ID: ").concat(atacante.id, ") ataca ").concat(defensor.nome, " (ID: ").concat(defensor.id, ")"));
                    batalha.turno(atacante.id, defensor.id);
                    console.log("\uD83D\uDC9A Status: ".concat(atacante.nome, " est\u00E1 com ").concat(atacante.vida, " de vida."));
                    console.log("\uD83D\uDC94 Status: ".concat(defensor.nome, " est\u00E1 com ").concat(defensor.vida, " de vida."));
                    if (!defensor.estaVivo()) {
                        console.log("\uD83D\uDC80 FIM DE LINHA: ".concat(defensor.nome, " foi nocauteado!"));
                    }
                    return [4 /*yield*/, sleep(5000)];
                case 2:
                    _a.sent(); // Decidimos deixar uma pausa de 5 segundos para leitura (5000 milésimos de segundo)
                    return [3 /*break*/, 1];
                case 3:
                    vencedor = batalha.verificarVencedor();
                    if (vencedor) {
                        console.log("\n\uD83D\uDC51\uD83D\uDC51\uD83D\uDC51 BATALHA FINALIZADA! O Vencedor \u00E9: ".concat(vencedor.nome, "! \uD83D\uDC51\uD83D\uDC51\uD83D\uDC51"));
                    }
                    else if (batalha.listarPersonagens().filter(function (p) { return p.estaVivo(); }).length === 0) {
                        console.log("\n💥 EMPATE! Todos os personagens foram nocauteados na mesma rodada. 💥");
                    }
                    else {
                        console.log("\n--- SIMULAÇÃO ENCERRADA --- (Sem ação suficiente para continuar)");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
menu();
