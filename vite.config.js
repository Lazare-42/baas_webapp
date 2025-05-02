import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'

const path = require('path')

export default defineConfig(() => {
    return {
        build: {
            outDir: 'build',
        },
        optimizeDeps: {
            exclude: [path.resolve(__dirname, 'landing')],
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
                    tsconfigPath: path.resolve(__dirname, './tsconfig.json'),
                    buildMode: true,
                },
            }),
        ],

        assetsInclude: ['**/*.md', '**/*.sh', '**/*.py'], // include markdown, bash, and python files as assets
        // assetsInclude: ['**/*.md'], // include markdown files as assets
        // assetsInclude: ['**/*.sh'], // include bash files as assets
        // assetsInclude: ['**/*.py'], // include python files as assets
    }
})
