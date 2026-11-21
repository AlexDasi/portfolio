/* La esfera (feedback 83-85, 95 y 98; rama rediseno-baraja-2026-11, ATELIER conv. 1330).
   Escritorio: el punto de «Alex Dasi» anuncia que pasa algo: al acercarte te sigue un poco, se imanta, crece y
   le sale un aro fino del acento que late (v4, feedback 98). Al hacer clic crece hasta la esfera DETRÁS del texto
   (el saludo queda delante y legible), sin cambiar el fondo ni el color: día/noche y acento, los activos en ese momento.
   La esfera es la demo aprobada v9 (esfera/esfera-pieles.html, modo ?embed, transparente y teñida con el acento).
   El iframe (three.js) solo se crea al hacer clic: nada de WebGL de la esfera en la primera carga.
   Clic fuera o Esc la devuelve al punto.
   v5 (feedback 106-115): pieles solare|chicle|glaseado|gota|prisma|cuarzo|gema.
   v6 (feedback 119-120): la piel CAMBIA: nueva al azar en cada carga (header-baraja.php) y otra cada vez que se vuelve a
   abrir, nunca la misma que la anterior; la última que se ha visto se apunta y «Hablamos» enseña esa. El fluido de fuera
   ya NO se congela nunca: el marco de la esfera no recoge el ratón (pointer-events: none) hasta que el ratón entra en la
   bola; entonces la interacción es de la esfera (gas, chicle, caras…) y el fluido no pinta encima; al salir de la bola sin
   arrastrar, el marco lo devuelve ({esfera:'fuera'}) y el fluido sigue. Igual en la home y en «Hablamos».
   Móvil (sin ratón): sin fluido; la esfera flota en el centro de la intro, con spin con el dedo; se pausa fuera de pantalla. */
(function () {
  'use strict';
  var q = new URLSearchParams(location.search);
  var PIELES = window.__PIELES || ['solare', 'chicle', 'glaseado', 'gota', 'prisma', 'cuarzo', 'gema'];
  var piel = PIELES.indexOf(window.__PIEL) >= 0 ? window.__PIEL : 'solare';
  var forzada = PIELES.indexOf(q.get('piel')) >= 0;
  var fino = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var html = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // v8 (feedback 153): la home apunta además la piel que se ha visto en ESTA visita (sessionStorage); «Hablamos» solo la
  // repite si vienes de la home sin recargar. Si recargas o entras directo, otra al azar en cada carga.
  function apuntar(p, enHome) { try { localStorage.setItem('alexdasi-piel-ultima', p); if (enHome) sessionStorage.setItem('alexdasi-piel-home', p); } catch (e) {} }
  function pielHabla() {
    if (forzada) return piel;
    var vista = null, recarga = false, deHome = false;
    try { vista = sessionStorage.getItem('alexdasi-piel-home'); } catch (e) {}
    try { var nav = performance.getEntriesByType('navigation')[0]; recarga = !!nav && nav.type === 'reload'; } catch (e) {}
    try { var r = new URL(document.referrer); deHome = r.host === location.host && /^\/(index(-en)?\.(php|html))?$/.test(r.pathname); } catch (e) {}
    if (vista && PIELES.indexOf(vista) >= 0 && deHome && !recarga) return vista;
    var ultima = window.__PIEL_ULTIMA, resto = PIELES.filter(function (x) { return x !== ultima; });
    return resto[Math.floor(Math.random() * resto.length)];
  }
  function otraPiel() { // al azar entre las demás (nunca repite la que se acaba de ver)
    if (forzada) return piel;
    var resto = PIELES.filter(function (x) { return x !== piel; });
    return resto[Math.floor(Math.random() * resto.length)];
  }
  function dia() { return html.classList.contains('tema-dia'); }
  // el día/noche llega a todas las esferas abiertas (la de día sale más clara, feedback 122)
  new MutationObserver(function () {
    document.querySelectorAll('iframe.esfera-marco, .intro__esfera iframe, .sm__habla-bola iframe').forEach(function (f) {
      try { f.contentWindow.postMessage({ esferaTema: dia() ? 'dia' : 'noche' }, '*'); f.contentWindow.postMessage({ esferaAcento: acento().split(',') }, '*'); } catch (e) {}
    });
  }).observe(html, { attributes: true, attributeFilter: ['class'] });

  // v8 (feedback 156): última posición del ratón, para decidir sin esperar a que se mueva
  var raton = null;
  window.addEventListener('mousemove', function (e) { raton = { clientX: e.clientX, clientY: e.clientY }; }, { passive: true, capture: true });

  /* La mano (feedback 120): el marco solo recoge el ratón dentro de la bola. disco() da centro y radio en pantalla.
     v8 (feedback 156): «el clic en la esfera a veces falla». Causa: el marco solo pasaba a recoger el ratón con un MOVIMIENTO
     dentro de la bola ya lista. Al abrirla, el ratón ya está dentro (el punto queda dentro del disco) y si no se mueve, el
     primer clic caía en la página y la esfera no se enteraba; igual si la esfera terminaba de cargar con el ratón quieto
     encima. Ahora se mira la última posición en cuanto la bola está lista (revisar) y en cada pulsación (captura). */
  function mano(marco, disco) {
    var dentro = false;
    marco.style.pointerEvents = 'none';
    function soltar() {
      if (!dentro) return;
      dentro = false;
      marco.style.pointerEvents = 'none';
      // v7 (feedback 125): el punto de la página vuelve en el primer movimiento que le llega (si se quitara ya, saldría un
      // instante donde se quedó al entrar en la bola)
      window.addEventListener('mousemove', function vuelve() {
        window.removeEventListener('mousemove', vuelve);
        if (!dentro) html.classList.remove('cursor-en-esfera');
      }, { passive: true });
      window.__fluidSinSalto = true;
      window.dispatchEvent(new CustomEvent('esfera:mano', { detail: false }));
    }
    function mira(e) {
      if (!marco.isConnected) return;
      var d = disco(); if (!d) return;
      if (dentro) {
        // v7 (feedback 142): si a la página le llega un movimiento lejos de la bola, el ratón ya no está en el marco (salida
        // de golpe: el marco a veces no se entera). Se suelta aquí mismo y el punto vuelve ya, sin esperar al marco.
        if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > d.r * 1.12) { soltar(); html.classList.remove('cursor-en-esfera'); }
        return;
      }
      if (Math.hypot(e.clientX - d.x, e.clientY - d.y) < d.r * 0.96) {
        dentro = true;
        marco.style.pointerEvents = 'auto';
        html.classList.add('cursor-en-esfera');
        window.dispatchEvent(new CustomEvent('esfera:mano', { detail: true }));
      }
    }
    function revisar() { if (raton && !dentro) mira(raton); }
    window.addEventListener('mousemove', mira, { passive: true });
    window.addEventListener('message', function (e) { if (e.source === marco.contentWindow && e.data && e.data.esfera === 'fuera') soltar(); });
    return { soltar: soltar, revisar: revisar, quitar: function () { soltar(); window.removeEventListener('mousemove', mira); } };
  }

  function acento() { // v8 (feedback 147): de día, la variante de día del acento (la bola plana y la esfera, del mismo color)
    var c = window.__CURSOR;
    var col = c && c.paleta ? c.paleta[c.i] : { r: 236, g: 249, b: 142 };
    if (col.d && dia()) col = col.d;
    return col.r + ',' + col.g + ',' + col.b;
  }
  function src(extra, p) { return 'esfera/esfera-pieles.html?embed&piel=' + (p || piel) + '&acento=' + acento() + (dia() ? '&dia' : '') + (/^[ab]$/.test(q.get('niebla') || '') ? '&niebla=' + q.get('niebla') : '') + (extra || ''); } // v8 (feedback 157): ?niebla=a|b

  // ---------- «Hablamos» (Sobre mí): la esfera con la ÚLTIMA piel que se ha visto (feedback 106, 119) ----------
  // La bola plana del acento se queda de marcador hasta que la esfera está lista. three.js solo baja al llegar a esa pantalla.
  document.querySelectorAll('[data-esfera-habla]').forEach(function (bolaH) {
    var esMovil = !fino || window.innerWidth <= 1280;
    var marcoH = null, enVista = false, manoHabla = null;
    function pausa(p) { if (marcoH) try { marcoH.contentWindow.postMessage({ esferaPausa: p }, '*'); } catch (e) {} }
    function cargarH() {
      if (marcoH) { pausa(false); return; }
      marcoH = document.createElement('iframe');
      marcoH.title = document.documentElement.lang === 'es' ? 'Esfera' : 'Sphere'; // v9 (QA H-19)
      marcoH.setAttribute('allowtransparency', 'true');
      marcoH.setAttribute('tabindex', '-1');
      var pielH = pielHabla();
      marcoH.src = src('&frac=0.56&hudizq' + (esMovil ? '&movil' : '&mano'), pielH);
      apuntar(pielH);
      bolaH.appendChild(marcoH);
      // dentro de la bola manda la esfera (su propio cursor, arrastre con inercia, clic); fuera, el fluido de la página
      if (!esMovil) manoHabla = mano(marcoH, function () {
        if (!bolaH.classList.contains('is-lista')) return null;
        var r = bolaH.getBoundingClientRect();
        return r.width ? { x: r.left + r.width / 2, y: r.top + r.height / 2, r: r.width / 2 } : null;
      });
    }
    window.addEventListener('message', function (e) {
      if (marcoH && e.source === marcoH.contentWindow && e.data && e.data.esfera === 'lista') { bolaH.classList.add('is-lista'); if (manoHabla) manoHabla.revisar(); }
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
      apuntar(piel, true);
      f.title = document.documentElement.lang === 'es' ? 'Esfera' : 'Sphere'; // v9 (QA H-19)
      f.setAttribute('allowtransparency', 'true');
      // v10: lista = primer fotograma pintado (mensaje 'lista'), no el 'load' del marco (que llegaba antes de que se viera
      // nada); hasta entonces late el disco del acento (preloader). Red de seguridad: 4 s después del load.
      var lista = function () { caja.classList.add('is-lista'); };
      window.addEventListener('message', function (e) { if (e.source === f.contentWindow && e.data && e.data.esfera === 'lista') lista(); });
      f.addEventListener('load', function () { setTimeout(lista, 4000); });
      caja.appendChild(f);
    };
    // v10 (Alex, 21/11: «que cargue mucho más rápido»): el marco se crea en cuanto existe el DOM (este script va al final
    // del body), sin esperar al 'load' de la página (que esperaba a los pósters de la baraja) ni al reposo. three.js ya
    // viene de casa en un solo archivo y precargado desde la cabecera.
    cargar();
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
  var capa = null, bola = null, marco = null, manoH = null, abierta = false, origen = null, vecesAbierta = 0;

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

  /* v7 (feedback 143): PRECARGA. Con la home ya cargada y el navegador en reposo se monta, invisible y debajo de todo, la
     esfera de la piel que va a salir: baja three.js, construye la pieza, compila sus shaders, pinta 2 fotogramas y se PAUSA
     (cero trabajo después: el bucle de la esfera se para). Al hacer clic la capa ya está hecha: solo vuela la bola plana del
     punto y la esfera aparece cuando llega. Al cerrar, se precarga en reposo la piel de la próxima vez. */
  var pre = null, proxima = piel;
  function precargar() {
    if (pre || abierta || !cont.isConnected) return;
    var c = document.createElement('div');
    c.className = 'esfera-capa is-precarga';
    var m = document.createElement('iframe');
    m.className = 'esfera-marco';
    m.title = document.documentElement.lang === 'es' ? 'Esfera' : 'Sphere'; // v9 (QA H-19)
    m.setAttribute('allowtransparency', 'true');
    m.setAttribute('tabindex', '-1');
    m.setAttribute('aria-hidden', 'true');
    m.style.pointerEvents = 'none';
    m.src = src('&mano', proxima);
    c.appendChild(m);
    cont.insertBefore(c, cont.firstChild);
    pre = { capa: c, marco: m, piel: proxima, lista: false };
  }
  function enReposo(fn, ms) {
    setTimeout(function () { (window.requestIdleCallback || function (f) { setTimeout(f, 50); })(fn, { timeout: 2500 }); }, ms || 0);
  }
  if (q.get('precarga') !== 'no') {
    if (document.readyState === 'complete') enReposo(precargar, 600);
    else window.addEventListener('load', function () { enReposo(precargar, 600); });
  }

  function abrir() {
    if (abierta) return;
    abierta = true;
    html.classList.add('esfera-abierta');
    punto.classList.remove('is-cerca'); html.classList.remove('punto-cerca'); cerca = false;
    var b = caja0();
    var r = punto.getBoundingClientRect();
    origen = { x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top, d: r.width };
    piel = proxima; // v6 (feedback 119): cada vez que se vuelve a abrir, otra piel (se decide al cerrar: proxima)
    vecesAbierta++;
    apuntar(piel, true);
    var listaYa = false;
    if (pre && pre.piel === piel && pre.capa.isConnected) {
      capa = pre.capa; marco = pre.marco; listaYa = pre.lista;
      capa.classList.remove('is-precarga');
      marco.removeAttribute('aria-hidden');
      // sigue en pausa (enseña el fotograma ya pintado) hasta que toma el relevo: la bola vuela sin competir con WebGL
      if (!listaYa) try { marco.contentWindow.postMessage({ esferaPausa: false }, '*'); } catch (e) {}
      try { marco.contentWindow.postMessage({ esferaAcento: acento().split(',') }, '*'); marco.contentWindow.postMessage({ esferaTema: dia() ? 'dia' : 'noche' }, '*'); } catch (e) {}
    } else {
      if (pre && pre.capa.parentNode) pre.capa.parentNode.removeChild(pre.capa);
      capa = document.createElement('div');
      capa.className = 'esfera-capa';
      marco = document.createElement('iframe');
      marco.className = 'esfera-marco';
      marco.title = document.documentElement.lang === 'es' ? 'Esfera' : 'Sphere'; // v9 (QA H-19)
      marco.setAttribute('allowtransparency', 'true');
      marco.src = src('&mano'); // import dinámico de verdad: three.js solo baja ahora, al hacer clic
      capa.appendChild(marco);
      cont.insertBefore(capa, cont.firstChild);
    }
    pre = null;
    bola = document.createElement('div');
    bola.className = 'esfera-bola';
    manoH = mano(marco, function () {
      if (!capa || !capa.classList.contains('is-lista')) return null;
      var b2 = caja0();
      return { x: b2.left + b2.width / 2, y: b2.top + b2.height / 2, r: diametro() / 2 };
    });
    capa.appendChild(bola);
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
    // precargada: la esfera de verdad toma el relevo de la bola plana cuando esta casi ha llegado
    if (listaYa) {
      var c0 = capa, m0 = marco;
      setTimeout(function () {
        if (capa !== c0) return;
        lista();
        try { m0.contentWindow.postMessage({ esferaPausa: false }, '*'); } catch (e) {}
      }, reduce ? 0 : 380);
    }
    punto.style.visibility = 'hidden';
    meta.x = meta.y = off.x = off.y = 0;
    punto.style.setProperty('--mx', '0px'); punto.style.setProperty('--my', '0px');
    // v6 (feedback 120): el fluido de fondo NO se congela; sigue vivo alrededor de la esfera
    fluidoLigero(true);
  }

  /* v8 (feedback 151): con la esfera abierta el fluido de fondo NO se congela (Alex) pero trabaja a menos resolución
     (simulación 128 → 64, tinte 512 → 256, presión ≤ 20 iteraciones): queda detrás de la bola y no se nota; al cerrar, vuelve. */
  function fluidoLigero(si) {
    var api = window.__fluidBackgroundAPI, base = window.__FLUID_PRESET || {};
    if (!api || typeof api.applySettings !== 'function') return;
    api.applySettings(si
      ? { SIM_RESOLUTION: 64, DYE_RESOLUTION: 256, PRESSURE_ITERATIONS: Math.min(20, base.PRESSURE_ITERATIONS || 20) }
      : { SIM_RESOLUTION: base.SIM_RESOLUTION || 128, DYE_RESOLUTION: base.DYE_RESOLUTION || 512, PRESSURE_ITERATIONS: base.PRESSURE_ITERATIONS || 20 });
  }
  window.__fluidLigero = fluidoLigero;

  function lista() {
    if (!capa) return;
    capa.classList.add('is-lista'); // la esfera de verdad aparece y la bola plana se funde
    if (manoH) manoH.revisar();     // v8 (feedback 156): si el ratón ya está encima, el primer clic ya es de la esfera
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
    if (manoH) manoH.quitar();
    capa = bola = marco = manoH = null;
    abierta = false;
    fluidoLigero(false);
    proxima = otraPiel();
    if (q.get('precarga') !== 'no') enReposo(precargar, 1500); // la de la próxima vez, ya en reposo
  }

  punto.addEventListener('click', function (e) { e.preventDefault(); abrir(); });
  window.addEventListener('message', function (e) {
    var m = e.data && e.data.esfera;
    if (pre && e.source === pre.marco.contentWindow) { // la precargada: lista y a dormir hasta el clic
      if (m === 'lista') { pre.lista = true; try { pre.marco.contentWindow.postMessage({ esferaPausa: true }, '*'); } catch (er) {} }
      return;
    }
    if (m === 'lista' && marco && e.source === marco.contentWindow) lista();
    if (m === 'cerrar') cerrar();
    if (m === 'espacio' && window.__acentoSiguiente) window.__acentoSiguiente(); // espacio con el foco en la esfera: igual que fuera
  });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });
  window.addEventListener('pisos:cambio', function (e) { if (e.detail.index !== 0) cerrar(); });
  // un clic fuera de la bola (no en un enlace, botón, flecha o pisos) la cierra; el marco ya no recoge esos clics
  document.addEventListener('click', function (e) {
    if (!abierta || !capa) return;
    if (e.target.closest && e.target.closest('a, button, .circle, .swiper-pagination, [data-esfera], .nav-sutil, .nav')) return;
    var b2 = caja0();
    if (Math.hypot(e.clientX - (b2.left + b2.width / 2), e.clientY - (b2.top + b2.height / 2)) > diametro() / 2 * 1.08) cerrar();
  });
})();
