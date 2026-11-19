#!/usr/bin/env python3
"""Saca el contenido REAL de los casos UX/UI de las páginas antiguas (php-pages/projects/<slug>.php, EN + diccionario ES)
y lo deja en content/casos.json para la plantilla nueva (caso.php). No inventa nada: solo mueve lo que ya está publicado.
Uso: python3 tools/extrae_casos.py http://127.0.0.1:8000     (con `php -S` abierto en la raíz del repo)"""
import sys, os, json, re, urllib.request
from bs4 import BeautifulSoup
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = sys.argv[1].rstrip('/')
CASOS = [('tulong', '2025-2026'), ('idrica-wastewater', '2022-2024'), ('atelier', '2026'), ('clustag', ''), ('knowadays', '2021-2025')]  # orden y años de la lista UX/UI (php-pages/sobre-mi.php)

def interior(el):
    h = el.decode_contents().strip()
    return re.sub(r'\s+', ' ', h)
def parrafos(el):
    ps = el.find_all('p')
    return [interior(p) for p in ps] if ps else [interior(el)]
def ruta(src):
    return re.sub(r'^(\.\./)+', '', src)
def lee(slug, lang):
    html = urllib.request.urlopen(f'{BASE}/php-pages/projects/{slug}.php' + ('?lang=en' if lang == 'en' else '')).read().decode()
    s = BeautifulSoup(html, 'html.parser')
    d = {'nombre': s.select_one('h1').get_text(strip=True), 'subtitulo': interior(s.select_one('.slice-infos__title')),
         'intro': parrafos(s.select_one('.slice-infos__text')), 'columnas': [], 'resumen': {}, 'bloques': []}
    pi = s.select_one('.project-header__image img')
    d['portada'] = {'src': ruta(pi['src']), 'alt': pi.get('alt', '')}
    for li in s.select('.slice-infos__columns .info-column'):
        t = li.select_one('.info-column__title').get_text(strip=True)
        tx = li.select_one('.info-column__text')
        lineas = [x.strip() for x in re.split(r'<br\s*/?>|</p>\s*<p>|</li>\s*<li>', re.sub(r'^\s*<(p|ul)>\s*(<li>)?|(</li>)?\s*</(p|ul)>\s*$', '', interior(tx))) if x.strip()]
        d['columnas'].append({'t': t, 'd': [re.sub(r'<[^>]+>', '', x).strip() for x in lineas]})
    for it in s.select('.case-summary__item'):
        d['resumen'][len(d['resumen'])] = {'t': it.select_one('.case-summary__label').get_text(strip=True), 'd': interior(it.select_one('.case-summary__text'))}
    cont = s.select_one('.project-content')
    for el in cont.find_all(True):
        c = el.get('class') or []
        if el.name == 'img' and 'project-content__image' in c:
            d['bloques'].append({'tipo': 'img', 'src': ruta(el['src']), 'alt': el.get('alt', '')})
        elif 'project-content__quote' in c:
            d['bloques'].append({'tipo': 'cita', 'txt': interior(el)})
        elif 'project-content__text' in c:
            d['bloques'].append({'tipo': 'texto', 'p': parrafos(el)})
        elif 'concept-card' in c:
            im = el.select_one('img')
            d['bloques'].append({'tipo': 'concepto', 'src': ruta(im['src']), 'alt': im.get('alt', ''), 'nombre': el.select_one('.concept-card__name').get_text(strip=True), 'linea': el.select_one('.concept-card__line').get_text(strip=True), 'href': el.get('href', '')})
        elif el.name in ('video', 'iframe'):
            print('  ! medio no previsto', slug, el.name, file=sys.stderr)
    return d

out = {'_que': 'Casos UX/UI de la plantilla nueva (caso.php?c=<slug>). Contenido sacado tal cual de php-pages/projects/<slug>.php (EN) y lang/es/projects/<slug>.json (ES) con tools/extrae_casos.py; no se edita a mano sin tocar también la fuente. Feedback 150, ATELIER conv. 1330.', 'casos': []}
for slug, anios in CASOS:
    en, es = lee(slug, 'en'), lee(slug, 'es')
    assert len(en['bloques']) == len(es['bloques']), slug
    c = {'slug': slug, 'nombre': en['nombre'], 'anios': anios,
         'subtitulo': {'es': es['subtitulo'], 'en': en['subtitulo']},
         'intro': {'es': es['intro'], 'en': en['intro']},
         'columnas': [{'t': {'es': a['t'], 'en': b['t']}, 'd': {'es': a['d'], 'en': b['d']}} for a, b in zip(es['columnas'], en['columnas'])],
         'resumen': [{'t': {'es': es['resumen'][k]['t'], 'en': en['resumen'][k]['t']}, 'd': {'es': es['resumen'][k]['d'], 'en': en['resumen'][k]['d']}} for k in en['resumen']],
         'bloques': []}
    def medida(src):
        f = os.path.join(ROOT, urllib.request.unquote(src))
        try:
            w, h = Image.open(f).size; return {'w': w, 'h': h, 'kb': round(os.path.getsize(f) / 1024)}
        except Exception as e:
            print('  ! sin medir', src, e, file=sys.stderr); return {}
    c['portada'] = {'src': en['portada']['src'], 'alt': {'es': es['portada']['alt'], 'en': en['portada']['alt']}, **medida(en['portada']['src'])}
    for a, b in zip(es['bloques'], en['bloques']):
        assert a['tipo'] == b['tipo']
        if b['tipo'] == 'img': c['bloques'].append({'tipo': 'img', 'src': b['src'], 'alt': {'es': a['alt'], 'en': b['alt']}, **medida(b['src'])})
        elif b['tipo'] == 'cita': c['bloques'].append({'tipo': 'cita', 'txt': {'es': a['txt'], 'en': b['txt']}})
        elif b['tipo'] == 'texto': c['bloques'].append({'tipo': 'texto', 'p': {'es': a['p'], 'en': b['p']}})
        elif b['tipo'] == 'concepto': c['bloques'].append({'tipo': 'concepto', 'src': b['src'], 'alt': {'es': a['alt'], 'en': b['alt']}, 'nombre': b['nombre'], 'linea': {'es': a['linea'], 'en': b['linea']}, 'href': b['href'], **medida(b['src'])})
    out['casos'].append(c)
    print(slug, len(c['bloques']), 'bloques ·', sum(1 for x in c['bloques'] if x['tipo'] == 'img'), 'img ·', len(c['resumen']), 'resumen ·', [x['t']['es'] for x in c['columnas']])
# Variantes ligeras en content/casos/: webp a 1800 y 900 px; los gif pasan a mp4 + póster (mismo contenido, menos peso)
import subprocess
def variantes(src, base):
    f = os.path.join(ROOT, urllib.request.unquote(src)); dst = os.path.join(ROOT, 'content/casos'); os.makedirs(dst, exist_ok=True)
    if f.lower().endswith('.gif'):
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f, '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=20,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-movflags', '+faststart', '-an', f'{dst}/{base}.mp4'], check=True)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '80', f'{dst}/{base}_poster.webp'], check=True)
        return {'video': f'content/casos/{base}.mp4', 'poster': f'content/casos/{base}_poster.webp'}
    w, _ = Image.open(f).size; r = {}
    for k, a in (('grande', 1800), ('chica', 900)):
        aw = min(a, w)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f, '-vf', f'scale={aw}:-2:flags=lanczos', '-c:v', 'libwebp', '-quality', '82', '-frames:v', '1', f'{dst}/{base}-{aw}.webp'], check=True)
        r[k] = f'content/casos/{base}-{aw}.webp'; r['w' + k[0]] = aw
    return r
for c in out['casos']:
    c['portada'].update(variantes(c['portada']['src'], c['slug'] + '_portada'))
    n = 0
    for b in c['bloques']:
        if b['tipo'] in ('img', 'concepto'):
            n += 1; b.update(variantes(b['src'], f"{c['slug']}_{n:02d}"))
json.dump(out, open(os.path.join(ROOT, 'content/casos.json'), 'w'), ensure_ascii=False, indent=2)
