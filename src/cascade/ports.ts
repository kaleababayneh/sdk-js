/**
 * Port interface and DTOs for Cascade layer to access blockchain capabilities.
 * 
 * This interface defines the minimal surface that Cascade components need from the blockchain,
 * allowing the blockchain layer to evolve independently while keeping Cascade decoupled.
 * 
 * @module cascade/ports
 */

/**
 * Action module parameters needed for Cascade operations.
 * 
 * These parameters are fetched from the on-chain action module and cached
 * to avoid repeated LCD queries.
 */
export interface CascadeActionParams {
  /**
   * Maximum number of RaptorQ symbols allowed per action.
   * Used for layout ID derivation in LEP-1.
   */
  max_raptor_q_symbols: number;
}

/**
 * Input parameters for requesting an action transaction.
 */
export interface RequestActionTxInput {
  /**
   * Unique identifier for this action
   */
  actionId: string;

  /**
   * The message payload to include in the transaction
   */
  msg: unknown;

  /**
   * Optional gas price override (e.g., "0.025ulume")
   * If not provided, uses the client's default gas price
   */
  gasPrice?: string;

  /**
   * Optional memo to include in the transaction
   */
  memo?: string;
}

/**
 * Result of a successfully broadcast transaction.
 * 
 * This DTO is intentionally plain (no CosmJS types) to keep the Cascade layer
 * decoupled from blockchain implementation details.
 */
export interface TxOutcome {
  /**
   * Transaction hash (hex string)
   */
  txHash: string;

  /**
   * Block height where transaction was included
   */
  height: string;

  /**
   * Response code (0 = success, non-zero = error)
   */
  code: number;

  /**
   * Actual gas used by the transaction
   */
  gasUsed: string;

  /**
   * Total fee paid for the transaction
   */
  feePaid: string;

  /**
   * Raw log output from the transaction (optional)
   */
  rawLog?: string;
}

/**
 * Port interface for Cascade components to access blockchain capabilities.
 * 
 * This interface is implemented by an adapter in the blockchain layer,
 * allowing Cascade to remain decoupled from blockchain implementation details.
 * 
 * @example
 * ```typescript
 * // In Cascade uploader
 * const params = await this.chainPort.getActionParams();
 * const outcome = await this.chainPort.requestActionTx({
 *   actionId: 'my-action-123',
 *   msg: registerActionMsg
 * });
 * ```
 */
export interface CascadeChainPort {
  /**
   * Fetch action module parameters from the blockchain.
   * 
   * This method is typically cached with a TTL to avoid repeated LCD queries.
   * 
   * @returns Action parameters including max_raptor_q_symbols
   * @throws {Error} If the query fails or returns invalid data
   */
  getActionParams(): Promise<CascadeActionParams>;

  /**
   * Request an action transaction (single-call: simulate → sign → broadcast).
   * 
   * This method:
   * 1. Builds the RegisterAction message with the provided payload
   * 2. Simulates the transaction to compute the exact gas needed
   * 3. Calculates the fee based on gas used and gas price
   * 4. Signs the transaction using the configured signer
   * 5. Broadcasts the transaction to the network
   * 6. Returns the transaction outcome
   * 
   * @param input - Transaction input parameters
   * @returns Transaction outcome with hash, height, code, gas, and fee
   * @throws {Error} If simulation, signing, or broadcast fails
   * 
   * @example
   * ```typescript
   * const outcome = await chainPort.requestActionTx({
   *   actionId: 'cascade-upload-123',
   *   msg: { data_hash: '...', index_file: '...' },
   *   gasPrice: '0.025ulume'
   * });
   * 
   * console.log(`Tx ${outcome.txHash} at height ${outcome.height}`);
   * ```
   */
  requestActionTx(input: RequestActionTxInput): Promise<TxOutcome>;
}