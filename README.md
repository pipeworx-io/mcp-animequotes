# mcp-animequotes

AnimeQuotes MCP — wraps animechan.io (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `random_quote` | Get a random anime quote. Returns quote text, character name, and anime series title. |
| `search_by_anime` | Search for quotes from a specific anime series by title (e.g., "Attack on Titan"). Returns matching quotes with character and series info. |
| `search_by_character` | Search for quotes by anime character name (e.g., "Naruto Uzumaki"). Returns matching quotes with character, series, and quote text. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "animequotes": {
      "url": "https://gateway.pipeworx.io/animequotes/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Animequotes data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
