import type { Incident, Locale } from '../../app/types/cyberwatch'

/** Filters used by the site and the public API. `'all'` / empty means unset. */
export interface IncidentMatchQuery {
  q?: string
  kind?: string
  severity?: string
  status?: string
  year?: string | number
  sector?: string
  from?: string
  to?: string
}

function isSet(value: unknown): value is string | number {
  return value !== undefined && value !== null && value !== '' && value !== 'all'
}

/** One matcher so the timeline and GET /api/incidents cannot drift. */
export function incidentMatches(incident: Incident, query: IncidentMatchQuery, locale: Locale): boolean {
  if (isSet(query.kind) && incident.kind !== query.kind) return false
  if (isSet(query.severity) && incident.severity !== query.severity) return false
  if (isSet(query.status) && incident.status !== query.status) return false
  if (isSet(query.year) && incident.year !== Number(query.year)) return false
  if (isSet(query.sector) && incident.sector.toLowerCase() !== String(query.sector).toLowerCase()) return false
  if (query.from && incident.date < query.from) return false
  if (query.to && incident.date > query.to) return false

  const needle = query.q?.trim().toLowerCase()
  if (!needle) return true

  return [
    incident.org.en,
    incident.org.fr,
    incident.sector,
    incident.confidence.en,
    incident.confidence.fr,
    incident.sourceName,
    incident.affectedLabel[locale],
    incident.data[locale],
    incident.method[locale],
    incident.risk[locale],
  ]
    .join(' ')
    .toLowerCase()
    .includes(needle)
}
