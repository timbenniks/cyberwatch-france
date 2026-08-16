import type { Incident } from '~/types/cyberwatch'

/**
 * Opening a record is a real navigation to `/incident/:id` (or `/fr/incident/:id`).
 * Prev/next step through the filtered set when the reader came from the timeline.
 */
export function useIncidentRoute() {
  const route = useRoute()
  const { localePath } = useLocale()
  const { incidents } = useCyberData()
  const { filtered } = useFilters()

  const selectedId = computed(() => {
    const id = route.params.id
    return typeof id === 'string' ? id : Array.isArray(id) ? id[0] : undefined
  })

  const selected = computed(() => incidents.value.find((incident) => incident.id === selectedId.value) ?? null)

  /** Step through what the reader is currently looking at, not the whole set. */
  const navigable = computed(() => (filtered.value.length ? filtered.value : incidents.value))
  const selectedIndex = computed(() =>
    selected.value ? navigable.value.findIndex((incident) => incident.id === selected.value!.id) : -1,
  )

  const open = (incident: Incident) => {
    trackPlausibleEvent('Open Incident', { id: incident.id })
    return navigateTo(localePath(`/incident/${incident.id}`))
  }

  function step(delta: number) {
    const next = navigable.value[selectedIndex.value + delta]
    if (next) open(next)
  }

  return {
    selected,
    navigable,
    previous: computed(() => (selectedIndex.value > 0 ? navigable.value[selectedIndex.value - 1] : undefined)),
    next: computed(() =>
      selectedIndex.value > -1 && selectedIndex.value < navigable.value.length - 1
        ? navigable.value[selectedIndex.value + 1]
        : undefined,
    ),
    open,
    step,
  }
}
