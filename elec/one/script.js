// ============================================
// CONFIGURATION ET VARIABLES GLOBALES
// ============================================

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================
function initializeApp() {
    initNavigation();
    initScrollEffects();
    initContactForm();
    initAnimations();
}

// ============================================
// GESTION DE LA NAVIGATION
// ============================================
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    // Toggle menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animation du bouton burger
            this.classList.toggle('active');
        });
    }

    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        });
    });

    // Smooth scroll pour les liens d'ancrage
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Vérifier si c'est un lien d'ancrage
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Effet sticky sur le header au scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });

    // Highlight du lien actif dans la navigation
    highlightActiveSection();
}

// ============================================
// HIGHLIGHT SECTION ACTIVE
// ============================================
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// EFFETS DE SCROLL
// ============================================
function initScrollEffects() {
    // Bouton retour en haut
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animation des éléments au scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer tous les éléments à animer
    const animatedElements = document.querySelectorAll(
        '.service-card, .avantage-card, .realisation-card, .testimonial-card'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ============================================
// GESTION DU FORMULAIRE DE CONTACT
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validation des champs
            if (validateForm(this)) {
                // Simulation d'envoi (à remplacer par un vrai traitement)
                submitForm(this);
            }
        });
    }
}

// ============================================
// VALIDATION DU FORMULAIRE
// ============================================
function validateForm(form) {
    const nom = form.querySelector('#nom').value.trim();
    const prenom = form.querySelector('#prenom').value.trim();
    const email = form.querySelector('#email').value.trim();
    const telephone = form.querySelector('#telephone').value.trim();
    const message = form.querySelector('#message').value.trim();
    const rgpd = form.querySelector('#rgpd').checked;

    // Vérification des champs requis
    if (!nom || !prenom || !email || !telephone || !message) {
        showFormMessage('Veuillez remplir tous les champs obligatoires.', 'error');
        return false;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Veuillez entrer une adresse email valide.', 'error');
        return false;
    }

    // Validation du téléphone (format français basique)
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!phoneRegex.test(telephone)) {
        showFormMessage('Veuillez entrer un numéro de téléphone valide.', 'error');
        return false;
    }

    // Vérification RGPD
    if (!rgpd) {
        showFormMessage('Veuillez accepter la politique de confidentialité.', 'error');
        return false;
    }

    return true;
}

// ============================================
// SOUMISSION DU FORMULAIRE
// ============================================
function submitForm(form) {
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;

    // Désactiver le bouton et afficher un loader
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

    // Récupération des données du formulaire
    const formData = {
        nom: form.querySelector('#nom').value,
        prenom: form.querySelector('#prenom').value,
        email: form.querySelector('#email').value,
        telephone: form.querySelector('#telephone').value,
        service: form.querySelector('#service').value,
        message: form.querySelector('#message').value
    };

    // Simulation d'envoi avec délai (à remplacer par un vrai appel API)
    setTimeout(function() {
        // Simuler un succès
        console.log('Données du formulaire:', formData);

        // Afficher le message de succès
        showFormMessage(
            'Merci pour votre message ! Je vous recontacterai dans les plus brefs délais.',
            'success'
        );

        // Réinitialiser le formulaire
        form.reset();

        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Masquer le message après 5 secondes
        setTimeout(function() {
            hideFormMessage();
        }, 5000);

    }, 2000);

    /* EXEMPLE D'INTÉGRATION AVEC UN SERVICE EMAIL (FormSubmit, EmailJS, etc.)
     *
     / / Avec FormSubmit.co (gratuit)                                       *
     fetch('https://formsubmit.co/ajax/votre-email@example.com', {
     method: 'POST',
     headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json'
},
body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
showFormMessage('Merci ! Votre message a été envoyé avec succès.', 'success');
form.reset();
})
.catch(error => {
showFormMessage('Une erreur est survenue. Veuillez réessayer.', 'error');
})
.finally(() => {
submitBtn.disabled = false;
submitBtn.innerHTML = originalText;
});
*/
}

// ============================================
// AFFICHAGE DES MESSAGES DU FORMULAIRE
// ============================================
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');

    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';

        // Scroll vers le message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function hideFormMessage() {
    const formMessage = document.getElementById('formMessage');

    if (formMessage) {
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
    }
}

// ============================================
// ANIMATIONS ET EFFETS VISUELS
// ============================================
function initAnimations() {
    // Animation du compteur d'expérience
    animateCounter();

    // Effet parallax sur le hero (optionnel)
    initParallax();
}

// ============================================
// ANIMATION DU COMPTEUR
// ============================================
function animateCounter() {
    const experienceBadge = document.querySelector('.experience-badge .years');

    if (experienceBadge) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetNumber = 15;
                    let currentNumber = 0;
                    const duration = 2000; // 2 secondes
                    const increment = targetNumber / (duration / 16); // 60 FPS

                    const counter = setInterval(function() {
                        currentNumber += increment;

                        if (currentNumber >= targetNumber) {
                            experienceBadge.textContent = targetNumber + '+';
                            clearInterval(counter);
                        } else {
                            experienceBadge.textContent = Math.floor(currentNumber) + '+';
                        }
                    }, 16);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(experienceBadge);
    }
}

// ============================================
// EFFET PARALLAX (OPTIONNEL)
// ============================================
function initParallax() {
    const hero = document.querySelector('.hero');

    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;

            // Appliquer l'effet parallax
            hero.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
        });
    }
}

// ============================================
// GESTION DES CLICS SUR LES RÉALISATIONS
// ============================================
document.querySelectorAll('.realisation-card').forEach(card => {
    card.addEventListener('click', function() {
        // Possibilité d'ajouter une lightbox ou modal ici
        console.log('Réalisation cliquée');
        // Exemple: ouvrir une modal avec plus d'informations
    });
});

// ============================================
// UTILITAIRES
// ============================================

// Fonction pour détecter si un élément est visible dans le viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Fonction de debounce pour optimiser les événements scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// CONSOLE LOG DE BIENVENUE
// ============================================
console.log('%c ElectroMax - Site Web ', 'background: #FF6B35; color: white; font-size: 16px; padding: 10px;');
console.log('Site développé avec ❤️ pour ElectroMax');
console.log('Pour toute demande de renseignement: contact@electromax.fr');
