/**
 * The API is public, read-only and derived from a file that changes rarely, so
 * every response is CORS-open and cached hard at the edge. Set here rather than
 * in routeRules so the behaviour is identical on any deploy target.
 */
export default defineEventHandler((event) => {
  if (!event.path.startsWith('/api')) return

  setHeader(event, 'access-control-allow-origin', '*')
  setHeader(event, 'access-control-allow-methods', 'GET, OPTIONS')
  setHeader(event, 'access-control-allow-headers', 'content-type')
  setHeader(event, 'access-control-max-age', 86400)
  setHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')

  if (event.method === 'OPTIONS') {
    setResponseStatus(event, 204)
    return ''
  }

  if (event.method !== 'GET') {
    throw createError({ statusCode: 405, statusMessage: 'This API is read-only' })
  }
})
