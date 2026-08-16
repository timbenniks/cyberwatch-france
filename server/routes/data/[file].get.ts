const allowed = new Set(['france-cyberwatch-data.json', 'explainers.json'])

/**
 * Only the canonical published files. Research notes in data/research/ stay
 * off the public /data tree.
 */
export default defineEventHandler(async (event) => {
  const file = getRouterParam(event, 'file')
  if (!file || !allowed.has(file)) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  setHeader(event, 'content-type', 'application/json; charset=utf-8')

  if (file === 'explainers.json') {
    const raw = await import('~~/data/explainers.json')
    return raw.default ?? raw
  }

  const raw = await import('~~/data/france-cyberwatch-data.json')
  return raw.default ?? raw
})
