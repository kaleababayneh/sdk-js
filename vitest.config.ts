import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      tests: path.resolve(__dirname, "tests"),
      "@lumera/sdk-js/compat/blake3": path.resolve(__dirname, "src/compat/blake3.node.ts"),
      "@lumera/sdk-js/compat/zstd": path.resolve(__dirname, "src/compat/zstd.node.ts"),
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["tests/**/*.test.ts", "tests/**/*.spec.ts"],
    coverage: {
      reporter: ["text", "html", "lcov"],
      lines: 0.8,
      branches: 0.8,
      functions: 0.8,
      statements: 0.8,
    },
    setupFiles: ["tests/setup.ts"],
  },
});