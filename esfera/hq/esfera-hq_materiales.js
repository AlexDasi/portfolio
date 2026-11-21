/* alexdasi.com · v17 (Alex, ATELIER conv. 1397: «quiero ver en buena calidad de three.js cómo se verían las 5 primeras»)
   Cinco materiales nuevos propuestos en la conv. 1396, con el mismo estudio (HDR + AgX) que las pieles de calidad alta:
     solare   · Solare lima: carcasa mate translúcida y gas con luz que se mueve dentro (raymarch)
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
  const u = {uT: {value: 0}, uCam: {value: new THREE.Vector3(0, 0, 5)}, uLima: {value: new THREE.Color('#B8E61A')}, uCalido: {value: new THREE.Color('#FFB040')}, uPiel: {value: LIMA.clone()}};
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 64), new THREE.ShaderMaterial({uniforms: u, transparent: false,
    vertexShader: 'varying vec3 vP; varying vec3 vN; void main(){ vP = position; vN = normal; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }',
    fragmentShader: `uniform float uT; uniform vec3 uCam, uLima, uCalido, uPiel; varying vec3 vP; varying vec3 vN; ${SIMPLEX}
      float fbm(vec3 p){ float s = 0., a = .55; for (int i = 0; i < 5; i++){ s += a * snoise(p); p = p * 2.02 + vec3(1.7, 9.2, 3.1); a *= .5; } return s; }
      void main(){
        vec3 ro = uCam, rd = normalize(vP - uCam), n = normalize(vN);
        float b = dot(ro, rd), c = dot(ro, ro) - 1., h = b * b - c; float t1 = -b + sqrt(max(h, 0.)), t0 = -b - sqrt(max(h, 0.));
        float len = t1 - t0; vec3 acc = vec3(0.); float tr = 1.;
        for (int i = 0; i < 48; i++){                                 // gas que sube y se enrosca dentro, más denso hacia el centro
          float s = (float(i) + .5) / 48.; vec3 p = ro + rd * (t0 + len * s);
          vec3 q = p * 1.6 + vec3(0., -uT * .12, uT * .05); q.xz *= mat2(cos(uT * .07), -sin(uT * .07), sin(uT * .07), cos(uT * .07));
          float d = fbm(q + fbm(q * .8 + uT * .04) * .9) * .5 + .5; d = smoothstep(.5, .95, d) * pow(1. - smoothstep(0., 1., length(p)), 1.6);
          vec3 col = mix(uLima, uCalido, smoothstep(.45, .85, d)) * (1.3 + 4.5 * d * d);
          float a = d * len / 48. * 2.4; acc += col * a * tr; tr *= 1. - clamp(a, 0., 1.); if (tr < .02) break; }
        // carcasa mate y lechosa: luz cálida por la izquierda, fría por la derecha (el estudio), borde suave
        float fr = pow(1. - abs(dot(n, -rd)), 2.2);
        vec3 piel = uPiel * (.015 + .12 * pow(max(dot(n, normalize(vec3(-.7, .45, .6))), 0.), 1.5)) + vec3(.55, .7, 1.) * .1 * pow(max(dot(n, normalize(vec3(.9, .2, -.3))), 0.), 2.);
        vec3 col = acc * 1.25 + piel + uPiel * fr * .16 + vec3(.008, .01, .004) * tr;
        gl_FragColor = vec4(col, 1.); }`}));
  return {objeto: m, cursorCss: 'punto', actualizar(dt, t, k){ u.uT.value = t; if (k.cam) u.uCam.value.copy(m.worldToLocal(k.cam.position.clone())); }};
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

/* ---------- 4 · POMPA DE JABÓN ---------- */
function pompa(){
  const n = ruido3(3);
  const grosor = texRuido(512, 256, (u, v) => { const s = enEsfera(n, 1.1, 3)(u, v); return Math.min(1, Math.max(0, .45 + .55 * s + .3 * v)); });   // más fina arriba, más gruesa abajo (la pompa escurre)
  const mat = new THREE.MeshPhysicalMaterial({color: 0xffffff, roughness: 0, metalness: 0, transmission: 1, thickness: .02, ior: 1.33, specularIntensity: 1,
    iridescence: 1, iridescenceIOR: 1.33, iridescenceThicknessRange: [180, 820], iridescenceThicknessMap: grosor,
    attenuationColor: new THREE.Color('#EFFFC0'), attenuationDistance: 6, side: THREE.DoubleSide, transparent: true, opacity: 1, depthWrite: false});
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 160, 96), mat);
  /* la película: interferencia de capa fina aproximada (color según grosor), visible sobre todo hacia el borde, como una pompa real */
  const uP = {uG: {value: grosor}, uT: {value: 0}};
  const pelicula = new THREE.Mesh(new THREE.SphereGeometry(1.002, 160, 96), new THREE.ShaderMaterial({uniforms: uP, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec2 vUv; varying vec3 vN, vV; void main(){ vUv = uv; vec4 mv = modelViewMatrix * vec4(position, 1.); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: `uniform sampler2D uG; uniform float uT; varying vec2 vUv; varying vec3 vN, vV;
      vec3 capa(float d){ vec3 w = vec3(650., 530., 440.); return .5 + .5 * cos(6.2831853 * 2. * 1.33 * d / w * 2.2); }
      void main(){ float g = texture2D(uG, vUv + vec2(uT * .012, 0.)).r; float d = mix(220., 620., g);
        float f = 1. - abs(dot(normalize(vN), normalize(vV))); float k = .1 + .9 * pow(f, 2.2);
        vec3 c = capa(d); c = mix(vec3(dot(c, vec3(.33))), c, 1.15); gl_FragColor = vec4(c * k * .4, 1.); }`}));
  const g = new THREE.Group(); g.add(m, pelicula);
  return {objeto: g, cursorCss: 'punto', actualizar(dt, t){ grosor.offset.set(t * .012, Math.sin(t * .2) * .03); uP.uT.value = t; }};
}

/* ---------- 5 · TERCIOPELO ---------- */
function terciopelo(){
  const n = ruido3(11);
  const fibra = texRuido(1024, 512, (u, v) => { const a = enEsfera(n, 60, 2)(u, v), b = enEsfera(n, 3, 3)(u, v); return Math.min(1, Math.max(0, .5 + .35 * a + .3 * b)); });
  const chafado = texRuido(512, 256, (u, v) => { const b = enEsfera(n, 2.2, 4)(u, v); const k = Math.min(1, Math.max(0, .78 + .45 * b)); return [k, k, k]; }, true);   // terciopelo chafado: zonas con el pelo en otra dirección
  const mat = new THREE.MeshPhysicalMaterial({color: new THREE.Color('#4E6B06'), roughness: 1, sheen: 1, sheenColor: new THREE.Color('#F5FFA8'), sheenRoughness: .3,
    bumpMap: fibra, bumpScale: .12, map: chafado, emissive: new THREE.Color('#1c2903'), emissiveIntensity: .3});
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 160, 96), mat);
  return {objeto: m, cursorCss: 'punto', actualizar(){}};
}

export const NUEVOS = ['solare', 'globo', 'saten', 'pompa', 'terciopelo'];
export function crearMaterial(id){ return ({solare, globo, saten, pompa, terciopelo})[id](); }
