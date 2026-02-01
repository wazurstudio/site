/* ===================================
   CSS VARIABLES & RESET
   =================================== */
:root {
    --primary: #1a1a2e;
    --secondary: #c5a572;
    --accent: #8b7355;
    --text-dark: #16213e;
    --text-light: #6c757d;
    --bg-light: #f8f9fa;
    --white: #ffffff;
    --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Montserrat', sans-serif;
    color: var(--text-dark);
    line-height: 1.6;
    overflow-x: hidden;
}

img {
    max-width: 100%;
    height: auto;
}

a {
    text-decoration: none;
    color: inherit;
}

button {
    border: none;
    cursor: pointer;
    font-family: inherit;
}

/* ===================================
   TYPOGRAPHY
   =================================== */
h1, h2, h3, h4, h5, h6 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    line-height: 1.2;
    color: var(--primary);
}

h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
}

h2 {
    font-size: clamp(2rem, 4vw, 3rem);
}

h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
}

/* ===================================
   CONTAINER & LAYOUT
   =================================== */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

/* ===================================
   NAVIGATION
   =================================== */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--white);
    box-shadow: var(--shadow-sm);
    z-index: 1000;
    transition: var(--transition);
}

.navbar.scrolled {
    box-shadow: var(--shadow-md);
}

.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
}

.logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--primary);
    letter-spacing: 0.5px;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 40px;
}

.nav-links a {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-dark);
    transition: var(--transition);
    position: relative;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--secondary);
    transition: var(--transition);
}

.nav-links a:hover::after,
.nav-links a.active::after {
    width: 100%;
}

.menu-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    padding: 8px;
}

.menu-toggle span {
    width: 25px;
    height: 2px;
    background: var(--primary);
    transition: var(--transition);
}

/* ===================================
   HERO SECTION
   =================================== */
.hero {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="none"/><circle cx="50" cy="50" r="1" fill="rgba(197, 165, 114, 0.1)"/></svg>');
    opacity: 0.3;
}

.hero-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 50%, rgba(197, 165, 114, 0.15) 0%, transparent 60%);
}

.hero-content {
    position: relative;
    text-align: center;
    z-index: 2;
    max-width: 900px;
    padding: 0 24px;
    animation: fadeInUp 1s ease-out;
}

.hero-title {
    font-size: clamp(3rem, 6vw, 5rem);
    color: var(--white);
    margin-bottom: 24px;
    font-weight: 700;
    letter-spacing: -1px;
}

.hero-subtitle {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 40px;
    font-weight: 300;
}

.scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    animation: bounce 2s infinite;
}

.mouse {
    width: 24px;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    position: relative;
}

.mouse::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 8px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 2px;
    animation: scroll 1.5s infinite;
}

/* ===================================
   BUTTONS
   =================================== */
.cta-button {
    display: inline-block;
    padding: 16px 40px;
    background: var(--secondary);
    color: var(--white);
    font-weight: 600;
    font-size: 1rem;
    border-radius: 50px;
    transition: var(--transition);
    box-shadow: 0 4px 16px rgba(197, 165, 114, 0.3);
}

.cta-button:hover {
    background: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(197, 165, 114, 0.4);
}

.secondary-button {
    display: inline-block;
    padding: 14px 32px;
    background: transparent;
    color: var(--primary);
    font-weight: 600;
    font-size: 0.95rem;
    border: 2px solid var(--secondary);
    border-radius: 50px;
    transition: var(--transition);
}

.secondary-button:hover {
    background: var(--secondary);
    color: var(--white);
}

/* ===================================
   SECTIONS
   =================================== */
section {
    padding: 100px 0;
}

.section-header {
    text-align: center;
    margin-bottom: 60px;
}

.section-tag {
    display: inline-block;
    padding: 8px 20px;
    background: rgba(197, 165, 114, 0.1);
    color: var(--secondary);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-radius: 20px;
    margin-bottom: 16px;
}

.section-title {
    margin-bottom: 16px;
}

.section-subtitle {
    color: var(--text-light);
    font-size: 1.1rem;
    max-width: 700px;
    margin: 0 auto;
}

.section-cta {
    text-align: center;
    margin-top: 60px;
}

/* ===================================
   FEATURED SECTION
   =================================== */
.featured-section {
    background: var(--bg-light);
}

.properties-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 32px;
}

.property-card {
    background: var(--white);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
}

.property-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
}

.property-image {
    position: relative;
    height: 250px;
    overflow: hidden;
}

.property-img-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
}

.property-card:hover .property-img-placeholder {
    transform: scale(1.05);
}

.property-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    padding: 8px 16px;
    background: var(--white);
    color: var(--primary);
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    z-index: 2;
}

.property-badge.exclusive {
    background: var(--secondary);
    color: var(--white);
}

.favorite-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    z-index: 2;
}

.favorite-btn:hover {
    background: var(--secondary);
    color: var(--white);
}

.favorite-btn svg {
    stroke: currentColor;
}

.property-content {
    padding: 24px;
}

.property-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--secondary);
    margin-bottom: 12px;
}

.property-title {
    font-size: 1.25rem;
    margin-bottom: 8px;
}

.property-location {
    color: var(--text-light);
    font-size: 0.9rem;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.property-features {
    display: flex;
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.property-features span {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    color: var(--text-light);
}

.property-cta {
    width: 100%;
    padding: 12px;
    background: var(--primary);
    color: var(--white);
    font-weight: 600;
    border-radius: 8px;
    margin-top: 16px;
    transition: var(--transition);
}

.property-cta:hover {
    background: var(--secondary);
}

/* ===================================
   SERVICES SECTION
   =================================== */
.services-preview {
    background: var(--white);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 32px;
}

.service-card {
    text-align: center;
    padding: 40px 24px;
    border-radius: 16px;
    background: var(--bg-light);
    transition: var(--transition);
}

.service-card:hover {
    background: var(--white);
    box-shadow: var(--shadow-md);
    transform: translateY(-4px);
}

.service-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(197, 165, 114, 0.1) 0%, rgba(139, 115, 85, 0.1) 100%);
    border-radius: 50%;
    color: var(--secondary);
}

.service-card h3 {
    font-size: 1.5rem;
    margin-bottom: 16px;
}

.service-card p {
    color: var(--text-light);
    line-height: 1.7;
}

/* ===================================
   STATS SECTION
   =================================== */
.stats-section {
    background: linear-gradient(135deg, var(--primary) 0%, #2d2d44 100%);
    color: var(--white);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 48px;
    text-align: center;
}

.stat-item {
    padding: 24px;
}

.stat-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--secondary);
    margin-bottom: 8px;
}

.stat-label {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* ===================================
   TESTIMONIALS SECTION
   =================================== */
.testimonials-section {
    background: var(--bg-light);
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
}

.testimonial-card {
    background: var(--white);
    padding: 32px;
    border-radius: 16px;
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
}

.testimonial-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-4px);
}

.testimonial-stars {
    color: var(--secondary);
    font-size: 1.25rem;
    margin-bottom: 16px;
}

.testimonial-text {
    font-style: italic;
    color: var(--text-light);
    line-height: 1.8;
    margin-bottom: 24px;
}

.testimonial-author {
    display: flex;
    align-items: center;
    gap: 16px;
}

.author-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%);
}

.author-name {
    font-weight: 600;
    color: var(--primary);
}

.author-role {
    font-size: 0.85rem;
    color: var(--text-light);
}

/* ===================================
   CTA SECTION
   =================================== */
.cta-section {
    background: linear-gradient(135deg, rgba(197, 165, 114, 0.1) 0%, rgba(139, 115, 85, 0.1) 100%);
    text-align: center;
}

.cta-content {
    max-width: 700px;
    margin: 0 auto;
}

.cta-title {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 16px;
}

.cta-text {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 32px;
}

/* ===================================
   PAGE HEADER
   =================================== */
.page-header {
    padding: 150px 0 80px;
    background: linear-gradient(135deg, var(--primary) 0%, #2d2d44 100%);
    text-align: center;
    color: var(--white);
}

.page-title {
    color: var(--white);
    margin-bottom: 16px;
}

.page-subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
}

/* ===================================
   FILTERS SECTION
   =================================== */
.filters-section {
    background: var(--bg-light);
    padding: 40px 0;
}

.filters-wrapper {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    align-items: flex-end;
}

.filter-group {
    flex: 1;
    min-width: 200px;
}

.filter-group label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 8px;
}

.filter-select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-size: 0.95rem;
    font-family: inherit;
    background: var(--white);
    transition: var(--transition);
}

.filter-select:focus {
    outline: none;
    border-color: var(--secondary);
}

.filter-button {
    padding: 12px 32px;
    background: var(--secondary);
    color: var(--white);
    font-weight: 600;
    border-radius: 8px;
    transition: var(--transition);
}

.filter-button:hover {
    background: var(--accent);
}

/* ===================================
   PROPERTIES LISTING
   =================================== */
.properties-listing {
    padding: 60px 0 100px;
}

.pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 60px;
}

.pagination-btn {
    padding: 10px 18px;
    background: var(--white);
    color: var(--text-dark);
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-weight: 600;
    transition: var(--transition);
}

.pagination-btn:hover,
.pagination-btn.active {
    background: var(--secondary);
    color: var(--white);
    border-color: var(--secondary);
}

/* ===================================
   SERVICES DETAILED
   =================================== */
.services-detailed {
    padding: 80px 0;
}

.service-detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    margin-bottom: 100px;
}

.service-detail.reverse {
    direction: rtl;
}

.service-detail.reverse > * {
    direction: ltr;
}

.service-detail-icon {
    width: 100px;
    height: 100px;
    background: rgba(197, 165, 114, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary);
    margin-bottom: 24px;
}

.service-detail h2 {
    font-size: 2.5rem;
    margin-bottom: 16px;
}

.service-intro {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 32px;
}

.service-features-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.feature-item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
}

.feature-item svg {
    flex-shrink: 0;
    margin-top: 4px;
    color: var(--secondary);
}

.feature-item h4 {
    font-size: 1.1rem;
    margin-bottom: 8px;
}

.feature-item p {
    color: var(--text-light);
    line-height: 1.7;
}

.service-detail-image {
    height: 500px;
}

.placeholder-image {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    overflow: hidden;
}

/* ===================================
   PROCESS SECTION
   =================================== */
.process-section {
    background: var(--bg-light);
    padding: 100px 0;
}

.process-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
}

.process-step {
    text-align: center;
    padding: 32px 24px;
}

.process-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    font-weight: 700;
    color: var(--secondary);
    opacity: 0.3;
    margin-bottom: 16px;
}

.process-step h3 {
    font-size: 1.5rem;
    margin-bottom: 16px;
}

.process-step p {
    color: var(--text-light);
    line-height: 1.7;
}

/* ===================================
   CONTACT SECTION
   =================================== */
.contact-section {
    padding: 80px 0;
}

.contact-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 60px;
}

.contact-form-wrapper h2 {
    font-size: 2rem;
    margin-bottom: 16px;
}

.form-description {
    color: var(--text-light);
    margin-bottom: 32px;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 14px 16px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-size: 0.95rem;
    font-family: inherit;
    transition: var(--transition);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--secondary);
}

.form-group textarea {
    resize: vertical;
    min-height: 120px;
}

.checkbox-group {
    flex-direction: row;
    align-items: center;
    gap: 12px;
}

.checkbox-group input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.checkbox-group label {
    margin: 0;
    cursor: pointer;
    font-weight: 400;
}

.submit-button {
    padding: 16px 40px;
    background: var(--secondary);
    color: var(--white);
    font-weight: 600;
    font-size: 1rem;
    border-radius: 8px;
    transition: var(--transition);
    align-self: flex-start;
}

.submit-button:hover {
    background: var(--accent);
    transform: translateY(-2px);
}

.form-message {
    padding: 16px;
    border-radius: 8px;
    margin-top: 16px;
    display: none;
}

.form-message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    display: block;
}

.form-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    display: block;
}

/* Contact Info */
.contact-info-card {
    background: var(--bg-light);
    padding: 40px;
    border-radius: 16px;
    margin-bottom: 24px;
}

.contact-info-card h3 {
    font-size: 1.75rem;
    margin-bottom: 32px;
}

.info-item {
    display: flex;
    gap: 20px;
    margin-bottom: 32px;
}

.info-icon {
    width: 48px;
    height: 48px;
    background: var(--white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary);
    flex-shrink: 0;
}

.info-item h4 {
    font-size: 1.1rem;
    margin-bottom: 8px;
}

.info-item p {
    color: var(--text-light);
    line-height: 1.7;
}

.map-placeholder {
    height: 250px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    margin-bottom: 24px;
}

.map-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--white);
    text-align: center;
    padding: 24px;
}

.map-overlay p {
    margin-top: 16px;
    font-weight: 600;
}

.social-contact h4 {
    font-size: 1.1rem;
    margin-bottom: 16px;
}

.social-icons {
    display: flex;
    gap: 12px;
}

.social-icon {
    width: 44px;
    height: 44px;
    background: var(--bg-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    transition: var(--transition);
}

.social-icon:hover {
    background: var(--secondary);
    color: var(--white);
    transform: translateY(-2px);
}

/* ===================================
   FOOTER
   =================================== */
.footer {
    background: var(--primary);
    color: var(--white);
    padding: 80px 0 0;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 48px;
    margin-bottom: 48px;
}

.footer-title {
    font-size: 1.75rem;
    margin-bottom: 16px;
    color: var(--white);
}

.footer-text {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.7;
}

.footer-subtitle {
    font-size: 1.1rem;
    margin-bottom: 16px;
    color: var(--white);
}

.footer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-links a {
    color: rgba(255, 255, 255, 0.7);
    transition: var(--transition);
}

.footer-links a:hover {
    color: var(--secondary);
}

.footer-links li {
    color: rgba(255, 255, 255, 0.7);
}

.social-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.social-link {
    color: rgba(255, 255, 255, 0.7);
    transition: var(--transition);
}

.social-link:hover {
    color: var(--secondary);
}

.footer-bottom {
    text-align: center;
    padding: 32px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
    color: rgba(255, 255, 255, 0.6);
}

/* ===================================
   ANIMATIONS
   =================================== */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0) translateX(-50%);
    }
    40% {
        transform: translateY(-10px) translateX(-50%);
    }
    60% {
        transform: translateY(-5px) translateX(-50%);
    }
}

@keyframes scroll {
    0% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateX(-50%) translateY(15px);
    }
}

[data-aos] {
    opacity: 0;
    transition: opacity 0.8s ease, transform 0.8s ease;
}

[data-aos].aos-animate {
    opacity: 1;
}

[data-aos="fade-up"].aos-animate {
    transform: translateY(0);
}

[data-aos="fade-up"] {
    transform: translateY(30px);
}

[data-aos="fade-right"].aos-animate {
    transform: translateX(0);
}

[data-aos="fade-right"] {
    transform: translateX(-30px);
}

[data-aos="fade-left"].aos-animate {
    transform: translateX(0);
}

[data-aos="fade-left"] {
    transform: translateX(30px);
}

[data-aos="zoom-in"].aos-animate {
    transform: scale(1);
}

[data-aos="zoom-in"] {
    transform: scale(0.95);
}

/* ===================================
   RESPONSIVE
   =================================== */
@media (max-width: 992px) {
    .service-detail {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .service-detail-image {
        height: 350px;
    }

    .contact-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .nav-links {
        position: fixed;
        top: 77px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 77px);
        background: var(--white);
        flex-direction: column;
        padding: 40px 24px;
        gap: 24px;
        transition: var(--transition);
        box-shadow: var(--shadow-md);
    }

    .nav-links.active {
        left: 0;
    }

    .menu-toggle {
        display: flex;
    }

    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(7px, 7px);
    }

    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    .hero {
        height: 80vh;
    }

    .properties-grid {
        grid-template-columns: 1fr;
    }

    .services-grid {
        grid-template-columns: 1fr;
    }

    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .testimonials-grid {
        grid-template-columns: 1fr;
    }

    .filters-wrapper {
        flex-direction: column;
    }

    .filter-group {
        width: 100%;
    }

    .filter-button {
        width: 100%;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .process-steps {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    section {
        padding: 60px 0;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .pagination {
        flex-wrap: wrap;
    }
}
