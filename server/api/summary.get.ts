import { dataset, incidents, isLocale, meta } from '~~/server/utils/dataset'

/**
 * GET /api/summary — the national context figures plus counts derived from the
 * curated list. Aggregates only ever count published numbers: unknown values
 * stay out, and disputed attacker claims are never added in.
 */
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const lang = isLocale(query.lang) ? query.lang : 'en'

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
})
