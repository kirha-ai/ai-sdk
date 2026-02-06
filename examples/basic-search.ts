import { generateText, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";
import { searchTool } from "../src";

async function main() {
  console.log("Asking about current bitcoin price...\n");

  const result = await generateText({
    model: google("gemini-2.0-flash"),
    tools: { search: searchTool({ vertical: "crypto" }) },
    stopWhen: stepCountIs(3),
    prompt: "Current bitcoin price",
  });

  console.log("Response:", result.text);
  console.log("\nSteps:", result.steps.length);
  console.log("Tool calls:", result.steps.flatMap((s) => s.toolCalls).length);
}

main().catch(console.error);
