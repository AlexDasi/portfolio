/* La esfera (feedback 83-85, 95 y 98; rama rediseno-baraja-2026-11, ATELIER conv. 1330).
   Escritorio: el punto de «Alex Dasi» anuncia que pasa algo: al acercarte te sigue un poco, se imanta, crece y
   le sale un aro fino del acento que late (v4, feedback 98). Al hacer clic crece hasta la esfera DETRÁS del texto
   (el saludo queda delante y legible), sin cambiar el fondo ni el color: día/noche y acento, los activos en ese momento.
   La esfera es la demo aprobada v9 (esfera/esfera-pieles.html, modo ?embed, transparente y teñida con el acento).
   El iframe (three.js) solo se crea al hacer clic: nada de WebGL de la esfera en la primera carga.
   Clic fuera o Esc la devuelve al punto.
   v5 (feedback 106-115): la piel sale al azar una vez por sesión (window.__PIEL, header-baraja.php) entre
   solare|chicle|glaseado|gota|prisma|cuarzo|gema y es la misma en «Hablamos» del Sobre mí; ?piel= fuerza una.
   Con la esfera abierta el fluido de fuera se queda congelado y el ratón juega con la esfera (iframe encima del fondo).
   Móvil (sin ratón): sin fluido; la esfera flota en el centro de la intro, con spin con el dedo; se pausa fuera de pantalla. */
(function () {
  'use strict';
  var q = new URLSearchParams(location.search);
  var PIELES = ['solare', 'chicle', 'glaseado', 'gota', 'prisma', 'cuarzo', 'gema'];
  var piel = window.__PIEL && PIELES.indexOf(window.__PIEL) >= 0 ? window.__PIEL : (PIELES.indexOf(q.get('piel')) >= 0 ? q.get('piel') : 'solare');
  var fino = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var html = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function acento() {
    var c = window.__CURSOR;
    var col = c && c.paleta ? c.paleta[c.i] : { r: 236, g: 249, b: 142 };
    return col.r + ',' + col.g + ',' + col.b;
  }
  function src(extra) { return 'esfera/esfera-pieles.html?embed&piel=' + piel + '&acento=' + acento() + (extra || ''); }

  // ---------- «Hablamos» (Sobre mí): la misma esfera, con la misma piel (feedback 106) ----------
  // La bola plana del acento se queda de marcador hasta que la esfera está lista. three.js solo baja al llegar a esa pantalla.
  document.querySelectorAll('[data-esfera-habla]').forEach(function (bolaH) {
    var esMovil = !fino || window.innerWidth <= 1280;
    var marcoH = null, enVista = false;
    function pausa(p) { if (marcoH) try { marcoH.contentWindow.postMessage({ esferaPausa: p }, '*'); } catch (e) {} }
    function cargarH() {
      if (marcoH) { pausa(false); return; }
      marcoH = document.createElement('iframe');
      marcoH.title = 'Sphere';
      marcoH.setAttribute('allowtransparency', 'true');
      marcoH.setAttribute('tabindex', '-1');
      marcoH.src = src('&frac=0.56&hudizq' + (esMovil ? '&movil' : ''));
      // dentro del marco pinta la esfera su propio cursor: el de la página se esconde mientras estás encima
      marcoH.addEventListener('mouseenter', function () { html.classList.add('cursor-en-esfera'); });
      marcoH.addEventListener('mouseleave', function () { html.classList.remove('cursor-en-esfera'); });
      bolaH.appendChild(marcoH);
    }
    window.addEventListener('message', function (e) {
      if (marcoH && e.source === marcoH.contentWindow && e.data && e.data.esfera === 'lista') bolaH.classList.add('is-lista');
    });
    var pantalla = bolaH.closest('.swiper-slide');
    if (pantalla && !esMovil) {
      var indice = [].indexOf.call(pantalla.parentNode.children, pantalla);
      window.addEventListener('pisos:cambio', function (e) {
        enVista = e.detail.index === indice;
        if (enVista) cargarH(); else pausa(true);
      });
      var sw = pantalla.closest('[data-initial]');
      if (sw && +sw.getAttribute('data-initial') === indice) setTimeout(cargarH, 400);
    } else if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        enVista = en[0].isIntersecting;
        if (enVista) cargarH(); else pausa(true);
        if (marcoH) marcoH.style.visibility = enVista ? 'visible' : 'hidden';
      }, { rootMargin: '200px 0px' }).observe(bolaH);
    }
  });

  // ---------- móvil / tablet táctil ----------
  if (!fino || window.innerWidth <= 1280) {
    var caja = document.querySelector('.pantalla--intro .intro__esfera');
    if (!caja) return;
    html.classList.add('esfera-movil');
    var cargar = function () {
      if (caja.querySelector('iframe')) return;
      var f = document.createElement('iframe');
      f.src = src('&movil');
      f.title = 'Sphere';
      f.setAttribute('allowtransparency', 'true');
      f.addEventListener('load', function () { caja.classList.add('is-lista'); });
      caja.appendChild(f);
    };
    // la bola se carga con la página ya pintada y en reposo (no compite con el primer pintado)
    var luego = function () { (window.requestIdleCallback || function (fn) { setTimeout(fn, 300); })(cargar, { timeout: 1200 }); };
    if (document.readyState === 'complete') luego(); else window.addEventListener('load', luego);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        var f = caja.querySelector('iframe');
        if (!f) return;
        f.style.visibility = en[0].isIntersecting ? 'visible' : 'hidden';
        try { f.contentWindow.postMessage({ esferaPausa: !en[0].isIntersecting }, '*'); } catch (e) {}
      }).observe(caja);
    }
    return;
  }

  // ---------- escritorio ----------
  var punto = document.querySelector('.MainSwiper [data-esfera]');
  if (!punto) return;
  var cont = punto.closest('.swiper-slide') || document.body; // la capa vive en la pantalla de la intro, detrás del texto
  var capa = null, bola = null, marco = null, abierta = false, origen = null;

  // --- el punto anuncia el clic: imán + aro (solo transform; el bucle se para cuando llega) ---
  var IMAN = { radio: 120, fuerza: 0.32, max: 18 };
  var off = { x: 0, y: 0 }, meta = { x: 0, y: 0 }, rafImán = 0, cerca = false;
  function pasoImán() {
    rafImán = 0;
    var k = reduce ? 1 : 0.22;
    off.x += (meta.x - off.x) * k;
    off.y += (meta.y - off.y) * k;
    if (Math.abs(meta.x - off.x) < 0.05 && Math.abs(meta.y - off.y) < 0.05) { off.x = meta.x; off.y = meta.y; }
    punto.style.setProperty('--mx', off.x.toFixed(2) + 'px');
    punto.style.setProperty('--my', off.y.toFixed(2) + 'px');
    if (off.x !== meta.x || off.y !== meta.y) rafImán = requestAnimationFrame(pasoImán);
  }
  function pedirImán() { if (!rafImán) rafImán = requestAnimationFrame(pasoImán); }
  var enIntro = true;
  window.addEventListener('pisos:cambio', function (e) { enIntro = e.detail.index === 0; });
  window.addEventListener('mousemove', function (e) {
    if (abierta || !enIntro) return;
    var r = punto.getBoundingClientRect();
    var cx = r.left + r.width / 2 - off.x, cy = r.top + r.height / 2 - off.y; // centro en reposo
    if (r.width === 0) return;
    var dx = e.clientX - cx, dy = e.clientY - cy, d = Math.sqrt(dx * dx + dy * dy);
    var ahora = d < IMAN.radio;
    if (ahora) {
      var f = IMAN.fuerza * (1 - Math.pow(d / IMAN.radio, 2) * 0.35);
      meta.x = Math.max(-IMAN.max, Math.min(IMAN.max, dx * f));
      meta.y = Math.max(-IMAN.max, Math.min(IMAN.max, dy * f));
    } else { meta.x = 0; meta.y = 0; }
    if (ahora !== cerca) { cerca = ahora; punto.classList.toggle('is-cerca', cerca); html.classList.toggle('punto-cerca', cerca); }
    if (meta.x !== off.x || meta.y !== off.y) pedirImán();
  }, { passive: true });

  function diametro() { return 0.56 * Math.min(window.innerWidth, window.innerHeight); }
  function caja0() { return cont.getBoundingClientRect(); }

  function abrir() {
    if (abierta) return;
    abierta = true;
    html.classList.add('esfera-abierta');
    punto.classList.remove('is-cerca'); html.classList.remove('punto-cerca'); cerca = false;
    var b = caja0();
    var r = punto.getBoundingClientRect();
    origen = { x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top, d: r.width };
    capa = document.createElement('div');
    capa.className = 'esfera-capa';
    bola = document.createElement('div');
    bola.className = 'esfera-bola';
    marco = document.createElement('iframe');
    marco.className = 'esfera-marco';
    marco.title = 'Sphere';
    marco.setAttribute('allowtransparency', 'true');
    marco.src = src(); // import dinámico de verdad: three.js solo baja ahora, al hacer clic
    capa.appendChild(marco);
    capa.appendChild(bola);
    cont.insertBefore(capa, cont.firstChild);
    // la bola sale del punto…
    var D = diametro();
    bola.style.width = bola.style.height = D + 'px';
    bola.style.transform = 'translate3d(' + (origen.x - D / 2) + 'px,' + (origen.y - D / 2) + 'px,0) scale(' + (origen.d / D) + ')';
    void bola.offsetWidth;
    // …y vuela al centro mientras crece, por detrás del saludo
    requestAnimationFrame(function () {
      capa.classList.add('is-abierta');
      bola.style.transform = 'translate3d(' + (b.width / 2 - D / 2) + 'px,' + (b.height / 2 - D / 2) + 'px,0) scale(1)';
    });
    punto.style.visibility = 'hidden';
    meta.x = meta.y = off.x = off.y = 0;
    punto.style.setProperty('--mx', '0px'); punto.style.setProperty('--my', '0px');
    var api = window.__fluidBackgroundAPI;
    if (api && api.applySettings) api.applySettings({ PAUSED: true }); // la escena 3D se lleva la GPU; el fluido se duerme
  }

  function lista() {
    if (!capa) return;
    capa.classList.add('is-lista'); // la esfera de verdad aparece y la bola plana se funde
  }

  function cerrar() {
    if (!abierta || !capa) return;
    var D = diametro();
    var b = caja0();
    var r = punto.getBoundingClientRect();
    origen = { x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top, d: r.width || origen.d };
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
    if (m === 'espacio' && window.__acentoSiguiente) window.__acentoSiguiente(); // espacio con el foco en la esfera: igual que fuera
  });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });
  window.addEventListener('pisos:cambio', function (e) { if (e.detail.index !== 0) cerrar(); });
  // si el iframe no avisa (sin WebGL), se queda la bola plana; un clic en el fondo la cierra
  document.addEventListener('click', function (e) { if (abierta && e.target === capa) cerrar(); });
})();
