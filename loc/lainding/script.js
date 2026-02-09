// ==========================================
// MOBILE MENU
// ==========================================
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
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

// ==========================================
// SMOOTH SCROLL
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
// STATS COUNTER ANIMATION
// ==========================================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };

                updateCounter();
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==========================================
// CAR CARDS ANIMATION
// ==========================================
const carCards = document.querySelectorAll('.car-card');

carCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';

    setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
});

// Car card hover effect - parallax
carCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Reserve buttons
const reserveButtons = document.querySelectorAll('.btn-reserve');

reserveButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();

        // Animation du bouton
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);

        // Get car name
        const carCard = btn.closest('.car-card');
        const carName = carCard.querySelector('.car-name').textContent;

        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });

        // Pre-fill the vehicle select
        setTimeout(() => {
            const vehicleSelect = document.getElementById('vehicle');
            const options = vehicleSelect.options;

            for (let i = 0; i < options.length; i++) {
                if (options[i].text === carName) {
                    vehicleSelect.selectedIndex = i;
                    vehicleSelect.dispatchEvent(new Event('change'));
                    break;
                }
            }
        }, 1000);
    });
});

// ==========================================
// SERVICE CARDS ANIMATION
// ==========================================
const serviceCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            serviceCardsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    serviceCardsObserver.observe(card);
});

// ==========================================
// TESTIMONIALS SLIDER
// ==========================================
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        if (i === index) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Auto-rotate testimonials
let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Dot click handlers
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);

        // Reset interval
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    });
});

// ==========================================
// CONTACT FORM
// ==========================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
                                 email: document.getElementById('email').value,
                                 phone: document.getElementById('phone').value,
                                 vehicle: document.getElementById('vehicle').value,
                                 message: document.getElementById('message').value
        };

        // Simulate form submission
        const submitButton = contactForm.querySelector('.btn-primary');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = 'Envoi en cours...';
        submitButton.disabled = true;

        setTimeout(() => {
            submitButton.innerHTML = '✓ Message envoyé !';
            submitButton.style.background = '#4CAF50';

            // Reset form
            contactForm.reset();

            // Show success message
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;

                alert('Merci pour votre demande ! Notre équipe vous contactera sous 24h.');
            }, 2000);
        }, 1500);

        console.log('Form submitted:', formData);
    });
}

// Form input animations
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, select, textarea');

    if (input) {
        input.addEventListener('focus', () => {
            group.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', () => {
            group.style.transform = 'translateY(0)';
        });
    }
});

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            scrollRevealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add scroll-reveal class to sections
const revealSections = document.querySelectorAll('.collection, .services, .experience, .testimonials, .contact');
revealSections.forEach(section => {
    section.classList.add('scroll-reveal');
    scrollRevealObserver.observe(section);
});

// ==========================================
// PARALLAX EFFECT FOR HERO SHAPES
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translate(${shape.style.left}, ${yPos}px)`;
    });
});

// ==========================================
// CURSOR EFFECT FOR CAR CARDS
// ==========================================
const cursor = document.createElement('div');
cursor.style.cssText = `
position: fixed;
width: 20px;
height: 20px;
border: 2px solid var(--color-primary);
border-radius: 50%;
pointer-events: none;
transition: all 0.2s ease;
z-index: 9999;
opacity: 0;
`;
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Show cursor on car cards
carCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursor.style.transform = 'scale(1.5)';
    });

    card.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursor.style.transform = 'scale(1)';
    });
});

// ==========================================
// LOADING ANIMATION
// ==========================================
window.addEventListener('load', () => {
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        document.body.style.overflow = '';

        // Trigger hero animations
        const heroElements = document.querySelectorAll('.fade-in, .slide-up');
        heroElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }, 100);
});

// ==========================================
// INTERSECTION OBSERVER FOR EXPERIENCE SECTION
// ==========================================
const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const features = entry.target.querySelectorAll('.feature-item');
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.opacity = '1';
                    feature.style.transform = 'translateX(0)';
                }, index * 200);
            });
            experienceObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const experienceSection = document.querySelector('.experience');
if (experienceSection) {
    const features = experienceSection.querySelectorAll('.feature-item');
    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-30px)';
        feature.style.transition = 'all 0.6s ease';
    });
    experienceObserver.observe(experienceSection);
}

// ==========================================
// ADD FLOATING ANIMATION TO SERVICE ICONS
// ==========================================
const serviceIcons = document.querySelectorAll('.service-icon');

serviceIcons.forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out infinite`;
    icon.style.animationDelay = `${index * 0.2}s`;
});

// ==========================================
// PRICE HIGHLIGHT ON HOVER
// ==========================================
carCards.forEach(card => {
    const price = card.querySelector('.price-amount');

    card.addEventListener('mouseenter', () => {
        if (price) {
            price.style.transform = 'scale(1.1)';
            price.style.color = 'var(--color-primary)';
        }
    });

    card.addEventListener('mouseleave', () => {
        if (price) {
            price.style.transform = 'scale(1)';
            price.style.color = 'var(--color-secondary)';
        }
    });
});

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
position: fixed;
top: 0;
left: 0;
height: 3px;
background: linear-gradient(90deg, var(--color-primary), var(--color-primary-dark));
z-index: 10000;
transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c🚗 Prestige Auto ', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cL\'excellence en mouvement depuis 2010', 'color: #666; font-size: 14px;');
console.log('%cPowered by Claude AI', 'color: #999; font-size: 12px; font-style: italic;');
