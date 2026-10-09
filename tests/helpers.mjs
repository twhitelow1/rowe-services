// Shared helpers for build-output tests. No dependencies: plain fs + regex on the static HTML.
import fs from 'node:fs';
import path from 'node:path';

export const SITE = 'https://rowe-services.com';
export const ROOT = path.resolve(import.meta.dirname, '..');

export function distDir(name = process.env.DIST || 'dist') {
  const dir = path.resolve(ROOT, name);
  if (!fs.existsSync(path.join(dir, 'index.html'))) throw new Error(`${dir} has no index.html. Run "npm run build" first.`);
  return dir;
}

// Map of clean URL path -> HTML for every built page (build.format 'file').
export function loadPages(dir = distDir()) {
  const pages = new Map();
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { if (e.name !== '_astro') walk(p); continue; }
      if (!e.name.endsWith('.html')) continue;
      let url = '/' + path.relative(dir, p).replace(/\\/g, '/').replace(/\.html$/, '');
      if (url === '/index') url = '/';
      pages.set(url, fs.readFileSync(p, 'utf8'));
    }
  };
  walk(dir);
  return pages;
}

export const readText = (dir, file) => fs.readFileSync(path.join(dir, file), 'utf8');

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
export const title = (h) => decode(h.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '');
export const meta = (h, name) => decode(h.match(new RegExp(`<meta name="${name}" content="([^"]*)"`))?.[1] ?? '');
export const canonical = (h) => h.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
export const h1s = (h) => h.match(/<h1[\s>]/g) ?? [];
export const jsonLd = (h) => [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
export const hrefs = (h) => [...h.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map((m) => decode(m[1]));
export const graphTypes = (h) => jsonLd(h).flatMap((g) => g['@graph'] ?? [g]).flatMap((n) => [].concat(n['@type']));
