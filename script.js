const translations = {
    de: {
        navHome: "Startseite",
        navPrices: "Preise",
        navAgb: "AGBs",
        heroSubtitle: "High-End Software Engineering",
        processTitle: "Dein Weg zum fertigen Produkt",
        step1T: "Analyse",
        step1D: "Wir besprechen deine Anforderungen im Detail.",
        step2T: "Entwicklung",
        step2D: "Ich programmiere deine Lösung mit regelmäßigen Updates.",
        step3T: "Deployment",
        step3D: "Die Software geht live und wird intensiv getestet.",
        faq1Q: "Wie lange dauert ein Projekt?",
        faq1A: "Je nach Komplexität zwischen 3 Tagen und 4 Wochen.",
        faq2Q: "Welche Zahlungsmethoden gibt es?",
        faq2A: "PayPal, Krypto oder Banküberweisung.",
        formTitle: "Projekt-Anforderungen",
        submitBtn: "Anfrage jetzt einreichen"
    },
    en: {
        navHome: "Home",
        navPrices: "Pricing",
        navAgb: "Terms",
        heroSubtitle: "High-End Software Engineering",
        processTitle: "Your Path to the Product",
        step1T: "Analysis",
        step1D: "We discuss your requirements in detail.",
        step2T: "Development",
        step2D: "I develop your solution with regular updates.",
        step3T: "Deployment",
        step3D: "The software goes live and is thoroughly tested.",
        faq1Q: "How long does a project take?",
        faq1A: "Depending on complexity, between 3 days and 4 weeks.",
        faq2Q: "Which payment methods are available?",
        faq2A: "PayPal, Crypto, or Bank Transfer.",
        formTitle: "Project Requirements",
        submitBtn: "Submit Inquiry Now"
    }
};

function setLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    updateUI(lang);
}

function updateUI(lang) {
    const elements = document.querySelectorAll('[data-key]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        } else {
            console.warn("Key nicht gefunden:", key); // Hilft beim Fehlersuchen
        }
    });

    // Buttons stylen
    document.getElementById('btn-de').classList.toggle('active', lang === 'de');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
}

// Beim Laden der Seite ausführen
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'de';
    updateUI(savedLang);
});

// Sidebar Toggle
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}