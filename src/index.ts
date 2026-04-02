/**
 * AnimeQuotes MCP — wraps animechan.io (free, no auth)
 *
 * Tools:
 * - random_quote: Get a random anime quote
 * - search_by_anime: Get quotes from a specific anime series
 * - search_by_character: Get quotes from a specific character
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://animechan.io/api/v1';

interface RawQuote {
  data?: {
    content: string;
    anime: { name: string };
    character: { name: string };
  };
}

interface RawQuoteList {
  data?: Array<{
    content: string;
    anime: { name: string };
    character: { name: string };
  }>;
}

function formatQuote(entry: {
  content: string;
  anime: { name: string };
  character: { name: string };
}) {
  return {
    quote: entry.content,
    character: entry.character.name,
    anime: entry.anime.name,
  };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'random_quote',
    description: 'Get a single random quote from an anime series.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'search_by_anime',
    description: 'Get quotes from a specific anime series by name.',
    inputSchema: {
      type: 'object',
      properties: {
        anime: {
          type: 'string',
          description: 'Name of the anime series (e.g., "Naruto", "Attack on Titan")',
        },
      },
      required: ['anime'],
    },
  },
  {
    name: 'search_by_character',
    description: 'Get quotes from a specific anime character by name.',
    inputSchema: {
      type: 'object',
      properties: {
        character: {
          type: 'string',
          description: 'Name of the anime character (e.g., "Naruto Uzumaki", "Levi Ackerman")',
        },
      },
      required: ['character'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'random_quote':
      return randomQuote();
    case 'search_by_anime':
      return searchByAnime(args.anime as string);
    case 'search_by_character':
      return searchByCharacter(args.character as string);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function randomQuote() {
  const res = await fetch(`${BASE_URL}/quotes/random`);
  if (!res.ok) throw new Error(`animechan.io error: ${res.status}`);
  const data = (await res.json()) as RawQuote;
  if (!data.data) throw new Error('animechan.io error: empty response');
  return formatQuote(data.data);
}

async function searchByAnime(anime: string) {
  const url = `${BASE_URL}/quotes?anime=${encodeURIComponent(anime)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`animechan.io error: ${res.status}`);
  const data = (await res.json()) as RawQuoteList;
  const quotes = data.data ?? [];
  return {
    anime,
    count: quotes.length,
    quotes: quotes.map(formatQuote),
  };
}

async function searchByCharacter(character: string) {
  const url = `${BASE_URL}/quotes?character=${encodeURIComponent(character)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`animechan.io error: ${res.status}`);
  const data = (await res.json()) as RawQuoteList;
  const quotes = data.data ?? [];
  return {
    character,
    count: quotes.length,
    quotes: quotes.map(formatQuote),
  };
}

export default { tools, callTool } satisfies McpToolExport;
