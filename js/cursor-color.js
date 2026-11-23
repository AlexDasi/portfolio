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

  // v8 (feedback 147): de día el fluido (y todo el acento, vía CSS) usa la variante de día del color
  function colorFluido() {
    var p = c.paleta[c.i], d = p.d && document.documentElement.classList.contains('tema-dia') ? p.d : p;
    return { r: d.r, g: d.g, b: d.b };
  }
  window.__colorFluido = colorFluido;
  function aplicar() {
    var p = c.paleta[c.i], color = { r: p.r, g: p.g, b: p.b };
    document.documentElement.style.setProperty('--cursor-color', 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')');
    if (p.d) document.documentElement.style.setProperty('--cursor-color-dia', 'rgb(' + p.d.r + ',' + p.d.g + ',' + p.d.b + ')');
    var fl = colorFluido();
    if (window.__FLUID_PRESET) window.__FLUID_PRESET.EFFECT_COLOR = fl;
    var api = window.__fluidBackgroundAPI;
    if (api && typeof api.applySettings === 'function') api.applySettings({ EFFECT_COLOR: fl });
    // v4 (feedback 98): la esfera (si está abierta) toma el acento nuevo
    // v19 (Alex, 21/11: «con la esfera abierta el cambio de color es inmediato; quiero una transición, sutil pero no lenta»):
    // el acento de la esfera se pasa en ~0,3 s, fotograma a fotograma, del color de antes al nuevo
    var de = window.__acentoEsfera || fl, t0 = performance.now(), DUR = window.innerWidth <= 1280 ? 150 : 300; // v41b: más rápido en móvil
    window.__acentoEsfera = fl;
    cancelAnimationFrame(window.__acentoRaf || 0);
    (function paso(now) {
      var k = Math.min(1, (now - t0) / DUR), e = 1 - Math.pow(1 - k, 3);
      var col = [Math.round(de.r + (fl.r - de.r) * e), Math.round(de.g + (fl.g - de.g) * e), Math.round(de.b + (fl.b - de.b) * e)];
      document.querySelectorAll('iframe.esfera-marco, .intro__esfera iframe, .sm__habla-bola iframe, .esfera-capa iframe').forEach(function (f) {
        try { f.contentWindow.postMessage({ esferaAcento: col }, '*'); } catch (err) {}
      });
      if (k < 1) window.__acentoRaf = requestAnimationFrame(paso);
    })(t0);
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
    // v19 (Alex, 21/11: «le doy a espacio y no cambia»): tras pulsar un enlace o un botón el foco se quedaba en él y el
    // espacio se ignoraba; ahora solo se respeta en campos de texto
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    e.preventDefault();
    siguiente();
  });
  function siguiente() {
    var j = Math.floor(Math.random() * (c.paleta.length - 1));
    c.i = j >= c.i ? j + 1 : j; // al azar entre los demás: nunca repite el actual
    try { sessionStorage.setItem('alexdasi-acento', c.i); } catch (e) {} // v11: el nuevo se queda para el resto de la visita
    aplicar();
    rafaga();
    document.documentElement.classList.add('cursor-cambiado');
  }
  window.__acentoSiguiente = siguiente; // la esfera (iframe) lo llama si el foco está dentro de ella

  aplicar();
})();
