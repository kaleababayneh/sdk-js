# Browser Testing Instructions

## ✅ Environment Ready!

### Services Running:
- **Browser Example:** http://localhost:3001 (freshly restarted with cache cleared)
- **sn-api-server:** Running on port 3000 with debug logging
- **Test file:** `/home/behzad/test-index-debug.txt`

### The Fix Applied:
The JS SDK now signs the **actual JSON layout content** instead of the base64 string.

### To Test:

1. **Open Browser:**
   - Go to http://localhost:3001
   - Open DevTools Console (F12)
   - **IMPORTANT:** Do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

2. **Connect Wallet:**
   - Click "Connect Wallet"
   - Select Keplr

3. **Upload File:**
   - Choose file: `/home/behzad/test-index-debug.txt`
   - Click Upload

4. **Watch Console for New Debug Messages:**
   You MUST see these new messages:
   ```
   📝 SIGNING LAYOUT: {
     signingData: "{...}",  // JSON content being signed
     signingDataLength: ...,
     layoutBytesB64: "...",
     layoutB64Length: ...
   }
   ✍️ LAYOUT SIGNATURE RECEIVED: {
     layoutSignatureB64: "...",
     signatureLength: ...
   }
   ```

5. **Check sn-api-server Terminal:**
   Look for:
   ```
   === SN-API-MANAGER INDEX GENERATION DEBUG ===
   ```

### If You Don't See the New Messages:

The browser is caching the old JavaScript. Try:

1. **Chrome/Chromium:**
   - Open DevTools
   - Right-click the Refresh button
   - Select "Empty Cache and Hard Reload"

2. **Firefox:**
   - Hold Shift and click Reload
   - Or Ctrl+F5

3. **Safari:**
   - Hold Option+Cmd+E to empty caches
   - Then Cmd+R to reload

### What Success Looks Like:

When the fix is working:
1. Console shows `📝 SIGNING LAYOUT:` with JSON content (not base64)
2. Layout IDs in the index file match between JS and Go SDKs
3. Downloads work successfully

### Current Status:
- ✅ SDK rebuilt with fix
- ✅ Vite cache cleared
- ✅ Browser example restarted on port 3001
- ✅ Debug logging added to sn-api-server
- ⏳ Waiting for browser test with hard refresh