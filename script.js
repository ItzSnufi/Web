// --- SIDE NAVIGATION ---
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.menu-btn');
    if(sidebar) sidebar.classList.toggle('active');
    if(menuBtn) menuBtn.classList.toggle('open');
}

// Close sidebar when clicking outside (on the container)
const container = document.querySelector('.container');
if(container) {
    container.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        if(sidebar && sidebar.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// --- FORM HANDLING & MODAL ---
const contactForm = document.getElementById('mainForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents default page reload
        
        const formData = new FormData(this);
        
        // Submit using fetch to avoid leaving the page
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                openModal();
                contactForm.reset(); // Clear the form
            } else {
                console.error("Form submission failed.");
            }
        }).catch(error => {
            console.error("Error submitting form:", error);
        });
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