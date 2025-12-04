# Browser E2E Test Harness (sn-api + Keplr + LEP-1)

This README describes how to run the end-to-end browser test for the Lumera SDK.
The harness drives the `examples/browser` app against a local `sn-api-server`
and a real Keplr wallet in Chrome, exercising the full LEP-1 layout/index/auth
signature flow and Cascade upload/download.

## What this test does

- Starts (or reuses) `sn-api-server` via the `snapi` binary.
- Starts (or reuses) the browser example dev server (`pnpm run dev` in
  `examples/browser`).
- Launches Chrome with a persistent profile that has Keplr installed and
  configured.
- Automates:
  - Connect Keplr wallet (unlock + approve).
  - Upload a small test file to Cascade (including:
    - SDK “Multiple Signatures Required” modal,
    - Keplr layout/index/auth ADR-036 signatures,
    - Transaction confirmation).
  - Download the uploaded file back via sn-api and the Cascade downloader.
- Fails with a non-zero exit code on any timeout or error.

## Prerequisites

From the repo root:

1. **sn-api-server binary**

   You need a usable `snapi` binary on disk.

   - Obtain or build the `snapi` binary by whatever means makes sense for your
     environment.
   - Place it somewhere on your machine, for example:

     ```bash
     /opt/lumera/snapi
     ```

   - Set `E2E_SNAPI_BIN` in `e2e.env` to the **full path** of that binary:

     ```bash
     E2E_SNAPI_BIN=/opt/lumera/snapi
     ```

   The harness does **not** assume any particular repo layout; it only checks
   that `E2E_SNAPI_BIN` points to an existing file and exits with a clear
   message if it does not.

2. **Local sn-api configuration**

   Ensure you have `~/.snapi/.env` configured (HTTP_PORT, GRPC_ADDR, CHAIN_ID,
   KEY_NAME, etc.) and that sn-api can reach your target Lumera network.

3. **Chrome profile with Keplr**

- Install Keplr in Chrome.
- Create/use a profile that:
  - Has the Keplr extension installed and enabled.
  - Has a Lumera Testnet account set up and funded.
- Find the **Profile Path**:
  1. Open Chrome with the target profile (e.g., the profile named “Matee” in
     the Chrome UI).
  2. In the address bar, navigate to `chrome://version`.
  3. Look for the line labeled **Profile Path**.
  4. Copy that full path (e.g. `/home/you/.config/google-chrome/Profile 2` or
     `/home/you/.config/google-chrome-playwright-matee`).
  5. Use that value as `E2E_CHROME_PROFILE_DIR` in `e2e.env`.

4. **Node deps for sdk-js**

   ```bash
   cd sdk-js
   pnpm install
   ```

## One-time configuration (e2e.env)

In `sdk-js`:

```bash
cd sdk-js
cp e2e.env.example e2e.env
```

Edit `e2e.env` to match your environment. A simple, minimal configuration looks like:

```bash
E2E_CHROME_EXECUTABLE=/usr/bin/google-chrome
# Paste the "Profile Path" from chrome://version here:
E2E_CHROME_PROFILE_DIR=/home/you/.config/google-chrome/Profile 2

E2E_SNAPI_BIN=/opt/lumera/snapi          # full path to snapi binary
E2E_SNAPI_URL=http://localhost:3000

E2E_BROWSER_URL=http://localhost:3001

E2E_KEPLR_AUTO_APPROVE=1
E2E_KEPLR_DEBUG=0

# Keplr wallet password for unlocking (test environment only)
E2E_KEPLR_PASSWORD=your_keplr_password_here
```

For advanced tuning (timeouts, profile name for logging, etc.), you can add
extra `E2E_*` variables to `e2e.env` as needed. The harness supports:

```bash
# Optional: profile name for logging only
E2E_CHROME_PROFILE_NAME=Matee

# Optional timeout overrides (milliseconds)
E2E_TIMEOUT_HTTP_STARTUP_MS=120000
E2E_TIMEOUT_HTTP_PRECHECK_MS=5000
E2E_TIMEOUT_CONNECT_MS=30000
E2E_TIMEOUT_UPLOAD_MS=120000
E2E_TIMEOUT_DOWNLOAD_MS=600000
E2E_TIMEOUT_POST_UPLOAD_PAUSE_MS=5000
E2E_TIMEOUT_SIGNATURE_POLL_MS=15000
E2E_TIMEOUT_TX_MODAL_MS=60000
E2E_TIMEOUT_POPUP_LOAD_MS=30000
E2E_TIMEOUT_POPUP_RENDER_DELAY_MS=2000
E2E_TIMEOUT_POPUP_BUTTON_MS=10000
E2E_TIMEOUT_EXISTING_POPUP_BUTTON_MS=5000
```

## How to run the test

From `sdk-js`:

```bash
cd sdk-js
make e2e-browser
```

This will:

- Load `e2e.env` and export all `E2E_*` variables.
- Ensure sn-api is running (reusing an existing instance on `E2E_SNAPI_URL`
  or starting `E2E_SNAPI_BIN serve`).
- Ensure the browser example dev server is running on `E2E_BROWSER_URL`.
- Launch Chrome with `E2E_CHROME_PROFILE_DIR`.
- Drive the browser example through:
  - Connect Keplr wallet.
  - Upload test file (with all LEP-1 signatures).
  - Download the file back.
- Exit with code `0` on success, non-zero on failure.

## What to expect in the logs

The harness logs both its own steps and the browser’s console output:

- `[e2e] ...` lines are from the Node/Playwright script.
- `[e2e][browser-console] ...` lines mirror the browser’s console.
- Keplr-specific logs look like:

  ```text
  [e2e] [keplr] New popup page created, waiting for navigation...
  [e2e] [keplr] Popup navigated: url=chrome-extension://... title=Keplr
  [e2e] [keplr] button[1] text='Approve'
  [e2e] [keplr] Clicking button[1] with text='Approve'...
  [e2e] [keplr] Total approvals clicked so far: N
  ```

- The browser example logs:

  - Upload progress (`Starting upload`, `File loaded into memory`, `File hash`, etc.).
  - Signature phases (`signature requested`, `signature received` for layout/index/auth).
  - Transaction confirmation.
  - Upload success (`Upload completed`).
  - Download success (`File saved to browser downloads`).

If `E2E_KEPLR_DEBUG=1`, Keplr popup HTML is dumped into
`sdk-js/e2e-debug/keplr-popup-*.html` so you can inspect the exact DOM.

## Common issues

- **Keplr popups not auto-approved**

  - Ensure `E2E_KEPLR_PASSWORD` is set and correct.
  - Ensure the Chrome profile really has Keplr installed and enabled.
  - Check `e2e-debug/keplr-popup-*.html` to see if button labels changed.

- **Downloads not visible in ~/Downloads**

  - The example only triggers a download via an `<a download>` link.
  - The actual directory is controlled by Chrome’s download settings for the
    selected profile (e.g. “Ask where to save each file”).
  - Check Chrome’s Downloads page (Ctrl+J) to see where the file went.

- **HTTP 500 during download**

  - sn-api may not yet have created the cascade request row when download is
    requested.
  - The harness waits a few seconds after “Upload completed” before triggering
    download; if you still see 500s, inspect sn-api logs and its SQLite state
    under `~/.snapi`.

## Adjusting timeouts

To tune timeouts for slow/fast environments, add overrides to `e2e.env`, e.g.:

```bash
E2E_TIMEOUT_UPLOAD_MS=300000
E2E_TIMEOUT_DOWNLOAD_MS=600000
E2E_TIMEOUT_POST_UPLOAD_PAUSE_MS=10000
```

See `e2e.env.example` for the full list of supported `E2E_TIMEOUT_...` vars.
