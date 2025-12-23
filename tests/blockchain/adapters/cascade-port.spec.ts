import { describe, expect, it, vi } from "vitest";

import { BlockchainActionAdapter } from "src/blockchain/adapters/cascade-port";

describe("BlockchainActionAdapter.requestActionTx", () => {
  it("queries action fee using ceil(bytes/1024) KB and uses the same value in MsgRequestAction", async () => {
    const getActionFee = vi.fn().mockResolvedValue({ amount: "123" });

    const simulate = vi.fn().mockImplementation(async (_addr: string, msgs: any[]) => {
      const msg = msgs[0];
      expect(msg.value.fileSizeKbs).toBe("2");
      expect(msg.value.price).toBe("123ulume");
      return 100n;
    });

    const signAndBroadcast = vi.fn().mockResolvedValue({
      txHash: "TX_HASH",
      height: 1n,
      response: {
        code: 0,
        gasUsed: 100n,
        rawLog: "",
      },
    });

    const getTx = vi.fn().mockResolvedValue({
      events: [
        {
          type: "action_registered",
          attributes: [{ key: "action_id", value: "42" }],
        },
      ],
    });

    const adapter = new BlockchainActionAdapter(
      {
        Action: { getActionFee } as any,
        Tx: { simulate, signAndBroadcast, getTx } as any,
      } as any,
      "lumera1signer"
    );

    const outcome = await adapter.requestActionTx(
      {
        msg: {
          data_hash: "hash",
          file_name: "file.bin",
          rq_ids_ic: 1,
          signatures: "sig",
          public: false,
        },
        expirationTime: "0",
      },
      1025
    );

    expect(getActionFee).toHaveBeenCalledWith(2);
    expect(outcome.actionId).toBe("42");
  });
});

