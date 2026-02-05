import { describe, it, expect, afterEach } from "bun:test";
import { searchTool, createSearchTool } from "../src/tools/search";
import { resetDefaultClient } from "../src/client";

describe("searchTool", () => {
  afterEach(() => {
    resetDefaultClient();
  });

  it("should have correct description", () => {
    expect(searchTool.description).toContain("Kirha");
    expect(searchTool.description).toContain("search");
  });

  it("should have inputSchema defined", () => {
    expect(searchTool.inputSchema).toBeDefined();
  });
});

describe("createSearchTool", () => {
  const originalEnv = process.env.KIRHA_API_KEY;

  afterEach(() => {
    if (originalEnv) {
      process.env.KIRHA_API_KEY = originalEnv;
    } else {
      delete process.env.KIRHA_API_KEY;
    }
  });

  it("should throw when no API key is provided", () => {
    delete process.env.KIRHA_API_KEY;
    expect(() => createSearchTool()).toThrow("API key is required");
  });

  it("should use provided API key", () => {
    delete process.env.KIRHA_API_KEY;
    const tool = createSearchTool({ apiKey: "custom-key" });
    expect(tool).toBeDefined();
  });

  it("should use env var when no API key provided", () => {
    process.env.KIRHA_API_KEY = "env-key";
    const tool = createSearchTool();
    expect(tool).toBeDefined();
  });

  it("should allow custom description", () => {
    process.env.KIRHA_API_KEY = "test-key";
    const customDesc = "My custom search tool";
    const tool = createSearchTool({ description: customDesc });
    expect(tool.description).toBe(customDesc);
  });

  it("should create independent tool instances", () => {
    process.env.KIRHA_API_KEY = "test-key";
    const tool1 = createSearchTool({ vertical: "crypto" });
    const tool2 = createSearchTool({ vertical: "finance" });
    expect(tool1).not.toBe(tool2);
  });
});
