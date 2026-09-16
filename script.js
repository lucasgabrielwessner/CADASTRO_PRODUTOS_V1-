class Produto {
    constructor(nome, preco, quantidade) {
        this.nome = nome;
        this.preco = parseFloat(preco);
        this.quantidade = parseInt(quantidade);
    }

    calcularSubtotal() {
        return this.preco * this.quantidade;
    }
}

const listaDeProdutos = [];

const formProduto = document.getElementById("produto-form");
const tabelaBody = document.querySelector("#tabela-produtos tbody");
const totalEstoque = document.getElementById("total-estoque");
const btnLimpar = document.getElementById("limpar-tabela");

formProduto.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const preco = document.getElementById("preco").value;
    const quantidade = document.getElementById("quantidade").value;

    const novoProduto = new Produto(nome, preco, quantidade);

    listaDeProdutos.push(novoProduto);

    renderizarTabela();

    formProduto.reset();
});

function renderizarTabela() {
    tabelaBody.innerHTML = "";

    listaDeProdutos.forEach((produto, index) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.calcularSubtotal().toFixed(2).replace(".", ",")}</td>
            <td>
                <button class="btn-remover" data-index="${index}">
                    Remover
                </button>
            </td>
        `;

        tabelaBody.appendChild(linha);
    });

    atualizarTotal();
}

function atualizarTotal() {
    const total = listaDeProdutos.reduce((soma, produto) => {
        return soma + produto.calcularSubtotal();
    }, 0);

    totalEstoque.textContent =
        `Total em Estoque: R$ ${total.toFixed(2).replace(".", ",")}`;
}

// Remover produto
tabelaBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-remover")) {
        const index = event.target.dataset.index;

        listaDeProdutos.splice(index, 1);

        renderizarTabela();
    }
});

// Limpar todos os produtos
btnLimpar.addEventListener("click", function () {
    listaDeProdutos.length = 0;

    renderizarTabela();
});
