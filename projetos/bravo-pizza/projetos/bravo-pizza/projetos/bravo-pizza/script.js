const produtos = [
    {
        id: 1,
        nome: "Calabresa Especial",
        descricao: "Molho artesanal, mussarela, calabresa e cebola.",
        preco: 42.90,
        categoria: "tradicionais",
        imagem: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=700"
    },
    {
        id: 2,
        nome: "Margherita",
        descricao: "Mussarela, tomate fresco, manjericão e molho especial.",
        preco: 44.90,
        categoria: "tradicionais",
        imagem: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700"
    },
    {
        id: 3,
        nome: "Quatro Queijos",
        descricao: "Uma combinação irresistível de quatro queijos.",
        preco: 49.90,
        categoria: "especiais",
        imagem: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=700"
    },
    {
        id: 4,
        nome: "Bravo Supreme",
        descricao: "Uma explosão de sabores com ingredientes selecionados.",
        preco: 56.90,
        categoria: "especiais",
        imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700"
    },
    {
        id: 5,
        nome: "Chocolate",
        descricao: "Chocolate cremoso com uma massa deliciosa.",
        preco: 45.90,
        categoria: "doces",
        imagem: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=700"
    },
    {
        id: 6,
        nome: "Romeu e Julieta",
        descricao: "A combinação perfeita de queijo e goiabada.",
        preco: 47.90,
        categoria: "doces",
        imagem: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700"
    },
    {
        id: 7,
        nome: "Frango com Catupiry",
        descricao: "Frango desfiado, catupiry e mussarela.",
        preco: 48.90,
        categoria: "tradicionais",
        imagem: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=700"
    },
    {
        id: 8,
        nome: "Brava Premium",
        descricao: "Nossa receita especial com ingredientes premium.",
        preco: 59.90,
        categoria: "especiais",
        imagem: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=700"
    }
];

const carrinho = [];

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarProdutos(categoria = "todas") {
    const container = document.getElementById("products-grid");

    if (!container) return;

    const filtrados = categoria === "todas"
        ? produtos
        : produtos.filter(produto => produto.categoria === categoria);

    container.innerHTML = filtrados.map(produto => `
        <article class="product-card">
            <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">

            <div class="product-info">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>

                <div class="product-bottom">
                    <span class="product-price">${formatarPreco(produto.preco)}</span>

                    <button
                        class="add-button"
                        onclick="adicionarCarrinho(${produto.id})">
                        + Adicionar
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

function adicionarCarrinho(id) {
    const produto = produtos.find(item => item.id === id);

    if (!produto) return;

    carrinho.push(produto);

    alert(`${produto.nome} foi adicionado ao seu pedido!`);
}

document.querySelectorAll(".category").forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelectorAll(".category").forEach(item => {
            item.classList.remove("active");
        });

        botao.classList.add("active");

        const categoria = botao.dataset.category || "todas";
        mostrarProdutos(categoria);
    });
});

const ano = document.getElementById("year");

if (ano) {
    ano.textContent = new Date().getFullYear();
}

mostrarProdutos();
