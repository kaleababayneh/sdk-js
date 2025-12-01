# VERSION 4 - Complete RaptorQ Parameters Fix

## Issues Found and Fixed

### 1. Block Size Mismatch (Fixed in V3)
- **JS SDK**: Was using `block_size = 0` (auto-calculate)
- **Go SDK**: Uses fixed `1280 MiB`
- **FIX**: Set `DEFAULT_BLOCK_SIZE = 1280 * 1024 * 1024`

### 2. Memory Limit Mismatch (NEW in V4)
- **JS SDK**: Was using `4096 MB` (4GB)
- **Go SDK**: Uses `8192 MB` (8GB)
- **FIX**: Set `DEFAULT_MAX_MEMORY_MB = 8192n`

## All RaptorQ Parameters Now Match

| Parameter | JS SDK (V4) | Go SDK | Status |
|-----------|-------------|--------|---------|
| Symbol Size | 65535 | 65535 | ✅ MATCH |
| Redundancy Factor | 6 | 6 | ✅ MATCH |
| Max Memory | 8192 MB | 8192 MB | ✅ MATCH |
| Concurrency | 1 | 1 | ✅ MATCH |
| Block Size | 1280 MiB | 1280 MiB | ✅ MATCH |

## Files Modified

1. `/home/behzad/Lumera/sdk-js/src/wasm/raptorq-proxy.ts`
   - Line 51: Changed `DEFAULT_MAX_MEMORY_MB = 4096n` to `8192n`
   - Line 201: Fixed block size to 1280 MiB
   - Added comprehensive logging to verify all params

## Debug Output to Look For

When running VERSION 4, you'll see:

```javascript
🚀 CascadeUploader [VERSION 4] - MEMORY & PARAMS FIX
🔧 RAPTORQ LAYOUT GENERATION [VERSION 4 - MEMORY FIX]: {
  VERSION: 'SDK_V4_MEMORY_FIX',
  symbolSize: 65535,
  redundancyFactor: 6,
  maxMemoryMB: 8192,  // <-- Now matches Go SDK!
  concurrency: 1,
  blockSize: 1342177280,
  blockSizeMB: 1280,
  matchesGoSDK: {
    symbolSize: true,
    redundancyFactor: true,
    maxMemoryMB: true,  // <-- Should be true now
    concurrency: true,
    blockSize: true,
    ALL_MATCH: true  // <-- This is the key indicator!
  }
}
```

## Testing Instructions

1. **Clear browser cache completely**:
   - Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
   - Or open DevTools → Application → Clear storage

2. **Check console for VERSION 4**:
   - Must see: `VERSION 4 - MEMORY & PARAMS FIX`
   - Must see: `matchesGoSDK.ALL_MATCH: true`

3. **Upload test file**:
   - Use `/home/behzad/test-index-debug.txt`
   - Note the generated layout IDs

4. **Compare with sn-api-manager**:
   - Upload same file via http://localhost:3000/web/
   - Layout parameters should now be identical

## Why Memory Matters

The memory limit affects RaptorQ's internal calculations:
- Memory constraints influence symbol allocation
- Different memory limits = different encoding strategies
- Even with same block size, memory affects layout generation

## Expected Results

With VERSION 4, the JS SDK and Go SDK should:
1. Generate **identical** RaptorQ layouts
2. Produce **identical** layout IDs
3. Create **identical** index files
4. Generate **identical** index IDs
5. Allow **successful downloads**

## Build Status
- ✅ VERSION 4 built with all parameters fixed
- ✅ Vite cache cleared
- ✅ Ready for testing

## Verification Checklist
- [ ] Console shows VERSION 4
- [ ] `matchesGoSDK.ALL_MATCH: true`
- [ ] `maxMemoryMB: 8192`
- [ ] Layout IDs match between JS and Go
- [ ] Downloads work successfully