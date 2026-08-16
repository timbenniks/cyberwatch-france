import { getHeader, getMethod, getRequestURL, getRequestWebStream, readRawBody, sendRedirect, sendWebResponse } from 'h3'
import { cyberwatchMcpHandler } from '~~/server/utils/mcp-handler'

const MCP_CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-headers':
    'Accept, Content-Type, MCP-Protocol-Version, MCP-Session-Id, Last-Event-ID, Mcp-Method, Mcp-Name',
  'access-control-expose-headers': 'MCP-Session-Id, MCP-Protocol-Version',
}

function withMcpCors(response: Response): Response {
  const headers = new Headers(response.headers)
  for (const [name, value] of Object.entries(MCP_CORS)) {
    if (!headers.has(name)) headers.set(name, value)
  }
  headers.set('cache-control', 'no-store')
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
}

async function toMcpRequest(event: Parameters<typeof readRawBody>[0]): Promise<Request> {
  const url = getRequestURL(event)
  const method = getMethod(event)
  const headers = event.headers
  if (method === 'GET' || method === 'HEAD') {
    return new Request(url, { method, headers })
  }
  const stream = getRequestWebStream(event)
  if (stream) {
    return new Request(url, { method, headers, body: stream, duplex: 'half' } as RequestInit)
  }
  const raw = await readRawBody(event, false)
  const body = raw ? Uint8Array.from(raw) : undefined
  return new Request(url, { method, headers, body, duplex: 'half' } as RequestInit)
}

/**
 * Streamable HTTP MCP at POST/GET/DELETE /mcp.
 * A browser navigating here is sent to the human docs.
 */
export default defineEventHandler(async (event) => {
  const accept = getHeader(event, 'accept') ?? ''
  if (event.method === 'GET' && accept.includes('text/html') && !accept.includes('text/event-stream')) {
    return sendRedirect(event, '/docs#mcp', 302)
  }

  const request = event.web?.request ?? (await toMcpRequest(event))
  const response = withMcpCors(await cyberwatchMcpHandler.fetch(request))
  return sendWebResponse(event, response)
})
