import { chromium } from '../.cache/cta-check/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const origin = process.env.QA_URL || 'http://127.0.0.1:5180';
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const routes = [...new Set([
  '/',
  ...config.rewrites.map(({ source }) => source).filter((path) => path.startsWith('/') && !path.includes(':') && !path.includes('*') && !path.includes('?')),
])];
const routeSet = new Set(routes);
const routeFiles = new Map(config.rewrites.map(({ source, destination }) => [source, `dist${destination}`]));
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
await context.route('**/rest/v1/patient_reviews*', (route) => route.fulfill({ contentType: 'application/json', body: '[]' }));
await context.route('**/*', async (route) => {
  const request = route.request();
  const url = new URL(request.url());
  if (!request.isNavigationRequest() || url.origin !== origin) return route.fallback();
  const file = routeFiles.get(url.pathname) ?? 'dist/404.html';
  await route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: await readFile(file, 'utf8') });
});
const page = await context.newPage();
const failures = [];
const titles = new Set();
const descriptions = new Set();
const pages = new Map();
const internalLinks = [];
let currentPath = '';
page.on('pageerror', (error) => failures.push(`${currentPath}: ${error.message}`));
page.on('console', (message) => { if (message.type() === 'error' && /hydration|Minified React error #/.test(message.text())) failures.push(`${currentPath}: ${message.text()}`); });
page.on('requestfailed', (request) => {
  if (new URL(request.url()).origin === origin && !/\.mp4(?:$|\?)/i.test(request.url())) failures.push(`${currentPath}: Request failed: ${request.url()}`);
});

try {
  for (const path of routes) {
    currentPath = path;
    const response = await page.goto(origin + path, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, path);
    assert.equal(await page.locator('main').count(), 1, path);
    assert.equal(await page.locator('h1').count(), 1, path);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    assert.ok(title && !titles.has(title), `unique title: ${path}`);
    assert.ok(description && description.length > 40 && !descriptions.has(description), `unique description: ${path}`);
    titles.add(title); descriptions.add(description);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), path === '/patient-story' ? 'noindex, follow' : 'index, follow');
    if (path !== '/patient-story') {
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://www.osecng.com${path}`);
      assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'), `https://www.osecng.com${path}`);
    }
    const data = await page.locator('script[type="application/ld+json"]').allTextContents();
    assert.equal(data.length, path === '/patient-story' ? 0 : 1, `JSON-LD count: ${path}`);
    if (data.length) JSON.parse(data[0]);

    const snapshot = await page.evaluate(() => ({
      ids: [...document.querySelectorAll('[id]')].map((element) => element.id),
      links: [...document.querySelectorAll('a[href]')].map((anchor) => anchor.href),
      brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
    }));
    assert.deepEqual(snapshot.brokenImages, [], `broken images: ${path}`);
    pages.set(path, new Set(snapshot.ids));
    for (const href of snapshot.links) {
      const url = new URL(href);
      if (url.origin !== origin) continue;
      const targetPath = url.pathname.replace(/\/+$/, '') || '/';
      assert.ok(routeSet.has(targetPath) || targetPath === '/terms-of-service', `internal route ${href} from ${path}`);
      if (url.hash) internalLinks.push({ from: path, targetPath, fragment: decodeURIComponent(url.hash.slice(1)), href });
    }
  }

  for (const link of internalLinks) {
    assert.ok(pages.get(link.targetPath)?.has(link.fragment), `missing fragment ${link.href} from ${link.from}`);
  }
  assert.deepEqual(failures, []);
  console.log(`PASS ${routes.length} rendered routes: metadata, one H1, JSON-LD, internal links/fragments, images and browser errors.`);
} finally {
  await browser.close();
}
