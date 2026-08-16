import type { FilterState } from '~/composables/useFilters'

export const filterQueryKeys = ['q', 'kind', 'severity', 'status', 'year', 'sector'] as const

/** Shareable URL shape used by /incidents, /numbers, SearchAction and WebMCP. */
export function filtersToQuery(state: FilterState): Record<string, string> {
  const query: Record<string, string> = {}
  if (state.query) query.q = state.query
  if (state.kind !== 'all') query.kind = state.kind
  if (state.severity !== 'all') query.severity = state.severity
  if (state.status !== 'all') query.status = state.status
  if (state.sector !== 'all') query.sector = state.sector
  if (state.year !== 'all') query.year = String(state.year)
  return query
}

export function queryToFilters(query: Record<string, unknown>): Partial<FilterState> {
  const next: Partial<FilterState> = {}
  if (typeof query.q === 'string') next.query = query.q
  if (typeof query.kind === 'string') next.kind = query.kind as FilterState['kind']
  if (typeof query.severity === 'string') next.severity = query.severity as FilterState['severity']
  if (typeof query.status === 'string') next.status = query.status as FilterState['status']
  if (typeof query.sector === 'string') next.sector = query.sector
  if (typeof query.year === 'string' && /^\d{4}$/.test(query.year)) next.year = Number(query.year)
  return next
}
