import type { CyberwatchData, Incident, Severity, Source } from '~/types/cyberwatch'

/**
 * The dataset, loaded once per request/page. On the server (including
 * prerender) it is read straight off disk; the client receives it in the Nuxt
 * payload, so there is no second fetch on first load.
 */
export async function loadCyberData() {
  return useAsyncData<CyberwatchData>('cyberwatch', async () => {
    if (import.meta.server) {
      const raw = await import('~~/data/france-cyberwatch-data.json')
      return (raw.default ?? raw) as CyberwatchData
    }
    return await $fetch<CyberwatchData>('/data/france-cyberwatch-data.json')
  })
}

export function useCyberData() {
  const payload = useNuxtData<CyberwatchData>('cyberwatch')
  const data = computed(() => payload.data.value ?? null)

  /** Newest first — the timeline, the table and every "latest" reference share this order. */
  const incidents = computed<Incident[]>(() =>
    data.value ? [...data.value.incidents].sort((a, b) => b.date.localeCompare(a.date)) : [],
  )

  const sourceById = computed<Map<string, Source>>(
    () => new Map((data.value?.sources ?? []).map((source) => [source.id, source])),
  )

  const severityOrder = computed<Severity[]>(
    () => data.value?.ui.severityOrder ?? ['critical', 'high', 'medium', 'low'],
  )

  const years = computed(() => [...new Set(incidents.value.map((i) => i.year))].sort((a, b) => b - a))

  const sectors = computed(() => [...new Set(incidents.value.map((i) => i.sector))].sort((a, b) => a.localeCompare(b)))

  /** Severities actually present, in the dataset's declared order. */
  const severitiesPresent = computed(() => {
    const present = new Set(incidents.value.map((i) => i.severity))
    return severityOrder.value.filter((s) => present.has(s))
  })

  /**
   * Largest published figure among confirmed incidents. Disputed claims and
   * unknown (null) values are excluded by construction, never coerced to 0.
   */
  const largestConfirmedAffected = computed<(Incident & { affected: number }) | null>(() => {
    const candidates = incidents.value.filter(
      (i): i is Incident & { affected: number } => i.status === 'confirmed' && typeof i.affected === 'number',
    )
    if (!candidates.length) return null
    return candidates.reduce((max, i) => (i.affected > max.affected ? i : max))
  })

  const withoutPublishedCount = computed(() => incidents.value.filter((i) => i.affected === null))

  const incidentComposition = computed(() => ({
    government: incidents.value.filter((incident) => incident.kind === 'government').length,
    company: incidents.value.filter((incident) => incident.kind === 'company').length,
    published: incidents.value.filter((incident) => typeof incident.affected === 'number').length,
    unknown: incidents.value.filter((incident) => incident.affected === null).length,
    disputed: incidents.value.filter((incident) => incident.status === 'disputed').length,
  }))

  const { locale } = useLocale()
  const sectorLabel = (sector: string) => data.value?.ui.sectorLabels?.[sector]?.[locale.value] ?? sector

  return {
    data,
    incidents,
    sourceById,
    severityOrder,
    severitiesPresent,
    years,
    sectors,
    sectorLabel,
    largestConfirmedAffected,
    withoutPublishedCount,
    incidentComposition,
  }
}
