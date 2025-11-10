import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../src/main/resources/static', // Spring Boot serves this
    emptyOutDir: true,
    assetsDir: '',
  },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
            '/Account': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                cookieDomainRewrite: 'localhost', // ✅ ensure cookies work with 5173
            },
            '/Book': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                cookieDomainRewrite: 'localhost',
            },
            '/login': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                cookieDomainRewrite: 'localhost',
            },
            '/googlebooks': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                cookieDomainRewrite: 'localhost',
            },
            '/books': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                cookieDomainRewrite: 'localhost',
            },
            '/wishbooks': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                cookieDomainRewrite: 'localhost',
            },
            '/WishBooks': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                cookieDomainRewrite: 'localhost',
            },
        }
    },
     test: {
       environment: 'jsdom',
       globals: true,
       coverage: {
            enabled: true, // Enable coverage
            reporter: ['text', 'html', 'lcov'], // Configure desired reporters
       },
   },
})
