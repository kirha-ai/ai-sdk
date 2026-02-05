import { describe, it, expect, setDefaultTimeout } from "bun:test";

setDefaultTimeout(120_000);

import { searchTool } from "../src/tools/search";

const hasApiKey = !!process.env.KIRHA_API_KEY;

describe.skipIf(!hasApiKey)("integration tests", () => {
  it("execute with default searchTool", async () => {
    const tool = searchTool({ vertical: "crypto" });

    // biome-ignore lint/style/noNonNullAssertion: <_explanation>
    const result = await tool.execute!(
      { query: "Current bitcoin price" },
      { toolCallId: "test-1", messages: [] },
    );

    expect(result).toBeDefined();
  });
});
