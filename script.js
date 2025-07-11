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

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            logoImg.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            logoImg.classList.remove('scrolled');
        }
    });

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