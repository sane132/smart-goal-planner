import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/smart-goal-planner/', // Required for GitHub Pages
  
  // Local development proxy (won't affect production build)
  server: {
    proxy: {
      '/goals': 'http://localhost:3000'
    }
  },
  
  // Production-specific settings
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});