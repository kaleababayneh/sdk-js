import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: '../../node_modules/rq-library-wasm/rq_library_bg.wasm',
          dest: '.'
        }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3001,
    fs: {
      // Allow serving files from node_modules
      allow: ['../..']
    }
  },
  optimizeDeps: {
    // Only exclude WASM module, let Vite optimize the SDK
    exclude: ['rq-library-wasm'],
  },
});