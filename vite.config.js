import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages : https://daren046.github.io/Portfolio/
  // En local, créez un .env avec VITE_BASE_PATH=/ pour npm run dev
  base: process.env.VITE_BASE_PATH || '/Portfolio/',
  server: {
    port: 3000,
    open: true
  }
})
