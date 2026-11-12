/* Funky — home: portada, manifiesto, locales, horno, Host Nights, mapa y muro. */
(() => {
  const F = window.FUNKY;
  const P = F.places;
  const $ = (s, r = document) => r.querySelector(s);
  const amp = F.suave ? 0.35 : 1;          // amplitud de la decoración en modo suave

  /* =================== PORTADA =================== */
  const slidesData = [
    { k: 'bakers', lines: ['Your home away', 'from <span class="accent">home</span>'] },
    { k: 'eatery', lines: ['Take a seat,', 'have a <span class="accent">bite</span>'] },
    { k: 'deli', lines: ['Some kind of', '<span class="accent">deli</span> shopping'] },
  ];
  const frame = $('#heroFrame');
  const slidesEl = $('#slides');
  const titles = $('#heroTitles');
  const tabs = $('#heroTabs');
  slidesEl.innerHTML = slidesData.map((s, i) => `<div class="slide" style="z-index:${i === 0 ? 1 : 0}"><img class="slide__img" src="assets/img/ig/${P[s.k].hero}.jpg" alt="" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></div>`).join('');
  titles.insertAdjacentHTML('beforebegin', '<h1 class="sr">Funky: bakery, eatery and deli in Barcelona</h1>');
  titles.innerHTML = slidesData.map((s, i) => `<div class="hero__title display" aria-hidden="true" data-i="${i}">${s.lines.map((l) => `<span class="line"><span>${l}</span></span>`).join('')}</div>`).join('');
  tabs.innerHTML = slidesData.map((s, i) => `<button role="tab" aria-selected="${i === 0}" data-i="${i}">${P[s.k].short}</button>`).join('');
  const slides = [...slidesEl.children];
  const titleEls = [...titles.children];
  titleEls.forEach((t, i) => { if (i) gsap.set(t.querySelectorAll('.line > span'), { yPercent: 110 }); });

  const clip = $('#heroClipPath');
  const ring = $('#ring');
  const eyebrowTxt = $('#heroEyebrowTxt');
  const heroDot = $('#heroDot');
  let cur = 0, busy = false, auto;

  const setEyebrow = (i) => {
    const pl = P[slidesData[i].k];
    const st = F.status(pl);
    eyebrowTxt.textContent = `${pl.name} · ${st.open ? 'Open now' : 'Closed now'}`;
    heroDot.classList.toggle('is-open', st.open);
  };
  setEyebrow(0);

  // Ken Burns lento en la imagen (no en el contenedor, que lo usan la entrada y la transición)
  slides.forEach((s) => gsap.fromTo(s.firstElementChild, { scale: 1 }, { scale: 1 + 0.06 * amp, duration: 14, ease: 'sine.inOut', yoyo: true, repeat: -1 }));

  const go = (i, origin) => {
    if (busy || i === cur) return;
    busy = true;
    const prev = slides[cur], next = slides[i];
    const fr = frame.getBoundingClientRect();
    let cx = fr.width - 60, cy = fr.height / 2;
    if (origin) { const r = origin.getBoundingClientRect(); cx = r.left + r.width / 2 - fr.left; cy = r.top + r.height / 2 - fr.top; }
    const R = Math.hypot(Math.max(cx, fr.width - cx), Math.max(cy, fr.height - cy)) * 1.25;
    const st = { s: 0, r: -25 };
    const draw = () => clip.setAttribute('transform', `translate(${cx} ${cy}) rotate(${st.r}) scale(${st.s})`);
    draw();
    slides.forEach((s) => { if (s !== prev && s !== next) s.style.zIndex = 0; });
    prev.style.zIndex = 1;
    next.style.zIndex = 2;
    next.classList.add('is-revealing');

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        next.classList.remove('is-revealing');   // la mancha ya cubre todo: soltar el recorte no cambia nada a la vista
        prev.style.zIndex = 0; next.style.zIndex = 1;
        st.s = 0; draw();
        busy = false; cur = i; startAuto();
      },
    });
    tl.to(st, { s: R, r: 15, duration: 1.5, onUpdate: draw }, 0)
      .fromTo(next, { scale: 1 + 0.12 * amp }, { scale: 1, duration: 1.6 }, 0)
      .to(prev, { scale: 1 + 0.04 * amp, duration: 1.5 }, 0)
      .set(prev, { scale: 1 }, 1.6)
      .to(titleEls[cur].querySelectorAll('.line > span'), { yPercent: -110, duration: 0.9, stagger: 0.06 }, 0.1)
      .fromTo(titleEls[i].querySelectorAll('.line > span'), { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.08 }, 0.45)
      .to(eyebrowTxt.parentNode, { opacity: 0, duration: 0.4, ease: 'power2.inOut', onComplete: () => setEyebrow(i) }, 0.2)
      .to(eyebrowTxt.parentNode, { opacity: 1, duration: 0.5 }, 0.75);
    [...tabs.children].forEach((b, j) => b.setAttribute('aria-selected', j === i));
    gsap.killTweensOf(ring);
    gsap.to(ring, { strokeDashoffset: 1, duration: 0.6, ease: 'power2.inOut' });
  };

  const startAuto = () => {
    gsap.killTweensOf(ring);
    auto && auto.kill();
    gsap.set(ring, { strokeDashoffset: 1 });
    auto = gsap.to(ring, { strokeDashoffset: 0, duration: F.suave ? 11 : 8, ease: 'none', onComplete: () => go((cur + 1) % slides.length) });
    if (paused) auto.pause();
  };
  let paused = false;
  const pause = (p) => { paused = p; if (auto) p ? auto.pause() : auto.resume(); };
  $('#heroNext').addEventListener('click', (e) => go((cur + 1) % slides.length, e.currentTarget));
  tabs.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) go(+b.dataset.i, b); });
  frame.addEventListener('pointerenter', () => pause(true));
  frame.addEventListener('pointerleave', () => pause(false));
  ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom top', onToggle: (s) => pause(!s.isActive) });

  // Promo
  $('#promoX').addEventListener('click', () => gsap.to('#promo', { y: 30, opacity: 0, duration: 0.6, onComplete: () => $('#promo').remove() }));

  // Entrada (solo si la página carga arriba)
  if (F.atTop) {
    const tl = gsap.timeline({ delay: F.cameWithVeil ? 0.55 : 0.1, defaults: { ease: 'power3.inOut' } });
    tl.from(slides[0], { scale: 1 + 0.2 * amp, duration: 2 }, 0)
      .from(titleEls[0].querySelectorAll('.line > span'), { yPercent: 110, duration: 1.3, stagger: 0.1 }, 0.35)
      .from(['.hero__eyebrow', '.hero__sub', '.hero__order', '.hero__more'], { y: 26, opacity: 0, duration: 1, stagger: 0.08 }, 0.6)
      .from('#heroNext', { scale: 0, rotation: -90, duration: 1 }, 0.9)
      .from('#heroTabs button', { y: 20, opacity: 0, stagger: 0.06, duration: 0.8 }, 1)
      .from('#promo', { y: 40, opacity: 0, duration: 1 }, 1.2)
      .add(startAuto, 1.4);
  } else startAuto();

  // Al bajar: la foto se queda atrás y el texto sube un poco más rápido
  gsap.to('.hero__slides', { yPercent: 12 * amp, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__content', { yPercent: -18 * amp, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* =================== MANIFIESTO =================== */
  const mt = $('#manifestoText');
  mt.innerHTML = mt.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
  gsap.fromTo(mt.querySelectorAll('.w'), { opacity: 0.16 }, {
    opacity: 1, stagger: 0.08, ease: 'none',
    scrollTrigger: { trigger: mt, start: 'top 82%', end: 'bottom 45%', scrub: 0.8 },
  });
  document.querySelectorAll('.floater').forEach((f, i) => {
    const dir = i % 2 ? 1 : -1;
    gsap.fromTo(f, { y: 120 * amp * (i < 2 ? 1 : 0.6), rotation: dir * 10 * amp },
      { y: -140 * amp * (i < 2 ? 0.7 : 1), rotation: -dir * 6 * amp, ease: 'none', scrollTrigger: { trigger: '#manifesto', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });

  /* =================== LOCALES =================== */
  const track = $('#placesTrack');
  const order = ['bakers', 'eatery', 'deli'];
  const shapes = ['blob-1', 'blob-3', 'blob-2'];
  track.innerHTML = order.map((k, i) => {
    const p = P[k];
    const st = F.status(p);
    return `<article class="place place--${p.color}">
      <div class="place__media"><div class="shape ${shapes[i]}"><img src="assets/img/ig/${p.photo}.jpg" alt="${p.name} from the street" loading="lazy"></div></div>
      <div class="place__info">
        <span class="place__num">0${i + 1} / 03 · ${p.kind}</span>
        <h3 class="display h2">${p.short}</h3>
        <p class="lead" style="color:var(--ink)">${p.tagline}</p>
        <span class="place__status"><i class="dot ${st.open ? 'is-open' : ''}"></i>${st.text}</span>
        <span class="place__meta">${p.address} · ${p.area}</span>
        <div><a class="btn" href="${p.url}">Visit the ${p.short.toLowerCase()} ${F.arrow}</a></div>
      </div>
    </article>`;
  }).join('');

  const mm = gsap.matchMedia();
  mm.add('(min-width: 861px)', () => {
    const dist = () => track.scrollWidth - innerWidth;
    const scene = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: '#placesPin', start: 'center center', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true },
    });
    track.querySelectorAll('.place__media img').forEach((img) => {
      gsap.fromTo(img, { xPercent: -6 * amp, scale: 1.14 }, { xPercent: 6 * amp, scale: 1.14, ease: 'none', scrollTrigger: { trigger: img.closest('.place'), containerAnimation: scene, start: 'left right', end: 'right left', scrub: true } });
    });
  });

  /* =================== DEL HORNO =================== */
  const stage = $('#ovenStage');
  const items = [
    ['croissant', 6, 10, -14], ['tarta-de-celebracion-26cm', 70, 6, 8], ['babka-chocolate-y-avellana', 85, 40, 14],
    ['pain-au-chocolat', 2, 46, 10], ['tartaleta-de-limon', 14, 76, -8], ['house-bun', 38, 4, 4],
    ['choco-chip-cookies', 64, 76, -16], ['croissant-de-pistacho', 84, 74, 6], ['tarta-de-queso-12cm', 40, 80, 4],
    ['danish-dulce', 20, 28, 12], ['love-cake', 74, 30, -10],
  ];
  stage.insertAdjacentHTML('beforeend', items.map(([h, x, y, r]) => `<div class="oven__item" style="left:${x}%;top:${y}%" data-r="${r}"><div class="oven__float"><img src="${F.ilus(h)}" alt="" loading="lazy"></div></div>`).join(''));
  const ovenItems = [...stage.querySelectorAll('.oven__item')];
  ovenItems.forEach((it, i) => {
    const r = +it.dataset.r;
    gsap.fromTo(it, { y: () => stage.offsetHeight * (0.55 + (i % 4) * 0.12), rotation: r - 40 * amp, scale: 0.7 },
      { y: 0, rotation: r, scale: 1, ease: 'power1.inOut', scrollTrigger: { trigger: stage, start: 'top 95%', end: 'center 55%', scrub: 1, invalidateOnRefresh: true } });
  });
  if (!F.suave && F.desk) {
    const floats = stage.querySelectorAll('.oven__float');
    floats.forEach((f, i) => gsap.to(f, { y: -10 - (i % 3) * 5, duration: 2.4 + (i % 4) * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.2 }));
    const movers = [...stage.querySelectorAll('.oven__float img')].map((img, i) => ({
      x: gsap.quickTo(img, 'x', { duration: 1.2, ease: 'power3.out' }),
      y: gsap.quickTo(img, 'y', { duration: 1.2, ease: 'power3.out' }),
      k: 10 + (i % 4) * 8,
    }));
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      movers.forEach((m) => { m.x(-nx * m.k * 2); m.y(-ny * m.k * 2); });
    });
  }

  // Tira de productos: arrastrar con el mouse, scroll nativo con el dedo
  const strip = $('#ovenStrip');
  strip.innerHTML = F.bakery.slice(0, 14).map((p) => `<a class="pcard" href="bakers.html" draggable="false">
      <div class="pcard__img"><img src="${F.ilus(p.h)}" alt="${p.n}" loading="lazy"></div>
      <div class="pcard__row"><span>${p.n}</span><span>${F.eur(p.p)}</span></div></a>`).join('');
  F.dragScroll(strip);

  /* =================== HOST NIGHTS =================== */
  const H = F.hostNights.next;
  const SOLD_DEMO = 15;                       // asientos ya vendidos en la demo
  const myBookings = () => { try { return JSON.parse(localStorage.getItem('fk-bookings') || '[]'); } catch (e) { return []; } };
  const seatsLeft = () => Math.max(0, H.seats - SOLD_DEMO - myBookings().reduce((s, b) => s + b.seats, 0));
  $('#hostNext').innerHTML = `
    <div class="poster"><img src="${F.ilus(H.poster)}" alt="Host Nights poster: ${H.title}, ${H.who}" loading="lazy"></div>
    <div>
      <p class="eyebrow" style="color:var(--yolk)">Next · Host Night ${H.nro}</p>
      <h3 class="display h2" style="margin-top:12px">${H.title}</h3>
      <p class="lead">${H.blurb}</p>
      <dl class="hosts__facts">
        <div><dt>When</dt><dd>${H.when}, ${H.time}</dd></div>
        <div><dt>Where</dt><dd>${H.where}</dd></div>
        <div><dt>Menu</dt><dd>${H.menu}</dd></div>
        <div><dt>Ticket</dt><dd>${H.price} € per person</dd></div>
      </dl>
      <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">
        <button class="btn btn--yolk" id="bookBtn">Book a seat ${F.arrow}</button>
        <div class="seats"><span class="seats__bar"><i id="seatBar"></i></span><span id="seatTxt"></span></div>
      </div>
    </div>`;
  const paintSeats = (animate) => {
    const left = seatsLeft();
    $('#seatTxt').textContent = left ? `${left} of ${H.seats} seats left` : 'Sold out';
    gsap.to('#seatBar', { scaleX: left / H.seats, duration: animate ? 1.2 : 0, ease: 'power2.inOut' });
    $('#bookBtn').disabled = !left;
  };
  gsap.set('#seatBar', { scaleX: 0 });
  ScrollTrigger.create({ trigger: '#hostNext', start: 'top 75%', once: true, onEnter: () => paintSeats(true) });
  paintSeats(false);
  gsap.set('#seatBar', { scaleX: 0 });
  // Noches anteriores: archivo en lista; en escritorio el póster sigue al cursor
  $('#hostPast').innerHTML = `<p class="eyebrow archive__label">Past nights</p><ul class="archive">${F.hostNights.past.map((h) => `
    <li class="archive__row" data-src="${F.ilus(h.poster)}"><img class="archive__thumb" src="${F.ilus(h.poster)}" alt="" loading="lazy"><span class="archive__t">${h.title}</span><span class="archive__who">${h.who}</span><span class="archive__when">${h.when}</span></li>`).join('')}</ul>
    <img class="archive__peek" id="peek" src="${F.ilus(F.hostNights.past[0].poster)}" alt="" aria-hidden="true" loading="lazy">`;
  if (F.desk && !F.suave) {
    const peek = $('#peek'), box = $('#hostPast');
    const px = gsap.quickTo(peek, 'x', { duration: 0.6, ease: 'power3.out' }), py = gsap.quickTo(peek, 'y', { duration: 0.6, ease: 'power3.out' });
    gsap.set(peek, { xPercent: -50, yPercent: -50, scale: 0.85, opacity: 0, rotation: -4 });
    box.addEventListener('pointermove', (e) => { const r = box.getBoundingClientRect(); px(e.clientX - r.left); py(e.clientY - r.top); });
    box.querySelectorAll('.archive__row').forEach((row) => row.addEventListener('pointerenter', () => { peek.src = row.dataset.src; gsap.to(peek, { opacity: 1, scale: 1, rotation: 3, duration: 0.5, ease: 'power2.inOut' }); }));
    box.querySelector('.archive').addEventListener('pointerleave', () => gsap.to(peek, { opacity: 0, scale: 0.85, rotation: -4, duration: 0.5, ease: 'power2.inOut' }));
  }

  // Modal de reserva (simulada)
  const modal = $('#modal'), card = $('#modalCard');
  let lastFocus = null;
  const openModal = (html) => {
    lastFocus = document.activeElement;
    card.innerHTML = `<button class="modal__x" data-close aria-label="Close">×</button>${html}`;
    F.lock(true);
    gsap.set(modal, { visibility: 'visible' });
    gsap.to('.modal__bg', { opacity: 1, duration: 0.5 });
    gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.inOut' });
    setTimeout(() => card.querySelector('input, button:not(.modal__x)')?.focus(), 350);
  };
  const closeModal = () => {
    gsap.to('.modal__bg', { opacity: 0, duration: 0.5 });
    gsap.to(card, { opacity: 0, y: 30, scale: 0.97, duration: 0.5, ease: 'power2.inOut', onComplete: () => { gsap.set(modal, { visibility: 'hidden' }); F.lock(false); lastFocus && lastFocus.focus(); } });
  };
  modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.visibility === 'visible') closeModal(); });
  F.openModal = openModal; F.closeModal = closeModal;

  $('#bookBtn').addEventListener('click', () => {
    const max = Math.min(6, seatsLeft());
    openModal(`
      <p class="eyebrow">Host Night ${H.nro}</p>
      <h3 id="modalTitle">${H.title} · ${H.when}</h3>
      <p class="note">${H.time} · ${H.where} · ${H.menu}</p>
      <form id="bookForm" novalidate>
        <label class="field">Your name<input name="name" autocomplete="name" required></label>
        <label class="field">Email<input name="email" type="email" autocomplete="email" required></label>
        <div class="field">Seats
          <div class="stepper"><button type="button" data-d="-1" aria-label="One less">−</button><output id="seatN">2</output><button type="button" data-d="1" aria-label="One more">+</button>
          <span class="note">max ${max}</span></div>
        </div>
        <div class="total"><span>Total</span><b id="bookTotal">${2 * H.price} €</b></div>
        <button class="btn btn--coral" type="submit" style="justify-content:center">Confirm booking</button>
        <p class="note">Demo: nothing is charged or sent. The booking only lives in this browser.</p>
      </form>`);
    let n = Math.min(2, max);
    const paint = () => { $('#seatN').textContent = n; $('#bookTotal').textContent = `${n * H.price} €`; };
    paint();
    card.querySelectorAll('[data-d]').forEach((b) => b.addEventListener('click', () => { n = Math.max(1, Math.min(max, n + +b.dataset.d)); paint(); gsap.fromTo('#seatN', { scale: 1.3 }, { scale: 1, duration: 0.5 }); }));
    $('#bookForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      const bad = [...f.querySelectorAll('input')].find((i) => !i.checkValidity() || !i.value.trim());
      if (bad) { bad.focus(); gsap.fromTo(bad, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, .4)' }); return; }
      const code = 'FK-' + Math.random().toString(36).slice(2, 6).toUpperCase();
      try { localStorage.setItem('fk-bookings', JSON.stringify([...myBookings(), { code, seats: n }])); } catch (err) { /* nada */ }
      const name = f.name.value.trim().split(' ')[0];
      card.innerHTML = `<button class="modal__x" data-close aria-label="Close">×</button>
        <div class="success">
          <svg class="success__blob" viewBox="-1.3 -1.3 2.6 2.6"><path id="okBlob" fill="#F7A51C" d="${F.blobPath(5, 8, 0.24)}"/><path id="okTick" d="M-.42 .02 L-.12 .3 L.45 -.3" fill="none" stroke="#1E1A16" stroke-width=".12" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>
          <h3 id="modalTitle">See you at the table, ${name}!</h3>
          <div class="ticket"><b>${H.title} · Host Night ${H.nro}</b><span>${H.when} · ${H.time}</span><span>${H.where}</span><span>${n} seat${n > 1 ? 's' : ''} · ${n * H.price} € · code ${code}</span></div>
          <button class="btn" data-close>Done</button>
        </div>`;
      gsap.from('#okBlob', { scale: 0, rotation: -60, transformOrigin: '50% 50%', duration: 0.9, ease: 'power3.inOut' });
      gsap.to('#okTick', { strokeDashoffset: 0, duration: 0.6, delay: 0.6, ease: 'power2.inOut' });
      gsap.from('.success > *:not(svg)', { y: 20, opacity: 0, stagger: 0.08, duration: 0.8, delay: 0.3 });
      paintSeats(true);
    });
  });

  /* =================== MAPA =================== */
  const map = $('#map');
  const grid = [];
  for (let i = -6; i <= 16; i++) grid.push(`<line x1="${i * 46}" y1="-300" x2="${i * 46}" y2="1100"/>`, `<line x1="-300" y1="${i * 46}" x2="1100" y2="${i * 46}"/>`);
  map.innerHTML = `<svg viewBox="0 0 800 700" aria-label="Map of the three Funky places" role="img">
    <g id="mapG">
      <rect x="-200" y="-200" width="1200" height="1100" fill="#F1E6D2"/>
      <path d="M560 760 C600 650 700 590 860 540 L900 900 L520 900Z" fill="#BFD3F2"/>
      <text class="map__label" x="700" y="680">Mediterranean</text>
      <g transform="rotate(-45 400 300)" stroke="#fff" stroke-width="7" opacity=".9">${grid.join('')}</g>
      <path d="M170 520 C260 470 360 460 470 470 C560 480 620 520 680 600 L640 660 C560 600 470 590 380 600 C290 610 220 600 170 520Z" fill="#E9DCC3"/>
      <path class="map__street" stroke-width="16" d="M60 420 L560 -80"/>
      <path class="map__street" stroke-width="12" d="M330 640 L520 380"/>
      <path class="map__street" stroke-width="12" d="M120 30 L760 670" opacity=".9"/>
      <ellipse cx="690" cy="520" rx="70" ry="52" fill="#B7D79A"/>
      <text class="map__label" x="650" y="525">Ciutadella</text>
      <text class="map__label" x="200" y="575">Ciutat Vella</text>
      <text class="map__label" transform="translate(150 330) rotate(-45)">Gran Via</text>
      <text class="map__label" transform="translate(380 214) rotate(45)">Bailèn</text>
      <text class="map__label" x="555" y="560">El Born</text>
      <text class="map__label" x="300" y="150">Eixample</text>
      ${order.map((k) => {
        const p = P[k]; const col = { yolk: '#F7A51C', coral: '#F26B4E', blue: '#2F63D6' }[p.color];
        return `<g class="pin-g" data-k="${k}" transform="translate(${p.map.x} ${p.map.y})" tabindex="0" role="button" aria-label="${p.name}">
          <circle class="pin-pulse" r="26" fill="${col}" opacity=".25"/>
          <g class="pin-body"><path d="${F.blobPath(k.length, 7, 0.2)}" transform="scale(17)" fill="${col}"/><circle r="5" fill="#fff"/></g>
          <text x="24" y="5" style="font:600 14px var(--font);fill:#1E1A16">${p.short}</text></g>`;
      }).join('')}
    </g></svg>`;
  map.querySelectorAll('.pin-pulse').forEach((c, i) => { if (!F.suave) gsap.to(c, { scale: 1.6, opacity: 0, duration: 2.2, repeat: -1, ease: 'sine.out', delay: i * 0.5 }); });
  const vlist = $('#vlist');
  const paintList = () => {
    vlist.innerHTML = order.map((k) => {
      const p = P[k]; const st = F.status(p);
      return `<button class="vitem" data-k="${k}">
        <span class="vitem__sw" style="background:var(--${p.color})"></span>
        <span><h4>${p.name}</h4><p><i class="dot ${st.open ? 'is-open' : ''}"></i>${st.text}</p><p>${p.address}</p></span>
        <a href="${p.url}">Visit</a></button>`;
    }).join('');
  };
  paintList();
  setInterval(paintList, 60000);
  const mapG = map.querySelector('#mapG');
  const focusPlace = (k) => {
    vlist.querySelectorAll('.vitem').forEach((v) => v.classList.toggle('is-on', v.dataset.k === k));
    const p = P[k];
    gsap.to(mapG, { scale: 1.3, svgOrigin: `${p.map.x} ${p.map.y}`, duration: 1.2, ease: 'power3.inOut' });
    const body = map.querySelector(`.pin-g[data-k="${k}"] .pin-body`);
    gsap.fromTo(body, { scale: 1 }, { scale: 1.35, duration: 0.45, yoyo: true, repeat: 1, ease: 'power2.inOut', transformOrigin: '50% 50%' });
  };
  vlist.addEventListener('click', (e) => { const b = e.target.closest('.vitem'); if (b && !e.target.closest('a')) focusPlace(b.dataset.k); });
  map.addEventListener('click', (e) => { const g = e.target.closest('.pin-g'); if (g) focusPlace(g.dataset.k); });
  map.addEventListener('keydown', (e) => { const g = e.target.closest('.pin-g'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); focusPlace(g.dataset.k); } });

  /* =================== MURO =================== */
  const half = Math.ceil(F.wall.length / 2);
  const fig = (c) => `<figure><img src="${F.ig(c)}" alt="" loading="lazy"></figure>`;
  $('#wallA').innerHTML = F.wall.slice(0, half).map(fig).join('');
  $('#wallB').innerHTML = F.wall.slice(half).map(fig).join('');
  gsap.fromTo('#wallA', { x: 0 }, { x: () => -($('#wallA').scrollWidth - innerWidth) * 0.6, ease: 'none', scrollTrigger: { trigger: '#wall', start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true } });
  gsap.fromTo('#wallB', { x: () => -($('#wallB').scrollWidth - innerWidth) * 0.6 }, { x: 0, ease: 'none', scrollTrigger: { trigger: '#wall', start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true } });

  F.reveal();
})();
