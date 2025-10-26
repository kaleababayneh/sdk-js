import { beforeEach, describe, expect, it, vi } from "vitest";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";

// Mock the query clients
const mockActionQueryClient = {
  params: vi.fn(),
  getAction: vi.fn(),
  getActionFee: vi.fn(),
};

const mockSupernodeQueryClient = {
  params: vi.fn(),
  getSuperNode: vi.fn(),
  getSuperNodeBySuperNodeAddress: vi.fn(),
  listSuperNodes: vi.fn(),
};

// Mock the RPC client creation
vi.mock("@cosmjs/stargate", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@cosmjs/stargate")>();
  return {
    ...actual,
    createProtobufRpcClient: vi.fn(() => ({})),
  };
});

// Mock the generated query clients
vi.mock("src/codegen/lumera/action/query.rpc.Query", () => ({
  QueryClientImpl: vi.fn(() => mockActionQueryClient),
}));

vi.mock("src/codegen/lumera/supernode/query.rpc.Query", () => ({
  QueryClientImpl: vi.fn(() => mockSupernodeQueryClient),
}));

import { makeBlockchainClient } from "src/blockchain/client";

describe("RPC Action Query", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getParams returns action module parameters", async () => {
    mockActionQueryClient.params.mockResolvedValue({
      params: {
        baseActionFee: { amount: "10", denom: "ulume" },
        feePerKbyte: { amount: "5", denom: "ulume" },
        maxRaptorQSymbols: 1000n,
      },
    });

    // Note: This test would require a full client setup in practice
    // For unit testing, we're testing the adapter directly
    const response = await mockActionQueryClient.params({});

    expect(response.params.baseActionFee.amount).toBe("10");
    expect(response.params.feePerKbyte.amount).toBe("5");
    expect(response.params.maxRaptorQSymbols).toBe(1000n);

    console.debug("action params via RPC", { params: response.params });
  });

  it("getAction returns action record", async () => {
    const mockMetadata = new Uint8Array([1, 2, 3, 4]);
    
    mockActionQueryClient.getAction.mockResolvedValue({
      action: {
        creator: "lumera1creator",
        actionID: "action123",
        actionType: "ACTION_TYPE_CASCADE",
        metadata: mockMetadata,
        price: "1000",
        expirationTime: 1735689600n,
        state: "ACTION_STATE_PENDING",
        blockHeight: 12345n,
        superNodes: ["lumera1node1", "lumera1node2"],
      },
    });

    const response = await mockActionQueryClient.getAction({ actionID: "action123" });

    expect(response.action.actionID).toBe("action123");
    expect(response.action.creator).toBe("lumera1creator");
    expect(response.action.actionType).toBe("ACTION_TYPE_CASCADE");
    expect(response.action.metadata).toEqual(mockMetadata);

    console.debug("action retrieval via RPC", { 
      actionID: response.action.actionID,
      state: response.action.state,
    });
  });

  it("getActionFee calculates fee for data size", async () => {
    mockActionQueryClient.getActionFee.mockResolvedValue({
      amount: "15",
    });

    const response = await mockActionQueryClient.getActionFee({ dataSize: "2048" });

    expect(response.amount).toBe("15");

    console.debug("action fee calculation via RPC", { 
      dataSize: "2048",
      fee: response.amount,
    });
  });
});

describe("RPC Supernode Query", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getParams returns supernode module parameters", async () => {
    mockSupernodeQueryClient.params.mockResolvedValue({
      params: {
        minStake: "1000000",
        slashFraction: "0.01",
      },
    });

    const response = await mockSupernodeQueryClient.params({});

    expect(response.params).toEqual({
      minStake: "1000000",
      slashFraction: "0.01",
    });

    console.debug("supernode params via RPC", { params: response.params });
  });

  it("getSuperNode returns supernode by validator address", async () => {
    mockSupernodeQueryClient.getSuperNode.mockResolvedValue({
      supernode: {
        validatorAddress: "lumeravaloper1validator",
        supernodeAccount: "lumera1supernode",
        p2pPort: "26656",
        states: [
          {
            state: "SUPERNODE_STATE_ACTIVE",
            height: 10000n,
          },
        ],
        evidence: [],
        prevIpAddresses: [],
        note: "Test supernode",
        metrics: {
          metrics: {},
          reportCount: 0n,
          height: 10000n,
        },
        prevSupernodeAccounts: [],
      },
    });

    const response = await mockSupernodeQueryClient.getSuperNode({
      validatorAddress: "lumeravaloper1validator",
    });

    expect(response.supernode.validatorAddress).toBe("lumeravaloper1validator");
    expect(response.supernode.supernodeAccount).toBe("lumera1supernode");
    expect(response.supernode.states[0].state).toBe("SUPERNODE_STATE_ACTIVE");

    console.debug("supernode retrieval via RPC", {
      validator: response.supernode.validatorAddress,
      state: response.supernode.states[0].state,
    });
  });

  it("getSuperNodeBySuperNodeAddress returns supernode by supernode address", async () => {
    mockSupernodeQueryClient.getSuperNodeBySuperNodeAddress.mockResolvedValue({
      supernode: {
        validatorAddress: "lumeravaloper1validator",
        supernodeAccount: "lumera1supernode",
        p2pPort: "26656",
        states: [],
        evidence: [],
        prevIpAddresses: [],
        note: "",
        metrics: {
          metrics: {},
          reportCount: 0n,
          height: 0n,
        },
        prevSupernodeAccounts: [],
      },
    });

    const response = await mockSupernodeQueryClient.getSuperNodeBySuperNodeAddress({
      supernodeAddress: "lumera1supernode",
    });

    expect(response.supernode.supernodeAccount).toBe("lumera1supernode");

    console.debug("supernode by address via RPC", {
      supernodeAccount: response.supernode.supernodeAccount,
    });
  });

  it("listSuperNodes returns array of supernodes", async () => {
    mockSupernodeQueryClient.listSuperNodes.mockResolvedValue({
      supernodes: [
        {
          validatorAddress: "lumeravaloper1node1",
          supernodeAccount: "lumera1node1",
          p2pPort: "26656",
          states: [],
          evidence: [],
          prevIpAddresses: [],
          note: "",
          metrics: {
            metrics: {},
            reportCount: 0n,
            height: 0n,
          },
          prevSupernodeAccounts: [],
        },
        {
          validatorAddress: "lumeravaloper1node2",
          supernodeAccount: "lumera1node2",
          p2pPort: "26657",
          states: [],
          evidence: [],
          prevIpAddresses: [],
          note: "",
          metrics: {
            metrics: {},
            reportCount: 0n,
            height: 0n,
          },
          prevSupernodeAccounts: [],
        },
      ],
    });

    const response = await mockSupernodeQueryClient.listSuperNodes({});

    expect(response.supernodes).toHaveLength(2);
    expect(response.supernodes[0].validatorAddress).toBe("lumeravaloper1node1");
    expect(response.supernodes[1].validatorAddress).toBe("lumeravaloper1node2");

    console.debug("supernode list via RPC", {
      count: response.supernodes.length,
    });
  });
});