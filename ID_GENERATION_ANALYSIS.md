# ID Generation Analysis - Browser vs Supernode Mismatch

## The Core Problem

Downloads fail with "failed to get record by key" because the browser and supernode use **different ID generation strategies**.

## How ID Generation Works

### 1. Browser Side (During Upload)
```
Layout IDs = generateIds(layoutB64 + "." + layoutSignature)
Index IDs  = Not generated or sent anywhere!
```

### 2. Supernode Side (During Registration)
```
Layout IDs = GenerateLayoutFilesFromB64(layoutB64, layoutSig, ic, max)
Index IDs  = GenerateIndexFiles(signatures, ic, max)  // signatures = indexB64 + "." + creatorSig
```
The supernode stores files using **Index IDs** and puts them in blockchain as `rq_ids_ids`.

### 3. During Download
- Browser requests download with `actionId`
- Supernode looks up `rq_ids_ids` from blockchain
- Supernode tries to retrieve files using those Index IDs
- **FAILS** if IDs don't match what was stored!

## The Real Issue

**The browser never generates or validates Index IDs!**

The debug code I added shows what Index IDs the browser *would* generate:
```javascript
const debugIndexIds = await generateIds(
  indexFileB64,
  indexSignatureResponse.signature,
  rq_ids_ic,
  rq_ids_max
);
```

But these are only logged for debugging - they're never sent to the supernode or used for anything.

## What's Actually Sent

### To Blockchain (RequestAction):
```json
{
  "data_hash": "...",
  "rq_ids_ic": 1234,
  "signatures": "indexB64.creatorSignature",
  "public": true
}
```

### To Supernode (StartCascade):
```
FormData:
- action_id: "action-123"
- signature: "authSignature"
- file: <blob>
```

Notice: **No IDs are sent!** The supernode generates its own.

## The Critical Question

**Are the browser and supernode generating the SAME Index IDs from the SAME inputs?**

To verify:
1. Check the browser's debug log: "🔍 DEBUG: Expected Index IDs that supernode should generate"
2. Check what `rq_ids_ids` the supernode actually puts in blockchain
3. Compare them!

## Potential Root Causes

1. **Different inputs**: Maybe the `signatures` field is encoded differently
2. **Different IC value**: Maybe the supernode isn't using the `rq_ids_ic` from blockchain
3. **Algorithm mismatch**: Maybe the ID generation algorithm differs between JS and Go
4. **Encoding issues**: Base64 encoding differences between browser and supernode

## How to Debug

Run an upload with the new debug logging and check:

1. **Browser logs**:
   - "🔼 JS SDK LAYOUT DETAILS" - shows the layout
   - "🚀 SENDING TO BLOCKCHAIN" - shows what's sent to chain
   - "🔍 DEBUG: Expected Index IDs" - shows what IDs should be generated

2. **Blockchain query**:
   ```bash
   # Query the action to see what was stored
   lumerad query action show <action-id>
   ```
   Check the `rq_ids_ids` field

3. **Supernode logs**:
   Check what IDs the supernode actually generated and stored

## The Solution

Once we identify WHY the IDs don't match, we can fix it. Possible solutions:

1. **Fix encoding**: Ensure consistent base64 encoding
2. **Fix IC propagation**: Ensure supernode uses correct `rq_ids_ic`
3. **Fix algorithm**: Ensure ID generation matches between JS and Go
4. **Add validation**: Browser could validate expected IDs match blockchain IDs

But first, we need to confirm that ID mismatch is actually the problem by comparing the debug output!