// ============================================
// Page Loader
// ============================================
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1500);
});

// ============================================
// Smooth Scrolling
// ============================================
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

// ============================================
// Navigation Scroll Effect
// ============================================
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ============================================
// Animated Shapes Follow Mouse
// ============================================
document.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.shape-element');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 15;
    const x = (mouseX - 0.5) * speed;
    const y = (mouseY - 0.5) * speed;
    
    shape.style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
  });
});

// ============================================
// Scroll Reveal Animation
// ============================================
const revealElements = () => {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealElements);
revealElements(); // Initial check

// ============================================
// Parallax Effect
// ============================================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero-visual');
  
  parallaxElements.forEach(element => {
    const speed = 0.3;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ============================================
// Form Validation & Submission
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (!name || !email || !message) {
      showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }
    
    if (!validateEmail(email)) {
      showNotification('Veuillez entrer une adresse email valide.', 'error');
      return;
    }
    
    // Simulate form submission
    showNotification(`Merci ${name} ! Votre message a été envoyé avec succès. Nous vous contacterons à ${email} dans les plus brefs délais.`, 'success');
    contactForm.reset();
  });
}

// Email validation helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 100px;
      right: 30px;
      background: ${type === 'success' ? 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)' : 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'};
      color: #0A0A0A;
      padding: 1.5rem 2rem;
      border-radius: 5px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      z-index: 10001;
      animation: slideInRight 0.5s ease-out;
      max-width: 400px;
      font-weight: 500;
      letter-spacing: 0.5px;
    ">
      ${message}
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.5s ease-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 5000);
}

// Add keyframes for notifications
const style = document.createElement('style');
style.textContent = `
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
document.head.appendChild(style);

// ============================================
// Car Card Tilt Effect
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.car-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

// ============================================
// Dynamic Shape Generation
// ============================================
function createFloatingShapes() {
  const canvas = document.querySelector('.shapes-canvas');
  if (!canvas) return;
  
  const colors = ['rgba(212, 175, 55, 0.05)', 'rgba(192, 192, 192, 0.03)'];
  const shapes = ['circle', 'square', 'triangle'];
  
  for (let i = 0; i < 5; i++) {
    const shape = document.createElement('div');
    shape.className = 'floating-particle';
    shape.style.cssText = `
      position: absolute;
      width: ${Math.random() * 100 + 50}px;
      height: ${Math.random() * 100 + 50}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: float ${Math.random() * 20 + 10}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
      opacity: 0.3;
    `;
    canvas.appendChild(shape);
  }
}

// ============================================
// Counter Animation
// ============================================
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.floor(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Activate counters on scroll
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        animateCounter(counter, target);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.features-section');
if (statsSection) {
  counterObserver.observe(statsSection);
}

// ============================================
// Image Lazy Loading with Fade In
// ============================================
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = '0';
      img.src = img.dataset.src;
      img.addEventListener('load', () => {
        img.style.transition = 'opacity 0.8s ease';
        img.style.opacity = '1';
      });
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// ============================================
// Custom Cursor (Optional - Premium Effect)
// ============================================
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #D4AF37;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.2s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);
  
  const cursorDot = document.createElement('div');
  cursorDot.style.cssText = `
    width: 4px;
    height: 4px;
    background: #D4AF37;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 10001;
  `;
  document.body.appendChild(cursorDot);
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });
  
  function animate() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    cursor.style.left = cursorX - 10 + 'px';
    cursor.style.top = cursorY - 10 + 'px';
    
    requestAnimationFrame(animate);
  }
  animate();
  
  // Scale cursor on hover
  document.querySelectorAll('a, button, .car-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
    });
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
    });
  });
}

// Uncomment to enable custom cursor
// if (window.innerWidth > 768) {
//   initCustomCursor();
// }

// ============================================
// Typing Effect for Headlines
// ============================================
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

// ============================================
// Car Filter (if needed for fleet page)
// ============================================
function filterCars(category) {
  const cards = document.querySelectorAll('.car-card');
  
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
      card.style.animation = 'fadeInUp 0.6s ease-out';
    } else {
      card.style.display = 'none';
    }
  });
}

// ============================================
// Initialize All Animations
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Add reveal class to elements
  document.querySelectorAll('.feature-card, .car-card, .contact-item').forEach(el => {
    el.classList.add('reveal');
  });
  
  // Initial reveal check
  setTimeout(revealElements, 100);
  
  console.log('🚗 Luxury Car Rental Website Loaded');
  console.log('✨ All animations initialized');
});

// ============================================
// Reservation Quick Form (Optional)
// ============================================
function quickReservation(carName) {
  const message = `Je souhaite réserver le véhicule: ${carName}`;
  const contactSection = document.querySelector('.contact-section');
  
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
      const messageField = document.getElementById('message');
      if (messageField) {
        messageField.value = message;
        messageField.focus();
      }
    }, 800);
  }
}

// ============================================
// Performance Optimization
// ============================================
// Debounce function for scroll events
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

// Apply debounce to scroll-heavy functions
const debouncedReveal = debounce(revealElements, 50);
window.removeEventListener('scroll', revealElements);
window.addEventListener('scroll', debouncedReveal);

// ============================================
// Galerie photo index
// ============================================

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider img');

let index = 0;
const interval = 4000; // 4 secondes

function slideNext() {
  index++;
  if (index >= slides.length) {
    index = 0;
  }
  slider.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(slideNext, interval);





function animateCounter(element, target) {
  let start = 0;
  const duration = 2000; // durée en ms
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const value = Math.floor(progress * target);
    element.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target; // valeur finale exacte
    }
  }

  requestAnimationFrame(update);
}

