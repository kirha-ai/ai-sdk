import { describe, it, expect, afterEach } from "bun:test";
import {
  getDefaultClient,
  createClient,
  resetDefaultClient,
} from "../src/client";

describe("client", () => {
  const originalEnv = process.env.KIRHA_API_KEY;

  afterEach(() => {
    resetDefaultClient();
    if (originalEnv) {
      process.env.KIRHA_API_KEY = originalEnv;
    } else {
      delete process.env.KIRHA_API_KEY;
    }
  });

  describe("getDefaultClient", () => {
    it("should throw when KIRHA_API_KEY is not set", () => {
      delete process.env.KIRHA_API_KEY;
      expect(() => getDefaultClient()).toThrow("KIRHA_API_KEY");
    });

    it("should return a client when KIRHA_API_KEY is set", () => {
      process.env.KIRHA_API_KEY = "test-key";
      const client = getDefaultClient();
      expect(client).toBeDefined();
    });

    it("should return the same instance on subsequent calls", () => {
      process.env.KIRHA_API_KEY = "test-key";
      const client1 = getDefaultClient();
      const client2 = getDefaultClient();
      expect(client1).toBe(client2);
    });
  });

  describe("createClient", () => {
    it("should create a new client with custom config", () => {
      const client = createClient({ apiKey: "custom-key" });
      expect(client).toBeDefined();
    });

    it("should not affect the default client", () => {
      process.env.KIRHA_API_KEY = "default-key";
      const defaultClient = getDefaultClient();
      const customClient = createClient({ apiKey: "custom-key" });
      expect(defaultClient).not.toBe(customClient);
    });
  });
});
