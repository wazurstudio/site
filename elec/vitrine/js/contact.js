// ============================================
// GESTION DU FORMULAIRE DE CONTACT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);

        // Validation en temps réel
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
});

// ============================================
// SOUMISSION DU FORMULAIRE
// ============================================
function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formMessage = document.getElementById('formMessage');

    // Validation complète
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showMessage(formMessage, 'Veuillez corriger les erreurs dans le formulaire.', 'error');
        return;
    }

    // Récupération des données
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simulation d'envoi (à remplacer par un vrai appel API)
    simulateFormSubmission(form, formMessage, data);
}

// ============================================
// VALIDATION DES CHAMPS
// ============================================
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Vérification si le champ est requis
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Ce champ est requis';
    }

    // Validation spécifique par type
    if (value) {
        switch (field.type) {
            case 'email':
                if (!validateEmail(value)) {
                    isValid = false;
                    errorMessage = 'Adresse email invalide';
                }
                break;
            case 'tel':
                if (!validatePhone(value)) {
                    isValid = false;
                    errorMessage = 'Numéro de téléphone invalide';
                }
                break;
        }
    }

    // Validation de la checkbox RGPD
    if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
        isValid = false;
        errorMessage = 'Vous devez accepter les conditions';
    }

    // Affichage de l'erreur
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }

    return isValid;
}

// ============================================
// VALIDATION EMAIL
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// VALIDATION TÉLÉPHONE
// ============================================
function validatePhone(phone) {
    // Accepte différents formats de numéros français
    const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return re.test(phone);
}

// ============================================
// AFFICHAGE D'ERREUR SUR UN CHAMP
// ============================================
function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#EF4444';

    // Créer ou mettre à jour le message d'erreur
    let errorDiv = field.parentElement.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'color: #EF4444; font-size: 0.875rem; margin-top: 0.25rem;';
        field.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

// ============================================
// EFFACER L'ERREUR D'UN CHAMP
// ============================================
function clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';

    const errorDiv = field.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// ============================================
// AFFICHAGE MESSAGE FORMULAIRE
// ============================================
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = 'form-message ' + type;
    element.style.display = 'block';

    // Scroll vers le message
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Masquer le message après 5 secondes
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// ============================================
// SIMULATION D'ENVOI DE FORMULAIRE
// ============================================
function simulateFormSubmission(form, messageElement, data) {
    // Désactiver le bouton de soumission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';
    submitButton.style.opacity = '0.6';

    // Simulation d'un délai réseau (remplacer par un vrai appel API)
    setTimeout(() => {
        // Simuler un succès
        console.log('Données du formulaire:', data);

        showMessage(
            messageElement,
            'Votre demande a été envoyée avec succès ! Nous vous recontacterons dans les plus brefs délais.',
            'success'
        );

        // Réinitialiser le formulaire
        form.reset();

        // Réactiver le bouton
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.style.opacity = '1';

        // En production, remplacer par:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                showMessage(messageElement, 'Votre demande a été envoyée avec succès !', 'success');
                form.reset();
            } else {
                showMessage(messageElement, 'Une erreur est survenue. Veuillez réessayer.', 'error');
            }
        })
        .catch(error => {
            showMessage(messageElement, 'Erreur de connexion. Veuillez réessayer plus tard.', 'error');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.style.opacity = '1';
        });
        */
    }, 1500);
}

// ============================================
// FORMATAGE AUTOMATIQUE DU TÉLÉPHONE
// ============================================
const phoneInput = document.getElementById('telephone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');

        // Formatter en groupes de 2 chiffres
        if (value.length > 0) {
            value = value.match(/.{1,2}/g)?.join(' ') || value;
        }

        e.target.value = value;
    });
}

// ============================================
// CARACTÈRES RESTANTS POUR TEXTAREA
// ============================================
const messageTextarea = document.getElementById('message');
if (messageTextarea) {
    const maxLength = 1000;
    messageTextarea.setAttribute('maxlength', maxLength);

    // Créer l'indicateur de caractères
    const charCounter = document.createElement('div');
    charCounter.style.cssText = 'text-align: right; font-size: 0.875rem; color: #6C757D; margin-top: 0.25rem;';
    charCounter.innerHTML = `<span id="charCount">0</span>/${maxLength} caractères`;
    messageTextarea.parentElement.appendChild(charCounter);

    messageTextarea.addEventListener('input', function() {
        const count = this.value.length;
        document.getElementById('charCount').textContent = count;

        if (count > maxLength * 0.9) {
            charCounter.style.color = '#F59E0B';
        } else {
            charCounter.style.color = '#6C757D';
        }
    });
}

// ============================================
// PRÉREMPLISSAGE SI PARAMÈTRES URL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');

    if (service) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            // Mapper les valeurs de l'URL aux options du formulaire
            const serviceMap = {
                'residentiel': 'residentiel',
                'tertiaire': 'tertiaire',
                'depannage': 'depannage',
                'renovation': 'renovation',
                'renouvelable': 'renouvelable'
            };

            const mappedService = serviceMap[service];
            if (mappedService) {
                serviceSelect.value = mappedService;
            }
        }
    }
});

// ============================================
// PROTECTION ANTI-SPAM BASIQUE
// ============================================
const honeypot = document.createElement('input');
honeypot.type = 'text';
honeypot.name = 'website';
honeypot.style.cssText = 'position: absolute; left: -9999px; width: 1px; height: 1px;';
honeypot.tabIndex = -1;
honeypot.setAttribute('autocomplete', 'off');

const form = document.getElementById('contactForm');
if (form) {
    form.appendChild(honeypot);
}

// ============================================
// LOG DE DÉMARRAGE
// ============================================
console.log('Contact form JS chargé avec succès');
