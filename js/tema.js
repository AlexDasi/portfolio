/* Día / noche (rama rediseno-baraja-2026-11). La clase se pone en <head> (header-baraja.php)
   antes de pintar; aquí solo el botón: cambia la clase, lo recuerda y pasa el fluido a su ajuste
   (noche = la config del panel FX de Alex; día = plano). */
(function () {
  'use strict';
  var root = document.documentElement;

  function actual() { return root.classList.contains('tema-noche') ? 'noche' : 'dia'; }

  function aplicar(tema) {
    root.classList.toggle('tema-noche', tema === 'noche');
    root.classList.toggle('tema-dia', tema !== 'noche');
    try { localStorage.setItem('alexdasi-tema-v3', tema); } catch (e) {}
    var ajuste = tema === 'noche' ? window.__FLUID_NOCHE : window.__FLUID_DIA;
    if (window.__FLUID_PRESET && ajuste) Object.assign(window.__FLUID_PRESET, ajuste);
    var api = window.__fluidBackgroundAPI;
    if (api && typeof api.applySettings === 'function' && ajuste) api.applySettings(ajuste);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', tema === 'noche' ? '#000000' : '#f5f3ec');
  }

  document.querySelectorAll('[data-tema]').forEach(function (btn) {
    btn.addEventListener('click', function () { aplicar(actual() === 'noche' ? 'dia' : 'noche'); });
  });
})();
