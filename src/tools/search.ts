import { tool } from "ai";
import { z } from "zod";
import { getDefaultClient, createClient } from "../client";
import type { CreateSearchToolOptions } from "../types";
import type { SearchResult } from "kirha";

const DEFAULT_DESCRIPTION =
  "Search across Kirha's real-time data verticals. Use this tool to search for current information across specialized domains. " +
  "Kirha intelligently composes and orchestrates multiple data providers to deliver comprehensive, up-to-date results.";

const searchInputSchema = z.object({
  query: z
    .string()
    .min(1)
    .describe("The search query describing what information you need"),
});

type SearchInput = z.infer<typeof searchInputSchema>;

export const searchTool = tool<SearchInput, SearchResult>({
  description: DEFAULT_DESCRIPTION,
  inputSchema: searchInputSchema,
  execute: async ({ query }) => {
    const client = getDefaultClient();

    const result = await client.search(query, {
      includeRawData: true,
    });

    return result;
  },
});

export function createSearchTool(options: CreateSearchToolOptions = {}) {
  const apiKey = options.apiKey ?? process.env.KIRHA_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key is required. Provide it via options.apiKey or KIRHA_API_KEY environment variable.",
    );
  }

  const client = createClient({
    apiKey,
    vertical: options.vertical,
    summarization: options.summarization,
  });

  const includeRawData = options.includeRawData ?? true;
  const includePlanning = options.includePlanning ?? false;
  const description = options.description ?? DEFAULT_DESCRIPTION;

  return tool<SearchInput, SearchResult>({
    description,
    inputSchema: searchInputSchema,
    execute: async ({ query }) => {
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
