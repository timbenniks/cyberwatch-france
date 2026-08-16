export const MCP_ALLOW_HEADERS = [
  'Accept',
  'Content-Type',
  'MCP-Protocol-Version',
  'MCP-Session-Id',
  'Last-Event-ID',
  'Mcp-Method',
  'Mcp-Name',
].join(', ')

export const MCP_CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-headers': MCP_ALLOW_HEADERS,
  'access-control-expose-headers': 'MCP-Session-Id, MCP-Protocol-Version',
} as const
