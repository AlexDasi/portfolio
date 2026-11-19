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

  function abrir() {
    if (root.classList.contains('menu-abierto')) return;
    clearTimeout(t);
    panel.hidden = false;
    void panel.offsetWidth; // que la entrada arranque desde el estado cerrado
    root.classList.add('menu-abierto');
    abrirBtn.setAttribute('aria-expanded', 'true');
    (cerrarBtn || panel).focus({ preventScroll: true });
  }
  function cerrar(sinVolver) {
    if (!root.classList.contains('menu-abierto')) return;
    root.classList.remove('menu-abierto');
    abrirBtn.setAttribute('aria-expanded', 'false');
    t = setTimeout(function () { panel.hidden = true; }, DUR);
    if (!sinVolver) abrirBtn.focus({ preventScroll: true });
  }

  abrirBtn.addEventListener('click', abrir);
  if (cerrarBtn) cerrarBtn.addEventListener('click', function () { cerrar(); });
  panel.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (a) cerrar(true); // el enlace navega; el panel se va
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
  window.addEventListener('resize', function () { if (window.innerWidth > 768) cerrar(true); });
  window.addEventListener('pageshow', function (e) { if (e.persisted) cerrar(true); }); // volver atrás con el panel abierto
})();
