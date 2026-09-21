import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Native file watching can throw EBUSY when OneDrive locks a newly synced asset.
const needsPolling = process.platform === 'win32' && /[\\/]OneDrive(?:[ -][^\\/]*)?[\\/]/i.test(process.cwd());
export default defineConfig({
    plugins: [react()],
    // Existing supplied assets remain in place and are served as root-static files.
    publicDir: 'assets',
    server: {
        watch: needsPolling ? {
            usePolling: true,
            interval: 300,
            ignored: ['**/.cache/**', '**/tools/**', '**/*.zip', '**/*.msi', '**/.vite-dev*.log'],
        } : undefined,
    },
});
