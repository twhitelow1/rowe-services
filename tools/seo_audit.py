#!/usr/bin/env python3
"""SEO / GEO build audit for a static site (Astro build.format 'file' or 'directory').

Usage: python3 seo_audit.py dist [--site https://example.com] [--min-words 300]
Checks: title/description length + uniqueness, exactly one H1, canonical present,
JSON-LD parses, broken internal links, unreachable pages, click depth, in-content
inbound links, thin pages. Exit code 1 if any issue is found.
"""
import argparse, collections, glob, html, json, os, re, sys

ap = argparse.ArgumentParser()
ap.add_argument('dist'); ap.add_argument('--site', default='')
ap.add_argument('--min-words', type=int, default=300)
ap.add_argument('--title-max', type=int, default=65); ap.add_argument('--desc-max', type=int, default=165)
a = ap.parse_args()
root = os.path.abspath(a.dist)

def url_of(p):
    rel = p[len(root):].replace(os.sep, '/')
    rel = re.sub(r'/index\.html$', '', rel); rel = re.sub(r'\.html$', '', rel)
    return rel or '/'

pages = {}
for p in glob.glob(root + '/**/*.html', recursive=True):
    u = url_of(p)
    if u in ('/404',): continue
    pages[u] = open(p, encoding='utf-8').read()

def links(h):
    out = []
    for href in re.findall(r'href="(/[^"]*)"', h):
        path = href.split('#')[0].split('?')[0]
        if path.startswith('/_astro') or '.' in path.rsplit('/', 1)[-1]: continue
        out.append(path.rstrip('/') or '/')
    return out

issues, rows = [], []
titles, descs = collections.defaultdict(list), collections.defaultdict(list)
inb = collections.defaultdict(set)
for u, h in pages.items():
    t = html.unescape((re.search(r'<title>(.*?)</title>', h, re.S) or [None, ''])[1]).strip()
    d = re.search(r'<meta name="description" content="(.*?)"', h)
    d = html.unescape(d.group(1)) if d else ''
    titles[t].append(u); descs[d].append(u)
    if not t: issues.append(f'{u}: missing <title>')
    elif len(t) > a.title_max: issues.append(f'{u}: title {len(t)} chars (>{a.title_max})')
    if not d: issues.append(f'{u}: missing meta description')
    elif len(d) > a.desc_max: issues.append(f'{u}: description {len(d)} chars (>{a.desc_max})')
    h1 = re.findall(r'<h1[\s>]', h)
    if len(h1) != 1: issues.append(f'{u}: {len(h1)} <h1> tags')
    if 'rel="canonical"' not in h: issues.append(f'{u}: no canonical')
    for blk in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        try: json.loads(blk)
        except Exception as e: issues.append(f'{u}: invalid JSON-LD ({e})')
    m = re.search(r'<main.*?</main>', h, re.S)
    main = m.group(0) if m else h
    words = len(re.sub(r'<[^>]+>', ' ', re.sub(r'<script.*?</script>', ' ', main, flags=re.S)).split())
    for l in set(links(main)) - {u}: inb[l].add(u)
    for l in set(links(h)):
        if l not in pages: issues.append(f'{u}: broken link {l}')
    rows.append((u, len(t), len(d), words))
for t, us in titles.items():
    if t and len(us) > 1: issues.append(f'duplicate title on {", ".join(us)}')
for d, us in descs.items():
    if d and len(us) > 1: issues.append(f'duplicate description on {", ".join(us)}')

depth = {'/': 0}; q = ['/']
while q:
    u = q.pop(0)
    for l in set(links(pages.get(u, ''))):
        if l in pages and l not in depth: depth[l] = depth[u] + 1; q.append(l)
for u in pages:
    if u not in depth: issues.append(f'{u}: unreachable from homepage')
    elif depth[u] > 3: issues.append(f'{u}: click depth {depth[u]} (>3)')

utility = re.compile(r'/(privacy|terms|thank|404|contact|case-studies|reviews)')
print(f'# SEO audit — {len(pages)} pages\n')
print('| URL | Title | Desc | Words | In-content inbound | Depth |\n|---|---|---|---|---|---|')
for u, tl, dl, w in sorted(rows):
    flag = ' ⚠️' if (w < a.min_words and not utility.search(u) and u != '/') else ''
    print(f'| {u} | {tl} | {dl} | {w}{flag} | {len(inb[u])} | {depth.get(u, "—")} |')
thin = [u for u, _, _, w in rows if w < a.min_words and not utility.search(u) and u != '/']
print(f'\nThin pages (<{a.min_words} words, warning only): {len(thin)}')
print(f'\n## Issues: {len(set(issues))}')
for i in sorted(set(issues)): print('- ' + i)
sys.exit(1 if issues else 0)
