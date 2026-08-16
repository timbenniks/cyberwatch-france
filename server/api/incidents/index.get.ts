import { queryIncidents } from '~~/server/utils/queries'
import { toCsv } from '~~/server/utils/dataset'

/**
 * GET /api/incidents
 *
 * Query: kind, sector, severity, status, year, from, to, q, lang, sort,
 * order, limit, offset, format=json|csv.
 */
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const result = queryIncidents({
    kind: query.kind as string | undefined,
    sector: query.sector as string | undefined,
    severity: query.severity as string | undefined,
    status: query.status as string | undefined,
    year: query.year as string | undefined,
    q: query.q as string | undefined,
    from: query.from as string | undefined,
    to: query.to as string | undefined,
    lang: query.lang as string | undefined,
    sort: query.sort as string | undefined,
    order: query.order as string | undefined,
    limit: query.limit as string | undefined,
    offset: query.offset as string | undefined,
  })

  if (query.format === 'csv') {
    setHeader(event, 'content-type', 'text/csv; charset=utf-8')
    setHeader(event, 'content-disposition', `attachment; filename="france-cyberwatch-${result.meta.lang}.csv"`)
    return toCsv(result.incidents)
  }

  return result
})
