/**
 * Keplr wallet adapter.
 * 
 * This module provides integration with the Keplr browser extension wallet,
 * supporting both on-chain transaction signing (via CosmJS OfflineSigner)
 * and off-chain message signing (via ADR-036 signArbitrary).
 * 
 * @module wallets/keplr
 */

import type { AminoSignResponse } from "@cosmjs/amino";
import type { AccountData, DirectSignResponse } from "@cosmjs/proto-signing";
import type { SignDoc } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import type { UniversalSigner, ArbitrarySignResponse } from "./signer.js";

/**
 * Keplr wallet interface exposed on window.keplr.
 */
export interface KeplrWallet {
  enable(chainId: string): Promise<void>;
  getOfflineSigner(chainId: string): any;
  getOfflineSignerAuto(chainId: string): Promise<any>;
  signArbitrary(
    chainId: string,
    signer: string,
    data: string | Uint8Array
  ): Promise<{
    signature: string;
    pub_key: {
      type: string;
      value: string;
    };
  }>;
}

declare global {
  interface Window {
    keplr?: KeplrWallet;
  }
}

/**
 * Detect if Keplr wallet is available in the browser.
 *
 * Checks for the presence of the Keplr extension by looking for
 * `window.keplr`. This should be called before attempting to connect
 * to ensure the user has Keplr installed.
 *
 * @returns True if Keplr is detected, false otherwise
 *
 * @example
 * ```typescript
 * if (!isKeplrAvailable()) {
 *   alert("Please install Keplr extension");
 *   return;
 * }
 * ```
 */
export function isKeplrAvailable(): boolean {
  const hasWindow = typeof window !== "undefined";
  const provider = hasWindow ? window.keplr : undefined;
  const available = provider !== undefined;

  console.debug("keplr availability check", {
    hasWindow,
    available,
    hasSignArbitrary: typeof provider?.signArbitrary === "function",
    hasGetOfflineSignerAuto: typeof provider?.getOfflineSignerAuto === "function",
  });

  return hasWindow && available;
}

/**
 * Get Keplr wallet instance.
 * 
 * @returns Keplr wallet interface
 * @throws {Error} If Keplr is not available
 */
function getKeplrWallet(): KeplrWallet {
  if (!isKeplrAvailable()) {
    throw new Error(
      "Keplr extension not found. Please install Keplr from https://www.keplr.app/"
    );
  }
  return (window as any).keplr;
}

/**
 * Keplr signer adapter implementing UniversalSigner.
 * 
 * This class wraps Keplr's native signer with the UniversalSigner interface,
 * providing a consistent API for both transaction signing and off-chain
 * message signing via ADR-036.
 */
class KeplrSigner implements UniversalSigner {
  private readonly keplr: KeplrWallet;
  private readonly chainId: string;
  private readonly signer: any;

  /**
   * Create a new Keplr signer adapter.
   * 
   * @param keplr - Keplr wallet instance
   * @param chainId - Chain identifier
   * @param signer - CosmJS OfflineSigner from Keplr
   */
  constructor(keplr: KeplrWallet, chainId: string, signer: any) {
    this.keplr = keplr;
    this.chainId = chainId;
    this.signer = signer;
  }

  async getAccounts(): Promise<readonly AccountData[]> {
    return this.signer.getAccounts();
  }

  async signAmino(signerAddress: string, signDoc: any): Promise<AminoSignResponse> {
    if (!this.signer.signAmino) {
      throw new Error("Amino signing not supported by this Keplr signer");
    }
    return this.signer.signAmino(signerAddress, signDoc);
  }

  async signDirect(signerAddress: string, signDoc: SignDoc): Promise<DirectSignResponse> {
    if (!this.signer.signDirect) {
      throw new Error("Direct signing not supported by this Keplr signer");
    }
    return this.signer.signDirect(signerAddress, signDoc);
  }

  async signArbitrary(
    chainId: string,
    signerAddress: string,
    data: string
  ): Promise<ArbitrarySignResponse> {
    // Keplr's signArbitrary returns a slightly different format
    const result = await this.keplr.signArbitrary(chainId, signerAddress, data);
    
    return {
      signed: data, // Keplr doesn't modify the data
      signature: result.signature,
      pub_key: result.pub_key,
    };
  }
}

/**
 * Get a UniversalSigner from Keplr for the specified chain.
 * 
 * This function:
 * 1. Checks if Keplr is available
 * 2. Requests user permission to connect (via enable)
 * 3. Obtains an OfflineSigner from Keplr
 * 4. Wraps it in a UniversalSigner adapter
 * 
 * The returned signer can be used for both transaction signing (via CosmJS)
 * and off-chain message signing (via ADR-036).
 * 
 * @param chainId - Chain identifier (e.g., "lumera-testnet-2")
 * @returns UniversalSigner instance for Keplr
 * @throws {Error} If Keplr is not available or user denies permission
 * 
 * @example
 * ```typescript
 * // Connect to Keplr
 * const signer = await getKeplrSigner("lumera-testnet-2");
 * 
 * // Get accounts
 * const accounts = await signer.getAccounts();
 * console.log("Connected:", accounts[0].address);
 * 
 * // Sign a transaction
 * const signDoc = { ... };
 * const txResult = await signer.signDirect(accounts[0].address, signDoc);
 * 
 * // Sign off-chain data (e.g., for LEP-1 layout signature)
 * const layoutHash = "abc123...";
 * const signature = await signer.signArbitrary(
 *   "lumera-testnet-2",
 *   accounts[0].address,
 *   layoutHash
 * );
 * ```
 */
export async function getKeplrSigner(chainId: string): Promise<UniversalSigner> {
  const keplr = getKeplrWallet();

  // Request permission to access the chain
  await keplr.enable(chainId);

  // Get the offline signer (supports both Amino and Direct signing)
  const offlineSigner = await keplr.getOfflineSignerAuto(chainId);

  console.debug("keplr signer capabilities", {
    chainId,
    hasSignAmino: typeof (offlineSigner as Record<string, unknown>)?.["signAmino"] === "function",
    hasSignDirect: typeof (offlineSigner as Record<string, unknown>)?.["signDirect"] === "function",
  });

  return new KeplrSigner(keplr, chainId, offlineSigner);
}

export {};

/**
 * Get a UniversalSigner from Keplr with only Amino support.
 * 
 * Use this if you only need Amino (legacy) transaction signing.
 * For new applications, prefer `getKeplrSigner` which supports both
 * Amino and Direct signing.
 * 
 * @param chainId - Chain identifier
 * @returns UniversalSigner instance for Keplr (Amino only)
 * @throws {Error} If Keplr is not available or user denies permission
 */
export async function getKeplrAminoSigner(chainId: string): Promise<UniversalSigner> {
  const keplr = getKeplrWallet();
  await keplr.enable(chainId);
  const offlineSigner = keplr.getOfflineSigner(chainId);
  return new KeplrSigner(keplr, chainId, offlineSigner);
}