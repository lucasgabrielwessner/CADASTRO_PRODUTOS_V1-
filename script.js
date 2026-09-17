class Produto {
    #preco;
    #quantidade;

    constructor(nome, preco, quantidade) {
        // Converter valores
        const precoNum = parseFloat(preco);
        const quantidadeNum = parseInt(quantidade, 10);

        // Validações com lançamentos de Erro
        if (!nome || nome.trim() === "") {
            throw new Error("O nome do produto não pode estar vazio.");
        }

        if (isNaN(precoNum) || precoNum <= 0) {
            throw new Error("O preço deve ser um número maior que zero.");
        }

        if (isNaN(quantidadeNum) || quantidadeNum < 0) {
            throw new Error("A quantidade deve ser um número inteiro maior ou igual a zero.");
        }

        this.nome = nome.trim();
        this.#preco = precoNum;
        this.#quantidade = quantidadeNum;
    }

    // Getters necessários para acessar os atributos privados na renderização
    get preco() {
        return this.#preco;
    }

    get quantidade() {
        return this.#quantidade;
    }

    calcularSubtotal() {
        return this.#preco * this.#quantidade;
    }
}

const listaDeProdutos = [];

const formProduto = document.getElementById("produto-form");
const tabelaBody = document.querySelector("#tabela-produtos tbody");
const totalEstoque = document.getElementById("total-estoque");
const btnLimpar = document.getElementById("limpar-tabela");

formProduto.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const quantidade = document.getElementById("quantidade").value;

    // Bloco try...catch para capturar os erros lançados pelo Produto
    try {
        const novoProduto = new Produto(nome, preco, quantidade);

        listaDeProdutos.push(novoProduto);

        renderizarTabela();

        formProduto.reset();
    } catch (error) {
        // Exibe o erro para o usuário sem travar a aplicação
        alert(`Erro ao cadastrar produto: ${error.message}`);
    }
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