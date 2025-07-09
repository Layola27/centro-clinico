document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Form submission simulation
            console.log('Nombre:', name);
            console.log('Email:', email);
            console.log('Mensaje:', message);

            alert('Gràcies pel teu missatge. Ens posarem en contacte amb tu aviat.');
            contactForm.reset();
        });
    }

    // Leaflet Map Initialization
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = L.map('map').setView([41.3800, 2.0720], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([41.3800, 2.0720]).addTo(map)
            .bindPopup('<b>Bmedik</b><br>Carrer de Carolina Catasús i Bosch, 7')
            .openPopup();
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('header nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
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

    // Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.classList.add('back-to-top');
    backToTopButton.innerHTML = '&#9650;'; // Up arrow
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});