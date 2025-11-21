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
} from "@lumera-protocol/sdk-js";

// ============================================================================
// State Management
// ============================================================================

interface AppState {
  client: LumeraClient | null;
  address: string | null;
  lastActionId: string | null;
  selectedFile: File | null;
}

const state: AppState = {
  client: null,
  address: null,
  lastActionId: null,
  selectedFile: null,
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
    
    // Get Keplr signer (this will prompt the user to connect)
    const signer = await getKeplrSigner("lumera-testnet-2");
    const accounts = await signer.getAccounts();
    
    if (accounts.length === 0) {
      throw new Error("No accounts found in Keplr wallet");
    }
    
    state.address = accounts[0].address;
    log(`Connected to address: ${state.address}`, "success");
    
    // Create LumeraClient with Keplr signer
    log("Initializing Lumera client...", "info");
    state.client = await createLumeraClient({
      chainId: "lumera-testnet-2",
      rpcUrl: "https://rpc.testnet.lumera.io",
      lcdUrl: "https://lcd.testnet.lumera.io",
      // snapiUrl: "https://sn-api.testnet.lumera.io",

      // chainId: "lumera-devnet-1",
      // rpcUrl: "https://rpc.pastel.network",
      // lcdUrl: "https://lcd.pastel.network",
      snapiUrl: "http://localhost:3100",
      //snapiUrl: "http://localhost:3000",

      // preset: "testnet",
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
  
    // Upload to Cascade
    log("Uploading to Cascade storage...", "info");
    const uploadResult = await state.client.Cascade.uploader.uploadFile(fileBytes, {
      fileName: state.selectedFile.name,
      isPublic: false,
      expirationTime: expirationTime,
      taskOptions: {
        pollInterval: 2000,
        timeout: 300000,
      },
      signaturePrompter: keplrSignaturePrompter,
      txPrompter: keplrTxPrompter,
    });
    
    showProgress("upload", 100);
    
    log(`✓ Upload completed! Task ID: ${uploadResult.taskId}`, "success");
    log(`Status: ${uploadResult.status}`, "success");
    
    // Enable download button
    elements.downloadBtn.disabled = false;
    
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

async function downloadFile() {
  if (!state.client || !state.lastActionId) {
    log("No wallet connected or no file to download", "error");
    return;
  }
  
  try {
    elements.downloadBtn.disabled = true;
    showProgress("download", 0);
    
    log(`Starting download: ${state.lastActionId}`, "info");
    showProgress("download", 20);
    
    // Download from Cascade
    log("Requesting file from Cascade storage...", "info");
    const stream = await state.client.Cascade.downloader.download(state.lastActionId, {
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
    a.download = `downloaded-${state.lastActionId}.bin`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showProgress("download", 100);
    log(`✓ File saved to downloads`, "success");
    
    setTimeout(() => hideProgress("download"), 2000);
    
  } catch (error) {
    log(`Download failed: ${error instanceof Error ? error.message : String(error)}`, "error");
    console.error("Download error:", error);
    hideProgress("download");
  } finally {
    elements.downloadBtn.disabled = false;
  }
}

// ============================================================================
// Event Listeners
// ============================================================================

elements.connectBtn.addEventListener("click", connectWallet);
elements.disconnectBtn.addEventListener("click", disconnectWallet);

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

elements.uploadBtn.addEventListener("click", uploadFile);
elements.downloadBtn.addEventListener("click", downloadFile);

// ============================================================================
// Initialization
// ============================================================================

log("Lumera SDK Browser Example loaded", "info");
log("Click 'Connect Keplr Wallet' to get started", "info");

// Check if Keplr is available
if (!isKeplrAvailable()) {
  log("⚠️ Keplr wallet not detected. Please install from https://www.keplr.app/", "warning");
}