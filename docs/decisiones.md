# Funky — decisiones (sitio de prueba)

Arrancado el 2026-11-12. Es solo para probar ideas: no es para el cliente y no se publica.

| # | Decisión |
|---|---|
| F1 | Alcance: home + una página por local (bakers.html, eatery.html, deli.html). |
| F2 | Portada: foto a sangre, titular grande con una palabra en yema y slider por local (referencia: Picnic en landdding). El cambio de foto se hace con una mancha que crece desde la flecha. |
| F3 | Idioma: inglés, como su Shopify. |
| F4 | Funciones a probar: armar la tarta (con las opciones y precios reales de la Celebration Cake), Host Nights (reserva simulada en localStorage), menú animado con filtros y ficha lateral, y mapa con abierto/cerrado en hora de Barcelona. |
| F5 | Dirección única fiel a la marca, sin sorteo de maquetas. |
| F6 | HTML estático + GSAP 3.12.5 + ScrollTrigger + Lenis 1.1.13 por CDN. Fuente: General Sans (Fontshare). |
| F7 | Mucho movimiento, pero suave: easings inOut y nada aparece de golpe. Las entradas solo corren si la página carga arriba. Con reducir movimiento se activa el modo suave: sin Lenis, menos amplitud y decoración quieta. |
| F8 | Solo local: `php -S 127.0.0.1:8040 -t C:\xampp\htdocs\funky`. |
| F9 | El acento en yema (#F7A51C) va solo sobre foto u oscuro. Sobre crema se usa #BF5F00 por contraste. El texto blanco chico va sobre coral profundo (#C83F24). |

## Datos
- Productos y precios: `docs/marca/shop-products.json` (Shopify público, 71 productos). Las ilustraciones recortadas están en `assets/img/ilus`.
- Fotos del IG: `assets/img/ig` (355 fotos de 69 publicaciones, versión web). Los originales están en `assets/fotos`.
- Horarios: ficha de Google de cada local (2026-11-12).
- Platos del Eatery: sacados de los textos de sus publicaciones. Sin precio cuando no lo publicaron.
- Host Nights: METL el 22 de noviembre a 45 € (real). Los 15 asientos "vendidos" son de la demo.

## Pendiente o para probar después
- Hay platos del Eatery sin foto propia (Menemen, Katsu Sando de halloumi): faltan sus fotos.
- El mapa es ilustrado y las posiciones son aproximadas.
