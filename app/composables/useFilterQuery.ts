import type { FilterState } from '~/composables/useFilters'

const KEYS = ['q', 'kind', 'severity', 'status', 'year', 'sector'] as const

/**
 * Mirrors the filter state into the URL, so a filtered view can be shared,
 * bookmarked and linked to — which is also what makes the schema.org
 * SearchAction on this site honest.
 *
 * Applied on mount rather than during setup: these pages are prerendered
 * without a query string, so reading it any earlier would make the client's
 * first render disagree with the server's markup.
 */
export function useFilterQuery() {
  const route = useRoute()
  const router = useRouter()
  const { filters } = useFilters()

  function applyFromUrl() {
    const query = route.query
    const next: Partial<FilterState> = {}
    if (typeof query.q === 'string') next.query = query.q
    if (typeof query.kind === 'string') next.kind = query.kind as FilterState['kind']
    if (typeof query.severity === 'string') next.severity = query.severity as FilterState['severity']
    if (typeof query.status === 'string') next.status = query.status as FilterState['status']
    if (typeof query.sector === 'string') next.sector = query.sector
    if (typeof query.year === 'string' && /^\d{4}$/.test(query.year)) next.year = Number(query.year)
    if (Object.keys(next).length) Object.assign(filters.value, next)
  }

  function syncToUrl() {
    const { query, kind, severity, status, year, sector } = filters.value
    const next: Record<string, string> = {}
    if (query) next.q = query
    if (kind !== 'all') next.kind = kind
    if (severity !== 'all') next.severity = severity
    if (status !== 'all') next.status = status
    if (sector !== 'all') next.sector = sector
    if (year !== 'all') next.year = String(year)

    const current = KEYS.map((key) => `${key}=${route.query[key] ?? ''}`).join('&')
    const target = KEYS.map((key) => `${key}=${next[key] ?? ''}`).join('&')
    if (current === target) return

    // Keep the rest of the query, and never push a history entry per keystroke.
    const preserved = Object.fromEntries(
      Object.entries(route.query).filter(([key]) => !KEYS.includes(key as (typeof KEYS)[number])),
    )
    router.replace({ path: route.path, query: { ...preserved, ...next }, hash: route.hash })
  }

  onMounted(() => {
    applyFromUrl()
    watch(filters, syncToUrl, { deep: true })
  })
}
