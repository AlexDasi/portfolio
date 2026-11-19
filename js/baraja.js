/* Baraja de proyectos (rama rediseno-baraja-2026-11, ATELIER conv. 1330).
   Sustituye al pasafotos de Works en la home. Sin HUD: cartas, ficha de la carta de delante y nada más.
   - Escritorio / tablet ancha (≥ 900 px): baraja inclinada a la izquierda, de esquina a esquina.
   - Móvil (< 900 px): una carta grande; el swipe la lanza y aparece la siguiente.
   Bucle infinito. Rueda, trackpad, arrastre, swipe y flechas del teclado pasan cartas.
   60 fps: por frame solo se escribe transform y opacity; el bucle se para cuando la baraja está quieta.
   Vídeos: solo la carta de delante se reproduce; la siguiente se precarga; el resto, solo póster. */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ajustes (a mano, a ojo con Alex). Distancias en px calculadas del tamaño de la carta.
  // v2 (feedback 75-76): fichas de dominó vistas de lado. Giro en el eje vertical (rotateY), no inclinación;
  // la de delante casi de frente y entera; detrás, 7 más en fila hacia arriba a la derecha.
  var MESA = {
    giroFrente: -12,  // grados de la carta de delante (casi de frente, se lee entera)
    giroDetras: -64,  // grados de las de detrás (de canto, como dominós)
    giroHover: -34,   // al pasar el ratón por una de detrás, se abre un poco hacia ti
    hueco: 0.66,      // de la de delante a la primera de detrás (× ancho): no la tapa
    paso: 0.235,      // entre las de detrás (× ancho)
    subida: -0.075,   // cada una sube un poco (× alto): de esquina a esquina
    escala: 0.03,     // cada una encoge un poco
    salidaX: -0.9,    // la que se va sale hacia la izquierda (× ancho)
    perspectiva: 1300
  };
  // v3 móvil (feedback 96): nada de cartas amontonadas; fila horizontal con imán y la siguiente asomando
  // (como el móvil de The Lookback). hueco = separación entre cartas en px.
  var UNA = { hueco: 14 };
  // v3 movimiento (feedback 90-91): las cartas reaccionan a la velocidad del scroll y flotan en reposo.
  var VIVO = { giroVel: 10, maxGiro: 24, abreVel: 0.05, flota: 5, flotaGiro: 1.2 };
  var RIGIDEZ = 15;        // velocidad del muelle (más = más rápido); ~180 ms en asentarse
  var RUEDA = 1 / 260;     // trackpad: px de rueda → cartas
  var ARRASTRE_MESA = 1 / 420;

  function Baraja(root) {
    this.root = root;
    this.mesa = root.querySelector('[data-baraja-mesa]');
    this.cartas = Array.prototype.slice.call(root.querySelectorAll('[data-carta]'));
    this.fichas = Array.prototype.slice.call(root.querySelectorAll('[data-ficha]'));
    this.ticks = Array.prototype.slice.call(root.querySelectorAll('[data-tick]'));
    this.pista = root.querySelector('.baraja__pista');
    this.n = this.cartas.length;
    this.pos = 0;
    this.obj = 0;
    this.frente = -1;
    this.raf = 0;
    this.t = 0;
    this.modo = '';
    this.enPantalla = false;
    this.zCache = [];
    this.opCache = [];
    this.hv = [];
    this.hover = -1;
    this.medidas = { w: 600, h: 375 };
    this.arrastre = null;
    this.ruedaFin = 0;
    this.ruedaDir = 0;
    this.tocado = false;
    this.paso = this.paso.bind(this);
    if (this.n) this.montar();
  }

  Baraja.prototype.visible = function () {
    return this.root.getClientRects().length > 0;
  };

  Baraja.prototype.montar = function () {
    var self = this;
    this.medir();
    window.addEventListener('resize', function () { self.medir(); self.pedir(); });

    // Rueda / trackpad
    this.root.addEventListener('wheel', function (e) { self.rueda(e); }, { passive: false });
    window.addEventListener('wheel', function (e) {
      // Escritorio: con la baraja en pantalla, la rueda en cualquier punto pasa cartas (la pantalla no cambia).
      if (self.modo !== 'mesa' || !self.enPantalla || self.root.contains(e.target)) return;
      if (!document.querySelector('.MainSwiper') || !self.root.closest('.MainSwiper')) return;
      self.rueda(e);
    }, { passive: false });

    // Arrastre y swipe (pointer events; en táctil el scroll vertical de la página sigue funcionando)
    this.mesa.addEventListener('pointerdown', function (e) { self.agarra(e); });
    window.addEventListener('pointermove', function (e) { self.mueve(e); }, { passive: true });
    window.addEventListener('pointerup', function (e) { self.suelta(e); });
    window.addEventListener('pointercancel', function (e) { self.suelta(e, true); });
    this.mesa.addEventListener('dragstart', function (e) { e.preventDefault(); });

    // Ratón por encima de una de detrás: se abre un poco hacia ti (solo escritorio)
    this.cartas.forEach(function (c, i) {
      c.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { self.hover = i; self.pedir(); } });
      c.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse' && self.hover === i) { self.hover = -1; self.pedir(); } });
    });

    // Clic: la de delante abre su web; una de detrás pasa delante
    this.cartas.forEach(function (c, i) {
      c.addEventListener('click', function (e) {
        if (self.arrastreReciente) { e.preventDefault(); return; }
        if (i !== self.frente) {
          e.preventDefault();
          self.ir(self.obj + self.dist(i, self.obj));
        }
      });
    });

    // Teclado
    window.addEventListener('keydown', function (e) {
      if (!self.enPantalla) return;
      var k = e.key;
      if (k === 'ArrowRight' || (self.modo === 'mesa' && k === 'ArrowDown')) { e.preventDefault(); self.ir(Math.round(self.obj) + 1); }
      if (k === 'ArrowLeft' || (self.modo === 'mesa' && k === 'ArrowUp')) { e.preventDefault(); self.ir(Math.round(self.obj) - 1); }
    });

    // ¿Está la baraja en pantalla? Escritorio: lo dice el MainSwiper; apilado: IntersectionObserver.
    window.addEventListener('pisos:cambio', function (e) {
      if (!self.root.closest('.MainSwiper')) return;
      self.enPantalla = e.detail.index === 1;
      self.entra();
      self.pedir();
    });
    if (!this.root.closest('.MainSwiper') && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entradas) {
        self.enPantalla = entradas[0].isIntersecting;
        self.entra();
        self.pedir();
      }, { threshold: 0.35 }).observe(this.root);
    }

    // Precarga sensata: con la página ya cargada y en reposo, el vídeo de la primera carta.
    var precarga = function () { if (self.visible()) self.cargaVideo(0, 'auto'); };
    if (document.readyState === 'complete') setTimeout(precarga, 600);
    else window.addEventListener('load', function () { setTimeout(precarga, 600); });

    this.pinta(true);
  };

  Baraja.prototype.medir = function () {
    var ancho = window.innerWidth;
    var modo = ancho >= 900 ? 'mesa' : 'una';
    if (modo !== this.modo) {
      this.modo = modo;
      this.root.setAttribute('data-modo', modo);
      this.posters();
    }
    var c = this.cartas[0];
    if (c) this.medidas = { w: c.offsetWidth || 600, h: c.offsetHeight || 375 };
    this.zCache = [];
    this.opCache = [];
    this.pinta(true);
  };

  // «url 560w, url 1000w» → la más pequeña que cubre el hueco (o la mayor)
  function elige(set, px) {
    if (!set) return null; // webp: todos los navegadores actuales (Safari 14+)
    var c = set.split(',').map(function (x) { var p = x.trim().split(/\s+/); return { u: p[0], w: parseInt(p[1], 10) }; })
      .sort(function (a, b) { return a.w - b.w; });
    for (var k = 0; k < c.length; k++) if (c[k].w >= px * 0.95) return c[k].u;
    return c.length ? c[c.length - 1].u : null;
  }

  Baraja.prototype.posters = function () {
    var clave = this.modo === 'mesa' ? 'posterD' : 'posterM';
    var c0 = this.cartas[0];
    var ancho = ((c0 && c0.offsetWidth) || (this.modo === 'mesa' ? 432 : 280)) * (window.devicePixelRatio || 1);
    this.cartas.forEach(function (c, i) {
      var img = c.querySelector('.carta__poster');
      if (!img) return;
      // v4 (feedback 100): webp del tamaño del hueco (ancho de la carta × densidad de pantalla); el jpg, de respaldo.
      // Se elige aquí y no con srcset para que naturalWidth diga los píxeles reales (lo miden vivo.mjs y nitidez.mjs).
      var src = elige(img.dataset[clave === 'posterD' ? 'srcsetD' : 'srcsetM'], ancho) || img.dataset[clave];
      if (i > 2) img.loading = 'lazy';
      if (img.getAttribute('src') !== src) img.src = src;
      var v = c.querySelector('video');
      if (v && v.dataset.cargado && v.dataset.cargado !== clave) {
        // cambió el modo: el vídeo que tenía ya no vale
        v.pause(); v.removeAttribute('src'); v.load(); delete v.dataset.cargado; c.classList.remove('is-video');
      }
    });
  };

  // distancia con signo de la carta i a la posición p, envuelta en [-n/2, n/2)
  // distancia de la carta i a la posición p: 0 = delante, > 0 detrás, < 0 saliendo. Rango [-1.5, n-1.5).
  Baraja.prototype.dist = function (i, p) {
    var n = this.n;
    var d = (((i - p) % n) + n) % n;
    if (d >= n - 1.5) d -= n;
    return d;
  };

  Baraja.prototype.pinta = function (forzar) {
    var m = this.medidas;
    var mesa = this.modo === 'mesa';
    var v = this.vel || 0;
    var velGiro = Math.max(-VIVO.maxGiro, Math.min(VIVO.maxGiro, -v * VIVO.giroVel));
    var velAbre = Math.max(-0.12, Math.min(0.12, v * VIVO.abreVel));
    for (var i = 0; i < this.n; i++) {
      var d = this.dist(i, this.pos);
      var tr, op, z;
      if (mesa) {
        var hv = this.hv[i] || 0;
        if (d >= 0) {
          var k = Math.min(d, 1);                      // 0 delante → 1 ya de canto
          var giro = MESA.giroFrente + (MESA.giroDetras - MESA.giroFrente) * k;
          giro += (MESA.giroHover - giro) * hv * (d >= 0.5 ? 1 : 0);
          // velocidad: al pasar rápido se abren y se tumban un poco (como The Lookback); en reposo, flotan
          giro += velGiro * (0.4 + 0.6 * k);
          var x = d <= 1 ? d * MESA.hueco : MESA.hueco + (d - 1) * MESA.paso;
          x += Math.abs(velAbre) * d;
          var sc = 1 - d * MESA.escala + hv * 0.03;
          var flota = 0; // v4: flotar lo hace el CSS (animación de `translate`, sin JS en reposo)
          tr = 'perspective(' + MESA.perspectiva + 'px) translate3d(' + (x * m.w).toFixed(1) + 'px,' + (d * MESA.subida * m.h - hv * 10 + flota).toFixed(1) + 'px,0)' +
            ' rotateY(' + giro.toFixed(2) + 'deg) scale(' + sc.toFixed(4) + ')';
          op = Math.max(0, Math.min(1, this.n - 1.5 - d));
        } else {
          var t = -d; // 0 → 1 mientras se va
          tr = 'perspective(' + MESA.perspectiva + 'px) translate3d(' + (t * MESA.salidaX * m.w).toFixed(1) + 'px,' + (t * 0.12 * m.h).toFixed(1) + 'px,0)' +
            ' rotateY(' + (MESA.giroFrente + t * 30).toFixed(2) + 'deg) scale(' + (1 - t * 0.04).toFixed(4) + ')';
          op = Math.max(0, 1 - t * 1.7);
        }
      } else {
        // fila: la de delante a la izquierda, la siguiente asomando a la derecha; las anteriores salen por la izquierda
        var paso = m.w + UNA.hueco;
        var lean = Math.max(-14, Math.min(14, -v * 6));
        tr = 'perspective(900px) translate3d(' + (d * paso).toFixed(1) + 'px,0,0) rotateY(' + lean.toFixed(2) + 'deg) scale(' + (1 - Math.min(Math.abs(d), 1) * 0.05).toFixed(4) + ')';
        op = d < -1.2 || d > 2.2 ? 0 : 1;
      }
      z = 100 - Math.round((d < 0 ? -d * 0.5 : d) * 10);
      var c = this.cartas[i];
      c.style.transform = tr;
      op = Math.round(op * 1000) / 1000;
      if (forzar || this.opCache[i] !== op) { c.style.opacity = op; this.opCache[i] = op; }
      if (forzar || this.zCache[i] !== z) { c.style.zIndex = z; this.zCache[i] = z; }
    }
    var f = ((Math.round(this.pos) % this.n) + this.n) % this.n;
    if (f !== this.frente) this.cambiaFrente(f);
  };

  Baraja.prototype.cambiaFrente = function (f) {
    var antes = this.frente;
    this.frente = f;
    var self = this;
    this.cartas.forEach(function (c, i) {
      var es = i === f;
      c.classList.toggle('is-frente', es);
      c.tabIndex = es ? 0 : -1;
      c.setAttribute('aria-hidden', es ? 'false' : 'true');
    });
    this.ticks.forEach(function (t, i) { t.classList.toggle('is-activa', i === f); });
    this.fichas.forEach(function (fi, i) {
      if (i === f) { fi.hidden = false; fi.classList.remove('is-entra'); void fi.offsetWidth; fi.classList.add('is-entra'); }
      else fi.hidden = true;
    });
    if (antes >= 0) {
      var va = this.cartas[antes].querySelector('video');
      if (va) va.pause();
    }
    // v4 (feedback 100): solo quedan en memoria la de delante, la anterior y la siguiente; el resto vuelve a su póster
    var n = this.n;
    this.cartas.forEach(function (c, i) {
      var d = ((i - f) % n + n) % n;
      if (d === 0 || d === 1 || d === n - 1) return;
      var v = c.querySelector('video');
      if (v && v.dataset.cargado) { v.pause(); v.removeAttribute('src'); v.load(); delete v.dataset.cargado; c.classList.remove('is-video'); }
    });
    this.videos();
    void self;
  };

  Baraja.prototype.cargaVideo = function (i, preload) {
    var c = this.cartas[((i % this.n) + this.n) % this.n];
    var v = c && c.querySelector('video');
    if (!v) return null;
    var clave = this.modo === 'mesa' ? 'posterD' : 'posterM';
    if (!v.dataset.cargado) {
      v.preload = preload || 'auto';
      v.src = this.modo === 'mesa' ? v.dataset.videoD : v.dataset.videoM;
      v.dataset.cargado = clave;
      v.addEventListener('playing', function () { c.classList.add('is-video'); });
    } else if (preload === 'auto' && v.preload !== 'auto') {
      v.preload = 'auto';
    }
    return v;
  };

  Baraja.prototype.videos = function () {
    if (!this.enPantalla || this.frente < 0 || reduce) return;
    var v = this.cargaVideo(this.frente, 'auto');
    if (v) {
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    }
    this.cargaVideo(this.frente + 1, 'auto'); // la siguiente, lista para cuando llegue
  };

  Baraja.prototype.entra = function () {
    this.root.classList.toggle('is-flotando', this.enPantalla);
    if (this.enPantalla) {
      this.root.classList.add('is-dentro');
      this.medir();
      this.videos();
    } else {
      this.cartas.forEach(function (c) { var v = c.querySelector('video'); if (v) v.pause(); });
    }
  };

  // ---------- movimiento ----------
  Baraja.prototype.ir = function (obj) {
    this.obj = obj;
    this.toque();
    this.pedir();
  };

  Baraja.prototype.toque = function () {
    if (this.tocado) return;
    this.tocado = true;
    this.root.classList.add('is-tocada');
  };

  Baraja.prototype.pedir = function () {
    if (!this.raf) { this.t = performance.now(); this.raf = requestAnimationFrame(this.paso); }
  };

  Baraja.prototype.paso = function (ahora) {
    this.raf = 0;
    var dt = Math.min(0.05, Math.max(0.001, (ahora - this.t) / 1000));
    this.t = ahora;
    var antes = this.pos;
    if (!this.arrastre) {
      // fin de la rueda: encaja en una carta, en el sentido del gesto
      if (this.ruedaFin && ahora > this.ruedaFin) {
        this.ruedaFin = 0;
        this.obj = this.ruedaDir > 0 ? Math.ceil(this.obj - 0.12) : Math.floor(this.obj + 0.12);
      }
      var k = reduce ? 1 : 1 - Math.exp(-dt * RIGIDEZ);
      this.pos += (this.obj - this.pos) * k;
      if (Math.abs(this.obj - this.pos) < 0.0008 && !this.ruedaFin) this.pos = this.obj;
    } else {
      this.pos += (this.obj - this.pos) * (1 - Math.exp(-dt * 40));
    }
    var hvMueve = false;
    var kh = reduce ? 1 : 1 - Math.exp(-dt * 12);
    for (var h = 0; h < this.n; h++) {
      var meta = (h === this.hover && this.modo === 'mesa' && h !== this.frente) ? 1 : 0;
      var actual = this.hv[h] || 0;
      if (Math.abs(meta - actual) > 0.002) { this.hv[h] = actual + (meta - actual) * kh; hvMueve = true; }
      else this.hv[h] = meta;
    }
    // velocidad (cartas/s), suavizada: mueve las cartas mientras pasas
    this.vel = (this.vel || 0) + ((this.pos - antes) / dt - (this.vel || 0)) * (1 - Math.exp(-dt * 10));
    if (Math.abs(this.vel) < 0.002) this.vel = 0;
    this.tiempo = (this.tiempo || 0) + dt;
    this.pinta(false);
    var quieta = this.pos === this.obj && !this.arrastre && !this.ruedaFin;
    if (quieta) this.normaliza();
    // v4 (feedback 100): en reposo el bucle se para; el flotar lo lleva el CSS en el compositor
    if (!quieta || hvMueve || this.vel) this.raf = requestAnimationFrame(this.paso);
  };

  // mantiene pos/obj en [0, n) cuando está quieta (bucle infinito sin números enormes)
  Baraja.prototype.normaliza = function () {
    var r = Math.round(this.pos);
    var w = ((r % this.n) + this.n) % this.n;
    if (w !== r) { this.pos = this.obj = w; }
  };

  Baraja.prototype.rueda = function (e) {
    if (this.modo === 'una' && Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // en móvil/tablet la rueda vertical baja la página
    if (this.modo === 'mesa' && this.root.closest('.MainSwiper') && !this.enPantalla) return;
    if (this.modo === 'mesa' && !this.root.closest('.MainSwiper') && Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // apilado: igual que móvil
    e.preventDefault();
    var escala = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1;
    var dx = e.deltaX * escala, dy = e.deltaY * escala;
    var delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
    delta = Math.max(-120, Math.min(120, delta));
    if (!delta) return;
    var antes = this.obj;
    this.obj += delta * RUEDA * (Math.abs(delta) >= 90 ? 1.6 : 1); // rueda de ratón (saltos de ~100): una carta por golpe
    // nunca más de una carta y media por delante de lo que se ve: rápido, pero sin saltarse cartas sin verlas
    if (Math.abs(this.obj - this.pos) > 1.5) this.obj = this.pos + Math.sign(this.obj - this.pos) * 1.5;
    this.ruedaDir = Math.sign(this.obj - antes) || this.ruedaDir;
    this.ruedaFin = performance.now() + 110;
    this.toque();
    this.pedir();
  };

  Baraja.prototype.agarra = function (e) {
    if (e.button !== 0) return;
    this.arrastre = { x: e.clientX, y: e.clientY, obj: this.obj, id: e.pointerId, movido: false, t: performance.now(), vx: 0, lx: e.clientX, lt: performance.now(), eje: '' };
    this.arrastreReciente = false;
  };

  Baraja.prototype.mueve = function (e) {
    var a = this.arrastre;
    if (!a || e.pointerId !== a.id) return;
    var dx = e.clientX - a.x, dy = e.clientY - a.y;
    if (!a.eje) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      a.eje = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
      if (a.eje === 'y' && this.modo === 'una') { this.arrastre = null; return; } // scroll de la página
    }
    a.movido = true;
    var ahora = performance.now();
    a.vx = (e.clientX - a.lx) / Math.max(1, ahora - a.lt);
    a.lx = e.clientX; a.lt = ahora;
    var por = this.modo === 'mesa' ? ARRASTRE_MESA : 1 / Math.max(200, this.medidas.w);
    var mov = this.modo === 'mesa' ? (a.eje === 'x' ? dx : dy) : dx;
    this.obj = a.obj - mov * por;
    this.toque();
    this.pedir();
  };

  Baraja.prototype.suelta = function (e, cancelado) {
    var a = this.arrastre;
    if (!a || e.pointerId !== a.id) return;
    this.arrastre = null;
    if (!a.movido) return;
    this.arrastreReciente = true;
    var self = this;
    setTimeout(function () { self.arrastreReciente = false; }, 60);
    if (cancelado) { this.ir(Math.round(this.obj)); return; }
    var base = a.obj;
    var hecho = this.obj - base;
    var rapido = Math.abs(a.vx) > 0.35; // px/ms: un lanzamiento corto también pasa carta
    var destino;
    if (rapido && Math.abs(hecho) < 1) destino = base + (a.vx < 0 ? 1 : -1);
    else destino = Math.round(this.obj + (hecho > 0 ? 0.2 : -0.2));
    this.ir(destino);
  };

  function arrancar() {
    var barajas = [];
    document.querySelectorAll('[data-baraja]').forEach(function (root) { barajas.push(new Baraja(root)); });
    window.__barajas = barajas;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar);
  else arrancar();
})();
