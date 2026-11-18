/* Intro de la home (rama rediseno-baraja-2026-11).
   La rueda no cambia de pantalla: en la intro empuja el fluido (lima) desde donde está el cursor.
   En móvil, el dedo pinta el fluido dentro de la intro (el lienzo no recibe toques).
   Escribe en window.__fluidQueue (js/fluid.js y js/fluidMobile.js la vacían en cada frame). */
(function () {
  'use strict';
  window.__fluidQueue = window.__fluidQueue || [];
  var q = window.__fluidQueue;
  var raton = { x: 0.5, y: 0.5 };
  var enIntro = true; // escritorio: el MainSwiper avisa con «pisos:cambio»

  window.addEventListener('pisos:cambio', function (e) { enIntro = e.detail.index === 0; });
  window.addEventListener('mousemove', function (e) {
    raton.x = e.clientX / window.innerWidth;
    raton.y = 1 - e.clientY / window.innerHeight;
  }, { passive: true });

  // Rueda / trackpad en la intro → una ola de fluido en la dirección del gesto (máx. 1 golpe por frame).
  var pendiente = 0;
  var programado = false;
  function soltar() {
    programado = false;
    if (!pendiente || q.length > 6) { pendiente = 0; return; }
    var dy = Math.max(-1, Math.min(1, pendiente / 120));
    q.push({ x: raton.x, y: raton.y, dx: (Math.random() - 0.5) * 300, dy: -dy * 2600, k: 2.5 });
    pendiente = 0;
  }
  window.addEventListener('wheel', function (e) {
    var esIntro = enIntro && (!e.target.closest || !e.target.closest('[data-baraja]'));
    if (!esIntro) return;
    pendiente += e.deltaY;
    if (!programado) { programado = true; requestAnimationFrame(soltar); }
  }, { passive: true });

  // Sin ratón (móvil/tablet) la intro necesita vida propia (taste, conv. 148): un único gesto lento de lima
  // al llegar, desde abajo a la izquierda. No es la «textura» de antes: una sola pincelada que se disuelve.
  var finoQ = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduceQ = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finoQ && !reduceQ) {
    setTimeout(function () {
      for (var i = 0; i < 6; i++) {
        (function (i) {
          setTimeout(function () { q.push({ x: 0.12 + i * 0.1, y: 0.18 + i * 0.07, dx: 260, dy: 180, k: 2.2 }); }, i * 70);
        })(i);
      }
    }, 700);
  }

  // Móvil: el dedo dentro de la intro pinta (sin bloquear el scroll de la página).
  document.querySelectorAll('.pantalla--intro').forEach(function (intro) {
    var ultimo = null;
    intro.addEventListener('touchstart', function (e) {
      var t = e.touches[0];
      ultimo = { x: t.clientX, y: t.clientY };
    }, { passive: true });
    intro.addEventListener('touchmove', function (e) {
      var t = e.touches[0];
      if (!ultimo || q.length > 6) return;
      var dx = t.clientX - ultimo.x;
      var dy = t.clientY - ultimo.y;
      ultimo = { x: t.clientX, y: t.clientY };
      q.push({ x: t.clientX / window.innerWidth, y: 1 - t.clientY / window.innerHeight, dx: dx * 18, dy: -dy * 18, k: 3 });
    }, { passive: true });
  });
})();
