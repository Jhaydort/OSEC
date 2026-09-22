import { chromium } from '../.cache/cta-check/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
const origin = process.env.QA_URL || 'http://127.0.0.1:5180';
const withAnalytics = process.env.QA_GA === '1';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
let googleRequests = 0;
// All GA requests are intercepted. This test never sends analytics to Google.
await context.route(/https:\/\/[^/]*(googletagmanager|google-analytics)\.com\//, async route => {
  googleRequests++;
  await route.fulfill({ contentType: 'application/javascript', body: 'window.__gaTestLoaded = true;' });
});
let publicRequests = 0;
await context.route('**/rest/v1/patient_reviews*', async route => {
  const url = new URL(route.request().url());
  if (route.request().method() === 'GET') {
    publicRequests++;
    assert.equal(url.searchParams.get('select'), 'full_name,service,rating,review');
    assert.equal(url.searchParams.get('status'), 'eq.approved');
    assert.equal(url.searchParams.get('consent_to_publish'), 'eq.true');
    await route.fulfill({ contentType: 'application/json', headers: { 'content-range': '0-0/1' }, body: JSON.stringify([{ full_name: 'QA Public Story', service: 'colonoscopy', rating: 4, review: 'The team explained the next steps clearly.' }]) });
  } else {
    const data = route.request().postDataJSON();
    assert.equal(data.consent_to_publish, false);
    assert.equal(data.status, 'pending');
    await route.fulfill({ status: 201, body: '' });
  }
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await mkdir('.cache/production-qa/screenshots', { recursive: true });
try {
  await page.goto(origin + '/');
  await page.getByRole('heading', { name: 'Your cookie choices' }).waitFor();
  assert.equal(googleRequests, 0);
  assert.equal(await page.locator('#osec-ga').count(), 0);
  for (const width of [375, 390, 430, 480, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `homepage overflow ${width}`);
    await page.getByRole('button', { name: 'Manage Preferences', exact: true }).click();
    const modal = page.getByRole('dialog');
    await modal.waitFor();
    for (let tab = 0; tab < 10; tab++) { await page.keyboard.press('Tab'); assert.equal(await modal.evaluate(el => el.contains(document.activeElement)), true); }
    assert.equal(await modal.getByRole('checkbox', { name: /Analytics/ }).isChecked(), false);
    assert.equal(await modal.getByRole('checkbox', { name: /Essential/ }).isDisabled(), true);
    assert.equal(await modal.evaluate(el => el.scrollWidth <= el.clientWidth), true);
    await page.screenshot({ path: `.cache/production-qa/screenshots/preferences-${width}.png` });
    await page.keyboard.press('Escape');
    await modal.waitFor({ state: 'hidden' });
    assert.equal(await page.getByRole('button', { name: 'Manage Preferences', exact: true }).evaluate(el => el === document.activeElement), true);
  }
  await page.getByRole('button', { name: 'Reject Non-Essential', exact: true }).click();
  await page.reload();
  assert.equal(await page.locator('.osec-cookies--banner').count(), 0);
  assert.equal(googleRequests, 0);
  await page.getByRole('button', { name: 'Cookie Preferences', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Accept All', exact: true }).click();
  if (withAnalytics) await page.waitForFunction(() => window.__gaTestLoaded);
  assert.equal(googleRequests, withAnalytics ? 1 : 0);
  await page.getByRole('button', { name: 'Cookie Preferences', exact: true }).click();
  await page.getByRole('dialog').getByRole('checkbox', { name: /Analytics/ }).uncheck();
  await page.getByRole('dialog').getByRole('button', { name: 'Save Preferences' }).click();
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('osec-cookie-consent')).analytics), false);
  if (withAnalytics) assert.equal(await page.evaluate(() => window['ga-disable-G-TESTONLY']), true);
  const second = await context.newPage();
  await second.goto(origin + '/cookie-policy');
  await second.getByRole('button', { name: 'Cookie Preferences', exact: true }).last().click();
  await second.getByRole('dialog').getByRole('button', { name: 'Accept All', exact: true }).click();
  await page.waitForFunction(() => JSON.parse(localStorage.getItem('osec-cookie-consent')).analytics);
  if (withAnalytics) await page.waitForFunction(() => window['ga-disable-G-TESTONLY'] === false);
  await second.getByRole('button', { name: 'Cookie Preferences', exact: true }).last().click();
  await second.getByRole('dialog').getByRole('button', { name: 'Reject Non-Essential', exact: true }).click();
  if (withAnalytics) await page.waitForFunction(() => window['ga-disable-G-TESTONLY'] === true);
  await second.close();
  console.log('PASS responsive consent, reject persistence, accept, withdrawal, cross-tab sync, missing/configured GA');

  const serviceSource = await readFile('src/data/services.ts', 'utf8');
  const routes = ['/', '/about', '/services', '/contact', '/patient-story', '/privacy-policy', '/terms-and-conditions', '/cookie-policy', ...new Set([...serviceSource.matchAll(/href: '(\/services\/[^']+)'/g)].map(m => m[1]))];
  const titles = new Set();
  for (const path of routes) {
    const response = await page.goto(origin + path);
    assert.equal(response.status(), 200, path);
    await page.locator('main').waitFor();
    assert.equal(await page.locator('main').count(), 1, path);
    assert.equal(await page.locator('h1').count(), 1, path);
    assert.equal(await page.locator('title').count(), 1, path);
    const title = await page.title(); assert.equal(titles.has(title), false, title); titles.add(title);
    assert.ok((await page.locator('meta[name="description"]').getAttribute('content')).length > 40);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), path === '/patient-story' ? 'noindex, follow' : 'index, follow');
    assert.equal(await page.locator('link[rel="canonical"]').count(), withAnalytics && path !== '/patient-story' ? 1 : 0);
    for (const width of [375, 390, 430, 480, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${path} overflow ${width}`);
    }
    if (path === '/privacy-policy') await page.screenshot({ path: '.cache/production-qa/screenshots/privacy-desktop.png' });
  }
  for (const path of ['/news-health-articles','/does-not-exist','/services/does-not-exist']) {
    await page.goto(origin + path); await page.locator('main').waitFor();
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, follow');
  }
  await page.goto(origin + '/');
  await page.getByText('QA Public Story', { exact: false }).waitFor();
  assert.ok(publicRequests > 0);
  for (const [name, path] of [['Privacy Policy','/privacy-policy'],['Terms & Conditions','/terms-and-conditions'],['Cookie Policy','/cookie-policy']]) {
    await page.locator('footer').getByRole('link', { name, exact: true }).click();
    await page.waitForURL(origin + path);
  }
  await page.setViewportSize({ width: 375, height: 900 });
  await page.screenshot({ path: '.cache/production-qa/screenshots/cookie-mobile.png' });
  await page.locator('footer').screenshot({ path: '.cache/production-qa/screenshots/footer-mobile.png' });
  console.log('PASS every service route, legal links, unique metadata, semantic landmarks, responsive layouts, public story filters');

  await page.route('**/api/contact', async route => {
    assert.equal(route.request().method(), 'POST');
    assert.equal(route.request().postDataJSON().firstName, 'QA');
    await route.fulfill({ contentType: 'application/json', body: '{"success":true}' });
  });
  await page.goto(origin + '/contact');
  for (const [label, value] of [['First Name','QA'],['Last Name','Visitor'],['Email Address','qa@example.com'],['Phone number','08164353633'],['Nature of Enquiry','Test'],['Message','Test enquiry']]) await page.getByLabel(label, { exact: true }).fill(value);
  await page.getByRole('button', { name: 'Send Enquiry' }).click();
  await page.getByText('Enquiry sent successfully', { exact: false }).waitFor();
  await page.goto(origin + '/patient-story');
  await page.getByLabel('Your Name', { exact: true }).fill('QA Visitor');
  await page.getByLabel('Email Address', { exact: true }).fill('qa@example.com');
  await page.getByLabel('Phone number', { exact: true }).fill('08164353633');
  await page.getByLabel('Service Received').selectOption('colonoscopy');
  await page.getByRole('radio').nth(3).check();
  await page.getByLabel('Share Your Story', { exact: true }).fill('The team explained the next steps clearly.');
  await page.getByRole('button', { name: 'Submit My Story' }).click();
  await page.getByRole('heading', { name: 'Thank You for Sharing Your Story' }).waitFor();
  await page.goto(origin + '/');
  await page.evaluate(() => { window.__opened = []; window.open = (...args) => { window.__opened.push(args); return null; }; });
  await page.locator('.osec-navigation__appointment').click();
  assert.match(await page.evaluate(() => window.__opened[0][0]), /^https:\/\/wa\.me\/2348164353633\?text=/);
  assert.deepEqual(errors, []);
  console.log('PASS mocked contact and private-story submissions, WhatsApp draft URL, no JavaScript exceptions. No email or database writes.');
} finally { await browser.close(); }
