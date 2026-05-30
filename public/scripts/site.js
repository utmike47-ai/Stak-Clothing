// STAK — site interactions

const nav = document.getElementById('nav');
const onScroll = () => {
  if (!nav) return;
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const menu = document.getElementById('mobile-menu');
const menuToggle = document.querySelector('[data-menu-open]');
const menuClose = document.querySelector('[data-menu-close]');

const openMenu = () => {
  menu?.classList.add('open');
  menuToggle?.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
};
const closeMenu = () => {
  menu?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
};

menuToggle?.addEventListener('click', openMenu);
menuClose?.addEventListener('click', closeMenu);
menu?.addEventListener('click', (e) => {
  if (e.target === menu) closeMenu();
});
menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Reveal-on-scroll
const revealTargets = document.querySelectorAll(
  '.story-text, .story-image, .drop-header, .product, .ed-card, .pillar, .journal-card, .signup-inner, .page-hero, .product-detail'
);
revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
revealTargets.forEach((el) => io.observe(el));

// Cart count
let cartCount = 0;
const cartEl = document.querySelector('.cart-count');

const bumpCart = () => {
  cartCount += 1;
  if (cartEl) {
    cartEl.textContent = String(cartCount);
    cartEl.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.4)' },
        { transform: 'scale(1)' },
      ],
      { duration: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
  }
};

document.querySelectorAll('[data-add-to-cart]').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (btn.hasAttribute('disabled')) return;
    e.preventDefault();
    bumpCart();
  });
});

document.querySelectorAll('.product-media').forEach((media) => {
  if (media.closest('[data-add-to-cart]')) return;
  media.addEventListener('click', (e) => {
    const href = media.getAttribute('href');
    if (!href || href === '#') {
      e.preventDefault();
      bumpCart();
    }
  });
});

// Hero parallax
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');
if (hero && heroBg && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener(
    'scroll',
    () => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const y = Math.min(window.scrollY * 0.25, 200);
        heroBg.style.transform = `translateY(${y}px)`;
      }
    },
    { passive: true }
  );
}

// Newsletter
document.querySelectorAll('.signup-form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = form.querySelector('.signup-status');
    const input = form.querySelector('input');
    if (status) status.textContent = "You're in. Watch your inbox.";
    if (input) input.value = '';
  });
});
