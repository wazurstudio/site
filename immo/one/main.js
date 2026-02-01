// ==========================================
// DONNÉES DES PROPRIÉTÉS
// ==========================================

const properties = [
    {
        id: 1,
        price: '2 500 000 €',
        title: 'Villa Contemporaine Vue Mer',
        location: 'Cannes, Côte d\'Azur',
        bedrooms: 5,
        bathrooms: 4,
        area: 450,
        badge: 'Exclusivité'
    },
    {
        id: 2,
        price: '1 850 000 €',
        title: 'Appartement Haussmannien',
        location: 'Paris 16ème',
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        badge: 'Nouveauté'
    },
    {
        id: 3,
        price: '3 200 000 €',
        title: 'Mas Provençal Rénové',
        location: 'Saint-Rémy-de-Provence',
        bedrooms: 6,
        bathrooms: 5,
        area: 600,
        badge: 'Coup de cœur'
    },
    {
        id: 4,
        price: '1 450 000 €',
        title: 'Penthouse Design',
        location: 'Lyon, Presqu\'île',
        bedrooms: 3,
        bathrooms: 2,
        area: 220,
        badge: 'Exclusivité'
    },
    {
        id: 5,
        price: '4 800 000 €',
        title: 'Château du XIXème',
        location: 'Bordeaux, Médoc',
        bedrooms: 8,
        bathrooms: 6,
        area: 850,
        badge: 'Prestigieux'
    },
    {
        id: 6,
        price: '2 100 000 €',
        title: 'Loft Industriel',
        location: 'Paris 11ème',
        bedrooms: 3,
        bathrooms: 2,
        area: 300,
        badge: 'Nouveauté'
    }
];

// ==========================================
// NAVIGATION
// ==========================================

// Gestion du menu burger mobile
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Gestion du scroll pour la navbar
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// Mise en surbrillance du lien actif en fonction du scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ==========================================
// PROPRIÉTÉS - GÉNÉRATION DYNAMIQUE
// ==========================================

function createPropertyCard(property) {
    return `
        <div class="property-card">
            <div class="property-image">
                <span class="property-badge">${property.badge}</span>
            </div>
            <div class="property-info">
                <div class="property-price">${property.price}</div>
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">📍 ${property.location}</p>
                <div class="property-features">
                    <span class="property-feature">🛏️ ${property.bedrooms} chambres</span>
                    <span class="property-feature">🚿 ${property.bathrooms} SDB</span>
                    <span class="property-feature">📐 ${property.area} m²</span>
                </div>
            </div>
        </div>
    `;
}

function loadProperties() {
    const propertiesGrid = document.getElementById('propertiesGrid');
    if (propertiesGrid) {
        propertiesGrid.innerHTML = properties.map(property => createPropertyCard(property)).join('');
    }
}

// Charger les propriétés au chargement de la page
document.addEventListener('DOMContentLoaded', loadProperties);

// ==========================================
// STATISTIQUES ANIMÉES
// ==========================================

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 secondes
                const increment = target / (duration / 16); // 60 FPS
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

document.addEventListener('DOMContentLoaded', animateStats);

// ==========================================
// FORMULAIRE DE CONTACT
// ==========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupération des données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Simulation d'envoi
        console.log('Données du formulaire:', formData);

        // Animation de succès
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = '✓ Message envoyé !';
        submitButton.style.backgroundColor = '#4CAF50';

        // Réinitialiser le formulaire
        setTimeout(() => {
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';

            // Afficher un message de confirmation
            showNotification('Merci ! Nous vous répondrons dans les plus brefs délais.');
        }, 2000);
    });
}

// ==========================================
// NOTIFICATIONS
// ==========================================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #1a1a1a;
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 0;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        border-left: 4px solid #b8945f;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.938rem;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Animations CSS pour les notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ==========================================
// SMOOTH SCROLL POUR LES ANCRES
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ANIMATIONS AU SCROLL
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec animation
    const animatedElements = document.querySelectorAll('.property-card, .service-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ==========================================
// PARALLAX EFFET SUR LE HERO
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// ==========================================
// PRÉCHARGEMENT DES IMAGES
// ==========================================

function preloadImages() {
    // Simuler le préchargement d'images
    const images = document.querySelectorAll('.property-image, .about-image');

    images.forEach((img, index) => {
        setTimeout(() => {
            img.classList.add('loaded');
        }, index * 100);
    });
}

document.addEventListener('DOMContentLoaded', preloadImages);

// ==========================================
// GESTION DU HOVER SUR LES CARTES PROPRIÉTÉS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const propertyCards = document.querySelectorAll('.property-card');

    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ==========================================
// CURSEUR PERSONNALISÉ (OPTIONNEL)
// ==========================================

function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #b8945f;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Agrandir le curseur sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .property-card, .service-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Activer le curseur personnalisé sur desktop uniquement
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', initCustomCursor);
}

// ==========================================
// PERFORMANCES - LAZY LOADING
// ==========================================

// Observer pour le lazy loading des sections
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            lazyLoadObserver.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '50px'
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        lazyLoadObserver.observe(section);
    });
});

// ==========================================
// CONSOLE LOG - EASTER EGG
// ==========================================

console.log('%c🏠 Prestige Immobilier', 'color: #b8945f; font-size: 24px; font-weight: bold;');
console.log('%cSite développé avec passion', 'color: #666; font-size: 14px;');
console.log('%cVous êtes curieux ? Nous aussi ! Contactez-nous pour en savoir plus.', 'color: #1a1a1a; font-size: 12px;');
