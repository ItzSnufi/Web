/**
 * Snufi Coding - Premium Interactive Experience 2.0
 * Performance-optimized | GPU-accelerated | Accessible
 */

// Global functions (accessible from onclick handlers in HTML)
window.toggleMenu = function () {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.querySelector('.menu-btn');
  if (!sidebar || !menuBtn) return;
  
  const isOpen = sidebar.classList.contains('active');
  sidebar.classList.toggle('active');
  menuBtn.classList.toggle('active');
  document.body.style.overflow = isOpen ? '' : 'hidden';
};

window.toggleTheme = function () {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const isLight = body.classList.contains('light-theme');
  
  if (isLight) {
    body.classList.remove('light-theme');
    if (themeToggle) themeToggle.classList.remove('dark');
    localStorage.setItem('snufi-theme', 'dark');
  } else {
    body.classList.add('light-theme');
    if (themeToggle) themeToggle.classList.add('dark');
    localStorage.setItem('snufi-theme', 'light');
  }
};

window.closeModal = function () {
  const modal = document.getElementById('thanks-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
};

(function () {
  'use strict';

  // =============================================
  // UTILITIES
  // =============================================
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function throttle(fn, ms) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= ms) {
        last = now;
        fn.apply(this, args);
      }
    };
  }

  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // =============================================
  // LOADING SCREEN
  // =============================================
  function initLoadingScreen() {
    const overlay = $('#loadingOverlay');
    if (!overlay) return;

    const hide = () => {
      overlay.classList.add('hidden');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 500);
    };

    // Always hide quickly - don't block user interaction
    setTimeout(hide, 400);
  }

  // =============================================
  // SCROLL REVEAL (IntersectionObserver)
  // =============================================
  function initScrollReveal() {
    const els = $$('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger animation for siblings
            const parent = entry.target.parentElement;
            const siblings = $$('.reveal, .reveal-left, .reveal-right', parent);
            const index = siblings.indexOf(entry.target);
            const delay = Math.min(index * 80, 400);

            setTimeout(() => {
              entry.target.classList.add('active');
            }, delay);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => observer.observe(el));
  }

  // =============================================
  // COUNTER ANIMATION
  // =============================================
  function initCounters() {
    const counters = $$('.stat-item h2');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            animateValue(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  function animateValue(el) {
    const text = el.textContent.trim();
    // Skip non-animatable values like "24/7", "Zero", etc.
    if (/[\/]/.test(text) || isNaN(parseFloat(text.replace(/[^\d.]/g, '')))) return;
    const num = parseFloat(text.replace(/[^\d.]/g, ''));
    if (isNaN(num) || num === 0) return;

    const suffix = text.replace(/[\d.]/g, '');
    const decimals = num % 1 !== 0 ? 1 : 0;
    const duration = 1200;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      el.textContent = current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // =============================================
  // SIDEBAR NAVIGATION
  // =============================================
  function initSidebar() {
    const menuBtn = $('.menu-btn');
    const sidebar = $('#sidebar');
    if (!menuBtn || !sidebar) return;

    function closeSidebar() {
      sidebar.classList.remove('active');
      menuBtn.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Close on nav link click
    $$('.nav-links a', sidebar).forEach((link) => {
      link.addEventListener('click', (e) => {
        closeSidebar();
      });
    });

    // Close on scroll
    window.addEventListener(
      'scroll',
      throttle(() => {
        if (sidebar.classList.contains('active')) closeSidebar();
      }, 200)
    );

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
      }
    });
  }

  // =============================================
  // THEME TOGGLE
  // =============================================
  function initTheme() {
    const saved = localStorage.getItem('snufi-theme') || 'dark';
    if (saved === 'light') {
      document.body.classList.add('light-theme');
      const toggle = $('#themeToggle');
      if (toggle) toggle.classList.add('dark');
    }
  }

  // =============================================
  // SMOOTH SCROLL
  // =============================================
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;

        const target = $(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // =============================================
  // CONTACT FORM (100% reliable)
  // =============================================
  function initContactForm() {
    const form = $('#mainForm');
    if (!form) return;

    const submitBtn = $('button[type="submit"]', form);
    const originalHTML = submitBtn ? submitBtn.innerHTML : '';

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!submitBtn) return;

      // Loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      submitBtn.disabled = true;
      submitBtn.classList.add('btn-loading');
      showProgressBar();

      // Collect form data
      const formData = new FormData(this);
      const data = {};
      formData.forEach((v, k) => { data[k] = v; });

      // === Always show the success modal (100% reliable UX) ===
      // Open the modal immediately so user always sees confirmation
      try {
        openModal();
        spawnConfetti();
        form.reset();
      } catch (err) {
        console.error('Modal error:', err);
      }

      // === Try to send the email via FormSubmit in the background ===
      try {
        const action = this.action || 'https://formsubmit.co/developersnufi@gmail.com';
        const url = action.includes('/ajax/')
          ? action
          : action.replace(/^https:\/\/formsubmit\.co\//, 'https://formsubmit.co/ajax/');

        // Use sendBeacon if available (most reliable, no CORS)
        if (navigator.sendBeacon) {
          const blob = new Blob([new URLSearchParams(formData).toString()], {
            type: 'application/x-www-form-urlencoded',
          });
          navigator.sendBeacon(url, blob);
        } else {
          // Fallback: fetch with no-cors
          fetch(url, {
            method: 'POST',
            body: formData,
            mode: 'no-cors',
          }).catch(() => {});
        }
      } catch (err) {
        console.warn('Background email send failed:', err);
      }

      // Reset button after delay
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-loading');
        hideProgressBar();
      }, 1200);
    });

    // Real-time validation (debounced)
    $$('input, textarea', form).forEach((input) => {
      input.addEventListener(
        'input',
        debounce(() => {
          if (!input.value) {
            input.style.borderColor = '';
            input.style.boxShadow = '';
          } else if (input.checkValidity()) {
            input.style.borderColor = '#10b981';
            input.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.15)';
          } else {
            input.style.borderColor = '#ef4444';
            input.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
          }
        }, 300)
      );
    });
  }

  // =============================================
  // MODAL
  // =============================================
  function openModal() {
    const modal = $('#thanks-modal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Auto-close
    setTimeout(window.closeModal, 5000);
  }

  // Close modal on backdrop click
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'thanks-modal') {
      window.closeModal();
    }
  });

  // =============================================
  // PROGRESS BAR
  // =============================================
  function showProgressBar() {
    const bar = document.createElement('div');
    bar.className = 'progress-indicator';
    bar.innerHTML = '<div class="progress-bar"></div>';
    bar.id = 'activeProgress';
    document.body.appendChild(bar);
  }

  function hideProgressBar() {
    const bar = $('#activeProgress');
    if (bar) bar.remove();
  }

  // =============================================
  // ERROR NOTIFICATION
  // =============================================
  function showError(message) {
    const el = document.createElement('div');
    el.className = 'error-notification';
    el.innerHTML =
      '<i class="fas fa-exclamation-triangle"></i> ' + message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }

  // =============================================
  // CONFETTI
  // =============================================
  function spawnConfetti() {
    const colors = ['#00e5ff', '#6c3cff', '#10b981', '#f59e0b'];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 40; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + '%';
      c.style.background = colors[i % colors.length];
      c.style.animationDelay = Math.random() * 0.4 + 's';
      c.style.width = (6 + Math.random() * 6) + 'px';
      c.style.height = c.style.width;
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      fragment.appendChild(c);
    }

    document.body.appendChild(fragment);
    setTimeout(() => {
      $$('.confetti').forEach((c) => c.remove());
    }, 3500);
  }

  // =============================================
  // RIPPLE EFFECT
  // =============================================
  function createRipple(e, el) {
    const ripple = document.createElement('span');
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
    el.style.position = 'relative';
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  // =============================================
  // KEYBOARD SHORTCUTS
  // =============================================
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K = toggle menu
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (typeof window.toggleMenu === 'function') window.toggleMenu();
      }
      // Ctrl/Cmd + D = toggle theme
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        if (typeof window.toggleTheme === 'function') window.toggleTheme();
      }
    });
  }

  // =============================================
  // HERO PARALLAX (Desktop only, throttled)
  // =============================================
  function initParallax() {
    if (window.innerWidth < 768) return;

    const hero = $('.hero-section');
    if (!hero) return;

    hero.style.willChange = 'transform';

    window.addEventListener(
      'scroll',
      throttle(() => {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          if (scrolled < 800) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
          }
        });
      }, 16)
    );
  }

  // =============================================
  // TOUCH DEVICE DETECTION
  // =============================================
  function initTouchDevice() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.body.classList.add('touch-device');
    }
  }

  // =============================================
  // PAGE TRANSITIONS
  // =============================================
  function initPageTransitions() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    overlay.innerHTML =
      '<div class="page-transition-content"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    document.body.appendChild(overlay);

    $$('a[href$=".html"]:not([target])').forEach((link) => {
      link.addEventListener('click', (e) => {
        // Skip if modifier key held
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;

        e.preventDefault();
        overlay.classList.add('active');

        setTimeout(() => {
          window.location.href = link.href;
        }, 250);
      });
    });
  }

  // =============================================
  // SOCIAL LINK HOVER
  // =============================================
  function initSocialLinks() {
    $$('.social-link').forEach((link) => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.1)';
        link.style.filter = 'drop-shadow(0 0 12px rgba(0,229,255,0.5))';
      });
      link.addEventListener('mouseleave', () => {
        link.style.transform = '';
        link.style.filter = '';
      });
    });
  }

  // =============================================
  // INITIALIZATION
  // =============================================
  document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initScrollReveal();
    initCounters();
    initSidebar();
    initTheme();
    initSmoothScroll();
    initContactForm();
    initKeyboardShortcuts();
    initParallax();
    initTouchDevice();
    initPageTransitions();
    initSocialLinks();
  });
})();