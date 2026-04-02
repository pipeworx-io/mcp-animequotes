# @pipeworx/mcp-animequotes

MCP server for [Animechan](https://animechan.io) — random anime quotes, search by anime series or character name. Free, no auth required.

## Tools

| Tool | Description |
|------|-------------|
| `random_quote` | Get a random anime quote |
| `search_by_anime` | Get quotes from a specific anime series |
| `search_by_character` | Get quotes from a specific character |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "animequotes": {
      "type": "url",
      "url": "https://gateway.pipeworx.io/animequotes"
    }
  }
}
```

## CLI Usage

```bash
npx @anthropic-ai/mcp-client https://gateway.pipeworx.io/animequotes
```

## License

MIT
