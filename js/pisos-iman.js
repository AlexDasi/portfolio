/* Los pisos con imán (v6, feedback 121, rama rediseno-baraja-2026-11, ATELIER conv. 1330).
   Como la flecha: al acercarte, el piso más cercano se deja llevar un poco hacia el ratón, se enciende del acento y el
   punto del cursor se funde en él (html.piso-iman lo apaga, igual que la absorción punto ↔ flecha, D-0002).
   El imán va con la propiedad `translate` (--px/--py), no con `transform`: el piso ya usa transform para su rombo.
   Solo transform por frame; el bucle se para cuando llega. Solo con ratón fino y ventana > 1280 px. */
(function () {
  'use strict';
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.innerWidth <= 1280) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var IMAN = { radio: 34, fuerza: 0.35, max: 9 };
  var html = document.documentElement;
  var pisos = [], activo = null, raf = 0;

  function lista() {
    pisos = [].map.call(document.querySelectorAll('.MainSwiper > .swiper-pagination .swiper-pagination-bullet'), function (el) {
      return el.__iman || (el.__iman = { el: el, x: 0, y: 0, mx: 0, my: 0 });
    });
  }
  function paso() {
    raf = 0;
    var sigue = false, k = reduce ? 1 : 0.22;
    pisos.forEach(function (p) {
      p.x += (p.mx - p.x) * k; p.y += (p.my - p.y) * k;
      if (Math.abs(p.mx - p.x) < 0.05 && Math.abs(p.my - p.y) < 0.05) { p.x = p.mx; p.y = p.my; } else sigue = true;
      p.el.style.setProperty('--px', p.x.toFixed(2) + 'px');
      p.el.style.setProperty('--py', p.y.toFixed(2) + 'px');
    });
    if (sigue) raf = requestAnimationFrame(paso);
  }
  function pedir() { if (!raf) raf = requestAnimationFrame(paso); }
  function poner(p) {
    if (p === activo) return;
    if (activo) activo.el.classList.remove('is-iman');
    activo = p;
    if (p) p.el.classList.add('is-iman');
    html.classList.toggle('piso-iman', !!p);
  }
  function soltar() { pisos.forEach(function (p) { p.mx = p.my = 0; }); poner(null); pedir(); }

  window.addEventListener('mousemove', function (e) {
    if (!pisos.length || !pisos[0].el.isConnected) lista();
    if (!pisos.length) return;
    var mejor = null, dm = Infinity;
    pisos.forEach(function (p) {
      var r = p.el.getBoundingClientRect();
      if (!r.width) return;
      var cx = r.left + r.width / 2 - p.x, cy = r.top + r.height / 2 - p.y; // centro en reposo
      var d = Math.hypot(e.clientX - cx, e.clientY - cy);
      p._dx = e.clientX - cx; p._dy = e.clientY - cy;
      if (d < IMAN.radio && d < dm) { dm = d; mejor = p; }
    });
    pisos.forEach(function (p) {
      if (p === mejor) {
        p.mx = Math.max(-IMAN.max, Math.min(IMAN.max, p._dx * IMAN.fuerza));
        p.my = Math.max(-IMAN.max, Math.min(IMAN.max, p._dy * IMAN.fuerza));
      } else { p.mx = 0; p.my = 0; }
    });
    poner(mejor);
    pedir();
  }, { passive: true });
  document.addEventListener('mouseout', function (e) { if (!e.relatedTarget || e.relatedTarget.tagName === 'IFRAME') soltar(); });
  window.addEventListener('blur', soltar);
})();
