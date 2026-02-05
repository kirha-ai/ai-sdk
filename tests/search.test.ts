import { describe, it, expect, afterEach } from "bun:test";
import { searchTool } from "../src/tools/search";
import { resetDefaultClient } from "../src/client";

describe("searchTool", () => {
  afterEach(() => {
    resetDefaultClient();
  });

  it("should have correct description", () => {
    const tool = searchTool();
    expect(tool.description).toContain("Kirha");
    expect(tool.description).toContain("search");
  });

  it("should have inputSchema defined", () => {
    const tool = searchTool();
    expect(tool.inputSchema).toBeDefined();
  });

  it("should allow custom description", () => {
    const customDesc = "My custom search tool";
    const tool = searchTool({ description: customDesc });
    expect(tool.description).toBe(customDesc);
  });

  it("should create independent tool instances", () => {
    const tool1 = searchTool({ vertical: "crypto" });
    const tool2 = searchTool({ vertical: "finance" });
    expect(tool1).not.toBe(tool2);
  });
});
