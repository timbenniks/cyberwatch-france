import { filterIncidents, isLocale, localizeIncident, meta, toCsv } from '~~/server/utils/dataset'

/**
 * GET /api/incidents
 *
 * Query: kind, sector, severity, status, year, from, to, q, lang, sort,
 * order, limit, offset, format=json|csv.
 */
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const lang = isLocale(query.lang) ? query.lang : 'en'

  const matched = filterIncidents(
    {
      kind: query.kind as string | undefined,
      sector: query.sector as string | undefined,
      severity: query.severity as string | undefined,
      status: query.status as string | undefined,
      year: query.year as string | undefined,
      q: query.q as string | undefined,
      from: query.from as string | undefined,
      to: query.to as string | undefined,
    },
    lang,
  )

  const sort = (query.sort as string) ?? 'date'
  const descending = ((query.order as string) ?? 'desc') !== 'asc'

  const sorted = [...matched].sort((a, b) => {
    if (sort === 'affected') {
      // Unknown counts sort last in both directions rather than acting as 0.
      if (a.affected === null && b.affected === null) return 0
      if (a.affected === null) return 1
      if (b.affected === null) return -1
      return descending ? b.affected - a.affected : a.affected - b.affected
    }
    if (sort === 'org') {
      return descending ? b.org[lang].localeCompare(a.org[lang]) : a.org[lang].localeCompare(b.org[lang])
    }
    return descending ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
  })

  const offset = Math.max(0, Number(query.offset ?? 0) || 0)
  const limit = Math.min(200, Math.max(1, Number(query.limit ?? 100) || 100))
  const page = sorted.slice(offset, offset + limit).map((incident) => localizeIncident(incident, lang))

  if (query.format === 'csv') {
    setHeader(event, 'content-type', 'text/csv; charset=utf-8')
    setHeader(event, 'content-disposition', `attachment; filename="france-cyberwatch-${lang}.csv"`)
    return toCsv(page)
  }

  return {
    meta: {
      ...meta,
      lang,
      total: matched.length,
      returned: page.length,
      offset,
      limit,
      withoutPublishedCount: matched.filter((incident) => incident.affected === null).length,
    },
    incidents: page,
  }
})
