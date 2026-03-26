const translations = {
    de: {
        navHome: "Startseite", navPrices: "Preise", navAgb: "AGBs",
        heroSubtitle: "High-End Software Engineering",
        ctaButton: "Projekt starten",
        featuresTitle: "Warum Snufi Coding?",
        feat1T: "Performance", feat1D: "Optimierter Code für maximale Geschwindigkeit.",
        feat2T: "Sicherheit", feat2D: "Schutz vor Exploits und Datenverlust.",
        feat3T: "Clean Code", feat3D: "Wartbare und zukunftssichere Software.",
        processTitle: "Dein Weg zum fertigen Produkt",
        step1T: "Analyse", step1D: "Wir besprechen deine Anforderungen im Detail.",
        step2T: "Entwicklung", step2D: "Ich programmiere deine Lösung mit regelmäßigen Updates.",
        step3T: "Deployment", step3D: "Die Software geht live und wird intensiv getestet.",
        faq1Q: "Wie lange dauert ein Projekt?", faq1A: "Je nach Komplexität zwischen 3 Tagen und 4 Wochen.",
        faq2Q: "Welche Zahlungsmethoden gibt es?", faq2A: "PayPal, Krypto oder Banküberweisung.",
        formTitle: "Projekt-Anforderungen senden",
        submitBtn: "Anfrage jetzt einreichen",
        modalTitle: "Startschuss gefallen!",
        modalText: "Deine Anforderungen sind bei mir eingegangen. Ich melde mich in Kürze!",
    },
    en: {
        navHome: "Home", navPrices: "Pricing", navAgb: "Terms",
        heroSubtitle: "High-End Software Engineering",
        ctaButton: "Start Project",
        featuresTitle: "Why Snufi Coding?",
        feat1T: "Performance", feat1D: "Optimized code for maximum speed.",
        feat2T: "Security", feat2D: "Protection against exploits and data loss.",
        feat3T: "Clean Code", feat3D: "Maintainable and future-proof software.",
        processTitle: "Your Path to the Finished Product",
        step1T: "Analysis", step1D: "We discuss your requirements in detail.",
        step2T: "Development", step2D: "I develop your solution with regular updates.",
        step3T: "Deployment", step3D: "The software goes live and is thoroughly tested.",
        faq1Q: "How long does a project take?", faq1A: "Depending on complexity, between 3 days and 4 weeks.",
        faq2Q: "Payment methods?", faq2A: "PayPal, Crypto, or Bank Transfer.",
        formTitle: "Submit Project Requirements",
        submitBtn: "Submit Inquiry Now",
        modalTitle: "Liftoff!",
        modalText: "Your requirements have been received. I'll get back to you shortly!",
    }
};

// Logik für Sidebar, Sprache, Formular und Cursor
function toggleMenu() { document.getElementById('sidebar').classList.toggle('active'); }

function setLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    updateUI(lang);
}

function updateUI(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });
    document.getElementById('btn-de').classList.toggle('active', lang === 'de');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
}

// Formular-Handling
const form = document.getElementById('mainForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        }).then(() => {
            openModal();
            form.reset();
        });
    });
}

function openModal() { document.getElementById('thanks-modal').classList.add('active'); }
function closeModal() { document.getElementById('thanks-modal').classList.remove('active'); }

// Cursor
const dot = document.querySelector(".cursor-dot");
const out = document.querySelector(".cursor-outline");
window.addEventListener("mousemove", (e) => {
    dot.style.top = e.clientY + "px"; dot.style.left = e.clientX + "px";
    out.animate({ top: e.clientY + "px", left: e.clientX + "px" }, { duration: 500, fill: "forwards" });
});

// Start
const savedLang = localStorage.getItem('selectedLang') || 'de';
updateUI(savedLang);