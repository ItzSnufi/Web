/**
 * Snufi Coding - Enhanced Interactive Experience 2026
 */

// --- 24. INITIALIZATION ENHANCEMENT ---
window.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    initializeScrollAnimations();
    initializeLoadingScreen();
    initializeEnhancedInteractions();
    initializePageTransitions();
    initializeMobileOptimizations();
    enhanceLoadingStates();
});

// --- 2. PARTICLE EFFECTS SYSTEM ---
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (10 + Math.random() * 10) + 's';
    
    // Random colors for particles
    const colors = ['#00f2ff', '#7000ff', '#10b981', '#f59e0b'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.boxShadow = `0 0 6px ${particle.style.background}`;
    
    container.appendChild(particle);
}

// --- 3. SCROLL ANIMATION OBSERVER ---
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });
    
    // Enhanced stats counter animation
    animateCounters();
}

// --- 4. COUNTER ANIMATION ---
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h2');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const text = element.innerText;
    const number = parseFloat(text.replace(/[^\d.]/g, ''));
    const suffix = text.replace(/[\d.]/g, '');
    
    if (isNaN(number)) return;
    
    let current = 0;
    const increment = number / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.innerText = current.toFixed(number % 1 !== 0 ? 1 : 0) + suffix;
    }, 30);
}

// --- 5. LOADING SCREEN ---
function initializeLoadingScreen() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (!loadingOverlay) return;
    
    // Hide loading screen after page loads
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 1500);
}

// --- 6. ENHANCED INTERACTIONS ---
function initializeEnhancedInteractions() {
    // Mouse parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.feature-item, .skill-item').forEach((el, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            el.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
    
    // Enhanced form interactions
    enhanceFormInteractions();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// --- 7. ENHANCED FORM INTERACTIONS ---
function enhanceFormInteractions() {
    const form = document.getElementById('mainForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Floating label effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
}

function validateInput(input) {
    const isValid = input.checkValidity();
    
    if (isValid) {
        input.style.borderColor = '#10b981';
        input.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.3)';
    } else if (input.value) {
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.3)';
    }
}

// --- 8. SIDEBAR NAVIGATION (Enhanced) ---
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
        
        // Add menu animation
        const menuBtn = document.querySelector('.menu-btn');
        if (menuBtn) {
            menuBtn.classList.toggle('active');
        }
    }
}

// Enhanced sidebar close on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
        
        // Add ripple effect
        createRipple(event, link);
    });
});

// --- 9. RIPPLE EFFECT ---
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// --- 10. FORMULAR-HANDLING (Enhanced) ---
const contactForm = document.getElementById('mainForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button');
        const originalText = submitBtn.innerText;
        
        // Enhanced loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
        submitBtn.classList.add('loading');

        const formData = new FormData(this);

        // Add progress animation
        showProgressIndicator();

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                openEnhancedModal();
                contactForm.reset();
                confettiCelebration();
            } else {
                showErrorNotification("Error: Data transmission failed. Please contact engineers@snuficoding.com directly.");
            }
        })
        .catch(error => {
            console.error("Transmission Error:", error);
            showErrorNotification("Connection lost. Please check your internet and try again.");
        })
        .finally(() => {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
            submitBtn.classList.remove('loading');
            hideProgressIndicator();
        });
    });
}

// --- 11. ENHANCED MODAL SYSTEM ---
function openEnhancedModal() {
    const modal = document.getElementById('thanks-modal');
    if (modal) {
        modal.classList.add('active');
        modal.style.animation = 'fadeInUp 0.5s ease-out';
        document.body.style.overflow = 'hidden';
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            closeModal();
        }, 5000);
    }
}

function closeModal() {
    const modal = document.getElementById('thanks-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// --- 12. VISUAL FEEDBACK SYSTEMS ---
function showProgressIndicator() {
    const progress = document.createElement('div');
    progress.className = 'progress-indicator';
    progress.innerHTML = '<div class="progress-bar"></div>';
    document.body.appendChild(progress);
}

function hideProgressIndicator() {
    const progress = document.querySelector('.progress-indicator');
    if (progress) {
        progress.remove();
    }
}

function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function confettiCelebration() {
    // Simple confetti effect
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = ['#00f2ff', '#7000ff', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// --- 13. UX IMPROVEMENTS (Enhanced) ---
window.addEventListener('scroll', () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
    
    // Parallax scrolling for hero section
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Enhanced modal close
window.onclick = function(event) {
    const modal = document.getElementById('thanks-modal');
    if (event.target == modal) {
        closeModal();
    }
}

// --- 14. KEYBOARD NAVIGATION ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        const modal = document.getElementById('thanks-modal');
        
        if (sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
        
        if (modal && modal.classList.contains('active')) {
            closeModal();
        }
    }
});

// --- 15. PERFORMANCE OPTIMIZATION ---
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    ticking = false;
    // Update animations here
}

// --- 16. THEME TOGGLE FUNCTIONALITY ---
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function setTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'light') {
        body.classList.add('light-theme');
        themeToggle.classList.add('dark');
    } else {
        body.classList.remove('light-theme');
        themeToggle.classList.remove('dark');
    }
}

// Initialize theme on page load
initializeTheme();

// --- 17. SOCIAL LINKS ENHANCEMENT ---
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.1)';
        link.style.textShadow = '0 0 20px rgba(0, 242, 255, 0.8)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
        link.style.textShadow = 'none';
    });
});

// --- 18. ENHANCED CIRCLE ANIMATIONS ---
function enhanceCircleAnimations() {
    const circles = document.querySelectorAll('.circles li');
    circles.forEach((circle, index) => {
        circle.style.width = (Math.random() * 30 + 10) + 'px';
        circle.style.height = circle.style.width;
        circle.style.left = Math.random() * 100 + '%';
        circle.style.animationDelay = (Math.random() * 25) + 's';
        circle.style.animationDuration = (Math.random() * 20 + 20) + 's';
        
        // Random colors for circles
        const colors = ['rgba(0, 242, 255, 0.03)', 'rgba(112, 0, 255, 0.03)', 'rgba(16, 185, 129, 0.03)'];
        circle.style.background = colors[Math.floor(Math.random() * colors.length)];
    });
}

// Initialize circle animations
enhanceCircleAnimations();

// --- 19. KEYBOARD SHORTCUTS ---
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for quick navigation
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleMenu();
    }
    
    // Ctrl/Cmd + D for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
});

// --- 20. PERFORMANCE MONITORING ---
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Show performance badge for fast loads
        if (loadTime < 1000) {
            console.log('🚀 Excellent performance!');
        }
    });
    
    // Monitor scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            // Smooth scroll handling
        });
    });
}

// --- 21. SMOOTH PAGE NAVIGATION ---
function initializePageTransitions() {
    // Add page transition overlay
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    pageTransition.innerHTML = '<div class="page-transition-content"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    document.body.appendChild(pageTransition);
    
    // Handle page navigation
    document.querySelectorAll('a[href$=".html"]:not([target])').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.href;
            
            // Show transition
            pageTransition.classList.add('active');
            
            // Navigate after short delay
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    });
}

// --- 22. ENHANCED MOBILE INTERACTIONS ---
function initializeMobileOptimizations() {
    // Touch-friendly interactions
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add ripple effect for touch
        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            
            if (element && (element.tagName === 'A' || element.tagName === 'BUTTON' || element.classList.contains('pricing-card') || element.classList.contains('feature-item'))) {
                createTouchRipple(touch.clientX, touch.clientY, element);
            }
        });
    }
    
    // Optimize scroll performance on mobile
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Parallax effect only on desktop
                if (window.innerWidth > 768) {
                    const scrolled = window.pageYOffset;
                    const hero = document.querySelector('.hero-section');
                    if (hero) {
                        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

function createTouchRipple(x, y, element) {
    const ripple = document.createElement('span');
    ripple.className = 'touch-ripple';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (x - rect.left - size / 2) + 'px';
    ripple.style.top = (y - rect.top - size / 2) + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// --- 23. ENHANCED LOADING STATES ---
function enhanceLoadingStates() {
    // Add loading class to buttons during form submission
    const form = document.getElementById('mainForm');
    if (form) {
        form.addEventListener('submit', () => {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('btn-loading');
                submitBtn.innerHTML = '<span class="loading-text">Processing</span>';
            }
        });
    }
    
    // Add loading states to all interactive elements
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('click', function() {
            if (!this.classList.contains('no-loading')) {
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 200);
            }
        });
    });
}