import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const read = path => readFile(path, 'utf8');
const config = JSON.parse(await read('vercel.json'));
const domain = process.env.QA_SITE_URL || '';
const paths = ['/', ...config.rewrites.map(rule => rule.source).filter(path => path !== '/' && !path.includes(':') && !path.includes('*'))];
test('built route heads and Vercel rewrite targets agree', async () => {
  const titles = new Set();
  for (const path of paths) {
    const rule = config.rewrites.find(rule => rule.source === path);
    const html = await read('dist' + rule.destination);
    assert.equal((html.match(/<title\b/g) || []).length, 1, path);
    const title = html.match(/<title[^>]*>(.*?)<\/title>/)[1];
    assert.equal(titles.has(title), false, path); titles.add(title);
    for (const field of ['description', 'robots', 'og:title', 'og:description', 'twitter:card']) assert.equal((html.match(new RegExp(`(?:name|property)="${field}"`, 'g')) || []).length, 1, path + ' ' + field);
    const noindex = ['/patient-story'].includes(path);
    assert.equal(html.includes('content="noindex, follow"'), noindex);
    assert.equal(html.includes('rel="canonical"'), !!domain && !noindex);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `one rendered H1: ${path}`);
    assert.ok((html.match(/<div id="root">([\s\S]*?)<\/div>/)?.[1]?.length ?? 0) > 100, `prerendered body: ${path}`);
    if (domain && !noindex) {
      assert.ok(html.includes(`href="${domain}${path}"`), path);
      assert.ok(html.includes(`property="og:url" content="${domain}${path}"`), `Open Graph URL: ${path}`);
      const scripts = [...html.matchAll(/type="application\/ld\+json">(.*?)<\/script>/g)];
      assert.equal(scripts.length, 1, `single JSON-LD graph: ${path}`);
      const data = JSON.parse(scripts[0][1]);
      assert.equal(data['@context'], 'https://schema.org');
      const types = data['@graph'].map(item => item['@type']);
      assert.equal(types.filter(type => type === 'MedicalOrganization').length, 1);
      assert.equal(types.filter(type => type === 'WebSite').length, 1);
      if (path === '/services') assert.ok(types.includes('CollectionPage'));
      if (path === '/news-health-articles') assert.ok(types.includes('CollectionPage'));
      if (path === '/about') assert.ok(types.includes('AboutPage'));
      assert.ok(!JSON.stringify(data).includes('aggregateRating'));
    }
  }
  assert.deepEqual(config.rewrites[0], { source: '/api/:path*', destination: '/api/:path*' });
  assert.equal(config.rewrites.at(-1).destination, '/404.html');
  assert.deepEqual(config.redirects.find((rule) => rule.source === '/terms-of-service'), { source: '/terms-of-service', destination: '/terms-and-conditions', permanent: true });
  assert.ok((await read('dist/404.html')).includes('noindex, follow'));
  await assert.rejects(access('dist/OSEC_Service_Detail_Content_Updated.docx'));
});
test('robots and sitemap use the configured production origin with no duplicate or private URLs', async () => {
  const robots = await read('dist/robots.txt');
  assert.ok(robots.includes('Allow: /\n'));
  assert.ok(robots.includes('Disallow: /api/'));
  assert.ok(!robots.includes('Disallow: /\n'));
  if (!domain) { await assert.rejects(access('dist/sitemap.xml')); return; }
  assert.ok(robots.includes(`Sitemap: ${domain}/sitemap.xml`));
  const sitemap = await read('dist/sitemap.xml');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.equal(new Set(urls).size, urls.length);
  assert.equal(urls.length, 21);
  assert.deepEqual(new Set(urls), new Set(paths.filter(path => !['/patient-story'].includes(path)).map(path => domain + path)));
});
