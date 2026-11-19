/* Ficha de proyecto (proyecto.php) · v7 (feedback 128-136; v6 = feedback 116; ATELIER conv. 1330).
   - Vídeos según el ancho: en escritorio y tablet, el de escritorio (HD) grande + el de móvil montado encima;
     en móvil solo el de móvil (el de escritorio ni se pide). Van mudos y solo corren mientras están a la vista.
   - Entrada de cada bloque al llegar (opacidad + translate; sin JS o con «reducir movimiento» todo se ve).
   - La cabecera fija se aparta al bajar y vuelve al subir.
   - Deriva suave de las pantallas de «Momentos» al hacer scroll (solo escritorio, solo transform, bucle parado en reposo). */
(function () {
  'use strict';
  var raiz = document.querySelector('[data-ficha]');
  if (!raiz) return;
  var mm = window.matchMedia ? window.matchMedia.bind(window) : function () { return { matches: false }; };
  var movil = window.innerWidth < 760;
  var quieto = mm('(prefers-reduced-motion: reduce)').matches;

  /* ---- vídeos ---- */
  var videos = [];
  [].forEach.call(raiz.querySelectorAll('.fp__video video'), function (v) {
    var esD = v.hasAttribute('data-video-d');
    if (esD && movil) return;                       // en móvil el de escritorio no se carga
    v.poster = esD ? v.getAttribute('data-poster-d') : v.getAttribute('data-poster-m');
    v.dataset.src = esD ? v.getAttribute('data-video-d') : v.getAttribute('data-video-m');
    videos.push(v);
  });
  // vídeos cortos de «Momentos» (microinteracciones y pasadas): póster según el hueco, el mp4 solo al llegar
  [].forEach.call(raiz.querySelectorAll('video[data-video]'), function (v) {
    var hueco = (v.parentNode.clientWidth || 300) * Math.min(window.devicePixelRatio || 1, 3);
    v.poster = hueco > (parseFloat(v.getAttribute('data-wc')) || 720) * 1.08 ? v.getAttribute('data-poster-d') : v.getAttribute('data-poster-m');
    v.dataset.src = v.getAttribute('data-video');
    videos.push(v);
  });
  function corre(v, si) {
    if (si) {
      if (!v.getAttribute('src')) { v.src = v.dataset.src; }
      if (quieto) return;                            // con «reducir movimiento» se queda el póster
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    } else if (!v.paused) { v.pause(); }
  }
  if ('IntersectionObserver' in window) {
    var ojoV = new IntersectionObserver(function (es) {
      es.forEach(function (e) { corre(e.target, e.isIntersecting); });
    }, { rootMargin: '120px 0px' });
    videos.forEach(function (v) { ojoV.observe(v); });
  } else {
    videos.forEach(function (v) { corre(v, true); });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) videos.forEach(function (v) { v.pause(); });
  });

  /* ---- capturas de «Momentos»: la versión que toca según el hueco y la densidad de la pantalla ---- */
  var fotos = [].slice.call(raiz.querySelectorAll('img[data-poster-d]'));
  function carga(img) {
    if (img.getAttribute('src')) return;
    var hueco = (img.parentNode.clientWidth || img.clientWidth || 300) * Math.min(window.devicePixelRatio || 1, 3);
    img.src = hueco > (parseFloat(img.getAttribute('data-wc')) || 900) * 1.08 ? img.getAttribute('data-poster-d') : img.getAttribute('data-poster-m');
  }
  if ('IntersectionObserver' in window) {
    var ojoF = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { carga(e.target); ojoF.unobserve(e.target); } });
    }, { rootMargin: '600px 400px' });
    fotos.forEach(function (f) { ojoF.observe(f); });
  } else { fotos.forEach(carga); }

  /* ---- entrada ---- */
  var entran = [].slice.call(raiz.querySelectorAll('[data-fp-entra]'));
  if ('IntersectionObserver' in window && !quieto) {
    var ojoE = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); ojoE.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    entran.forEach(function (el) { ojoE.observe(el); });
    // red de seguridad: nada se queda invisible si el observador no dispara
    setTimeout(function () { entran.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < window.innerHeight) el.classList.add('is-in'); }); }, 1200);
  } else {
    entran.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- la cabecera fija se aparta al bajar y vuelve al subir (el scroll vive en <body>) ---- */
  var html = document.documentElement, antes = 0;
  function dondeVa() { return document.body.scrollTop || html.scrollTop || window.pageYOffset || 0; }
  document.addEventListener('scroll', function () {
    var y = dondeVa();
    if (Math.abs(y - antes) < 6) return;
    html.classList.toggle('fp-baja', y > 140 && y > antes);
    antes = y;
  }, { passive: true, capture: true });

  /* ---- deriva de los momentos (escritorio) ---- */
  var par = [].slice.call(raiz.querySelectorAll('[data-fp-par]'));
  if (!par.length || movil || quieto || !mm('(hover: hover) and (pointer: fine)').matches) return;
  var marcos = par.map(function (el) { return { el: el.querySelector('.fp__m-marco') || el, k: parseFloat(el.getAttribute('data-fp-par')) || 0, raiz: el }; });
  var pedido = false;
  function pinta() {
    pedido = false;
    var vh = window.innerHeight;
    marcos.forEach(function (m) {
      var r = m.raiz.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var d = (r.top + r.height / 2) - vh / 2;       // distancia al centro de la pantalla
      m.el.style.transform = 'translate3d(0,' + (d * m.k).toFixed(1) + 'px,0)';
    });
  }
  // el scroll de esta web vive en <body> (no en la ventana): se escucha en captura desde el documento
  document.addEventListener('scroll', function () { if (!pedido) { pedido = true; requestAnimationFrame(pinta); } }, { passive: true, capture: true });
  pinta();
})();
