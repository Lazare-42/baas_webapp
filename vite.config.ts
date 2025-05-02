/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'

export default defineConfig(() => ({
    build: {
        outDir: 'build',
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            '#root': path.resolve(__dirname),
        },
    },
    plugins: [
        react(),
        svgr({ svgrOptions: { icon: true } }),
        checker({
            typescript: {
                tsconfigPath: './tsconfig.json',
                buildMode: true,
            },
        }),
    ],
    test: {
        environment: 'happy-dom',
        setupFiles: ['./src/test/setup.tsx'],
        globals: true,
        deps: {
            optimizer: {
                web: {
                    include: ['@chakra-ui/react', '@emotion/react'],
                },
            },
        },
        coverage: {
            provider: 'v8',
            reporter: ['text', 'cobertura'],
            reportsDirectory: 'coverage',
            exclude: ['node_modules/', 'src/test/'],
        },
    },
}))
