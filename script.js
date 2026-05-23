/* ============================================================
   SAMEER TRIVEDI — PORTFOLIO SCRIPT
   ============================================================ */

'use strict';

// ── NAVBAR: scroll state ────────────────────────────────────
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

// ── HAMBURGER MENU ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ── SMOOTH SCROLL (with nav offset) ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = navbar.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── REVEAL ON SCROLL (IntersectionObserver) ─────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

// ── ACTIVE NAV LINK on scroll ───────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));

// ── TERMINAL TYPEWRITER (About section) ─────────────────────
function typewriterEffect() {
  const terminalBody = document.querySelector('.terminal-body');
  if (!terminalBody) return;

  const lines = [
    { text: '{', class: 'json-brace' },
    { text: '  ', plain: true },
    { text: '"name"', class: 'json-key' },
    { text: ': ', plain: true },
    { text: '"Sameer Trivedi"', class: 'json-str' },
    { text: ',', plain: true },
    { newline: true },
    { text: '  ', plain: true },
    { text: '"role"', class: 'json-key' },
    { text: ': ', plain: true },
    { text: '"AI Product Engineer"', class: 'json-str' },
    { text: ',', plain: true },
    { newline: true },
    { text: '  ', plain: true },
    { text: '"focus"', class: 'json-key' },
    { text: ': [', plain: true },
    { newline: true },
    { text: '    ', plain: true },
    { text: '"Full Stack Dev"', class: 'json-str' },
    { text: ',', plain: true },
    { newline: true },
    { text: '    ', plain: true },
    { text: '"Developer Tools"', class: 'json-str' },
    { text: ',', plain: true },
    { newline: true },
    { text: '    ', plain: true },
    { text: '"Fintech"', class: 'json-str' },
    { newline: true },
    { text: '  ],', plain: true },
    { newline: true },
    { text: '  ', plain: true },
    { text: '"currently"', class: 'json-key' },
    { text: ': ', plain: true },
    { text: '"Building things worth using"', class: 'json-str' },
    { text: ',', plain: true },
    { newline: true },
    { text: '  ', plain: true },
    { text: '"open_to"', class: 'json-key' },
    { text: ': ', plain: true },
    { text: 'true', class: 'json-bool' },
    { newline: true },
    { text: '}', class: 'json-brace' },
  ];

  // Check if terminal is in view before starting
  const card = document.querySelector('.terminal-card');
  if (!card) return;

  let started = false;

  const termObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      termObserver.disconnect();
      runTypewriter(terminalBody, lines);
    }
  }, { threshold: 0.5 });

  termObserver.observe(card);
}

function runTypewriter(container, lines) {
  container.innerHTML = '';
  let i = 0;

  function next() {
    if (i >= lines.length) return;
    const token = lines[i++];

    if (token.newline) {
      container.appendChild(document.createTextNode('\n'));
    } else if (token.plain) {
      container.appendChild(document.createTextNode(token.text));
    } else {
      const span = document.createElement('span');
      span.className = token.class;
      span.textContent = '';
      container.appendChild(span);

      let charIdx = 0;
      const text = token.text;
      const interval = setInterval(() => {
        span.textContent += text[charIdx++];
        if (charIdx >= text.length) {
          clearInterval(interval);
          setTimeout(next, 12);
        }
      }, 22);
      return;
    }
    setTimeout(next, 6);
  }

  next();
}

// ── HERO TYPEWRITER ─────────────────────────────────────────
function heroTypewriter() {
  const prefix  = document.getElementById('hero-prefix');
  const name    = document.getElementById('hero-name');
  const cursor  = document.getElementById('hero-cursor');
  if (!prefix || !name || !cursor) return;

  const fullText   = "Hi, I'm ";
  const nameText   = "Sameer";
  let   idx        = 0;
  let   nameIdx    = 0;
  let   phase      = 'prefix'; // 'prefix' → 'name' → 'done'

  // slight delay so the badge reveal animation settles first
  setTimeout(() => {
    const interval = setInterval(() => {
      if (phase === 'prefix') {
        prefix.textContent += fullText[idx++];
        if (idx >= fullText.length) { phase = 'name'; }
      } else if (phase === 'name') {
        name.textContent += nameText[nameIdx++];
        if (nameIdx >= nameText.length) {
          phase = 'done';
          clearInterval(interval);
          // keep cursor blinking for 1.8 s then hide it
          setTimeout(() => cursor.classList.add('hidden'), 1800);
        }
      }
    }, 68); // comfortable reading speed
  }, 500);
}

heroTypewriter();

// ── PROJECT CARD: card glow follows cursor ──────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector('.card-glow');
    if (glow) {
      glow.style.left = `${x - 100}px`;
      glow.style.top  = `${y - 100}px`;
    }
  });
});

// ── NAV ACTIVE STYLE ────────────────────────────────────────
// Inject minimal active style dynamically
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--on-surface); background: rgba(255,255,255,0.05); }`;
document.head.appendChild(style);

// ── REDUCE MOTION: respect user preference ──────────────────
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('visible');
  });
}

// ── EMAIL COPY ───────────────────────────────────────────────
function copyEmail() {
  navigator.clipboard.writeText('sameertrivedi.28170@gmail.com').then(() => {
    const label = document.getElementById('emailBtnLabel');
    const btn   = document.getElementById('emailCopyBtn');
    label.textContent = 'Copied to clip!';
    btn.style.borderColor = 'var(--secondary)';
    btn.style.color       = 'var(--secondary)';
    setTimeout(() => {
      label.textContent   = 'Email Me';
      btn.style.borderColor = '';
      btn.style.color       = '';
    }, 2000);
  });
}
