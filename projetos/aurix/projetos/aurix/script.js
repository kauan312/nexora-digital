
// ================================
// AURIX - FUNCIONALIDADES
// ================================

const WHATSAPP = "5544984133529";

const produtos = {
    "Camiseta Essential": 89.90,
    "Look Elegance": 159.90,
    "Urban Style": 129.90,
    "Acessório Gold": 79.90
};

let carrinho = [];

// ================================
// MENU MOBILE
// ================================

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("active");
});

navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("active");
    });
});

// ================================
// FILTROS DE PRODUTOS
// ================================

const categorias = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".product-card");

categorias.forEach(botao => {
    botao.addEventListener("click", () => {

        categorias.forEach(item => item.classList.remove("active"));
        botao.classList.add("active");

        const filtro = botao.dataset.filter;

        cards.forEach(card => {
            const categoria = card.dataset.category;

            card.style.display =
                filtro === "todos" || categoria === filtro
                    ? ""
                    : "none";
        });

    });
});

// ================================
// CARRINHO
// ================================

const cartButton = document.getElementById("cartButton");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

cartButton.addEventListener("click", () => {
    cartOverlay.classList.add("open");
});

closeCart.addEventListener("click", () => {
    cartOverlay.classList.remove("open");
});

cartOverlay.addEventListener("click", event => {
    if (event.target === cartOverlay) {
        cartOverlay.classList.remove("open");
    }
});

// ================================
// ADICIONAR PRODUTO
// ================================

document.querySelectorAll(".quick-add").forEach(botao => {

    botao.addEventListener("click", () => {

        const nome = botao.dataset.product;
        const preco = produtos[nome];

        if (!preco) return;

        const existente = carrinho.find(item => item.nome === nome);

        if (existente) {
            existente.quantidade++;
        } else {
            carrinho.push({
                nome,
                preco,
                quantidade: 1
            });
        }

        atualizarCarrinho();

        cartOverlay.classList.add("open");

    });

});

// ================================
// ATUALIZAR CARRINHO
// ================================

function atualizarCarrinho() {

    cartItems.innerHTML = "";

    if (carrinho.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Seu carrinho está vazio.</p>';

    }

    carrinho.forEach((item, index) => {

        const elemento = document.createElement("div");

        elemento.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            padding: 18px 0;
            border-bottom: 1px solid rgba(198,166,106,.15);
        `;

        const informacoes = document.createElement("div");

        const nome = document.createElement("strong");
        nome.textContent = item.nome;

        const detalhe = document.createElement("p");
        detalhe.style.cssText = "color:#aaa;font-size:12px;margin-top:8px;";
        detalhe.textContent =
            `${item.quantidade} x ${formatarMoeda(item.preco)}`;

        informacoes.append(nome, detalhe);

        const remover = document.createElement("button");
        remover.textContent = "REMOVER";
        remover.style.cssText = `
            background: transparent;
            border: none;
            color: #c6a66a;
            font-size: 10px;
            cursor: pointer;
        `;

        remover.addEventListener("click", () => {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        });

        elemento.append(informacoes, remover);
        cartItems.appendChild(elemento);

    });

    const quantidade = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    cartCount.textContent = quantidade;
    cartTotal.textContent = formatarMoeda(total);

}

// ================================
// FORMATAR PREÇOS
// ================================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}

// ================================
// FINALIZAR PELO WHATSAPP
// ================================

checkoutButton.addEventListener("click", () => {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");
        return;

    }

    let mensagem = "Olá! Gostaria de solicitar um pedido demonstrativo na AURIX.\n\n";

    carrinho.forEach(item => {

        mensagem +=
            `${item.nome} - ${item.quantidade} unidade(s) - ${formatarMoeda(item.preco * item.quantidade)}\n`;

    });

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    mensagem += `\nTotal ilustrativo: ${formatarMoeda(total)}`;
    mensagem += "\n\nSei que esta é uma loja demonstrativa.";

    const url =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank", "noopener,noreferrer");

});

// ================================
// ANO AUTOMÁTICO
// ================================

document.getElementById("year").textContent =
    new Date().getFullYear();

// ================================
// ANIMAÇÃO AO ROLAR
// ================================

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("visible");

            observador.unobserve(entrada.target);

        }

    });

}, {
    threshold: 0.12
});

document.querySelectorAll(
    ".product-card, .benefit, .about-content, .editorial-content"
).forEach(elemento => {

    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(25px)";
    elemento.style.transition = "opacity .7s ease, transform .7s ease";

    observador.observe(elemento);

});

const estiloAnimacao = document.createElement("style");

estiloAnimacao.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

document.head.appendChild(estiloAnimacao);

// ================================
// FIM DO PROJETO AURIX
// ================================

console.log("AURIX carregada com sucesso!");

