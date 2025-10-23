import { defineConfig, type PluginOption } from 'vite';
import path from 'path';

const logZstdShimPlugin = (): PluginOption => ({
  name: 'log-zstd-browser-shim',
  enforce: 'pre',
  resolveId(source) {
    if (source === '@mongodb-js/zstd') {
      console.info(
        '[vite] Replacing @mongodb-js/zstd with browser shim at examples/browser/stubs/zstd-browser.ts',
      );
    }
    return null;
  },
});

export default defineConfig({
  plugins: [logZstdShimPlugin()],
  resolve: {
    alias: {
      // Alias for the SDK to use the local source
      '@lumera/sdk-js': path.resolve(__dirname, '../../src'),
      // Force blake3 to use browser build
      'blake3': path.resolve(__dirname, '../../node_modules/blake3/dist/browser/index.js'),
      // Replace native zstd with a browser-safe shim
      '@mongodb-js/zstd': path.resolve(__dirname, './stubs/zstd-browser.ts'),
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
    exclude: ['@lumera/sdk-js', '@mongodb-js/zstd'],
  },
  ssr: {
    external: ['@mongodb-js/zstd'],
  },
  // Configure public directory to serve WASM assets
  publicDir: path.resolve(__dirname, '../../public'),
});