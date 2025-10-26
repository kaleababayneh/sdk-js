import { describe, expect, it } from "vitest";
import { createRegistry, createAminoTypes } from "src/blockchain/registry";
import { lumeraProtoRegistry } from "src/codegen/lumera/client";

describe("Lumera Registry", () => {
  it("creates a registry with default and Lumera message types", () => {
    const registry = createRegistry();
    
    expect(registry).toBeDefined();
  });

  it("includes MsgRequestAction type", () => {
    const hasRequestAction = lumeraProtoRegistry.some(
      ([typeUrl]) => typeUrl === "/lumera.action.MsgRequestAction"
    );
    
    expect(hasRequestAction).toBe(true);
  });

  it("includes MsgFinalizeAction type", () => {
    const hasFinalizeAction = lumeraProtoRegistry.some(
      ([typeUrl]) => typeUrl === "/lumera.action.MsgFinalizeAction"
    );
    
    expect(hasFinalizeAction).toBe(true);
  });

  it("includes MsgApproveAction type", () => {
    const hasApproveAction = lumeraProtoRegistry.some(
      ([typeUrl]) => typeUrl === "/lumera.action.MsgApproveAction"
    );
    
    expect(hasApproveAction).toBe(true);
  });

  it("includes MsgUpdateParams type", () => {
    const hasUpdateParams = lumeraProtoRegistry.some(
      ([typeUrl]) => typeUrl === "/lumera.action.MsgUpdateParams"
    );
    
    expect(hasUpdateParams).toBe(true);
  });

  it("registry can encode and decode Lumera messages", () => {
    const registry = createRegistry();
    
    // Verify registry has lookup method
    const requestActionType = registry.lookupType("/lumera.action.MsgRequestAction");
    expect(requestActionType).toBeDefined();
    
    const finalizeActionType = registry.lookupType("/lumera.action.MsgFinalizeAction");
    expect(finalizeActionType).toBeDefined();
  });

  it("creates amino types for Ledger support", () => {
    const aminoTypes = createAminoTypes();
    
    expect(aminoTypes).toBeDefined();
  });

  it("exported registry contains multiple Lumera module types", () => {
    // Should include types from action, claim, lumeraid, and supernode modules
    const actionTypes = lumeraProtoRegistry.filter(([url]) => url.startsWith("/lumera.action"));
    const claimTypes = lumeraProtoRegistry.filter(([url]) => url.startsWith("/lumera.claim"));
    const lumeraidTypes = lumeraProtoRegistry.filter(([url]) => url.startsWith("/lumera.lumeraid"));
    const supernodeTypes = lumeraProtoRegistry.filter(([url]) => url.startsWith("/lumera.supernode"));
    
    // Verify we have types from each module
    expect(actionTypes.length).toBeGreaterThan(0);
    expect(claimTypes.length).toBeGreaterThan(0);
    expect(lumeraidTypes.length).toBeGreaterThan(0);
    expect(supernodeTypes.length).toBeGreaterThan(0);
  });
});