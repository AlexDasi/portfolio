/* Color del cursor (feedback 80, rama rediseno-baraja-2026-11).
   Al abrir la web sale un color de la paleta (header-baraja.php elige al azar); la tecla espacio salta a otro AL AZAR,
   nunca el que ya hay (v6, feedback 115: antes iba en orden de rueda).
   ?cursor=fijo = solo lima. Al cambiar: pincelada del color nuevo donde está el ratón + ráfaga corta del acento
   (v4: igual en día y en noche; antes la noche soltaba además una ráfaga arcoíris y el día no). */
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
    var p = c.paleta[c.i], color = { r: p.r, g: p.g, b: p.b };
    document.documentElement.style.setProperty('--cursor-color', 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')');
    if (window.__FLUID_PRESET) window.__FLUID_PRESET.EFFECT_COLOR = color;
    var api = window.__fluidBackgroundAPI;
    if (api && typeof api.applySettings === 'function') api.applySettings({ EFFECT_COLOR: color });
    // v4 (feedback 98): la esfera (si está abierta) toma el acento nuevo
    document.querySelectorAll('iframe.esfera-marco, .intro__esfera iframe, .sm__habla-bola iframe').forEach(function (f) {
      try { f.contentWindow.postMessage({ esferaAcento: [color.r, color.g, color.b] }, '*'); } catch (err) {}
    });
    window.dispatchEvent(new CustomEvent('acento:cambio', { detail: color }));
  }

  // v4 (feedback 104-105): la tecla espacio hace LO MISMO en día y en noche: color siguiente + una ráfaga corta del
  // acento nuevo (el gesto del «PRESS SPACE :)» de la web original, ahora en el acento y no en arcoíris).
  function rafaga() {
    var q = (window.__fluidQueue = window.__fluidQueue || []);
    q.push({ x: raton.x, y: raton.y, dx: 0, dy: 600, k: 3 });
    for (var i = 0; i < 7; i++) {
      q.push({ x: Math.random(), y: Math.random(), dx: 1000 * (Math.random() - 0.5), dy: 1000 * (Math.random() - 0.5), k: 4 });
    }
  }

  window.addEventListener('keydown', function (e) {
    if (e.key !== ' ' || e.repeat) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(t.tagName))) return;
    e.preventDefault();
    siguiente();
  });
  function siguiente() {
    var j = Math.floor(Math.random() * (c.paleta.length - 1));
    c.i = j >= c.i ? j + 1 : j; // al azar entre los demás: nunca repite el actual
    aplicar();
    rafaga();
    document.documentElement.classList.add('cursor-cambiado');
  }
  window.__acentoSiguiente = siguiente; // la esfera (iframe) lo llama si el foco está dentro de ella

  aplicar();
})();
