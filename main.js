// Daniela Tirado Studio — interacciones
(function () {
  /* ============================================================
     CONFIGURACIÓN DEL FORMULARIO
     Los mensajes se envían con FormSubmit (formsubmit.co), gratis
     y sin servidor. El primer envío manda un correo de activación
     a este correo: ábrelo y haz clic en "Activate Form" una vez.
     ============================================================ */
  const CORREO_DESTINO = 'hola@danielatiradostudio.com';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');

  // ---------- Menú móvil ----------
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  document.querySelectorAll('.nav__menu a').forEach(a =>
    a.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', false); })
  );
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Animación al hacer scroll ----------
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    : null;
  const observe = root => root.querySelectorAll('.reveal:not(.in)').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  // ---------- Portafolio ----------
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const card = (p, i) => `
    <a class="project reveal" style="--d:${(i % 2) * 0.1}s" href="${esc(p.url)}" target="_blank" rel="noopener">
      <div class="project__img">${p.imagen
        ? `<img src="${esc(p.imagen)}" alt="Sitio web de ${esc(p.nombre)}" loading="lazy" width="1200" height="750">`
        : `<div class="project__ph"><span class="project__ph-glyph">&lt;/&gt;</span><span class="project__ph-name">${esc(p.nombre)}</span><span class="project__ph-url">${esc(p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</span></div>`}</div>
      <div class="project__meta"><h3>${esc(p.nombre)}</h3><span class="tags"><span class="tag tag--brand">${esc(p.plataforma)}</span><span class="tag">${esc(p.pais)} · ${esc(p.categoria)}</span></span></div>
      <p>${esc(p.descripcion)}</p>
    </a>`;

  const data = window.PORTAFOLIO || [];
  const featured = document.querySelector('[data-portfolio="featured"]');
  if (featured) {
    featured.innerHTML = data.filter(p => p.destacado).slice(0, 4).map(card).join('');
  }

  const grid = document.querySelector('[data-portfolio="all"]');
  const filters = document.getElementById('filters');
  if (grid && filters) {
    const cats = ['Todos', ...new Set(data.map(p => p.categoria))];
    const count = c => c === 'Todos' ? data.length : data.filter(p => p.categoria === c).length;
    filters.innerHTML = cats.map(c =>
      `<button type="button" class="filter" data-cat="${esc(c)}" aria-pressed="${c === 'Todos'}">${esc(c)}<span class="count">${count(c)}</span></button>`
    ).join('');
    const render = cat => {
      const list = cat === 'Todos' ? data : data.filter(p => p.categoria === cat);
      grid.innerHTML = list.map(card).join('');
      grid.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      document.getElementById('empty').classList.toggle('hidden', list.length > 0);
    };
    filters.addEventListener('click', e => {
      const b = e.target.closest('.filter');
      if (!b) return;
      filters.querySelectorAll('.filter').forEach(x => x.setAttribute('aria-pressed', x === b));
      render(b.dataset.cat);
    });
    render('Todos');
  }

  observe(document);

  // ---------- Contadores ----------
  document.querySelectorAll('[data-count]').forEach(el => {
    if (reduce || !io) return;
    const target = +el.dataset.count, prefix = el.dataset.prefix || '';
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now(), dur = 1200;
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = prefix + Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    obs.observe(el);
  });

  // ---------- Parallax suave del hero ----------
  const art = document.querySelector('.hero__art');
  if (art && !reduce && window.matchMedia('(pointer:fine)').matches) {
    art.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      art.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

  // ---------- Formulario de contacto ----------
  const form = document.getElementById('contact-form');
  if (form) {
    const status = form.querySelector('.form__status');
    const show = (type, msg) => {
      status.className = 'form__status is-' + type;
      status.innerHTML = `<svg class="icon"><use href="#i-${type === 'ok' ? 'check' : 'alert'}"/></svg><span>${msg}</span>`;
    };
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const fd = new FormData(form);
      if (fd.get('_honey')) return; // bot
      const payload = Object.fromEntries(fd.entries());
      delete payload._honey;
      Object.assign(payload, {
        _subject: `Nuevo contacto web: ${payload.nombre} — ${payload.servicio}`,
        _replyto: payload.email,
        _template: 'table',
        _captcha: 'false'
      });

      form.classList.add('is-sending');
      const btn = form.querySelector('button[type="submit"]');
      const label = btn.innerHTML;
      btn.textContent = 'Enviando…';
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${CORREO_DESTINO}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.success === 'false' || json.success === false) throw new Error(json.message || 'Error');
        form.reset();
        show('ok', '¡Gracias! Recibimos tu mensaje y te escribimos en menos de 24 horas hábiles.');
      } catch (err) {
        show('error', 'No pudimos enviar el mensaje. Escríbenos por <a href="https://wa.me/573226258475" target="_blank" rel="noopener">WhatsApp</a> o a <a href="mailto:' + CORREO_DESTINO + '">' + CORREO_DESTINO + '</a>.');
      } finally {
        form.classList.remove('is-sending');
        btn.innerHTML = label;
      }
    });
  }

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
