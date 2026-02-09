// ========================================
// NAVIGATION AU SCROLL
// ========================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 100) {
        navbar.style.padding = '20px 0';
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.padding = '30px 0';
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }
});

// ========================================
// SMOOTH SCROLL POUR LES LIENS DE NAVIGATION
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// ANIMATION DES CARTES AU SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de voitures
document.addEventListener('DOMContentLoaded', function() {
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observer les cartes de services
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// ========================================
// PARALLAX POUR LES FORMES ANIMÉES
// ========================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// BOUTONS DE RÉSERVATION
// ========================================
document.querySelectorAll('.btn-reserve').forEach(button => {
    button.addEventListener('click', function() {
        const carName = this.closest('.car-card').querySelector('.car-name').textContent;

        // Scroller vers le formulaire
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });

        // Remplir le select avec la voiture choisie
        setTimeout(() => {
            const select = document.querySelector('.contact-form select');
            const options = Array.from(select.options);
            const matchingOption = options.find(option =>
            option.textContent.includes(carName.split(' ')[0])
            );

            if (matchingOption) {
                select.value = matchingOption.value;
                select.style.borderColor = 'var(--primary-color)';
                setTimeout(() => {
                    select.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }, 1000);
            }
        }, 800);
    });
});

// ========================================
// BOUTONS HERO
// ========================================
document.querySelector('.hero-buttons .btn-primary').addEventListener('click', function() {
    document.querySelector('#collection').scrollIntoView({
        behavior: 'smooth'
    });
});

document.querySelector('.hero-buttons .btn-secondary').addEventListener('click', function() {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

document.querySelector('.navbar .btn-primary').addEventListener('click', function() {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

// ========================================
// GESTION DU FORMULAIRE
// ========================================
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    // Animation du bouton
    button.textContent = 'Envoi en cours...';
    button.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    button.disabled = true;

    // Simuler l'envoi (à remplacer par une vraie requête)
    setTimeout(() => {
        button.textContent = '✓ Message Envoyé !';
        button.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';

        // Réinitialiser le formulaire
        setTimeout(() => {
            this.reset();
            button.textContent = originalText;
            button.style.background = 'var(--gradient-luxury)';
            button.disabled = false;
        }, 2000);
    }, 1500);
});

// ========================================
// EFFET HOVER SUR LES CARTES DE VOITURES
// ========================================
document.querySelectorAll('.car-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.car-icon');
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.4s ease';
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.car-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ========================================
// CURSEUR PERSONNALISÉ (OPTIONNEL)
// ========================================
const cursor = document.createElement('div');
cursor.style.cssText = `
width: 10px;
height: 10px;
background: var(--primary-color);
border-radius: 50%;
position: fixed;
pointer-events: none;
z-index: 10000;
mix-blend-mode: difference;
transition: transform 0.2s ease;
display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', function(e) {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX - 5 + 'px';
    cursor.style.top = e.clientY - 5 + 'px';
});

// Agrandir le curseur sur les éléments interactifs
document.querySelectorAll('a, button, .car-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
        cursor.style.transform = 'scale(3)';
    });

    element.addEventListener('mouseleave', function() {
        cursor.style.transform = 'scale(1)';
    });
});

// ========================================
// COMPTEUR ANIMÉ (NOMBRE DE VOITURES)
// ========================================
function animateCounter(element, target, duration) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Vous pouvez ajouter un compteur dans le HTML et l'animer ici
// Exemple: animateCounter(document.querySelector('.counter'), 50, 2000);

// ========================================
// EFFET DE TYPING POUR LE TITRE (OPTIONNEL)
// ========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ========================================
// PRÉCHARGEMENT DES IMAGES
// ========================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ========================================
// DÉTECTION DU MODE MOBILE
// ========================================
function isMobile() {
    return window.innerWidth <= 768;
}

// Désactiver certaines animations sur mobile pour les performances
if (isMobile()) {
    document.querySelectorAll('.shape').forEach(shape => {
        shape.style.animation = 'none';
    });
}

// ========================================
// LOG DE BIENVENUE DANS LA CONSOLE
// ========================================
console.log('%c🏎️ LuxeDrive - L\'Excellence en Mouvement',
            'font-size: 20px; font-weight: bold; color: #c9a961; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%cSite développé avec passion pour l\'excellence automobile',
            'font-size: 12px; color: #888;');
