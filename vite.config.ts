import { defineConfig, loadEnv } from 'vite';
import { productionSeo } from './seo-build';
import react from '@vitejs/plugin-react';

// Native file watching can throw EBUSY when OneDrive locks a newly synced asset.
const needsPolling = process.platform === 'win32' && /[\\/]OneDrive(?:[ -][^\\/]*)?[\\/]/i.test(process.cwd());

export default defineConfig(({ mode }) => ({
  plugins: [react(), productionSeo(loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL)],
  // Existing supplied assets remain in place and are served as root-static files.
  publicDir: 'assets',
  server: {
    watch: needsPolling ? {
      usePolling: true,
      interval: 300,
      ignored: ['**/.cache/**', '**/tools/**', '**/*.zip', '**/*.msi', '**/.vite-dev*.log'],
    } : undefined,
  },
}));
