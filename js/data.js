/* Funky — datos del sitio de prueba.
   Productos y precios: Shopify público de funkyandco.com (2026-11-12).
   Horarios: ficha de Google de cada local (2026-11-12).
   Platos del Eatery: textos de sus publicaciones de Instagram (sin precio cuando no lo publicaron). */
window.FUNKY = window.FUNKY || {};

FUNKY.ilus = (h) => `assets/img/ilus/${h}.webp`;
FUNKY.ig = (c) => `assets/img/ig/${c}.jpg`;

/* Horarios: [lun, mar, mié, jue, vie, sáb, dom] → [abre, cierra] en horas decimales */
FUNKY.places = {
  bakers: {
    key: 'bakers', name: 'Funky Bakers', short: 'Bakers', kind: 'Bakery',
    address: 'Pg. del Born, 10', area: 'El Born', phone: '+34 931 54 67 13',
    url: 'bakers.html', color: 'yolk',
    hours: [[8, 19], [8, 19], [8, 19], [8, 19], [8, 20.5], [8, 20.5], [8, 20.5]],
    tagline: 'Croissants at eight, babka by nine, a queue by ten.',
    photo: 'DSSooEmjM8r-8', hero: 'DWJQjKal72Y-6', page: 'DXWjFIvCc9f-3',
    map: { x: 612, y: 520 },
  },
  eatery: {
    key: 'eatery', name: 'Funky Eatery', short: 'Eatery', kind: 'Breakfast & lunch',
    address: 'C/ Bailèn, 61', area: 'Dreta de l’Eixample', phone: '+34 681 95 23 13',
    url: 'eatery.html', color: 'coral',
    hours: [[9, 16], [9, 16], [9, 16], [9, 16], [9, 17.5], [9, 17.5], [9, 17.5]],
    tagline: 'Long tables, messy plates and Host Nights after dark.',
    photo: 'DPwSNqBDHAH-2', hero: 'DQ7MH-fjIRW-3', page: 'DYpIcKfgugt-2',
    map: { x: 520, y: 248 },
  },
  deli: {
    key: 'deli', name: 'Funky Deli', short: 'Deli', kind: 'Deli & pantry',
    address: 'C/ Diputació, 347', area: 'Eixample', phone: '',
    url: 'deli.html', color: 'blue',
    hours: [[8, 20.5], [8, 20.5], [8, 20.5], [8, 20.5], [8, 20.5], [8, 20.5], [8, 20.5]],
    tagline: 'Butter, natural wine, fresh flowers on Thursdays.',
    photo: 'DSkgBmSDNq8-1', hero: 'DPWlt-ojHW7-7', page: 'DPWlt-ojHW7-11',
    map: { x: 470, y: 300 },
  },
};

/* ---------- Bakers: productos reales del Shopify ---------- */
FUNKY.bakery = [
  { h: 'croissant', n: 'Croissant', p: 2.5, c: 'viennoiserie', d: 'Butter, flour, patience. Baked every morning in the Born.' },
  { h: 'croissant-de-pistacho', n: 'Pistachio croissant', p: 4.9, c: 'viennoiserie', d: 'Classic croissant with pistachio cream and butter.' },
  { h: 'croissant-de-almendras', n: 'Almond croissant', p: 3.75, c: 'viennoiserie', d: 'Filled with almond cream, dusted like a snowy morning.' },
  { h: 'pain-au-chocolat', n: 'Pain au chocolat', p: 3.1, c: 'viennoiserie', d: 'A French classic, made every day.' },
  { h: 'danish-dulce', n: 'Sweet danish', p: 4.9, c: 'viennoiserie', d: 'Pastry cream and whatever fruit the season brings.' },
  { h: 'danish-salado', n: 'Savoury danish', p: 4.9, c: 'savoury', d: 'Danish dough stuffed with ham.' },
  { h: 'babka-chocolate-y-avellana', n: 'Chocolate & hazelnut babka', p: 3.9, c: 'viennoiserie', d: 'Inspired by the New York recipe.' },
  { h: 'cardamom-and-espresso-babka', n: 'Cardamom & espresso babka', p: 3.9, c: 'viennoiserie', d: 'Our coffee, a lot of cardamom, twisted by hand.' },
  { h: 'house-bun', n: 'House bun', p: 1.9, c: 'breads', d: 'Fluffy inside, covered in seeds. Our bun, our rules.' },
  { h: 'challah', n: 'Challah with mezzes', p: 13.5, c: 'breads', d: 'Braided with three holes for three mezzes: labneh, spicy tuna, green hummus.' },
  { h: 'copy-of-challah-con-mezzes', n: 'Challah', p: 7.5, c: 'breads', d: 'Dairy-free braided bread. 600 g.' },
  { h: 'pan-de-centeno', n: 'Rye bread', p: 6.5, c: 'breads', d: '100% organic rye, made every day by Cloudstreet.' },
  { h: 'pan-sin-gluten', n: 'Gluten-free bread', p: 9.4, c: 'breads', d: 'Cloudstreet bakes it for us every Friday.' },
  { h: 'burger-buns', n: 'Burger buns (6)', p: 7.5, c: 'breads', d: 'Made on Saturdays, tender and tasty.' },
  { h: 'borek-vegano', n: 'Spinach borek', p: 5.9, c: 'savoury', d: 'Turkish filo roll with spinach and feta.' },
  { h: 'rollo-de-ternera-ecologica', n: 'Organic beef roll', p: 5.5, c: 'savoury', d: 'Puff pastry and organic minced beef.' },
  { h: 'tarta-de-queso-12cm', n: 'Basque cheesecake', p: 7.9, c: 'cakes', d: 'The Bar La Viña recipe: caramelised outside, creamy inside, no cookie base.' },
  { h: 'tartaleta-de-limon', n: 'Lemon tartlet', p: 3.9, c: 'cakes', d: 'Lemon cream under toasted meringue.' },
  { h: 'tarta-de-mascarpone', n: 'Mascarpone tartlet', p: 4.2, c: 'cakes', d: 'Mascarpone, vanilla and seasonal fruit.' },
  { h: 'tarta-de-chocolate', n: 'Chocolate cake', p: 5.5, c: 'cakes', d: 'Gluten-free, with a touch of gold leaf.' },
  { h: 'love-cake', n: 'Love cake', p: 18, c: 'cakes', d: 'Raspberry, pistachio and vanilla. Serves two.' },
  { h: 'pavlova-18cm', n: 'Pavlova', p: 24, c: 'cakes', d: 'A cloud of meringue, mascarpone cream and fruit. Good luck sharing.' },
  { h: 'tarta-de-matcha-grande-28cm', n: 'Matcha cake', p: 32, c: 'cakes', d: 'Matcha cream, covered in raspberry.' },
  { h: 'tarta-de-pecano-28cm', n: 'Pecan pie', p: 36, c: 'cakes', d: 'Pecans and mascarpone cream.' },
  { h: 'banana-bread', n: 'Banana bread', p: 23, c: 'cakes', d: 'Vegan, with a tahini glaze.' },
  { h: 'choco-chip-cookies', n: 'Choc-chip cookie', p: 3.4, c: 'cookies', d: 'Dark chocolate and Maldon salt.' },
  { h: 'thumbprint-cookies', n: 'Thumbprint cookie', p: 3.4, c: 'cookies', d: 'Gluten-free almond cookie with homemade jam.' },
  { h: 'bolas-de-galletas-congeladas', n: 'Cookie dough balls (6)', p: 10, c: 'cookies', d: 'Frozen. Bake at home whenever the craving hits.' },
];
FUNKY.bakeryCats = [
  ['all', 'Everything'], ['viennoiserie', 'Viennoiserie'], ['breads', 'Breads'],
  ['cakes', 'Cakes & tarts'], ['cookies', 'Cookies'], ['savoury', 'Savoury'],
];

/* ---------- Eatery: platos de sus publicaciones ---------- */
FUNKY.eatery = [
  { img: 'DTVWEoLjKwp-10', n: 'Simit breakfast', c: 'breakfast', d: 'Sesame simit, white cheese, olives, tomatoes and honey. The Turkish way to start a day.' },
  { ilus: 'bol-de-granola-y-fruta', n: 'Granola fruit bowl', p: 5.9, c: 'breakfast', d: 'Greek yoghurt, seasonal fruit and our granola. Gluten-free, no refined sugar.' },
  { ilus: 'bocadillo-desayuno-pastrami', n: 'Egg & pastrami bun', p: 7.9, c: 'breakfast', d: 'House bun, pastrami, scrambled eggs, cheese and homemade ketchup.' },
  { ilus: 'bocadillo-de-huevo-y-setas', n: 'Egg & mushroom bun', p: 7.9, c: 'breakfast', d: 'Sautéed mushrooms, scrambled eggs, cheese, homemade ketchup.' },
  { ilus: 'pudin-de-chia', n: 'Chia pudding', p: 5.9, c: 'breakfast', d: 'Coconut milk, grapefruit, lime peel and hazelnut cream.' },
  { img: 'DQ7MH-fjIRW-3', n: 'Funky burger', c: 'lunch', d: 'Take a seat, have a bite. On our own bun, with fries.' },
  { img: 'DaP1P8Vgv0f-1', n: 'Funky Caesar wrap', c: 'lunch', d: 'Our Caesar salad, now wrapped. We’re a little obsessed.' },
  { img: 'Dd6Gm6ziElS-1', n: 'Grilled chicken', c: 'lunch', d: 'Miso-lime marinade, green tahini sauce and corn ribs.' },
  { img: 'DYHGnhOAj9A-1', n: 'Pastrami tonnato & focaccia', c: 'lunch', d: 'Pastrami carpaccio with tonnato, on focaccia from Pane Pane.' },
  { img: 'DZkLVZGArNs-1', n: 'Roasted carrots & pickles', c: 'lunch', d: 'House pickles and oven-roasted carrots over a pink, earthy spread.' },
  { img: 'DY67r2sguwx-1', n: 'Caesar with grilled chicken', p: 11, c: 'lunch', d: 'The classic, done properly.' },
  { ilus: 'ensalada-del-dia', n: 'Grain salad', p: 11, c: 'lunch', d: 'Grains, feta and tahini sauce.' },
  { img: 'DeMO2F-glVE-1', n: 'Seasonal danish', c: 'sweet', d: 'Right now: apple cheesecake, by Funky baker Sofía.' },
  { img: 'DZpQTcSAkfh-1', n: 'Pavlova', c: 'sweet', d: 'A cloud of meringue and seasonal fruit.' },
  { img: 'DXZA5k4E0i5-3', n: 'Raspberry rose danish', c: 'sweet', d: 'Born for Sant Jordi, shaped like a rose.' },
  { img: 'DSkgBmSDNq8-11', n: 'Gilda', c: 'aperitivo', d: 'Olive, anchovy, guindilla. The perfect bite, on a stick.' },
  { img: 'DayRMJQgoc--3', n: 'Golden hour plates', c: 'aperitivo', d: 'Natural wine and something to share when the sun goes down.' },
];
FUNKY.eateryCats = [['all', 'All day'], ['breakfast', 'Breakfast'], ['lunch', 'Lunch'], ['sweet', 'Something sweet'], ['aperitivo', 'Aperitivo']];

/* ---------- Deli ---------- */
FUNKY.deli = [
  { h: 'cafe-molido-para-filtro-250gr', n: 'Funky coffee, 250 g', p: 15.5, from: true, c: 'pantry', d: 'Roasted in Barcelona. Brazil, Mexico, Ethiopia or decaf Peru.' },
  { h: 'mermelada-casera', n: 'Homemade jam', p: 2.75, c: 'pantry', d: 'Whatever fruit is in season.' },
  { h: 'mantequilla-de-avellana', n: 'Hazelnut butter', p: 4.1, c: 'pantry', d: 'Roasted, crushed hazelnuts and a pinch of salt.' },
  { h: 'golden-mix-15-tazas', n: 'Golden mix', p: 5.5, c: 'pantry', d: 'Turmeric, ginger and cinnamon. Fifteen cups.' },
  { h: 'mantequilla-km0-250gr', n: 'Km0 butter', p: 6.5, c: 'fridge', d: 'Made in Barcelona by our local supplier.' },
  { h: 'leche-fresca-de-cal-porta', n: 'Fresh milk, Cal Porta', p: 2.1, c: 'fridge', d: 'From Granja Cal Porta.' },
  { h: 'leche-de-avena-minor-figures', n: 'Oat drink, Minor Figures', p: 3.4, c: 'fridge', d: 'Organic, no added sugar.' },
  { h: 'huevos-camperos-km0-12-uds', n: 'Km0 country eggs (6)', p: 2.8, c: 'fridge', d: 'Free-range, from down the road.' },
  { h: 'avocado-manchego-sandwich-new-format', n: 'Avocado & manchego sandwich', p: 3.9, c: 'sandwiches', d: 'Crystal bread, lime-seasoned avocado, manchego and rocket.' },
  { h: 'spicy-tuna-sandwich', n: 'Spicy tuna sandwich', p: 4.2, c: 'sandwiches', d: 'Our mildly spicy tuna on crystal bread.' },
  { h: 'bocadillo-ensalada-y-pastrami', n: 'Ham & tomato sandwich', p: 8.5, c: 'sandwiches', d: 'Iberian ham, tomato and rocket.' },
  { h: 'bocadillo-ensalada-y-pavo', n: 'Turkey & salad sandwich', p: 7.9, c: 'sandwiches', d: 'Turkey, spinach, cream cheese, cucumber, carrot.' },
  { h: 'bocadillo-vegano', n: 'Vegan sandwich', p: 6.9, c: 'sandwiches', d: 'Green hummus, roasted vegetables and arugula.' },
  { h: 'caravelle-royal-milkshake-ipa', n: 'Caravelle milkshake IPA', p: 3.5, c: 'drinks', d: 'Brewed in the Raval. Citrus smasher, 4.8%.' },
  { h: 'ruinart-brut-375ml', n: 'R de Ruinart Brut, 375 ml', p: 26, c: 'drinks', d: 'Pear, dried fruit and white flowers.' },
  { h: 'tote-bag', n: 'Funky tote bag', p: 15.5, c: 'merch', d: 'Carries a cake to any plan.' },
  { h: 'house-bun-t-shirt-funky-x-tiago-majuelos', n: 'House Bun T-shirt', p: 39, c: 'merch', d: 'Funky × Tiago Majuelos.' },
  { h: 'gilda-t-shirt-funky-x-tiago-majuelos', n: 'Gilda T-shirt', p: 39, c: 'merch', d: 'An illustrated love letter to the perfect bite.' },
  { h: 'natural-wine-t-shirt-funky-x-tiago-majuelos', n: 'Natural Wine T-shirt', p: 39, c: 'merch', d: 'Low intervention, high character.' },
];
FUNKY.deliCats = [['all', 'The whole shop'], ['pantry', 'Pantry'], ['fridge', 'Fridge'], ['sandwiches', 'Sandwiches'], ['drinks', 'Drinks'], ['merch', 'Merch']];

/* ---------- Tarta de celebración (opciones y precios reales) ---------- */
FUNKY.cake = {
  sizes: [
    { id: 18, label: '18 cm', serves: '8–10 people', p: 34 },
    { id: 26, label: '26 cm', serves: '16–20 people', p: 55 },
    { id: 40, label: '40 cm', serves: '40+ people', p: 130 },
  ],
  sponges: [
    { id: 'vanilla', label: 'Vanilla', col: '#F3D79A', dark: '#E2B866' },
    { id: 'chocolate', label: 'Chocolate', col: '#6B3B25', dark: '#4E2919' },
    { id: 'carrot', label: 'Carrot', col: '#D98A3D', dark: '#B86B26' },
  ],
  creams: [
    { id: 'mascarpone', label: 'Mascarpone & vanilla', col: '#FFF6E6' },
    { id: 'chocolate', label: 'Chocolate', col: '#8A4A2E' },
    { id: 'dulce', label: 'Dulce de leche', col: '#D9A066' },
    { id: 'raspberry', label: 'Raspberry cream', col: '#F4A7B9' },
  ],
  toppings: [
    { id: 'fruits', label: 'Seasonal fruits' },
    { id: 'sprinkles', label: 'Happy sprinkles' },
    { id: 'gold', label: 'Cocoa nibs & gold' },
    { id: 'pistachio', label: 'Pistachio & raspberries' },
  ],
};

/* ---------- Host Nights (reales, del Shopify) ---------- */
FUNKY.hostNights = {
  next: {
    title: 'METL', who: 'Mexican kitchen', date: '2026-11-22', when: 'Saturday 22 November', time: '20:00 – 23:00',
    where: 'Funky Eatery, C/ Bailèn 61', menu: 'Pescatarian menu', price: 45, seats: 28,
    poster: 'host-nights-metl', nro: 'Nº3',
    blurb: 'A Host Night is barely over and we’re already planning the next. This one is the last of the year: a long table, Mexican cooking from the METL crew and natural wine until late.',
  },
  past: [
    { title: 'Aspi', who: 'Augusto Mayer · Mediterranean / Turkish', when: 'October 18 & 19', poster: 'host-nights-augusto-mayer-aspi' },
    { title: 'Fofo', who: 'Martha Helena Bohne', when: 'May 8 & 9', poster: 'host-nights-fofo-martha-bohne' },
    { title: 'Vero Gómez', who: 'Funky × Brummell', when: 'April 11 & 12', poster: 'host-night-vero-gomez' },
    { title: 'El Puto Ken', who: 'Japanese kitchen', when: 'July 5 & 6', poster: 'host-nights-el-puto-ken' },
  ],
};

/* ---------- Fotos ---------- */
FUNKY.wall = [
  'DQb8lhejLzy-2', 'DRhYBOuDDKd-1', 'DQHLSdEjKQG-1', 'DP3621Ogrro-1', 'DXZA5k4E0i5-3', 'DSSooEmjM8r-2',
  'DQb8lhejLzy-1', 'DPWlt-ojHW7-8', 'DTcvekvjHzO-2', 'DQHLSdEjKQG-5', 'DbqM-TLik1K-9', 'DXKQD2kiAZa-3',
  'DSkgBmSDNq8-6', 'DQ7MH-fjIRW-9', 'DTVWEoLjKwp-12', 'DPWlt-ojHW7-13', 'DbqM-TLik1K-4', 'DQb8lhejLzy-8',
];
FUNKY.galleries = {
  bakers: ['DapNiHOAk9W-2', 'DQ7MH-fjIRW-8', 'DXeZydYApoU-1', 'DSSooEmjM8r-11', 'DapNiHOAk9W-4', 'DWJQjKal72Y-6', 'DeMO2F-glVE-2', 'DZvBQgvgseE-3', 'DXZA5k4E0i5-1', 'DQHLSdEjKQG-1'],
  eatery: ['DayRMJQgoc--3', 'DQHLSdEjKQG-4', 'DPWlt-ojHW7-9', 'DXt1znoAtvB-4', 'DYpIcKfgugt-2', 'DQHLSdEjKQG-8', 'DSkgBmSDNq8-8', 'DQHLSdEjKQG-3', 'DXhsHtLAvM6-3', 'DUf7jKJAhJj-8'],
  deli: ['DPMNShGDC-K-7', 'DTcvekvjHzO-1', 'DP3621Ogrro-5', 'DPMNShGDC-K-9', 'DSSooEmjM8r-5', 'DPl5ZTRjMv_-4', 'DfjsM-hgmHi-3', 'DSkgBmSDNq8-12', 'DTcvekvjHzO-4', 'DPWlt-ojHW7-12'],
};

/* ---------- Utilidades de horario (hora de Barcelona) ---------- */
FUNKY.nowBcn = () => {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const days = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  return { day: days[get('weekday')], h: (+get('hour') % 24) + (+get('minute')) / 60 };
};
FUNKY.fmtH = (h) => { const hh = Math.floor(h), mm = Math.round((h - hh) * 60); return `${hh}:${String(mm).padStart(2, '0')}`; };
FUNKY.status = (place) => {
  const { day, h } = FUNKY.nowBcn();
  const [o, c] = place.hours[day];
  if (h >= o && h < c) {
    const left = c - h;
    return { open: true, text: left <= 1 ? `Open · closes at ${FUNKY.fmtH(c)}, hurry` : `Open now · until ${FUNKY.fmtH(c)}` };
  }
  if (h < o) return { open: false, text: `Closed · opens at ${FUNKY.fmtH(o)}` };
  const [o2] = place.hours[(day + 1) % 7];
  return { open: false, text: `Closed · opens tomorrow at ${FUNKY.fmtH(o2)}` };
};
FUNKY.eur = (n) => (Number.isInteger(n) ? `${n} €` : `${n.toFixed(2).replace('.', ',')} €`);
