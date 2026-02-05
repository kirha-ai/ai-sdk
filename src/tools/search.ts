import { jsonSchema, tool } from "ai";
import { getDefaultClient, createClient } from "../client";
import type { SearchToolOptions } from "../types";

const DEFAULT_DESCRIPTION =
  "Search across Kirha's real-time data verticals. Use this tool to search for current information across specialized domains. " +
  "Kirha intelligently composes and orchestrates multiple data providers to deliver comprehensive, up-to-date results.";

const searchInputSchema = jsonSchema<{ query: string }>({
  type: "object",
  properties: {
    query: {
      type: "string",
      description: "The search query describing what information you need",
    },
  },
  required: ["query"],
});

export function searchTool(options: SearchToolOptions = {}) {
  const description = options.description ?? DEFAULT_DESCRIPTION;
  const includeRawData = options.includeRawData ?? true;
  const includePlanning = options.includePlanning ?? false;

  return tool({
    description,
    inputSchema: searchInputSchema,
    execute: async ({ query }: { query: string }) => {
      const apiKey = options.apiKey ?? process.env.KIRHA_API_KEY;

      const client = apiKey
        ? createClient({
            apiKey,
            vertical: options.vertical,
            summarization: options.summarization,
          })
        : getDefaultClient();

      const result = await client.search(query, {
        vertical: options.vertical,
        summarization: options.summarization,
        includeRawData,
        includePlanning,
      });

      return result;
    },
  });
}
