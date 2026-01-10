// ============================================
// NAVIGATION MOBILE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu lors du clic sur un lien
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fermer le menu lors du clic en dehors
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ============================================
// SCROLL ANIMATIONS - NAVBAR
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Ajout d'ombre au scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ============================================
// ANIMATION DES STATISTIQUES (COMPTEURS)
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 secondes
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Observer pour détecter quand les stats entrent dans le viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateCounter(entry.target);
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observer tous les éléments stat-number
document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// ANIMATION AOS (Animate On Scroll)
// ============================================
const aosObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('[data-aos]').forEach(element => {
    aosObserver.observe(element);
});

// ============================================
// SMOOTH SCROLL POUR LES ANCRES
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Ignorer les liens qui sont juste "#"
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // 80px pour la navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// TOGGLE FAQ
// ============================================
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const allItems = document.querySelectorAll('.faq-item');

    // Fermer tous les autres items
    allItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });

    // Toggle l'item cliqué
    faqItem.classList.toggle('active');
}

// ============================================
// LAZY LOADING DES IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// DÉTECTION DU SCROLL POUR ANIMATIONS
// ============================================
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// VALIDATION BASIQUE DES FORMULAIRES
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9\s\-\+\(\)]{10,}$/;
    return re.test(phone);
}

// ============================================
// GESTION DES ERREURS CONSOLE EN PRODUCTION
// ============================================
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    console.log = function() {};
    console.warn = function() {};
}

// ============================================
// LOG DE DÉMARRAGE
// ============================================
console.log('%c⚡ ÉlectroLux Pro - Site chargé avec succès!', 'color: #FFD700; font-size: 16px; font-weight: bold;');
