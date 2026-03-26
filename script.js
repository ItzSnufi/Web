const translations = {
    de: {
        navHome: "Startseite", navPrices: "Preise", navAgb: "AGBs",
        heroSubtitle: "High-End Software Engineering",
        bioTitle: "Über mich",
        bioP1: "Ich bin Snufi – Entwickler aus Leidenschaft mit Fokus auf effiziente, sichere und performante Algorithmen.",
        bioP2: "Ich lege höchsten Wert auf Clean Code und technische Präzision in jedem Projekt.",
        formTitle: "Projekt-Anforderungen senden",
        submitBtn: "Anfrage einreichen",
        modalTitle: "Anfrage gesendet!",
        modalText: "Vielen Dank für deine Nachricht. Ich werde mich in Kürze bei dir melden.",
        agbTitle: "Allgemeine Geschäftsbedingungen",
        agbContent: "<h4>§1 Haftung</h4><p>Nutzung des Codes auf eigene Gefahr.</p><h4>§2 Preise</h4><p>Individuelle Kalkulation je nach Aufwand.</p>"
    },
    en: {
        navHome: "Home", navPrices: "Pricing", navAgb: "Terms",
        heroSubtitle: "High-End Software Engineering",
        bioTitle: "About Me",
        bioP1: "I am Snufi – a passionate developer focused on efficient, secure, and high-performance algorithms.",
        bioP2: "I prioritize Clean Code and technical precision in every project.",
        formTitle: "Submit Project Requirements",
        submitBtn: "Submit Inquiry",
        modalTitle: "Inquiry Sent!",
        modalText: "Thank you for your message. I will get back to you shortly.",
        agbTitle: "Terms and Conditions",
        agbContent: "<h4>§1 Liability</h4><p>Use of code at your own risk.</p><h4>§2 Pricing</h4><p>Individual calculation based on complexity.</p>"
    }
};

// --- FUNKTIONEN ---

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

function setLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    updateUI(lang);
}

function updateUI(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    document.getElementById('btn-de').classList.toggle('active', lang === 'de');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
}

// Formular Handling
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

// Cursor Logic
const dot = document.querySelector(".cursor-dot");
const out = document.querySelector(".cursor-outline");
window.addEventListener("mousemove", (e) => {
    dot.style.top = e.clientY + "px"; dot.style.left = e.clientX + "px";
    out.animate({ top: e.clientY + "px", left: e.clientX + "px" }, { duration: 500, fill: "forwards" });
});

// Initialisierung
const savedLang = localStorage.getItem('selectedLang') || 'de';
updateUI(savedLang);