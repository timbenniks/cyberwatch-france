import { MCP_CORS_HEADERS } from '~~/server/utils/mcp-cors'

/**
 * Public, read-only Streamable HTTP MCP endpoint. CORS is open like /api.
 * Not cached: JSON-RPC request ids make responses uncacheable.
 */
export default defineEventHandler((event) => {
  if (!event.path.startsWith('/mcp')) return

  for (const [name, value] of Object.entries(MCP_CORS_HEADERS)) {
    setHeader(event, name, value)
  }
  setHeader(event, 'access-control-max-age', 86400)
  setHeader(event, 'cache-control', 'no-store')

  if (event.method === 'OPTIONS') {
    setResponseStatus(event, 204)
    return ''
  }
})
