# BLAKE3 Browser Compatibility Guide

## Problem Summary

The `blake3` npm package provides different implementations for Node.js and browser environments:

- **Node.js**: Uses native bindings (when available) or WASM, exports from `dist/node/`
- **Browser**: Uses WASM only, exports from `dist/browser/`

### Key Differences

| Feature | Node.js (`dist/node/`) | Browser (`dist/browser/`) |
|---------|----------------------|-------------------------|
| Import | `createHash()` from 'blake3' | `createHash()` from 'blake3/browser' |
| digest() with encoding | Returns `Buffer` or `string` | Returns `Hash` object (extends Uint8Array) |
| digest() result | `hasher.digest("hex")` → `string` | `hasher.digest()` → `Hash`, then `.toString("hex")` |
| Stream support | Node.js streams | Web Streams API |

## Solution Implemented

### 1. Universal Hash Functions (`src/internal/hash.ts`)

Updated all hash functions to handle both Node.js and browser environments:

```typescript
// Works in both environments
export async function blake3Hash(data: Uint8Array): Promise<string> {
  const hasher = createBlake3Hash();
  hasher.update(data);
  const digest = hasher.digest();
  // Handle both Node.js (string) and browser (Hash object with toString)
  return typeof digest === 'string' ? digest : digest.toString("hex");
}
```

### 2. Vite Configuration for Browser Builds

Updated `examples/browser/vite.config.ts` to force blake3 browser resolution:

```typescript
export default defineConfig({
  resolve: {
    alias: {
      // Force blake3 to use browser build
      'blake3': path.resolve(__dirname, '../../node_modules/blake3/dist/browser/index.js'),
    },
  },
});
```

### 3. Package.json Configuration

The `blake3` package uses these fields for module resolution:

```json
{
  "main": "./dist/index",        // Node.js default
  "module": "./esm/index",       // ESM Node.js
  "browser": "./esm/browser/index" // Browser override
}
```

Modern bundlers (Vite, Webpack, Rollup) should automatically use the `browser` field, but we explicitly alias it in Vite config to ensure correct resolution.

## How It Works

### Node.js Environment

```typescript
import { createHash } from "blake3";
// Resolves to: node_modules/blake3/dist/node/hash-instance.js

const hasher = createHash();
hasher.update(data);
const result = hasher.digest("hex"); // Returns string directly
```

### Browser Environment (with Vite alias)

```typescript
import { createHash } from "blake3";
// Vite alias resolves to: node_modules/blake3/dist/browser/index.js

const hasher = createHash();
hasher.update(data);
const result = hasher.digest(); // Returns Hash object
const hexString = result.toString("hex");
```

### Universal Code (Our Implementation)

```typescript
const digest = hasher.digest();
// Works in both:
return typeof digest === 'string' ? digest : digest.toString("hex");
```

## Testing

### Node.js
```bash
npm test
# or
node examples/node/full-workflow.ts
```

### Browser
```bash
cd examples/browser
npm run dev
# Open browser and test file upload/download
```

## Bundler Configuration

### Vite (Recommended for Browser)

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      'blake3': path.resolve(__dirname, './node_modules/blake3/dist/browser/index.js'),
    },
  },
});
```

### Webpack

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      'blake3': path.resolve(__dirname, 'node_modules/blake3/dist/browser/index.js'),
    },
  },
};
```

### Rollup

```javascript
// rollup.config.js
import alias from '@rollup/plugin-alias';

export default {
  plugins: [
    alias({
      entries: [
        { find: 'blake3', replacement: './node_modules/blake3/dist/browser/index.js' }
      ]
    })
  ]
};
```

## Best Practices

1. **Always use the universal functions** from `src/internal/hash.ts`
2. **Configure your bundler** to use the browser version of blake3 for browser builds
3. **Test in both environments** - Node.js tests and browser tests
4. **Use ReadableStream** for large files in browsers (memory efficient)

## Troubleshooting

### Error: "Cannot find module 'blake3'"
- Ensure `blake3` is installed: `npm install blake3`

### Error: "Buffer is not defined" in browser
- Your bundler is using the Node.js version
- Add the blake3 alias to your bundler config (see above)

### Error: Type errors with digest()
- Ensure you're handling both return types:
  ```typescript
  const digest = hasher.digest();
  const hex = typeof digest === 'string' ? digest : digest.toString("hex");
  ```

## References

- [blake3 npm package](https://www.npmjs.com/package/blake3)
- [BLAKE3 specification](https://github.com/BLAKE3-team/BLAKE3)
- [Vite module resolution](https://vitejs.dev/guide/features.html#npm-dependency-resolving-and-pre-bundling)
