import type { Incident } from '~/types/cyberwatch'

/**
 * Schema.org graphs for the dossier.
 *
 * Everything here is derived from the dataset or from the site's own UI copy —
 * no field is filled in with a guess. Where the dataset cannot support a
 * property (an author, a licence), the property is left out rather than
 * invented: a wrong `creator` is worse than a missing one.
 */
export function useStructuredData() {
  const { data, incidents } = useCyberData()
  const { locale, t, L, localePath } = useLocale()
  const { absolute } = useSiteUrl()

  const datasetId = computed(() => `${absolute(localePath('/'))}#dataset`)

  /** Real coverage: first to last incident actually in the file. */
  const temporalCoverage = computed(() => {
    const dates = incidents.value.map((incident) => incident.date).sort()
    return dates.length ? `${dates[0]}/${dates[dates.length - 1]}` : undefined
  })

  const dataset = computed(() => ({
    '@type': 'Dataset',
    '@id': datasetId.value,
    name: data.value?.project.name,
    description: L(data.value?.project.scope),
    url: absolute(localePath('/')),
    inLanguage: ['en', 'fr'],
    isAccessibleForFree: true,
    dateModified: data.value?.project.reviewedThrough,
    temporalCoverage: temporalCoverage.value,
    spatialCoverage: { '@type': 'Country', name: 'France' },
    keywords: [...new Set(incidents.value.map((incident) => incident.sector))],
    measurementTechnique: L(data.value?.project.methodology),
    variableMeasured: [
      'date',
      'organisation',
      'kind',
      'sector',
      'severity',
      'status',
      'affected',
      'data exposed',
      'entry method',
      'source',
    ],
    distribution: [
      {
        '@type': 'DataDownload',
        name: 'Full dataset (JSON)',
        encodingFormat: 'application/json',
        contentUrl: absolute('/data/france-cyberwatch-data.json'),
      },
      {
        '@type': 'DataDownload',
        name: 'Incidents (CSV)',
        encodingFormat: 'text/csv',
        contentUrl: absolute('/api/incidents?format=csv'),
      },
      {
        '@type': 'DataDownload',
        name: 'Incidents API (JSON)',
        encodingFormat: 'application/json',
        contentUrl: absolute('/api/incidents'),
      },
    ],
  }))

  const website = computed(() => ({
    '@type': 'WebSite',
    '@id': `${absolute('/')}#website`,
    name: data.value?.project.name,
    url: absolute('/'),
    inLanguage: locale.value,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absolute(localePath('/'))}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }))

  /** Plain-language definitions, so an answer engine can quote them properly. */
  const glossaryTerms = computed(() => ({
    '@type': 'DefinedTermSet',
    '@id': `${absolute(localePath('/'))}#glossary`,
    name: t('whatDoesThisMean'),
    inLanguage: locale.value,
    hasDefinedTerm: glossary.map((entry) => ({
      '@type': 'DefinedTerm',
      '@id': `${absolute(localePath('/'))}#term-${entry.id}`,
      name: L(entry.term),
      description: L(entry.definition),
    })),
  }))

  function incidentArticle(incident: Incident) {
    const url = absolute(localePath(`/incident/${incident.id}`))
    const citations = (incident.sourceIds.length ? incident.sourceIds : [incident.sourceId])
      .map((id) => data.value?.sources.find((source) => source.id === id))
      .filter((source): source is NonNullable<typeof source> => Boolean(source))
      .map((source) => ({ '@type': 'CreativeWork', name: source.name, url: source.url }))

    return {
      '@type': 'Article',
      '@id': `${url}#record`,
      headline: `${incident.org[locale.value]} — ${data.value?.ui.sectorLabels[incident.sector]?.[locale.value] ?? incident.sector}, ${formatDate(incident.date, locale.value)}`,
      description: L(incident.detail.lead),
      url,
      mainEntityOfPage: url,
      inLanguage: locale.value,
      isPartOf: { '@id': datasetId.value },
      // The date the reported events happened, not a publication date.
      contentReferenceTime: incident.date,
      dateModified: data.value?.project.reviewedThrough,
      about: { '@type': 'Organization', name: incident.org[locale.value], url: `https://${incident.domain}` },
      citation: citations.length === 1 ? citations[0] : citations,
      image: absolute('/og.png'),
    }
  }

  function breadcrumbs(incident: Incident) {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: data.value?.project.name, item: absolute(localePath('/')) },
        { '@type': 'ListItem', position: 2, name: incident.org[locale.value] },
      ],
    }
  }

  /** One @graph per page keeps the nodes cross-referenced by @id. */
  function graphFor(incident?: Incident | null) {
    const nodes: Record<string, unknown>[] = [website.value, dataset.value, glossaryTerms.value]
    if (incident) nodes.push(incidentArticle(incident), breadcrumbs(incident))
    return { '@context': 'https://schema.org', '@graph': nodes }
  }

  return { graphFor, datasetId }
}
