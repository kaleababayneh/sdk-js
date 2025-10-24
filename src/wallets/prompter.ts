/**
 * Default Signature Prompter for Keplr and other wallets
 * 
 * This module provides a default UI-based signature prompter that handles
 * the user gesture requirement for wallets like Keplr. It dynamically injects
 * a prompt UI, waits for user confirmation, then triggers the signature request.
 */

import type { SignaturePrompter, SignaturePromptContext } from '../cascade/uploader';

/**
 * CSS styles for the signature prompt modal UI
 */
const PROMPT_STYLES = `
.lumera-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  padding: 20px;
  animation: lumera-fade-in 0.2s ease-out;
}

@keyframes lumera-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.lumera-modal-dialog {
  background: #1a212e;
  border: 1px solid #2a323f;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: lumera-slide-up 0.3s ease-out;
}

@keyframes lumera-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.lumera-modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #2a323f;
}

.lumera-modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.4;
}

.lumera-modal-body {
  padding: 24px;
}

.lumera-modal-message {
  margin: 0;
  color: #d1d5db;
  font-size: 14px;
  line-height: 1.6;
}

.lumera-modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #2a323f;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.lumera-modal-button {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
  min-width: 80px;
}

.lumera-modal-button-primary {
  background: #078A8A;
  color: #ffffff;
}

.lumera-modal-button-primary:hover:not(:disabled) {
  background: #47C78A;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(7, 138, 138, 0.4);
}

.lumera-modal-button-primary:active:not(:disabled) {
  transform: translateY(0);
}

.lumera-modal-button-secondary {
  background: #394150;
  color: #ffffff;
  border: 1px solid #2a323f;
}

.lumera-modal-button-secondary:hover:not(:disabled) {
  background: #001432;
  border-color: #2a323f;
}

.lumera-modal-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Responsive design for smaller screens */
@media (max-width: 640px) {
  .lumera-modal-dialog {
    max-width: 100%;
    margin: 0;
    border-radius: 12px 12px 0 0;
    align-self: flex-end;
  }
  
  .lumera-modal-footer {
    flex-direction: column-reverse;
  }
  
  .lumera-modal-button {
    width: 100%;
  }
}
`;

/**
 * Describes the signature kind in human-readable format
 */
function describeSignatureKind(kind: SignaturePromptContext["kind"]): string {
  switch (kind) {
    case "layout":
      return "layout file";
    case "index":
      return "index file";
    case "auth":
      return "file authorization";
    default:
      return "signature";
  }
}

/**
 * Injects CSS styles into the document if not already present
 */
function injectStyles(): void {
  const styleId = 'lumera-signature-prompt-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = PROMPT_STYLES;
    document.head.appendChild(style);
  }
}

/**
 * Default signature prompter that creates a modal dialog
 *
 * This function creates a modal prompt that requests user confirmation
 * before triggering the wallet signature request. This is necessary for wallets
 * like Keplr that require signature requests to originate from explicit user gestures.
 *
 * The prompter:
 * 1. Injects necessary CSS styles
 * 2. Creates a modal overlay with a centered dialog containing Sign and Cancel buttons
 * 3. Waits for user interaction (button click or overlay click)
 * 4. Triggers the signature request on confirmation
 * 5. Cleans up the modal from the DOM after completion or cancellation
 *
 * The modal is centered on the screen with a semi-transparent overlay. Clicking
 * the overlay or Cancel button will reject the signature request. The modal is
 * responsive and works well on different screen sizes.
 *
 * @param containerSelector - (Optional, deprecated) Previously used to specify a container.
 *                            Now ignored as the modal is always appended to the body.
 * @returns A SignaturePrompter function
 *
 * @example
 * ```typescript
 * const uploader = new CascadeUploader(...);
 *
 * await uploader.uploadFile(fileBytes, {
 *   fileName: 'example.txt',
 *   expirationTime: '...',
 *   signaturePrompter: createDefaultSignaturePrompter()
 * });
 * ```
 */
export function createDefaultSignaturePrompter(
  containerSelector?: string
): SignaturePrompter {
  return async (context, signAction) => {
    // Inject styles on first use
    injectStyles();

    return new Promise((resolve, reject) => {
      // Create modal overlay
      const overlay = document.createElement("div");
      overlay.className = "lumera-modal-overlay";

      // Create modal dialog
      const dialog = document.createElement("div");
      dialog.className = "lumera-modal-dialog";

      // Create modal header
      const header = document.createElement("div");
      header.className = "lumera-modal-header";

      const title = document.createElement("h2");
      title.className = "lumera-modal-title";
      title.textContent = "Signature Required";
      header.appendChild(title);

      // Create modal body
      const body = document.createElement("div");
      body.className = "lumera-modal-body";

      const message = document.createElement("p");
      message.className = "lumera-modal-message";
      message.textContent = `Please authorize signing of the ${describeSignatureKind(context.kind)} in your wallet to continue.`;
      body.appendChild(message);

      // Create modal footer
      const footer = document.createElement("div");
      footer.className = "lumera-modal-footer";

      const cancelButton = document.createElement("button");
      cancelButton.type = "button";
      cancelButton.className = "lumera-modal-button lumera-modal-button-secondary";
      cancelButton.textContent = "Cancel";

      const signButton = document.createElement("button");
      signButton.type = "button";
      signButton.className = "lumera-modal-button lumera-modal-button-primary";
      signButton.textContent = `Sign ${describeSignatureKind(context.kind)}`;

      footer.appendChild(cancelButton);
      footer.appendChild(signButton);

      // Assemble modal
      dialog.appendChild(header);
      dialog.appendChild(body);
      dialog.appendChild(footer);
      overlay.appendChild(dialog);

      const cleanup = () => {
        if (overlay.parentElement) {
          overlay.style.opacity = '0';
          setTimeout(() => {
            if (overlay.parentElement) {
              overlay.parentElement.removeChild(overlay);
            }
          }, 200);
        }
      };

      const handleCancel = () => {
        cancelButton.disabled = true;
        signButton.disabled = true;
        cleanup();
        reject(new Error("User cancelled signature prompt"));
      };

      // Handle sign button click
      signButton.addEventListener("click", () => {
        if (signButton.disabled) {
          return;
        }

        signButton.disabled = true;
        cancelButton.disabled = true;
        signButton.textContent = "Signing...";

        (async () => {
          try {
            const result = await signAction();
            cleanup();
            resolve(result);
          } catch (error) {
            cleanup();
            reject(error);
          }
        })();
      });

      // Handle cancel button click
      cancelButton.addEventListener("click", handleCancel);

      // Handle overlay click (clicking outside the dialog)
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          handleCancel();
        }
      });

      // Handle Escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleCancel();
          document.removeEventListener("keydown", handleKeyDown);
        }
      };
      document.addEventListener("keydown", handleKeyDown);

      // Append to body and focus sign button
      document.body.appendChild(overlay);
      signButton.focus();
    });
  };
}

/**
 * Alias for createDefaultSignaturePrompter for backwards compatibility
 */
export const defaultSignaturePrompter = createDefaultSignaturePrompter();