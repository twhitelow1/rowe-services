import { test, expect, type Page } from '@playwright/test';

const KEY_PAGES = ['/', '/services/seamless-gutters', '/service-areas/the-villages-fl', '/blogs/gutter-slope-florida-downpours', '/contact-us', '/about', '/free-gutter-inspection'];

async function noConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  return errors;
}

for (const path of KEY_PAGES) {
  test(`${path} renders cleanly`, async ({ page }) => {
    const errors = await noConsoleErrors(page);
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('header .brand svg.logo')).toBeVisible();
    // Nothing may overflow sideways (the classic mobile layout bug).
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(0);
    // Every image has alt text; every link/button has an accessible name.
    expect(await page.locator('img:not([alt])').count()).toBe(0);
    const unnamed = await page.$$eval('a, button, summary', (els) => els.filter((e) => !(e.textContent?.trim() || e.getAttribute('aria-label'))).map((e) => e.outerHTML.slice(0, 80)));
    expect(unnamed).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('quote card is visible without scrolling on desktop, reachable on mobile', async ({ page, isMobile }) => {
  await page.goto('/');
  const card = page.locator('#quote');
  if (isMobile) {
    await page.getByRole('link', { name: 'Free quote' }).last().click();
    await expect(card).toBeInViewport();
  } else {
    await expect(card).toBeInViewport();
  }
});

test('phone CTA uses the business number everywhere', async ({ page }) => {
  await page.goto('/');
  const tels = await page.$$eval('a[href^="tel:"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
  expect(tels).toEqual(['tel:+13527068913']);
});

test('mobile: sticky call/quote bar shows and the menu navigates', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only');
  await page.goto('/');
  await expect(page.locator('nav.mbar')).toBeVisible();
  await page.locator('.mobile-nav summary').click();
  await page.locator('.mnav-panel').getByRole('link', { name: 'Seamless Gutters' }).click();
  await expect(page).toHaveURL(/\/services\/seamless-gutters$/);
  await expect(page.locator('h1')).toContainText('Seamless Gutter');
});

test('desktop: services dropdown lists every service', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop only');
  await page.goto('/');
  await page.locator('.nav .dd').first().hover();
  const panel = page.locator('.nav .dd-panel').first();
  await expect(panel).toBeVisible();
  for (const name of ['Seamless Gutters', 'Soffit & Fascia', 'Vinyl Siding', 'Screen Porches & Enclosures']) await expect(panel.getByRole('link', { name })).toBeVisible();
});

test('FAQ accordions open and close', async ({ page }) => {
  await page.goto('/services/seamless-gutters');
  const second = page.locator('.faq details').nth(1);
  await expect(second).not.toHaveAttribute('open', '');
  await second.locator('summary').click();
  await expect(second).toHaveAttribute('open', '');
});

test('favicons and social image are served', async ({ request }) => {
  for (const p of ['/favicon.svg', '/favicon-48.png', '/apple-touch-icon.png', '/og-default.png', '/logo.png', '/llms.txt', '/robots.txt', '/sitemap.xml', '/rss.xml']) {
    const r = await request.get(p);
    expect(r.status(), p).toBe(200);
  }
});

test('unknown URLs get the 404 page with a way back', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('link', { name: 'Go to the homepage' })).toBeVisible();
});
