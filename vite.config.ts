import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://m.maoyan.com', // 目标 API 服务器
        changeOrigin: true, // 是否改变源
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
      },
      '/db': {
        target: 'http://localhost:3000',  // 后端服务器地址
        changeOrigin: true,  // 允许跨域
        rewrite: (path) => path.replace(/^\/db/, ''),  // 重写路径
      }
    },
  },
})
