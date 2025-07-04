document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector('.main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Canvi de la barra de navegació en fer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll suau
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Ressaltat de l'enllaç actiu
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: "-20% 0px -80% 0px" });

    sections.forEach(section => {
        observer.observe(section);
    });

});
