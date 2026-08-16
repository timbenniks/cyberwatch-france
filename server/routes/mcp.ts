import { getHeader, getMethod, getRequestURL, getRequestWebStream, readRawBody, sendRedirect, sendWebResponse } from 'h3'
import { MCP_CORS_HEADERS } from '~~/server/utils/mcp-cors'
import { cyberwatchMcpHandler } from '~~/server/utils/mcp-handler'

function withMcpCors(response: Response): Response {
  const headers = new Headers(response.headers)
  for (const [name, value] of Object.entries(MCP_CORS_HEADERS)) {
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
    // duplex is required for a streaming Fetch body in Node / Vercel.
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
