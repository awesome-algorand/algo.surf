import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {nodePolyfills} from 'vite-plugin-node-polyfills';
// https://vite.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            external: ['highlight.js*']
        }
    },
    resolve: {
        alias: [
            {
                // this is required for the SCSS modules
                find: /^~(.*)$/,
                replacement: '$1',
            },
        ],
    },
    plugins: [react(), nodePolyfills({
        globals: {
            Buffer: true,
        },
    })],
})
