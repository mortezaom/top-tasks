import {fileURLToPath, URL} from 'url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [vue(), viteCompression(),
        Components({
            resolvers: [NaiveUiResolver()]
        })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:4444/api/',
                changeOrigin: true,
                rewrite: path => path.replace('/api', ''),
            }
        }
    },
    build: {
        target: 'es2015',
        cssTarget: 'chrome80',
        // minify: 'terser',
        /**
         * 当 minify=“minify:'terser'” 解开注释
         * Uncomment when minify="minify:'terser'"
         */
        // terserOptions: {
        //   compress: {
        //     keep_infinity: true,W
        //     drop_console: VITE_DROP_CONSOLE,
        //   },
        // },
        // Turning off brotliSize display can slightly reduce packaging time
        brotliSize: false,
        chunkSizeWarningLimit: 2000,
    },
})
