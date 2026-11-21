/* alexdasi.com · v14 (ATELIER conv. 1393): la esfera en CALIDAD ALTA (three.js, elegida por Alex en el A/B de la conv. 1390:
   «se ve increíble en three js»). Misma escena que el render de Blender: HDR de estudio, geometría GLB y MeshPhysicalMaterial
   con texturas (materiales_esfera-hq.json). Fuente del A/B: ATELIER tools/lab/esfera-hq.
   Mismo contrato que esfera-pieles.html para js/esfera.js: ?embed ?piel= ?acento=r,g,b ?dia ?mano ?movil ?frac=
   mensajes {esferaTema} {esferaAcento} {esferaPausa} → la página; avisa {esfera:'lista'|'fuera'|'cerrar'|'espacio'}.
   Alex (conv. 1393): «que se pueda mover libremente en todas las direcciones, no solo en horizontal» → giro libre (trackball)
   con inercia, que vuelve a su giro lento. Se empaqueta con esbuild → esfera/esfera-hq.min.js (solo lo que usa). */
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {OutputPass} from 'three/examples/jsm/postprocessing/OutputPass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import SPEC from './materiales_esfera-hq.json';
import {crearTech, TECH} from './esfera-hq_tech.js';   // v16: alambre · maqueta · rayosx · anodizado
import {crearMaterial, NUEVOS} from './esfera-hq_materiales.js';   // v17: solare · globo · saten · pompa · terciopelo (conv. 1397)

const Q = new URLSearchParams(location.search);
const BASE = 'hq/';
const EMBED = Q.has('embed'), MOVIL = EMBED && Q.has('movil'), MANO = Q.has('mano'), FRAC = +Q.get('frac') || 0;
const MAPA = {chicle: 'chicle', glaseado: 'glaseado', prisma: 'cuarzo', cuarzo: 'cuarzo', gema: 'cuarzo', alambre: 'alambre', maqueta: 'maqueta', rayosx: 'rayosx', anodizado: 'anodizado', solare: 'solare', globo: 'globo', saten: 'saten', pompa: 'pompa', terciopelo: 'terciopelo'};
const ES_TECH = TECH.includes(MAPA[new URLSearchParams(location.search).get('piel')]) || NUEVOS.includes(MAPA[new URLSearchParams(location.search).get('piel')]);
const MAT = MAPA[Q.get('piel')] || 'cuarzo';
if (EMBED) { document.documentElement.classList.add('embed'); document.body.classList.add('embed'); if (MOVIL) document.body.classList.add('movil'); }
const avisar = msg => { if (EMBED && parent !== window) parent.postMessage({esfera: msg}, '*'); };

/* ---------- acento y día (igual que esfera-pieles.html) ---------- */
const ACENTO = {v: null, listo: false};
function ponerAcento(rgb){ if (!rgb || rgb.length !== 3) return; ACENTO.v = rgb.map(x => Math.max(0, Math.min(255, +x)) / 255);
  document.documentElement.style.setProperty('--lima', `rgb(${rgb.join(',')})`); if (ACENTO.listo) ajustarTinte(); }
if (Q.has('acento')) ponerAcento(Q.get('acento').split(','));
let DIA = Q.has('dia'), PAUSA = false;
const EXPO = {chicle: [1.3, 1.6], glaseado: [1.3, 1.55], cuarzo: [1.4, 1.75], alambre: [1.25, 1.5], maqueta: [1.0, 1.15], rayosx: [1.1, 1.25], anodizado: [1.15, 1.4], solare: [1.2, 1.4], globo: [1.25, 1.5], saten: [1.25, 1.5], pompa: [1.3, 1.5], terciopelo: [1.35, 1.6]};   // [noche, día]
const expo = () => EXPO[MAT][DIA ? 1 : 0] * SPEC.exposicion / 1.35;
addEventListener('message', e => { const d = e.data || {};
  if (d.esferaTema) { DIA = d.esferaTema === 'dia'; grano.uniforms.uDia.value = DIA ? 1 : 0; }
  if (d.esferaAcento) ponerAcento(d.esferaAcento);
  if ('esferaPausa' in d) { const antes = PAUSA; PAUSA = !!d.esferaPausa; if (antes && !PAUSA) { last = performance.now(); requestAnimationFrame(frame); } } });

/* ---------- render ---------- */
const lienzo = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({canvas: lienzo, antialias: false, alpha: true, powerPreference: 'high-performance'});
renderer.setClearColor(0, EMBED ? 0 : 1);
renderer.setPixelRatio(Math.min(devicePixelRatio, MOVIL ? 1.5 : 2));
renderer.toneMapping = THREE.AgXToneMapping; renderer.toneMappingExposure = expo();
if ('transmissionResolutionScale' in renderer) renderer.transmissionResolutionScale = 1;
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(SPEC.camara.fov, 1, .1, 100);
const pivote = new THREE.Group(), incl = new THREE.Group();
incl.rotation.set(SPEC.camara.inclinacion, .2, 0, 'YXZ');
scene.add(pivote); pivote.add(incl);

const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, {type: THREE.HalfFloatType, samples: 4}));
composer.addPass(new RenderPass(scene, cam));
composer.addPass(new OutputPass());
const grano = new ShaderPass({   // tinte al acento + alfa = silueta (de esfera-pieles.html v4-v8, sin grano)
  uniforms: {tDiffuse: {value: null}, uTinte: {value: 0}, uGiro: {value: 0}, uSat: {value: 1}, uAlfa: {value: EMBED ? 1 : 0}, uDia: {value: DIA ? 1 : 0}},
  vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
  fragmentShader: `uniform sampler2D tDiffuse;uniform float uTinte,uGiro,uSat,uAlfa,uDia;varying vec2 vUv;
    vec3 rgb2hsv(vec3 c){vec4 K=vec4(0.,-1./3.,2./3.,-1.);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;return vec3(abs(q.z+(q.w-q.y)/(6.*d+e)),d/(q.x+e),q.x);}
    vec3 hsv2rgb(vec3 c){vec4 K=vec4(1.,2./3.,1./3.,3.);vec3 p=abs(fract(c.xxx+K.xyz)*6.-K.www);return c.z*mix(K.xxx,clamp(p-K.xxx,0.,1.),c.y);}
    void main(){vec4 t4=texture2D(tDiffuse,vUv);vec3 c=t4.rgb;
      if(uAlfa>.5){vec3 hv=rgb2hsv(max(c,0.));float dh=abs(fract(hv.x-.1869+.5)-.5);hv.y*=mix(1.,.3,smoothstep(.1,.28,dh));c=hsv2rgb(hv);}   // reflejos de otro tono (contraluz azul) casi blancos, como en v8
      if(uTinte>.5){vec3 hv=rgb2hsv(max(c,0.));hv.x=fract(hv.x+uGiro);hv.y=clamp(hv.y*uSat,0.,1.);c=hsv2rgb(hv);}
      float a=mix(1.,clamp(t4.a,0.,1.),uAlfa);c=max(c,0.);
      if(uAlfa>.5)c=mix(c,min(c,vec3(a)),uDia);
      gl_FragColor=vec4(c,a);}`
});
composer.addPass(grano);
function ajustarTinte(){
  if (!ACENTO.v) { grano.uniforms.uTinte.value = 0; return; }
  const hsv = c => { const [r, g, b] = c, mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0;
    if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return [((h / 6) + 1) % 1, mx ? d / mx : 0]; };
  const [hL, sL] = hsv([236 / 255, 249 / 255, 142 / 255]), [hA, sA] = hsv(ACENTO.v);
  const giro = hA - hL, cambia = Math.abs(giro) > .004 || Math.abs(sA - sL) > .02;
  grano.uniforms.uTinte.value = cambia ? 1 : 0; grano.uniforms.uGiro.value = giro; grano.uniforms.uSat.value = Math.min(2.2, Math.max(.3, sA / sL));
}
ACENTO.listo = true; ajustarTinte();

/* ---------- materiales (los del A/B, con su calibración de three.js) ---------- */
const LADO = (Math.min(innerWidth, innerHeight) * Math.min(devicePixelRatio, 2) > 900 && !MOVIL) ? 2048 : 1024;
const tl = new THREE.TextureLoader();
const tex = (n, color) => { const t = tl.load(`${BASE}${n.replace('.png', '')}_${n.includes('velo') ? 512 : LADO}.webp`);
  t.flipY = false; t.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); t.wrapS = THREE.RepeatWrapping; return t; };
const col = h => new THREE.Color(h);
const CAL = SPEC.three || {}, calK = (k, d = 1) => ((CAL[MAT] || {})[k] ?? CAL[k] ?? d);
const nrm = k => new THREE.Vector2(k * calK('normalK'), -k * calK('normalK'));
function materiales(){
  const s = SPEC[MAT], M = {};
  if (MAT === 'chicle') M.chicle = new THREE.MeshPhysicalMaterial({color: col(s.color), roughness: 1, roughnessMap: tex(s.rugosidadMap), normalMap: tex(s.normalMap), normalScale: nrm(s.normal),
    clearcoat: s.clearcoat, clearcoatRoughness: s.clearcoatRugosidad, sheen: s.sheen, sheenColor: col(s.sheenColor), sheenRoughness: s.sheenRugosidad, emissive: col(s.emisivo), emissiveIntensity: s.emisivoK});
  if (MAT === 'glaseado') { const c = s.capa, n = s.nucleo;
    M.glaseado_capa = new THREE.MeshPhysicalMaterial({color: 0xffffff, map: tex(c.colorMap, true), roughness: 1, roughnessMap: tex(c.rugosidadMap), normalMap: tex(c.normalMap), normalScale: nrm(c.normal),
      side: THREE.DoubleSide, transmission: c.transmision, ior: c.ior, thickness: c.grosor, attenuationColor: col(c.atenuacion), attenuationDistance: c.atenuacionDist});
    M.glaseado_nucleo = new THREE.MeshStandardMaterial({color: col(n.color), roughness: n.rugosidad, emissive: 0xffffff, emissiveMap: tex(n.emisivoMap, true), emissiveIntensity: n.emisivoK}); }
  if (MAT === 'cuarzo') { const v = s.velo;
    M.cuarzo = new THREE.MeshPhysicalMaterial({color: col(s.color), roughness: calK('rugK'), roughnessMap: tex(s.rugosidadMap), normalMap: tex(s.normalMap), normalScale: nrm(s.normal),
      side: THREE.DoubleSide, transmission: s.transmision, ior: s.ior, thickness: s.grosor, attenuationColor: col(s.atenuacion), attenuationDistance: s.atenuacionDist});
    M.cuarzo_velo = new THREE.MeshStandardMaterial({color: col(v.color), roughness: .8, map: tex(v.map, true), alphaTest: .22, emissive: col(v.color), emissiveIntensity: v.emisivoK * calK('veloK'), side: THREE.DoubleSide}); }
  return M;
}

let objeto = null, tech = null, nace = 0, pintados = 0;
async function montar(){
  const [env, gltf] = await Promise.all([new RGBELoader().loadAsync(BASE + 'estudio_esfera-hq_512.hdr'), ES_TECH ? null : new GLTFLoader().loadAsync(`${BASE}esfera-hq_${MAT}.glb`)]);
  env.mapping = THREE.EquirectangularReflectionMapping;
  const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromEquirectangular(env).texture; pm.dispose();
  /* fondo SOLO para la refracción: el cristal ve el estudio y la página sigue transparente (pinta color solo en el paso de
     transmisión de three.js, que no es ninguno de los dos búferes del composer) */
  const fondo = new THREE.Mesh(new THREE.SphereGeometry(40, 48, 24), new THREE.ShaderMaterial({side: THREE.BackSide, depthWrite: false, uniforms: {uEnv: {value: env}},
    vertexShader: 'varying vec3 vD;void main(){vD=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: 'uniform sampler2D uEnv;varying vec3 vD;void main(){vec3 d=normalize(vD);gl_FragColor=vec4(texture2D(uEnv,vec2(atan(d.z,d.x)*.1591549+.5,asin(clamp(d.y,-1.,1.))*.3183099+.5)).rgb,1.);}'}));
  fondo.renderOrder = -1; fondo.frustumCulled = false;
  fondo.onBeforeRender = r => { const rt = r.getRenderTarget(); fondo.material.colorWrite = rt !== null && rt !== composer.readBuffer && rt !== composer.writeBuffer; };
  scene.add(fondo);
  if (ES_TECH) { tech = NUEVOS.includes(MAT) ? crearMaterial(MAT) : crearTech(MAT); objeto = tech.objeto; if (tech.luz) scene.add(tech.luz); cur.classList.add('cur--' + tech.cursorCss); }
  else { const M = materiales(); objeto = new THREE.Group(); gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse(o => { if (!o.isMesh) return; const mat = M[o.name.replace(/_\d+$/, '').replace('.001', '')]; if (!mat) return;
    const c = o.clone(); c.material = mat; c.position.copy(o.getWorldPosition(new THREE.Vector3())); c.quaternion.copy(o.getWorldQuaternion(new THREE.Quaternion())); objeto.add(c); }); }
  incl.add(objeto); objeto.scale.setScalar(.9);
  await renderer.compileAsync(scene, cam);
  resize(); nace = performance.now(); last = nace; requestAnimationFrame(frame);
}

/* ---------- tamaño: la bola ocupa la misma fracción del lado corto que en esfera-pieles.html ---------- */
function resize(){
  const w = innerWidth, h = innerHeight; renderer.setSize(w, h, false); composer.setPixelRatio(renderer.getPixelRatio()); composer.setSize(w, h);
  cam.aspect = w / h; const f = FRAC || (w < 560 ? .66 : .56), frac = f * Math.min(w, h) / h;
  cam.position.set(0, 0, 1.06 / (frac * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)))); cam.lookAt(0, 0, 0); cam.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();
const radioBola = () => (FRAC || (innerWidth < 560 ? .66 : .56)) * Math.min(innerWidth, innerHeight) / 2;
const fueraDeBola = (x, y, k) => Math.hypot(x - innerWidth / 2, y - innerHeight / 2) > radioBola() * k;

/* ---------- giro libre (trackball) con inercia ---------- */
const REDUCE_MQ = matchMedia('(prefers-reduced-motion: reduce)'); let REDUCE = REDUCE_MQ.matches;
REDUCE_MQ.addEventListener?.('change', e => { REDUCE = e.matches; });
const GIRO = .22;                                     // rad/s de su giro solo, alrededor del eje vertical
const w = new THREE.Vector3(0, REDUCE ? 0 : GIRO, 0), wAuto = new THREE.Vector3(0, GIRO, 0), qd = new THREE.Quaternion(), eje = new THREE.Vector3();
let arr = null, pulsado = null, manoDentro = false;
const cur = document.getElementById('cur');
const girar = (vx, vy, ang) => { eje.set(vy, vx, 0); const l = eje.length(); if (l < 1e-6) return; qd.setFromAxisAngle(eje.divideScalar(l), ang); pivote.quaternion.premultiply(qd); };
lienzo.addEventListener('pointerdown', e => { pulsado = {x: e.clientX, y: e.clientY}; ptr.x = e.clientX; ptr.y = e.clientY; ptr.activo = true;
  if (e.pointerType === 'touch') document.body.classList.add('tactil');
  arr = {x: e.clientX, y: e.clientY, t: performance.now()}; w.set(0, 0, 0); lienzo.setPointerCapture?.(e.pointerId); cur.classList.add('down'); });
const ptr = {x: 0, y: 0, activo: false};
lienzo.addEventListener('pointermove', e => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.activo = e.pointerType !== 'touch' || !!arr;
  if (e.pointerType !== 'touch') { cur.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; cur.style.opacity = 1; }
  if (MANO && e.pointerType !== 'touch') { manoDentro = true; if (!arr && fueraDeBola(e.clientX, e.clientY, 1.12)) { devolver(); return; } }
  if (!arr) return;
  const now = performance.now(), dt = Math.max((now - arr.t) / 1000, 1 / 120), k = (MOVIL ? 4.6 : 3.9) / Math.min(innerWidth, innerHeight);
  const dx = (e.clientX - arr.x) * k, dy = (e.clientY - arr.y) * k, ang = Math.hypot(dx, dy);
  girar(dx, dy, ang);
  if (ang > 1e-6) { eje.set(dy, dx, 0).normalize().multiplyScalar(ang / dt); w.lerp(eje, .5); }
  arr = {x: e.clientX, y: e.clientY, t: now}; });
function devolver(){ if (!MANO || !manoDentro) return; manoDentro = false; cur.style.opacity = 0; avisar('fuera'); }
const soltar = e => { if (e && e.pointerType === 'touch') ptr.activo = false; if (arr && performance.now() - arr.t > (MOVIL ? 120 : 80)) w.set(0, 0, 0); arr = null; cur.classList.remove('down'); };
lienzo.addEventListener('pointerup', e => {
  if (EMBED && pulsado && !MOVIL) { const mov = Math.hypot(e.clientX - pulsado.x, e.clientY - pulsado.y);
    if (mov < 6 && fueraDeBola(e.clientX, e.clientY, 1.08)) avisar('cerrar'); }
  pulsado = null; soltar(e);
  if (MANO && fueraDeBola(e.clientX, e.clientY, 1.12)) setTimeout(devolver, 0); });
lienzo.addEventListener('pointercancel', soltar);
lienzo.addEventListener('pointerleave', () => { ptr.activo = false; cur.style.opacity = 0; if (MANO && !arr) devolver(); });
/* en el móvil la página deja pasar el scroll vertical: un toque que empieza DENTRO de la bola es para girarla en cualquier dirección */
lienzo.addEventListener('touchstart', e => { const t = e.touches[0]; if (t && !fueraDeBola(t.clientX, t.clientY, 1.0)) e.preventDefault(); }, {passive: false});
addEventListener('keydown', e => { if (e.key === 'Escape') avisar('cerrar'); if (e.key === ' ' && EMBED) { e.preventDefault(); avisar('espacio'); } });

/* ---------- bucle ---------- */
let last = performance.now(), visible = true;
document.addEventListener('visibilitychange', () => { visible = !document.hidden; last = performance.now(); });
const suave = x => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
/* dónde toca el cursor la bola (esfera analítica de radio 1): en el mundo y en la piel (espacio del objeto, gira con él) */
const rc = new THREE.Raycaster(), ndc = new THREE.Vector2(), esf = new THREE.Sphere(new THREE.Vector3(), 1), golpe = new THREE.Vector3();
const K = {cam, sobre: false, dentro: false, pObj: new THREE.Vector3(), pMundo: new THREE.Vector3(), ndc, aspecto: 1, lente: .2};
function toque(){
  K.aspecto = innerWidth / innerHeight; K.lente = .42 * radioBola() / (innerHeight / 2);
  if (tech && tech.cursorCss === 'lente') cur.style.setProperty('--lente', Math.round(.84 * radioBola()) + 'px');
  K.dentro = ptr.activo && !fueraDeBola(ptr.x, ptr.y, 1.15); K.sobre = false;
  if (!ptr.activo) return K;
  ndc.set(ptr.x / innerWidth * 2 - 1, -(ptr.y / innerHeight) * 2 + 1); rc.setFromCamera(ndc, cam);
  if (rc.ray.intersectSphere(esf, golpe)) { K.sobre = true; K.pMundo.copy(golpe); K.pObj.copy(objeto.worldToLocal(golpe.clone())).normalize(); }
  return K;
}
function frame(now){
  if (PAUSA || !objeto) return;
  requestAnimationFrame(frame);
  if (!visible) return;
  const dt = Math.max(0, Math.min((now - last) / 1000, 1 / 30)); last = now;
  objeto.scale.setScalar(.9 + .1 * suave((now - nace) / 1100));     // nace del disco del acento, sin póster ni salto
  if (!arr) {
    if (REDUCE) w.multiplyScalar(Math.exp(-dt * 14)); else w.lerp(wAuto, 1 - Math.exp(-dt * 1.7));   // inercia media → vuelve a su giro
    const a = w.length(); if (a > 1e-6) { qd.setFromAxisAngle(eje.copy(w).divideScalar(a), a * dt); pivote.quaternion.premultiply(qd); }
  }
  if (tech) tech.actualizar(dt, now / 1000, toque());
  renderer.toneMappingExposure += (expo() - renderer.toneMappingExposure) * (1 - Math.exp(-dt * 5));
  composer.render(dt);
  if (EMBED && ++pintados === 2) avisar('lista');
}
montar().catch(e => console.error('esfera-hq', e));
