import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default Keplr extension ID for Chrome; can be overridden via env
const DEFAULT_KEPLR_EXTENSION_ID = "dmkamcknogkgcdfhhbddcghachkejeap";

// ---- Tunable timeouts (can be overridden via env) ----
const HTTP_STARTUP_TIMEOUT_MS = Number(
  process.env.E2E_TIMEOUT_HTTP_STARTUP_MS ?? 120_000,
);
const HTTP_PRECHECK_TIMEOUT_MS = Number(
  process.env.E2E_TIMEOUT_HTTP_PRECHECK_MS ?? 5_000,
);
const CONNECT_TIMEOUT_MS = Number(
  process.env.E2E_TIMEOUT_CONNECT_MS ?? 30_000,
);
const UPLOAD_WAIT_TIMEOUT_MS = Number(
  process.env.E2E_TIMEOUT_UPLOAD_MS ?? 120_000,
);
const DOWNLOAD_WAIT_TIMEOUT_MS = Number(
  process.env.E2E_TIMEOUT_DOWNLOAD_MS ?? 600_000,
);
const POST_UPLOAD_PAUSE_MS = Number(
  process.env.E2E_TIMEOUT_POST_UPLOAD_PAUSE_MS ?? 5_000,
);
const SIGNATURE_POLL_TIMEOUT_MS = Number(
  process.env.E2E_TIMEOUT_SIGNATURE_POLL_MS ?? 15_000,
);
const TX_MODAL_WATCH_TIMEOUT_MS = Number(
  process.env.E2E_TIMEOUT_TX_MODAL_MS ?? 60_000,
);
const POPUP_LOAD_TIMEOUT_MS = Number(
  process.env.E2E_TIMEOUT_POPUP_LOAD_MS ?? 30_000,
);
const POPUP_RENDER_DELAY_MS = Number(
  process.env.E2E_TIMEOUT_POPUP_RENDER_DELAY_MS ?? 2_000,
);
const POPUP_BUTTON_CLICK_TIMEOUT_MS = Number(
  process.env.E2E_TIMEOUT_POPUP_BUTTON_MS ?? 10_000,
);
const EXISTING_POPUP_BUTTON_CLICK_TIMEOUT_MS = Number(
  process.env.E2E_TIMEOUT_EXISTING_POPUP_BUTTON_MS ?? 5_000,
);

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHttp(url, timeoutMs, label) {
  const start = Date.now();
  while (true) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok) {
        console.log(`[e2e] ${label} is responding at ${url}`);
        return;
      }
    } catch {
      // ignore and retry
    }
    if (Date.now() - start > timeoutMs) {
      throw new Error(`[e2e] Timed out waiting for ${label} at ${url}`);
    }
    await wait(1000);
  }
}

async function main() {
  const repoRoot = path.resolve(__dirname, "..");
  const browserExampleRoot = path.resolve(repoRoot, "examples", "browser");

  const SNAPI_BIN = process.env.E2E_SNAPI_BIN || "";
  const SNAPI_URL = process.env.E2E_SNAPI_URL || "http://localhost:3000";
  const BROWSER_URL = process.env.E2E_BROWSER_URL || "http://localhost:3001";
  const CHROME_EXECUTABLE = process.env.E2E_CHROME_EXECUTABLE || "";
  const CHROME_PROFILE_DIR = process.env.E2E_CHROME_PROFILE_DIR || "";
  const CHROME_PROFILE_NAME = process.env.E2E_CHROME_PROFILE_NAME || "";

  if (!SNAPI_BIN) {
    console.error(
      "[e2e] E2E_SNAPI_BIN is not set. It must point to the sn-api-server binary (e.g. /full/path/to/snapi).",
    );
    process.exit(1);
  }

  const SNAPI_CWD = path.dirname(SNAPI_BIN);
  if (!fs.existsSync(SNAPI_BIN)) {
    console.error(
      "[e2e] SNAPI_BIN does not exist:",
      SNAPI_BIN,
    );
    console.error(
      "[e2e] Provide the full path to the sn-api-server binary via E2E_SNAPI_BIN,",
    );
    console.error(
      "[e2e] or place a built 'snapi' binary at that location.",
    );
    console.error("[e2e] Example: set E2E_SNAPI_BIN=/full/path/to/snapi");
    process.exit(1);
  }

  if (!CHROME_EXECUTABLE || !CHROME_PROFILE_DIR) {
    console.error(
      "[e2e] E2E_CHROME_EXECUTABLE and E2E_CHROME_PROFILE_DIR must be set to run the browser flow.",
    );
    if (CHROME_PROFILE_NAME) {
      console.error(
        `[e2e] Hint: You set E2E_CHROME_PROFILE_NAME='${CHROME_PROFILE_NAME}', but did not set E2E_CHROME_PROFILE_DIR.`,
      );
      console.error(
        "[e2e] Open Chrome with that profile, visit chrome://version, and copy the 'Profile Path' value into E2E_CHROME_PROFILE_DIR.",
      );
    }
    process.exit(1);
  }

  console.log("[e2e] Using configuration:");
  console.log(`  SNAPI_BIN          = ${SNAPI_BIN}`);
  console.log(`  SNAPI_URL          = ${SNAPI_URL}`);
  console.log(`  BROWSER_URL        = ${BROWSER_URL}`);
  console.log(`  CHROME_EXECUTABLE  = ${CHROME_EXECUTABLE}`);
  console.log(`  CHROME_PROFILE_DIR = ${CHROME_PROFILE_DIR}`);
  if (CHROME_PROFILE_NAME) {
    console.log(`  CHROME_PROFILE_NAME= ${CHROME_PROFILE_NAME}`);
  }

  /** @type {import("node:child_process").ChildProcess | null} */
  let snapiProc = null;
  /** @type {import("node:child_process").ChildProcess | null} */
  let devProc = null;
  /** @type {import("playwright").BrowserContext | null} */
  let context = null;
  /** @type {boolean} */
  let keplrConnectInProgress = false;
  /** @type {number} */
  let keplrApprovalCount = 0;

  // Watch for the SDK's "Transaction Confirmation" modal in the main page
  // and click "Confirm Transaction" when it appears. This runs in the
  // background while we are waiting for upload completion.
  async function watchTransactionModal(page) {
    const deadline = Date.now() + TX_MODAL_WATCH_TIMEOUT_MS;
    while (Date.now() < deadline) {
      try {
        const titleLocator = page
          .locator(".lumera-modal-title", {
            hasText: "Transaction Confirmation",
          })
          .first();
        const isVisible = await titleLocator.isVisible().catch(() => false);
        if (isVisible) {
          console.log(
            "[e2e] Detected 'Transaction Confirmation' modal; clicking Confirm Transaction...",
          );
          const confirmButton = page
            .locator(".lumera-modal-button-primary", {
              hasText: "Confirm Transaction",
            })
            .first();
          await confirmButton
            .click({
              timeout: POPUP_BUTTON_CLICK_TIMEOUT_MS,
            })
            .catch((e) => {
            console.warn(
              "[e2e] Failed to click 'Confirm Transaction' button:",
              e instanceof Error ? e.message : e,
            );
          });
          break;
        }
      } catch (e) {
        console.warn(
          "[e2e] Error while watching for 'Transaction Confirmation' modal:",
          e instanceof Error ? e.message : e,
        );
      }
      await page.waitForTimeout(1_000).catch(() => {});
    }
  }

  try {
    // 1) Ensure sn-api-server is up (either pre-running or started here)
    if (process.env.E2E_SKIP_SNAPI) {
      console.log("[e2e] Skipping sn-api-server startup (E2E_SKIP_SNAPI=1).");
      await waitForHttp(
        `${SNAPI_URL}/`,
        HTTP_STARTUP_TIMEOUT_MS,
        "sn-api-server",
      );
    } else {
      let snapiAlreadyRunning = false;
      try {
        await waitForHttp(
          `${SNAPI_URL}/`,
          HTTP_PRECHECK_TIMEOUT_MS,
          "sn-api-server (pre-check)",
        );
        snapiAlreadyRunning = true;
        console.log(
          "[e2e] Detected existing sn-api-server instance; will reuse it."
        );
      } catch {
        // Not responding yet; start our own instance.
      }

      if (!snapiAlreadyRunning) {
        console.log("[e2e] Starting sn-api-server...");
        snapiProc = spawn(SNAPI_BIN, ["serve"], {
          cwd: SNAPI_CWD,
          env: process.env,
          stdio: "inherit",
        });
        await waitForHttp(
          `${SNAPI_URL}/`,
          HTTP_STARTUP_TIMEOUT_MS,
          "sn-api-server",
        );
      }
    }

    // 2) Ensure browser dev server is up (either pre-running or started here)
    let browserDevAlreadyRunning = false;
    try {
      await waitForHttp(
        `${BROWSER_URL}/`,
        HTTP_PRECHECK_TIMEOUT_MS,
        "browser dev server (pre-check)",
      );
      browserDevAlreadyRunning = true;
      console.log(
        "[e2e] Detected existing browser dev server; will reuse it."
      );
    } catch {
      // Not responding yet; start our own dev server.
    }

    if (!browserDevAlreadyRunning) {
      console.log("[e2e] Starting browser example dev server (pnpm run dev)...");
      devProc = spawn("pnpm", ["run", "dev"], {
        cwd: browserExampleRoot,
        env: process.env,
        stdio: "inherit",
      });
      await waitForHttp(
        `${BROWSER_URL}/`,
        HTTP_STARTUP_TIMEOUT_MS,
        "browser dev server",
      );
    }

    // 3) Launch Chrome with the Keplr profile
    console.log("[e2e] Launching Chrome with existing profile...");
    context = await chromium.launchPersistentContext(CHROME_PROFILE_DIR, {
      headless: false,
      executablePath: CHROME_EXECUTABLE,
      // Allow extensions and avoid the automation flag so Keplr behaves
      // like in a normal user session.
      ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
    });

    // Auto-approve Keplr popups if present
  const autoApproveKeplr = process.env.E2E_KEPLR_AUTO_APPROVE !== "0";
  const keplrPassword = process.env.E2E_KEPLR_PASSWORD || "";
  const keplrExtensionId =
      process.env.E2E_KEPLR_EXTENSION_ID || DEFAULT_KEPLR_EXTENSION_ID;

  async function approveKeplrInExistingPopups(kindHint) {
    if (!autoApproveKeplr || !context) {
      return;
    }
    console.log(
      `[e2e] [keplr] Scanning existing pages for ${kindHint ?? "signature"} popup...`,
    );
    for (const popup of context.pages()) {
      try {
        const url = popup.url();
        if (!url.startsWith(`chrome-extension://${keplrExtensionId}`)) {
          continue;
        }
        console.log(
          `[e2e] [keplr] Found existing Keplr page for ${kindHint ?? "signature"}: ${url}`,
        );
        // Reuse the same logic as in the page event handler.
        await popup
          .waitForLoadState("domcontentloaded", {
            timeout: POPUP_LOAD_TIMEOUT_MS,
          })
          .catch(() => {});
        await popup
          .waitForTimeout(POPUP_RENDER_DELAY_MS)
          .catch(() => {});

        if (process.env.E2E_KEPLR_DEBUG === "1") {
          try {
            const html = await popup.content();
            const debugDir = path.resolve(__dirname, "..", "e2e-debug");
            fs.mkdirSync(debugDir, { recursive: true });
            const debugFile = path.resolve(
              debugDir,
              `keplr-popup-${Date.now()}-existing.html`,
            );
            fs.writeFileSync(debugFile, html, "utf8");
            console.log(
              `[e2e] [keplr] Wrote existing popup HTML to ${debugFile}`,
            );
          } catch (e) {
            console.warn(
              "[e2e] [keplr] Failed to dump existing popup HTML:",
              e instanceof Error ? e.message : e,
            );
          }
        }

        // Unlock if needed
        if (keplrPassword) {
          try {
            const pwInput = popup.locator('input[type="password"]');
            const pwCount = await pwInput.count();
            if (pwCount > 0) {
              console.log(
                "[e2e] [keplr] Filling password to unlock wallet (existing popup)...",
              );
              await pwInput
                .fill(keplrPassword, {
                  timeout: EXISTING_POPUP_BUTTON_CLICK_TIMEOUT_MS,
                })
                .catch(() => {});
              const unlockSelectors = [
                'button:has-text("Unlock")',
                'button:has-text("Sign In")',
                'button:has-text("Login")',
              ];
              for (const selector of unlockSelectors) {
                try {
                  const btn = await popup.locator(selector).first();
                  const cnt = await btn.count();
                  if (cnt > 0) {
                    console.log(
                      `[e2e] [keplr] Clicking ${selector} to unlock (existing popup)...`,
                    );
                    await btn.click({
                      timeout: EXISTING_POPUP_BUTTON_CLICK_TIMEOUT_MS,
                    });
                    break;
                  }
                } catch {
                  // try next unlock selector
                }
              }
            }
          } catch {
            // ignore unlock errors
          }
        }

        // Try clicking an approval-like button once.
        const buttons = popup.locator("button");
        const count = await buttons.count();
        console.log(
          `[e2e] [keplr] Existing popup has ${count} button(s) for ${kindHint ?? "signature"}.`,
        );
        for (let i = 0; i < count; i++) {
          const btn = buttons.nth(i);
          const text = (await btn.innerText().catch(() => "")) || "";
          console.log(
            `[e2e] [keplr] existing button[${i}] text='${text}'`,
          );
          if (/approve|connect|sign|confirm|next|get started/i.test(text)) {
            console.log(
              `[e2e] [keplr] Clicking existing button[${i}] with text='${text}'...`,
            );
            await btn.click({
              timeout: EXISTING_POPUP_BUTTON_CLICK_TIMEOUT_MS,
            });
            keplrApprovalCount += 1;
            console.log(
              `[e2e] [keplr] Total approvals clicked so far: ${keplrApprovalCount}`,
            );
            return;
          }
        }
      } catch (e) {
        console.warn(
          "[e2e] [keplr] Error while scanning existing popups:",
          e instanceof Error ? e.message : e,
        );
      }
    }
  }
    if (autoApproveKeplr) {
      console.log("[e2e] Enabling basic Keplr auto-approval handler...");
      context.on("page", async (popup) => {
        try {
          if (!keplrConnectInProgress) {
            // Ignore background/irrelevant popups when not in the connect flow.
            return;
          }
          console.log(
            "[e2e] [keplr] New popup page created, waiting for navigation...",
          );
          await popup
            .waitForLoadState("domcontentloaded", {
              timeout: POPUP_LOAD_TIMEOUT_MS,
            })
            .catch(() => {});

          const url = popup.url();
          const title = await popup.title().catch(() => "");
          console.log(`[e2e] [keplr] Popup navigated: url=${url} title=${title}`);

          // Heuristic: Keplr popups are extension pages or Keplr web UI
          if (
            url.startsWith(`chrome-extension://${keplrExtensionId}`) ||
            url.includes("keplr") ||
            url.includes("wallet")
          ) {
            // Give Keplr a moment to finish rendering its React UI.
            await popup
              .waitForTimeout(POPUP_RENDER_DELAY_MS)
              .catch(() => {});
            // Optional debug: dump popup HTML for inspection
            if (process.env.E2E_KEPLR_DEBUG === "1") {
              try {
                const html = await popup.content();
                const debugDir = path.resolve(__dirname, "..", "e2e-debug");
                fs.mkdirSync(debugDir, { recursive: true });
                const debugFile = path.resolve(
                  debugDir,
                  `keplr-popup-${Date.now()}.html`,
                );
                fs.writeFileSync(debugFile, html, "utf8");
                console.log(`[e2e] [keplr] Wrote popup HTML to ${debugFile}`);
              } catch (e) {
                console.warn(
                  "[e2e] [keplr] Failed to dump popup HTML:",
                  e instanceof Error ? e.message : e,
                );
              }
            }

            // If the wallet is locked and we have a password, try to unlock.
            if (keplrPassword) {
              try {
                const pwInput = popup.locator('input[type="password"]');
                const pwCount = await pwInput.count();
                if (pwCount > 0) {
                  console.log(
                    "[e2e] [keplr] Filling password to unlock wallet...",
                  );
                  await pwInput
                    .fill(keplrPassword, {
                      timeout: POPUP_BUTTON_CLICK_TIMEOUT_MS,
                    })
                    .catch(() => {});

                  const unlockSelectors = [
                    'button:has-text("Unlock")',
                    'button:has-text("Sign In")',
                    'button:has-text("Login")',
                  ];
                  for (const selector of unlockSelectors) {
                    try {
                      const btn = await popup.locator(selector).first();
                      const cnt = await btn.count();
                      if (cnt > 0) {
                        console.log(
                          `[e2e] [keplr] Clicking ${selector} to unlock...`,
                        );
                        await btn.click({
                          timeout: POPUP_BUTTON_CLICK_TIMEOUT_MS,
                        });
                        break;
                      }
                    } catch {
                      // Try next unlock selector
                    }
                  }
                }
              } catch {
                // Ignore errors during unlock attempt and continue to approval
              }
            }

            // Try, over a short window, to find and click an approval-like button.
            const approveDeadline = Date.now() + SIGNATURE_POLL_TIMEOUT_MS;
            while (Date.now() < approveDeadline) {
              try {
                if (popup.isClosed()) {
                  console.log(
                    "[e2e] [keplr] Popup page is closed; stopping approval polling.",
                  );
                  break;
                }

                const buttons = popup.locator("button");
                const count = await buttons.count();
                console.log(`[e2e] [keplr] Found ${count} button(s) in popup.`);
                let clicked = false;
                for (let i = 0; i < count; i++) {
                  const btn = buttons.nth(i);
                  const text = (await btn.innerText().catch(() => "")) || "";
                  console.log(`[e2e] [keplr] button[${i}] text='${text}'`);
                  if (/approve|connect|sign|confirm|next|get started/i.test(text)) {
                    console.log(
                      `[e2e] [keplr] Clicking button[${i}] with text='${text}'...`,
                    );
                    await btn.click({
                      timeout: POPUP_BUTTON_CLICK_TIMEOUT_MS,
                    });
                    keplrApprovalCount += 1;
                    console.log(
                      `[e2e] [keplr] Total approvals clicked so far: ${keplrApprovalCount}`,
                    );
                    clicked = true;
                    break;
                  }
                }
                if (clicked) {
                  break;
                }
              } catch (e) {
                const msg =
                  e instanceof Error ? e.message : String(e ?? "unknown error");
                console.warn(
                  "[e2e] [keplr] Error while scanning/clicking buttons:",
                  msg,
                );
                if (msg.includes("Target page, context or browser has been closed")) {
                  console.log(
                    "[e2e] [keplr] Popup page closed while polling; stopping.",
                  );
                  break;
                }
              }
              await popup.waitForTimeout(500).catch(() => {});
            }
          }
        } catch (err) {
          console.warn(
            "[e2e] [keplr] Error while handling popup:",
            err instanceof Error ? err.message : err,
          );
        }
      });
    }

    // Reuse the first existing page if present to avoid spawning
    // multiple top-level browser windows. This helps keep Keplr
    // unlock/approval prompts to a single window.
    let [page] = context.pages();
    if (!page) {
      page = await context.newPage();
    }

    // Mirror browser console logs to the e2e output so we can see
    // exactly which step the example reports (e.g. multiple signatures,
    // registerAction progress, upload completion).
    page.on("console", (msg) => {
      const text = msg.text();
      console.log(`[e2e][browser-console] ${msg.type()}: ${text}`);

      // If the SDK logs that a signature is being requested, proactively
      // scan existing Keplr popups in case the extension reused an
      // existing window instead of creating a new one.
      if (text.includes("CascadeUploader.uploadFile signature requested")) {
        if (text.includes("kind: layout")) {
          void approveKeplrInExistingPopups("layout");
        } else if (text.includes("kind: index")) {
          void approveKeplrInExistingPopups("index");
        } else if (text.includes("kind: auth")) {
          void approveKeplrInExistingPopups("auth");
        }
      }
    });

    // Start watching for the SDK transaction confirmation modal in the
    // background; it may appear later during the upload flow.
    const txModalWatcher = watchTransactionModal(page);

    console.log(`[e2e] Navigating to ${BROWSER_URL}...`);
    await page.goto(BROWSER_URL, { waitUntil: "networkidle" });

    const keplrAvailable = await page.evaluate(() => {
      return typeof window !== "undefined" && !!window.keplr;
    });
    console.log(`[e2e] keplrAvailable on page = ${keplrAvailable}`);
    if (!keplrAvailable) {
      throw new Error(
        "Keplr extension is not available on the test page (window.keplr is undefined). " +
          "Ensure the selected Chrome profile has Keplr installed and enabled."
      );
    }

    // 4) Connect wallet (Keplr unlock/approval via popup)
    console.log("[e2e] Clicking 'Connect Keplr Wallet'...");
    keplrConnectInProgress = true;
    await page.click("#connect-btn");

    console.log(
      "[e2e] Waiting for wallet to show as connected (Keplr unlock/approval)..."
    );
    await page.getByText("Connected:").waitFor({ timeout: CONNECT_TIMEOUT_MS });
    console.log("[e2e] Wallet appears connected.");

    // 5) Select a test file
    const testFilePath = path.resolve(
      browserExampleRoot,
      "test-assets",
      "hello-lep1.txt"
    );
    console.log(`[e2e] Setting file input to ${testFilePath}...`);
    await page.setInputFiles("#file-input", testFilePath);
    await page.waitForSelector("#upload-btn:not(:disabled)", {
      timeout: HTTP_STARTUP_TIMEOUT_MS,
    });

    // 6) Upload file (user will confirm signatures / tx in Keplr)
    console.log("[e2e] Clicking 'Upload to Cascade'...");
    await page.click("#upload-btn");

    // Handle the SDK's own "Multiple Signatures Required" modal in the page
    // before expecting Keplr popups. This is the first step in the batched
    // signature prompter.
    try {
      const modalTitle = page
        .locator(".lumera-modal-title", { hasText: "Multiple Signatures Required" })
        .first();
      await modalTitle.waitFor({ timeout: 5_000 });
      console.log(
        "[e2e] Detected 'Multiple Signatures Required' modal; clicking Continue...",
      );
      const continueButton = page
        .locator(".lumera-modal-button-primary", { hasText: "Continue" })
        .first();
      await continueButton.click({ timeout: 5_000 });
    } catch {
      console.log(
        "[e2e] 'Multiple Signatures Required' modal not detected within 5s; continuing...",
      );
    }

    console.log(
      "[e2e] Waiting for upload completion log (Keplr signatures + tx + sn-api)..."
    );
    // Use a moderate timeout here so we can iterate quickly; on a real
    // run you can bump this higher if needed.
    await page
      .locator(".log-entry.success", { hasText: "Upload completed" })
      .first()
      .waitFor({ timeout: UPLOAD_WAIT_TIMEOUT_MS });
    console.log("[e2e] Upload completed.");

    // 7) Download last uploaded file
    console.log(
      "[e2e] Waiting 5s after upload completion before starting download (allow sn-api state to settle)...",
    );
    await page.waitForTimeout(POST_UPLOAD_PAUSE_MS);

    await page.waitForSelector("#download-btn:not(:disabled)", {
      timeout: HTTP_STARTUP_TIMEOUT_MS,
    });
    console.log("[e2e] Clicking 'Download Last Uploaded File'...");
    await page.click("#download-btn");

    console.log(
      "[e2e] Waiting for download completion log (approve download signature in Keplr if prompted)..."
    );
    await page
      .locator(".log-entry.success", {
        hasText: "File saved to browser downloads",
      })
      .first()
      .waitFor({ timeout: DOWNLOAD_WAIT_TIMEOUT_MS });
    console.log("[e2e] Download completed and file saved.");

    console.log("[e2e] SUCCESS: Full browser flow completed.");
    process.exitCode = 0;
  } catch (err) {
    console.error("[e2e] ERROR:", err instanceof Error ? err.message : err);
    process.exitCode = 1;
  } finally {
    console.log("[e2e] Cleaning up...");
    if (context) {
      await context.close();
    }
    if (devProc) {
      devProc.kill("SIGTERM");
    }
    if (snapiProc) {
      snapiProc.kill("SIGTERM");
    }
  }
}

main().catch((err) => {
  console.error("[e2e] Unhandled error:", err);
  process.exit(1);
});
