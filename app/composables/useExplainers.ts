import type { Explainer, ExplainerFile, Incident } from '~/types/cyberwatch'

/** Official public-help site already cited in the dossier. */
export const learnHelpUrl = 'https://www.cybermalveillance.gouv.fr/'

/**
 * Educational guides, loaded once per request/page. Incident facts are never
 * stored here: related records are resolved against the dossier by id.
 */
export async function loadExplainers() {
  return useAsyncData<ExplainerFile>('explainers', async () => {
    if (import.meta.server) {
      const raw = await import('~~/data/explainers.json')
      return (raw.default ?? raw) as ExplainerFile
    }
    return await $fetch<ExplainerFile>('/data/explainers.json')
  })
}

export function explainerParagraphs(body: string): string[] {
  return proseParagraphs(body)
}

export function useExplainers() {
  const payload = useNuxtData<ExplainerFile>('explainers')
  const { incidents } = useCyberData()

  const explainers = computed<Explainer[]>(() => payload.data.value?.explainers ?? [])

  const bySlug = (slug: string | undefined) =>
    slug ? (explainers.value.find((explainer) => explainer.slug === slug) ?? null) : null

  /** Drops unknown ids rather than inventing a related record. */
  function relatedIncidents(ids: string[]): Incident[] {
    const lookup = new Map(incidents.value.map((incident) => [incident.id, incident]))
    return ids.flatMap((id) => {
      const incident = lookup.get(id)
      return incident ? [incident] : []
    })
  }

  return { explainers, bySlug, relatedIncidents }
}
