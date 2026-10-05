#!/usr/bin/env python3
"""Saca los textos traducibles de cada página (renderizada en local, en inglés)
y crea/actualiza lang/es/*.json sin pisar traducciones existentes.
Uso: php -S localhost:8000 (en otra terminal) && python3 tools/i18n_extract.py"""
import json, os, re, urllib.request
from html.parser import HTMLParser
from collections import OrderedDict, Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'http://localhost:8000'
TEXT_TAGS = {'p','h1','h2','h3','h4','h5','h6','li','span','a','button','figcaption','td','th','dt','dd','label','title','blockquote','strong','em','small','div'}
ATTRS = {'alt','aria-label','title','content'}
SKIP_ATTR_META = {'viewport','robots','theme-color','og:type','og:site_name','twitter:card'}
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','source','track','wbr'}

class P(HTMLParser):
    def __init__(self, src):
        super().__init__(convert_charrefs=False)
        self.src = src; self.lines = [0]
        for m in re.finditer('\n', src): self.lines.append(m.end())
        self.stack = []; self.texts = []; self.attrs = []; self.skip = 0
    def off(self): l, c = self.getpos(); return self.lines[l-1] + c
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        for k in ATTRS:
            v = a.get(k)
            if v and re.search('[A-Za-z]{2}', v) and not (tag == 'meta' and (a.get('name') in SKIP_ATTR_META or a.get('property') in SKIP_ATTR_META or a.get('http-equiv'))):
                if not (tag == 'meta' and k == 'content' and a.get('charset')):
                    self.attrs.append(v)
        if tag in VOID: return
        start = self.off() + len(self.get_starttag_text())
        self.stack.append({'tag': tag, 'start': start, 'direct': False})
        if tag in ('script', 'style', 'svg'): self.skip += 1
    def handle_endtag(self, tag):
        while self.stack:
            el = self.stack.pop()
            if el['tag'] in ('script', 'style', 'svg'): self.skip -= 1
            if el['tag'] == tag:
                inner = self.src[el['start']:self.off()]
                if el['direct'] and el['tag'] in TEXT_TAGS and not self.skip:
                    # descartar hijos ya capturados (el padre manda)
                    self.texts = [t for t in self.texts if not (t[0] >= el['start'] and t[1] <= self.off())]
                    self.texts.append((el['start'], self.off(), inner))
                break
    def handle_data(self, d):
        if self.stack and re.search('[A-Za-z]', d) and not self.skip:
            self.stack[-1]['direct'] = True
    handle_entityref = handle_charref = lambda self, n: None

def page_strings(url):
    src = urllib.request.urlopen(url).read().decode('utf-8')
    src = re.sub(r'<!--.*?-->', lambda m: ' ' * len(m.group()), src, flags=re.S)
    p = P(src); p.feed(src)
    texts = []
    for s, e, inner in sorted(p.texts):
        if '<?' in inner or not re.search('[A-Za-z]{2}', re.sub('<[^>]+>', '', inner)): continue
        texts.append(inner)
    return list(OrderedDict.fromkeys(texts)), list(OrderedDict.fromkeys(p.attrs))

pages = {'home': '/'}
for f in sorted(os.listdir(os.path.join(ROOT, 'php-pages/projects'))):
    if f.endswith('.php'): pages['projects/' + f[:-4]] = '/php-pages/projects/' + f
data = {k: page_strings(BASE + u) for k, u in pages.items()}
cnt_t = Counter(t for ts, _ in data.values() for t in ts)
cnt_a = Counter(a for _, as_ in data.values() for a in as_)
common = {'text': [t for t, c in cnt_t.items() if c > 1], 'attr': [a for a, c in cnt_a.items() if c > 1]}

def write(name, texts, attrs):
    path = os.path.join(ROOT, 'lang/es', name + '.json')
    old = json.load(open(path)) if os.path.exists(path) else {}
    out = {'text': OrderedDict((t, old.get('text', {}).get(t, '')) for t in texts),
           'attr': OrderedDict((a, old.get('attr', {}).get(a, '')) for a in attrs)}
    os.makedirs(os.path.dirname(path), exist_ok=True)
    json.dump(out, open(path, 'w'), ensure_ascii=False, indent=2); open(path, 'a').write('\n')
    return sum(len(re.sub('<[^>]+>', ' ', t).split()) for t in texts) + sum(len(a.split()) for a in attrs)

print('common', write('common', common['text'], common['attr']))
for k, (ts, as_) in data.items():
    print(k, write(k, [t for t in ts if cnt_t[t] == 1], [a for a in as_ if cnt_a[a] == 1]))
