
/*
 * Wazur Studio
 * Script principal :
 * 1. Menu mobile
 * 2. Année automatique du pied de page
 * 3. Comparateur photo avant/après
 * 4. Validation et envoi du formulaire de contact
 */

(() => {
    'use strict';

    // ==================================================
    // 1. MENU MOBILE
    // ==================================================

    const burger = document.querySelector('.burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('is-open');

            burger.setAttribute('aria-expanded', String(isOpen));
            burger.setAttribute(
                'aria-label',
                isOpen ? 'Fermer le menu' : 'Ouvrir le menu'
            );
        });

        // Fermer le menu après le clic sur un lien
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('is-open');
                burger.setAttribute('aria-expanded', 'false');
                burger.setAttribute('aria-label', 'Ouvrir le menu');
            });
        });

        // Fermer le menu avec la touche Échap
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                nav.classList.remove('is-open');
                burger.setAttribute('aria-expanded', 'false');
                burger.setAttribute('aria-label', 'Ouvrir le menu');
            }
        });
    }


    // ==================================================
    // 2. ANNÉE AUTOMATIQUE DU PIED DE PAGE
    // ==================================================

    const currentYear = new Date().getFullYear();

    document.querySelectorAll('[data-year]').forEach(element => {
        element.textContent = currentYear;
    });


    // ==================================================
    // 3. COMPARATEUR PHOTO AVANT / APRÈS
    // ==================================================

    const comparator = document.querySelector('.ba');

    if (comparator) {
        const range = comparator.querySelector('input[type="range"]');

        if (range) {
            // Mettre à jour la position du séparateur
            const setPosition = value => {
                comparator.style.setProperty('--pos', `${value}%`);
            };

            // Mettre à jour le comparateur lorsque l'utilisateur glisse
            range.addEventListener('input', () => {
                setPosition(range.value);
            });

            // Animation d'introduction, sauf si l'utilisateur
            // préfère réduire les animations
            const reducedMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches;

            if (!reducedMotion) {
                let stopped = false;
                let startTime;

                // Arrêter l'animation dès que l'utilisateur interagit
                const stopAnimation = () => {
                    stopped = true;
                };

                range.addEventListener('pointerdown', stopAnimation, {
                    once: true
                });

                range.addEventListener('keydown', stopAnimation, {
                    once: true
                });

                // Position de départ
                range.value = 96;
                setPosition(96);

                // Animation progressive
                const animate = timestamp => {
                    if (stopped) return;

                    if (startTime === undefined) {
                        startTime = timestamp;
                    }

                    const progress = Math.min(
                        (timestamp - startTime) / 1400,
                                              1
                    );

                    // Mouvement progressif de 96 % à 50 %
                    const easedProgress = 1 - Math.pow(1 - progress, 3);
                    const value = 96 - 46 * easedProgress;

                    range.value = value;
                    setPosition(value);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };

                window.setTimeout(() => {
                    requestAnimationFrame(animate);
                }, 400);
            }
        }
    }


    // ==================================================
    // 4. FORMULAIRE DE CONTACT
    // ==================================================

    const form = document.getElementById('contact-form');

    if (form) {
        const status = form.querySelector('.form__status');

        // Afficher un message à l'utilisateur
        const setStatus = (message, type = '') => {
            if (!status) return;

            status.textContent = message;
            status.className = 'form__status';

            if (type) {
                status.classList.add(type);
            }
        };

        // Règles de validation des champs
        const rules = {
            name: value =>
            value.trim().length >= 2 ||
            'Indiquez votre nom et prénom.',

            email: value =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ||
            'Saisissez une adresse e-mail valide, par exemple nom@agence.fr.',

            message: value =>
            value.trim().length >= 10 ||
            'Décrivez votre besoin en 10 caractères minimum.',

            consent: (_, field) =>
            field.checked ||
            'Cochez la case pour que nous puissions vous répondre.'
        };

        // Vérifier un champ
        const checkField = field => {
            const rule = rules[field.name];

            // Aucun contrôle spécifique pour les autres champs
            if (!rule) return true;

            const result = rule(field.value, field);
            const isValid = result === true;
            const container = field.closest('.field');

            if (!container) return isValid;

            container.classList.toggle('invalid', !isValid);

            const error = container.querySelector('.error');

            if (error) {
                error.textContent = isValid ? '' : result;
            }

            return isValid;
        };

        // Effacer l'erreur dès que le champ est corrigé
        Object.keys(rules).forEach(name => {
            const field = form.elements.namedItem(name);

            if (!field) return;

            const eventName = field.type === 'checkbox'
            ? 'change'
            : 'input';

            field.addEventListener(eventName, () => {
                checkField(field);
                setStatus('');
            });
        });

        // Envoyer le formulaire
        form.addEventListener('submit', async event => {
            event.preventDefault();

            // Vérifier tous les champs définis dans les règles
            const fieldsValid = Object.keys(rules).every(name => {
                const field = form.elements.namedItem(name);

                return field ? checkField(field) : true;
            });

            if (!fieldsValid) {
                setStatus(
                    'Corrigez les champs signalés, puis renvoyez le formulaire.',
                    'ko'
                );

                const firstInvalid = form.querySelector('.field.invalid input, .field.invalid textarea');

                firstInvalid?.focus();

                return;
            }

            // Protection anti-spam : champ piège
            const honeypot = form.elements.namedItem('website');

            if (honeypot && honeypot.value.trim() !== '') {
                // Ne pas afficher de confirmation en cas de spam
                return;
            }

            // Éviter plusieurs envois simultanés
            const submitButton = form.querySelector(
                'button[type="submit"]'
            );

            if (submitButton) {
                submitButton.disabled = true;
            }

            setStatus('Envoi en cours…');

            try {
                // Envoyer les données à Formspree
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                                             headers: {
                                                 Accept: 'application/json'
                                             }
                });

                if (!response.ok) {
                    throw new Error('Échec de l’envoi');
                }

                // Réinitialiser le formulaire après succès
                form.reset();

                              // Retirer les erreurs visuelles éventuelles
                              form.querySelectorAll('.field.invalid').forEach(field => {
                                  field.classList.remove('invalid');
                              });

                form.querySelectorAll('.error').forEach(error => {
                    error.textContent = '';
                });

                setStatus(
                    'Demande envoyée. Nous vous répondons sous un jour ouvré.',
                    'ok'
                );

            } catch (error) {
                setStatus(
                    'L’envoi a échoué. Écrivez-nous directement à contact@wazur-studio.fr.',
                    'ko'
                );

            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                }
            }
        });
    }

})();
