import type { Plugin } from 'vite';
import { readFile, writeFile, mkdir, readdir, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { metadataFor, normalizeSiteUrl, renderSeoHead, seoPages } from './src/data/seo';

/** Static route-specific heads for social crawlers; existing React layouts remain. */
export function productionSeo(rawUrl: string | undefined): Plugin {
  const siteUrl = normalizeSiteUrl(rawUrl);
  let outDir: string;
  let isBuild = false;
  const head = (html: string, path: string) => html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, '').replace('</head>', `${renderSeoHead(metadataFor(path), siteUrl)}\n</head>`);
  return {
    name: 'osec-production-seo',
    configResolved(config) { outDir = resolve(config.root, config.build.outDir); isBuild = config.command === 'build'; },
    transformIndexHtml: { order: 'pre', handler(html, context) {
      return context.server ? head(html, context.originalUrl?.split('?')[0] ?? context.path) : html;
    } },
    async closeBundle() {
      if (!isBuild) return;
      if (rawUrl && !siteUrl) throw new Error('VITE_SITE_URL must be an HTTPS production origin without a path, query or Vercel preview hostname.');
      if (!siteUrl) console.warn('OSEC: VITE_SITE_URL is unset. Canonicals/social image URLs/sitemap are omitted. Configure it and rebuild before launch.');
      const base = await readFile(join(outDir, 'index.html'), 'utf8');
      for (const page of seoPages) {
        const directory = page.path === '/' ? outDir : join(outDir, page.path.slice(1));
        await mkdir(directory, { recursive: true });
        await writeFile(join(directory, 'index.html'), head(base, page.path));
      }
      await writeFile(join(outDir, '404.html'), head(base, '/not-found'));
      await writeFile(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : '# Set VITE_SITE_URL and rebuild to generate sitemap.xml.\n'}`);
      if (siteUrl) {
        const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + seoPages.filter(page => !page.noindex).map(page => `  <url><loc>${siteUrl}${page.path}</loc></url>`).join('\n') + '\n</urlset>\n';
        await writeFile(join(outDir, 'sitemap.xml'), xml);
      }
      // Exclude copied editorial source documents, never modify original assets.
      async function excludeSourceDocuments(directory: string) {
        for (const entry of await readdir(directory, { withFileTypes: true })) {
          const path = join(directory, entry.name);
          if (entry.isDirectory()) await excludeSourceDocuments(path);
          else if (/\.(docx?|xlsx?|psd|fig|zip|msi)$/i.test(entry.name)) await rm(path);
        }
      }
      await excludeSourceDocuments(outDir);
    },
  };
}
