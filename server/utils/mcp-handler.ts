import { createMcpHandler, McpServer, ResourceTemplate, completable, preloadSchemas } from '@modelcontextprotocol/server'
import { z } from 'zod'
import { apiConventions } from '~~/shared/utils/api-catalog'
import { mcpPromptDocs, mcpResourceDocs, mcpToolDocs } from '~~/shared/utils/mcp-catalog'
import { dataset, incidents, meta } from '~~/server/utils/dataset'
import {
  knownIncidentIds,
  queryIncidentById,
  queryIncidents,
  queryPatterns,
  queryRecommendations,
  querySources,
  querySummary,
  resolveLocale,
} from '~~/server/utils/queries'

preloadSchemas()

const readOnly = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } as const

const langSchema = z.enum(['en', 'fr']).optional().describe('Response language. Defaults to en.')

function incidentIdSchema() {
  const ids = knownIncidentIds()
  return completable(z.string().describe(`Incident id. Known ids: ${ids.join(', ')}`), (value) =>
    ids.filter((id) => id.startsWith(value.toLowerCase())),
  )
}

function mcpJson(data: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
}

function mcpError(text: string) {
  return { content: [{ type: 'text' as const, text }], isError: true as const }
}

function conventionsMarkdown(lang: 'en' | 'fr') {
  return apiConventions.map((convention) => `## ${convention.title[lang]}\n\n${convention.body[lang]}`).join('\n\n')
}

function toolDoc(name: string) {
  return mcpToolDocs.find((entry) => entry.name === name)
}

const conventionsText = ['en', 'fr']
  .map((lang) => `# ${lang === 'fr' ? 'Français' : 'English'}\n\n${conventionsMarkdown(lang as 'en' | 'fr')}`)
  .join('\n\n')

const instructions = [
  'France Cyberwatch is a curated public dossier of major publicly reported cyberattacks and data breaches affecting French public institutions and companies in 2025–2026, plus ANSSI and CNIL national figures.',
  'Read cyberwatch://conventions before aggregating or quoting numbers.',
  'affected: null means unknown, not zero. Never sum it, never plot it as 0, never say "no victims". Quote affectedLabel instead.',
  'status "disputed" means a real breach whose headline scope is contested. Attacker-claimed figures live in affectedLabel / attackerClaim text only. Never promote them to a numeric total.',
  'Do not name an attacker unless the cited source on that record supports it. Do not infer a group from the method or the sector.',
  'This is not an exhaustive register of every French breach. Cite sourceName and sourceUrl on each record.',
  `Data reviewed through ${meta.reviewedThrough}. ${incidents.length} incidents in this list.`,
].join('\n')

function createCyberwatchMcpServer() {
  const siteUrl = String(useRuntimeConfig().public.siteUrl || '').replace(/\/$/, '')
  const server = new McpServer(
    {
      name: 'france-cyberwatch',
      version: '1.0.0',
      title: 'France Cyberwatch',
      ...(siteUrl ? { websiteUrl: siteUrl } : {}),
    },
    { instructions },
  )

  server.registerTool(
    'list_incidents',
    {
      title: 'List incidents',
      description: toolDoc('list_incidents')?.description.en
        ?? 'Search and filter incidents. Returns compact rows; unknown affected stays null.',
      annotations: readOnly,
      inputSchema: z.object({
        q: z.string().optional().describe('Full-text across organisation, sector, method, data, risk, source and incident-page fields.'),
        kind: z.enum(['government', 'company']).optional(),
        severity: z.enum(['critical', 'high', 'medium', 'low']).optional(),
        status: z.enum(['confirmed', 'disputed', 'unknown']).optional(),
        sector: z.string().optional().describe('Exact sector name, case-insensitive.'),
        year: z.number().int().optional().describe('e.g. 2026'),
        from: z.string().optional().describe('ISO date, inclusive lower bound.'),
        to: z.string().optional().describe('ISO date, inclusive upper bound.'),
        sort: z.enum(['date', 'affected', 'org']).optional(),
        order: z.enum(['desc', 'asc']).optional(),
        limit: z.number().int().min(1).max(200).optional(),
        offset: z.number().int().min(0).optional(),
        lang: langSchema,
      }),
    },
    async (params) => {
      return mcpJson(
        queryIncidents({
          ...params,
          year: params.year != null ? String(params.year) : undefined,
          compact: true,
        }),
      )
    },
  )

  server.registerTool(
    'get_incident',
    {
      title: 'Get one incident',
      description: toolDoc('get_incident')?.description.en
        ?? 'One incident with localized detail and every cited source.',
      annotations: readOnly,
      inputSchema: z.object({
        id: incidentIdSchema(),
        lang: langSchema,
      }),
    },
    async ({ id, lang }) => {
      const result = queryIncidentById(id, resolveLocale(lang))
      if (!result) {
        return mcpError(`Incident not found: ${id}. Known ids: ${knownIncidentIds().join(', ')}`)
      }
      return mcpJson(result)
    },
  )

  server.registerTool(
    'get_summary',
    {
      title: 'Get summary statistics',
      description: toolDoc('get_summary')?.description.en
        ?? 'ANSSI and CNIL national figures, plus counts from this list.',
      annotations: readOnly,
      inputSchema: z.object({ lang: langSchema }),
    },
    async ({ lang }) => mcpJson(querySummary(resolveLocale(lang))),
  )

  server.registerTool(
    'list_sources',
    {
      title: 'List sources',
      description: toolDoc('list_sources')?.description.en
        ?? 'Every source, with the incidents that cite it.',
      annotations: readOnly,
    },
    async () => mcpJson(querySources()),
  )

  server.registerTool(
    'list_patterns',
    {
      title: 'List repeating patterns',
      description: toolDoc('list_patterns')?.description.en
        ?? 'Recurring weaknesses and the priority control for each.',
      annotations: readOnly,
      inputSchema: z.object({ lang: langSchema }),
    },
    async ({ lang }) => mcpJson(queryPatterns(resolveLocale(lang))),
  )

  server.registerTool(
    'list_recommendations',
    {
      title: 'List recommendations',
      description: toolDoc('list_recommendations')?.description.en
        ?? 'Guidance for organisations and the public.',
      annotations: readOnly,
      inputSchema: z.object({
        audience: z.enum(['organizations', 'public']).optional(),
        lang: langSchema,
      }),
    },
    async ({ audience, lang }) => mcpJson(queryRecommendations(resolveLocale(lang), audience)),
  )

  server.registerResource(
    'conventions',
    'cyberwatch://conventions',
    {
      title: 'How to use the numbers',
      description: mcpResourceDocs.find((entry) => entry.name === 'cyberwatch://conventions')?.description.en
        ?? 'Unknown is not zero. Disputed scope stays disputed. No inferred attribution.',
      mimeType: 'text/markdown',
    },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: 'text/markdown', text: conventionsText }],
    }),
  )

  server.registerResource(
    'incident',
    new ResourceTemplate('cyberwatch://incident/{id}', {
      list: async () => ({
        resources: incidents.map((incident) => ({
          uri: `cyberwatch://incident/${incident.id}`,
          name: incident.org.en,
          mimeType: 'application/json',
        })),
      }),
    }),
    {
      title: 'Incident record',
      description: mcpResourceDocs.find((entry) => entry.name === 'cyberwatch://incident/{id}')?.description.en
        ?? 'Full localized incident JSON, same payload as get_incident.',
      mimeType: 'application/json',
    },
    async (uri, { id }) => {
      const lang = resolveLocale(uri instanceof URL ? uri.searchParams.get('lang') : undefined)
      const result = queryIncidentById(String(id), lang)
      if (!result) {
        return {
          contents: [{
            uri: uri.href,
            mimeType: 'text/plain',
            text: `Incident not found: ${id}. Known ids: ${knownIncidentIds().join(', ')}`,
          }],
        }
      }
      return { contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify(result, null, 2) }] }
    },
  )

  server.registerPrompt(
    'explain_incident',
    {
      title: 'Explain an incident',
      description: mcpPromptDocs.find((entry) => entry.name === 'explain_incident')?.description.en
        ?? 'Explain one record using only the dataset. Do not invent counts or attackers.',
      argsSchema: z.object({
        id: incidentIdSchema(),
        lang: z.enum(['en', 'fr']).optional().describe('Language for the explanation.'),
      }),
    },
    ({ id, lang }) => {
      const locale = resolveLocale(lang)
      const result = queryIncidentById(id, locale)
      const body = result
        ? JSON.stringify(result, null, 2)
        : `Incident not found: ${id}. Known ids: ${knownIncidentIds().join(', ')}`
      return {
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: [
                'Explain this France Cyberwatch incident for a general reader.',
                'Rules: unknown affected is not zero; disputed attacker claims stay claims; do not name an attacker unless the cited source does; cite sourceName and sourceUrl.',
                '',
                body,
              ].join('\n'),
            },
          },
        ],
      }
    },
  )

  server.registerPrompt(
    'brief_the_dossier',
    {
      title: 'Brief the dossier',
      description: mcpPromptDocs.find((entry) => entry.name === 'brief_the_dossier')?.description.en
        ?? 'A short briefing of the curated list, with the data rules stated first.',
      argsSchema: z.object({
        lang: z.enum(['en', 'fr']).optional(),
      }),
    },
    ({ lang }) => {
      const locale = resolveLocale(lang)
      const summary = querySummary(locale)
      return {
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: [
                'Brief the France Cyberwatch 2025—2026 dossier in a few paragraphs.',
                conventionsText,
                '',
                `Scope: ${dataset.project.scope[locale]}`,
                `Methodology: ${dataset.project.methodology[locale]}`,
                '',
                JSON.stringify(summary, null, 2),
              ].join('\n'),
            },
          },
        ],
      }
    },
  )

  return server
}

/**
 * Stateless Streamable HTTP handler. JSON responses (no SSE) so it runs on
 * Vercel functions; 2025-era clients are served by the SDK's stateless fallback.
 */
export const cyberwatchMcpHandler = createMcpHandler(createCyberwatchMcpServer, {
  responseMode: 'json',
  legacy: 'stateless',
})
