//1- Banco de dados vasos
const vasos = [
    {
        nome: "vaso 6",
        codConceito: "56",
        altura: 10.000,
        comprimento: 20.000,
        largura: 30.000,
        volume: 22.000,
        terra: 2.000,
        argila: 0.500,
        manta: 0.200
    },
    {
        nome: "Jardineira Baixa P (30x65x26)",
        codConceito: "VI5118",
        altura: 0.300,
        comprimento: 0.650,
        largura: 0.260,
        volume: 0.051,
        terra: 0.035,
        argila: 0.008,
        manta: 0.340
    },
    {
        nome: "Jardineira Baixa M (30x80x26)",
        codConceito: "VI5117",
        altura: 0.300,
        comprimento: 0.800,
        largura: 0.260,
        volume: 0.063,
        terra: 0.045,
        argila: 0.010,
        manta: 0.420
    },
    {
        nome: "Vaso Japão P (36x44x27)",
        codConceito: "VI5074",
        altura: 0.360,
        comprimento: 0.440,
        largura: 0.270,
        volume: 0.043,
        terra: 0.030,
        argila: 0.007,
        manta: 0.240
    },
    {
        nome: "Vaso Japão M (45x49x36)",
        codConceito: "VI5075",
        altura: 0.450,
        comprimento: 0.490,
        largura: 0.360,
        volume: 0.080,
        terra: 0.056,
        argila: 0.012,
        manta: 0.350
    },
    {
        nome: "Vaso Japão G (54x59x37)",
        codConceito: "VI5076",
        altura: 0.540,
        comprimento: 0.590,
        largura: 0.370,
        volume: 0.118,
        terra: 0.083,
        argila: 0.018,
        manta: 0.440
    },
    {
        nome: "Vaso Porto G (78x63x60)",
        codConceito: "VI5322",
        altura: 0.780,
        comprimento: 0.630,
        largura: 0.600,
        volume: 0.295,
        terra: 0.206,
        argila: 0.044,
        manta: 0.760
    },
    {
        nome: "Vaso Vértice P (91x20x25)",
        codConceito: "VI5309",
        altura: 0.910,
        comprimento: 0.200,
        largura: 0.250,
        volume: 0.046,
        terra: 0.032,
        argila: 0.007,
        manta: 0.100
    },
    {
        nome: "Vaso Cilindro G (90x36x36)",
        codConceito: "VI5060",
        altura: 0.900,
        comprimento: 0.360,
        largura: 0.360,
        volume: 0.117,
        terra: 0.082,
        argila: 0.018,
        manta: 0.260
    },
    {
        nome: "Vaso Cilindro M (70x36x36)",
        codConceito: "VI5059",
        altura: 0.700,
        comprimento: 0.360,
        largura: 0.360,
        volume: 0.091,
        terra: 0.064,
        argila: 0.014,
        manta: 0.260
    },
    {
        nome: "Caixa França G (60x60x80)",
        codConceito: "VI5045",
        altura: 0.800,
        comprimento: 0.600,
        largura: 0.600,
        volume: 0.290,
        terra: 0.202,
        argila: 0.043,
        manta: 0.720
    },
    {
        nome: "Bacia M (21x58x26)",
        codConceito: "VI5291",
        altura: 0.210,
        comprimento: 0.580,
        largura: 0.260,
        volume: 0.032,
        terra: 0.022,
        argila: 0.005,
        manta: 0.300
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
        manta += areaBase * 2 * item.quantidade;
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
        const mantaItem = areaBase * 2 * item.quantidade;

        linhaTabela.innerHTML = `
                <div class="celula">${item.vaso.nome}</div>
                <div class="celula">${item.vaso.codConceito || "-"}</div>
                <div class="celula">${item.vaso.altura || "-"}</div>
                <div class="celula">${item.vaso.comprimento || "-"}</div>
                <div class="celula">${item.vaso.largura || "-"}</div>
                <div class="celula">${item.vaso.volume || "-"}</div>
                <div class="celula">${(item.vaso.terra * item.quantidade).toFixed(2)}</div>
<div class="celula">${(item.vaso.argila * item.quantidade).toFixed(2)}</div>
                <div class="celula">${mantaItem.toFixed(2)}</div>

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
            <div>Terra: ${totais.terra.toFixed(2)} m³ / ${Math.ceil(sacosTerra)} sacos (20L)</div>
            <div>Argila: ${totais.argila.toFixed(2)} m³ / ${Math.ceil(sacosArgila)} sacos (50L)</div>
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
    texto += `Terra: ${totais.terra.toFixed(2)} m³\n`;
    texto += `Argila: ${totais.argila.toFixed(2)} L\n`;
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