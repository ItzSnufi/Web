const translations = {
    de: {
        navHome: "Startseite", navPrices: "Preise", navAgb: "AGBs",
        heroSubtitle: "High-End Software Engineering",
        bioTitle: "Über das Business", bioP1: "Maßgeschneiderte Software-Lösungen für anspruchsvolle Kunden.",
        formTitle: "Projekt-Anforderungen", submitBtn: "Anfrage senden",
        modalTitle: "Anfrage gesendet!", modalText: "Vielen Dank. Ich melde mich in Kürze bei dir.",
        agbBody: "<h4>§1 Haftung</h4><p>Keine Haftung für Schäden durch Code-Nutzung.</p><h4>§2 Zahlung</h4><p>Zahlung nach Vereinbarung.</p>"
    },
    en: {
        navHome: "Home", navPrices: "Pricing", navAgb: "Terms",
        heroSubtitle: "High-End Software Engineering",
        bioTitle: "About the Business", bioP1: "Bespoke software solutions for demanding clients.",
        formTitle: "Project Requirements", submitBtn: "Submit Inquiry",
        modalTitle: "Inquiry Sent!", modalText: "Thank you. I will get back to you shortly.",
        agbBody: "<h4>§1 Liability</h4><p>No liability for damages caused by code usage.</p><h4>§2 Payment</h4><p>Payment as agreed.</p>"
    }
};

function toggleMenu() { document.getElementById('sidebar').classList.toggle('active'); }

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

// Form handling
const form = document.getElementById('mainForm');
if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch(this.action, { method: 'POST', body: new FormData(this), headers: { 'Accept': 'application/json' }})
        .then(() => { openModal(); form.reset(); });
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