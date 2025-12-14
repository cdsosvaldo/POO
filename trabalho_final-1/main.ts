import * as readline from 'readline';
import { Batalha } from "./batalha.js";
import { Guerreiro } from "./guerreiro.js";
import { Mago } from "./mago.js";
import { Arqueiro } from "./arqueiro.js";
import { Troll } from './troll.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const batalha = new Batalha();
let idCounter = 1;

// Função auxiliar para fazer perguntas ao usuário (Promise)
function pergunta(texto: string): Promise<string> {
    return new Promise(resolve => rl.question(texto, resolve));
}

async function menu() {
    // Tenta carregar dados ao iniciar o programa, se eles já tiverem sido salvos escolhendo a opção 6 em uma execução anterior
    batalha.carregarDados();

    while (true) {
        console.log("\n--- SISTEMA DE BATALHA ---");
        console.log("1. Criar Personagem");
        console.log("2. Listar Personagens");
        console.log("3. Realizar Batalha (Turno)");
        console.log("4. Rodar Simulação de Batalha"); // Extra que escolhemos para inserir no menu
        console.log("5. Ver Logs de Ações");
        console.log("6. Sair e Salvar")
        console.log("--------------------------");

        const opcao = await pergunta("Escolha uma opção: ");

        try {
            switch (opcao) {
                case "1":
                    await criarPersonagem();
                    break;
                case "2":
                    listar();
                    break;
                case "3":
                    await turnoBatalha();
                    break;
                case "4":
                    await rodarSimulacao();
                    break;
                case "5":
                    console.log(batalha.acoes);
                    break;
                case "6":
                    batalha.salvarDados();
                    console.log("Salvando...");
                    rl.close();
                    return;
                default:
                    console.log("Opção inválida.");
            }

        } catch (error: any) {
            console.log(`\n❌ ERRO: ${error.message}`); 
        }
    }
}

async function criarPersonagem() {
    console.log("\nClasses disponíveis: 1-Guerreiro, 2-Mago, 3-Arqueiro, 4-Troll");
    const tipo = await pergunta("Escolha o tipo: ");
    const nome = await pergunta("Nome do personagem: ");
    const ataque = Number(await pergunta("Valor de Ataque: "));

    if (isNaN(ataque)) throw new Error("Ataque deve ser número.");

    if (tipo === "1") {
        const defesa = Number(await pergunta("Valor de Defesa: "));
        batalha.adicionarPersonagem(new Guerreiro(idCounter++, nome, ataque, defesa));
        console.log("⚔️ Um novo guerreiro afiou sua espada!")
    } else if (tipo === "2") {
        batalha.adicionarPersonagem(new Mago(idCounter++, nome, ataque));
        console.log("✨ Um novo mago preparou seus tomos de feitiço!")
    } else if (tipo === "3") {
        const multi = Number(await pergunta("Multiplicador do ataque (ex: 2): "));
        batalha.adicionarPersonagem(new Arqueiro(idCounter++, nome, ataque, multi));
        console.log("🏹 Um novo arqueiro preparou seu arco e flecha!")
    } else if (tipo === "4") {
        batalha.adicionarPersonagem(new Troll(idCounter++, nome, ataque));
        console.log("🧌 Um novo troll surgiu da montanha!")    
    } else {
        console.log("Tipo inválido.");
    }
    console.log("Personagem criado!");
}

function listar() {
    console.log("\n--- Lista de Lutadores ---");
    batalha.listarPersonagens().forEach(p => {
        const status = p.estaVivo() ? "VIVO" : "MORTO";
        console.log(`[${p.id}] ${p.nome} (${p.constructor.name}) - Vida: ${p.vida} - ${status}`);
    });
}

async function turnoBatalha() {
    console.log("\n--- INICIAR TURNO MANUAL ---");
    batalha.listarPersonagens();

    const idAtacante = Number(await pergunta("ID do Atacante: "));
    const idDefensor = Number(await pergunta("ID do Defensor: "));

    try {
        const atacante = batalha.buscarPorId(idAtacante);
        const defensor = batalha.buscarPorId(idDefensor);

        if (!atacante || !defensor) {
            console.log("❌ Erro: Um ou ambos os IDs são inválidos.");
            return;
        }

        batalha.turno(idAtacante, idDefensor);

        console.log(`\n--- STATUS APÓS O ATAQUE ---`);
        console.log(`💚 ${atacante.nome}: ${atacante.vida} de vida.`);
        console.log(`💔 ${defensor.nome}: ${defensor.vida} de vida.`);

        if (!defensor.estaVivo()) {
            console.log(`💀 FIM DE LINHA: ${defensor.nome} foi nocauteado!`);
        }
        // --------------------------------------------------

    } catch (error) {
        console.error(`\n❌ Erro durante o turno: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    }
}

// Extra, escolhemos a opção do modo simulação

// Função auxiliar para criar um delay (pausa) sem travar o processador
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function rodarSimulacao() {
    console.log("\n--- INICIANDO SIMULAÇÃO AUTOMÁTICA ---");
    
    // Continua a simulação ENQUANTO o vencedor for nulo
    while (batalha.verificarVencedor() === null) {
        
        const vivos = batalha.listarPersonagens().filter(p => p.estaVivo());
        
        // Se sobrou menos de 2, a batalha não pode mais continuar (ou acabou)
        if (vivos.length < 2) {
            break; 
        }

        // 1. Sorteia atacante e defensor
        const indexAtacante = Math.floor(Math.random() * vivos.length);
        let indexDefensor = Math.floor(Math.random() * vivos.length);

        // 2. Garante que não bata em si mesmo
        while (indexAtacante === indexDefensor) {
            indexDefensor = Math.floor(Math.random() * vivos.length);
        }

        const atacante = vivos[indexAtacante];
        const defensor = vivos[indexDefensor];

        console.log(`\n---------------------------------------------------`);
        console.log(`\n➡️  Rodada: ${atacante.nome} (ID: ${atacante.id}) ataca ${defensor.nome} (ID: ${defensor.id})`);
        batalha.turno(atacante.id, defensor.id);

        console.log(`💚 Status: ${atacante.nome} está com ${atacante.vida} de vida.`);
        console.log(`💔 Status: ${defensor.nome} está com ${defensor.vida} de vida.`);
        
        if (!defensor.estaVivo()) {
            console.log(`💀 FIM DE LINHA: ${defensor.nome} foi nocauteado!`);
        }

        await sleep(5000); // Decidimos deixar uma pausa de 5 segundos para leitura
    }
    
    const vencedor = batalha.verificarVencedor();
    if (vencedor) {
        console.log(`\n👑👑👑 BATALHA FINALIZADA! O Vencedor é: ${vencedor.nome}! 👑👑👑`);
    } else if (batalha.listarPersonagens().filter(p => p.estaVivo()).length === 0) {
        console.log("\n💥 EMPATE! Todos os personagens foram nocauteados na mesma rodada. 💥");
    } else {
        console.log("\n--- SIMULAÇÃO ENCERRADA --- (Sem ação suficiente para continuar)");
    }
}

menu();