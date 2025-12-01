# VERSION 3 Debug Checklist - Finding Index ID Mismatch

## Current Status
SDK Version 3 has comprehensive debugging to identify why index IDs differ between JS and Go SDKs

## Key Debug Points to Check

### 1. Version Indicator
Look for: `🚀 CascadeUploader [VERSION 3] - SIGNATURE DEBUG`
- Confirms VERSION 3 is running with enhanced debugging

### 2. Layout Generation
Look for: `🔬 RAW WASM LAYOUT OUTPUT [VERSION 3]:`
- Check `rawLength` - the size of raw WASM output
- Check `isJSON` - should be true
- Check `firstBytes` - hex dump of first 20 bytes

Look for: `🔬 PARSED LAYOUT STRUCTURE:`
- **CRITICAL**: Compare these values with Go SDK:
  - `transferLength` - must match
  - `symbolSize` - must match (should be 65535)
  - `numSourceBlocks` - must be 1
  - `blockDetails.numSourceSymbols` - must match

Look for: `🔬 LAYOUT COMPACTION:`
- Shows difference between raw and compacted JSON
- `compactLength` should be smaller than `rawLength`

### 3. Layout ID Generation
Look for: `🔑 GENERATING LAYOUT IDs [VERSION 3]:`
- Check `layoutBytesB64Length`
- Check `layoutSignatureB64`
- Check `rq_ids_ic` - MUST be 6
- Check `rq_ids_max` - should match blockchain params

Look for: `🔑 LAYOUT IDs GENERATED:`
- Note the `firstId` and `lastId`
- These go into the index file

### 4. Index File Construction
Look for: `📄 INDEX FILE DETAILS [VERSION 3]:`
- **CRITICAL**: Check exact JSON structure:
  - `indexFileString` - the actual JSON being sent
  - `indexJsonFirstBytes` - first 50 chars of JSON
  - `indexKeysOrder` - should be ["layout_ids", "layout_signature"]
  - `hasVersion` - should be false (no version field)

### 5. Signature Process
Look for: `🔐 KEPLR SIGN ARBITRARY DEBUG [VERSION 3]:`
- Shows exactly what data Keplr is signing
- `dataToSign` - the actual string being signed
- `bytesHex` - hex dump of first 50 bytes

Look for: `🔐 KEPLR SIGNATURE RECEIVED [VERSION 3]:`
- Shows the signature returned by Keplr
- `signatureLength` should be consistent

## Comparison Points with Go SDK

### To Compare:
1. **Layout Content**
   - Are the layout JSON fields identical?
   - Same transfer_length, symbol_size, num_source_symbols?

2. **Layout Base64**
   - Is the layout base64 string identical?
   - If not, where do they differ?

3. **Index File JSON**
   - Is the JSON structure identical?
   - Same key ordering?
   - No extra/missing fields?

4. **Signatures**
   - If using same wallet, are signatures identical?
   - Are we signing the same data?

## Test Procedure

1. **Clear browser cache**
   - Hard refresh (Ctrl+Shift+R)
   - Or open DevTools → Network → Disable cache

2. **Upload same test file**
   - Use `/home/behzad/test-index-debug.txt`
   - Upload via browser (JS SDK)
   - Upload via sn-api-manager (Go SDK)

3. **Capture logs**
   - Browser console for JS SDK output
   - Terminal for sn-api-manager output

4. **Compare critical values**
   - Layout parameters (transfer_length, symbol_size, etc.)
   - Layout base64 strings
   - Index file JSON structure
   - Layout IDs in index file
   - Final index IDs

## Root Cause Hypothesis

If signatures match but index IDs differ, the issue is likely:

1. **Different layout content** - WASM vs Go RaptorQ producing different layouts
2. **Different JSON serialization** - Key ordering, whitespace, etc.
3. **Different base64 encoding** - Padding, line breaks, etc.

## Solution Path

Once we identify the exact difference:
1. Adjust JS SDK to match Go SDK behavior
2. Ensure deterministic output
3. Verify downloads work

## Current Build
- SDK Version 3 built at: [timestamp]
- Vite cache cleared
- Ready for testing