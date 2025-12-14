import * as fs from 'fs';
import { Personagem } from "./personagem.js";
import { Acao } from "./acao.js";
import { Guerreiro } from "./guerreiro.js";
import { Mago } from "./mago.js";
import { Arqueiro } from "./arqueiro.js";
import { Troll } from "./troll.js";

export class Batalha {
    personagens: Personagem[] = [];
    acoes: Acao[] = [];
    contadorIdAcao: number = 1;

    adicionarPersonagem(p: Personagem): void {
        const existe = this.personagens.find(person => person.nome === p.nome);
        if (existe) {
            throw new Error("Já existe um personagem com este nome.");
        }
        this.personagens.push(p);
    }

    consultarPersonagem(nome: string): Personagem {
        const p = this.personagens.find(person => person.nome === nome);
        if (!p) throw new Error("Personagem não encontrado.");
        return p;
    }

    buscarPorId(id: number): Personagem {
        const p = this.personagens.find(person => person.id === id);
        if (!p) throw new Error("ID não encontrado.");
        return p;
    }

    turno(atacanteId: number, defensorId: number): void {
        const atacante = this.buscarPorId(atacanteId);
        const defensor = this.buscarPorId(defensorId);

        // Validações para não se atacar, nem atacar estando morto ou atacar um personagem morto.
        if (atacanteId === defensorId) throw new Error("Não pode atacar a si mesmo.");
        if (!atacante.estaVivo()) throw new Error("Atacante está morto.");
        if (!defensor.estaVivo()) throw new Error("Alvo já está morto.");

        console.log(`>>> ${atacante.nome} ataca ${defensor.nome}!`);
        const acao = atacante.atacar(defensor);
        
        // Ajusta ID da ação e registra
        acao.id = this.contadorIdAcao++;
        
        // Registra nos históricos 
        this.acoes.push(acao);
        atacante.registrarAcao(acao);
        defensor.registrarAcao(acao); // Ficamos pensando se registraria no alvo que ele sofreu ação, decidimos que sim.
    }

    verificarVencedor(): Personagem | null {
        const vivos = this.personagens.filter(p => p.estaVivo());
        if (vivos.length === 1) {
            return vivos[0];
        }
        return null; // Ainda tem batalha
    }

    listarPersonagens(): Personagem[] {
        return this.personagens;
    }

    salvarDados(): void {
        // Precisamos salvar o "tipo" da classe para recriar depois
        const dadosParaSalvar = this.personagens.map(p => {
            return {
                tipo: p.constructor.name,
                dados: p
            };
        });
        fs.writeFileSync('batalha_dados.json', JSON.stringify(dadosParaSalvar, null, 2));
        console.log("Dados salvos com sucesso!");
    }

    carregarDados(): void {
        if (!fs.existsSync('batalha_dados.json')) return;

        const dadosRaw = fs.readFileSync('batalha_dados.json', 'utf-8');
        const listaObjetos = JSON.parse(dadosRaw);

        this.personagens = [];

        listaObjetos.forEach((item: any) => {
            let novoPersonagem: Personagem;
            const d = item.dados;

            if (item.tipo === "Guerreiro") {
                novoPersonagem = new Guerreiro(d._id, d._nome, d._ataque, d._defesa);
            } else if (item.tipo === "Mago") {
                novoPersonagem = new Mago(d._id, d._nome, d._ataque);
            } else if (item.tipo === "Arqueiro") {
                novoPersonagem = new Arqueiro(d._id, d._nome, d._ataque, d._ataqueMultiplo);
            } else if (item.tipo === "Troll") {
                novoPersonagem = new Troll(d._id, d._nome, d.ataque);
            } else {
                return;
            }

            // Restaurar vida (pois o construtor reseta para 100)
            (novoPersonagem as any)._vida = d._vida;
            this.personagens.push(novoPersonagem);
        });
        console.log("Dados carregados com sucesso!");
    }
}