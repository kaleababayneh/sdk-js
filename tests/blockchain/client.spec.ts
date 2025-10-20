import { beforeEach, describe, expect, it, vi } from "vitest";
import type { OfflineSigner } from "@cosmjs/proto-signing";

const {
  connectWithSignerMock,
  gasPriceFromStringMock,
  CosmjsTxClientMock,
  RestActionQueryMock,
  RestSupernodeQueryMock,
} = vi.hoisted(() => ({
  connectWithSignerMock: vi.fn(),
  gasPriceFromStringMock: vi.fn(),
  CosmjsTxClientMock: vi.fn(),
  RestActionQueryMock: vi.fn(),
  RestSupernodeQueryMock: vi.fn(),
}));

vi.mock("@cosmjs/stargate", () => ({
  SigningStargateClient: { connectWithSigner: connectWithSignerMock },
  GasPrice: { fromString: gasPriceFromStringMock },
}));

vi.mock("src/blockchain/cosmjs", () => ({
  CosmjsTxClient: CosmjsTxClientMock,
}));

vi.mock("src/blockchain/rest", () => ({
  RestActionQuery: RestActionQueryMock,
  RestSupernodeQuery: RestSupernodeQueryMock,
}));

import { makeBlockchainClient, CosmjsRestBlockchainClient } from "src/blockchain/client";

describe("makeBlockchainClient", () => {
  const signer: OfflineSigner = {} as OfflineSigner;

  beforeEach(() => {
    connectWithSignerMock.mockReset();
    gasPriceFromStringMock.mockReset();
    CosmjsTxClientMock.mockReset();
    RestActionQueryMock.mockReset();
    RestSupernodeQueryMock.mockReset();
  });

  it("composes CosmJS and REST clients into facade", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const signingClientStub = { disconnect: vi.fn() };
    connectWithSignerMock.mockResolvedValue(signingClientStub);
    gasPriceFromStringMock.mockReturnValue({ denom: "ulume", amount: "0.025" });

    const txClientStub = { simulate: vi.fn(), signAndBroadcast: vi.fn() };
    CosmjsTxClientMock.mockImplementation(() => txClientStub);

    const actionQueryStub = { getParams: vi.fn() };
    RestActionQueryMock.mockImplementation(() => actionQueryStub);

    const supernodeQueryStub = { getParams: vi.fn() };
    RestSupernodeQueryMock.mockImplementation(() => supernodeQueryStub);

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
      { gasPrice: { denom: "ulume", amount: "0.025" } },
    );
    expect(gasPriceFromStringMock).toHaveBeenCalledWith("0.025ulume");

    expect(CosmjsTxClientMock).toHaveBeenCalledWith(signingClientStub);
    expect(RestActionQueryMock).toHaveBeenCalledWith("https://lcd.test");
    expect(RestSupernodeQueryMock).toHaveBeenCalledWith("https://lcd.test");

    expect(client).toBeInstanceOf(CosmjsRestBlockchainClient);
    expect(client.Tx).toBe(txClientStub);
    expect(client.Action).toBe(actionQueryStub);
    expect(client.Supernode).toBe(supernodeQueryStub);
    expect(await client.getChainId()).toBe("chain-test");
    expect(await client.getAddress()).toBe("lumera1address");

    console.debug("blockchain client composition", {
      txCreated: CosmjsTxClientMock.mock.calls.length,
      actionClient: RestActionQueryMock.mock.calls.length,
      supernodeClient: RestSupernodeQueryMock.mock.calls.length,
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
    const signingClientStub = { disconnect: vi.fn() };
    connectWithSignerMock.mockResolvedValue(signingClientStub);

    CosmjsTxClientMock.mockImplementation(() => ({}));
    RestActionQueryMock.mockImplementation(() => ({}));
    RestSupernodeQueryMock.mockImplementation(() => ({}));

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
      { gasPrice: undefined },
    );

    console.debug("blockchain client gas price", {
      called: gasPriceFromStringMock.mock.calls.length,
    });
    expect(debugSpy).toHaveBeenCalledWith("blockchain client gas price", { called: 0 });
    debugSpy.mockRestore();
  });
});