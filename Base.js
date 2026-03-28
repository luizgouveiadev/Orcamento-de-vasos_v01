//1- Banco de dados vasos
const vasos = [
    {
        nome: "vaso 6",
        codConceito: "56",
        altura: 10,
        comprimento: 20,
        largura: 30,
        volume: 22,
        terra: 2.0,
        argila: 0.5,
        manta: 0.2
    },
    {
        nome: "Jardineira Baixa P (30x65x26)",
        codConceito: "VI5118",
        altura: 0.30,
        comprimento: 0.65,
        largura: 0.26,
        volume: 0.0507,
        terra: 0.035,
        argila: 0.0076,
        manta: 0.34
    },
    {
        nome: "Jardineira Baixa M (30x80x26)",
        codConceito: "VI5117",
        altura: 0.30,
        comprimento: 0.80,
        largura: 0.26,
        volume: 0.0624,
        terra: 0.044,
        argila: 0.0094,
        manta: 0.42
    },
    {
        nome: "Vaso Japão P (36x44x27)",
        codConceito: "VI5074",
        altura: 0.36,
        comprimento: 0.44,
        largura: 0.27,
        volume: 0.0428,
        terra: 0.030,
        argila: 0.0064,
        manta: 0.24
    },
    {
        nome: "Vaso Japão M (45x49x36)",
        codConceito: "VI5075",
        altura: 0.45,
        comprimento: 0.49,
        largura: 0.36,
        volume: 0.0794,
        terra: 0.056,
        argila: 0.0119,
        manta: 0.35
    },
    {
        nome: "Vaso Japão G (54x59x37)",
        codConceito: "VI5076",
        altura: 0.54,
        comprimento: 0.59,
        largura: 0.37,
        volume: 0.1179,
        terra: 0.083,
        argila: 0.0177,
        manta: 0.44
    },
    {
        nome: "Vaso Porto G (78x63x60)",
        codConceito: "VI5322",
        altura: 0.78,
        comprimento: 0.63,
        largura: 0.60,
        volume: 0.2948,
        terra: 0.206,
        argila: 0.0442,
        manta: 0.76
    },
    {
        nome: "Vaso Vértice P (91x20x25)",
        codConceito: "VI5309",
        altura: 0.91,
        comprimento: 0.20,
        largura: 0.25,
        volume: 0.0455,
        terra: 0.032,
        argila: 0.0068,
        manta: 0.10
    },
    {
        nome: "Vaso Cilindro G (90x36x36)",
        codConceito: "VI5060",
        altura: 0.90,
        comprimento: 0.36,
        largura: 0.36,
        volume: 0.1166,
        terra: 0.082,
        argila: 0.0175,
        manta: 0.26
    },
    {
        nome: "Vaso Cilindro M (70x36x36)",
        codConceito: "VI5059",
        altura: 0.70,
        comprimento: 0.36,
        largura: 0.36,
        volume: 0.0907,
        terra: 0.064,
        argila: 0.0136,
        manta: 0.26
    },
    {
        nome: "Caixa França G (60x60x80)",
        codConceito: "VI5045",
        altura: 0.80,
        comprimento: 0.60,
        largura: 0.60,
        volume: 0.2880,
        terra: 0.202,
        argila: 0.0432,
        manta: 0.72
    },
    {
        nome: "Bacia M (21x58x26)",
        codConceito: "VI5291",
        altura: 0.21,
        comprimento: 0.58,
        largura: 0.26,
        volume: 0.0317,
        terra: 0.022,
        argila: 0.0048,
        manta: 0.30
    }
];

//2- Lista do orçamento
let orcamento = [];

//3- Add vasos
function adicionarVasos() {
    const nome = document.getElementById("buscar").value.toLowerCase();
    const quantidade = Number(document.getElementById("qtd").value);

    const vaso = vasos.find(v =>
        v.nome.toLowerCase().includes(nome) ||
        String(v.codConceito || "").toLowerCase().includes(nome)
    );

    if (!vaso) {
        alert("Vaso não encontrado! =/");
        return;
    }

    orcamento.push({ vaso, quantidade });
    atualizarTela();
}

//4- Calcular totais
function calcularTotais() {
    let terra = 0;
    let argila = 0;
    let manta = 0;

    orcamento.forEach((item) => {
        terra += item.vaso.terra * item.quantidade;
        argila += item.vaso.argila * item.quantidade;

        const comp = item.vaso.comprimento > 10 ? item.vaso.comprimento / 100 : item.vaso.comprimento;
        const larg = item.vaso.largura > 10 ? item.vaso.largura / 100 : item.vaso.largura;

        const areaBase = comp * larg;
        manta += areaBase * item.quantidade;
    });

    return { terra, argila, manta };
}

//5- Atualizar tela
function atualizarTela() {
    const lista = document.getElementById("lista");
    const linhas = document.getElementById("linhas");

    lista.innerHTML = "";
    linhas.innerHTML = "";

    orcamento.forEach((item, index) => {

        // Tabela
        const linhaTabela = document.createElement("div");
        linhaTabela.className = "item";

        const comp = item.vaso.comprimento > 10 ? item.vaso.comprimento / 100 : item.vaso.comprimento;
        const larg = item.vaso.largura > 10 ? item.vaso.largura / 100 : item.vaso.largura;

        const areaBase = comp * larg * item.quantidade;

        linhaTabela.innerHTML = `
                <div class="celula">${item.vaso.nome}</div>
                <div class="celula">${item.vaso.codConceito || "-"}</div>
                <div class="celula">${item.vaso.altura || "-"}</div>
                <div class="celula">${item.vaso.comprimento || "-"}</div>
                <div class="celula">${item.vaso.largura || "-"}</div>
                <div class="celula">${item.vaso.volume || "-"}</div>
                <div class="celula">${item.vaso.terra * item.quantidade}</div>
                <div class="celula">${item.vaso.argila * item.quantidade}</div>
                <div class="celula">${areaBase}</div>
            `;

        linhas.appendChild(linhaTabela);

        // Lista com botão remover
        const itemLista = document.createElement("div");

        itemLista.innerHTML = `
                ${item.quantidade}x ${item.vaso.nome}
                <button type="button" onclick="removerItem(${index})">❌</button>
            `;

        lista.appendChild(itemLista);
    });

    // Resultado
    const totais = calcularTotais();

    const sacosTerra = totais.terra / 0.02;
    const sacosArgila = (totais.argila * 1000) / 50;

    document.getElementById("resultado").innerHTML = `
            <div>Terra: ${totais.terra} m³ / ${Math.ceil(sacosTerra)} sacos (20L)</div>
            <div>Argila: ${totais.argila} m³ / ${Math.ceil(sacosArgila)} sacos (50L)</div>
            <div>Manta: ${totais.manta.toFixed(2)} m² / ${totais.manta.toFixed(2)} ml</div>
        `;
}

//6- Copiar orçamento
function copiar() {
    let texto = "ORÇAMENTO\n\n";

    orcamento.forEach((item) => {
        texto += `${item.quantidade}x ${item.vaso.nome}\n`;
    });

    const totais = calcularTotais();

    texto += `\nTOTAL:\n`;
    texto += `Terra: ${totais.terra} m³\n`;
    texto += `Argila: ${totais.argila} L\n`;
    texto += `Manta: ${totais.manta} m²`;

    navigator.clipboard.writeText(texto)
        .then(() => alert("Orçamento copiado!"))
        .catch(() => alert("Erro ao copiar!"));
}

//7- Informação do vaso
function mostrarInfoVaso() {
    const nome = document.getElementById("buscar").value.toLowerCase();
    const vaso = vasos.find(v => v.nome.toLowerCase().includes(nome));
    const div = document.getElementById("infoVaso");

    if (!vaso) {
        div.innerHTML = "";
        return;
    }

    div.innerHTML = `
            <p>Altura: ${vaso.altura || "-"}</p>
            <p>Largura: ${vaso.largura || "-"}</p>
            <p>Comprimento: ${vaso.comprimento || "-"}</p>
            <p>Terra: ${vaso.terra}</p>
            <p>Argila: ${vaso.argila}</p>
        `;
}

//8- Remover item
function removerItem(index) {
    orcamento.splice(index, 1);
    atualizarTela();
}