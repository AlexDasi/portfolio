#!/usr/bin/env node
/* Medidor de rendimiento de la home (rama rediseno-baraja-2026-11, feedback 100 · ATELIER conv. 1330).
   Uso: node tools/medir_rendimiento.mjs <url-de-la-home> [--json=salida.json]
   Mide en escritorio (1440×900) y móvil (iPhone 13, 390×844):
   - primera carga: bytes transferidos (por tipo y origen), nº de peticiones, LCP (esperando 8 s tras «load»)
   - trabajo en reposo (≥ 14 s sin tocar nada): callbacks de requestAnimationFrame por segundo y ms de script por segundo (CDP)
   - con la baraja moviéndose (solo escritorio): ms de script por frame
   - memoria de vídeo aproximada: texturas WebGL asignadas + lienzos WebGL + vídeos con datos cargados
   Los fps absolutos de un contenedor sin GPU no valen; los ms de script y los bytes, sí. */
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
let chromium;
try { ({ chromium } = await import('playwright')); } catch { ({ chromium } = createRequire(import.meta.url)(execSync('npm root -g').toString().trim() + '/playwright')); }

const url = process.argv[2];
const jsonOut = (process.argv.find((a) => a.startsWith('--json=')) || '').split('=')[1];
if (!url) { console.error('Uso: node tools/medir_rendimiento.mjs <url>'); process.exit(2); }

// se inyecta antes que nada: cuenta rAF y la memoria WebGL asignada
const GANCHOS = () => {
  window.__raf = 0;
  const raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => raf((t) => { window.__raf++; cb(t); });
  window.__gpu = { tex: 0, rb: 0, lienzos: new Set() };
  const bpp = (gl, internal, type) => {
    const H = 0x140B, HO = 0x8D61, F = 0x1406;
    const canales = { 0x1908: 4, 0x8058: 4, 0x881A: 4, 0x8814: 4, 0x1907: 3, 0x8051: 3, 0x822F: 2, 0x8230: 2, 0x822B: 2, 0x822D: 1, 0x822E: 1, 0x8229: 1, 0x1903: 1, 0x8227: 2 };
    const c = canales[internal] || 4;
    const b = (type === H || type === HO || internal === 0x881A || internal === 0x822F || internal === 0x822D) ? 2 : (type === F || internal === 0x8814 || internal === 0x8230 || internal === 0x822E) ? 4 : 1;
    return c * b;
  };
  for (const P of [window.WebGLRenderingContext, window.WebGL2RenderingContext].filter(Boolean)) {
    const ti = P.prototype.texImage2D;
    P.prototype.texImage2D = function (...a) {
      try { window.__gpu.lienzos.add(this.canvas); if (a.length >= 9 && typeof a[3] === 'number') window.__gpu.tex += a[3] * a[4] * bpp(this, a[2], a[7]); } catch (e) {}
      return ti.apply(this, a);
    };
    const ts = P.prototype.texStorage2D;
    if (ts) P.prototype.texStorage2D = function (t, l, f, w, h) { window.__gpu.tex += w * h * 4; return ts.apply(this, arguments); };
    const rs = P.prototype.renderbufferStorage;
    P.prototype.renderbufferStorage = function (t, f, w, h) { window.__gpu.rb += w * h * 4; return rs.apply(this, arguments); };
  }
  window.__lcp = 0;
  new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
};

const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const VISTAS = [
  { id: 'escritorio', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, hasTouch: false, isMobile: false },
  { id: 'movil', viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true },
];
const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const salida = { url, fecha: new Date().toISOString(), vistas: {} };
for (const v of VISTAS) {
  const ctx = await b.newContext({ viewport: v.viewport, deviceScaleFactor: v.deviceScaleFactor, hasTouch: v.hasTouch, isMobile: v.isMobile });
  await ctx.addInitScript(GANCHOS);
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Performance.enable');
  const reqs = new Map();
  cdp.on('Network.responseReceived', (e) => { const r = reqs.get(e.requestId) || {}; r.url = e.response.url; r.tipo = e.type; reqs.set(e.requestId, r); });
  cdp.on('Network.loadingFinished', (e) => { const r = reqs.get(e.requestId) || {}; r.bytes = e.encodedDataLength; reqs.set(e.requestId, r); });
  await page.goto(url, { waitUntil: 'load' });
  await espera(8000);
  const filas = [...reqs.values()].filter((r) => r.url && !r.url.startsWith('data:'));
  const total = filas.reduce((s, r) => s + (r.bytes || 0), 0);
  const porTipo = {};
  for (const r of filas) porTipo[r.tipo] = (porTipo[r.tipo] || 0) + (r.bytes || 0);
  const grandes = filas.sort((a, b2) => (b2.bytes || 0) - (a.bytes || 0)).slice(0, 8).map((r) => [r.url.replace(/^https?:\/\/[^/]+/, ''), r.bytes]);
  const externos = filas.filter((r) => !r.url.startsWith(new URL(url).origin)).reduce((s, r) => s + (r.bytes || 0), 0);
  const lcp = await page.evaluate(() => window.__lcp);

  // reposo: 4 s sin tocar nada (ratón fuera)
  const met = async () => Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map((m) => [m.name, m.value]));
  const reposo = async (seg) => {
    const r0 = await page.evaluate(() => window.__raf), m0 = await met();
    await espera(seg * 1000);
    const r1 = await page.evaluate(() => window.__raf), m1 = await met();
    return { rafPorSeg: +((r1 - r0) / seg).toFixed(1), scriptMsPorSeg: +(((m1.ScriptDuration - m0.ScriptDuration) * 1000) / seg).toFixed(1), tareasMsPorSeg: +(((m1.TaskDuration - m0.TaskDuration) * 1000) / seg).toFixed(1) };
  };
  await espera(8000); // ~16 s sin tocar nada desde la carga
  const intro = await reposo(4);
  let baraja = null, barajaQuieta = null;
  if (!v.isMobile) {
    // a la baraja con la flecha / pisos y se mueve con la rueda
    await page.evaluate(() => { const s = document.querySelector('.MainSwiper'); if (s && s.swiper) s.swiper.slideTo(1, 0); });
    await espera(1500);
    await page.mouse.move(700, 450);
    const r0 = await page.evaluate(() => window.__raf), m0 = await met();
    for (let i = 0; i < 20; i++) { await page.mouse.wheel(0, 60); await espera(100); }
    const r1 = await page.evaluate(() => window.__raf), m1 = await met();
    const frames = Math.max(1, r1 - r0);
    baraja = { frames, scriptMsPorFrame: +(((m1.ScriptDuration - m0.ScriptDuration) * 1000) / frames).toFixed(2) };
    await page.mouse.move(-10, -10);
    await espera(14000); // 14 s sin tocar nada tras mover la baraja
    barajaQuieta = await reposo(4);
  }
  const gpu = await page.evaluate(() => {
    let lienzo = 0; window.__gpu.lienzos.forEach((c) => { if (c) lienzo += c.width * c.height * 4 * 2; });
    const vids = [...document.querySelectorAll('video')].filter((x) => x.readyState >= 2);
    return { texturasMB: +((window.__gpu.tex + window.__gpu.rb) / 1048576).toFixed(1), lienzosMB: +(lienzo / 1048576).toFixed(1),
      videosConDatos: vids.length, videosMB: +(vids.reduce((s, x) => s + x.videoWidth * x.videoHeight * 1.5 * 4, 0) / 1048576).toFixed(1) };
  });
  salida.vistas[v.id] = { totalMB: +(total / 1048576).toFixed(2), peticiones: filas.length, externosKB: Math.round(externos / 1024), porTipoKB: Object.fromEntries(Object.entries(porTipo).map(([k, x]) => [k, Math.round(x / 1024)])), lcpMs: Math.round(lcp), grandes, reposoIntro: intro, barajaMoviendo: baraja, reposoBaraja: barajaQuieta, gpu };
  await ctx.close();
}
await b.close();
console.log(JSON.stringify(salida, null, 1));
if (jsonOut) writeFileSync(jsonOut, JSON.stringify(salida, null, 1));
