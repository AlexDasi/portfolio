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
  // v9 (QA H-10/H-21): su póster ya no se pide al cargar (competía con la portada): se pone con las capturas, al acercarse
  function posterDe(v) {
    if (v.getAttribute('poster')) return;
    var hueco = (v.parentNode.clientWidth || 300) * Math.min(window.devicePixelRatio || 1, 3);
    v.poster = hueco > (parseFloat(v.getAttribute('data-wc')) || 720) * 1.08 ? v.getAttribute('data-poster-d') : v.getAttribute('data-poster-m');
  }
  [].forEach.call(raiz.querySelectorAll('video[data-video]'), function (v) {
    v.dataset.src = v.getAttribute('data-video');
    v.preload = 'none';
    videos.push(v);
  });
  /* v15 (Alex, 21/11: «que los vídeos de ejemplo sean más intuitivos»): los vídeos de «Momentos» y de los casos ya NO arrancan
     solos: póster + botón grande de play encima → al pulsar, aro de carga → corre, con el icono de pausa (al pasar el ratón o
     al tocar). La etiqueta «Vídeo» del pie es otro botón con el mismo estado. Al salir de pantalla se pausa y al volver sigue
     si lo habías puesto tú. Los de la portada (escritorio + móvil) siguen corriendo solos: son la web en uso, no un ejemplo. */
  var ES = document.documentElement.lang === 'es';
  var ICO = '<svg class="fv-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>'
    + '<svg class="fv-pausa" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5.5h3v13h-3zM13.5 5.5h3v13h-3z" fill="currentColor"/></svg>'
    + '<span class="fv-aro" aria-hidden="true"></span>';
  function estado(v, e) {
    v._estado = e;
    var cajas = [v._boton, v._pie];
    cajas.forEach(function (b) {
      if (!b) return;
      b.setAttribute('data-estado', e);
      b.setAttribute('aria-label', e === 'corre' ? (ES ? 'Pausar vídeo' : 'Pause video') : (ES ? 'Reproducir vídeo' : 'Play video'));
    });
    if (v._pie) v._pie.setAttribute('aria-pressed', e === 'corre' ? 'true' : 'false');
  }
  function alterna(v) {
    if (v._estado === 'corre' || v._estado === 'carga') { v._quiere = false; v._paro = true; v.pause(); estado(v, 'parado'); return; }
    v._quiere = true; v._paro = false; v.parentNode.classList.remove('fv--auto');
    posterDe(v);
    if (!v.getAttribute('src')) v.src = v.dataset.src;
    estado(v, v.readyState >= 3 ? 'corre' : 'carga');
    var p = v.play(); if (p && p.catch) p.catch(function () { v._quiere = false; estado(v, 'parado'); });
  }
  function conMando(v) {
    var caja = v.parentNode;
    caja.classList.add('fv');
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'fv-boton'; b.innerHTML = ICO;
    caja.appendChild(b); v._boton = b;
    caja.addEventListener('mouseleave', function () { caja.classList.remove('fv--toca'); }); // v27: el botón se va al salir el ratón
    b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); alterna(v); if (v._estado === 'corre') caja.classList.add('fv--toca'); });
    var fig = v.closest('figure');
    var i = fig && fig.querySelector('figcaption i');
    if (i) {
      var pb = document.createElement('button');
      pb.type = 'button'; pb.className = 'fv-pie';
      pb.innerHTML = ICO + '<span>' + i.textContent + '</span>';
      i.textContent = ''; i.appendChild(pb); i.classList.add('fv-pie-caja'); v._pie = pb;
      pb.addEventListener('click', function (e) { e.preventDefault(); alterna(v); });
    }
    v.addEventListener('waiting', function () { if (v._quiere) estado(v, 'carga'); });
    v.addEventListener('playing', function () { estado(v, 'corre'); setTimeout(function () { caja.classList.remove('fv--toca'); }, 1400); });
    v.addEventListener('pause', function () { if (!v._quiere || v._fuera) estado(v, 'parado'); });
    estado(v, 'parado');
  }
  function corre(v, si) {
    if (v.hasAttribute('data-video')) { // v27 (Alex, conv. 1414): «todos los mockups que sean vídeos, ya activos» → corren solos a la vista; si la persona los pausa, se quedan parados
      if (si) {
        posterDe(v);
        if (v._paro || quieto) return;
        v._quiere = true; v._fuera = false; v.parentNode.classList.add('fv--auto');
        if (!v.getAttribute('src')) v.src = v.dataset.src;
        var p0 = v.play(); if (p0 && p0.catch) p0.catch(function () { estado(v, 'parado'); });
      } else if (!v.paused) { v._fuera = true; v.pause(); }
      return;
    }
    if (si) {
      if (v.hasAttribute('data-video')) posterDe(v);
      if (!v.getAttribute('src')) { v.src = v.dataset.src; }
      if (quieto) return;                            // con «reducir movimiento» se queda el póster
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    } else if (!v.paused) { v.pause(); }
  }
  videos.forEach(function (v) { if (v.hasAttribute('data-video')) conMando(v); });
  if ('IntersectionObserver' in window) {
    var ojoV = new IntersectionObserver(function (es) {
      es.forEach(function (e) { corre(e.target, e.isIntersecting); });
    }, { rootMargin: '120px 0px' });
    videos.forEach(function (v) { ojoV.observe(v); });
  } else {
    videos.forEach(function (v) { corre(v, true); });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) videos.forEach(function (v) { if (!v.paused && v.hasAttribute('data-video')) v._fuera = true; v.pause(); });
  });

  /* ---- capturas de «Momentos»: la versión que toca según el hueco y la densidad de la pantalla ---- */
  var fotos = [].slice.call(raiz.querySelectorAll('img[data-poster-d], video[data-video]'));
  function carga(img) {
    if (img.tagName === 'VIDEO') { posterDe(img); return; }
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

  /* ---- v9 (QA H-09): en móvil lo largo se pliega con «Ver más» (sin JS se ve todo) ---- */
  if (movil) {
    [].forEach.call(raiz.querySelectorAll('[data-fp-plegable]'), function (bloque) {
      var boton = bloque.querySelector('[data-fp-mas]') || (bloque.nextElementSibling && bloque.nextElementSibling.matches('[data-fp-mas]') ? bloque.nextElementSibling : null);
      if (!boton) return;
      bloque.classList.add('is-plegado');
      if (bloque.classList.contains('fp__caso') && bloque.scrollHeight <= bloque.clientHeight + 40) { bloque.classList.remove('is-plegado'); return; }
      boton.hidden = false;
      boton.setAttribute('aria-expanded', 'false');
      boton.addEventListener('click', function () {
        bloque.classList.remove('is-plegado');
        boton.hidden = true;
        [].forEach.call(bloque.querySelectorAll('img[data-poster-d], video[data-video]'), function (f) { carga(f); });
      });
    });
    // momentos en fila: se cargan todas sus capturas al acercarse (el observador no ve las que están fuera por la derecha)
    // y el contador dice cuál tienes delante
    var tira = raiz.querySelector('[data-fp-tira]'), cuenta = raiz.querySelector('[data-fp-n]');
    if (tira) {
      var cargaTira = function () { [].forEach.call(tira.querySelectorAll('img[data-poster-d], video[data-video]'), carga); };
      if ('IntersectionObserver' in window) {
        var ojoT = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { cargaTira(); ojoT.disconnect(); } }, { rootMargin: '700px 0px' });
        ojoT.observe(tira);
      } else { cargaTira(); }
      if (cuenta) {
        var figs = [].slice.call(tira.children).sort(function (a, b) { return a.getBoundingClientRect().left - b.getBoundingClientRect().left; });
        var pide = false;
        tira.addEventListener('scroll', function () {
          if (pide) return; pide = true;
          requestAnimationFrame(function () {
            pide = false;
            var x0 = tira.getBoundingClientRect().left, mejor = 0, d = 1e9;
            figs.forEach(function (f, k) { var dd = Math.abs(f.getBoundingClientRect().left - x0 - 22); if (dd < d) { d = dd; mejor = k; } });
            cuenta.textContent = (mejor < 9 ? '0' : '') + (mejor + 1);
          });
        }, { passive: true });
        // vídeos de la fila: solo corre el que está a la vista dentro de la fila
        if ('IntersectionObserver' in window) {
          var ojoFila = new IntersectionObserver(function (es) {
            es.forEach(function (e) { var v = e.target.querySelector('video[data-video]'); if (v) corre(v, e.intersectionRatio > 0.5); });
          }, { root: tira, threshold: [0, 0.5, 1] });
          figs.forEach(function (f) { ojoFila.observe(f); });
        }
      }
    }
  }

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
