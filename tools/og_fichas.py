#!/usr/bin/env python3
"""Miniaturas para compartir (og:image 1200x630, JPG) de cada ficha de proyecto y de cada caso UX/UI (v9, QA móvil H-03/H-04).
Proyecto: la portada (póster HD del vídeo de escritorio), recorte de arriba. Caso: su portada, recorte centrado.
Uso: python3 tools/og_fichas.py   ->   content/og/<slug>.jpg y content/og/caso-<slug>.jpg"""
import json, os
from PIL import Image
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.makedirs(os.path.join(R, 'content/og'), exist_ok=True)
def recorta(src, dst, arriba):
    im = Image.open(os.path.join(R, src)).convert('RGB')
    w, h = im.size; th = round(w * 630 / 1200)
    if th <= h:
        y = 0 if arriba else (h - th) // 2; im = im.crop((0, y, w, y + th))
    else:
        tw = round(h * 1200 / 630); x = (w - tw) // 2; im = im.crop((x, 0, x + tw, h))
    im.resize((1200, 630), Image.LANCZOS).save(os.path.join(R, dst), quality=84, optimize=True, progressive=True)
    print(dst)
for p in json.load(open(os.path.join(R, 'content/baraja.json')))['proyectos']:
    src = f"content/baraja/{p['slug']}_scroll-desktop-hd_poster.jpg"
    if not os.path.isfile(os.path.join(R, src)): src = f"content/baraja/{p['slug']}_scroll-desktop_poster.jpg"
    if os.path.isfile(os.path.join(R, src)): recorta(src, f"content/og/{p['slug']}.jpg", True)
for c in json.load(open(os.path.join(R, 'content/casos.json')))['casos']:
    recorta(c['portada']['src'], f"content/og/caso-{c['slug']}.jpg", False)
