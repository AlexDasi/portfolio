/* El punto del cursor se FUNDE con lo interactivo (feedback 111, rama rediseno-baraja-2026-11, ATELIER conv. 1330).
   PORTADO (L-1330c: lo que existe se porta) de la pieza de la librería de ATELIER
   «Cursor contextual que se convierte en botón» (id aww-dynamic-contextual-cursor-studiors; kit
   tools/templates/motion-kit/cursorShape.ts, modo "shape"; lab 2026-10-22_cursor-contextual-forma, V1 «Takes the shape»;
   ref. Studio RS en Awwwards). Misma mecánica: UN solo elemento interpola x, y, ancho, alto y radio; el contexto solo cambia
   el OBJETIVO (el rect del elemento +pad con su border-radius y un leve paralaje hacia el ratón; en enlaces de texto, un
   subrayado de 3 px); lerp 0,4 libre / 0,28 encima, corregido por delta. Números del kit.
   Adaptado a esta web:
   - El punto libre es el de siempre (.follow, magnet-mouse). La mancha nace DEBAJO de él, del mismo tamaño y color, al
     entrar en un elemento; el punto se apaga y la mancha se estira hasta ser el fondo del elemento (acento, tinta encima).
     Al salir se encoge hasta el punto y el punto vuelve. Es la misma idea que la absorción punto ↔ flecha (D-0002).
   - Va DEBAJO del contenido (z 1, antes de la pantalla en el DOM) en vez de encima con difference: el texto sigue siendo
     el suyo (tinta sobre el acento), como en la captura de Alex.
   - Solo en: filas de UX/UI, botones (Sobre mí y fichas), «Ver proyecto / Visitar web» de la baraja y los accesos de
     arriba. La flecha y los pisos se quedan con su imán/absorción de siempre (nada de Frankenstein).
   - Paralaje acotado a ±3 px (en filas de 1.500 px y en pastillas con borde el 12 % del kit se veía como un desfase).
   - El bucle se para cuando la mancha llega (cero trabajo en reposo).
   Solo con ratón fino, ventana > 1280 px y sin «reducir movimiento». ?fusion=no la apaga.
   v7 (feedback 134): la mancha NUNCA excede el elemento. Antes el objetivo era el rect + 2 px con un paralaje de ±3 px y,
   según de dónde entraras, asomaba hasta 5 px fuera del botón. Ahora la mancha va dentro de un marco con la forma exacta
   del elemento (su rect y su radio, overflow hidden): entra, crece y al salir se encoge hacia el punto recortada por el
   botón; el punto vuelve en cuanto la mancha se ha ido. Sin pad ni paralaje en las cajas (con el recorte no se verían).
   v7 (feedback 132): el «volver a Proyectos» de las fichas queda fuera (salían dos líneas del acento: la del CSS y la de
   la mancha); en los demás enlaces de texto el subrayado lo pone solo la mancha (el del CSS se apaga con html.cursor-fusion). */
(function () {
  'use strict';
  if (!window.matchMedia) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.innerWidth <= 1280) return;
  if (new URLSearchParams(location.search).get('fusion') === 'no') return;

  var SEL = '.sm__casos a, .sm__boton, .ficha__link:not(.fp__volver), .nav-sutil__item, .nav--top .single > a';
  var LINK = '.ficha__link, .nav-sutil__item, .nav--top .single > a';
  var K = { size: 10, lerp: 0.4, lerpHot: 0.28, underline: 3 };

  var html = document.documentElement;
  // marco = la forma exacta del elemento (recorta); blob = la mancha que se estira dentro
  var marco = document.createElement('div');
  marco.className = 'fusion';
  marco.setAttribute('aria-hidden', 'true');
  var blob = document.createElement('i');
  blob.className = 'fusion__mancha';
  marco.appendChild(blob);
  document.body.insertBefore(marco, document.body.firstChild);
  html.classList.add('cursor-fusion');

  var mx = -100, my = -100, hot = null, kind = null, visible = false, raf = 0, last = 0;
  var cur = { x: mx, y: my, w: K.size, h: K.size, r: K.size / 2 };

  function rectOf(el) {
    var r = el.getBoundingClientRect();
    var rad = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    return { x: r.left, y: r.top, w: r.width, h: r.height, r: Math.min(rad, r.height / 2, r.width / 2) };
  }
  function libre() { return { x: mx - K.size / 2, y: my - K.size / 2, w: K.size, h: K.size, r: K.size / 2 }; }
  var recorte = null; // el elemento que recorta la mancha (el de ahora o, mientras vuelve al punto, el último)
  function objetivo() {
    if (!hot || !hot.isConnected) return libre();
    if (kind === 'link') {
      var rl = hot.getBoundingClientRect();
      return { x: rl.left, y: rl.bottom - K.underline, w: rl.width, h: K.underline, r: K.underline / 2 }; // el subrayado engorda
    }
    return rectOf(hot); // a sangre: el fondo del elemento, ni un píxel más
  }
  function pinta() {
    var c = recorte && recorte.isConnected ? rectOf(recorte) : null;
    if (!c) { c = { x: cur.x, y: cur.y, w: cur.w, h: cur.h, r: 0 }; }
    marco.style.transform = 'translate3d(' + c.x.toFixed(2) + 'px,' + c.y.toFixed(2) + 'px,0)';
    marco.style.width = c.w.toFixed(2) + 'px';
    marco.style.height = c.h.toFixed(2) + 'px';
    marco.style.borderRadius = c.r.toFixed(2) + 'px';
    blob.style.transform = 'translate3d(' + (cur.x - c.x).toFixed(2) + 'px,' + (cur.y - c.y).toFixed(2) + 'px,0)';
    blob.style.width = cur.w.toFixed(2) + 'px';
    blob.style.height = cur.h.toFixed(2) + 'px';
    blob.style.borderRadius = cur.r.toFixed(2) + 'px';
  }
  function mostrar(si) {
    if (si === visible) return;
    visible = si;
    if (!si) recorte = null;
    marco.classList.toggle('is-visible', si);
  }
  function tick(now) {
    raf = 0;
    var dt = last ? Math.min(3, (now - last) / 16.67) : 1;
    last = now;
    var t = objetivo();
    var k = 1 - Math.pow(1 - (hot ? K.lerpHot : K.lerp), dt);
    var quieto = true;
    for (var p in t) {
      var d = t[p] - cur[p];
      cur[p] += d * k;
      if (Math.abs(d) > 0.1) quieto = false; else cur[p] = t[p];
    }
    pinta();
    // de vuelta: cuando ya es casi el punto, la mancha se va y vuelve el punto de siempre
    if (!hot && cur.w < K.size + 4 && cur.h < K.size + 4) mostrar(false);
    if (!quieto) raf = requestAnimationFrame(tick); else last = 0;
  }
  function pedir() { if (!raf) raf = requestAnimationFrame(tick); }

  function cambia(el) {
    if (el === hot) return;
    if (hot) hot.classList.remove('is-fusion');
    hot = el;
    kind = el ? (el.matches(LINK) ? 'link' : 'box') : null;
    if (el) {
      recorte = el;
      el.classList.add('is-fusion');
      if (!visible) { cur = libre(); pinta(); mostrar(true); } // nace exactamente donde está el punto
      var c = getComputedStyle(el).getPropertyValue('--fusion-color').trim();
      blob.style.background = c || '';
    }
    // el punto (.follow) se apaga mientras la mancha es el cursor; al salir vuelve YA (la mancha se retira recortada)
    html.classList.toggle('fusion-activa', !!el);
    pedir();
  }

  window.addEventListener('pointermove', function (e) {
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    mx = e.clientX; my = e.clientY;
    // v7 (feedback 125): con la esfera abierta, fuera de la bola todo es igual que con ella cerrada (dentro, el marco se
    // queda el ratón y aquí no llega nada)
    var bajo = document.elementFromPoint(mx, my);
    cambia(bajo && bajo.closest ? bajo.closest(SEL) : null);
    if (!visible) { cur = libre(); return; } // libre e invisible: va pegado, sin bucle
    pedir();
  }, { passive: true });
  // al cambiar de pantalla (pisos) o al hacer scroll el elemento se mueve: la mancha lo sigue o se suelta
  window.addEventListener('pisos:cambio', function () { cambia(null); });
  window.addEventListener('scroll', pedir, { passive: true });
  document.addEventListener('mouseout', function (e) { if (!e.relatedTarget) { cambia(null); mostrar(false); } });
  window.addEventListener('blur', function () { cambia(null); mostrar(false); });
})();
