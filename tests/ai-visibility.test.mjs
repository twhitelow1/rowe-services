// AI visibility (GEO) checks: what AI answer engines (ChatGPT search, Perplexity, Google AI
// Overviews, Claude, Copilot) need to find, trust, quote and recommend the business.
// Written to be portable across DubLow sites: edit CONFIG, keep the checks.
import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { SITE, distDir, loadPages, readText, jsonLd } from './helpers.mjs';

const CONFIG = {
  orgId: `${SITE}/#organization`,
  ownerId: `${SITE}/about#justin-rowe`,
  businessName: 'Rowe Services & Maintenance',
  phone: '(352) 706-8913',
  primaryArea: 'Florida',
  // URL patterns for page types that must carry full rich content.
  money: [/^\/services\/[^/]+$/, /^\/service-areas\/[^/]+$/],
  posts: /^\/blogs\/[^/]+$/,
  hubs: ['/services', '/service-areas'],
  aiBots: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'Bingbot'],
};

let dir, pages;
before(() => { dir = distDir(); pages = loadPages(dir); });
const nodes = (h) => jsonLd(h).flatMap((g) => g['@graph'] ?? [g]);
const ofType = (h, t) => nodes(h).filter((n) => [].concat(n['@type']).includes(t));
const isMoney = (u) => CONFIG.money.some((r) => r.test(u));
const text = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ');
const main = (h) => h.match(/<main[\s\S]*<\/main>/)?.[0] ?? '';

describe('entity: one complete, consistent business entity', () => {
  test('Organization/LocalBusiness node has every field AI engines use to recommend a local business', () => {
    const org = nodes(pages.get('/')).find((n) => n['@id'] === CONFIG.orgId);
    for (const k of ['name', 'legalName', 'description', 'url', 'logo', 'image', 'telephone', 'address', 'geo', 'areaServed', 'openingHoursSpecification', 'sameAs', 'founder', 'foundingDate', 'knowsAbout', 'hasOfferCatalog', 'contactPoint', 'priceRange']) {
      assert.ok(org[k] !== undefined && org[k] !== '' && !(Array.isArray(org[k]) && !org[k].length), `organization.${k} missing`);
    }
    assert.ok([].concat(org['@type']).some((t) => /Business|Contractor|Service/.test(t)), 'needs a LocalBusiness subtype');
    assert.ok(org.description.length >= 150, 'description should be a quotable 1–3 sentence summary');
    assert.ok(org.areaServed.length >= 5, 'areaServed should list counties and cities');
  });
  test('the entity is identical on every page (one @id, same NAP)', () => {
    const ref = JSON.stringify(nodes(pages.get('/')).find((n) => n['@id'] === CONFIG.orgId));
    for (const [u, h] of pages) assert.equal(JSON.stringify(nodes(h).find((n) => n['@id'] === CONFIG.orgId)), ref, u);
  });
  test('the founder/owner is a Person entity linked from the business and the About page', () => {
    const h = pages.get('/about');
    const person = nodes(h).find((n) => n['@id'] === CONFIG.ownerId);
    assert.equal(person?.['@type'], 'Person');
    assert.equal(person.worksFor['@id'], CONFIG.orgId);
    assert.equal(ofType(h, 'AboutPage')[0]?.mainEntity?.['@id'], CONFIG.ownerId);
  });
  test('every @id reference resolves to a node on the same page', () => {
    for (const [u, h] of pages) {
      const ns = nodes(h);
      const ids = new Set(ns.map((n) => n['@id']).filter(Boolean));
      const refs = JSON.stringify(ns).match(/\{"@id":"[^"]+"\}/g) ?? [];
      for (const r of refs) {
        const id = JSON.parse(r)['@id'];
        // Cross-page references (blog -> service, blog -> blog index) are allowed if that page exists.
        const target = id.replace(SITE, '').split('#')[0] || '/';
        assert.ok(ids.has(id) || pages.has(target), `${u}: dangling @id ${id}`);
      }
    }
  });
  test('NAP in the visible footer matches the schema', () => {
    for (const [u, h] of pages) {
      const f = h.match(/<footer[\s\S]*<\/footer>/)?.[0] ?? '';
      assert.ok(f.includes(CONFIG.phone) && f.includes('Grand Island'), `${u} footer NAP`);
    }
  });
});

describe('freshness and authorship (E-E-A-T)', () => {
  test('every WebPage node has dateModified and reviewedBy', () => {
    for (const [u, h] of pages) {
      const wp = nodes(h).find((n) => String(n['@id']).endsWith('#webpage'));
      if (u === '/404') continue;
      assert.ok(wp, `${u} WebPage node`);
      assert.match(wp.dateModified, /^\d{4}-\d{2}-\d{2}$/, u);
      assert.equal(wp.reviewedBy?.['@id'], CONFIG.ownerId, u);
    }
  });
  test('money pages show a visible "Reviewed by … Updated …" line', () => {
    for (const [u, h] of pages) if (isMoney(u)) assert.match(h, /class="updated">Reviewed by [^<]+· Updated [A-Z][a-z]+ \d{1,2}, \d{4}/, u);
  });
  test('blog posts: BlogPosting with author, dates, publisher, and a visible byline', () => {
    for (const [u, h] of pages) {
      if (!CONFIG.posts.test(u)) continue;
      const a = ofType(h, 'BlogPosting')[0];
      assert.ok(a, `${u} BlogPosting`);
      assert.equal(a.author['@id'], CONFIG.ownerId, u);
      assert.equal(a.publisher['@id'], CONFIG.orgId, u);
      assert.match(a.datePublished, /^\d{4}-\d{2}-\d{2}$/, u);
      assert.ok(a.dateModified && a.headline && a.mainEntityOfPage, u);
      assert.match(h, /class="byline">[\s\S]*?<time datetime="/, `${u} visible byline + <time>`);
    }
  });
  test('blog posts are linked to the service they are about', () => {
    for (const [u, h] of pages) if (CONFIG.posts.test(u)) assert.match(ofType(h, 'BlogPosting')[0].about?.['@id'] ?? '', /\/services\/[^#]+#service$/, u);
  });
});

describe('rich, quotable content on money pages', () => {
  for (const label of ['service', 'town']) {
    test(`${label} pages: answer-first intro names the business and Florida in the first 100 words`, () => {
      for (const [u, h] of pages) {
        if (!isMoney(u) || !u.includes(label === 'service' ? '/services/' : '/service-areas/')) continue;
        const lede = text(h.match(/<p class="lede">([\s\S]*?)<\/p>/)?.[1] ?? '');
        const first100 = lede.split(' ').slice(0, 100).join(' ');
        assert.ok(first100.includes(CONFIG.businessName), `${u}: lede must name the business`);
        assert.ok(/(FL|Florida)\b/.test(first100), `${u}: lede must name the location`);
        assert.ok(lede.length >= 150 && lede.length <= 600, `${u}: lede ${lede.length} chars (quotable 2–3 sentences)`);
      }
    });
  }
  test('quick-facts strip (definition list with ≥ 4 pairs)', () => {
    for (const [u, h] of pages) if (isMoney(u)) assert.ok((h.match(/<dl class="facts">[\s\S]*?<\/dl>/)?.[0].match(/<dt>/g) ?? []).length >= 4, u);
  });
  test('FAQ section with 4+ questions mirrored in FAQPage schema', () => {
    for (const [u, h] of pages) {
      if (!isMoney(u)) continue;
      const faq = ofType(h, 'FAQPage')[0];
      assert.ok(faq && faq.mainEntity.length >= 4, `${u} FAQPage`);
      for (const q of faq.mainEntity) {
        assert.ok(main(h).includes(q.name.replace(/&/g, '&amp;').replace(/'/g, '&#39;')) || text(main(h)).includes(q.name), `${u}: "${q.name}" not visible`);
        assert.ok(q.acceptedAnswer.text.length >= 60, `${u}: answer to "${q.name}" too short to quote`);
      }
    }
  });
  test('town pages answer "who provides … in <town>" (the prompt shape AI assistants get)', () => {
    for (const [u, h] of pages) if (/^\/service-areas\/./.test(u)) assert.ok(ofType(h, 'FAQPage')[0].mainEntity.some((q) => /^Who (installs|provides)/.test(q.name)), u);
  });
  test('service pages include a data table (LLMs quote tables well)', () => {
    for (const [u, h] of pages) if (/^\/services\/./.test(u)) assert.match(main(h), /<table class="data">[\s\S]*<th scope="col">/, u);
  });
  test('money pages have Service schema with provider and areaServed', () => {
    for (const [u, h] of pages) {
      if (!isMoney(u)) continue;
      const s = ofType(h, 'Service')[0];
      assert.ok(s, `${u} Service`);
      assert.equal(s.provider['@id'], CONFIG.orgId, u);
      assert.ok(s.areaServed && s.description?.length > 100, u);
    }
  });
  test('money pages have substantial, unique body content', () => {
    const seen = new Map();
    for (const [u, h] of pages) {
      if (!isMoney(u)) continue;
      const words = text(main(h)).split(' ').length;
      assert.ok(words >= 600, `${u}: ${words} words`);
      const sig = text(main(h)).slice(400, 900);
      assert.ok(!seen.has(sig), `${u} duplicates ${seen.get(sig)}`);
      seen.set(sig, u);
    }
  });
  test('hub pages expose an ItemList of their children', () => {
    for (const u of CONFIG.hubs) assert.ok(ofType(pages.get(u), 'ItemList')[0]?.itemListElement.length >= 4, u);
  });
  test('visible breadcrumbs match BreadcrumbList schema', () => {
    for (const [u, h] of pages) {
      const bc = ofType(h, 'BreadcrumbList')[0];
      if (!bc) continue;
      const visible = (h.match(/<nav class="crumbs"[\s\S]*?<\/nav>/)?.[0].match(/<li>/g) ?? []).length;
      assert.equal(visible, bc.itemListElement.length, u);
    }
  });
});

describe('crawler access for AI engines', () => {
  test('content is in the static HTML (no client rendering needed)', () => {
    for (const [u, h] of pages) assert.ok(text(main(h)).length > 300, `${u}: main content not server-rendered`);
  });
  test('llms.txt exists, is linked from every page and covers the site', () => {
    const t = readText(dir, 'llms.txt');
    assert.ok(t.startsWith(`# ${CONFIG.businessName}`) && t.includes('\n> '), 'llmstxt.org header + summary');
    assert.ok(t.includes('## Services') && t.includes('## Service areas') && t.includes('## Blog'));
    for (const [u, h] of pages) assert.ok(h.includes('<link rel="alternate" type="text/plain" href="/llms.txt"'), u);
  });
  test('production robots.txt template welcomes the major AI crawlers', async () => {
    const src = readText(new URL('../src/pages', import.meta.url).pathname, 'robots.txt.ts');
    for (const bot of CONFIG.aiBots) assert.ok(src.includes(`'${bot}'`), bot);
  });
  test('no page blocks snippets or AI previews when indexable (max-snippet:-1)', () => {
    const src = readText(new URL('../src/layouts', import.meta.url).pathname, 'Base.astro');
    assert.ok(src.includes('max-snippet:-1') && src.includes('max-image-preview:large'));
    for (const [u, h] of pages) assert.ok(!/nosnippet|noai|noimageai/.test(h), u);
  });
  test('RSS feed is advertised for freshness discovery', () => {
    for (const [u, h] of pages) assert.ok(h.includes('type="application/rss+xml" href="/rss.xml"'), u);
  });
});
