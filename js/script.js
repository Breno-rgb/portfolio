/* ===================================================
   Portfólio — Breno Santos
   =================================================== */

// --- Footer year ---
document.getElementById('footer-year').textContent = new Date().getFullYear();

// --- Nav: adiciona classe .scrolled ao rolar ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
}, { passive: true });

// --- Nav: marca link ativo conforme seção visível ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
}

// --- Typing effect no hero ---
const roles = [
  'Desenvolvedor Front-end',
  'Estudante de ADS',
  'Apaixonado por dados',
  'Em busca da primeira vaga',
];

let roleIndex = 0;
let charIndex  = 0;
let isDeleting = false;
const typedEl  = document.getElementById('typed-role');

function type() {
  const current = roles[roleIndex];

  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    // pausa antes de deletar
    setTimeout(() => { isDeleting = true; type(); }, 2000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex  = (roleIndex + 1) % roles.length;
  }

  const speed = isDeleting ? 50 : 80;
  setTimeout(type, speed);
}

// Inicia após a animação do hero
setTimeout(type, 1200);

// --- Scroll reveal para as seções ---
const revealEls = document.querySelectorAll(
  '.sobre-grid, .skills-grid, .projetos-grid, .contato-headline, .contato-sub, .contato-links'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));

// --- Cards de projeto: reveal com delay escalonado ---
const cards = document.querySelectorAll('.projeto-card');
cards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
  card.classList.add('reveal');
  observer.observe(card);
});

// --- Smooth scroll para links da nav (fallback extra) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
