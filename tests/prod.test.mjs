// Tests against the production build (PUBLIC_SITE_INDEXABLE=true) in dist-prod/.
// Run with: npm run test:prod (builds dist-prod first).
import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { distDir, loadPages, readText, meta } from './helpers.mjs';

let dir, pages;
before(() => { dir = distDir('dist-prod'); pages = loadPages(dir); });

describe('production indexing', () => {
  test('content pages are indexable', () => {
    for (const [u, h] of pages) if (u !== '/404') assert.match(meta(h, 'robots'), /^index, follow/, u);
  });
  test('404 stays noindex', () => assert.equal(meta(pages.get('/404'), 'robots'), 'noindex, nofollow'));
  test('robots.txt allows crawling, welcomes AI crawlers and points to the sitemap', () => {
    const r = readText(dir, 'robots.txt');
    assert.ok(!/^Disallow: \/$/m.test(r), 'must not disallow everything');
    for (const bot of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Bingbot']) assert.ok(r.includes(`User-agent: ${bot}`), bot);
    assert.ok(r.includes('Sitemap: https://rowe-services.com/sitemap.xml'));
  });
});
