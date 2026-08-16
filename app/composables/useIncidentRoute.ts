import type { Incident } from '~/types/cyberwatch'

/**
 * The open record is derived from the URL, so a prerendered /incident/:id page
 * ships the record in its HTML and a click merely changes the address.
 */
export function useIncidentRoute() {
  const route = useRoute()
  const { localePath } = useLocale()
  const { incidents } = useCyberData()
  const { filtered } = useFilters()

  const selected = computed(() => incidents.value.find((incident) => incident.id === route.params.id) ?? null)

  /** Step through what the reader is currently looking at, not the whole set. */
  const navigable = computed(() => (filtered.value.length ? filtered.value : incidents.value))
  const selectedIndex = computed(() =>
    selected.value ? navigable.value.findIndex((incident) => incident.id === selected.value!.id) : -1,
  )

  const open = (incident: Incident) => {
    trackPlausibleEvent('Open Incident', { id: incident.id })
    return navigateTo(localePath(`/incident/${incident.id}`))
  }
  const close = () => {
    trackPlausibleEvent('Close Incident')
    return navigateTo(localePath('/'))
  }

  function step(delta: number) {
    const next = navigable.value[selectedIndex.value + delta]
    if (next) open(next)
  }

  /** A link to an id that isn't in the dataset falls back to the overview. */
  watch([selected, incidents], () => {
    if (route.params.id && incidents.value.length && !selected.value) close()
  })

  return {
    selected,
    navigable,
    hasPrevious: computed(() => selectedIndex.value > 0),
    hasNext: computed(() => selectedIndex.value > -1 && selectedIndex.value < navigable.value.length - 1),
    open,
    close,
    step,
  }
}
