/**
 * Browser Example: Lumera SDK with Keplr Wallet
 * 
 * This example demonstrates the full Lumera SDK workflow in a browser environment:
 * 1. Connect to Keplr wallet
 * 2. Create LumeraClient with Keplr signer
 * 3. Upload files to Cascade storage
 * 4. Download files from Cascade storage
 * 5. Display progress and results in the UI
 */

import {
  createLumeraClient,
  type LumeraClient,
  getKeplrSigner,
  isKeplrAvailable,
  createBatchedSignaturePrompter,
  createDefaultTxPrompter,
  CHAIN_PRESETS,
} from "@lumera-protocol/sdk-js";


const presetName = "testnet";
//const presetName = "mainnet";
const preset = CHAIN_PRESETS[presetName];

// ============================================================================
// State Management
// ============================================================================

interface AppState {
  client: LumeraClient | null;
  address: string | null;
  lastActionId: string | null;
  selectedFile: File | null;
  // Minimal signer + sn-api info for auxiliary calls (e.g. resolving download links)
  signer: {
    signArbitrary: (chainId: string, signerAddress: string, data: string) => Promise<{ signature: string }>;
  } | null;
}

const state: AppState = {
  client: null,
  address: null,
  lastActionId: null,
  selectedFile: null,
  signer: null,
};

// ============================================================================
// DOM Elements
// ============================================================================

const elements = {
  connectBtn: document.getElementById("connect-btn") as HTMLButtonElement,
  disconnectBtn: document.getElementById("disconnect-btn") as HTMLButtonElement,
  walletInfo: document.getElementById("wallet-info") as HTMLDivElement,
  fileInput: document.getElementById("file-input") as HTMLInputElement,
  fileName: document.getElementById("file-name") as HTMLDivElement,
  uploadBtn: document.getElementById("upload-btn") as HTMLButtonElement,
  downloadBtn: document.getElementById("download-btn") as HTMLButtonElement,
  downloadActionIdInput: document.getElementById("download-action-id-input") as HTMLInputElement,
  downloadByIdBtn: document.getElementById("download-by-id-btn") as HTMLButtonElement,
  logContainer: document.getElementById("log-container") as HTMLDivElement,
  uploadProgress: document.getElementById("upload-progress") as HTMLDivElement,
  uploadProgressFill: document.getElementById("upload-progress-fill") as HTMLDivElement,
  downloadProgress: document.getElementById("download-progress") as HTMLDivElement,
  downloadProgressFill: document.getElementById("download-progress-fill") as HTMLDivElement,
  signaturePrompts: document.getElementById("signing-prompts") as HTMLDivElement,
};

// ============================================================================
// Logging Utilities
// ============================================================================

type LogLevel = "info" | "success" | "error" | "warning";

function log(message: string, level: LogLevel = "info") {
  const timestamp = new Date().toLocaleTimeString();
  const entry = document.createElement("div");
  entry.className = `log-entry ${level}`;
  entry.textContent = `[${timestamp}] ${message}`;
  elements.logContainer.appendChild(entry);
  elements.logContainer.scrollTop = elements.logContainer.scrollHeight;
  console.log(`[${level.toUpperCase()}] ${message}`);
}

function clearLogs() {
  elements.logContainer.innerHTML = "";
}

// Create a batched signature prompter to improve UX by requiring
// only a single user gesture for all three signatures (layout, index, auth)
const keplrSignaturePrompter = createBatchedSignaturePrompter();

// Create a transaction prompter to ensure transaction submission has its own user gesture
const keplrTxPrompter = createDefaultTxPrompter();

// ============================================================================
// Progress Bar Utilities
// ============================================================================

function showProgress(type: "upload" | "download", progress: number) {
  const progressBar = type === "upload" ? elements.uploadProgress : elements.downloadProgress;
  const progressFill = type === "upload" ? elements.uploadProgressFill : elements.downloadProgressFill;

  progressBar.classList.add("active");
  progressFill.style.width = `${progress}%`;
}

function hideProgress(type: "upload" | "download") {
  const progressBar = type === "upload" ? elements.uploadProgress : elements.downloadProgress;
  const progressFill = type === "upload" ? elements.uploadProgressFill : elements.downloadProgressFill;

  progressBar.classList.remove("active");
  progressFill.style.width = "0%";
}

// ============================================================================
// UI Update Functions
// ============================================================================

function updateWalletUI(connected: boolean) {
  if (connected && state.address) {
    const statusIndicator = elements.walletInfo.querySelector(".status-indicator");
    if (statusIndicator) {
      statusIndicator.className = "status-indicator connected";
    }

    const shortAddress = `${state.address.slice(0, 12)}...${state.address.slice(-8)}`;
    elements.walletInfo.innerHTML = `
      <span class="status-indicator connected"></span>
      <strong>Connected:</strong> ${shortAddress}
    `;

    elements.connectBtn.style.display = "none";
    elements.disconnectBtn.style.display = "inline-block";
    elements.uploadBtn.disabled = !state.selectedFile;
    elements.downloadBtn.disabled = !state.lastActionId;
    elements.downloadByIdBtn.disabled = false;
  } else {
    elements.walletInfo.innerHTML = `
      <span class="status-indicator disconnected"></span>
      <strong>Status:</strong> Not connected
    `;

    elements.connectBtn.style.display = "inline-block";
    elements.connectBtn.disabled = false;
    elements.disconnectBtn.style.display = "none";
    elements.uploadBtn.disabled = true;
    elements.downloadBtn.disabled = true;
    elements.downloadByIdBtn.disabled = true;
  }
}

// ============================================================================
// Wallet Connection
// ============================================================================

async function connectWallet() {
  try {
    log("Checking for Keplr wallet...", "info");

    if (!isKeplrAvailable()) {
      log("Keplr wallet not found!", "error");
      alert("Please install the Keplr browser extension from https://www.keplr.app/");
      return;
    }

    log("Connecting to Keplr...", "info");
    elements.connectBtn.disabled = true;

    const anyWindow = window as any;
    const keplr = anyWindow?.keplr;

    if (!keplr) {
      throw new Error("Keplr extension not found on window. Make sure the extension is installed and enabled.");
    }

    // Mirror the working keplr-test flow: first enable the chain in Keplr
    await keplr.enable(preset.chainId);
    // await keplr.enable("lumera-devnet-1");

    // Get Keplr-based UniversalSigner (wraps the same offline signer)
    const signer = await getKeplrSigner(preset.chainId);
    // const signer = await getKeplrSigner("lumera-devnet-1");
    const accounts = await signer.getAccounts();

    if (accounts.length === 0) {
      throw new Error("No accounts found in Keplr wallet");
    }

    state.address = accounts[0].address;
    state.signer = signer;
    log(`Connected to address: ${state.address}`, "success");

    // Create LumeraClient with Keplr signer
    log("Initializing Lumera client...", "info");
    state.client = await createLumeraClient({
      preset: presetName,
      // chainId: "lumera-devnet-1",
      // rpcUrl: "https://rpc.pastel.network",
      // lcdUrl: "https://lcd.pastel.network",
      // snapiUrl: "https://lcd.pastel.network",
      signer,
      address: state.address!,
      gasPrice: "0.025ulume",
      http: {
        timeout: 45000,
        maxRetries: 3,
      },
    });

    log("✓ Lumera client initialized successfully", "success");

    // Query blockchain information
    const chainId = await state.client.Blockchain.getChainId();
    log(`Chain ID: ${chainId}`, "info");

    updateWalletUI(true);

  } catch (error) {
    log(`Connection failed: ${error instanceof Error ? error.message : String(error)}`, "error");
    console.error("Connection error:", error);
    elements.connectBtn.disabled = false;
  }
}

function disconnectWallet() {
  log("Disconnecting wallet...", "info");
  state.client = null;
  state.address = null;
  state.lastActionId = null;
  state.signer = null;
  updateWalletUI(false);
  log("Wallet disconnected", "success");
}

// ============================================================================
// File Upload
// ============================================================================

async function uploadFile() {
  if (!state.client || !state.selectedFile) {
    log("No wallet connected or file selected", "error");
    return;
  }

  try {
    elements.uploadBtn.disabled = true;
    elements.signaturePrompts.innerHTML = "";
    showProgress("upload", 0);

    log(`Starting upload: ${state.selectedFile.name} (${state.selectedFile.size} bytes)`, "info");

    // Read file as ArrayBuffer
    const fileBuffer = await state.selectedFile.arrayBuffer();
    const fileBytes = new Uint8Array(fileBuffer);

    showProgress("upload", 20);
    log("File loaded into memory", "info");

    // Calculate expiration time (default to 24 hours from now)
    // Date.now() returns milliseconds, convert to seconds
    const expirationTime = Math.floor(Date.now() / 1000 + 86400 * 1.5).toString();

    const uploader = state.client.Cascade.uploader;

    // Step 1: Prepare file (hash + bytes)
    log("Preparing file for upload (hashing)...", "info");
    const prepared = await uploader.prepareFile(fileBytes);
    log(`File hash (BLAKE3, Base64): ${prepared.dataHash}`, "info");

    // Step 2: Register action on-chain (generates LEP-1 layout + index and actionId)
    log("Registering Cascade action on blockchain (wallet signatures required)...", "info");
    const registered = await uploader.registerAction(prepared, {
      fileName: state.selectedFile.name,
      isPublic: false,
      expirationTime,
      signaturePrompter: keplrSignaturePrompter,
      txPrompter: keplrTxPrompter,
    });

    state.lastActionId = registered.actionId;

    log(`Action registered with ID: ${registered.actionId}`, "success");

    // Step 3: Upload file bytes to Cascade supernodes
    log("Uploading file to Cascade storage via sn-api...", "info");
    const uploadTask = await uploader.sendFileToSupernodes(
      registered.actionId,
      registered.authSignature,
      fileBytes,
      {
        taskOptions: {
          pollInterval: 2000,
          timeout: 300000,
        },
      }
    );

    showProgress("upload", 100);

    const rawTask: any = uploadTask as any;
    const resolvedTaskId =
      rawTask?.taskId ?? rawTask?.task_id ?? rawTask?.id ?? null;

    if (resolvedTaskId) {
      log(`✓ Upload completed! Task ID: ${resolvedTaskId}`, "success");
    } else {
      log(
        "✓ Upload completed! (Task ID not available from sn-api response)",
        "success"
      );
    }

    // Enable download buttons
    elements.downloadBtn.disabled = false;
    elements.downloadByIdBtn.disabled = false;

    setTimeout(() => hideProgress("upload"), 2000);

  } catch (error) {
    log(`Upload failed: ${error instanceof Error ? error.message : String(error)}`, "error");
    console.error("Upload error:", error);
    hideProgress("upload");
    elements.signaturePrompts.innerHTML = "";
  } finally {
    elements.uploadBtn.disabled = false;
    elements.signaturePrompts.innerHTML = "";
  }
}

// ============================================================================
// File Download
// ============================================================================

async function downloadFileByActionId(actionId: string) {
  if (!state.client) {
    log("No wallet connected", "error");
    return;
  }

  if (!actionId) {
    log("No action ID provided to download", "error");
    return;
  }

  try {
    elements.downloadBtn.disabled = true;
    elements.downloadByIdBtn.disabled = true;
    showProgress("download", 0);

    log(`Starting download for action: ${actionId}`, "info");
    showProgress("download", 20);

    // Download from Cascade
    log("Requesting file from Cascade storage...", "info");
    const stream = await state.client.Cascade.downloader.download(actionId, {
      pollInterval: 2000,
      timeout: 300000,
    });

    showProgress("download", 60);
    log("Downloading file stream...", "info");

    // Read the stream
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      totalBytes += value.length;
      log(`Received chunk: ${value.length} bytes (total: ${totalBytes})`, "info");
    }

    showProgress("download", 80);

    // Combine chunks
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const downloadedBytes = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      downloadedBytes.set(chunk, offset);
      offset += chunk.length;
    }

    showProgress("download", 90);
    log(`✓ Download complete: ${totalLength} bytes`, "success");

    // Create a blob and download it
    const blob = new Blob([downloadedBytes]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `downloaded-${actionId}.bin`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showProgress("download", 100);
    log(`✓ File saved to browser downloads`, "success");

    // After sn-api has completed its internal download, resolve and log the
    // stable HTTP link that serves this file from sn-api itself. This keeps
    // the example closer to the intended flow: sn-api first fetches from
    // supernodes, then exposes the final file via its own download endpoint.
    try {
      log("Resolving sn-api download URL for this action...", "info");
      const downloadUrl = await resolveSnapiDownloadUrl(actionId);
      if (downloadUrl) {
        log(`sn-api download URL: ${downloadUrl}`, "success");
      } else {
        log("Could not resolve sn-api download URL for this action ID", "warning");
      }
    } catch (err) {
      log(
        `Failed to resolve sn-api download URL: ${err instanceof Error ? err.message : String(err)
        }`,
        "warning"
      );
    }

    setTimeout(() => hideProgress("download"), 2000);

  } catch (error) {
    log(`Download failed: ${error instanceof Error ? error.message : String(error)}`, "error");
    console.error("Download error:", error);
    hideProgress("download");
  } finally {
    elements.downloadBtn.disabled = !state.lastActionId;
    elements.downloadByIdBtn.disabled = false;
  }
}

/**
 * Resolve the stable sn-api URL that serves the downloaded file.
 *
 * Given an action ID, this queries the sn-api "list download tasks" endpoint:
 *   GET /api/v1/downloads/cascade/tasks?action_id=<actionId>
 *
 * and uses the newest task for that action to construct:
 *   GET /api/v1/downloads/cascade/{task_id}/file
 *
 * This keeps the example's behavior aligned with the intended flow:
 * sn-api completes the network download first, then exposes an HTTP-served file URL.
 */
async function resolveSnapiDownloadUrl(actionId: string): Promise<string | null> {
  try {
    const query = new URLSearchParams({ action_id: actionId });
    const response = await fetch(`${preset.snapiUrl}/api/v1/downloads/cascade/tasks?${query.toString()}`);
    if (!response.ok) {
      log(
        `sn-api download tasks query failed with status ${response.status}`,
        "warning"
      );
      return null;
    }

    const data: {
      requests?: Array<{ task_id?: string; action_id?: string }>;
      count?: number;
    } = await response.json();

    const requests = data.requests ?? [];
    if (requests.length === 0) {
      return null;
    }

    // Requests are ordered newest-first by the backend; use the first entry.
    const latest = requests[0];
    if (!latest.task_id) {
      return null;
    }

    return `${preset.snapiUrl}/api/v1/downloads/cascade/${encodeURIComponent(
      latest.task_id
    )}/file`;
  } catch (error) {
    // Let caller decide how to surface the failure; swallow here.
    console.error("Error resolving sn-api download URL", error);
    return null;
  }
}

async function downloadLastFile() {
  if (!state.lastActionId) {
    log("No last action ID available. Upload a file first or enter an action ID manually.", "error");
    return;
  }
  await downloadFileByActionId(state.lastActionId);
}

// ============================================================================
// Event Listeners
// ============================================================================

if (elements.connectBtn) {
  elements.connectBtn.addEventListener("click", connectWallet);
} else {
  console.error("Connect button element with id 'connect-btn' not found in DOM.");
}

if (elements.disconnectBtn) {
  elements.disconnectBtn.addEventListener("click", disconnectWallet);
}

if (elements.fileInput) {
  elements.fileInput.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      state.selectedFile = file;
      elements.fileName.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
      elements.uploadBtn.disabled = !state.client;
      log(`File selected: ${file.name}`, "info");
    } else {
      state.selectedFile = null;
      elements.fileName.textContent = "";
      elements.uploadBtn.disabled = true;
    }
  });
}

if (elements.uploadBtn) {
  elements.uploadBtn.addEventListener("click", uploadFile);
}

if (elements.downloadBtn) {
  elements.downloadBtn.addEventListener("click", () => {
    void downloadLastFile();
  });
}

if (elements.downloadByIdBtn && elements.downloadActionIdInput) {
  elements.downloadByIdBtn.addEventListener("click", () => {
    const actionId = elements.downloadActionIdInput.value.trim();
    if (!actionId) {
      log("Please enter an action ID to download.", "warning");
      return;
    }
    void downloadFileByActionId(actionId);
  });
}


// ============================================================================
// Initialization
// ============================================================================

log("Lumera SDK Browser Example loaded", "info");
log("Click 'Connect Keplr Wallet' to get started", "info");

// Check if Keplr is available
if (!isKeplrAvailable()) {
  log("⚠️ Keplr wallet not detected. Please install from https://www.keplr.app/", "warning");
}
