import { incidents } from '~~/server/utils/dataset'
import { queryIncidentById, resolveLocale } from '~~/server/utils/queries'

/** GET /api/incidents/:id — one record, plus every cited source. */
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const lang = resolveLocale(getQuery(event).lang)

  const result = id ? queryIncidentById(id, lang) : null
  if (!result) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Incident not found',
      data: { id, known: incidents.map((entry) => entry.id) },
    })
  }

  return result
})
