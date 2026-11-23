/* Menú del móvil (v8, feedback 159, rama rediseno-baraja-2026-11).
   Abre un panel a pantalla completa (fondo del modo actual) con entrada y salida suaves; bloquea el scroll del fondo (CSS:
   html.menu-abierto; la web hace scroll en body y conserva la posición);
   se cierra con la X, tocando un enlace, con Esc o si la pantalla pasa a escritorio. El foco va al panel y vuelve al botón. */
(function () {
  'use strict';
  var panel = document.querySelector('[data-menu-movil]');
  var abrirBtn = document.querySelector('[data-menu-abrir]');
  if (!panel || !abrirBtn) return;
  var root = document.documentElement;
  var cerrarBtn = panel.querySelector('[data-menu-cerrar]');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DUR = reduce ? 0 : 380;
  var t = 0;
  var meta = document.querySelector('meta[name="theme-color"]'), metaAntes = null;

  /* v40 (Alex, 23/11): el panel crece en CÍRCULO desde el botón del acento (como la cortina circular de Berto v14) y las
     palabras suben desde su máscara. El centro del círculo es el del botón, medido al abrir (cabe la barra con safe-area). */
  function centro() {
    var r = abrirBtn.getBoundingClientRect();
    panel.style.setProperty('--mx', Math.round(r.left + r.width / 2) + 'px');
    panel.style.setProperty('--my', Math.round(r.top + r.height / 2) + 'px');
  }
  // la barra de estado del móvil toma el fondo del panel (acento o el del modo) mientras está abierto
  function pintarBarra(abierto) {
    if (!meta) return;
    if (abierto) { metaAntes = meta.getAttribute('content'); var bg = getComputedStyle(panel).backgroundColor; if (bg) meta.setAttribute('content', bg); }
    else if (metaAntes) { meta.setAttribute('content', root.classList.contains('tema-noche') ? '#000000' : '#f5f3ec'); metaAntes = null; }
  }
  function abrir() {
    if (root.classList.contains('menu-abierto')) return;
    clearTimeout(t);
    centro();
    panel.hidden = false;
    void panel.offsetWidth; // que la entrada arranque desde el estado cerrado
    root.classList.add('menu-abierto');
    abrirBtn.setAttribute('aria-expanded', 'true');
    pintarBarra(true);
    (cerrarBtn || panel).focus({ preventScroll: true });
  }
  function cerrar(sinVolver) {
    if (!root.classList.contains('menu-abierto')) return;
    root.classList.remove('menu-abierto');
    abrirBtn.setAttribute('aria-expanded', 'false');
    pintarBarra(false);
    t = setTimeout(function () { panel.hidden = true; }, DUR);
    if (!sinVolver) abrirBtn.focus({ preventScroll: true });
  }

  /* v40 (Alex, 23/11: «lo de cambiar el color o el material, escóndelo en el menú»). Color = el mismo salto que el espacio
     (js/cursor-color.js); Material = la piel siguiente de la esfera (js/esfera.js). Lo elegido se queda toda la visita. */
  var NOMBRES = { chicle: ['Chicle', 'Bubblegum'], glaseado: ['Glaseado', 'Glazed'], prisma: ['Prisma', 'Prism'], solare: ['Solare lima', 'Solare lime'], gema: ['Gema', 'Gem'] };
  var es = (document.querySelector('.menu-movil__chip.is-active') || {}).textContent === 'ES';
  var btnColor = panel.querySelector('[data-menu-color]'), btnMat = panel.querySelector('[data-menu-material]');
  if (btnColor) {
    if (window.__CURSOR && window.__CURSOR.fijo) btnColor.hidden = true; // ?cursor=fijo: lima siempre (cursor-color.js carga después: se mira el ajuste, no la función)
    btnColor.addEventListener('click', function () { if (window.__acentoSiguiente) window.__acentoSiguiente(); setTimeout(function () { pintarBarra(false); pintarBarra(true); }, 30); });
  }
  if (btnMat) {
    var nombreMat = btnMat.querySelector('[data-piel-nombre]');
    if (nombreMat && window.__PIEL) nombreMat.textContent = (NOMBRES[window.__PIEL] || [window.__PIEL, window.__PIEL])[es ? 0 : 1];
    btnMat.addEventListener('click', function () {
      if (window.__pielSiguiente) { window.__pielSiguiente(); return; }
      // páginas sin esfera (fichas): se apunta la siguiente para la visita y se rotula aquí
      var L = window.__PIELES || [], i = L.indexOf(window.__PIEL), p = L[(i + 1) % L.length];
      if (!p) return;
      window.__PIEL = p;
      try { sessionStorage.setItem('alexdasi-piel-visita', p); } catch (e) {}
      if (nombreMat) nombreMat.textContent = (NOMBRES[p] || [p, p])[es ? 0 : 1];
    });
  }

  abrirBtn.addEventListener('click', abrir);
  if (cerrarBtn) cerrarBtn.addEventListener('click', function () { cerrar(); });
  // v11 (Alex, 21/11): «Contacto» baja al pie (#contacto) de la página en la que estés, con el panel ya cerrado
  function irAlPie() {
    var pie = document.getElementById('contacto');
    if (!pie) return false;
    setTimeout(function () { pie.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'end' }); }, DUR + 20);
    return true;
  }
  panel.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    if (a.hasAttribute('data-menu-contacto') && document.getElementById('contacto')) { e.preventDefault(); cerrar(true); irAlPie(); return; }
    cerrar(true); // el enlace navega; el panel se va
  });
  // v15 (Alex, 21/11): «Contact» de arriba lleva al pie de la página en la que estés, en todos los tamaños: en los pisos de
  // escritorio, al último piso (el pie); en las páginas con scroll (y en móvil/tablet), baja a #contacto.
  document.querySelectorAll('.nav-sutil__item[data-contacto]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var sw = window.mainSwiper;
      if (sw && window.innerWidth > 1280 && sw.slides) { e.preventDefault(); sw.slideTo(sw.slides.length - 1); return; }
      if (!document.getElementById('contacto')) return;
      e.preventDefault(); DUR = 0; irAlPie(); DUR = reduce ? 0 : 380;
    });
  });
  // en los pisos, «Contact» se marca cuando estás en el último (el pie)
  window.addEventListener('pisos:cambio', function (e) {
    document.querySelectorAll('.nav-sutil__item[data-contacto]').forEach(function (a) { a.classList.toggle('is-active', e.detail.index === e.detail.total - 1); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrar();
    if (e.key === 'Tab' && root.classList.contains('menu-abierto')) { // el foco no se escapa del panel
      var f = panel.querySelectorAll('a, button');
      if (!f.length) return;
      var primero = f[0], ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 1280) cerrar(true); }); // v40: el menú vale para móvil y tablet
  window.addEventListener('pageshow', function (e) { if (e.persisted) cerrar(true); }); // volver atrás con el panel abierto
})();
