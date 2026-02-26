// ============================================
// Page Loader
// ============================================
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1500);
  }
});

// ============================================
// Hamburger Menu Toggle
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Fermer le menu quand on clique sur un lien (mobile)
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Fermer le menu si on clique en dehors (optionnel mais utile)
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// ============================================
// Smooth Scrolling pour les ancres internes
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// Navigation Scroll Effect (fond plus opaque au scroll)
// ============================================
let lastScroll = 0;
const nav = document.querySelector('nav');

if (nav) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

// ============================================
// Animated Shapes Follow Mouse (désactivé sur mobile pour perf)
// ============================================
if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape-element');
    if (shapes.length === 0) return;

    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 15;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;

      shape.style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
    });
  });
}

// ============================================
// Scroll Reveal Animation
// ============================================
const revealElements = () => {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 120; // déclenchement un peu plus tôt

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealElements);
window.addEventListener('resize', revealElements);
revealElements(); // Vérification initiale

// Débouncing pour éviter trop d'appels lors du scroll rapide
const debouncedReveal = () => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(revealElements, 50);
  };
};
window.addEventListener('scroll', debouncedReveal());

// ============================================
// Parallax Effect sur hero-visual (désactivé sur mobile)
// ============================================
if (window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual');

    parallaxElements.forEach(element => {
      const speed = 0.25; // plus doux
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// ============================================
// Galerie photo (slider) – index.html
// ============================================
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider img');

if (slider && slides.length > 0) {
  let index = 0;
  const intervalTime = 4500; // 4.5 secondes

  function slideNext() {
    index = (index + 1) % slides.length;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  let autoSlide = setInterval(slideNext, intervalTime);

  // Pause au survol (optionnel mais améliore l'UX)
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
  });

  slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(slideNext, intervalTime);
  });
}

// ============================================
// Form Validation & Submission (page contact)
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
      showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showNotification('Veuillez entrer une adresse email valide.', 'error');
      return;
    }

    // Simulation d'envoi
    showNotification(
      `Merci ${name} ! Votre message a été envoyé. Nous vous répondrons rapidement.`,
      'success'
    );

    contactForm.reset();
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Style minimal (à compléter dans le CSS si besoin)
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '16px 24px',
    backgroundColor: type === 'success' ? 'rgba(40, 167, 69, 0.9)' : 'rgba(220, 53, 69, 0.9)',
                color: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                zIndex: '9999',
                maxWidth: '380px',
                opacity: '0',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                transform: 'translateY(20px)'
  });

  // Apparition
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  }, 100);

  // Disparition
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    setTimeout(() => notification.remove(), 500);
  }, 5000);
}

// ============================================
// Initialisation générale
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Ajout automatique de la classe reveal aux éléments concernés
  document.querySelectorAll('.feature-card, .car-card, .contact-item, .section-header').forEach(el => {
    el.classList.add('reveal');
  });

  // Premier check reveal
  setTimeout(revealElements, 300);

  console.log('Site premium chargé – animations et menu mobile activés');
});
