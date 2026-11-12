import { readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = join(root, 'dist');
// Match the production React build used by the browser bundle during hydration.
process.env.NODE_ENV = 'production';
const React = (await import('react')).default;
const { renderToString } = await import('react-dom/server');
const { createServer } = await import('vite');
const vite = await createServer({
  configFile: join(root, 'vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/app/App.tsx');
  const config = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
  const routes = [...new Set([
    ...config.rewrites
      .map((rule) => rule.source)
      .filter((route) => route && route.startsWith('/') && !route.includes(':') && !route.includes('*') && !route.includes('?')),
    '/not-found',
  ])];

  for (const route of routes) {
    const folder = route === '/' || route === '/not-found'
      ? output
      : join(output, route.slice(1));
    const file = route === '/not-found' ? join(output, '404.html') : join(folder, 'index.html');
    const template = await readFile(file, 'utf8');
    const markup = renderToString(React.createElement(
      React.StrictMode,
      null,
      React.createElement(App, { initialPath: route }),
    ));
    const html = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
    if (html === template) throw new Error(`Could not find React root in ${file}`);
    await writeFile(file, html);
  }

  console.log(`OSEC: prerendered ${routes.length - 1} published routes and the 404 page.`);
} finally {
  await vite.close();
}
