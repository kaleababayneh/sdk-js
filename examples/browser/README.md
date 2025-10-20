# Browser Example

This example demonstrates the full Lumera SDK workflow in a browser environment with Keplr wallet integration.

## Overview

This interactive web application showcases:
- **Keplr Wallet Connection**: Seamless integration with the Keplr browser extension
- **Blockchain Queries**: Real-time queries to the Lumera testnet
- **File Upload**: Upload files to Cascade distributed storage
- **File Download**: Download and verify files from Cascade storage
- **Progress Tracking**: Visual feedback for all operations
- **Activity Logging**: Real-time activity log for debugging and transparency

## Prerequisites

1. **Node.js 18+** - Required for building the example
2. **Keplr Browser Extension** - Install from [keplr.app](https://www.keplr.app/)
3. **Lumera Testnet Tokens** - Ensure your Keplr wallet has testnet LUME tokens

## Installation

1. Navigate to the browser example directory:
   ```bash
   cd examples/browser
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Example

Start the development server:

```bash
npm run dev
```

This will:
- Build the application with Vite
- Start a local development server (typically at `http://localhost:3000`)
- Automatically open your browser

## Using the Application

### Step 1: Connect Your Wallet

1. Click the **"Connect Keplr Wallet"** button
2. Keplr will prompt you to approve the connection
3. Once connected, your address will be displayed
4. The application will automatically query blockchain parameters

### Step 2: Upload a File

1. Click **"Choose a file to upload"** to select a file from your computer
2. The file name and size will be displayed
3. Click **"Upload to Cascade"** to start the upload
4. Progress will be shown with a progress bar
5. When complete, a unique action ID will be assigned to your file

### Step 3: Download the File

1. After uploading, click **"Download Last Uploaded File"**
2. The file will be downloaded from Cascade storage
3. Progress will be tracked and displayed
4. The file will be saved to your downloads folder

### Activity Log

The activity log at the bottom of the page shows:
- ℹ️ **Info** messages (blue) - General operations
- ✓ **Success** messages (green) - Completed operations
- ⚠️ **Warning** messages (yellow) - Important notices
- ✗ **Error** messages (red) - Failed operations

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory and can be deployed to any static hosting service.

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
examples/browser/
├── index.html         # Main HTML file with UI structure
├── main.ts           # TypeScript application logic
├── package.json      # Dependencies and scripts
├── vite.config.ts    # Vite build configuration
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file
```

## Code Architecture

### State Management

The application maintains state for:
- **client**: LumeraClient instance
- **address**: Connected wallet address
- **chainId**: Target blockchain network
- **lastActionId**: Most recent upload action ID
- **selectedFile**: File selected for upload

### Key Functions

#### `connectWallet()`
- Checks for Keplr availability
- Requests wallet connection
- Creates LumeraClient with Keplr signer
- Queries blockchain parameters

#### `uploadFile()`
- Reads selected file as ArrayBuffer
- Generates unique action ID
- Uploads to Cascade storage via SDK
- Tracks progress and displays results

#### `downloadFile()`
- Requests file from Cascade storage
- Streams file chunks
- Combines chunks into complete file
- Triggers browser download

### UI Updates

The application provides real-time feedback through:
- Status indicators (connected/disconnected)
- Progress bars for uploads and downloads
- Activity log with color-coded messages
- Button state management based on application state

## Common Issues

### "Keplr extension not found"

**Solution**: Install the Keplr browser extension from [keplr.app](https://www.keplr.app/)

### Connection timeout or network errors

**Solutions**:
- Check your internet connection
- Verify the Lumera testnet is operational
- Try increasing timeout values in `main.ts`:
  ```typescript
  http: {
    timeout: 60000,  // Increase to 60 seconds
    maxRetries: 5,   // Increase retry attempts
  }
  ```

### "Insufficient funds" errors

**Solution**: Request testnet tokens from the Lumera faucet. Your wallet needs LUME tokens to pay for transaction fees.

### Upload or download fails

**Troubleshooting steps**:
1. Check the activity log for specific error messages
2. Verify your wallet is still connected
3. Ensure the file size is reasonable (< 10MB for testing)
4. Try with a smaller file first
5. Check browser console for detailed error messages

### Keplr doesn't prompt for connection

**Solutions**:
- Refresh the page and try again
- Check if Keplr is locked (unlock it)
- Disable other wallet extensions that might interfere
- Clear browser cache and cookies

## Development Tips

### Enabling Source Maps

Source maps are enabled by default in `vite.config.ts` for easier debugging:

```typescript
build: {
  sourcemap: true,
}
```

### Hot Module Replacement (HMR)

Vite provides automatic HMR - changes to `main.ts` will instantly reflect in the browser without a full page reload.

### TypeScript Checking

To check for TypeScript errors without building:

```bash
npx tsc --noEmit
```

### Browser Console

Use the browser's developer console (F12) to see detailed logs and debug issues. All log messages are duplicated to the console.

## Understanding the Workflow

### 1. Wallet Connection Flow

```
User clicks "Connect"
    ↓
Check Keplr availability
    ↓
Request Keplr connection (user approves)
    ↓
Get account address
    ↓
Create LumeraClient with Keplr signer
    ↓
Query blockchain parameters
    ↓
Update UI with connection status
```

### 2. Upload Flow

```
User selects file
    ↓
Read file as ArrayBuffer
    ↓
Convert to Uint8Array
    ↓
Generate unique action ID
    ↓
Get blockchain parameters
    ↓
Call client.Cascade.uploader.uploadFile()
    ↓
Monitor upload progress
    ↓
Display completion status
```

### 3. Download Flow

```
User clicks "Download"
    ↓
Request download via action ID
    ↓
Get ReadableStream
    ↓
Read stream chunks
    ↓
Combine chunks into Uint8Array
    ↓
Create Blob from data
    ↓
Trigger browser download
```

## Security Considerations

- **Private Keys**: Never expose mnemonics or private keys in browser code
- **Signature Requests**: Always verify what you're signing in Keplr prompts
- **HTTPS**: Use HTTPS in production to protect wallet communications
- **CSP Headers**: Implement Content Security Policy headers for production

## Next Steps

- Explore the [Node.js Examples](../node/README.md) for CLI workflows
- Read the [SDK Documentation](../../README.md) for API reference
- Check the [test suite](../../tests/) for more usage patterns
- Try uploading different file types and sizes

## Support

For issues or questions:
- **GitHub Issues**: https://github.com/LumeraProtocol/sdk-js/issues
- **Documentation**: https://docs.lumera.io
- **Discord**: https://discord.gg/lumera