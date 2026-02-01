// ===================================
// NAVIGATION MENU TOGGLE
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');

    // Menu mobile toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// ===================================
// STATS COUNTER ANIMATION
// ===================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
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

// Intersection Observer for stats
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// AOS (Animate On Scroll) SIMPLE IMPLEMENTATION
// ===================================
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-aos-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('aos-animate');
            }, delay);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

aosElements.forEach(element => {
    aosObserver.observe(element);
});

// ===================================
// FAVORITE BUTTON FUNCTIONALITY
// ===================================
document.addEventListener('click', function(e) {
    if (e.target.closest('.favorite-btn')) {
        const btn = e.target.closest('.favorite-btn');
        btn.classList.toggle('active');

        // Add a simple animation
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
    }
});

// ===================================
// CONTACT FORM SUBMISSION
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Show loading state
        const submitBtn = this.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            const formMessage = document.getElementById('formMessage');
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.';

            // Reset form
            contactForm.reset();

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// PROPERTY CARD HOVER EFFECTS
// ===================================
document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ===================================
// FILTER FUNCTIONALITY (Basic)
// ===================================
const filterButton = document.querySelector('.filter-button');
if (filterButton) {
    filterButton.addEventListener('click', function() {
        const propertyType = document.getElementById('propertyType').value;
        const location = document.getElementById('location').value;
        const priceRange = document.getElementById('priceRange').value;

        // Show loading state
        this.textContent = 'Recherche...';
        this.disabled = true;

        // Simulate filter (replace with actual filtering logic)
        setTimeout(() => {
            console.log('Filtering properties:', {
                type: propertyType,
                location: location,
                price: priceRange
            });

            // Reset button
            this.textContent = 'Rechercher';
            this.disabled = false;

            // Scroll to results
            const propertiesListing = document.querySelector('.properties-listing');
            if (propertiesListing) {
                propertiesListing.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 800);
    });
}

// ===================================
// PAGINATION FUNCTIONALITY
// ===================================
document.querySelectorAll('.pagination-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent === 'Suivant' || this.textContent === 'Précédent') {
            // Handle next/previous
            const currentActive = document.querySelector('.pagination-btn.active');
            if (currentActive) {
                currentActive.classList.remove('active');
                if (this.textContent === 'Suivant') {
                    const next = currentActive.nextElementSibling;
                    if (next && !next.textContent.includes('Suivant')) {
                        next.classList.add('active');
                    }
                } else {
                    const prev = currentActive.previousElementSibling;
                    if (prev && !prev.textContent.includes('Précédent')) {
                        prev.classList.add('active');
                    }
                }
            }
        } else {
            // Handle direct page number
            document.querySelectorAll('.pagination-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
        }

        // Scroll to top of properties
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ===================================
// PROPERTY DETAILS BUTTON
// ===================================
document.querySelectorAll('.property-cta').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.property-card');
        const title = card.querySelector('.property-title').textContent;

        // Simulate navigation to property detail
        console.log('Opening details for:', title);

        // Add animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        // In a real application, you would navigate to a detail page
        alert(`Détails de: ${title}\n\nCette fonctionnalité ouvrirait la page de détails du bien.`);
    });
});

// ===================================
// SCROLL TO TOP BUTTON (Optional)
// ===================================
function createScrollToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'scroll-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--secondary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 999;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-5px)';
        btn.style.boxShadow = '0 6px 24px rgba(0,0,0,0.3)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
    });
}

// Initialize scroll to top button
createScrollToTop();

// ===================================
// IMAGE LAZY LOADING (for future images)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// FORM VALIDATION
// ===================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return re.test(phone);
}

// Add real-time validation to form inputs
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '';
        }
    });
}

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '';
        }
    });
}

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c🏠 Prestige Immobilier', 'font-size: 24px; color: #c5a572; font-weight: bold;');
console.log('%cSite développé avec passion', 'font-size: 14px; color: #6c757d;');

// ===================================
// PERFORMANCE MONITORING (Optional)
// ===================================
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.now();
    console.log(`✅ Page chargée en ${Math.round(loadTime)}ms`);
});
