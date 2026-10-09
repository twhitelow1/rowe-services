"""Bundle dist/ into ONE clickable HTML file (all pages, hash routing) for previews.
Usage: npm run build && python3 tools/preview_bundle.py dist out.html"""
import re, base64, json, glob, html, sys
d = sys.argv[1] if len(sys.argv) > 1 else 'dist'
out = sys.argv[2] if len(sys.argv) > 2 else 'preview.html'
def b64(p, mt): return f'data:{mt};base64,' + base64.b64encode(open(p, 'rb').read()).decode()
pages, css = {}, set()
for p in glob.glob(d + '/**/*.html', recursive=True):
    rel = p[len(d):-5]; rel = '/' if rel == '/index' else rel
    s = open(p).read()
    css.update(re.findall(r'<link rel="stylesheet" href="([^"]+)"', s))
    body = re.search(r'<body[^>]*>(.*)</body>', s, re.S).group(1)
    body = re.sub(r'srcset="[^"]*"', '', body)
    body = re.sub(r'(?<=src=")(/_astro/[^"]+)', lambda m: b64(d + m.group(1), 'image/webp' if m.group(1).endswith('webp') else 'image/png'), body)
    pages[rel] = {'t': html.unescape(re.search(r'<title>(.*?)</title>', s, re.S).group(1)), 'b': body}
style = ''.join(re.sub(r'@font-face\{[^}]*\}', '', open(d + c).read()) for c in sorted(css))
router = r"""(function(){var P=JSON.parse(document.getElementById('pages').textContent);
function norm(h){return h.split('#')[0].replace(/\.html$/,'').replace(/\/$/,'')||'/';}
function render(path,anchor,push){var pg=P[path]||P['/404'];if(!pg)return;document.body.innerHTML=pg.b;document.title=pg.t;
document.body.querySelectorAll('script').forEach(function(o){var n=document.createElement('script');n.textContent=o.textContent;o.replaceWith(n);});
if(push)history.pushState({},'','#!'+path+(anchor?'#'+anchor:''));var el=anchor&&document.getElementById(anchor);if(el)el.scrollIntoView();else window.scrollTo(0,0);}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href');
if(h.charAt(0)!=='/'||h.indexOf('/_astro')===0)return;e.preventDefault();var x=h.split('#');render(norm(x[0]),x[1],true);});
function start(){var m=location.hash.match(/^#!([^#]*)(?:#(.*))?/);if(m)render(norm(m[1]),m[2],false);}
window.addEventListener('popstate',start);document.addEventListener('DOMContentLoaded',start);})();"""
font = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400..800&display=swap" rel="stylesheet">'
doc = f"""<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="robots" content="noindex"><title>{html.escape(pages['/']['t'])}</title>{font}
<link rel="icon" href="{b64(d + '/favicon.svg', 'image/svg+xml')}"><style>:root{{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}.site-header{{top:env(safe-area-inset-top,0px)}}</style>
<style>{style}</style><script type="application/json" id="pages">{json.dumps(pages).replace('</', '<' + chr(92) + '/')}</script><script>{router}</script></head><body>{pages['/']['b']}</body></html>"""
open(out, 'w').write(doc); print(len(pages), 'pages,', len(doc) // 1024, 'KB ->', out)
