/* v33 (Alex, conv. 1436: «¿no lo puedo configurar yo en vivo y lo ajusto a mano?»). Panel de ajuste del halo del punto.
   Solo se carga con ?ajustar en la URL (js/esfera.js). Cada deslizador reescribe en directo los @keyframes del aro
   (<style id="halo-ajuste">, que gana al CSS de la web) y se guarda en este navegador (localStorage).
   «Copiar valores» deja el texto listo para pegárselo a Claude, que lo pasa al SCSS (scss/layout/_baraja.scss · v30+). */
(function () {
  'use strict';
  var CLAVE = 'alexdasi-ajuste-halo';
  // valores de la web publicada (v34, elegidos por Alex con este panel)
  var BASE = { tam: 1.1, ciclo: 3, vida: 76, op: 1, suave: 2.35, linea: 2 };   // v34: los fijados por Alex
  var CAMPOS = [
    { k: 'tam', t: 'Tamaño máximo', min: 0.5, max: 2.5, paso: 0.05, txt: function (v) { return (v * 1.9).toFixed(1) + '× el punto'; } },
    { k: 'ciclo', t: 'Ciclo (cada cuánto sale)', min: 0.8, max: 6, paso: 0.1, txt: function (v) { return v.toFixed(1) + ' s'; } },
    { k: 'vida', t: 'Tiempo visible', min: 15, max: 95, paso: 1, txt: function (v, o) { return Math.round(v) + ' % · ' + (o.ciclo * v / 100).toFixed(2) + ' s'; } },
    { k: 'op', t: 'Opacidad al salir', min: 0.1, max: 1, paso: 0.05, txt: function (v) { return Math.round(v * 100) + ' %'; } },
    { k: 'suave', t: 'Desvanecido (bajo = largo y suave)', min: 0.4, max: 3, paso: 0.05, txt: function (v) { return v.toFixed(2); } },
    { k: 'linea', t: 'Grosor de la línea', min: 0.5, max: 4, paso: 0.25, txt: function (v) { return v + ' px'; } }
  ];
  var v = {};
  try { v = JSON.parse(localStorage.getItem(CLAVE) || '{}') || {}; } catch (e) { v = {}; }
  Object.keys(BASE).forEach(function (k) { if (typeof v[k] !== 'number') v[k] = BASE[k]; });

  var estilo = document.createElement('style');
  estilo.id = 'halo-ajuste';
  document.head.appendChild(estilo);

  function css() {
    var N = 12, pasos = [];
    for (var i = 0; i <= N; i++) {
      var t = i / N;
      var esc = v.tam * (1 - Math.pow(1 - t, 2));            // sale rápido del punto y frena al abrirse
      var op = v.op * Math.pow(1 - t, v.suave);              // se diluye hasta 0
      pasos.push((t * v.vida).toFixed(2) + '% { scale: ' + esc.toFixed(3) + '; opacity: ' + op.toFixed(3) + '; }');
    }
    pasos.push('100% { scale: ' + v.tam.toFixed(3) + '; opacity: 0; }');
    return '@keyframes punto-onda-ajuste {\n  ' + pasos.join('\n  ') + '\n}\n' +
      '.intro__punto:not(.is-cerca):not(.is-abierta)::after { border-width: ' + v.linea + 'px !important; ' +
      'animation: punto-onda-ajuste ' + v.ciclo.toFixed(2) + 's linear .3s infinite !important; }\n' +
      '.halo-panel, .halo-panel * { cursor: auto !important; color: #f7f7f5; } .halo-panel [data-copiar] { color: #141415 !important; } .halo-panel input, .halo-panel button { cursor: pointer !important; }';
  }
  function texto() {
    return 'Halo del punto: tamaño ' + v.tam.toFixed(2) + ' (' + (v.tam * 1.9).toFixed(1) + '× el punto) · ciclo ' + v.ciclo.toFixed(1) +
      ' s · visible ' + Math.round(v.vida) + ' % · opacidad ' + v.op.toFixed(2) + ' · desvanecido ' + v.suave.toFixed(2) + ' · línea ' + v.linea + ' px';
  }
  function aplicar() {
    estilo.textContent = css();
    try { localStorage.setItem(CLAVE, JSON.stringify(v)); } catch (e) {}
    CAMPOS.forEach(function (c) { var s = panel.querySelector('[data-v="' + c.k + '"]'); if (s) s.textContent = c.txt(v[c.k], v); });
    salida.textContent = texto();
  }

  var panel = document.createElement('div');
  panel.className = 'halo-panel';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Ajuste del halo');
  panel.style.cssText = 'position:fixed;right:16px;top:64px;z-index:2147483000;width:300px;padding:14px 16px 12px;border-radius:12px;' +
    'background:rgba(20,20,21,.92);color:#f7f7f5;font:13px/1.35 Inter,system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.35);cursor:auto;' +
    '-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)';
  var h = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">' +
    '<strong style="font-weight:500">Halo del punto</strong>' +
    '<button type="button" data-cerrar style="all:unset;cursor:pointer;opacity:.6;padding:2px 6px" aria-label="Ocultar">✕</button></div>';
  CAMPOS.forEach(function (c) {
    h += '<label style="display:block;margin:0 0 9px;cursor:auto">' +
      '<span style="display:flex;justify-content:space-between;opacity:.85"><span>' + c.t + '</span><span data-v="' + c.k + '" style="opacity:.7"></span></span>' +
      '<input type="range" data-k="' + c.k + '" min="' + c.min + '" max="' + c.max + '" step="' + c.paso + '" value="' + v[c.k] + '" style="width:100%;cursor:pointer;accent-color:#ECF98E">' +
      '</label>';
  });
  h += '<div style="display:flex;gap:8px;margin-top:6px">' +
    '<button type="button" data-copiar style="flex:1;cursor:pointer;padding:7px 0;border-radius:8px;border:0;background:#ECF98E;color:#141415;font:inherit;font-weight:500">Copiar valores</button>' +
    '<button type="button" data-base style="cursor:pointer;padding:7px 10px;border-radius:8px;border:1px solid rgba(247,247,245,.3);background:none;color:inherit;font:inherit">Como está</button></div>' +
    '<p data-salida style="margin:9px 0 0;font-size:11px;line-height:1.4;color:rgba(247,247,245,.65)!important;user-select:all"></p>';
  panel.innerHTML = h;
  var salida = panel.querySelector('[data-salida]');
  // que el ratón sobre el panel no cuente como «cerca del punto» ni lo tape el cursor propio
  ['mousemove', 'pointermove'].forEach(function (ev) { panel.addEventListener(ev, function (e) { e.stopPropagation(); }); });
  panel.addEventListener('input', function (e) {
    var k = e.target && e.target.getAttribute('data-k');
    if (k) { v[k] = parseFloat(e.target.value); aplicar(); }
  });
  panel.querySelector('[data-copiar]').addEventListener('click', function () {
    var b = this, t = texto();
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () {
      b.textContent = 'Copiado'; setTimeout(function () { b.textContent = 'Copiar valores'; }, 1500);
    }, function () { salida.focus && salida.focus(); });
  });
  panel.querySelector('[data-base]').addEventListener('click', function () {
    Object.keys(BASE).forEach(function (k) { v[k] = BASE[k]; var r = panel.querySelector('[data-k="' + k + '"]'); if (r) r.value = BASE[k]; });
    aplicar();
  });
  panel.querySelector('[data-cerrar]').addEventListener('click', function () { panel.remove(); estilo.remove(); });
  function montar() { document.body.appendChild(panel); aplicar(); }
  if (document.body) montar(); else document.addEventListener('DOMContentLoaded', montar);
})();
