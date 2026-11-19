/* Día / noche (rama rediseno-baraja-2026-11). La clase se pone en <head> (header-baraja.php)
   antes de pintar; aquí solo el botón: cambia la clase, lo recuerda y pasa el fluido a su ajuste
   (noche = la config del panel FX de Alex; día = plano).
   v8 (feedback 155): el cambio es un fundido de ~500 ms, sin parpadeo: los colores de la web van por variables registradas
   con @property (se interpolan solas, _baraja.scss), el fondo y la opacidad del fluido se interpolan aquí fotograma a
   fotograma, y la esfera ya suaviza su luz al recibir {esferaTema}. v8 (feedback 147): el fluido toma el acento del modo. */
(function () {
  'use strict';
  var root = document.documentElement;
  var DUR = 520;
  var anim = 0;

  function actual() { return root.classList.contains('tema-noche') ? 'noche' : 'dia'; }
  function mezcla(a, b, k) { return { r: a.r + (b.r - a.r) * k, g: a.g + (b.g - a.g) * k, b: a.b + (b.b - a.b) * k }; }
  function suave(k) { return k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; }

  function aplicar(tema) {
    var api = window.__fluidBackgroundAPI;
    var antes = api && typeof api.getConfig === 'function' ? api.getConfig() : null;
    root.classList.add('tema-cambiando');
    root.classList.toggle('tema-noche', tema === 'noche');
    root.classList.toggle('tema-dia', tema !== 'noche');
    clearTimeout(aplicar.t);
    aplicar.t = setTimeout(function () { root.classList.remove('tema-cambiando'); }, DUR + 80);
    try { localStorage.setItem('alexdasi-tema-v3', tema); } catch (e) {}
    var ajuste = tema === 'noche' ? window.__FLUID_NOCHE : window.__FLUID_DIA;
    var color = window.__colorFluido ? window.__colorFluido() : null;
    if (ajuste && color) ajuste = Object.assign({}, ajuste, { EFFECT_COLOR: color });
    if (window.__FLUID_PRESET && ajuste) Object.assign(window.__FLUID_PRESET, ajuste);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', tema === 'noche' ? '#000000' : '#f5f3ec');
    if (!api || typeof api.applySettings !== 'function' || !ajuste) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!antes || reduce || !antes.BACK_COLOR) { api.applySettings(ajuste); return; }
    // el resto del ajuste (plano/relieve, disipación…) entra ya; fondo, opacidad y color del fluido se funden
    var fijo = Object.assign({}, ajuste);
    delete fijo.BACK_COLOR; delete fijo.EFFECT_OPACITY; delete fijo.EFFECT_COLOR;
    var desde = { fondo: antes.BACK_COLOR, op: antes.EFFECT_OPACITY, col: antes.EFFECT_COLOR || ajuste.EFFECT_COLOR };
    api.applySettings(fijo);
    if (root.classList.contains('esfera-abierta') && window.__fluidLigero) window.__fluidLigero(true); // v8: sigue ligero
    var t0 = performance.now();
    cancelAnimationFrame(anim);
    (function paso(now) {
      var k = Math.min(1, (now - t0) / DUR), e = suave(k);
      var parcial = {
        BACK_COLOR: mezcla(desde.fondo, ajuste.BACK_COLOR, e),
        EFFECT_OPACITY: desde.op + (ajuste.EFFECT_OPACITY - desde.op) * e
      };
      if (ajuste.EFFECT_COLOR && desde.col) parcial.EFFECT_COLOR = mezcla(desde.col, ajuste.EFFECT_COLOR, e);
      api.applySettings(parcial);
      if (k < 1) anim = requestAnimationFrame(paso);
    })(t0);
  }

  document.querySelectorAll('[data-tema]').forEach(function (btn) {
    btn.addEventListener('click', function () { aplicar(actual() === 'noche' ? 'dia' : 'noche'); });
  });
  window.__temaAplicar = aplicar;
})();
