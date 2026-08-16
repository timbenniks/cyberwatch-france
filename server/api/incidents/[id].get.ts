import { incidents, isLocale, localizeIncident, meta } from '~~/server/utils/dataset'
import { dataset } from '~~/server/utils/dataset'

/** GET /api/incidents/:id — one record, plus its full source entry. */
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const query = getQuery(event)
  const lang = isLocale(query.lang) ? query.lang : 'en'

  const incident = incidents.find((entry) => entry.id === id)
  if (!incident) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Incident not found',
      data: { id, known: incidents.map((entry) => entry.id) },
    })
  }

  return {
    meta: { ...meta, lang },
    incident: localizeIncident(incident, lang),
    source: dataset.sources.find((source) => source.id === incident.sourceId) ?? null,
  }
})
