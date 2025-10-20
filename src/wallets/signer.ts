/**
 * Unified signer interface for Cosmos wallets.
 * 
 * This module provides a standardized interface for wallet interactions that
 * combines CosmJS transaction signing capabilities with off-chain message
 * signing via ADR-036. This allows a single interface to handle both on-chain
 * transactions and off-chain authentication/signatures.
 * 
 * @module wallets/signer
 */

import type { AminoSignResponse, OfflineAminoSigner } from "@cosmjs/amino";
import type {
  OfflineDirectSigner,
  AccountData,
  DirectSignResponse,
} from "@cosmjs/proto-signing";
import type { SignDoc } from "cosmjs-types/cosmos/tx/v1beta1/tx";

/**
 * ADR-036 arbitrary message signing result.
 * 
 * Contains the signed data and the signature produced by the wallet.
 */
export interface ArbitrarySignResponse {
  /** The signed data (may be modified by the wallet) */
  signed: string;
  /** Base64-encoded signature */
  signature: string;
  /** Public key used for signing */
  pub_key: {
    type: string;
    value: string;
  };
}

/**
 * Universal signer interface combining on-chain and off-chain signing.
 * 
 * This interface extends CosmJS's `OfflineAminoSigner` and `OfflineDirectSigner`
 * interfaces to support transaction signing, while also adding ADR-036
 * `signArbitrary` for off-chain message signing (used for LEP-1 layout/index
 * signatures and Cascade upload/download authentication).
 * 
 * @example
 * ```typescript
 * // Get signer from Keplr
 * const signer = await getKeplrSigner("lumera-testnet-2");
 * 
 * // Sign a transaction (CosmJS)
 * const accounts = await signer.getAccounts();
 * const signDoc = { ... };
 * const result = await signer.signDirect(accounts[0].address, signDoc);
 * 
 * // Sign off-chain message (ADR-036)
 * const dataHash = "abc123...";
 * const signature = await signer.signArbitrary(
 *   "lumera-testnet-2",
 *   accounts[0].address,
 *   dataHash
 * );
 * ```
 */
export interface UniversalSigner extends OfflineAminoSigner, OfflineDirectSigner {
  /**
   * Get accounts available from this signer.
   * 
   * Returns the list of accounts that can sign transactions and messages.
   * For browser wallets like Keplr/Leap, this typically returns a single account
   * after the user has connected and authorized the chain.
   * 
   * @returns Array of account data including address and public key
   */
  getAccounts(): Promise<readonly AccountData[]>;

  /**
   * Sign a transaction using Amino encoding (legacy).
   * 
   * @param signerAddress - Address of the account signing the transaction
   * @param signDoc - Amino sign document
   * @returns Signed transaction in Amino format
   */
  signAmino(signerAddress: string, signDoc: any): Promise<AminoSignResponse>;

  /**
   * Sign a transaction using Protobuf encoding (Direct).
   * 
   * @param signerAddress - Address of the account signing the transaction
   * @param signDoc - Protobuf sign document
   * @returns Signed transaction in Direct format
   */
  signDirect(signerAddress: string, signDoc: SignDoc): Promise<DirectSignResponse>;

  /**
   * Sign an arbitrary message using ADR-036.
   * 
   * This method is used for off-chain signing, such as:
   * - LEP-1 layout and index signatures
   * - Cascade upload start signatures (signing the file hash)
   * - Cascade download authorization (signing the action ID)
   * 
   * The message is signed directly without blockchain context, making it suitable
   * for authentication and data integrity verification off-chain.
   * 
   * @param chainId - Chain identifier (e.g., "lumera-testnet-2")
   * @param signerAddress - Bech32 address of the signer
   * @param data - Data to sign (typically a hash or identifier)
   * @returns Signature response with signed data and signature
   * @throws {Error} If the wallet doesn't support signArbitrary or signing fails
   */
  signArbitrary(
    chainId: string,
    signerAddress: string,
    data: string
  ): Promise<ArbitrarySignResponse>;
}

/**
 * Type guard to check if a signer supports arbitrary message signing.
 * 
 * @param signer - Potential UniversalSigner
 * @returns True if the signer implements signArbitrary
 */
export function isUniversalSigner(signer: any): signer is UniversalSigner {
  return (
    signer &&
    typeof signer.getAccounts === "function" &&
    typeof signer.signAmino === "function" &&
    typeof signer.signDirect === "function" &&
    typeof signer.signArbitrary === "function"
  );
}