#!/usr/bin/env python3
"""Comprueba la versión ES: traducciones que no se aplican (la clave ya no coincide
con el HTML), enlaces internos sin ?lang=es y em dash en castellano.
Uso: php -S localhost:8000 && python3 tools/i18n_check.py"""
import json, os, re, urllib.request
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'http://localhost:8000'
pages = {'home': '/'}
for f in sorted(os.listdir(os.path.join(ROOT, 'php-pages/projects'))):
    if f.endswith('.php'): pages['projects/' + f[:-4]] = '/php-pages/projects/' + f
common = json.load(open(os.path.join(ROOT, 'lang/es/common.json')))
problems = 0
for name, url in pages.items():
    sep = '&' if '?' in url else '?'
    en = urllib.request.urlopen(BASE + url).read().decode()
    es = urllib.request.urlopen(BASE + url + sep + 'lang=es').read().decode()
    d = json.load(open(os.path.join(ROOT, 'lang/es', name + '.json')))
    issues = []
    for src in (d, common):
        for k, v in src['text'].items():
            if v and ('>' + k + '</') in en and ('>' + k + '</') in es:
                issues.append('sin aplicar: ' + k[:70])
        for k, v in src['text'].items():
            if v and ('>' + k + '</') not in en and src is d:
                issues.append('clave huérfana (el inglés cambió): ' + k[:70])
    if '<html lang="es">' not in es: issues.append('html lang no es "es"')
    for m in re.findall(r'(?<!data-i18n-keep )href="([^"]+\.php[^"]*)"', es):
        if not m.startswith('http') and 'lang=es' not in m: issues.append('enlace sin lang=es: ' + m)
    if '—' in es: issues.append('hay em dash (—)')
    problems += len(issues)
    print(('OK  ' if not issues else 'MAL ') + name)
    for i in issues: print('     ', i)
print('\nProblemas:', problems)
