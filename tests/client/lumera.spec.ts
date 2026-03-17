import { beforeEach, describe, expect, it, vi } from "vitest";
import type { OfflineSigner } from "@cosmjs/proto-signing";

const hoisted = vi.hoisted(() => ({
  makeBlockchainClientMock: vi.fn(),
  HttpClientMock: vi.fn(),
  SNApiClientMock: vi.fn(),
  CascadeUploaderMock: vi.fn(),
  CascadeDownloaderMock: vi.fn(),
  RaptorQProxyGetInstanceMock: vi.fn(),
}));

vi.mock("src/blockchain/client", async (orig) => {
  const actual = await orig();
  return { ...actual, makeBlockchainClient: hoisted.makeBlockchainClientMock };
});
vi.mock("src/internal/http", () => ({ HttpClient: hoisted.HttpClientMock }));
vi.mock("src/internal/zstd", () => ({ compress: vi.fn(async (_s: string) => new Uint8Array()) }));
vi.mock("src/cascade/client", async (orig) => {
  const actual = await orig();
  return { ...actual, SNApiClient: hoisted.SNApiClientMock };
});
vi.mock("src/cascade/uploader", async (orig) => {
  const actual = await orig();
  return { ...actual, CascadeUploader: hoisted.CascadeUploaderMock };
});
vi.mock("src/cascade/downloader", async (orig) => {
  const actual = await orig();
  return { ...actual, CascadeDownloader: hoisted.CascadeDownloaderMock };
});
vi.mock("src/wasm/raptorq-proxy", () => ({
  RaptorQProxy: { getInstance: hoisted.RaptorQProxyGetInstanceMock },
}));

import { createLumeraClient, CHAIN_PRESETS } from "src/client";

describe("createLumeraClient", () => {
  const signer = {} as OfflineSigner;

  beforeEach(() => {
    hoisted.makeBlockchainClientMock.mockReset();
    hoisted.HttpClientMock.mockReset();
    hoisted.SNApiClientMock.mockReset();
    hoisted.CascadeUploaderMock.mockReset();
    hoisted.CascadeDownloaderMock.mockReset();
    hoisted.RaptorQProxyGetInstanceMock.mockReset();

    hoisted.RaptorQProxyGetInstanceMock.mockReturnValue({ initialize: vi.fn().mockResolvedValue(undefined) });
  });

  it("uses testnet preset and composes clients", async () => {
    hoisted.makeBlockchainClientMock.mockResolvedValue({ kind: "blockchain" });
    hoisted.HttpClientMock.mockImplementation(() => ({ http: true }));
    hoisted.SNApiClientMock.mockImplementation(() => ({ sn: true }));
    hoisted.CascadeUploaderMock.mockImplementation(() => ({ upload: true }));
    hoisted.CascadeDownloaderMock.mockImplementation(() => ({ download: true }));

    const client = await createLumeraClient({
      preset: "testnet",
      signer,
      address: "lumera1abc",
      http: { timeout: 45000, maxRetries: 5 },
    });

    expect(hoisted.makeBlockchainClientMock).toHaveBeenCalledWith(expect.objectContaining({
      rpcUrl: CHAIN_PRESETS.testnet.rpcUrl,
      chainId: CHAIN_PRESETS.testnet.chainId,
      gasPrice: "0.025ulume",
    }));
    expect(hoisted.HttpClientMock).toHaveBeenCalledWith({
      baseUrl: CHAIN_PRESETS.testnet.snapiUrl,
      timeout: 45000,
      retry: { maxAttempts: 5 },
    });
    expect(client).toBeDefined();
  });
});
