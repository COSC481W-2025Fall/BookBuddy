import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',        // ✅ build into /frontend/dist (default)
        emptyOutDir: true,
        assetsDir: '',         // optional: keep assets flat
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
            },
            '/Book': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
            '/login': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
            '/googlebooks': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
            '/books': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
            '/wishbooks': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
            '/WishBooks': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        coverage: {
            enabled: true, // Enable coverage
            reporter: ['text', 'html', 'lcov'], // Configure desired reporters
            // Other coverage options like include, exclude, etc.
        },
    },
})

