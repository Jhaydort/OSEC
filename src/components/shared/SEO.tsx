import { useEffect } from 'react';
import { metadataFor, normalizeSiteUrl, renderSeoHead } from '../../data/seo';

export function SEO({ path }: { path: string }) {
  useEffect(() => {
    document.head.querySelectorAll('[data-osec-seo], title, meta[name="description"], meta[name="robots"], link[rel="canonical"]').forEach(node => node.remove());
    const template = document.createElement('template');
    template.innerHTML = renderSeoHead(metadataFor(path), normalizeSiteUrl(import.meta.env.VITE_SITE_URL));
    document.head.append(template.content);
    const main = document.querySelector('main');
    if (main) { main.id = 'main-content'; main.tabIndex = -1; }
  }, [path]);
  return null;
}
