import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { fileURLToPath, URL } from 'node:url'




// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5174, // 원하는 포트로 변경
    
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  
})
