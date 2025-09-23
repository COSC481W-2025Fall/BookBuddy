import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../src/main/resources/static', // Spring Boot serves this
        emptyOutDir: true,
        assetsDir: '', // optional: keep assets flat for simplicity
    },
    server: {
        proxy: {
            '/Account': 'http://localhost:8080',
            '/books': 'http://localhost:8080', //Noah added
            '/login': 'http://localhost:8080',
            '/googlebooks': 'http://localhost:8080',   // Noah Schaible GoogleBooks API
        }
    }
})

