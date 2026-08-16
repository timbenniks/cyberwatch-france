import { dataset, incidents, meta } from '~~/server/utils/dataset'

/** GET /api/sources — every source, with the incidents that cite it. */
export default defineEventHandler(() => ({
  meta,
  sources: dataset.sources.map((source) => ({
    ...source,
    citedBy: incidents.filter((incident) => incident.sourceId === source.id).map((incident) => incident.id),
  })),
}))
