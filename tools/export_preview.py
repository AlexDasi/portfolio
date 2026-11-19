#!/usr/bin/env python3
"""Exporta la rama a HTML estático con rutas relativas, para enseñarla en Cloudflare Pages
(que no ejecuta PHP). Rama rediseno-baraja-2026-11 (ATELIER conv. 1330).

Uso:  python3 tools/export_preview.py <carpeta_salida> [--con-proyectos]
      (arranca su propio `php -S` en un puerto libre; no hace falta tenerlo abierto)

Páginas que genera (castellano por defecto; inglés con -en):
  index.html · index-en.html                      (home: intro + baraja)
  about.html · about-<uxui|process|contact>.html  (+ -en)  (lo que salió de la home)
  projects/<slug>.html (+ -en)                    solo con --con-proyectos (~90 MB de medios);
                                                  sin él, los casos enlazan a alexdasi.com en vivo
Copia solo los recursos que se usan (más content/baraja/ entero y los js/ que se cargan por código).
Los enlaces a php se convierten a .html; las rutas absolutas (/css, /js…) a relativas.
"""
import os, re, sys, shutil, socket, subprocess, time, urllib.request, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if len(sys.argv) < 2:
    sys.exit(__doc__)
OUT = os.path.abspath(sys.argv[1])
CON_PROYECTOS = '--con-proyectos' in sys.argv

def puerto_libre():
    s = socket.socket(); s.bind(('127.0.0.1', 0)); p = s.getsockname()[1]; s.close(); return p

PORT = puerto_libre()
BASE = f'http://127.0.0.1:{PORT}'
php = subprocess.Popen(['php', '-S', f'127.0.0.1:{PORT}', '-t', ROOT], cwd=ROOT,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
for _ in range(50):
    try:
        urllib.request.urlopen(BASE + '/', timeout=1); break
    except Exception:
        time.sleep(0.1)

SECCIONES = ['about', 'uxui', 'process', 'contact']
import json as _json
FICHAS = [x['slug'] for x in _json.load(open(os.path.join(ROOT, 'content/baraja.json')))['proyectos'] if not x.get('oculta') and not x.get('neutra')]
slugs = sorted(f[:-4] for f in os.listdir(os.path.join(ROOT, 'php-pages/projects')) if f.endswith('.php'))
assets = set()

def nombre_about(s, en):
    return ('about' if s == 'about' else f'about-{s}') + ('-en' if en else '') + '.html'

def nombre(slug, en):
    return slug + ('-en' if en else '') + '.html'

def convierte(html, en_projects):
    up = '../' if en_projects else ''
    html = re.sub(r'<script async src="https://www.googletagmanager[^>]*></script>', '', html)
    html = re.sub(r"<script>\s*window\.dataLayer[\s\S]*?gtag\('config'[^<]*</script>", '', html)
    html = re.sub(r'<link rel="alternate" hreflang[^>]*>\s*', '', html)

    def url_local(url):
        if re.match(r'^(https?:|mailto:|tel:|#|//|data:|javascript:)', url) or url == '':
            return None
        p = urllib.parse.urlparse(url.replace('&amp;', '&'))
        q = urllib.parse.parse_qs(p.query or '')
        es = q.get('lang', [''])[0] == 'en'   # «es» aquí = ¿versión con sufijo? (la inglesa)
        path = p.path
        frag = ('#' + p.fragment) if p.fragment else ''
        base = os.path.basename(path)
        if path in ('/', '') or base == 'index.php':
            return f'{up}{nombre("index", es)}{frag}'
        if base == 'proyecto.php':
            ps = q.get('p', [''])[0]
            return f'{up}proyecto-{ps}' + ('-en' if es else '') + f'.html{frag}'
        if base == 'about.php':
            s = q.get('s', ['about'])[0]
            return f'{up}{nombre_about(s if s in SECCIONES else "about", es)}{frag}'
        if base.endswith('.php') and base[:-4] in slugs:
            if not CON_PROYECTOS:
                # alexdasi.com en vivo (main) aún va en inglés por defecto
                return f'https://alexdasi.com/php-pages/projects/{base}' + ('' if es else '?lang=es') + frag
            return f'{"" if en_projects else "projects/"}{nombre(base[:-4], es)}{frag}'
        # recurso: normalizar a ruta desde la raíz del repo
        if path.startswith('/'):
            rel = path[1:]
        else:
            rel = os.path.normpath(os.path.join('php-pages/projects' if en_projects else '', path)).replace('\\', '/')
        rel = re.sub(r'^(\.\./)+', '', rel)
        assets.add(urllib.parse.unquote(rel))
        return f'{up}{rel}{frag}'

    def attr(m):
        nuevo = url_local(m.group(2))
        return m.group(0) if nuevo is None else f'{m.group(1)}="{nuevo}"'

    html = re.sub(r'\b(href|src|poster|data-poster-d|data-poster-m|data-video-d|data-video-m)="([^"]*)"', attr, html)
    # srcset
    def srcset(m):
        partes = []
        for item in m.group(1).split(','):
            bits = item.strip().split()
            if not bits:
                continue
            nuevo = url_local(bits[0])
            partes.append(' '.join([nuevo or bits[0]] + bits[1:]))
        return f'srcset="{", ".join(partes)}"'
    html = re.sub(r'srcset="([^"]*)"', srcset, html)
    # rutas absolutas dentro de scripts en línea ('/js/fluid.js?v=…')
    html = re.sub(r"(['\"])/(js|css|content|images)/", lambda m: f'{m.group(1)}{up}{m.group(2)}/', html)
    return html

def baja(url):
    return urllib.request.urlopen(BASE + url).read().decode()

try:
    os.makedirs(os.path.join(OUT, 'projects') if CON_PROYECTOS else OUT, exist_ok=True)
    paginas = 0
    for es in (False, True):
        lq = 'lang=en' if es else ''
        open(os.path.join(OUT, nombre('index', es)), 'w').write(convierte(baja('/' + ('?' + lq if es else '')), False)); paginas += 1
        for s in SECCIONES:
            url = f'/about.php?s={s}' + ('&' + lq if es else '')
            open(os.path.join(OUT, nombre_about(s, es)), 'w').write(convierte(baja(url), False)); paginas += 1
        for ps in FICHAS:
            url = f'/proyecto.php?p={ps}' + ('&' + lq if es else '')
            open(os.path.join(OUT, f'proyecto-{ps}' + ('-en' if es else '') + '.html'), 'w').write(convierte(baja(url), False)); paginas += 1
        for slug in (slugs if CON_PROYECTOS else []):
            url = f'/php-pages/projects/{slug}.php' + ('?' + lq if es else '')
            open(os.path.join(OUT, 'projects', nombre(slug, es)), 'w').write(convierte(baja(url), True)); paginas += 1
    # js que se cargan por código y la baraja entera (sus vídeos los pide js/baraja.js)
    for f in os.listdir(os.path.join(ROOT, 'js')):
        if f.endswith('.js'):
            assets.add('js/' + f)
    for f in os.listdir(os.path.join(ROOT, 'content/baraja')):
        assets.add('content/baraja/' + f)
    for f in os.listdir(os.path.join(ROOT, 'esfera')):
        assets.add('esfera/' + f)
    faltan = []
    for a in sorted(assets):
        src = os.path.join(ROOT, a)
        if os.path.isfile(src):
            os.makedirs(os.path.dirname(os.path.join(OUT, a)), exist_ok=True)
            shutil.copy2(src, os.path.join(OUT, a))
        else:
            faltan.append(a)
    print('páginas:', paginas, '· recursos:', len(assets) - len(faltan), '· sin copiar:', faltan)
finally:
    php.terminate()
