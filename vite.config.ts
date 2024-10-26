import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/gi-builds-filter/', // GitHub repo name
  server: {
    host: true, // or use '0.0.0.0'
    port: 5173, // or your preferred port
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
})
