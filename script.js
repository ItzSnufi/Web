/**
 * Snufi Coding - Core Logic 2026
 */

// --- 1. SIDEBAR NAVIGATION ---
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Schließt die Sidebar automatisch, wenn man auf einen Link klickt (Mobil-Optimierung)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('sidebar').classList.remove('active');
    });
});


// --- 2. FORMULAR-HANDLING (E-Mail Versand) ---
const contactForm = document.getElementById('mainForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Verhindert das Neuladen der Seite

        const submitBtn = this.querySelector('button');
        const originalText = submitBtn.innerText;
        
        // Optisches Feedback für den User
        submitBtn.innerText = "System: Sending...";
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";

        const formData = new FormData(this);

        // Versand via Fetch API an FormSubmit
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Erfolg: Modal öffnen und Formular leeren
                openModal();
                contactForm.reset();
            } else {
                // Fehler vom Server
                alert("Error: Data transmission failed. Please contact engineers@snuficoding.com directly.");
            }
        })
        .catch(error => {
            // Netzwerkfehler
            console.error("Transmission Error:", error);
            alert("Connection lost. Please check your internet and try again.");
        })
        .finally(() => {
            // Button wieder in den Originalzustand versetzen
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
        });
    });
}


// --- 3. MODAL LOGIK ---
function openModal() {
    const modal = document.getElementById('thanks-modal');
    if (modal) {
        modal.classList.add('active');
        // Verhindert das Scrollen im Hintergrund, wenn das Fenster offen ist
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('thanks-modal');
    if (modal) {
        modal.classList.remove('active');
        // Scrollen wieder erlauben
        document.body.style.overflow = 'auto';
    }
}


// --- 4. UX IMPROVEMENTS ---
// Schließt die Sidebar, wenn man außerhalb klickt oder scrollt
window.addEventListener('scroll', () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});

// Schließt das Modal, wenn man auf das Overlay klickt
window.onclick = function(event) {
    const modal = document.getElementById('thanks-modal');
    if (event.target == modal) {
        closeModal();
    }
}