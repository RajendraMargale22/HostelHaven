import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Dev server — proxy /api to local backend
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  // Explicit build output (Vercel expects dist/)
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});