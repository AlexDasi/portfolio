/* Día / noche (rama rediseno-baraja-2026-11). La clase se pone en <head> (header-baraja.php)
   antes de pintar; aquí solo el botón: cambia la clase, lo recuerda y avisa al fluido. */
(function () {
  'use strict';
  var FONDOS = { dia: { r: 245, g: 243, b: 236 }, noche: { r: 0, g: 0, b: 0 } };
  var root = document.documentElement;

  function actual() { return root.classList.contains('tema-noche') ? 'noche' : 'dia'; }

  function aplicar(tema) {
    root.classList.toggle('tema-noche', tema === 'noche');
    root.classList.toggle('tema-dia', tema !== 'noche');
    try { localStorage.setItem('alexdasi-tema', tema); } catch (e) {}
    if (window.__FLUID_PRESET) window.__FLUID_PRESET.BACK_COLOR = FONDOS[tema];
    var api = window.__fluidBackgroundAPI;
    if (api && typeof api.applySettings === 'function') api.applySettings({ BACK_COLOR: FONDOS[tema] });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', tema === 'noche' ? '#000000' : '#f5f3ec');
  }

  document.querySelectorAll('[data-tema]').forEach(function (btn) {
    btn.addEventListener('click', function () { aplicar(actual() === 'noche' ? 'dia' : 'noche'); });
  });
})();
