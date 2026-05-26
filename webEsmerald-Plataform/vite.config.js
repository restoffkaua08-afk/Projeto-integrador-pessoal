import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    hmr: { overlay: true },
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/Projeto-integrador-pessoal/webEsmerald-Plataform/api/index.php')
      }
    }
  }
})
