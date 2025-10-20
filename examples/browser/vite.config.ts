import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Alias for the SDK to use the local source
      '@lumera/sdk-js': path.resolve(__dirname, '../../src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    exclude: ['@lumera/sdk-js'],
  },
  // Configure public directory to serve WASM assets
  publicDir: path.resolve(__dirname, '../../public'),
});