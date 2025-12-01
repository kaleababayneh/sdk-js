# Solution Analysis: Why sn-api-manager Works but SDK Doesn't

## The Key Discovery

The **sn-api-manager web interface works** because it uses a completely different flow:

### sn-api-manager Flow (WORKS ✅)
1. **Create Request** (`/actions/cascade/request`)
   - Uses **Go SDK** server-side: `sdk.BuildCascadeMetadataFromFile()`
   - Go SDK generates metadata with **hardcoded ic=6** (line 286 in client.go)
   - Go SDK generates both layout IDs and index IDs consistently
   - Stores everything in database before upload

2. **Start Upload** (`/actions/cascade/{actionId}/upload/start`)
   - Uses stored metadata from database
   - IDs are already generated and consistent

3. **Download** works because:
   - Supernode generates the SAME index IDs (using ic=6)
   - IDs match what was stored during registration

### JavaScript SDK Flow (BROKEN ❌)
1. **Register Action**
   - Generates **random ic value**: `Math.floor(Math.random() * rq_ids_max)`
   - Only generates layout IDs for index file
   - Never generates or validates index IDs

2. **Upload** sends file to supernodes
   - Supernodes generate their own index IDs
   - If ic values don't match, IDs are different!

3. **Download** fails because:
   - Supernode looks for files using different IDs
   - "failed to get record by key" error

## The Root Cause

The problem is **IC (Initial Counter) value mismatch**:

### Go SDK (sn-api-manager):
```go
// Pick a random initial counter in [1,100]
//rnd, _ := crand.Int(crand.Reader, big.NewInt(100))
ic := uint32(6)  // HARDCODED!
```

### JavaScript SDK:
```javascript
// Step 2: Generate random initial counter
const rq_ids_ic = Math.floor(Math.random() * rq_ids_max);  // RANDOM!
```

### Supernode:
- During registration: Reads `rq_ids_ic` from blockchain
- Uses this to generate index IDs
- If browser sent different ic than what supernode uses, IDs don't match!

## Why This Matters

The ID generation formula is:
```
ID = base58(blake3(zstd(input + "." + counter)))
```

Where `counter = ic + i` for each file chunk.

If `ic` values differ:
- Browser generates with ic=5234 → ID="1B4AA7C7Y31H67KC5R3NKZ5NJF..."
- Supernode generates with ic=6 → ID="2X9BB8D8Z42I78LD6S4OLA6OKG..."
- **Different IDs = Download fails!**

## The Solution Options

### Option 1: Use Fixed IC (Quick Fix)
```javascript
// Match Go SDK's hardcoded value
const rq_ids_ic = 6;  // Instead of random
```
**Pros:** Quick, guaranteed to work
**Cons:** Not scalable, limits parallelism

### Option 2: Validate Index IDs (Proper Fix)
1. Generate expected index IDs in browser
2. After registration, query blockchain for `rq_ids_ids`
3. Compare and validate they match
4. Fail fast if mismatch detected

### Option 3: Server-Side Generation (Best Long-term)
Use the same approach as sn-api-manager:
1. Create a `/actions/cascade/request` endpoint
2. Use Go SDK server-side for consistency
3. Browser just uploads file, server handles metadata

## Recommended Immediate Fix

For now, use **Option 1** (fixed ic=6) to match the Go SDK:

```typescript
// In uploader.ts, line 257
// const rq_ids_ic = Math.floor(Math.random() * rq_ids_max);
const rq_ids_ic = 6;  // Match Go SDK's hardcoded value
```

This will ensure:
1. Browser and supernode use same ic value
2. Generated IDs match
3. Downloads work!

## Testing the Fix

1. Apply the ic=6 fix
2. Rebuild SDK: `pnpm build`
3. Upload a file
4. Check browser console for: "🔍 DEBUG: Expected Index IDs"
5. Query blockchain: `lumerad query action show <action-id>`
6. Compare `rq_ids_ids` field with browser's expected IDs
7. They should match!
8. Try downloading - should work now!

## Long-term Recommendation

Move to server-side metadata generation (Option 3) for production to ensure:
- Consistency across all clients
- Single source of truth
- No client/server mismatches
- Better security (signatures on server)