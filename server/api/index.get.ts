import { dataset, incidents, meta } from '~~/server/utils/dataset'
import { resolveLocale } from '~~/server/utils/queries'
import { apiConventions, apiEndpoints } from '~~/shared/utils/api-catalog'

/** GET /api — self-describing index, so the API is usable without the HTML docs. */
export default defineEventHandler((event) => {
  const base = getRequestURL(event).origin
  const lang = resolveLocale(getQuery(event).lang)

  return {
    name: 'France Cyberwatch API',
    description:
      lang === 'fr'
        ? 'API publique en lecture seule sur le dossier France Cyberwatch 2025—2026. CORS ouvert, cache en edge, pas de clé. Documentation : /docs et /fr/docs. MCP Streamable HTTP : POST /mcp.'
        : 'Read-only public API over the France Cyberwatch 2025—2026 dataset. Open CORS, cached at the edge, no key required. Human-readable docs: /docs and /fr/docs. Streamable HTTP MCP: POST /mcp.',
    docs: `${base}${lang === 'fr' ? '/fr/docs' : '/docs'}`,
    mcp: {
      url: `${base}/mcp`,
      transport: 'streamable-http',
      docs: `${base}${lang === 'fr' ? '/fr/docs' : '/docs'}#mcp`,
      webmcp: `${base}${lang === 'fr' ? '/fr/docs' : '/docs'}#webmcp`,
    },
    ...meta,
    counts: {
      incidents: incidents.length,
      sources: dataset.sources.length,
      patterns: dataset.patterns.length,
    },
    conventions: Object.fromEntries(
      apiConventions.map((convention) => [convention.id, convention.body[lang]]),
    ),
    endpoints: apiEndpoints.map((endpoint) => ({
      path: endpoint.path,
      description: endpoint.description[lang],
      query: endpoint.query
        ? Object.fromEntries(endpoint.query.map((param) => [param.name, param.detail[lang]]))
        : undefined,
      examples: endpoint.examples.map((example) => `${base}${example}`),
    })),
    ids: incidents.map((incident) => incident.id),
  }
})
