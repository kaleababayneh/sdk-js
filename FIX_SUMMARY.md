# Layout Signature Fix - Summary

## The Problem
The JS SDK was generating different layout IDs than the Go SDK for the same file, causing downloads to fail with "RQID not found" errors.

## Root Cause
The JS SDK was signing the **base64-encoded layout string** instead of the **raw layout JSON content**.

- **JS SDK (before):** `sign(base64(layoutJSON))` → Wrong signature
- **Go SDK:** `sign(layoutJSON)` → Correct signature

Different signatures → Different layout IDs → Download failures

## The Fix
Changed `/home/behzad/Lumera/sdk-js/src/cascade/uploader.ts` line 298:

```javascript
// BEFORE (wrong):
const layoutSignatureResponse = await this.requestSignature(
  "layout",
  layoutBytesB64,  // ❌ Signing base64 string
  signaturePrompter,
  operationStartMs
);

// AFTER (fixed):
const layoutSignatureResponse = await this.requestSignature(
  "layout",
  compactLayoutJSON,  // ✅ Signing actual JSON content
  signaturePrompter,
  operationStartMs
);
```

## Testing the Fix

### 1. Start the services:

```bash
# Terminal 1 - Start sn-api-server (with debug logging)
cd /home/behzad/Lumera/sn-api-server
./sn-api-server serve

# Terminal 2 - Start browser example
cd /home/behzad/Lumera/sdk-js/examples/browser
pnpm dev
```

### 2. Test with browser (JS SDK):
- Open http://localhost:3001
- Connect wallet
- Upload `/home/behzad/test-index-debug.txt`
- Check browser console for:
  - `📝 SIGNING LAYOUT:` - Shows raw JSON being signed
  - `✍️ LAYOUT SIGNATURE RECEIVED:` - The signature
  - Layout IDs array

### 3. Test with sn-api-manager (Go SDK):
- Open http://localhost:3000/web/
- Upload the same test file
- Check terminal for debug output

### 4. Compare the results:
The debug logs should now show:
- Same layout signatures for the same file
- Matching layout IDs in the index files
- Successful downloads from both upload methods

## Debug Logging Added

### sn-api-server logs will show:
```
=== SN-API-MANAGER INDEX GENERATION DEBUG ===
File: /path/to/file
Signatures (index_b64.signature): ...
Decoded index file: {"layout_ids":[...], "layout_signature":"..."}
```

### Browser console will show:
```javascript
🔼 JS SDK LAYOUT DETAILS (compact JSON): {...}
📝 SIGNING LAYOUT: { signingData: "{...}", ... }
✍️ LAYOUT SIGNATURE RECEIVED: { layoutSignatureB64: "...", ... }
🔍 DEBUG: Expected Index IDs that supernode should generate: {...}
```

## Key Files Modified
1. `/home/behzad/Lumera/sdk-js/src/cascade/uploader.ts` - Fixed signature input
2. `/home/behzad/Lumera/sn-api-server/internal/action/application/cascade/create_request.go` - Added debug logging
3. `/home/behzad/Lumera/supernode/sdk/task/helpers.go` - Added debug logging

## Build Status
✅ JS SDK has been built with the fix (pnpm build completed)
✅ sn-api-server has been rebuilt with debug logging
✅ Test file created at `/home/behzad/test-index-debug.txt`