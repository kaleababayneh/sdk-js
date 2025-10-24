import { describe, expect, it } from "vitest";
import { createLumeraRegistry, lumeraTypes } from "src/blockchain/registry";

describe("Lumera Registry", () => {
  it("creates a registry with Lumera message types", () => {
    const registry = createLumeraRegistry();
    
    expect(registry).toBeDefined();
  });

  it("includes MsgRequestAction type", () => {
    const hasRequestAction = lumeraTypes.some(
      ([typeUrl]) => typeUrl === "/lumera.action.v1.MsgRequestAction"
    );
    
    expect(hasRequestAction).toBe(true);
  });

  it("includes MsgFinalizeAction type", () => {
    const hasFinalizeAction = lumeraTypes.some(
      ([typeUrl]) => typeUrl === "/lumera.action.v1.MsgFinalizeAction"
    );
    
    expect(hasFinalizeAction).toBe(true);
  });

  it("includes MsgApproveAction type", () => {
    const hasApproveAction = lumeraTypes.some(
      ([typeUrl]) => typeUrl === "/lumera.action.v1.MsgApproveAction"
    );
    
    expect(hasApproveAction).toBe(true);
  });

  it("includes all supernode message types", () => {
    const supernodeTypes = [
      "/lumera.supernode.v1.MsgRegisterSupernode",
      "/lumera.supernode.v1.MsgDeregisterSupernode",
      "/lumera.supernode.v1.MsgStartSupernode",
      "/lumera.supernode.v1.MsgStopSupernode",
      "/lumera.supernode.v1.MsgUpdateSupernode",
    ];
    
    supernodeTypes.forEach((typeUrl) => {
      const hasType = lumeraTypes.some(([url]) => url === typeUrl);
      expect(hasType).toBe(true);
    });
  });

  it("exports 8 custom message types", () => {
    // 3 action types + 5 supernode types
    expect(lumeraTypes.length).toBe(8);
  });
});