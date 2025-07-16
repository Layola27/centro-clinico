document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formConfirmation = document.getElementById('form-confirmation');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(contactForm);

            fetch('send_email.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(text => {
                formConfirmation.innerHTML = `<p>${text}</p>`;
                contactForm.style.display = 'none';
                formConfirmation.style.display = 'block';

                // Optional: Reset the form after a delay
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formConfirmation.style.display = 'none';
                }, 5000); // 5 seconds

                
            })
            .catch(error => {
                console.error('Error:', error);
                formConfirmation.innerHTML = `<p>Oops! Algo salió mal. No se pudo enviar tu mensaje.</p>`;
                contactForm.style.display = 'none';
                formConfirmation.style.display = 'block';
            });
        });
    }

    // Leaflet Map Initialization
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = L.map('map').setView([41.376919, 2.085957], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([41.376919, 2.085957]).addTo(map)
            .bindPopup('<b>BMEDIK</b><br>Carrer Josep Campreciós, 12-14')
            .openPopup();
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('header a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            let target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking a link
            const navMobile = document.querySelector('.nav-links-mobile');
            if (navMobile.classList.contains('active')) {
                navMobile.classList.remove('active');
                hamburger.classList.remove('active'); // Optional: for hamburger animation
            }
        });
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMobile = document.querySelector('.nav-links-mobile');

    if (hamburger && navMobile) {
        hamburger.addEventListener('click', () => {
            navMobile.classList.toggle('active');
            hamburger.classList.toggle('active'); // Optional: for hamburger animation
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    const logoImg = document.querySelector('.logo img');
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        // Header effects
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (logoImg) {
                logoImg.classList.add('scrolled');
            }
        } else {
            header.classList.remove('scrolled');
            if (logoImg) {
                logoImg.classList.remove('scrolled');
            }
        }

        // Back to top button visibility
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }
    });

    // Back to Top Button Click
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Fade-in sections on scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
