<p align="center">
  <img src="./assets/banner.png" alt="Kirha SDK" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@kirha/ai-sdk"><img src="https://img.shields.io/npm/v/@kirha/ai-sdk" alt="npm version" /></a>
  <a href="https://github.com/kirha-ai/ai-sdk/actions/workflows/ci.yml"><img src="https://github.com/kirha-ai/ai-sdk/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://www.npmjs.com/package/@kirha/ai-sdk"><img src="https://img.shields.io/npm/dm/kirha" alt="npm downloads" /></a>
</p>

<p align="center">
  <a href="https://kirha.com"><b>🦋 Kirha</b></a> •
  <a href="https://github.com/kirha-ai/kirha-sdk-typescript"><b>📚 Kirha SDK</b></a> •
  <a href="https://app.kirha.com/auth/register"><b>🔑 Get an API key</b></a>
</p>

# @kirha/ai-sdk

AI SDK tools for [Kirha](https://kirha.ai) search. Compatible with AI SDK v5 and v6.
The tools are based on the [Kirha Typescript SDK](https://github.com/kirha-ai/kirha-sdk-typescript).

## Installation

```bash
npm install @kirha/ai-sdk
```

## Quick Start

```typescript
import { generateText, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";
import { searchTool } from "@kirha/ai-sdk";

// Set KIRHA_API_KEY environment variable
const result = await generateText({
  model: google("gemini-2.0-flash"),
  tools: { search: searchTool() },
  stopWhen: stepCountIs(3),
  prompt: "What are the top crypto trends today?",
});

console.log(result.text);
```

## Configuration

All options are optional:

```typescript
import { searchTool } from "@kirha/ai-sdk";

const tool = searchTool({
  apiKey: "...",                    // defaults to KIRHA_API_KEY env var
  vertical: "crypto",               // focus search on a specific vertical
  summarization: "kirha-flash",     // enable summarization
  includeData: true,             // include raw data in results
  description: "Search for cryptocurrency data",
});
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | `KIRHA_API_KEY` env var | API key |
| `vertical` | `string` | - | Data vertical to search |
| `summarization` | `"kirha" \| "kirha-flash" \| { model, instruction? }` | - | Summarization config |
| `includeData` | `boolean` | `true` | Include raw data |
| `includePlanning` | `boolean` | `false` | Include planning info |
| `description` | `string` | Default | Custom tool description |

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Run integration tests (requires API key)
KIRHA_API_KEY=your-key bun test

# Run examples
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key KIRHA_API_KEY=your-key bun run ./examples/basic-search.ts

# Build
bun run build
```

## License

MIT
