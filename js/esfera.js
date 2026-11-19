/* La esfera (feedback 83-85 y 95, rama rediseno-baraja-2026-11, ATELIER conv. 1330).
   Escritorio: el punto de «Alex Dasi» (sin borde, quieto) al hacer clic vuela al centro y crece hasta ser la esfera
   de la versión inicial del portfolio, PORTADA TAL CUAL (esfera/esfera-pieles.html, demo aprobada v9).
   Ahí flota y gira; clic y arrastrar = gira con inercia, frena y vuelve a su giro; sus efectos de clic, los de la demo.
   Clic fuera o Esc la devuelve al punto. ?piel=solare|chicle|glaseado|gota|prisma (por defecto solare).
   Móvil (sin ratón): sin fluido; la esfera flota en el centro de la intro desde el principio, con spin con el dedo. */
(function () {
  'use strict';
  var q = new URLSearchParams(location.search);
  var PIELES = ['solare', 'chicle', 'glaseado', 'gota', 'prisma'];
  var piel = PIELES.indexOf(q.get('piel')) >= 0 ? q.get('piel') : 'solare';
  var fino = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var html = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var src = 'esfera/esfera-pieles.html?embed&piel=' + piel;

  // ---------- móvil / tablet táctil ----------
  if (!fino || window.innerWidth <= 1280) {
    var caja = document.querySelector('.pantalla--intro .intro__esfera');
    if (!caja) return;
    html.classList.add('esfera-movil');
    var cargar = function () {
      if (caja.querySelector('iframe')) return;
      var f = document.createElement('iframe');
      f.src = src + '&movil';
      f.title = 'Sphere';
      f.setAttribute('loading', 'eager');
      f.addEventListener('load', function () { caja.classList.add('is-lista'); });
      caja.appendChild(f);
    };
    // la bola se carga al llegar (con la página ya pintada) y se para si sales de la intro
    if (document.readyState === 'complete') setTimeout(cargar, 300); else window.addEventListener('load', function () { setTimeout(cargar, 300); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        var f = caja.querySelector('iframe');
        if (f) f.style.visibility = en[0].isIntersecting ? 'visible' : 'hidden';
      }).observe(caja);
    }
    return;
  }

  // ---------- escritorio ----------
  var punto = document.querySelector('.MainSwiper [data-esfera]');
  if (!punto) return;
  var capa = null, bola = null, marco = null, abierta = false, origen = null;

  function diametro() { return 0.56 * Math.min(window.innerWidth, window.innerHeight); }

  function abrir() {
    if (abierta) return;
    abierta = true;
    html.classList.add('esfera-abierta');
    var r = punto.getBoundingClientRect();
    origen = { x: r.left + r.width / 2, y: r.top + r.height / 2, d: r.width };
    capa = document.createElement('div');
    capa.className = 'esfera-capa';
    bola = document.createElement('div');
    bola.className = 'esfera-bola';
    marco = document.createElement('iframe');
    marco.className = 'esfera-marco';
    marco.title = 'Sphere';
    marco.src = src;
    capa.appendChild(marco);
    capa.appendChild(bola);
    document.body.appendChild(capa);
    // la bola sale del punto…
    var D = diametro();
    bola.style.width = bola.style.height = D + 'px';
    bola.style.transform = 'translate3d(' + (origen.x - D / 2) + 'px,' + (origen.y - D / 2) + 'px,0) scale(' + (origen.d / D) + ')';
    void bola.offsetWidth;
    // …y vuela al centro mientras crece
    requestAnimationFrame(function () {
      capa.classList.add('is-abierta');
      bola.style.transform = 'translate3d(' + (window.innerWidth / 2 - D / 2) + 'px,' + (window.innerHeight / 2 - D / 2) + 'px,0) scale(1)';
    });
    punto.style.visibility = 'hidden';
    var api = window.__fluidBackgroundAPI;
    if (api && api.applySettings) api.applySettings({ PAUSED: true }); // la escena 3D se lleva la GPU
  }

  function lista() {
    if (!capa) return;
    capa.classList.add('is-lista'); // la esfera de verdad aparece y la bola plana se funde
  }

  function cerrar() {
    if (!abierta || !capa) return;
    var D = diametro();
    var r = punto.getBoundingClientRect();
    origen = { x: r.left + r.width / 2, y: r.top + r.height / 2, d: r.width || origen.d };
    capa.classList.remove('is-lista');
    capa.classList.add('is-cerrando');
    bola.style.transform = 'translate3d(' + (origen.x - D / 2) + 'px,' + (origen.y - D / 2) + 'px,0) scale(' + (origen.d / D) + ')';
    var c = capa;
    setTimeout(function () {
      if (c.parentNode) c.parentNode.removeChild(c); // fuera el iframe: libera la GPU
      punto.style.visibility = '';
      html.classList.remove('esfera-abierta');
    }, reduce ? 0 : 720);
    capa = bola = marco = null;
    abierta = false;
    var api = window.__fluidBackgroundAPI;
    if (api && api.applySettings) api.applySettings({ PAUSED: false });
  }

  punto.addEventListener('click', function (e) { e.preventDefault(); abrir(); });
  window.addEventListener('message', function (e) {
    var m = e.data && e.data.esfera;
    if (m === 'lista') lista();
    if (m === 'cerrar') cerrar();
  });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });
  window.addEventListener('pisos:cambio', function (e) { if (e.detail.index !== 0) cerrar(); });
  // si el iframe no avisa (sin WebGL), se queda la bola plana; un clic en el fondo la cierra
  document.addEventListener('click', function (e) { if (abierta && e.target === capa) cerrar(); });
})();
