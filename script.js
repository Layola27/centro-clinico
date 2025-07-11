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

                // --- Google Ads Conversion Tracking Placeholder ---
                // Replace 'AW-XXXXXXXXX/YYYYYYYYY' with your actual conversion ID and label
                // gtag('event', 'conversion', {'send_to': 'AW-XXXXXXXXX/YYYYYYYYY'});
                // --------------------------------------------------
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
        const map = L.map('map').setView([41.3745, 2.0805], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([41.3745, 2.0805]).addTo(map)
            .bindPopup('<b>BMEDIK</b><br>Carrer Josep Campreciós, 12-14')
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