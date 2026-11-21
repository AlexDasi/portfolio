/* alexdasi.com · v16 (Alex, ATELIER conv. 1395: «haz el alambre, la maqueta, los rayos X y el anodizado, que quiero verlos»)
   Las cuatro pieles tech del catálogo de Blender del 05/11 (conv. 1011), en tiempo real y con el mismo estudio que las de
   calidad alta (HDR + AgX). Lima siempre de base (conv. 1014); el tinte al acento lo pone el pase final de esfera-hq_embed.js.
   Cada una con su gesto de cursor (tabla de docs/estudios/2026-11-04_portfolio-esfera-dos-caminos.md § v4):
     alambre   · las líneas cerca del cursor se doblan como un campo magnético y se encienden
     maqueta   · escáner: un anillo de corte sigue al ratón (solo, barre arriba y abajo)
     rayosx    · lente: dentro del cursor se ve el núcleo de puntos más denso
     anodizado · el reflejo sigue al cursor como una linterna y deja una huella que se borra
   API: crearTech(id, renderer) → {objeto, cursorCss, actualizar(dt, t, toque)}; toque = {sobre, pObj, pMundo, ndc, aspecto} */
import * as THREE from 'three';
import {mergeGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const LIMA = new THREE.Color('#ECF98E');
const HUELLAS = 10;

/* inyecta en un material estándar/físico: posición de objeto y de mundo para los efectos */
function conPos(mat, extra){
  mat.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, extra.uniforms);
    sh.vertexShader = 'varying vec3 vPosO;\nvarying vec3 vPosW;\n' + (extra.vDecl || '') + sh.vertexShader
      .replace('#include <begin_vertex>', '#include <begin_vertex>\n' + (extra.vert || ''))
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvPosO = transformed;\nvPosW = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = 'varying vec3 vPosO;\nvarying vec3 vPosW;\n' + (extra.fDecl || '') + sh.fragmentShader
      .replace('#include <color_fragment>', '#include <color_fragment>\n' + (extra.color || ''))
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n' + (extra.emis || ''));
  };
  mat.customProgramCacheKey = () => extra.clave;
  return mat;
}

/* ---------- 01 · ALAMBRE: meridianos y paralelos en tubo fino de metal lima ---------- */
function alambre(){
  const tubos = [], R = 1, r = .0075, curva = pts => new THREE.CatmullRomCurve3(pts, true);
  for (let i = 1; i < 12; i++) {           // paralelos (sin los polos)
    const lat = -Math.PI / 2 + i * Math.PI / 12, y = Math.sin(lat) * R, rr = Math.cos(lat) * R, pts = [];
    for (let k = 0; k < 96; k++) { const a = k / 96 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * rr, y, Math.sin(a) * rr)); }
    tubos.push(new THREE.TubeGeometry(curva(pts), 192, r, 6, true));
  }
  for (let j = 0; j < 12; j++) {           // meridianos (media vuelta cada uno = 24 líneas)
    const a = j / 12 * Math.PI, pts = [];
    for (let k = 0; k < 96; k++) { const t = k / 96 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * Math.cos(t) * R, Math.sin(t) * R, Math.sin(a) * Math.cos(t) * R)); }
    tubos.push(new THREE.TubeGeometry(curva(pts), 192, r, 6, true));
  }
  const geo = mergeGeometries(tubos); tubos.forEach(g => g.dispose());
  const u = {uCur: {value: new THREE.Vector3(0, 0, 1)}, uOn: {value: 0}, uT: {value: 0}};
  const mat = conPos(new THREE.MeshPhysicalMaterial({color: LIMA, metalness: .45, roughness: .3, clearcoat: .4, emissive: LIMA, emissiveIntensity: 0}), {
    clave: 'alambre', uniforms: u,
    vDecl: 'uniform vec3 uCur; uniform float uOn, uT; varying float vBrillo;\n',
    fDecl: 'varying float vBrillo;\n',
    // el campo magnético: cerca del cursor la línea se aparta hacia fuera y se tuerce hacia él; respira un poco siempre
    vert: `{ vec3 n0 = normalize(transformed); float d = distance(n0, uCur); float f = exp(-d * d / .055) * uOn;
      vec3 haciaC = uCur - n0 * dot(uCur, n0);
      transformed += n0 * (.13 * f + .006 * sin(uT * 1.3 + n0.y * 9.)) + haciaC * .18 * f; vBrillo = f; }`,
    emis: 'totalEmissiveRadiance += vec3(.93, .98, .56) * (vBrillo * 2.8 + .14);'
  });
  const m = new THREE.Mesh(geo, mat);
  // un núcleo muy tenue para que la malla tenga volumen (se ve la parte de atrás más apagada)
  const nucleo = new THREE.Mesh(new THREE.SphereGeometry(.985, 64, 32), new THREE.MeshBasicMaterial({color: 0x000000, transparent: true, opacity: .55, depthWrite: false}));
  const g = new THREE.Group(); g.add(nucleo, m);
  return {objeto: g, cursorCss: 'mira', actualizar(dt, t, k){
    u.uT.value = t; u.uOn.value += ((k.sobre ? 1 : 0) - u.uOn.value) * (1 - Math.exp(-dt * 6));
    if (k.sobre) u.uCur.value.lerp(k.pObj, 1 - Math.exp(-dt * 14)).normalize(); }};
}

/* ---------- 02 · MAQUETA: esfera de maqueta mate con retícula y anillo de escáner ---------- */
function maqueta(){
  const u = {uScan: {value: 0}, uOn: {value: 0}, uT: {value: 0}};
  const mat = conPos(new THREE.MeshPhysicalMaterial({color: new THREE.Color('#EEF3DC'), roughness: .82, sheen: .25, sheenColor: new THREE.Color('#F7FFD6'), sheenRoughness: .8,
    emissive: LIMA, emissiveIntensity: 1}), {
    clave: 'maqueta', uniforms: u,
    fDecl: 'uniform float uScan, uOn, uT;\nfloat rejilla(float x, float n){ float v = x * n; float w = fwidth(v) * 1.2; return 1. - smoothstep(0., w, abs(fract(v + .5) - .5)); }\n',
    // retícula de meridianos cada 15° y paralelos cada 15° grabada en la maqueta (líneas finas oscuras), ecuador marcado
    color: `{ vec3 n = normalize(vPosO); float lat = asin(clamp(n.y, -1., 1.)) / 3.14159265 + .5; float lon = atan(n.z, n.x) / 6.2831853 + .5;
      float l = max(rejilla(lat, 12.), rejilla(lon, 24.) * smoothstep(.02, .1, 1. - abs(n.y)));
      float ecu = 1. - smoothstep(0., fwidth(lat) * 2.2, abs(lat - .5));
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.16, .17, .12), l * .55);
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.86, .97, .45), ecu); }`,
    // el anillo de corte: una banda fina que se enciende en la altura del cursor (y barre sola si no hay cursor)
    emis: `{ float d = abs(vPosW.y - uScan); float anillo = 1. - smoothstep(0., .012 + fwidth(vPosW.y), d);
      float halo = exp(-d * d / .006) * .35; totalEmissiveRadiance = vec3(.92, .98, .55) * (anillo * 2.4 + halo) ; }`
  });
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 160, 96), mat);
  let barrido = 0;
  return {objeto: m, cursorCss: 'mira', actualizar(dt, t, k){
    barrido += dt; u.uT.value = t;
    const solo = Math.sin(barrido * .7) * .92, dest = k.sobre ? k.pMundo.y : solo;
    u.uScan.value += (dest - u.uScan.value) * (1 - Math.exp(-dt * (k.sobre ? 10 : 2.5))); }};
}

/* ---------- 03 · RAYOS X: silueta que brilla en el borde y núcleo de puntos; el cursor es una lente ---------- */
function rayosx(){
  const g = new THREE.Group();
  const borde = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), new THREE.ShaderMaterial({transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: {uC: {value: LIMA.clone()}},
    vertexShader: 'varying vec3 vN, vV; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: 'uniform vec3 uC; varying vec3 vN, vV; void main(){ float f = 1. - abs(dot(normalize(vN), normalize(vV))); float a = pow(f, 2.6) * 1.15 + pow(f, 9.) * 1.6 + .025; gl_FragColor = vec4(uC * a, 1.); }'}));
  const N = 42000, pos = new Float32Array(N * 3), azar = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const r = .86 * Math.pow(Math.random(), 1.55), th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th); pos[i * 3 + 1] = r * Math.cos(ph); pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th); azar[i] = Math.random();
  }
  const gp = new THREE.BufferGeometry(); gp.setAttribute('position', new THREE.BufferAttribute(pos, 3)); gp.setAttribute('aAzar', new THREE.BufferAttribute(azar, 1));
  const uP = {uCur: {value: new THREE.Vector2(9, 9)}, uAsp: {value: 1}, uLente: {value: .2}, uOn: {value: 0}, uPx: {value: 1}, uC: {value: LIMA.clone()}};
  const puntos = new THREE.Points(gp, new THREE.ShaderMaterial({transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: uP,
    vertexShader: `uniform vec2 uCur; uniform float uAsp, uLente, uOn, uPx; attribute float aAzar; varying float vA;
      void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); vec4 cp = projectionMatrix * mv; vec2 ndc = cp.xy / cp.w;
        float d = length((ndc - uCur) * vec2(uAsp, 1.)); float lente = (1. - smoothstep(uLente * .82, uLente, d)) * uOn;
        float ve = step(aAzar, mix(.22, 1., lente));                        // fuera de la lente solo un 22% de los puntos
        vA = ve * mix(.5, 1., lente) * (.55 + .45 * smoothstep(.0, .5, -mv.z - 3.));
        gl_PointSize = uPx * mix(1.4, 2.2, lente); gl_Position = cp; }`,
    fragmentShader: 'uniform vec3 uC; varying float vA; void main(){ vec2 c = gl_PointCoord - .5; if (dot(c, c) > .25 || vA < .01) discard; gl_FragColor = vec4(uC * vA, 1.); }'}));
  g.add(puntos, borde);
  return {objeto: g, cursorCss: 'lente', actualizar(dt, t, k){
    uP.uPx.value = Math.min(devicePixelRatio, 2); uP.uAsp.value = k.aspecto; uP.uLente.value = k.lente;
    uP.uOn.value += ((k.dentro ? 1 : 0) - uP.uOn.value) * (1 - Math.exp(-dt * 8));
    if (k.dentro) uP.uCur.value.copy(k.ndc); }};
}

/* ---------- 04 · ANODIZADO: metal anodizado lima satinado; linterna en el cursor y huella que se borra ---------- */
function anodizado(){
  const hu = Array.from({length: HUELLAS}, () => new THREE.Vector4(0, 0, 0, 0));
  const u = {uHu: {value: hu}};
  const mat = conPos(new THREE.MeshPhysicalMaterial({color: new THREE.Color('#E8F78A'), metalness: 1, roughness: .26, anisotropy: .55, clearcoat: .55, clearcoatRoughness: .12,
    iridescence: .35, iridescenceIOR: 1.6, iridescenceThicknessRange: [180, 420], emissive: LIMA, emissiveIntensity: 1}), {
    clave: 'anodizado', uniforms: u,
    fDecl: `uniform vec4 uHu[${HUELLAS}];\n`,
    emis: `{ vec3 n = normalize(vPosO); float h = 0.; for (int i = 0; i < ${HUELLAS}; i++) { float d = distance(n, uHu[i].xyz); h += uHu[i].w * exp(-d * d / .012); }
      totalEmissiveRadiance = vec3(.9, .97, .5) * min(h, 1.4) * 1.3; }`
  });
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 160, 96), mat);
  m.geometry.computeTangents?.();
  const luz = new THREE.PointLight(0xf4ffd0, 0, 4, 1.6);
  const g = new THREE.Group(); g.add(m); let cola = 0, ultima = new THREE.Vector3(9, 9, 9);
  return {objeto: g, luz, cursorCss: 'punto', actualizar(dt, t, k){
    luz.intensity += ((k.sobre ? 9 : 0) - luz.intensity) * (1 - Math.exp(-dt * 8));
    if (k.sobre) { luz.position.copy(k.pMundo).multiplyScalar(1.55);
      cola += dt; if (cola > .045 && k.pObj.distanceTo(ultima) > .025) { cola = 0; ultima.copy(k.pObj);   // la huella se queda pegada a la piel y gira con ella
        const v = hu.reduce((a, b) => (b.w < a.w ? b : a)); v.set(k.pObj.x, k.pObj.y, k.pObj.z, .9); } }
    hu.forEach(v => { v.w *= Math.exp(-dt * .9); }); }};
}

export const TECH = ['alambre', 'maqueta', 'rayosx', 'anodizado'];
export function crearTech(id){ return ({alambre, maqueta, rayosx, anodizado})[id](); }
