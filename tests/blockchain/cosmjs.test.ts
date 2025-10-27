import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import type { EncodeObject } from "@cosmjs/proto-signing";
import type { DeliverTxResponse } from "@cosmjs/stargate";
import { CosmjsTxClient } from "src/blockchain/cosmjs";
import {
  buildBatchMessages,
  buildMsgRequestAction,
  calculateCascadeFee,
  estimateGas,
} from "src/blockchain/messages";

const createMockSigningClient = () => ({
  simulate: vi.fn<Parameters<typeof CosmjsTxClient.prototype.simulate>, Promise<number>>(),
  broadcastTx: vi.fn<Parameters<typeof CosmjsTxClient.prototype.broadcast>, Promise<DeliverTxResponse>>(),
  signAndBroadcast: vi.fn<
    Parameters<typeof CosmjsTxClient.prototype.signAndBroadcast>,
    Promise<DeliverTxResponse>
  >(),
  disconnect: vi.fn<[], Promise<void>>(),
});

describe("CosmjsTxClient", () => {
  let signingClient: ReturnType<typeof createMockSigningClient>;

  beforeEach(() => {
    signingClient = createMockSigningClient();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("simulate proxies to SigningStargateClient and returns bigint", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    signingClient.simulate.mockResolvedValue(12345);

    const client = new CosmjsTxClient(signingClient as unknown as any);
    const msgs: EncodeObject[] = [{ typeUrl: "/cosmos.MsgDummy", value: { foo: "bar" } }];

    const result = await client.simulate("lumera1abc", msgs, "memo-test");

    expect(signingClient.simulate).toHaveBeenCalledWith("lumera1abc", msgs, "memo-test");
    expect(result).toBe(12345n);

    console.debug("simulate result", { address: "lumera1abc", memo: "memo-test", gas: result });
    expect(debugSpy).toHaveBeenCalledWith("simulate result", {
      address: "lumera1abc",
      memo: "memo-test",
      gas: 12345n,
    });
    debugSpy.mockRestore();
  });

  it("broadcast returns tx hash and bigint height with fallback when undefined", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const deliverResponse = {
      transactionHash: "ABC123",
      height: undefined,
      rawLog: "",
      code: 0,
      gasUsed: 0,
      gasWanted: 0,
    } as unknown as DeliverTxResponse;

    signingClient.broadcastTx.mockResolvedValue(deliverResponse);

    const client = new CosmjsTxClient(signingClient as unknown as any);
    const signedTx = new Uint8Array([1, 2, 3]);
    const result = await client.broadcast(signedTx, "block");

    expect(signingClient.broadcastTx).toHaveBeenCalledWith(signedTx);
    expect(result).toEqual({ txHash: "ABC123", height: 0n });

    console.debug("broadcast response", result);
    expect(debugSpy).toHaveBeenCalledWith("broadcast response", { txHash: "ABC123", height: 0n });
    debugSpy.mockRestore();
  });

  it("signAndBroadcast forwards arguments and converts timeout height to bigint", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const deliverResponse = {
      transactionHash: "DEF456",
      height: 77,
      rawLog: "ok",
      code: 0,
      gasUsed: 5000,
      gasWanted: 6000,
    } as unknown as DeliverTxResponse;

    // Mock simulate to return a successful gas estimate
    signingClient.simulate.mockResolvedValue(200000);
    signingClient.signAndBroadcast.mockResolvedValue(deliverResponse);

    const client = new CosmjsTxClient(signingClient as unknown as any);
    const messages: EncodeObject[] = [{ typeUrl: "/cosmos.MsgFoo", value: { baz: true } }];
    const fee = { amount: [{ denom: "ulume", amount: "1000" }], gas: "150000" };
    const timeoutHeight = 123n;

    const result = await client.signAndBroadcast("lumera1xyz", messages, fee, "memo", timeoutHeight);

    // Verify simulate was called first
    expect(signingClient.simulate).toHaveBeenCalledWith("lumera1xyz", messages, "memo");

    // Verify signAndBroadcast was called after successful simulation
    expect(signingClient.signAndBroadcast).toHaveBeenCalledWith(
      "lumera1xyz",
      messages,
      fee,
      "memo",
      timeoutHeight,
    );
    expect(result).toEqual({
      txHash: "DEF456",
      height: 77n,
      response: deliverResponse,
    });

    console.debug("signAndBroadcast summary", {
      signer: "lumera1xyz",
      memo: "memo",
      timeoutHeight: timeoutHeight,
      txHash: result.txHash,
    });
    expect(debugSpy).toHaveBeenCalledWith("signAndBroadcast summary", {
      signer: "lumera1xyz",
      memo: "memo",
      timeoutHeight: 123n,
      txHash: "DEF456",
    });
    debugSpy.mockRestore();
  });

  it("getStargateClient exposes underlying client", () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const client = new CosmjsTxClient(signingClient as unknown as any);

    const raw = client.getStargateClient();
    expect(raw).toBe(signingClient);

    console.debug("stargate client identity", { matches: raw === signingClient });
    expect(debugSpy).toHaveBeenCalledWith("stargate client identity", { matches: true });
    debugSpy.mockRestore();
  });

  it("disconnect calls SigningStargateClient.disconnect", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const client = new CosmjsTxClient(signingClient as unknown as any);

    await client.disconnect();

    expect(signingClient.disconnect).toHaveBeenCalled();

    console.debug("disconnect invoked", { called: signingClient.disconnect.mock.calls.length });
    expect(debugSpy).toHaveBeenCalledWith("disconnect invoked", { called: 1 });
    debugSpy.mockRestore();
  });
});

describe("blockchain message helpers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("buildMsgRequestAction constructs EncodeObject with metadata", () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const msg = buildMsgRequestAction(
      {
        data_hash: "hash",
        file_name: "test.txt",
        rq_ids_ic: 5,
        signatures: "sig==",
        public: false,
      },
      "1000",
      "1735689600",
      "lumera1creator",
    );

    expect(msg).toEqual({
      typeUrl: "/lumera.action.v1.MsgRequestAction",
      value: {
        creator: "lumera1creator",
        actionType: "cascade",
        metadata: JSON.stringify({
          data_hash: "hash",
          file_name: "test.txt",
          rq_ids_ic: 5,
          signatures: "sig==",
          public: false,
        }),
        price: "1000",
        expirationTime: "1735689600",
      },
    });

    console.debug("request action message", msg.value);
    expect(debugSpy).toHaveBeenCalledWith("request action message", msg.value);
    debugSpy.mockRestore();
  });

  it("calculateCascadeFee applies ceiling rounding per KB and sums base fee", () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const fee = calculateCascadeFee(1025, "10", "2");

    expect(fee).toBe("14");

    console.debug("calculated cascade fee", { bytes: 1025, fee });
    expect(debugSpy).toHaveBeenCalledWith("calculated cascade fee", { bytes: 1025, fee: "14" });
    debugSpy.mockRestore();
  });

  it("buildBatchMessages resolves factories lazily", () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const encode = (id: number): EncodeObject => ({ typeUrl: `/type/${id}`, value: { id } });

    const result = buildBatchMessages([encode(1), () => encode(2)]);

    expect(result).toEqual([
      { typeUrl: "/type/1", value: { id: 1 } },
      { typeUrl: "/type/2", value: { id: 2 } },
    ]);

    console.debug("batch messages", result.map((msg) => msg.typeUrl));
    expect(debugSpy).toHaveBeenCalledWith("batch messages", ["/type/1", "/type/2"]);
    debugSpy.mockRestore();
  });

  it("estimateGas returns baseline plus per-message increment", () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const gas = estimateGas(3, 100000, 45000);

    expect(gas).toBe(190000);

    console.debug("gas estimate", { messages: 3, gas });
    expect(debugSpy).toHaveBeenCalledWith("gas estimate", { messages: 3, gas: 190000 });
    debugSpy.mockRestore();
  });
});