
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. MENU MOBILE
    // =====================================

    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {
            const aberto = nav.classList.toggle("active");

            menuButton.setAttribute("aria-expanded", aberto);
            menuButton.setAttribute(
                "aria-label",
                aberto ? "Fechar menu" : "Abrir menu"
            );
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Abrir menu");
            });
        });

    }


    // =====================================
    // 2. EFEITO DO CABEÇALHO AO ROLAR
    // =====================================

    const header = document.querySelector(".header");

    function atualizarHeader() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.style.background = "rgba(5, 5, 5, 0.97)";
            header.style.boxShadow = "0 5px 30px rgba(0,0,0,0.4)";
        } else {
            header.style.background = "rgba(5, 5, 5, 0.85)";
            header.style.boxShadow = "none";
        }
    }

    window.addEventListener("scroll", atualizarHeader);
    atualizarHeader();


    // =====================================
    // 3. ANIMAÇÕES AO APARECER NA TELA
    // =====================================

    const elementos = document.querySelectorAll(
        ".service-card, .about-content, .about-visual, .section-header, .contact-form, .contact"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, observerAtual) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observerAtual.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.15
        });

        elementos.forEach(elemento => {
            elemento.classList.add("reveal");
            observer.observe(elemento);
        });

    } else {
        elementos.forEach(elemento => {
            elemento.classList.add("visible");
        });
    }


    // =====================================
    // 4. EFEITO 3D DO CARTÃO PRINCIPAL
    // =====================================

    const card = document.querySelector(".tech-card");

    if (card && window.matchMedia("(hover: hover)").matches) {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 15;
            const rotateY = (x - centerX) / 15;

            card.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateY(-12deg) rotateX(5deg)";
        });

    }


    // =====================================
    // 5. EFEITO NOS CARDS DE SERVIÇOS
    // =====================================

    document.querySelectorAll(".service-card").forEach(service => {

        service.addEventListener("mouseenter", () => {
            service.style.boxShadow =
                "0 20px 45px rgba(212,175,99,0.12)";
        });

        service.addEventListener("mouseleave", () => {
            service.style.boxShadow = "none";
        });

    });


    // =====================================
    // 6. FORMULÁRIO DE ORÇAMENTO
    // =====================================

    const formulario = document.querySelector("#orcamento");

    if (formulario) {

        formulario.addEventListener("submit", event => {

            event.preventDefault();

            const nome = document.querySelector("#nome").value.trim();
            const email = document.querySelector("#email").value.trim();
            const servico = document.querySelector("#servico").value;
            const mensagem = document.querySelector("#mensagem").value.trim();

            if (!nome || !email || !servico || !mensagem) {
                alert("Preencha todos os campos antes de continuar.");
                return;
            }

            const telefone = "5544984133529";

            const texto = `Olá! Vim pelo site da NEXORA DIGITAL.

Nome: ${nome}
E-mail: ${email}
Serviço: ${servico}

Descrição do projeto:
${mensagem}

Gostaria de solicitar um orçamento!`;

            const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

            window.open(url, "_blank", "noopener,noreferrer");

        });

    }


    // =====================================
    // 7. ANO AUTOMÁTICO NO RODAPÉ
    // =====================================

    document.querySelectorAll(".footer p").forEach(footerText => {

        footerText.textContent =
            `© ${new Date().getFullYear()} NEXORA DIGITAL. Todos os direitos reservados.`;

    });


    // =====================================
    // 8. INICIALIZAÇÃO
    // =====================================

    console.log("NEXORA DIGITAL inicializada com sucesso!");

});
