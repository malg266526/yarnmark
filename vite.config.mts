import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8090,
    strictPort: true,
    open: true
  },
  build: {
    outDir: 'dist',
    target: 'es2019',
    sourcemap: false,
    assetsInlineLimit: 0
  }
});
