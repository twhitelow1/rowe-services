// Tests against the static build in dist/ (preview mode: PUBLIC_SITE_INDEXABLE unset).
import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { SITE, ROOT, distDir, loadPages, readText, title, meta, canonical, h1s, jsonLd, hrefs, graphTypes } from './helpers.mjs';

let dir, pages;
before(() => { dir = distDir(); pages = loadPages(dir); });
const content = () => [...pages].filter(([u]) => u !== '/404');

describe('URLs from the old WordPress site are preserved', () => {
  const legacy = [
    '/', '/services', '/services/seamless-gutters', '/services/soffit-and-fascia', '/services/vinyl-siding',
    '/services/porches-and-enclosures', '/blogs', '/reviews', '/contact-us', '/privacy-policy', '/terms-and-conditions',
  ];
  for (const u of legacy) test(`${u} exists`, () => assert.ok(pages.has(u), `missing ${u}`));

  test('every migrated blog post has a page at /blogs/<slug>', () => {
    const slugs = fs.readdirSync(path.join(ROOT, 'src/content/blog')).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3));
    assert.ok(slugs.length >= 26, `expected >= 26 posts, found ${slugs.length}`);
    for (const s of slugs) assert.ok(pages.has(`/blogs/${s}`), `missing /blogs/${s}`);
  });
});

describe('every page has sound on-page SEO', () => {
  test('exactly one <h1>', () => { for (const [u, h] of pages) assert.equal(h1s(h).length, 1, `${u} has ${h1s(h).length} h1`); });
  test('<title> present, unique and ≤ 65 chars', () => {
    const seen = new Map();
    for (const [u, h] of content()) {
      const t = title(h);
      assert.ok(t.length > 10 && t.length <= 65, `${u} title is ${t.length} chars: "${t}"`);
      assert.ok(!seen.has(t), `${u} duplicates the title of ${seen.get(t)}`);
      seen.set(t, u);
    }
  });
  test('meta description present, unique and 70–160 chars', () => {
    const seen = new Map();
    for (const [u, h] of content()) {
      const d = meta(h, 'description');
      assert.ok(d.length >= 70 && d.length <= 160, `${u} description is ${d.length} chars`);
      assert.ok(!seen.has(d), `${u} duplicates the description of ${seen.get(d)}`);
      seen.set(d, u);
    }
  });
  test('canonical is the production URL of the page, no trailing slash', () => {
    for (const [u, h] of content()) assert.equal(canonical(h), u === '/' ? `${SITE}/` : `${SITE}${u}`, u);
  });
  test('Open Graph image and lang are set', () => {
    for (const [u, h] of pages) {
      assert.match(h, /<html lang="en-US">/, u);
      assert.match(h, new RegExp(`<meta property="og:image" content="${SITE}/og-default\\.png"`), u);
    }
  });
});

describe('structured data (JSON-LD)', () => {
  test('parses on every page and always includes the business entity', () => {
    for (const [u, h] of pages) {
      const blocks = jsonLd(h);
      assert.ok(blocks.length >= 1, `${u} has no JSON-LD`);
      const org = blocks.flatMap((g) => g['@graph']).find((n) => n['@id'] === `${SITE}/#organization`);
      assert.ok(org, `${u} missing organization node`);
      assert.equal(org.telephone, '+13527068913', u);
      assert.equal(org.address.addressLocality, 'Grand Island', u);
    }
  });
  test('inner pages have a BreadcrumbList', () => {
    for (const [u, h] of content()) if (u !== '/') assert.ok(graphTypes(h).includes('BreadcrumbList'), u);
  });
  test('service, town and blog pages carry the right schema types', () => {
    for (const [u, h] of content()) {
      const t = graphTypes(h);
      if (/^\/(services|service-areas)\/[^/]+$/.test(u)) { assert.ok(t.includes('Service'), `${u} Service`); assert.ok(t.includes('FAQPage'), `${u} FAQPage`); }
      if (/^\/blogs\/[^/]+$/.test(u)) assert.ok(t.includes('BlogPosting'), `${u} BlogPosting`);
    }
  });
  test('FAQPage questions match the FAQs rendered on the page', () => {
    for (const [u, h] of content()) {
      const faq = jsonLd(h).flatMap((g) => g['@graph']).find((n) => n['@type'] === 'FAQPage');
      if (!faq) continue;
      const rendered = (h.match(/<summary>/g) ?? []).length;
      assert.equal(faq.mainEntity.length, rendered, `${u}: schema has ${faq.mainEntity.length} questions, page shows ${rendered}`);
    }
  });
  test('no aggregateRating on our own business (Google policy)', () => {
    for (const [u, h] of pages) assert.ok(!h.includes('aggregateRating'), u);
  });
});

describe('internal links', () => {
  test('every internal link resolves to a built page or file', () => {
    const files = new Set(fs.readdirSync(path.join(dir), { recursive: true }).map((f) => '/' + String(f).replace(/\\/g, '/')));
    const broken = [];
    for (const [u, h] of pages) {
      for (let href of hrefs(h)) {
        if (!href.startsWith('/') || href.startsWith('//')) continue;
        href = href.split('#')[0].split('?')[0];
        if (!href) continue;
        if (!(pages.has(href) || files.has(href))) broken.push(`${u} -> ${href}`);
      }
    }
    assert.deepEqual(broken, []);
  });
  test('no links to .html URLs, trailing slashes or the old WordPress paths', () => {
    for (const [u, h] of pages) for (const href of hrefs(h)) {
      if (!href.startsWith('/')) continue;
      assert.ok(!/\.html(#|$)/.test(href), `${u} links to ${href}`);
      assert.ok(href === '/' || !/\/(#|$)/.test(href), `${u} links with trailing slash ${href}`);
      assert.ok(!href.startsWith('/wp-'), `${u} links to ${href}`);
    }
  });
  test('every page is linked from at least one other page', () => {
    const inbound = new Set();
    for (const [u, h] of pages) for (const href of hrefs(h)) { const t = href.split('#')[0]; if (t !== u) inbound.add(t); }
    for (const [u] of content()) if (u !== '/') assert.ok(inbound.has(u), `${u} is an orphan`);
  });
});

describe('conversion elements', () => {
  test('header phone, sticky mobile bar and skip link on every page', () => {
    for (const [u, h] of pages) {
      assert.ok(h.includes('href="tel:+13527068913"'), `${u} tel link`);
      assert.ok(h.includes('class="mbar"'), `${u} mobile bar`);
      assert.ok(h.includes('class="skip"'), `${u} skip link`);
    }
  });
  test('money pages render the quote card with id="quote"', () => {
    for (const [u, h] of content()) {
      if (u === '/' || u === '/contact-us' || u === '/free-gutter-inspection' || /^\/(services|service-areas|blogs)\/[^/]+$/.test(u)) {
        assert.ok(h.includes('class="quote-card') && h.includes('id="quote"'), `${u} quote card`);
      }
    }
  });
  test('the lead form embed is rendered verbatim when present', () => {
    const embed = readText(ROOT, 'src/data/lead-form.html').trim();
    const home = pages.get('/');
    if (embed) assert.ok(home.includes(embed), 'embed HTML not found verbatim on the homepage');
    else assert.ok(home.includes('quote-fallback'), 'call/text fallback should show while the embed is empty');
  });
});

describe('preview gating (PUBLIC_SITE_INDEXABLE unset)', () => {
  test('every page is noindex', () => { for (const [u, h] of pages) assert.equal(meta(h, 'robots'), 'noindex, nofollow', u); });
  test('robots.txt disallows everything', () => assert.equal(readText(dir, 'robots.txt').trim(), 'User-agent: *\nDisallow: /'));
  test('no analytics scripts are loaded', () => { for (const [u, h] of pages) assert.ok(!/googletagmanager|clarity\.ms/.test(h), u); });
});

describe('machine-readable files', () => {
  test('sitemap.xml lists every content page and nothing else', () => {
    const xml = readText(dir, 'sitemap.xml');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const expected = content().map(([u]) => (u === '/' ? `${SITE}/` : `${SITE}${u}`)).sort();
    assert.deepEqual([...locs].sort(), expected);
  });
  test('llms.txt names the business, NAP and links every service and town', () => {
    const t = readText(dir, 'llms.txt');
    assert.match(t, /^# Rowe Services & Maintenance/);
    assert.ok(t.includes('(352) 706-8913'));
    for (const [u] of content()) if (/^\/(services|service-areas)\/[^/]+$/.test(u)) assert.ok(t.includes(`${SITE}${u}`), u);
  });
  test('rss.xml is valid-looking and lists every post', () => {
    const x = readText(dir, 'rss.xml');
    const posts = content().filter(([u]) => /^\/blogs\/./.test(u)).length;
    assert.equal((x.match(/<item>/g) ?? []).length, posts);
  });
  test('static assets exist', () => {
    for (const f of ['favicon.svg', 'apple-touch-icon.png', 'og-default.png', 'logo.png']) assert.ok(fs.existsSync(path.join(dir, f)), f);
  });
});

describe('vercel.json', () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
  test('clean URLs, no trailing slash', () => { assert.equal(cfg.cleanUrls, true); assert.equal(cfg.trailingSlash, false); });
  test('every redirect points to a page that exists', () => {
    for (const r of cfg.redirects) {
      const dest = r.destination.replace(/:slug$/, '');
      if (dest.includes(':')) continue;
      const target = dest === '/blogs/' ? '/blogs' : dest;
      assert.ok(pages.has(target) || fs.existsSync(path.join(dir, target)), `${r.source} -> ${r.destination}`);
    }
  });
  test('no redirect shadows a real page', () => {
    for (const r of cfg.redirects) assert.ok(!pages.has(r.source), `${r.source} is both a page and a redirect`);
  });
});
