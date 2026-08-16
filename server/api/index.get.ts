import { dataset, incidents, meta } from '~~/server/utils/dataset'
import { apiConventions, apiEndpoints } from '~~/shared/utils/api-catalog'

/** GET /api — self-describing index, so the API is usable without the HTML docs. */
export default defineEventHandler((event) => {
  const base = getRequestURL(event).origin

  return {
    name: 'France Cyberwatch API',
    description:
      'Read-only public API over the France Cyberwatch 2025—2026 dataset. Open CORS, cached at the edge, no key required. Human-readable docs: /docs and /fr/docs.',
    docs: `${base}/docs`,
    ...meta,
    counts: {
      incidents: incidents.length,
      sources: dataset.sources.length,
      patterns: dataset.patterns.length,
    },
    conventions: Object.fromEntries(
      apiConventions.map((convention) => [convention.id, convention.body.en]),
    ),
    endpoints: apiEndpoints.map((endpoint) => ({
      path: endpoint.path,
      description: endpoint.description.en,
      query: endpoint.query
        ? Object.fromEntries(endpoint.query.map((param) => [param.name, param.detail.en]))
        : undefined,
      examples: endpoint.examples.map((example) => `${base}${example}`),
    })),
    ids: incidents.map((incident) => incident.id),
  }
})
