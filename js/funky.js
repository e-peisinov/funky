/* Funky — base compartida: Lenis, cabecera, pie, manchas, transición entre páginas y entradas. */
(() => {
  const F = window.FUNKY;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  F.suave = reduce;                      // modo suave: todo corre, pero sin Lenis, menos zoom y decoración quieta
  F.desk = matchMedia('(min-width: 861px)').matches;
  F.atTop = window.scrollY < 40;         // las entradas solo corren si la página carga arriba
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power2.inOut', duration: 1 });

  /* ---------- Manchas: contorno orgánico cerrado alrededor de (0,0), radio ~1 ---------- */
  F.blobPath = (seed = 1, n = 7, wob = 0.16) => {
    let s = seed * 9301 + 49297;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const r = 1 - wob / 2 + rnd() * wob;
      pts.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    let d = `M${pts[0][0].toFixed(3)},${pts[0][1].toFixed(3)}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(3)},${c1[1].toFixed(3)} ${c2[0].toFixed(3)},${c2[1].toFixed(3)} ${p2[0].toFixed(3)},${p2[1].toFixed(3)}`;
    }
    return d + 'Z';
  };

  const defs = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <defs>
      <clipPath id="blob1" clipPathUnits="objectBoundingBox"><path d="M0.5,0.02 C0.74,0.0 0.97,0.16 0.98,0.42 C0.99,0.66 0.86,0.96 0.56,0.98 C0.28,1.0 0.03,0.84 0.02,0.56 C0.01,0.3 0.24,0.04 0.5,0.02 Z"/></clipPath>
      <clipPath id="blob2" clipPathUnits="objectBoundingBox"><path d="M0.18,0.06 C0.36,-0.02 0.52,0.1 0.7,0.04 C0.9,-0.02 1.0,0.2 0.97,0.4 C0.94,0.58 1.02,0.74 0.92,0.88 C0.8,1.04 0.6,0.94 0.42,0.98 C0.22,1.02 0.02,0.92 0.03,0.7 C0.04,0.52 -0.03,0.36 0.04,0.22 C0.08,0.13 0.1,0.1 0.18,0.06 Z"/></clipPath>
      <clipPath id="blob3" clipPathUnits="objectBoundingBox"><path d="M0.1,0.2 C0.2,0.02 0.5,0.0 0.72,0.06 C0.95,0.12 1.0,0.38 0.94,0.58 C0.88,0.8 0.98,0.96 0.72,0.99 C0.5,1.02 0.44,0.86 0.26,0.9 C0.06,0.94 -0.02,0.74 0.02,0.52 C0.04,0.38 0.02,0.32 0.1,0.2 Z"/></clipPath>
      <clipPath id="blob4" clipPathUnits="objectBoundingBox"><path d="M0.5,0.0 C0.8,0.0 1.0,0.2 1.0,0.46 L1.0,0.86 C1.0,0.96 0.94,1.0 0.84,1.0 L0.16,1.0 C0.06,1.0 0.0,0.96 0.0,0.86 L0.0,0.46 C0.0,0.2 0.2,0.0 0.5,0.0 Z"/></clipPath>
      <clipPath id="heroClip" clipPathUnits="userSpaceOnUse"><path id="heroClipPath" d="${F.blobPath(3, 8, 0.22)}" transform="translate(0 0) scale(0)"/></clipPath>
    </defs>
  </svg>`;
  document.body.insertAdjacentHTML('afterbegin', defs);

  /* ---------- Cabecera y pie (iguales en todas las páginas) ---------- */
  const page = document.body.dataset.page;
  const logo = `<a class="logo" href="index.html" aria-label="Funky, home"><span>Funky</span>
    <svg viewBox="0 0 26 40" aria-hidden="true"><path d="M6 1 C20 4 27 16 24 28 C22 35 16 39 10 40 C16 30 16 14 6 1Z" fill="#F7A51C"/></svg></a>`;
  const navLinks = [['bakers.html', 'Bakers'], ['eatery.html', 'Eatery'], ['deli.html', 'Deli'], ['index.html#host-nights', 'Host Nights'], ['index.html#cakes', 'Cakes']];
  const arrow = '<svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  F.arrow = arrow;
  document.body.insertAdjacentHTML('afterbegin', `
  <header class="nav ${page === 'home' || page === 'place' ? '' : 'is-solid'}" id="nav">
    <div class="nav__bg"></div>
    ${logo}
    <nav class="nav__links" aria-label="Main">${navLinks.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav>
    <div class="nav__cta">
      <a class="btn btn--ghost" href="index.html#visit">Find us</a>
      <a class="btn btn--yolk" href="https://linktr.ee/funkyand.co" target="_blank" rel="noopener">Order on Glovo</a>
      <button class="nav__burger" id="burger" aria-label="Open menu" aria-expanded="false"><i></i></button>
    </div>
  </header>
  <div class="menu-sheet" id="sheet" aria-hidden="true">
    <button class="x" id="sheetX" aria-label="Close menu">×</button>
    ${navLinks.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}
    <a href="index.html#visit">Find us</a>
  </div>
  <div class="veil" id="veil" aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path id="veilPath" fill="#F7A51C" d="${F.blobPath(7, 9, 0.2)}" transform="translate(50 50) scale(0)"/></svg></div>`);

  const foot = document.getElementById('footer');
  if (foot) {
    const P = F.places;
    foot.outerHTML = `
    <div class="marquee" aria-hidden="true"><div class="marquee__inner" id="marquee">${'<span>people</span><span>places</span><span>plates</span><span>born to gather</span>'.repeat(4)}</div></div>
    <footer class="footer">
      <div class="footer__grid">
        <div><p class="h3 display" style="max-width:9em">Your home away from home, in three addresses.</p></div>
        ${['bakers', 'eatery', 'deli'].map((k) => `<div><h4>${P[k].name}</h4><ul><li>${P[k].address}</li><li>${P[k].area}</li>${P[k].phone ? `<li>${P[k].phone}</li>` : ''}<li><a href="${P[k].url}">Visit →</a></li></ul></div>`).join('')}
      </div>
      <div class="footer__big" aria-hidden="true">Funky</div>
      <div class="footer__small">
        <span>Test site · not affiliated with Funky Bakers. Photos © Funky.</span>
        <span><a href="https://www.instagram.com/funkyand.co/" target="_blank" rel="noopener">Instagram</a> · <a href="https://linktr.ee/funkyand.co" target="_blank" rel="noopener">Linktree</a></span>
      </div>
    </footer>`;
  }

  /* ---------- Lenis ---------- */
  let lenis = null;
  if (!F.suave) {
    lenis = new Lenis({ duration: 1.15, anchors: { offset: -80 } });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  F.lenis = lenis;
  F.lock = (on) => { if (lenis) on ? lenis.stop() : lenis.start(); document.documentElement.style.overflow = on ? 'hidden' : ''; };

  /* ---------- Cabecera sólida al bajar ---------- */
  const nav = document.getElementById('nav');
  const navBg = nav.querySelector('.nav__bg');
  const startSolid = nav.classList.contains('is-solid');
  if (startSolid) gsap.set(navBg, { opacity: 1, y: 0 });
  else {
    let solid = null;
    const setSolid = (on) => {
      if (on === solid) return;
      solid = on;
      nav.classList.toggle('is-solid', on);
      gsap.to(navBg, { opacity: on ? 1 : 0, y: on ? 0 : -12, duration: 0.6, overwrite: true });
    };
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (st) => setSolid(st.scroll() > innerHeight * 0.75) });
    setSolid(window.scrollY > innerHeight * 0.75);
  }

  /* ---------- Menú móvil ---------- */
  const sheet = document.getElementById('sheet');
  const burger = document.getElementById('burger');
  const openSheet = (open) => {
    burger.setAttribute('aria-expanded', open);
    sheet.setAttribute('aria-hidden', !open);
    F.lock(open);
    if (open) gsap.set(sheet, { visibility: 'visible' });
    gsap.to(sheet, {
      clipPath: open ? 'circle(150% at calc(100% - 44px) 44px)' : 'circle(0% at calc(100% - 44px) 44px)',
      duration: 0.8, ease: 'power3.inOut',
      onComplete: () => { if (!open) gsap.set(sheet, { visibility: 'hidden' }); },
    });
    if (open) gsap.fromTo(sheet.querySelectorAll('a'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, delay: 0.25 });
  };
  burger.addEventListener('click', () => openSheet(true));
  document.getElementById('sheetX').addEventListener('click', () => openSheet(false));
  sheet.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => openSheet(false)));

  /* ---------- Transición entre páginas: mancha que cubre y descubre ---------- */
  const veil = document.getElementById('veil');
  const vp = document.getElementById('veilPath');
  const veilState = { x: 50, y: 50, s: 0, r: 0 };
  const drawVeil = () => vp.setAttribute('transform', `translate(${veilState.x} ${veilState.y}) rotate(${veilState.r}) scale(${veilState.s})`);
  const veilColors = { 'bakers.html': '#F7A51C', 'eatery.html': '#F26B4E', 'deli.html': '#2F63D6', 'index.html': '#F7A51C' };
  try {
    const came = sessionStorage.getItem('fk-veil');
    if (came) {
      const v = JSON.parse(came);
      sessionStorage.removeItem('fk-veil');
      vp.setAttribute('fill', v.c);
      Object.assign(veilState, { x: 50, y: 50, s: 120, r: 0 });
      drawVeil();
      gsap.set(veil, { visibility: 'visible' });
      F.cameWithVeil = true;
      gsap.to(veilState, { s: 0, r: 40, duration: 1.1, ease: 'power3.inOut', delay: 0.15, onUpdate: drawVeil, onComplete: () => gsap.set(veil, { visibility: 'hidden' }) });
    }
  } catch (e) { /* sin sessionStorage, sin transición */ }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const href = a.getAttribute('href');
    if (!/\.html(#.*)?$/.test(href)) return;
    const [file, hash] = href.split('#');
    const here = location.pathname.split('/').pop() || 'index.html';
    if (file === here) {                       // ancla en la misma página
      if (hash) { e.preventDefault(); lenis ? lenis.scrollTo('#' + hash, { offset: -80 }) : document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }); }
      return;
    }
    e.preventDefault();
    const c = veilColors[file] || '#F7A51C';
    vp.setAttribute('fill', c);
    Object.assign(veilState, { x: (e.clientX / innerWidth) * 100 || 50, y: (e.clientY / innerHeight) * 100 || 50, s: 0, r: -30 });
    drawVeil();
    gsap.set(veil, { visibility: 'visible' });
    try { sessionStorage.setItem('fk-veil', JSON.stringify({ c })); } catch (err) { /* nada */ }
    gsap.to(veilState, { s: 150, r: 0, duration: 0.95, ease: 'power3.inOut', onUpdate: drawVeil, onComplete: () => { location.href = href; } });
  });
  window.addEventListener('pageshow', (e) => { if (e.persisted) { veilState.s = 0; drawVeil(); gsap.set(veil, { visibility: 'hidden' }); } });

  /* ---------- Entradas al aparecer ---------- */
  F.reveal = (root = document) => {
    root.querySelectorAll('[data-reveal]').forEach((el) => {
      if (el.dataset.revealed) return;
      el.dataset.revealed = 1;
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.9 && !F.atTop) return;     // ya estaba en pantalla al recargar: queda como está
      gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease: 'power2.inOut', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    root.querySelectorAll('[data-lines]').forEach((el) => {
      if (el.dataset.revealed) return;
      el.dataset.revealed = 1;
      const spans = el.querySelectorAll('.line > span');
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.9 && !F.atTop) return;
      gsap.from(spans, { yPercent: 110, duration: 1.2, stagger: 0.09, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
    });
  };

  /* ---------- Tiras horizontales: arrastre con mouse (el dedo usa el scroll nativo) ---------- */
  F.dragScroll = (el) => {
    let down = false, moved = 0, x0 = 0, s0 = 0, v = 0, last = 0, raf;
    el.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = 0; x0 = e.clientX; s0 = el.scrollLeft; last = e.clientX; v = 0; cancelAnimationFrame(raf);
    });
    window.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - x0; moved = Math.max(moved, Math.abs(dx));
      if (moved > 4) el.classList.add('is-drag');
      el.scrollLeft = s0 - dx; v = e.clientX - last; last = e.clientX;
    });
    window.addEventListener('pointerup', () => {
      if (!down) return; down = false;
      const glide = () => { el.scrollLeft -= v; v *= 0.93; if (Math.abs(v) > 0.4) raf = requestAnimationFrame(glide); else el.classList.remove('is-drag'); };
      glide();
    });
    el.addEventListener('click', (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
  };

  /* ---------- Marquesina del pie, empujada por la velocidad del scroll ---------- */
  const mq = document.getElementById('marquee');
  if (mq) {
    const half = () => mq.scrollWidth / 2;
    let x = 0, boost = 0;
    gsap.ticker.add((t, dt) => {
      const v = lenis ? lenis.velocity : 0;
      boost += (Math.min(Math.abs(v), 40) * 0.08 - boost) * 0.1;
      x -= (F.suave ? 0.25 : 0.6 + boost) * (dt / 16.7);
      if (-x > half()) x += half();
      mq.style.transform = `translate3d(${x}px,0,0)`;
    });
  }

  /* ---------- Medidas al cargar fuentes e imágenes ---------- */
  F.refresh = () => ScrollTrigger.refresh();
  document.fonts && document.fonts.ready.then(F.refresh);
  window.addEventListener('load', F.refresh);
  let lastW = innerWidth, tRef;
  window.addEventListener('resize', () => {           // solo cambios de ancho: la barra del celular no recalcula nada
    if (innerWidth === lastW) return;
    lastW = innerWidth; clearTimeout(tRef); tRef = setTimeout(F.refresh, 250);
  });
})();
