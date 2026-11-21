/* alexdasi.com · v17 (Alex, ATELIER conv. 1397: «quiero ver en buena calidad de three.js cómo se verían las 5 primeras»)
   Cinco materiales nuevos propuestos en la conv. 1396, con el mismo estudio (HDR + AgX) que las pieles de calidad alta:
     solare   · Solare lima: carcasa mate lechosa y gas con luz que se mueve dentro (raymarch ligero, un solo shader)
     globo    · globo de látex lima, tenso y satinado, con su nudo
     saten    · satén lima arrugado: pliegues reales en la geometría y brillo anisótropo de tela
     pompa    · pompa de jabón: película fina iridiscente cuyos colores fluyen
     terciopelo · terciopelo lima: mate, con el brillo rasante del pelo corto
   Misma API que esfera-hq_tech.js: crearMaterial(id) → {objeto, cursorCss, actualizar(dt, t, toque)}.
   De momento son para mirar (hoja de la conv. 1397); el gesto de cursor de cada una llega cuando Alex elija. */
import * as THREE from 'three';

const LIMA = new THREE.Color('#ECF98E');

/* ruido de valor 3D barato para deformar en CPU (satén) y texturas (pompa, terciopelo) */
function ruido3(seed = 1){
  const p = new Uint8Array(512); let s = seed * 9301 + 49297;
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor(s / 233280 * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 256; i++) p[i + 256] = p[i];
  const f = t => t * t * (3 - 2 * t), h = (x, y, z) => p[p[p[x & 255] + (y & 255)] + (z & 255)] / 255;
  return (x, y, z) => { const X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z), u = f(x - X), v = f(y - Y), w = f(z - Z), L = (a, b, t) => a + (b - a) * t;
    return L(L(L(h(X, Y, Z), h(X + 1, Y, Z), u), L(h(X, Y + 1, Z), h(X + 1, Y + 1, Z), u), v), L(L(h(X, Y, Z + 1), h(X + 1, Y, Z + 1), u), L(h(X, Y + 1, Z + 1), h(X + 1, Y + 1, Z + 1), u), v), w) * 2 - 1; };
}
function texRuido(w, h, fn, color){
  const d = new Uint8Array(w * h * 4);
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const v = fn(i / w, j / h), k = (j * w + i) * 4, c = Array.isArray(v) ? v : [v, v, v];
    d[k] = c[0] * 255; d[k + 1] = c[1] * 255; d[k + 2] = c[2] * 255; d[k + 3] = 255; }
  const t = new THREE.DataTexture(d, w, h); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearMipmapLinearFilter; t.generateMipmaps = true; t.needsUpdate = true; return t;
}
/* el mismo ruido en una esfera desenrollada (u = longitud, v = latitud): sin costuras */
const enEsfera = (n, esc, oct = 4) => (u, v) => { const lon = u * Math.PI * 2, lat = (v - .5) * Math.PI, x = Math.cos(lat) * Math.cos(lon), y = Math.sin(lat), z = Math.cos(lat) * Math.sin(lon);
  let s = 0, a = .5, f = esc; for (let o = 0; o < oct; o++) { s += a * n(x * f + o * 7.1, y * f, z * f); a *= .5; f *= 2.03; } return s; };

/* ---------- 1 · SOLARE LIMA ---------- */
const SIMPLEX = `vec3 m289(vec3 x){return x-floor(x*(1./289.))*289.;}vec4 m289(vec4 x){return x-floor(x*(1./289.))*289.;}vec4 perm(vec4 x){return m289(((x*34.)+1.)*x);}
vec4 tis(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=m289(i);vec4 p=perm(perm(perm(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 nm=tis(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=nm.x;p1*=nm.y;p2*=nm.z;p3*=nm.w;vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}`;
function solare(){
  /* v3 (Alex, conv. 1406: «le has puesto los reflejos de la burbuja; tiene que ser mucho más mate, como en el ejemplo, y pesa
     un quintal»). Vuelve a la carcasa de la v1: lechosa y MATE, pintada en el mismo shader (sin MeshPhysical con transmisión
     ni barniz: ni reflejos de pompa ni el segundo render de toda la escena que costaba la transmisión). Dentro, el gas lima y
     ámbar de la v1, más barato (36 pasos en escritorio / 20 en móvil, ruido de 4+2 octavas; la v2 eran 72 pasos de 4+4 más la transmisión) y con el remolino del cursor con
     inercia de la v2. La resolución de esta piel la baja el embed (gas suave: no se nota). */
  const MOVIL = matchMedia('(hover: none), (pointer: coarse)').matches;
  const PASOS = MOVIL ? 20 : 36;
  const u = {uT: {value: 0}, uCam: {value: new THREE.Vector3(0, 0, 5)}, uLima: {value: new THREE.Color('#B8E61A')}, uCalido: {value: new THREE.Color('#FFB040')},
    uPiel: {value: LIMA.clone()}, uCur: {value: new THREE.Vector3(0, 0, 1)}, uRem: {value: 0}};
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 48), new THREE.ShaderMaterial({uniforms: u,
    vertexShader: 'varying vec3 vP; varying vec3 vN; void main(){ vP = position; vN = normal; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }',
    fragmentShader: `uniform float uT, uRem; uniform vec3 uCam, uLima, uCalido, uPiel, uCur; varying vec3 vP; varying vec3 vN; ${SIMPLEX}
      float fbm4(vec3 p){ float s = .55 * snoise(p); p = p * 2.02 + vec3(1.7, 9.2, 3.1); s += .275 * snoise(p); p = p * 2.02 + vec3(1.7, 9.2, 3.1); s += .1375 * snoise(p); p = p * 2.02 + vec3(1.7, 9.2, 3.1); return s + .069 * snoise(p); }
      float fbm2(vec3 p){ return .55 * snoise(p) + .275 * snoise(p * 2.02 + vec3(1.7, 9.2, 3.1)); }
      mat2 rot(float a){ return mat2(cos(a), -sin(a), sin(a), cos(a)); }
      void main(){
        vec3 ro = uCam, rd = normalize(vP - uCam), n = normalize(vN);
        float b = dot(ro, rd), c = dot(ro, ro) - 1., h = max(b * b - c, 0.); float t0 = -b - sqrt(h), len = 2. * sqrt(h);
        float paso = len / ${PASOS}.; vec3 acc = vec3(0.); float tr = 1.;
        float jit = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        for (int i = 0; i < ${PASOS}; i++){                            // gas que sube y se enrosca, más denso hacia el centro
          vec3 p = ro + rd * (t0 + paso * (float(i) + jit));
          vec3 dc = p - uCur * .8; float fc = exp(-dot(dc, dc) * 3.5) * uRem;   // remolino tras el cursor
          vec3 q = p; q.xz = rot(fc * 3.2) * q.xz; q.xy = rot(fc * 1.6) * q.xy;
          q = q * 1.6 + vec3(0., -uT * .12, uT * .05); q.xz = rot(uT * .07) * q.xz;
          float d = fbm4(q + fbm2(q * .8 + uT * .04) * .9) * .5 + .5;
          d = smoothstep(.5, .95, d) * pow(1. - smoothstep(0., 1., length(p)), 1.6) + fc * .2 * smoothstep(.45, .8, d);
          vec3 col = mix(uLima, uCalido, smoothstep(.45, .85, d)) * (1.3 + 4.5 * d * d) * (1. + fc * 1.5);
          float a = clamp(d * paso * 2.4, 0., 1.); acc += col * a * tr; tr *= 1. - a; if (tr < .02) break; }
        // carcasa mate y lechosa (v1): luz cálida difusa por la izquierda, fría por la derecha, borde suave; sin brillo especular
        float fr = pow(1. - abs(dot(n, -rd)), 2.2);
        vec3 piel = uPiel * (.015 + .12 * pow(max(dot(n, normalize(vec3(-.7, .45, .6))), 0.), 1.5)) + vec3(.55, .7, 1.) * .1 * pow(max(dot(n, normalize(vec3(.9, .2, -.3))), 0.), 2.);
        gl_FragColor = vec4(acc * 1.25 + piel + uPiel * fr * .16 + vec3(.008, .01, .004) * tr, 1.); }`}));
  const local = new THREE.Vector3();
  return {objeto: m, cursorCss: 'punto', dpr: MOVIL ? 1 : 1.25, sinFondo: true, actualizar(dt, t, k){
    u.uT.value = t;
    if (k.cam) u.uCam.value.copy(m.worldToLocal(local.copy(k.cam.position)));
    if (k.sobre) { u.uCur.value.lerp(k.pObj, 1 - Math.exp(-dt * 6)); u.uRem.value += (1 - u.uRem.value) * (1 - Math.exp(-dt * 3)); }
    else u.uRem.value *= Math.exp(-dt * .6); }};
}

/* ---------- 2 · GLOBO DE LÁTEX ---------- */
function globo(){
  const g = new THREE.Group();
  const geo = new THREE.SphereGeometry(1, 160, 96), pa = geo.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < pa.count; i++) { v.fromBufferAttribute(pa, i); const y = v.y;   // forma de globo: un poco más ancho arriba y con la boca abajo
    v.multiplyScalar(1 + .06 * y - .05 * Math.pow(Math.max(0, -y), 3)); v.y *= 1.06; pa.setXYZ(i, v.x, v.y, v.z); }
  geo.computeVertexNormals();
  const mat = new THREE.MeshPhysicalMaterial({color: new THREE.Color('#CFF03A'), roughness: .28, clearcoat: 1, clearcoatRoughness: .06, sheen: .35, sheenColor: new THREE.Color('#F6FFC8'),
    transmission: .18, thickness: .9, attenuationColor: new THREE.Color('#B9DA2A'), attenuationDistance: .8, ior: 1.52, emissive: new THREE.Color('#6d8a10'), emissiveIntensity: .12, side: THREE.FrontSide});
  const cuerpo = new THREE.Mesh(geo, mat);
  const nudo = new THREE.Mesh(new THREE.TorusGeometry(.055, .035, 16, 32), mat); nudo.position.y = -1.13; nudo.rotation.x = Math.PI / 2;
  const cuello = new THREE.Mesh(new THREE.ConeGeometry(.07, .12, 24), mat); cuello.position.y = -1.08; cuello.rotation.x = Math.PI;
  g.add(cuerpo, cuello, nudo); g.scale.setScalar(.93);
  return {objeto: g, cursorCss: 'punto', actualizar(dt, t){ g.position.y = Math.sin(t * .9) * .025; g.rotation.z = Math.sin(t * .6) * .04; }};
}

/* ---------- 3 · SATÉN ARRUGADO ---------- */
function saten(){
  const n = ruido3(7), n2 = ruido3(19), geo = new THREE.SphereGeometry(1, 320, 180), pa = geo.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < pa.count; i++) { v.fromBufferAttribute(pa, i).normalize();
    let pl = 0; for (let o = 0, f = 1.1, a = 1; o < 3; o++, f *= 1.9, a *= .5) pl += a * Math.pow(1 - Math.abs(n(v.x * f + 3, v.y * f, v.z * f)), 6);   // crestas de los pliegues
    const ond = .5 * n2(v.x * 3.2, v.y * 3.2 + 5, v.z * 3.2);
    v.multiplyScalar(1 + .07 * pl + .015 * ond - .03); pa.setXYZ(i, v.x, v.y, v.z); }
  geo.computeVertexNormals(); geo.computeTangents();
  const mat = new THREE.MeshPhysicalMaterial({color: new THREE.Color('#8FB212'), roughness: .2, metalness: .25, anisotropy: 1, anisotropyRotation: Math.PI / 2,
    sheen: .6, sheenColor: new THREE.Color('#F4FFB8'), sheenRoughness: .25, clearcoat: .3, clearcoatRoughness: .15, specularIntensity: 1});
  const m = new THREE.Mesh(geo, mat);
  return {objeto: m, cursorCss: 'punto', actualizar(){}};
}

/* ---------- 4 · POMPA DE JABÓN (v2, conv. 1401: «con mayor calidad») ----------
   Una pompa real casi no refracta: se ve lo de detrás tal cual y encima los reflejos del estudio teñidos por la
   interferencia de la película (fórmula de Airy por longitud de onda R, G, B). El grosor escurre (fino arriba, con la
   mancha negra de cuando va a explotar; grueso abajo) y se arremolina con remolinos que suben. Cara de delante y de atrás. */
function pompa(){
  const u = {uT: {value: 0}, uEnv: {value: null}, uK: {value: 3.2}};
  const mat = new THREE.ShaderMaterial({uniforms: u, transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec3 vO; varying vec3 vNw; varying vec3 vPw; void main(){ vO = position; vNw = normalize(mat3(modelMatrix) * normal); vec4 w = modelMatrix * vec4(position, 1.); vPw = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader: `uniform float uT, uK; uniform sampler2D uEnv; varying vec3 vO; varying vec3 vNw; varying vec3 vPw; ${SIMPLEX}
      vec3 entorno(vec3 d){ return texture2D(uEnv, vec2(atan(d.z, d.x) * .1591549 + .5, asin(clamp(d.y, -1., 1.)) * .3183099 + .5)).rgb; }
      float airy(float dnm, float cosI, float lam){                     // reflectancia de una película de agua jabonosa (n = 1.33)
        float n = 1.33; float sinT = sqrt(max(0., 1. - cosI * cosI)) / n; float cosT = sqrt(max(0., 1. - sinT * sinT));
        float rs = (cosI - n * cosT) / (cosI + n * cosT); float rp = (n * cosI - cosT) / (n * cosI + cosT); float r = (abs(rs) + abs(rp)) * .5;
        float del = 12.5663706 * n * dnm * cosT / lam; float r2 = r * r;
        return (2. * r2 - 2. * r2 * cos(del)) / (1. + r2 * r2 - 2. * r2 * cos(del)); }
      void main(){
        vec3 n = normalize(vNw); if (!gl_FrontFacing) n = -n;
        vec3 v = normalize(cameraPosition - vPw); float cosI = clamp(abs(dot(n, v)), .02, 1.);
        vec3 p = normalize(vO);
        // grosor: escurre hacia abajo + remolinos que suben y giran despacio
        float t = uT;
        vec3 q = p * 1.7 + vec3(0., -t * .06, 0.); q.xz = mat2(cos(t * .05), -sin(t * .05), sin(t * .05), cos(t * .05)) * q.xz;
        float rem = snoise(q + snoise(q * 1.9 + t * .04) * .8) * .6 + snoise(p * 5.5 + vec3(t * .1, -t * .08, 0.)) * .18;
        float caida = smoothstep(1., -1., p.y);                           // 0 arriba · 1 abajo
        float dnm = mix(170., 960., pow(caida, 1.1)) + rem * mix(110., 240., caida);
        float negra = smoothstep(105., 70., dnm);                         // la mancha negra (película más fina que la luz)
        dnm = max(dnm, 20.);
        vec3 R = vec3(airy(dnm, cosI, 650.), airy(dnm, cosI, 532.), airy(dnm, cosI, 455.)) * (1. - negra * .9);
        vec3 env = entorno(reflect(-v, n));
        float k = uK * (gl_FrontFacing ? 1. : .45);
        vec3 col = env * R * k + R * .035;                                // reflejo del estudio teñido + un poco de película siempre
        gl_FragColor = vec4(col, 1.); }`});
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 192, 112), mat);
  return {objeto: m, cursorCss: 'punto', entorno(env){ u.uEnv.value = env; }, actualizar(dt, t){ u.uT.value = t; }};
}

/* ---------- 5 · TERCIOPELO (v2, conv. 1401: «con mayor calidad») ----------
   Pelo de verdad: 40 capas (conchas) sobre la piel, cada una con las fibras recortadas a su altura; el pelo se tumba en
   direcciones distintas por zonas (terciopelo chafado) y el brillo rasante (sheen) sale de las puntas. Pelusa en el borde. */
function terciopelo(){
  const CAPAS = 40, ALTO = .032, geo = new THREE.SphereGeometry(1, 192, 112);
  const piel = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({color: new THREE.Color('#2E4204'), roughness: 1, sheen: .6, sheenColor: new THREE.Color('#C9E64A'), sheenRoughness: .5}));
  const mat = new THREE.MeshPhysicalMaterial({color: new THREE.Color('#5C7E0A'), roughness: 1, sheen: 1, sheenColor: new THREE.Color('#F8FFB4'), sheenRoughness: .3});
  mat.onBeforeCompile = sh => {
    sh.uniforms.uAlto = {value: ALTO}; sh.uniforms.uCapas = {value: CAPAS};
    sh.vertexShader = 'uniform float uAlto, uCapas; varying vec3 vBase; varying float vH;\n' + SIMPLEX + '\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      vH = (float(gl_InstanceID) + 1.) / uCapas; vBase = normalize(position);
      vec3 cr = vec3(snoise(vBase * 1.6), snoise(vBase * 1.6 + 7.3), snoise(vBase * 1.6 + 13.1));      // hacia dónde se tumba el pelo
      vec3 tum = normalize(cross(vBase, cr) + 1e-4);
      transformed += vBase * vH * uAlto + tum * vH * vH * uAlto * 1.1 - vec3(0., 1., 0.) * vH * vH * uAlto * .25;`);
    sh.vertexShader = sh.vertexShader.replace('#include <project_vertex>', '#include <project_vertex>').replace('#include <instancing_vertex>', '');   // sin matriz de instancia: solo usamos el índice
    sh.fragmentShader = 'varying vec3 vBase; varying float vH;\nfloat h1(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }\nvec3 h3(vec3 p){ return fract(sin(vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6)))) * 43758.5453); }\n'
      + sh.fragmentShader.replace('#include <clipping_planes_fragment>', `#include <clipping_planes_fragment>
      { vec3 P = vBase * 460.; vec3 c = floor(P); vec3 f = fract(P) - h3(c);                           // una fibra por celda, con largo propio
        float largo = .55 + .45 * h1(c); float rad = .42 * (1. - vH * .65);
        if (length(f - dot(f, vBase) * vBase) > rad || vH > largo) discard; }`)
      .replace('#include <color_fragment>', '#include <color_fragment>\n diffuseColor.rgb *= mix(.18, 1.1, vH * vH);');    // oscuro en la raíz (oclusión), claro en las puntas
  };
  mat.customProgramCacheKey = () => 'terciopelo-v2';
  const fibras = new THREE.InstancedMesh(geo, mat, CAPAS);
  for (let i = 0; i < CAPAS; i++) fibras.setMatrixAt(i, new THREE.Matrix4());
  fibras.frustumCulled = false;
  const g = new THREE.Group(); g.add(piel, fibras);
  return {objeto: g, cursorCss: 'punto', actualizar(){}};
}

export const NUEVOS = ['solare', 'globo', 'saten', 'pompa', 'terciopelo'];
export function crearMaterial(id){ return ({solare, globo, saten, pompa, terciopelo})[id](); }
