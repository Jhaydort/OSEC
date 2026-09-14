import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Existing supplied assets remain in place and are served as root-static files.
  publicDir: 'assets',
});
