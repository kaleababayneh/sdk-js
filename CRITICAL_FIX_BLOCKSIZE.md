# CRITICAL FIX: RaptorQ Block Size Mismatch

## The Problem
Index IDs were different between JS SDK and Go SDK, causing downloads to fail with "RQID not found" errors.

## Root Cause Found
The WASM RaptorQ library was using `block_size = 0` (auto-calculate), while the Go SDK uses a fixed `1280 MiB` block size.

This caused:
1. Different RaptorQ layouts for the same file
2. Different layout IDs (derived from layout content)
3. Different index files (containing layout IDs)
4. Different index IDs
5. Download failures

## The Fix Applied

### File: `/home/behzad/Lumera/sdk-js/src/wasm/raptorq-proxy.ts`

**Before (line 200):**
```javascript
const metadata = await session.create_metadata(inputPath, layoutPath, 0);
// block_size = 0 means auto-calculate
```

**After:**
```javascript
const blockSize = RaptorQProxy.DEFAULT_BLOCK_SIZE; // 1280 MiB
const metadata = await session.create_metadata(inputPath, layoutPath, blockSize);
```

## Parameters Now Match Go SDK

| Parameter | JS SDK (Fixed) | Go SDK | Match |
|-----------|---------------|---------|-------|
| Symbol Size | 65535 | 65535 | ✅ |
| Redundancy Factor | 6 | 6 | ✅ |
| Block Size | 1280 MiB | 1280 MiB | ✅ |
| Concurrency | 1 | 1 | ✅ |

## Build Status
- SDK Version 3 built with fixed block size
- Vite cache cleared
- Ready for testing

## Testing Instructions

1. **Start services:**
   ```bash
   # Terminal 1 - sn-api-server
   cd /home/behzad/Lumera/sn-api-server
   ./sn-api-server serve

   # Terminal 2 - Browser example
   cd /home/behzad/Lumera/sdk-js/examples/browser
   pnpm dev
   ```

2. **Test with browser:**
   - Open http://localhost:3001
   - Hard refresh (Ctrl+Shift+R)
   - Connect wallet
   - Upload `/home/behzad/test-index-debug.txt`
   - Check console for:
     - `🔧 RAPTORQ LAYOUT GENERATION [VERSION 3]:`
     - `matchesGoSDK: true`
     - `blockSizeMB: 1280`

3. **Compare with sn-api-manager:**
   - Upload same file via http://localhost:3000/web/
   - Compare layout parameters in logs

## Expected Result
With the fixed block size, the JS SDK and Go SDK should now:
1. Generate identical RaptorQ layouts
2. Produce the same layout IDs
3. Create matching index files
4. Generate identical index IDs
5. Allow successful downloads

## Debug Logging Added
The SDK now logs:
- `🔧 RAPTORQ LAYOUT GENERATION [VERSION 3]` - Shows RaptorQ parameters
- `🔬 RAW WASM LAYOUT OUTPUT [VERSION 3]` - Shows raw layout from WASM
- `🔬 PARSED LAYOUT STRUCTURE` - Shows layout details
- `🔑 GENERATING LAYOUT IDs [VERSION 3]` - Shows layout ID generation
- `📄 INDEX FILE DETAILS [VERSION 3]` - Shows index file structure

## Verification
Look for these in the console to confirm the fix:
1. `matchesGoSDK: true` in RaptorQ generation log
2. `blockSizeMB: 1280` showing the fixed block size
3. Matching layout parameters between JS and Go SDKs