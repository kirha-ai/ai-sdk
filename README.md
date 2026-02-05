# @kirha/ai-sdk

AI SDK v5 compatible tools for [Kirha](https://kirha.ai) search functionality.

## Installation

```bash
npm install @kirha/ai-sdk
# or
pnpm add @kirha/ai-sdk
# or
bun add @kirha/ai-sdk
```

## Quick Start

```typescript
import { searchTool } from "@kirha/ai-sdk";
import { streamText } from "ai";

// Set KIRHA_API_KEY environment variable
const result = await streamText({
  model: "anthropic/claude-sonnet-4.5",
  tools: { kirhaSearch: searchTool },
  prompt: "What are the top crypto trends today?",
});

console.log(result.text);
```

## Custom Configuration

Use `createSearchTool` for custom configurations:

```typescript
import { createSearchTool } from "@kirha/ai-sdk";

const cryptoSearchTool = createSearchTool({
  apiKey: "...",                    // optional, defaults to KIRHA_API_KEY
  vertical: "crypto",               // focus search on a specific vertical
  summarization: "kirha-flash",     // enable summarization
  includeRawData: true,             // include raw data in results
  description: "Search for cryptocurrency data", // override the description to explain the tool's purpose for your usecase
});
```

## API Reference

### `searchTool`

Pre-configured search tool using `KIRHA_API_KEY` environment variable.

```typescript
import { searchTool } from "@kirha/ai-sdk";
```

### `createSearchTool(options?)`

Create a customized search tool.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | `KIRHA_API_KEY` env var | API key for authentication |
| `vertical` | `string` | - | Default data vertical to search |
| `summarization` | `"kirha" \| "kirha-flash" \| { model: "kirha" \| "kirha-flash", instruction?: string } \| undefined` | undefined | Summarization configuration |
| `includeRawData` | `boolean` | `true` | Include raw data in results |
| `includePlanning` | `boolean` | `false` | Include planning information |
| `description` | `string` | Default description | Custom tool description |

## Tool Input Schema

The search tool accepts the following parameters when called by an AI agent:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | Yes | The search query |

## License

MIT
