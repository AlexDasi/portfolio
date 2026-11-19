/* Color del cursor (feedback 80, rama rediseno-baraja-2026-11).
   Al abrir la web sale un color de la paleta (header-baraja.php elige al azar); la tecla espacio pasa al siguiente.
   ?cursor=fijo = solo lima. Al cambiar, una pincelada corta del color nuevo donde está el ratón,
   para que se vea el cambio sin manchar la pantalla. */
(function () {
  'use strict';
  var c = window.__CURSOR;
  if (!c || c.fijo) return;
  var raton = { x: 0.5, y: 0.5 };
  window.addEventListener('mousemove', function (e) {
    raton.x = e.clientX / window.innerWidth;
    raton.y = 1 - e.clientY / window.innerHeight;
  }, { passive: true });

  function aplicar() {
    var color = c.paleta[c.i];
    document.documentElement.style.setProperty('--cursor-color', 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')');
    if (window.__FLUID_PRESET) window.__FLUID_PRESET.EFFECT_COLOR = color;
    var api = window.__fluidBackgroundAPI;
    if (api && typeof api.applySettings === 'function') api.applySettings({ EFFECT_COLOR: color });
  }

  window.addEventListener('keydown', function (e) {
    if (e.key !== ' ' || e.repeat) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(t.tagName))) return;
    e.preventDefault();
    c.i = (c.i + 1) % c.paleta.length;
    aplicar();
    (window.__fluidQueue = window.__fluidQueue || []).push({ x: raton.x, y: raton.y, dx: 0, dy: 600, k: 3 });
    document.documentElement.classList.add('cursor-cambiado');
  });

  aplicar();
})();
