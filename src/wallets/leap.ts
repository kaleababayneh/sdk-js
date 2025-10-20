/**
 * Leap wallet adapter.
 * 
 * This module provides integration with the Leap browser extension wallet,
 * supporting both on-chain transaction signing (via CosmJS OfflineSigner)
 * and off-chain message signing (via ADR-036 signArbitrary).
 * 
 * @module wallets/leap
 */

import type { AminoSignResponse } from "@cosmjs/amino";
import type { AccountData, DirectSignResponse } from "@cosmjs/proto-signing";
import type { SignDoc } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import type { UniversalSigner, ArbitrarySignResponse } from "./signer.js";

/**
 * Leap wallet interface exposed on window.leap.
 */
export interface LeapWallet {
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
    leap?: LeapWallet;
  }
}

/**
 * Detect if Leap wallet is available in the browser.
 *
 * Checks for the presence of the Leap extension by looking for
 * `window.leap`. This should be called before attempting to connect
 * to ensure the user has Leap installed.
 *
 * @returns True if Leap is detected, false otherwise
 *
 * @example
 * ```typescript
 * if (!isLeapAvailable()) {
 *   alert("Please install Leap extension");
 *   return;
 * }
 * ```
 */
export function isLeapAvailable(): boolean {
  const hasWindow = typeof window !== "undefined";
  const provider = hasWindow ? window.leap : undefined;
  const available = provider !== undefined;

  console.debug("leap availability check", {
    hasWindow,
    available,
    hasSignArbitrary: typeof provider?.signArbitrary === "function",
    hasGetOfflineSignerAuto: typeof provider?.getOfflineSignerAuto === "function",
  });

  return hasWindow && available;
}

/**
 * Get Leap wallet instance.
 * 
 * @returns Leap wallet interface
 * @throws {Error} If Leap is not available
 */
function getLeapWallet(): LeapWallet {
  if (!isLeapAvailable()) {
    throw new Error(
      "Leap extension not found. Please install Leap from https://www.leapwallet.io/"
    );
  }
  return (window as any).leap;
}

/**
 * Leap signer adapter implementing UniversalSigner.
 * 
 * This class wraps Leap's native signer with the UniversalSigner interface,
 * providing a consistent API for both transaction signing and off-chain
 * message signing via ADR-036.
 */
class LeapSigner implements UniversalSigner {
  private readonly leap: LeapWallet;
  private readonly chainId: string;
  private readonly signer: any;

  /**
   * Create a new Leap signer adapter.
   * 
   * @param leap - Leap wallet instance
   * @param chainId - Chain identifier
   * @param signer - CosmJS OfflineSigner from Leap
   */
  constructor(leap: LeapWallet, chainId: string, signer: any) {
    this.leap = leap;
    this.chainId = chainId;
    this.signer = signer;
  }

  async getAccounts(): Promise<readonly AccountData[]> {
    return this.signer.getAccounts();
  }

  async signAmino(signerAddress: string, signDoc: any): Promise<AminoSignResponse> {
    if (!this.signer.signAmino) {
      throw new Error("Amino signing not supported by this Leap signer");
    }
    return this.signer.signAmino(signerAddress, signDoc);
  }

  async signDirect(signerAddress: string, signDoc: SignDoc): Promise<DirectSignResponse> {
    if (!this.signer.signDirect) {
      throw new Error("Direct signing not supported by this Leap signer");
    }
    return this.signer.signDirect(signerAddress, signDoc);
  }

  async signArbitrary(
    chainId: string,
    signerAddress: string,
    data: string
  ): Promise<ArbitrarySignResponse> {
    // Leap's signArbitrary returns a slightly different format
    const result = await this.leap.signArbitrary(chainId, signerAddress, data);
    
    return {
      signed: data, // Leap doesn't modify the data
      signature: result.signature,
      pub_key: result.pub_key,
    };
  }
}

/**
 * Get a UniversalSigner from Leap for the specified chain.
 * 
 * This function:
 * 1. Checks if Leap is available
 * 2. Requests user permission to connect (via enable)
 * 3. Obtains an OfflineSigner from Leap
 * 4. Wraps it in a UniversalSigner adapter
 * 
 * The returned signer can be used for both transaction signing (via CosmJS)
 * and off-chain message signing (via ADR-036).
 * 
 * @param chainId - Chain identifier (e.g., "lumera-testnet-2")
 * @returns UniversalSigner instance for Leap
 * @throws {Error} If Leap is not available or user denies permission
 * 
 * @example
 * ```typescript
 * // Connect to Leap
 * const signer = await getLeapSigner("lumera-testnet-2");
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
export async function getLeapSigner(chainId: string): Promise<UniversalSigner> {
  const leap = getLeapWallet();

  // Request permission to access the chain
  await leap.enable(chainId);

  // Get the offline signer (supports both Amino and Direct signing)
  const offlineSigner = await leap.getOfflineSignerAuto(chainId);

  console.debug("leap signer capabilities", {
    chainId,
    hasSignAmino: typeof (offlineSigner as Record<string, unknown>)?.["signAmino"] === "function",
    hasSignDirect: typeof (offlineSigner as Record<string, unknown>)?.["signDirect"] === "function",
  });

  return new LeapSigner(leap, chainId, offlineSigner);
}

export {};

/**
 * Get a UniversalSigner from Leap with only Amino support.
 * 
 * Use this if you only need Amino (legacy) transaction signing.
 * For new applications, prefer `getLeapSigner` which supports both
 * Amino and Direct signing.
 * 
 * @param chainId - Chain identifier
 * @returns UniversalSigner instance for Leap (Amino only)
 * @throws {Error} If Leap is not available or user denies permission
 */
export async function getLeapAminoSigner(chainId: string): Promise<UniversalSigner> {
  const leap = getLeapWallet();
  await leap.enable(chainId);
  const offlineSigner = leap.getOfflineSigner(chainId);
  return new LeapSigner(leap, chainId, offlineSigner);
}