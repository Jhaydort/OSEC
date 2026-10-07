import { chromium } from '../.cache/cta-check/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
let scenario = 'empty';
let calls = 0;
await page.route('**/rest/v1/patient_reviews*', async route => {
  const url = new URL(route.request().url());
  assert.equal(route.request().method(), 'GET');
  assert.equal(url.searchParams.get('select'), 'full_name,service,rating,review');
  assert.equal(url.searchParams.get('status'), 'eq.approved');
  assert.equal(url.searchParams.get('consent_to_publish'), 'eq.true');
  calls++;
  if (scenario === 'network') return route.abort('namenotresolved');
  if (scenario === 'error') return route.fulfill({ status: 403, contentType: 'application/json', body: JSON.stringify({ code: '42501', message: 'PRIVATE DATABASE ERROR' }) });
  const rows = scenario === 'approved' ? [{ full_name: 'Test Patient', service: 'colonoscopy', rating: 5, review: 'The team explained my care clearly.' }] : [];
  return route.fulfill({ status: 200, headers: { 'content-range': rows.length ? '0-0/1' : '*/0' }, contentType: 'application/json', body: JSON.stringify(rows) });
});
try {
  for (scenario of ['empty', 'error', 'network', 'approved']) {
    const before = calls;
    await page.goto(process.env.QA_URL || 'http://127.0.0.1:5181/');
    const section = page.locator('.osec-patient-stories');
    await page.locator('.osec-patient-stories[aria-busy="false"]').waitFor();
    assert.ok(calls > before);
    const text = await section.innerText();
    assert.ok(!text.includes('PRIVATE DATABASE ERROR'));
    if (scenario === 'approved') {
      assert.equal(await section.locator('blockquote').innerText(), 'The team explained my care clearly.');
      assert.match(await section.locator('figcaption').innerText(), /Test Patient/);
      assert.equal(await section.locator('.osec-patient-stories__placeholder').count(), 0);
    } else {
      assert.equal(await section.locator('blockquote').count(), 0);
      assert.equal(await section.locator('.osec-patient-stories__placeholder').innerText(), scenario === 'empty' ? 'Patient stories will appear here when available.' : 'Patient stories are temporarily unavailable. Please try again later.');
    }
    console.log('PASS ' + scenario);
  }
} finally {
  await browser.close();
}
