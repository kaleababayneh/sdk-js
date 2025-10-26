import { beforeEach, describe, expect, it, vi } from "vitest";
import type { OfflineSigner } from "@cosmjs/proto-signing";

const {
  connectWithSignerMock,
  gasPriceFromStringMock,
  CosmjsTxClientMock,
  createProtobufRpcClientMock,
  QueryClientMock,
  ActionQueryClientMock,
  SupernodeQueryClientMock,
} = vi.hoisted(() => ({
  connectWithSignerMock: vi.fn(),
  gasPriceFromStringMock: vi.fn(),
  CosmjsTxClientMock: vi.fn(),
  createProtobufRpcClientMock: vi.fn(),
  QueryClientMock: vi.fn(),
  ActionQueryClientMock: vi.fn(),
  SupernodeQueryClientMock: vi.fn(),
}));

vi.mock("@cosmjs/stargate", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@cosmjs/stargate")>();
  return {
    ...actual,
    SigningStargateClient: { connectWithSigner: connectWithSignerMock },
    GasPrice: { fromString: gasPriceFromStringMock },
    QueryClient: QueryClientMock,
    createProtobufRpcClient: createProtobufRpcClientMock,
  };
});

vi.mock("src/blockchain/cosmjs", () => ({
  CosmjsTxClient: CosmjsTxClientMock,
}));

vi.mock("src/codegen/lumera/action/query.rpc.Query", () => ({
  QueryClientImpl: ActionQueryClientMock,
}));

vi.mock("src/codegen/lumera/supernode/query.rpc.Query", () => ({
  QueryClientImpl: SupernodeQueryClientMock,
}));

import { makeBlockchainClient, CosmjsRestBlockchainClient } from "src/blockchain/client";

describe("makeBlockchainClient", () => {
  const signer: OfflineSigner = {} as OfflineSigner;

  beforeEach(() => {
    connectWithSignerMock.mockReset();
    gasPriceFromStringMock.mockReset();
    CosmjsTxClientMock.mockReset();
    createProtobufRpcClientMock.mockReset();
    QueryClientMock.mockReset();
    ActionQueryClientMock.mockReset();
    SupernodeQueryClientMock.mockReset();
  });

  it("composes CosmJS and RPC query clients into facade", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const tmClient = { status: vi.fn() };
    const signingClientStub = {
      disconnect: vi.fn(),
      tmClient,
    };
    connectWithSignerMock.mockResolvedValue(signingClientStub);
    gasPriceFromStringMock.mockReturnValue({ denom: "ulume", amount: "0.025" });

    const txClientStub = { simulate: vi.fn(), signAndBroadcast: vi.fn() };
    CosmjsTxClientMock.mockImplementation(() => txClientStub);

    // Mock the QueryClient and RPC client creation
    const queryClientStub = {};
    QueryClientMock.mockImplementation(() => queryClientStub);
    
    const rpcStub = {};
    createProtobufRpcClientMock.mockReturnValue(rpcStub);

    // Mock the generated query clients
    const actionQueryClientStub = { params: vi.fn(), getAction: vi.fn(), getActionFee: vi.fn() };
    ActionQueryClientMock.mockImplementation(() => actionQueryClientStub);

    const supernodeQueryClientStub = { params: vi.fn(), getSuperNode: vi.fn() };
    SupernodeQueryClientMock.mockImplementation(() => supernodeQueryClientStub);

    const client = await makeBlockchainClient({
      rpcUrl: "https://rpc.test",
      lcdUrl: "https://lcd.test",
      chainId: "chain-test",
      signer,
      address: "lumera1address",
      gasPrice: "0.025ulume",
    });

    expect(connectWithSignerMock).toHaveBeenCalledWith(
      "https://rpc.test",
      signer,
      expect.objectContaining({
        gasPrice: { denom: "ulume", amount: "0.025" },
      }),
    );
    expect(gasPriceFromStringMock).toHaveBeenCalledWith("0.025ulume");

    expect(CosmjsTxClientMock).toHaveBeenCalledWith(
      signingClientStub,
      expect.objectContaining({
        lcdBaseUrl: "https://lcd.test",
      })
    );
    
    // Verify RPC clients were created
    expect(QueryClientMock).toHaveBeenCalledWith(tmClient);
    expect(createProtobufRpcClientMock).toHaveBeenCalledWith(queryClientStub);
    expect(ActionQueryClientMock).toHaveBeenCalledWith(rpcStub);
    expect(SupernodeQueryClientMock).toHaveBeenCalledWith(rpcStub);

    expect(client).toBeInstanceOf(CosmjsRestBlockchainClient);
    expect(client.Tx).toBe(txClientStub);
    expect(client.Action).toBeDefined();
    expect(client.Supernode).toBeDefined();
    expect(await client.getChainId()).toBe("chain-test");
    expect(await client.getAddress()).toBe("lumera1address");

    console.debug("blockchain client composition", {
      txCreated: CosmjsTxClientMock.mock.calls.length,
      actionClient: ActionQueryClientMock.mock.calls.length,
      supernodeClient: SupernodeQueryClientMock.mock.calls.length,
    });
    expect(debugSpy).toHaveBeenCalledWith("blockchain client composition", {
      txCreated: 1,
      actionClient: 1,
      supernodeClient: 1,
    });
    debugSpy.mockRestore();
  });

  it("omits gas price override when config lacks gasPrice", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const tmClient = { status: vi.fn() };
    const signingClientStub = {
      disconnect: vi.fn(),
      tmClient,
    };
    connectWithSignerMock.mockResolvedValue(signingClientStub);

    CosmjsTxClientMock.mockImplementation(() => ({}));
    
    const queryClientStub = {};
    QueryClientMock.mockImplementation(() => queryClientStub);
    
    const rpcStub = {};
    createProtobufRpcClientMock.mockReturnValue(rpcStub);
    
    ActionQueryClientMock.mockImplementation(() => ({ params: vi.fn() }));
    SupernodeQueryClientMock.mockImplementation(() => ({ params: vi.fn() }));

    await makeBlockchainClient({
      rpcUrl: "https://rpc.alt",
      lcdUrl: "https://lcd.alt",
      chainId: "chain-alt",
      signer,
      address: "lumera1alt",
    });

    expect(gasPriceFromStringMock).not.toHaveBeenCalled();
    expect(connectWithSignerMock).toHaveBeenCalledWith(
      "https://rpc.alt",
      signer,
      expect.objectContaining({
        gasPrice: undefined,
      }),
    );

    console.debug("blockchain client gas price", {
      called: gasPriceFromStringMock.mock.calls.length,
    });
    expect(debugSpy).toHaveBeenCalledWith("blockchain client gas price", { called: 0 });
    debugSpy.mockRestore();
  });
});