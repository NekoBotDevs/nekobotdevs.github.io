// VitePress 构建优化配置
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 构建优化
  vite: {
    build: {
      // 启用压缩
      minify: 'terser',
      // 设置chunk大小警告限制
      chunkSizeWarningLimit: 1000,
      // 优化依赖预构建
      optimizeDeps: {
        include: ['vitepress']
      }
    },
    // 开发服务器配置
    server: {
      port: 5173,
      host: true
    }
  },
  
  // 构建输出配置
  outDir: '../dist',
  
  // 清理输出目录
  cleanUrls: true,
  
  // 生成站点地图
  sitemap: {
    hostname: 'https://nekobotdevs.github.io'
  }
})

