import { defineConfig } from 'vite';
import path from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    basicSsl(), // Enable HTTPS for secure context
  ],
  assetsInclude: ['**/*.wasm'], // Ensure .wasm files are treated as assets
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
  },
  optimizeDeps: {
    exclude: ['@lumera/sdk-js'],
  },
  // Configure public directory to serve WASM assets
  publicDir: path.resolve(__dirname, '../../public'),
});