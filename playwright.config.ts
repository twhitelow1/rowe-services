import { defineConfig, devices } from '@playwright/test';

// Browser smoke tests against the production build served by `astro preview`.
// Locally, point PW_CHROMIUM at a Chromium binary to skip `playwright install`.
const launchOptions = process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {};

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: { baseURL: 'http://localhost:4329', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 }, launchOptions } },
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 }, launchOptions } },
  ],
  webServer: { command: 'npx astro preview --port 4329 --ignore-lock', url: 'http://localhost:4329', reuseExistingServer: !process.env.CI, timeout: 60_000 },
});
