const translations = {
    de: {
        navHome: "Startseite", navPrices: "Preise", navAgb: "AGBs",
        heroSubtitle: "High-End Software Engineering",
        bioTitle: "Über das Business",
        bioP1: "Ich entwickle maßgeschneiderte Software-Lösungen für anspruchsvolle Kunden. Mein Fokus liegt auf Performance, Sicherheit und sauberer Architektur.",
        formTitle: "Projekt-Anforderungen senden",
        formSubtitle: "Beschreibe dein Vorhaben so detailliert wie möglich.",
        submitBtn: "Anfrage einreichen",
        // AGB Texte (hier einfügen wie im vorherigen Beispiel)
    },
    en: {
        navHome: "Home", navPrices: "Pricing", navAgb: "Terms",
        heroSubtitle: "High-End Software Engineering",
        bioTitle: "About the Business",
        bioP1: "I develop bespoke software solutions for demanding clients. My focus is on performance, security, and clean architecture.",
        formTitle: "Send Project Requirements",
        formSubtitle: "Describe your project as detailed as possible.",
        submitBtn: "Submit Inquiry",
    }
};

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
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

// Startup
const savedLang = localStorage.getItem('lang') || 'de';
updateUI(savedLang);

// Cursor
const dot = document.querySelector(".cursor-dot");
const out = document.querySelector(".cursor-outline");
window.addEventListener("mousemove", (e) => {
    dot.style.top = e.clientY + "px"; dot.style.left = e.clientX + "px";
    out.animate({ top: e.clientY + "px", left: e.clientX + "px" }, { duration: 500, fill: "forwards" });
});