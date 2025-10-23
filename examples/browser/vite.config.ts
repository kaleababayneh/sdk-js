import { defineConfig } from 'vite';
import path from 'path';
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
  resolve: {
    alias: {
      // Alias for compat modules to use browser versions (must come before main alias)
      '@lumera/sdk-js/compat/blake3': path.resolve(__dirname, '../../src/compat/blake3.browser.ts'),
      '@lumera/sdk-js/compat/zstd': path.resolve(__dirname, '../../src/compat/zstd.browser.ts'),
      // Alias for the SDK to use the local source
      '@lumera/sdk-js': path.resolve(__dirname, '../../src'),
    },
  },
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
    exclude: ['@lumera/sdk-js', 'rq-library-wasm'],
  },
});