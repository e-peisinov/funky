/* Funky — "Arma tu tarta": opciones y precios reales de la Celebration Cake del Shopify. */
(() => {
  const F = window.FUNKY;
  const C = F.cake;
  const svg = document.getElementById('cakeSvg');
  const steps = document.getElementById('cakeSteps');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs = {}, parent = svg) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); parent.appendChild(n); return n; };

  const state = { size: 26, sponge: 'vanilla', cream: 'mascarpone', topping: 'fruits', msg: '', where: 'bakers', date: '' };
  const widthFor = { 18: 210, 26: 262, 40: 330 };
  const stageBg = { mascarpone: '#FFE3B0', chocolate: '#F1CDB8', dulce: '#F8D6A6', raspberry: '#F7BFCC' };
  const geo = { w: widthFor[26] };
  const CX = 200, BASE = 312;
  const LAYERS = [['sponge', 52], ['cream', 14], ['sponge', 52], ['top', 13]];

  /* ---------- Dibujo ---------- */
  const plate = el('ellipse', { cx: CX, cy: BASE + 8, fill: '#FFFCF6' });
  const plateRim = el('ellipse', { cx: CX, cy: BASE + 4, fill: '#fff', opacity: 0.9 });
  const shadow = el('ellipse', { cx: CX, cy: BASE + 2, fill: 'rgba(60,30,10,.12)' });
  const parts = LAYERS.map(([kind]) => ({ kind, body: el('path'), top: el('ellipse') }));
  const tops = el('g');
  const topper = el('g', { opacity: 0 });
  const stick = el('rect', { width: 3, rx: 1.5, fill: '#C9A26B' }, topper);
  const flag = el('path', { fill: '#F26B4E' }, topper);
  const flagTxt = el('text', { 'text-anchor': 'middle', fill: '#fff', style: 'font:500 15px var(--font);letter-spacing:-.01em' }, topper);

  const sponge = () => C.sponges.find((s) => s.id === state.sponge);
  const cream = () => C.creams.find((s) => s.id === state.cream);

  const layout = () => {
    const w = geo.w, ry = w * 0.13;
    plate.setAttribute('rx', w / 2 + 34); plate.setAttribute('ry', ry + 12);
    plateRim.setAttribute('rx', w / 2 + 26); plateRim.setAttribute('ry', ry + 8);
    shadow.setAttribute('rx', w / 2 + 6); shadow.setAttribute('ry', ry + 2);
    let y = BASE;
    parts.forEach((p, i) => {
      const h = LAYERS[i][1];
      const t = y - h;
      p.body.setAttribute('d', `M${CX - w / 2},${t} L${CX - w / 2},${y} A${w / 2},${ry} 0 0 0 ${CX + w / 2},${y} L${CX + w / 2},${t} Z`);
      p.top.setAttribute('cx', CX); p.top.setAttribute('cy', t); p.top.setAttribute('rx', w / 2); p.top.setAttribute('ry', ry);
      p.t = t; y = t;
    });
    geo.topY = y; geo.ry = ry;
    // cobertura: posiciones normalizadas → elipse superior
    tops.querySelectorAll('[data-u]').forEach((n) => {
      const x = CX + (+n.dataset.u) * (w / 2) * 0.82, yy = geo.topY + (+n.dataset.v) * ry * 0.7;
      n.setAttribute('transform', `translate(${x} ${yy})`);
    });
    stick.setAttribute('x', CX + 30); stick.setAttribute('y', geo.topY - 118); stick.setAttribute('height', 118);
    const fx = CX + 31, fy = geo.topY - 118;
    flag.setAttribute('d', `M${fx},${fy} C${fx + 40},${fy - 14} ${fx + 120},${fy - 8} ${fx + 132},${fy + 18} C${fx + 140},${fy + 40} ${fx + 90},${fy + 54} ${fx + 50},${fy + 46} C${fx + 24},${fy + 42} ${fx},${fy + 50} ${fx},${fy + 50} Z`);
    flagTxt.setAttribute('x', fx + 68); flagTxt.setAttribute('y', fy + 28);
  };

  const paintColors = (animate) => {
    const s = sponge(), c = cream();
    const d = animate ? 0.8 : 0;
    parts.forEach((p) => {
      const body = p.kind === 'sponge' ? s.dark : c.col;
      const top = p.kind === 'sponge' ? s.col : c.col;
      gsap.to(p.body, { attr: { fill: body }, duration: d, ease: 'power2.inOut' });
      gsap.to(p.top, { attr: { fill: p.kind === 'top' ? shade(top, 1.04) : top }, duration: d, ease: 'power2.inOut' });
    });
    gsap.to('#cakeStage', { backgroundColor: stageBg[state.cream], duration: d, ease: 'power2.inOut' });
  };
  function shade(hex, k) {
    const n = parseInt(hex.slice(1), 16);
    const f = (v) => Math.max(0, Math.min(255, Math.round(v * k)));
    return '#' + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => f(v).toString(16).padStart(2, '0')).join('');
  }

  /* ---------- Coberturas ---------- */
  let seed = 11;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const spots = (n) => {
    const out = [];
    for (let i = 0; i < n; i++) { const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()); out.push([Math.cos(a) * r, Math.sin(a) * r]); }
    return out.sort((a, b) => a[1] - b[1]);
  };
  const toppingShapes = {
    fruits: () => spots(16).map(([u, v], i) => {
      const k = i % 4;
      if (k === 0) return [u, v, '<path d="M0,-11 C8,-11 10,-2 6,6 C3,11 -3,11 -6,6 C-10,-2 -8,-11 0,-11Z" fill="#E2283A"/><path d="M-4,-11 L0,-15 L4,-11" stroke="#2E9B57" stroke-width="3" fill="none" stroke-linecap="round"/>'];
      if (k === 1) return [u, v, '<circle r="6.5" fill="#33307A"/><circle r="2" cx="-2" cy="-2" fill="#5A57B0"/>'];
      if (k === 2) return [u, v, '<circle r="7" fill="#F7A51C"/><path d="M-7,0 A7,7 0 0 1 7,0" fill="#FFD27A"/>'];
      return [u, v, '<path d="M0,0 C6,-10 14,-8 16,-2 C10,0 4,2 0,0Z" fill="#2E9B57"/>'];
    }),
    sprinkles: () => spots(46).map(([u, v], i) => {
      const cols = ['#F26B4E', '#2F63D6', '#F7A51C', '#2E9B57', '#8D63E2', '#F5B8C6'];
      return [u, v, `<rect x="-5" y="-1.7" width="10" height="3.4" rx="1.7" fill="${cols[i % cols.length]}" transform="rotate(${Math.round(rnd() * 180)})"/>`];
    }),
    gold: () => spots(34).map(([u, v], i) => (i % 3 === 0
      ? [u, v, `<path d="M-5,-3 L4,-5 L6,3 L-3,5Z" fill="#D9B04A" transform="rotate(${Math.round(rnd() * 90)})"/>`]
      : [u, v, `<path d="M-3,-2 C0,-5 4,-2 3,1 C2,4 -3,4 -3,-2Z" fill="#3B2014" transform="rotate(${Math.round(rnd() * 180)})"/>`])),
    pistachio: () => spots(30).map(([u, v], i) => (i % 3 === 0
      ? [u, v, '<circle r="6" fill="#D6213F"/><circle r="1.6" cx="-2" cy="-2" fill="#F57C8E"/><circle r="1.6" cx="2" cy="1" fill="#F57C8E"/>']
      : [u, v, `<path d="M-4,-2 C-1,-5 4,-3 4,0 C4,3 -2,4 -4,-2Z" fill="#8DB33A" transform="rotate(${Math.round(rnd() * 180)})"/>`])),
  };
  const renderTopping = (animate) => {
    seed = { fruits: 11, sprinkles: 23, gold: 37, pistachio: 51 }[state.topping];
    const old = [...tops.children];
    const g = el('g', {}, tops);
    toppingShapes[state.topping]().forEach(([u, v, inner]) => {
      const n = el('g', { 'data-u': u.toFixed(3), 'data-v': v.toFixed(3) }, g);
      n.innerHTML = `<g class="ti">${inner}</g>`;
    });
    layout();
    if (!animate) { old.forEach((o) => o.remove()); return; }
    gsap.to(old.map((o) => o.querySelectorAll('.ti')), { y: -24, opacity: 0, duration: 0.5, stagger: 0.008, ease: 'power2.inOut', onComplete: () => old.forEach((o) => o.remove()) });
    gsap.from(g.querySelectorAll('.ti'), { y: -70, opacity: 0, rotation: () => (rnd() - 0.5) * 120, duration: 0.8, stagger: 0.015, ease: 'power3.inOut', delay: 0.2 });
  };

  const paintTopper = (animate) => {
    const on = state.msg.trim().length > 0;
    flagTxt.textContent = state.msg.trim();
    const len = Math.max(state.msg.trim().length, 6);
    flagTxt.style.fontSize = len > 14 ? '11px' : len > 10 ? '13px' : '15px';
    gsap.to(topper, { opacity: on ? 1 : 0, y: on ? 0 : 30, duration: animate ? 0.7 : 0, ease: 'power3.inOut' });
  };

  /* ---------- Precio y porciones ---------- */
  const priceEl = document.getElementById('cakePrice');
  const servesEl = document.getElementById('cakeServes');
  const priceObj = { v: 55 };
  const paintPrice = () => {
    const sz = C.sizes.find((s) => s.id === state.size);
    servesEl.textContent = `${sz.label} · serves ${sz.serves.replace(' people', '')}`;
    gsap.to(priceObj, { v: sz.p, duration: 0.9, ease: 'power2.inOut', onUpdate: () => { priceEl.textContent = `${Math.round(priceObj.v)} €`; } });
  };

  /* ---------- Pasos ---------- */
  const opt = (group, id, label, extra = '', sw = '') => `<button class="opt" aria-pressed="${state[group] == id}" data-g="${group}" data-v="${id}">${sw ? `<span class="sw" style="background:${sw}"></span>` : ''}<span>${label}${extra ? `<small>${extra}</small>` : ''}</span></button>`;
  const min = new Date(Date.now() + 2 * 864e5).toISOString().slice(0, 10);
  steps.innerHTML = `
    <div><div class="step__head"><b>01</b><h3>Size</h3></div><div class="opts">${C.sizes.map((s) => opt('size', s.id, s.label, `${s.serves} · ${s.p} €`)).join('')}</div></div>
    <div><div class="step__head"><b>02</b><h3>Sponge</h3></div><div class="opts">${C.sponges.map((s) => opt('sponge', s.id, s.label, '', s.col)).join('')}</div></div>
    <div><div class="step__head"><b>03</b><h3>Cream</h3></div><div class="opts">${C.creams.map((s) => opt('cream', s.id, s.label, '', s.col)).join('')}</div></div>
    <div><div class="step__head"><b>04</b><h3>Topping</h3></div><div class="opts">${C.toppings.map((s) => opt('topping', s.id, s.label)).join('')}</div></div>
    <div><div class="step__head"><b>05</b><h3>The details</h3></div>
      <div style="display:grid;gap:14px;grid-template-columns:1fr 1fr">
        <label class="field" style="grid-column:1/-1">Message on a topper (optional)<input id="cakeMsg" maxlength="22" placeholder="Happy birthday, Lu!"></label>
        <label class="field">Pick up at<select id="cakeWhere">${['bakers', 'eatery', 'deli'].map((k) => `<option value="${k}">${F.places[k].name}</option>`).join('')}</select></label>
        <label class="field">Day<input id="cakeDate" type="date" min="${min}" value="${min}"></label>
      </div>
    </div>
    <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
      <button class="btn btn--coral" id="cakeGo">Request this cake ${F.arrow}</button>
      <span class="note">The bakers confirm by email within a day.</span>
    </div>`;

  steps.addEventListener('click', (e) => {
    const b = e.target.closest('.opt');
    if (!b) return;
    const g = b.dataset.g, v = g === 'size' ? +b.dataset.v : b.dataset.v;
    if (state[g] === v) return;
    state[g] = v;
    steps.querySelectorAll(`.opt[data-g="${g}"]`).forEach((o) => o.setAttribute('aria-pressed', o === b));
    if (g === 'size') { gsap.to(geo, { w: widthFor[v], duration: 0.9, ease: 'power3.inOut', onUpdate: layout }); paintPrice(); }
    if (g === 'sponge' || g === 'cream') {
      paintColors(true);
      const idx = g === 'sponge' ? [0, 2] : [1, 3];
      idx.forEach((i) => gsap.fromTo([parts[i].body, parts[i].top], { y: -10 }, { y: 0, duration: 0.6, ease: 'power2.inOut' }));
    }
    if (g === 'topping') renderTopping(true);
  });
  const msg = document.getElementById('cakeMsg');
  msg.addEventListener('input', () => { state.msg = msg.value; paintTopper(true); });

  layout(); paintColors(false); renderTopping(false); paintTopper(false); paintPrice();

  // Entrada de la tarta: las capas bajan una sobre otra cuando la sección aparece
  const stack = [...parts.flatMap((p) => [p.body, p.top])];
  if (F.atTop || svg.getBoundingClientRect().top > innerHeight) {
    gsap.from(stack, { y: -80, opacity: 0, duration: 0.9, stagger: 0.06, ease: 'power3.inOut', scrollTrigger: { trigger: '#cakeStage', start: 'top 70%', once: true } });
    gsap.from(tops.querySelectorAll('.ti'), { y: -60, opacity: 0, duration: 0.8, stagger: 0.012, ease: 'power3.inOut', scrollTrigger: { trigger: '#cakeStage', start: 'top 70%', once: true }, delay: 0.6 });
  }

  /* ---------- Pedido (simulado) ---------- */
  document.getElementById('cakeGo').addEventListener('click', () => {
    const sz = C.sizes.find((s) => s.id === state.size);
    state.where = document.getElementById('cakeWhere').value;
    state.date = document.getElementById('cakeDate').value;
    const day = state.date ? new Date(state.date + 'T12:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) : '';
    const summary = `${sz.label} ${sponge().label.toLowerCase()} sponge, ${cream().label.toLowerCase()}, ${C.toppings.find((t) => t.id === state.topping).label.toLowerCase()}`;
    F.openModal(`
      <p class="eyebrow">Celebration cake</p>
      <h3 id="modalTitle">Almost there</h3>
      <div class="ticket"><b>${summary}</b>${state.msg.trim() ? `<span>Topper: “${state.msg.trim()}”</span>` : ''}<span>Pick up at ${F.places[state.where].name} · ${day}</span><span>${sz.p} €, paid at pick-up</span></div>
      <form id="cakeForm" novalidate>
        <label class="field">Your name<input name="name" autocomplete="name" required></label>
        <label class="field">Email<input name="email" type="email" autocomplete="email" required></label>
        <button class="btn btn--coral" type="submit" style="justify-content:center">Send request</button>
        <p class="note">Demo: nothing is sent anywhere.</p>
      </form>`);
    document.getElementById('cakeForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      const bad = [...f.querySelectorAll('input')].find((i) => !i.checkValidity() || !i.value.trim());
      if (bad) { bad.focus(); return; }
      const name = f.name.value.trim().split(' ')[0];
      const card = document.getElementById('modalCard');
      card.innerHTML = `<button class="modal__x" data-close aria-label="Close">×</button>
        <div class="success">
          <svg class="success__blob" viewBox="-1.3 -1.3 2.6 2.6"><path id="okBlob" fill="#F5B8C6" d="${F.blobPath(9, 8, 0.24)}"/><path id="okTick" d="M-.42 .02 L-.12 .3 L.45 -.3" fill="none" stroke="#1E1A16" stroke-width=".12" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>
          <h3 id="modalTitle">The oven is warming up, ${name}</h3>
          <p class="note" style="margin:10px 0 20px">We’ll write to you within a day to confirm your ${sz.label} cake for ${day}.</p>
          <button class="btn" data-close>Lovely</button>
        </div>`;
      gsap.from('#okBlob', { scale: 0, rotation: -60, transformOrigin: '50% 50%', duration: 0.9, ease: 'power3.inOut' });
      gsap.to('#okTick', { strokeDashoffset: 0, duration: 0.6, delay: 0.6, ease: 'power2.inOut' });
    });
  });


})();
