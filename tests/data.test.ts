// Content data integrity: the data files drive every page, so errors here become broken pages.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { site } from '../src/data/site.ts';
import { services } from '../src/data/services.ts';
import { locations } from '../src/data/locations.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const unique = (xs: string[]) => new Set(xs).size === xs.length;

describe('site.ts', () => {
  test('NAP is complete and the phone formats agree', () => {
    assert.equal(site.phoneE164, '+1' + site.phone.replace(/\D/g, ''));
    assert.ok(site.address.locality && site.address.region && site.address.postalCode);
    assert.equal(site.url, 'https://rowe-services.com');
  });
  test('the 15-year warranty and 2013 founding stay consistent', () => {
    assert.equal(site.warrantyYears, 15);
    assert.equal(site.founded, 2013);
    assert.ok(site.usps.some((u) => u.title.includes('15 years')));
  });
  test('reviews are attributed and non-empty', () => {
    assert.ok(site.reviews.length >= 1);
    for (const r of site.reviews) assert.ok(r.quote.length > 10 && r.author.length > 1);
  });
  test('lastReviewed is an ISO date', () => assert.match(site.lastReviewed, /^\d{4}-\d{2}-\d{2}$/));
});

describe('services.ts', () => {
  test('the four original service slugs are kept', () => {
    assert.deepEqual(services.map((s) => s.slug).sort(), ['porches-and-enclosures', 'seamless-gutters', 'soffit-and-fascia', 'vinyl-siding']);
  });
  for (const s of services) {
    test(`${s.slug}: SEO fields and sections are complete`, () => {
      assert.ok(s.title.length <= 65, `title ${s.title.length}`);
      assert.ok(s.description.length >= 120 && s.description.length <= 160, `description ${s.description.length}`);
      assert.equal(s.facts.length, 4);
      assert.equal(s.process.length, 4);
      assert.ok(s.faqs.length >= 4 && s.faqs.length <= 8, `faqs ${s.faqs.length}`);
      assert.ok(unique(s.faqs.map((f) => f.q)), 'duplicate FAQ');
      assert.ok(s.offerings.length >= 3 && s.pricing.length >= 3 && s.signs.length >= 3);
    });
    test(`${s.slug}: no invented prices`, () => {
      const text = JSON.stringify(s);
      assert.ok(!/\$\s?\d/.test(text), 'service copy must not state dollar prices');
    });
  }
});

describe('locations.ts', () => {
  const slugs = locations.map((l) => l.slug);
  test('slugs are unique and follow <town>-fl', () => {
    assert.ok(unique(slugs));
    for (const s of slugs) assert.match(s, /^[a-z-]+-fl$/);
  });
  for (const l of locations) {
    test(`${l.slug}: valid references and local content`, () => {
      for (const n of l.nearby) { assert.ok(slugs.includes(n), `nearby ${n} missing`); assert.notEqual(n, l.slug); }
      assert.deepEqual([...l.services].sort(), services.map((s) => s.slug).sort(), 'services must list each service once');
      for (const z of l.zips) assert.match(z, /^3\d{4}$/);
      assert.ok(l.local.join(' ').length > 300, 'local copy too thin');
      assert.ok(l.title.length <= 65 && l.description.length <= 160);
      assert.ok(l.faqs.length >= 4 && l.faqs.length <= 7, `faqs ${l.faqs.length}`);
      assert.ok(Math.abs(l.geo.lat - 28.9) < 0.5 && Math.abs(l.geo.lng + 81.85) < 0.5, 'geo outside Central Florida');
    });
  }
  test('town pages are not token-swapped copies of each other', () => {
    const intros = locations.map((l) => l.local[0].replaceAll(l.town, 'TOWN'));
    assert.ok(unique(intros));
  });
});

describe('blog posts', () => {
  const dir = path.join(ROOT, 'src/content/blog');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const fm = (f: string) => fs.readFileSync(path.join(dir, f), 'utf8').match(/^---\n([\s\S]*?)\n---/)![1];
  const field = (src: string, k: string) => src.match(new RegExp(`^${k}: "?(.*?)"?$`, 'm'))?.[1];
  test('every post has a title, description, date and service', () => {
    for (const f of files) {
      const src = fm(f);
      assert.ok(field(src, 'title'), `${f} title`);
      const d = field(src, 'description')!;
      assert.ok(d && d.length >= 120 && d.length <= 160, `${f} description ${d?.length}`);
      assert.match(field(src, 'pubDate')!, /^\d{4}-\d{2}-\d{2}$/, f);
      assert.ok(services.some((s) => s.slug === field(src, 'service')), `${f} service`);
    }
  });
  test('<title> fits in 65 chars (seoTitle when the headline is long)', () => {
    for (const f of files) {
      const src = fm(f);
      const t = field(src, 'seoTitle') ?? field(src, 'title')!;
      const rendered = field(src, 'seoTitle') ? t : t.length > 48 ? t : `${t} | Rowe Services`;
      assert.ok(rendered.length <= 65, `${f}: ${rendered.length} chars`);
    }
  });
  test('town names in frontmatter match a town page', () => {
    for (const f of files) { const t = field(fm(f), 'town'); if (t) assert.ok(locations.some((l) => l.town === t), `${f}: ${t}`); }
  });
  test('no links to the old WordPress host', () => {
    for (const f of files) assert.ok(!/rowe-services\.com\/(blogs|services|wp-)/.test(fs.readFileSync(path.join(dir, f), 'utf8')), f);
  });
});
