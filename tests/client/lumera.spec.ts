import { beforeEach, describe, expect, it, vi } from "vitest";
import type { OfflineSigner } from "@cosmjs/proto-signing";

const mocks = vi.hoisted(() => ({
  makeBlockchainClientMock: vi.fn<
    [
      {
        rpcUrl: string;
        lcdUrl: string;
        chainId: string;
        signer: OfflineSigner;
        address: string;
        gasPrice?: string;
      }
    ],
    Promise<Record<string, unknown>>
  >(),
  HttpClientMock: vi.fn(),
  SNApiClientMock: vi.fn(),
  CascadeUploaderMock: vi.fn(),
  CascadeDownloaderMock: vi.fn(),
}));

const {
  makeBlockchainClientMock,
  HttpClientMock,
  SNApiClientMock,
  CascadeUploaderMock,
  CascadeDownloaderMock,
} = mocks;

vi.mock("src/blockchain/client", async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    makeBlockchainClient: makeBlockchainClientMock,
  };
});

vi.mock("src/internal/http", () => ({
  HttpClient: HttpClientMock,
}));

vi.mock("src/cascade/client", async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    SNApiClient: SNApiClientMock,
  };
});

vi.mock("src/cascade/uploader", async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    CascadeUploader: CascadeUploaderMock,
  };
});

vi.mock("src/cascade/downloader", async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    CascadeDownloader: CascadeDownloaderMock,
  };
});

import { createLumeraClient, CHAIN_PRESETS, LumeraClient } from "src/client";

describe("createLumeraClient", () => {
  const signer = {} as OfflineSigner;

  beforeEach(() => {
    makeBlockchainClientMock.mockReset();
    HttpClientMock.mockReset();
    SNApiClientMock.mockReset();
    CascadeUploaderMock.mockReset();
    CascadeDownloaderMock.mockReset();
  });

  it("uses chain preset defaults and composes cascade clients", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const blockchainStub = { kind: "blockchain" };
    makeBlockchainClientMock.mockResolvedValueOnce(blockchainStub);

    const httpInstance = { http: true };
    HttpClientMock.mockImplementation(() => httpInstance);

    const snapiInstance = { sn: true };
    SNApiClientMock.mockImplementation(() => snapiInstance);

    const uploaderInstance = { upload: true };
    CascadeUploaderMock.mockImplementation(() => uploaderInstance);

    const downloaderInstance = { download: true };
    CascadeDownloaderMock.mockImplementation(() => downloaderInstance);

    const client = await createLumeraClient({
      preset: "testnet",
      signer,
      address: "lumera1abc",
      http: { timeout: 45000, maxRetries: 5 },
    });

    expect(makeBlockchainClientMock).toHaveBeenCalledWith({
      rpcUrl: CHAIN_PRESETS.testnet.rpcUrl,
      lcdUrl: CHAIN_PRESETS.testnet.lcdUrl,
      chainId: CHAIN_PRESETS.testnet.chainId,
      signer,
      address: "lumera1abc",
      gasPrice: "0.025ulume",
    });

    expect(HttpClientMock).toHaveBeenCalledWith({
      baseUrl: CHAIN_PRESETS.testnet.snapiUrl,
      timeout: 45000,
      retry: { maxAttempts: 5 },
    });

    expect(SNApiClientMock).toHaveBeenCalledWith(httpInstance);
    expect(CascadeUploaderMock).toHaveBeenCalledWith(snapiInstance);
    expect(CascadeDownloaderMock).toHaveBeenCalledWith(snapiInstance);

    expect(client).toBeInstanceOf(LumeraClient);
    expect(client.Blockchain).toBe(blockchainStub);
    expect(client.Cascade.uploader).toBe(uploaderInstance);
    expect(client.Cascade.downloader).toBe(downloaderInstance);

    console.debug("lumera client preset path", {
      preset: "testnet",
      httpCall: HttpClientMock.mock.calls[0]?.[0],
      uploaderCalls: CascadeUploaderMock.mock.calls.length,
      downloaderCalls: CascadeDownloaderMock.mock.calls.length,
    });
    expect(debugSpy).toHaveBeenCalledWith("lumera client preset path", {
      preset: "testnet",
      httpCall: {
        baseUrl: CHAIN_PRESETS.testnet.snapiUrl,
        timeout: 45000,
        retry: { maxAttempts: 5 },
      },
      uploaderCalls: 1,
      downloaderCalls: 1,
    });
    debugSpy.mockRestore();
  });

  it("accepts fully custom endpoints without preset", async () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const blockchainStub = { kind: "custom" };
    makeBlockchainClientMock.mockResolvedValueOnce(blockchainStub);

    const httpInstance = { http: "custom" };
    HttpClientMock.mockImplementation(() => httpInstance);

    const snapiInstance = { sn: "custom" };
    SNApiClientMock.mockImplementation(() => snapiInstance);

    const uploaderInstance = { upload: "custom" };
    CascadeUploaderMock.mockImplementation(() => uploaderInstance);

    const downloaderInstance = { download: "custom" };
    CascadeDownloaderMock.mockImplementation(() => downloaderInstance);

    const client = await createLumeraClient({
      rpcUrl: "https://rpc.custom",
      lcdUrl: "https://lcd.custom",
      chainId: "lumera-custom-1",
      snapiUrl: "https://sn.custom",
      signer,
      address: "lumera1custom",
      gasPrice: "0.05ulume",
    });

    expect(makeBlockchainClientMock).toHaveBeenCalledWith({
      rpcUrl: "https://rpc.custom",
      lcdUrl: "https://lcd.custom",
      chainId: "lumera-custom-1",
      signer,
      address: "lumera1custom",
      gasPrice: "0.05ulume",
    });

    expect(HttpClientMock).toHaveBeenCalledWith({
      baseUrl: "https://sn.custom",
      timeout: 30000,
      retry: { maxAttempts: 3 },
    });

    expect(SNApiClientMock).toHaveBeenCalledWith(httpInstance);
    expect(CascadeUploaderMock).toHaveBeenCalledWith(snapiInstance);
    expect(CascadeDownloaderMock).toHaveBeenCalledWith(snapiInstance);

    expect(client.Blockchain).toBe(blockchainStub);
    expect(client.Cascade.uploader).toBe(uploaderInstance);
    expect(client.Cascade.downloader).toBe(downloaderInstance);

    console.debug("lumera client custom path", {
      rpcUrl: "https://rpc.custom",
      snapiBase: HttpClientMock.mock.calls[0]?.[0].baseUrl,
      gasPrice: "0.05ulume",
    });
    expect(debugSpy).toHaveBeenCalledWith("lumera client custom path", {
      rpcUrl: "https://rpc.custom",
      snapiBase: "https://sn.custom",
      gasPrice: "0.05ulume",
    });
    debugSpy.mockRestore();
  });
});