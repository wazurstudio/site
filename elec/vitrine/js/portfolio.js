// ============================================
// DONNÉES DES PROJETS
// ============================================
const projectsData = [
    {
        id: 0,
        title: "Rénovation complète - Maison 150m²",
        category: "Résidentiel",
        location: "Paris 15ème",
        date: "Décembre 2025",
        description: "Rénovation électrique complète d'une maison familiale avec mise aux normes NF C 15-100.",
        details: [
            "Remplacement complet du tableau électrique",
            "Installation de 45 prises et 30 points lumineux",
            "Mise en place d'un système domotique",
            "Éclairage LED intelligent dans toutes les pièces",
            "Installation de détecteurs de fumée connectés",
            "Câblage réseau et fibre optique"
        ],
        duration: "3 semaines",
        budget: "18 000 €"
    },
    {
        id: 1,
        title: "Installation boutique de mode",
        category: "Tertiaire",
        location: "Paris 9ème",
        date: "Novembre 2025",
        description: "Installation électrique complète pour une boutique de prêt-à-porter avec éclairage sur-mesure.",
        details: [
            "Création de l'installation électrique triphasée",
            "Éclairage architectural et mise en valeur produits",
            "Installation de spots LED variables",
            "Système de contrôle d'accès",
            "Prises multiples pour équipements commerciaux",
            "Éclairage de vitrine avec programmation horaire"
        ],
        duration: "2 semaines",
        budget: "25 000 €"
    },
    {
        id: 2,
        title: "Panneaux solaires 6kWc",
        category: "Énergies renouvelables",
        location: "Versailles",
        date: "Octobre 2025",
        description: "Installation de panneaux photovoltaïques avec système d'autoconsommation.",
        details: [
            "20 panneaux solaires haute performance",
            "Onduleur et système de monitoring",
            "Raccordement au tableau électrique",
            "Installation de batteries de stockage 10kWh",
            "Configuration pour autoconsommation optimale",
            "Accompagnement pour les aides de l'État"
        ],
        duration: "1 semaine",
        budget: "16 000 €",
        savings: "Économie estimée: 1200€/an"
    },
    {
        id: 3,
        title: "Domotique appartement 80m²",
        category: "Résidentiel",
        location: "Boulogne",
        date: "Septembre 2025",
        description: "Transformation d'un appartement classique en appartement intelligent.",
        details: [
            "Installation de système domotique centralisé",
            "Volets roulants motorisés connectés",
            "Éclairage intelligent RGB dans toutes les pièces",
            "Thermostat connecté pour chauffage",
            "Interrupteurs tactiles et variateurs",
            "Contrôle vocal et application mobile"
        ],
        duration: "10 jours",
        budget: "12 000 €"
    },
    {
        id: 4,
        title: "Restaurant gastronomique",
        category: "Tertiaire",
        location: "Paris 8ème",
        date: "Août 2025",
        description: "Installation électrique complète pour restaurant haut de gamme.",
        details: [
            "Installation triphasée pour cuisine professionnelle",
            "Éclairage d'ambiance avec scénarios",
            "Circuit dédié pour chambres froides",
            "Installation de hottes professionnelles",
            "Éclairage extérieur terrasse",
            "Système de ventilation et climatisation"
        ],
        duration: "4 semaines",
        budget: "45 000 €"
    },
    {
        id: 5,
        title: "Borne de recharge véhicule électrique",
        category: "Énergies renouvelables",
        location: "Neuilly",
        date: "Juillet 2025",
        description: "Installation de borne de recharge 22kW pour véhicule électrique.",
        details: [
            "Borne de recharge wallbox 22kW",
            "Raccordement électrique dédié",
            "Protection différentielle spécifique",
            "Câble de recharge type 2",
            "Application de gestion et programmation",
            "Éligible aux aides ADVENIR"
        ],
        duration: "1 jour",
        budget: "2 500 €"
    }
];

// ============================================
// FONCTIONS MODAL
// ============================================
function openModal(projectId) {
    const modal = document.getElementById('portfolioModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectsData[projectId];

    if (!project) return;

    // Construire le contenu du modal
    let detailsHTML = '<ul style="list-style: none; padding: 0;">';
    project.details.forEach(detail => {
        detailsHTML += `<li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative; color: #495057;">
            <span style="position: absolute; left: 0; color: #FFA500;">⚡</span>
            ${detail}
        </li>`;
    });
    detailsHTML += '</ul>';

    const content = `
        <div style="margin-bottom: 2rem;">
            <div style="background: linear-gradient(135deg, #1A1A2E, #16213E); padding: 2rem; border-radius: 1rem 1rem 0 0; margin: -2rem -2rem 2rem -2rem;">
                <div style="background: #F8F9FA; color: #FFA500; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 1rem;">
                    ${project.category}
                </div>
                <h2 style="color: #FFFFFF; margin-bottom: 0.5rem; font-size: 2rem;">
                    ${project.title}
                </h2>
                <p style="color: #DEE2E6; margin: 0;">
                    📍 ${project.location} • 📅 ${project.date}
                </p>
            </div>

            <div style="padding: 0 1rem;">
                <p style="font-size: 1.1rem; line-height: 1.8; color: #495057; margin-bottom: 2rem;">
                    ${project.description}
                </p>

                <h3 style="color: #1A1A2E; margin-bottom: 1rem; font-size: 1.5rem;">
                    Détails du projet
                </h3>
                ${detailsHTML}

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem; padding: 1.5rem; background: #F8F9FA; border-radius: 1rem;">
                    <div>
                        <div style="color: #6C757D; font-size: 0.875rem; font-weight: 600; text-transform: uppercase; margin-bottom: 0.25rem;">
                            Durée
                        </div>
                        <div style="color: #1A1A2E; font-size: 1.25rem; font-weight: 700;">
                            ${project.duration}
                        </div>
                    </div>
                    <div>
                        <div style="color: #6C757D; font-size: 0.875rem; font-weight: 600; text-transform: uppercase; margin-bottom: 0.25rem;">
                            Budget
                        </div>
                        <div style="color: #FFA500; font-size: 1.25rem; font-weight: 700;">
                            ${project.budget}
                        </div>
                    </div>
                    ${project.savings ? `
                    <div style="grid-column: 1 / -1;">
                        <div style="color: #10B981; font-size: 0.95rem; font-weight: 600;">
                            ${project.savings}
                        </div>
                    </div>
                    ` : ''}
                </div>

                <div style="margin-top: 2rem; padding-top: 2rem; border-top: 2px solid #E9ECEF; text-align: center;">
                    <p style="color: #6C757D; margin-bottom: 1rem;">
                        Un projet similaire ? Contactez-nous pour un devis gratuit
                    </p>
                    <a href="contact.html" style="display: inline-block; padding: 0.875rem 2rem; background: linear-gradient(135deg, #FFD700, #FFA500); color: #1A1A2E; border-radius: 1rem; font-weight: 600; text-decoration: none; transition: all 0.25s ease;">
                        Demander un devis
                    </a>
                </div>
            </div>
        </div>
    `;

    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('portfolioModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Fermer le modal en cliquant en dehors
document.getElementById('portfolioModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Fermer le modal avec la touche Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============================================
// FILTRE PORTFOLIO (optionnel)
// ============================================
function filterPortfolio(category) {
    const items = document.querySelectorAll('.portfolio-item');

    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// ============================================
// LOG DE DÉMARRAGE
// ============================================
console.log('Portfolio JS chargé avec succès');
