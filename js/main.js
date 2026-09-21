document.addEventListener('DOMContentLoaded', () => {

  // Navbar scroll state
  const navbar = document.querySelector('.navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  const toggle   = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    const spans = toggle.querySelectorAll('span');
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      spans[0].style.transform = open ? 'translateY(6px) rotate(45deg)' : '';
      spans[1].style.opacity   = open ? '0' : '';
      spans[2].style.transform = open ? 'translateY(-6px) rotate(-45deg)' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // Active nav link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Scroll fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Contact form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = form.querySelector('[name="name"]').value.trim();
      const email   = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();
      if (!name || !email || !message) return;

      const btn = form.querySelector('.btn');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
      }, 1100);
    });
  }

});
