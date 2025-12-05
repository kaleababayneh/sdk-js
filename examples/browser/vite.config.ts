import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "node:path";

// Vite config for the browser example.
// Always use the local SDK source from ../../src.
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "../../node_modules/rq-library-wasm/rq_library_bg.wasm",
          dest: ".",
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        // Force browser-compatible implementations for SDK compat shims
        find: "@lumera-protocol/sdk-js/compat/zstd",
        replacement: path.resolve(
          __dirname,
          "..",
          "..",
          "src",
          "compat",
          "zstd.browser.ts",
        ),
      },
      {
        find: "@lumera-protocol/sdk-js/compat/blake3",
        replacement: path.resolve(
          __dirname,
          "..",
          "..",
          "src",
          "compat",
          "blake3.browser.ts",
        ),
      },
      {
        // Always use the local SDK source instead of the published package
        find: /^@lumera-protocol\/sdk-js$/,
        replacement: path.resolve(__dirname, "..", "..", "src", "index.ts"),
      },
    ],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    // Use a different port than sn-api (which runs on 3000)
    port: 3001,
    fs: {
      // Allow serving files from node_modules and repo root
      allow: ["../.."],
    },
  },
  optimizeDeps: {
    // Exclude WASM modules so Vite doesn't try to prebundle them
    exclude: ["rq-library-wasm", "@bokuweb/zstd-wasm"],
    esbuildOptions: {
      target: "es2020",
    },
  },
});
