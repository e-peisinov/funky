/* Funky — página de local (bakers / eatery / deli): portada, menú animado, fotos y siguiente local. */
(() => {
  const F = window.FUNKY;
  const key = document.body.dataset.place;
  const P = F.places[key];
  const $ = (s, r = document) => r.querySelector(s);
  const amp = F.suave ? 0.35 : 1;
  const order = ['bakers', 'eatery', 'deli'];
  const next = F.places[order[(order.indexOf(key) + 1) % 3]];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = F.nowBcn().day;

  const copy = {
    bakers: {
      about: 'Our bakers start before the street wakes up. Croissants, babkas, a danish that changes with the season and the San Sebastián cheesecake from the Bar La Viña recipe. Bread for the week, cakes to order and a red bench outside for the first bite.',
      menuTitle: ['Today on', 'the <span class="accent">counter</span>'],
      menuLead: 'Drawn by hand, baked for real. Prices as on our shop.',
      items: F.bakery, cats: F.bakeryCats,
    },
    eatery: {
      about: 'Breakfast with Turkish roots, lunch to share and, a few nights a season, a Host Night: we hand the kitchen to a chef we love. The wine is natural, the plates get messy, and that’s the point.',
      menuTitle: ['What we’re', '<span class="accent">cooking</span>'],
      menuLead: 'The menu moves with the market. These are the plates you keep asking about.',
      items: F.eatery, cats: F.eateryCats,
    },
    deli: {
      about: 'A corner shop the way we like them: our own coffee roasted in Barcelona, km0 butter and eggs, sandwiches on crystal bread, natural wine and merch by Tiago Majuelos. Fresh flowers every Thursday.',
      menuTitle: ['On the', '<span class="accent">shelves</span>'],
      menuLead: 'A small selection of what you’ll find. Prices as on our shop.',
      items: F.deli, cats: F.deliCats,
    },
  }[key];

  const st = F.status(P);
  const hoursRows = P.hours.map(([o, c], i) => `<tr class="${i === today ? 'is-today' : ''}"><td>${days[i]}</td><td>${F.fmtH(o)} – ${F.fmtH(c)}</td></tr>`).join('');
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(P.name + ', ' + P.address + ', Barcelona')}`;

  $('main').innerHTML = `
  <section class="phero">
    <div class="phero__frame">
      <img src="${F.ig(P.page || P.hero)}" alt="" fetchpriority="high">
      <div class="hero__shade"></div>
      <div class="phero__content">
        <div>
          <p class="eyebrow" style="margin:0 0 18px">${P.kind} · ${P.area}</p>
          <h1 class="display h1" data-lines-hero><span class="line"><span>Funky</span></span><span class="line"><span><span class="accent" style="color:var(--yolk)">${P.short}</span></span></span></h1>
          <p style="margin:18px 0 0;max-width:24em;font-size:19px" class="phero__tag">${P.tagline}</p>
        </div>
        <div class="phero__card">
          <span class="place__status"><i class="dot ${st.open ? 'is-open' : ''}"></i>${st.text}</span>
          <table class="hours" aria-label="Opening hours">${hoursRows}</table>
          <span class="place__meta">${P.address}${P.phone ? ` · ${P.phone}` : ''}</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <a class="btn" href="${maps}" target="_blank" rel="noopener" style="height:42px">Directions</a>
            <a class="btn btn--ghost" href="https://linktr.ee/funkyand.co" target="_blank" rel="noopener" style="height:42px">Order on Glovo</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="wrap pad">
    <p class="manifesto__text" id="about" style="margin:0 auto;text-align:center">${copy.about}</p>
  </section>

  <section class="wrap" id="menu" style="padding-bottom:clamp(90px,12vw,170px)">
    <div class="menu__head">
      <div>
        <h2 class="display h2" data-lines>${copy.menuTitle.map((l) => `<span class="line"><span>${l}</span></span>`).join('')}</h2>
        <p class="lead" data-reveal style="margin-top:16px">${copy.menuLead}</p>
      </div>
      <div class="filters" role="toolbar" aria-label="Filter" id="filters" data-reveal>
        ${copy.cats.map(([id, label], i) => `<button class="chip" aria-pressed="${i === 0}" data-c="${id}">${label}</button>`).join('')}
      </div>
    </div>
    <div class="grid" id="grid" aria-live="polite"></div>
  </section>

  <section class="wall" aria-label="Photos from ${P.name}" style="padding-top:0">
    <div class="wrap places__head"><h2 class="display h3" data-lines><span class="line"><span>Scenes from the ${P.short.toLowerCase()}</span></span></h2></div>
    <div class="wall__row" id="gal"></div>
  </section>

  <a class="next-place place--${next.color}" href="${next.url}">
    <p class="eyebrow">Next door</p>
    <span class="display h2" style="display:block;margin-top:14px">${next.name} ${F.arrow.replace('class="arr"', 'class="arr" style="width:.6em;height:.6em"')}</span>
    <span class="lead" style="display:block;margin-top:14px;color:var(--ink)">${next.tagline}</span>
    <span class="next-place__img blob-2"><img src="${F.ig(next.photo)}" alt="" loading="lazy"></span>
  </a>`;

  /* ---------- Portada ---------- */
  const heroImg = $('.phero__frame > img');
  if (F.atTop) {
    const tl = gsap.timeline({ delay: F.cameWithVeil ? 0.55 : 0.1, defaults: { ease: 'power3.inOut' } });
    tl.from('.phero__frame', { scale: 1 + 0.06 * amp, duration: 1.8 }, 0)
      .from('[data-lines-hero] .line > span', { yPercent: 110, duration: 1.3, stagger: 0.1 }, 0.3)
      .from(['.phero .eyebrow', '.phero__tag'], { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.6)
      .from('.phero__card', { y: 40, opacity: 0, duration: 1.1 }, 0.8);
  }
  gsap.fromTo(heroImg, { yPercent: 0 }, { yPercent: 8 * amp, ease: 'none', scrollTrigger: { trigger: '.phero', start: 'top top', end: 'bottom top', scrub: true } });

  const about = $('#about');
  about.innerHTML = about.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
  gsap.fromTo(about.querySelectorAll('.w'), { opacity: 0.16 }, { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: about, start: 'top 82%', end: 'bottom 50%', scrub: 0.8 } });

  /* ---------- Menú ---------- */
  const grid = $('#grid');
  const card = (it, i) => {
    const photo = !!it.img;
    const src = photo ? F.ig(it.img) : F.ilus(it.h || it.ilus);
    const price = it.p ? `${it.from ? 'from ' : ''}${F.eur(it.p)}` : '';
    return `<button class="mcard" data-i="${i}"><span class="mcard__inner">
      <span class="mcard__img ${photo ? 'is-photo' : 'is-ilus'}"><img src="${src}" alt="" loading="lazy"></span>
      <span class="mcard__txt"><span>${it.n}</span><span>${price}</span></span></span></button>`;
  };
  let current = 'all';
  const list = (c) => copy.items.map((it, i) => [it, i]).filter(([it]) => c === 'all' || it.c === c);
  const paint = () => { grid.innerHTML = list(current).map(([it, i]) => card(it, i)).join(''); };
  paint();
  gsap.from(grid.querySelectorAll('.mcard__inner'), { y: 50, opacity: 0, duration: 1, stagger: 0.05, scrollTrigger: { trigger: grid, start: 'top 85%', once: true } });

  let swapping = false;
  $('#filters').addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b || swapping || b.dataset.c === current) return;
    swapping = true;
    $('#filters').querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', c === b));
    current = b.dataset.c;
    const h0 = grid.offsetHeight;
    gsap.to(grid.querySelectorAll('.mcard__inner'), {
      opacity: 0, y: -16, scale: 0.97, duration: 0.35, stagger: 0.012, ease: 'power2.inOut',
      onComplete: () => {
        paint();
        const h1 = grid.offsetHeight;
        gsap.fromTo(grid, { height: h0 }, { height: h1, duration: 0.6, ease: 'power2.inOut', onComplete: () => { gsap.set(grid, { clearProps: 'height' }); swapping = false; ScrollTrigger.refresh(); } });
        gsap.from(grid.querySelectorAll('.mcard__inner'), { opacity: 0, y: 30, scale: 0.97, duration: 0.7, stagger: 0.035, ease: 'power2.inOut' });
      },
    });
  });

  /* ---------- Ficha (panel lateral) ---------- */
  document.body.insertAdjacentHTML('beforeend', `<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="drawerTitle">
    <div class="drawer__bg" data-close></div><div class="drawer__panel" id="drawerPanel" data-lenis-prevent></div></div>`);
  const drawer = $('#drawer'), panel = $('#drawerPanel');
  gsap.set(panel, { xPercent: 100 });
  let lastFocus;
  const openDrawer = (it) => {
    lastFocus = document.activeElement;
    const photo = !!it.img;
    panel.innerHTML = `<button class="drawer__x" data-close aria-label="Close">×</button>
      <div class="drawer__img" style="background:${photo ? 'var(--cream)' : `var(--${P.color === 'yolk' ? 'yolk' : P.color})`}"><img class="${photo ? 'is-photo' : 'is-ilus'}" src="${photo ? F.ig(it.img) : F.ilus(it.h || it.ilus)}" alt="${it.n}"></div>
      <div class="drawer__body">
        <p class="eyebrow">${P.name}</p>
        <h3 id="drawerTitle">${it.n}</h3>
        <p class="lead">${it.d}</p>
        ${it.p ? `<p style="font-size:28px;font-weight:300;margin:0">${it.from ? 'from ' : ''}${F.eur(it.p)}</p>` : '<p class="note">Price at the counter, it changes with the season.</p>'}
        <p class="note">Ask for it at ${P.address}, or order on Glovo.</p>
      </div>`;
    F.lock(true);
    gsap.set(drawer, { visibility: 'visible' });
    gsap.to('.drawer__bg', { opacity: 1, duration: 0.5 });
    gsap.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.8, ease: 'power3.inOut' });
    gsap.fromTo(panel.querySelector('.drawer__img img'), { scale: 1.15, rotation: photo ? 0 : -10 * amp }, { scale: 1, rotation: 0, duration: 1.1, ease: 'power3.inOut' });
    gsap.from(panel.querySelectorAll('.drawer__body > *'), { y: 24, opacity: 0, duration: 0.8, stagger: 0.06, delay: 0.3 });
    setTimeout(() => panel.querySelector('.drawer__x').focus(), 400);
  };
  const closeDrawer = () => {
    gsap.to('.drawer__bg', { opacity: 0, duration: 0.5 });
    gsap.to(panel, { xPercent: 100, duration: 0.7, ease: 'power3.inOut', onComplete: () => { gsap.set(drawer, { visibility: 'hidden' }); F.lock(false); lastFocus && lastFocus.focus(); } });
  };
  grid.addEventListener('click', (e) => { const b = e.target.closest('.mcard'); if (b) openDrawer(copy.items[+b.dataset.i]); });
  drawer.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeDrawer(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.style.visibility === 'visible') closeDrawer(); });

  /* ---------- Fotos ---------- */
  const gal = $('#gal');
  gal.innerHTML = F.galleries[key].map((c, i) => `<figure style="transform:rotate(${i % 2 ? 2 : -2}deg)"><img src="${F.ig(c)}" alt="" loading="lazy"></figure>`).join('');
  gsap.fromTo(gal, { x: () => innerWidth * 0.1 }, { x: () => -(gal.scrollWidth - innerWidth * 0.9), ease: 'none', scrollTrigger: { trigger: gal, start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true } });

  /* ---------- Siguiente local ---------- */
  gsap.fromTo('.next-place__img', { yPercent: -42, rotation: -4 }, { yPercent: -58, rotation: 10 * amp, ease: 'none', scrollTrigger: { trigger: '.next-place', start: 'top bottom', end: 'bottom top', scrub: 1 } });

  F.reveal();
})();
