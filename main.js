// Daniela Tirado Studio — interacciones
(function () {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');

  // Menú móvil
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  document.querySelectorAll('.nav__menu a').forEach(a =>
    a.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', false); })
  );

  // Nav con fondo al hacer scroll
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Aparición al hacer scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // Contadores de estadísticas
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-count]').forEach(el => {
    if (reduce) return;
    const target = +el.dataset.count, prefix = el.dataset.prefix || '';
    let started = false;
    new IntersectionObserver(([e], obs) => {
      if (!e.isIntersecting || started) return;
      started = true; obs.disconnect();
      const t0 = performance.now(), dur = 1200;
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = prefix + Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }).observe(el);
  });

  // Parallax suave del hero (solo escritorio)
  const art = document.querySelector('.hero__art');
  if (art && !reduce && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      art.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
    art.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
