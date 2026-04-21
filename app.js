/* ═══════════════════════════════════
   MLD Sustainability Explainer — app.js
═══════════════════════════════════ */

// Loading Screen → Reveal App
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hide');
    document.getElementById('mainNav').classList.add('show');
    document.getElementById('mainApp').classList.add('show');
    document.getElementById('tabBar').classList.add('show');

    // Trigger hero counters after reveal
    setTimeout(animateCounters, 400);
  }, 3200);

  // Intersection Observer for scroll-reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger animations slightly
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
          // Animate param bars when visible
          const bar = entry.target.querySelector('.param-bar-fill');
          if (bar) {
            bar.style.width = bar.dataset.width;
          }
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  // Assign stagger delays to cards
  document.querySelectorAll('.anim-in').forEach((el, i) => {
    el.dataset.delay = Math.min(i * 60, 400);
    observer.observe(el);
  });
});

// Counter animation for hero stats
function animateCounters() {
  document.querySelectorAll('.hero-stat-val').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 1200;
    const start = performance.now();
    
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// Tab navigation smooth scroll
function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // Update active tab
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');
}

// Scroll-based active tab highlighting
window.addEventListener('scroll', () => {
  const sections = [
    { sel: '.hero-section', idx: 0 },
    { sel: '.params-section', idx: 1 },
    { sel: '.co2-section', idx: 2 },
    { sel: '.impact-section', idx: 3 },
    { sel: '.offset-section', idx: 4 }
  ];
  const scrollY = window.scrollY + 200;
  let activeIdx = 0;

  sections.forEach(s => {
    const el = document.querySelector(s.sel);
    if (el && el.offsetTop <= scrollY) activeIdx = s.idx;
  });

  document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === activeIdx);
  });
});
