const MCP_ALLOW_HEADERS = [
  'Accept',
  'Content-Type',
  'MCP-Protocol-Version',
  'MCP-Session-Id',
  'Last-Event-ID',
  'Mcp-Method',
  'Mcp-Name',
].join(', ')

/**
 * Public, read-only Streamable HTTP MCP endpoint. CORS is open like /api.
 * Not cached: JSON-RPC request ids make responses uncacheable.
 */
export default defineEventHandler((event) => {
  if (!event.path.startsWith('/mcp')) return

  setHeader(event, 'access-control-allow-origin', '*')
  setHeader(event, 'access-control-allow-methods', 'GET, POST, DELETE, OPTIONS')
  setHeader(event, 'access-control-allow-headers', MCP_ALLOW_HEADERS)
  setHeader(event, 'access-control-expose-headers', 'MCP-Session-Id, MCP-Protocol-Version')
  setHeader(event, 'access-control-max-age', 86400)
  setHeader(event, 'cache-control', 'no-store')

  if (event.method === 'OPTIONS') {
    setResponseStatus(event, 204)
    return ''
  }
})
