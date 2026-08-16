import raw from '~~/data/france-cyberwatch-data.json'
import type { CyberwatchData, Incident, Locale, Source } from '~~/app/types/cyberwatch'

export const dataset = raw as unknown as CyberwatchData

/** Newest first, matching the site. */
export const incidents: Incident[] = [...dataset.incidents].sort((a, b) => b.date.localeCompare(a.date))

export const locales: Locale[] = ['en', 'fr']

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'fr'
}

export interface IncidentQuery {
  kind?: string
  sector?: string
  severity?: string
  status?: string
  year?: string
  q?: string
  from?: string
  to?: string
}

/**
 * Filtering mirrors the site exactly, including the rule that a null
 * `affected` is unknown: it is never treated as 0 and never filtered as one.
 */
export function filterIncidents(query: IncidentQuery, locale: Locale): Incident[] {
  return incidents.filter((incident) => incidentMatches(incident, query, locale))
}

/** Sources this record cites, in `sourceIds` order. */
export function sourcesFor(incident: Incident): Source[] {
  const ids = incident.sourceIds.length ? incident.sourceIds : [incident.sourceId]
  return ids
    .map((id) => dataset.sources.find((source) => source.id === id))
    .filter((source): source is Source => Boolean(source))
}

export function incidentCites(incident: Incident, sourceId: string): boolean {
  return incident.sourceId === sourceId || incident.sourceIds.includes(sourceId)
}

/** Collapses the bilingual fields to one language, keeping nulls as nulls. */
export function localizeIncident(incident: Incident, locale: Locale) {
  return {
    id: incident.id,
    date: incident.date,
    year: incident.year,
    org: incident.org[locale],
    domain: incident.domain,
    kind: incident.kind,
    sector: incident.sector,
    sectorLabel: dataset.ui.sectorLabels?.[incident.sector]?.[locale] ?? incident.sector,
    severity: incident.severity,
    status: incident.status,
    affected: incident.affected,
    affectedLabel: incident.affectedLabel[locale],
    data: incident.data[locale],
    method: incident.method[locale],
    risk: incident.risk[locale],
    confidence: incident.confidence[locale],
    sourceName: incident.sourceName,
    sourceId: incident.sourceId,
    sourceUrl: incident.sourceUrl,
    sourceIds: incident.sourceIds,
    lastResearched: incident.lastResearched,
    url: locale === 'fr' ? `/fr/incident/${incident.id}` : `/incident/${incident.id}`,
    detail: {
      lead: incident.detail.lead[locale],
      timeline: incident.detail.timeline.map((entry) => ({
        date: entry.date,
        label: entry.label[locale],
      })),
      how: incident.detail.how[locale],
      taken: incident.detail.taken[locale],
      notTaken: incident.detail.notTaken[locale],
      impact: incident.detail.impact[locale],
      response: incident.detail.response[locale],
      methodDisclosure: incident.detail.methodDisclosure,
      ...(incident.detail.attackerClaim ? { attackerClaim: incident.detail.attackerClaim[locale] } : {}),
      ...(incident.detail.revision ? { revision: incident.detail.revision[locale] } : {}),
      ...(incident.detail.quotes?.length
        ? {
            quotes: incident.detail.quotes.map((quote) => ({
              text: locale === quote.originalLang ? quote.original : quote.translation,
              original: quote.original,
              originalLang: quote.originalLang,
              attribution: quote.attribution[locale],
              sourceId: quote.sourceId,
            })),
          }
        : {}),
    },
  }
}

export type LocalizedIncident = ReturnType<typeof localizeIncident>

const csvColumns = [
  'id',
  'date',
  'org',
  'kind',
  'sector',
  'severity',
  'status',
  'affected',
  'affectedLabel',
  'data',
  'method',
  'risk',
  'confidence',
  'sourceName',
  'sourceUrl',
] as const

function csvCell(value: unknown): string {
  // Unknown stays empty. Writing 0 here would invent a fact.
  if (value === null || value === undefined) return ''
  const text = String(value)
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function toCsv(rows: LocalizedIncident[]): string {
  const body = rows.map((row) => csvColumns.map((column) => csvCell(row[column as keyof LocalizedIncident])).join(','))
  return [csvColumns.join(','), ...body].join('\n')
}

export const meta = {
  project: dataset.project.name,
  reviewedThrough: dataset.project.reviewedThrough,
  schemaVersion: dataset.schemaVersion,
  scope: dataset.project.scope,
  methodology: dataset.project.methodology,
  rules: dataset.ui.chartRules,
}
