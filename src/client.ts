import { KirhaApi } from "kirha";
import type { ClientConfig } from "./types";

let defaultClient: KirhaApi | null = null;

export function getDefaultClient(): KirhaApi {
  if (!defaultClient) {
    const apiKey = process.env.KIRHA_API_KEY;
    if (!apiKey) {
      throw new Error(
        "KIRHA_API_KEY environment variable is required. " +
          "Set it or use createSearchTool({ apiKey: '...' }) instead.",
      );
    }
    defaultClient = new KirhaApi({ apiKey });
  }
  return defaultClient;
}

export function createClient(config: ClientConfig): KirhaApi {
  return new KirhaApi({
    apiKey: config.apiKey,
    vertical: config.vertical,
    summarization: config.summarization,
  });
}

export function resetDefaultClient(): void {
  defaultClient = null;
}
