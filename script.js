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

// --- FUNKTIONEN ---

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if(sidebar) sidebar.classList.toggle('active');
}

function setLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    updateUI(lang);
}

function updateUI(lang) {
    // Alle Elemente mit data-key Attribut finden
    const elements = document.querySelectorAll('[data-key]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Button-Styling aktualisieren (active-Klasse)
    const btnDe = document.getElementById('btn-de');
    const btnEn = document.getElementById('btn-en');
    
    if(btnDe && btnEn) {
        btnDe.classList.remove('active');
        btnEn.classList.remove('active');
        if(lang === 'de') btnDe.classList.add('active');
        else btnEn.classList.add('active');
    }
}

// Formular-Handling mit Modal-PopUp
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
        }).catch(err => console.error("Form error:", err));
    });
}

function openModal() { 
    const modal = document.getElementById('thanks-modal');
    if(modal) modal.classList.add('active'); 
}

function closeModal() { 
    const modal = document.getElementById('thanks-modal');
    if(modal) modal.classList.remove('active'); 
}

// Cursor Logic
const dot = document.querySelector(".cursor-dot");
const out = document.querySelector(".cursor-outline");

if(dot && out) {
    window.addEventListener("mousemove", (e) => {
        dot.style.top = e.clientY + "px";
        dot.style.left = e.clientX + "px";
        out.animate({
            top: e.clientY + "px",
            left: e.clientX + "px"
        }, { duration: 500, fill: "forwards" });
    });
}

// --- INITIALISIERUNG BEIM LADEN ---
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'de';
    updateUI(savedLang);
});