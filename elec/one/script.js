// ===================================
// NAVIGATION
// ===================================

// Gestion du menu mobile
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Effet de scroll sur la navbar
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active link en fonction de la section visible
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// ANIMATIONS DES STATISTIQUES
// ===================================

// Animation des chiffres dans la section À propos
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Plus le nombre est bas, plus l'animation est rapide

    counters.forEach(counter => {
        const animate = () => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText;
            const increment = target / speed;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(animate, 1);
            } else {
                counter.innerText = target;
                // Ajouter le % pour les pourcentages
                if (target === 98) {
                    counter.innerText = target + '%';
                }
            }
        };

        animate();
    });
};

// Observer pour déclencher l'animation quand la section est visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const aproposSection = document.querySelector('.apropos');
if (aproposSection) {
    observer.observe(aproposSection);
}

// ===================================
// ANIMATIONS AU SCROLL
// ===================================

// Ajouter une classe pour animer les éléments au scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .realisation-card, .info-card');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialiser l'état des éléments
document.querySelectorAll('.service-card, .realisation-card, .info-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===================================
// FORMULAIRE DE CONTACT
// ===================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupération des valeurs du formulaire
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Validation basique
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }

    // Simulation d'envoi (dans un projet réel, on enverrait les données à un serveur)
    console.log('Données du formulaire:', formData);

    // Afficher le message de succès
    contactForm.style.display = 'none';
    formSuccess.style.display = 'flex';

    // Réinitialiser le formulaire après 5 secondes
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'flex';
        formSuccess.style.display = 'none';
    }, 5000);

    // Scroll vers le message de succès
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// ===================================
// SMOOTH SCROLL POUR LES LIENS D'ANCRAGE
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// EFFET PARALLAX LÉGER SUR LE HERO
// ===================================

const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;

    if (heroSection && scrollPosition < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ===================================
// ANIMATION DES CARTES AU SURVOL
// ===================================

// Effet 3D sur les cartes de service
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// LAZY LOADING DES IMAGES (si nécessaire)
// ===================================

// Observer pour les images lazy load
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===================================
// GESTION DU CHARGEMENT DE LA PAGE
// ===================================

window.addEventListener('load', () => {
    // Ajouter une classe au body pour indiquer que la page est chargée
    document.body.classList.add('loaded');

    // Déclencher les animations initiales
    animateOnScroll();

    console.log('Site ÉlectriPro chargé avec succès !');
});

// ===================================
// GESTION DES ERREURS
// ===================================

window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.error);
});

// ===================================
// FONCTIONNALITÉS SUPPLÉMENTAIRES
// ===================================

// Détection du navigateur pour optimisations
const isIE = /MSIE|Trident/.test(window.navigator.userAgent);
if (isIE) {
    document.body.classList.add('ie-browser');
    console.warn('Internet Explorer détecté. Certaines fonctionnalités peuvent être limitées.');
}

// Mode sombre (optionnel, peut être activé plus tard)
const enableDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
};

// Récupération de la préférence du mode sombre
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ===================================
// PERFORMANCE ET OPTIMISATION
// ===================================

// Debounce function pour optimiser les événements de scroll
const debounce = (func, wait = 20, immediate = true) => {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Appliquer le debounce aux fonctions de scroll
window.addEventListener('scroll', debounce(animateOnScroll));

// ===================================
// MESSAGES DE BIENVENUE
// ===================================

console.log('%c ⚡ ÉlectriPro - Site Web ', 'background: #2563eb; color: white; font-size: 20px; padding: 10px;');
console.log('%c Développé avec ❤️ et JavaScript moderne ', 'background: #f59e0b; color: white; font-size: 14px; padding: 5px;');
