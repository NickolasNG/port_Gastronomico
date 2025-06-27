document.addEventListener('DOMContentLoaded', () => {

    // 1. Inicialização do Swiper.js para o Carrossel
    const swiper = new Swiper('.signature-swiper', {
        // Opções
        loop: true,
        grabCursor: true,
        slidesPerView: 1,
        spaceBetween: 30,
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // 2. Animação de Contadores na seção "About"
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 200; // Controla a velocidade da animação

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.innerText = Math.ceil(current).toLocaleString('pt-BR') + "+";
                requestAnimationFrame(updateCounter);
            } else {
                element.innerText = target.toLocaleString('pt-BR') + "+";
            }
        };
        updateCounter();
    }

    // 3. Intersection Observer para disparar a animação quando visível
    const statsSection = document.querySelector('.stats-cards');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = statsSection.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    animateCounter(counter, target);
                });
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.5 }); // Dispara quando 50% do elemento está na tela

    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // 4. Rolagem suave para links da navbar
    document.querySelectorAll('#navbar a, .cta-button, .logo').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Considera a altura do header fixo
                const headerOffset = document.getElementById('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});