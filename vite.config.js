import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/smart-goal-planner/', // Must match your repo name exactly
  server: {
    proxy: {
      '/api': 'http://localhost:3000' // Proxy API requests to json-server
    }
  }
})