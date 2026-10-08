// Regenerates favicon.svg, apple-touch-icon.png, logo.png and og-default.png from src/data/logo.ts.
// Usage: node tools/gen-icons.mjs   (needs @playwright/test's chromium; set PW_CHROMIUM to override the binary)
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { mark, wordTop, wordSub } from '../src/data/logo.ts';

const pub = path.resolve(import.meta.dirname, '../public');
const NAVY = '#0f2a43', COPPER = '#c8702a';
const markSvg = (color) => `<path d="${mark.ring}" fill="none" stroke="${color}" stroke-width="${mark.ringWidth}"/><path d="${mark.r}" fill="${color}"/>`;
const stacked = (color) => {
  const s1 = 915 / wordTop.width, s2 = 885 / wordSub.width;
  return `${markSvg(color)}<path transform="translate(${(1024 - 915) / 2} 785) scale(${s1.toFixed(4)})" d="${wordTop.d}" fill="${color}"/><path transform="translate(${(1024 - 885) / 2} 873) scale(${s2.toFixed(4)})" d="${wordSub.d}" fill="${color}"/>`;
};

// Favicon: the R mark on a white rounded tile so it reads on light and dark browser tabs.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="199 64 612 612"><rect x="199" y="64" width="612" height="612" rx="120" fill="#fff"/>${markSvg(NAVY)}</svg>`;
fs.writeFileSync(path.join(pub, 'favicon.svg'), favicon + '\n');

const pages = {
  'apple-touch-icon.png': [180, 180, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="179 44 652 652" width="180" height="180"><rect x="179" y="44" width="652" height="652" fill="#fff"/>${markSvg(NAVY)}</svg>`],
  'favicon-48.png': [48, 48, favicon.replace('<svg ', '<svg width="48" height="48" ')],
  'logo.png': [512, 512, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="512" height="512"><rect width="1024" height="1024" fill="#fff"/>${stacked('#000')}</svg>`],
  'og-default.png': [1200, 630, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${NAVY}"/><stop offset="1" stop-color="#0a1e31"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect x="60" y="105" width="420" height="420" rx="36" fill="#fff"/>
    <g transform="translate(94 139) scale(0.66) translate(-239 -104)">${markSvg(NAVY)}</g>
    <path transform="translate(540 250) scale(0.68)" d="${wordTop.d}" fill="#fff"/>
    <path transform="translate(542 318) scale(0.405)" d="${wordSub.d}" fill="${COPPER}"/>
    <text x="540" y="420" font-family="Arial, sans-serif" font-size="27" fill="#d5e1ec">Owner-operated since 2013 · 15-year warranty</text>
    <text x="540" y="465" font-family="Arial, sans-serif" font-size="27" fill="#d5e1ec">The Villages &amp; Central Florida · (352) 706-8913</text>
  </svg>`],
};

const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
for (const [file, [w, h, svg]] of Object.entries(pages)) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
  await page.screenshot({ path: path.join(pub, file), omitBackground: false });
  await page.close();
  console.log('wrote', file);
}
await browser.close();
