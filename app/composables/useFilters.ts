import type { IncidentKind, IncidentStatus, Severity } from '~/types/cyberwatch'

export interface FilterState {
  query: string
  kind: IncidentKind | 'all'
  severity: Severity | 'all'
  status: IncidentStatus | 'all'
  year: number | 'all'
  sector: string | 'all'
}

const emptyFilters = (): FilterState => ({
  query: '',
  kind: 'all',
  severity: 'all',
  status: 'all',
  year: 'all',
  sector: 'all',
})

export function useFilters() {
  // useState keeps this per-request on the server; one shared object on the client.
  const filters = useState<FilterState>('filters', emptyFilters)
  const { incidents } = useCyberData()
  const { locale } = useLocale()

  const filtered = computed(() =>
    incidents.value.filter((incident) =>
      incidentMatches(incident, { ...filters.value, q: filters.value.query }, locale.value),
    ),
  )

  const isFiltered = computed(() => {
    const { query, kind, severity, status, year, sector } = filters.value
    return query !== '' || kind !== 'all' || severity !== 'all' || status !== 'all' || year !== 'all' || sector !== 'all'
  })

  const activeCount = computed(() => {
    const { query, kind, severity, status, year, sector } = filters.value
    return [kind, severity, status, year, sector].filter((value) => value !== 'all').length + (query ? 1 : 0)
  })

  function reset() {
    filters.value = emptyFilters()
  }

  /** Chart click-through: one dimension at a time, cleared of anything else. */
  function applyOnly(patch: Partial<FilterState>) {
    filters.value = { ...emptyFilters(), ...patch }
  }

  return {
    filters,
    filtered,
    matchCount: computed(() => filtered.value.length),
    isFiltered,
    activeCount,
    reset,
    applyOnly,
  }
}
