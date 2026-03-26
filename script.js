const translations = {
    de: { navHome: "Startseite", navPrices: "Preise", navAgb: "AGBs", pageTitle: "Willkommen", pageDesc: "Premium Software Engineering..." },
    en: { navHome: "Home", navPrices: "Pricing", navAgb: "Terms", pageTitle: "Welcome", pageDesc: "High-end software solutions..." }
};

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.querySelector('.menu-btn').classList.toggle('open');
}

function setLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    updateText(lang);
}

function updateText(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
    
    document.getElementById('btn-de').classList.toggle('active', lang === 'de');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
}

// Cursor Logic
const dot = document.querySelector(".cursor-dot");
const out = document.querySelector(".cursor-outline");
window.addEventListener("mousemove", (e) => {
    dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px";
    out.animate({ left: e.clientX + "px", top: e.clientY + "px" }, { duration: 400, fill: "forwards" });
});

// Load language on startup
const savedLang = localStorage.getItem('selectedLang') || 'de';
updateText(savedLang);