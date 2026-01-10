// ==========================================
// SMOOTH SCROLLING
// ==========================================

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

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ==========================================
// ANIMATED COUNTER FOR STATS
// ==========================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 24 ? '' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 24 ? '' : '+');
        }
    }, 16);
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ==========================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(card);
});

// Observe expertise items
document.querySelectorAll('.expertise-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(item);
});

// ==========================================
// FORM HANDLING
// ==========================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success message
            submitBtn.textContent = '✓ Message envoyé !';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)';

            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);

            console.log('Form data:', data);
        }, 1500);
    });

    // Input validation and styling
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = 'var(--primary-color)';
            } else if (this.hasAttribute('required')) {
                this.style.borderColor = 'var(--accent-color)';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
    });
}

// ==========================================
// BURGER MENU
// ==========================================

const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

if (burgerMenu) {
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('active');

        // Animate burger menu
        const spans = burgerMenu.querySelectorAll('span');
        if (burgerMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
            const spans = burgerMenu.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
}

// Mobile menu styles (added dynamically)
if (window.innerWidth <= 968) {
    const style = document.createElement('style');
    style.textContent = `
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 14, 39, 0.98);
            backdrop-filter: blur(20px);
            padding: 2rem;
            gap: 1.5rem;
            border-bottom: 1px solid rgba(0, 217, 255, 0.2);
            animation: slideDown 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// PARALLAX EFFECT ON SCROLL
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==========================================
// SERVICE CARD HOVER EFFECTS
// ==========================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '5px';
        ripple.style.height = '5px';
        ripple.style.background = 'rgba(0, 217, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 1s ease-out';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 1000);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==========================================
// CURSOR TRAIL EFFECT (OPTIONAL)
// ==========================================

let isDesktop = window.innerWidth > 968;

if (isDesktop) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, rgba(0, 217, 255, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Scale cursor on clickable elements
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// ==========================================
// LOADING ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c⚡ ElectroPlus - Votre électricien de confiance',
    'font-size: 20px; font-weight: bold; color: #00d9ff; text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);');
console.log('%cSite web développé avec soin et passion',
    'font-size: 14px; color: #8892b0;');
