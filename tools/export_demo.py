#!/usr/bin/env python3
"""Exporta la web servida en local a HTML estático para la demo privada
(artefacto «alexdasi.com Preview»). EN y ES: site/home.html, site/home-es.html,
site/projects/<slug>.html y <slug>-es.html. Copia solo los recursos usados.
Uso: php -S localhost:8000 && python3 tools/export_demo.py <carpeta_salida>"""
import os, re, sys, shutil, urllib.request, urllib.parse
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1]; SITE = os.path.join(OUT, 'site'); BASE = 'http://localhost:8000'
slugs = sorted(f[:-4] for f in os.listdir(os.path.join(ROOT, 'php-pages/projects')) if f.endswith('.php'))
assets = set()
DEMO_JS = """<script>
/* Demo: el visor no deja navegar; cada enlace interno pide a la página contenedora que cargue la siguiente. */
document.addEventListener('click', function(e){
  var a = e.target.closest && e.target.closest('a'); if (!a) return;
  var href = a.getAttribute('href'); if (!href) return;
  if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) return;
  if (!/\\.html(\\?|#|$)/.test(href)) return;
  e.preventDefault(); e.stopPropagation();
  parent.postMessage({demoGo: new URL(href, document.baseURI).href}, '*');
}, true);
</script>
</head>"""

def page_name(slug, es): return slug + ('-es' if es else '') + '.html'

def convert(html, in_projects):
    up = '../' if in_projects else ''
    html = re.sub(r'<script async src="https://www.googletagmanager[^>]*></script>', '', html)
    html = html.replace('https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js', '/js/jquery-2.1.1.min.js')
    html = re.sub(r'<link rel="alternate" hreflang[^>]*>\s*', '', html)
    def href(m):
        attr, url = m.group(1), m.group(2)
        if re.match(r'^(https?:|mailto:|tel:|#|//)', url) or url == '': return m.group(0)
        p = urllib.parse.urlparse(url.replace('&amp;', '&'))
        es = 'lang=es' in (p.query or '')
        path = p.path; frag = ('#' + p.fragment) if p.fragment else ''
        base = os.path.basename(path)
        if path in ('/', '') or base == 'index.php':
            return f'{attr}="{up}{page_name("home", es)}{frag}"'
        if base.endswith('.php') and base[:-4] in slugs:
            return f'{attr}="{"" if in_projects else "projects/"}{page_name(base[:-4], es)}{frag}"'
        # recurso: normalizar a ruta desde la raíz
        if path.startswith('/'): rel = path[1:]
        else: rel = os.path.normpath(os.path.join('php-pages/projects' if in_projects else '', path)).replace('\\', '/')
        rel = re.sub(r'^(\.\./)+', '', rel)
        assets.add(urllib.parse.unquote(rel))
        q = ('?' + p.query) if p.query and not es else ''
        return f'{attr}="{up}{rel}{q}{frag}"'
    html = re.sub(r'\b(href|src)="([^"]*)"', href, html)
    return html.replace('</head>', DEMO_JS, 1)

os.makedirs(os.path.join(SITE, 'projects'), exist_ok=True)
for es in (False, True):
    q = '?lang=es' if es else ''
    h = urllib.request.urlopen(BASE + '/' + q).read().decode()
    open(os.path.join(SITE, page_name('home', es)), 'w').write(convert(h, False))
    for s in slugs:
        h = urllib.request.urlopen(f'{BASE}/php-pages/projects/{s}.php{q}').read().decode()
        open(os.path.join(SITE, 'projects', page_name(s, es)), 'w').write(convert(h, True))
# JS cargado dinámicamente desde js.php (fluid, controles…)
for f in os.listdir(os.path.join(ROOT, 'js')):
    if f.endswith('.js'): assets.add('js/' + f)
missing = []
for a in sorted(assets):
    src = os.path.join(ROOT, a)
    if os.path.isfile(src):
        os.makedirs(os.path.dirname(os.path.join(SITE, a)), exist_ok=True); shutil.copy2(src, os.path.join(SITE, a))
    else: missing.append(a)
print('páginas:', 2 * (len(slugs) + 1), '· recursos:', len(assets) - len(missing), '· sin copiar:', missing)
