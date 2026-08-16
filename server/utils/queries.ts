import type { Locale, Recommendation } from '~~/app/types/cyberwatch'
import {
  dataset,
  filterIncidents,
  incidentCites,
  incidents,
  isLocale,
  localizeIncident,
  meta,
  sourcesFor,
  type IncidentQuery,
  type LocalizedIncident,
} from '~~/server/utils/dataset'

export interface ListIncidentsQuery extends IncidentQuery {
  lang?: string
  sort?: string
  order?: string
  limit?: string | number
  offset?: string | number
}

export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : 'en'
}

function sortIncidents(matched: typeof incidents, sort: string, descending: boolean, lang: Locale) {
  return [...matched].sort((a, b) => {
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
}

/** Same payload as GET /api/incidents (JSON). */
export function queryIncidents(query: ListIncidentsQuery) {
  const lang = resolveLocale(query.lang)
  const matched = filterIncidents(
    {
      kind: query.kind,
      sector: query.sector,
      severity: query.severity,
      status: query.status,
      year: query.year,
      q: query.q,
      from: query.from,
      to: query.to,
    },
    lang,
  )

  const sort = query.sort ?? 'date'
  const descending = (query.order ?? 'desc') !== 'asc'
  const sorted = sortIncidents(matched, sort, descending, lang)

  const offset = Math.max(0, Number(query.offset ?? 0) || 0)
  const limit = Math.min(200, Math.max(1, Number(query.limit ?? 100) || 100))
  const page: LocalizedIncident[] = sorted.slice(offset, offset + limit).map((incident) => localizeIncident(incident, lang))

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
}

/** Same payload as GET /api/incidents/:id, or null when the id is unknown. */
export function queryIncidentById(id: string, lang: Locale) {
  const incident = incidents.find((entry) => entry.id === id)
  if (!incident) return null

  const cited = sourcesFor(incident)
  return {
    meta: { ...meta, lang },
    incident: localizeIncident(incident, lang),
    source: cited[0] ?? dataset.sources.find((source) => source.id === incident.sourceId) ?? null,
    sources: cited,
  }
}

export function knownIncidentIds() {
  return incidents.map((incident) => incident.id)
}

/** Same payload as GET /api/summary. */
export function querySummary(lang: Locale) {
  const tally = <T extends string | number>(values: T[]) =>
    values.reduce<Record<string, number>>((acc, value) => ({ ...acc, [value]: (acc[String(value)] ?? 0) + 1 }), {})

  const published = incidents.filter(
    (incident): incident is (typeof incidents)[number] & { affected: number } =>
      incident.status === 'confirmed' && typeof incident.affected === 'number',
  )

  const largest = published.reduce<(typeof published)[number] | null>(
    (max, incident) => (!max || incident.affected > max.affected ? incident : max),
    null,
  )

  return {
    meta: { ...meta, lang },
    national: {
      anssi2025: dataset.summaryStats.anssi2025,
      cnil2025: dataset.summaryStats.cnil2025,
      sectorDistributionPercent: dataset.summaryStats.sectorDistributionPercent.map((share) => ({
        id: share.id,
        value: share.value,
        label: share.label[lang],
      })),
    },
    curated: {
      incidents: incidents.length,
      byKind: tally(incidents.map((incident) => incident.kind)),
      byYear: tally(incidents.map((incident) => incident.year)),
      bySector: tally(incidents.map((incident) => incident.sector)),
      bySeverity: tally(incidents.map((incident) => incident.severity)),
      byStatus: tally(incidents.map((incident) => incident.status)),
      withPublishedCount: published.length,
      withoutPublishedCount: incidents.filter((incident) => incident.affected === null).length,
      largestConfirmedAffected: largest
        ? { id: largest.id, org: largest.org[lang], affected: largest.affected, date: largest.date }
        : null,
    },
  }
}

/** Same payload as GET /api/sources. */
export function querySources() {
  return {
    meta,
    sources: dataset.sources.map((source) => ({
      ...source,
      citedBy: incidents.filter((incident) => incidentCites(incident, source.id)).map((incident) => incident.id),
    })),
  }
}

/** Same payload as GET /api/patterns. */
export function queryPatterns(lang: Locale) {
  return {
    meta: { ...meta, lang },
    patterns: dataset.patterns.map((pattern) => ({
      id: pattern.id,
      title: pattern.title[lang],
      description: pattern.description[lang],
      priority: pattern.priority[lang],
    })),
  }
}

/** Same payload as GET /api/recommendations. */
export function queryRecommendations(lang: Locale, audience?: 'organizations' | 'public') {
  const localize = (items: Recommendation[]) =>
    items.map((item) => ({
      id: item.id,
      title: item.title[lang],
      description: item.description[lang],
      explainerSlug: item.explainerSlug ?? null,
    }))

  const all = {
    organizations: localize(dataset.recommendations.organizations),
    public: localize(dataset.recommendations.public),
  }

  return { meta: { ...meta, lang }, recommendations: audience ? { [audience]: all[audience] } : all }
}
