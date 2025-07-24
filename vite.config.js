import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/smart-goal-planner/',
  server: {
    proxy: {
      '/api': 'http://localhost:3000' // Proxy API requests in development
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});