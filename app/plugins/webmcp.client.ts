import type { Incident, Locale } from '~/types/cyberwatch'
import { filtersToQuery } from '~/utils/filter-query'

interface WebMcpToolResult {
  content: Array<{ type: 'text'; text: string }>
  isError?: boolean
}

interface WebMcpTool {
  name: string
  description: string
  inputSchema?: Record<string, unknown>
  annotations?: { readOnlyHint?: boolean; destructiveHint?: boolean; idempotentHint?: boolean }
  execute: (args: Record<string, unknown>) => Promise<WebMcpToolResult> | WebMcpToolResult
}

interface WebMcpModelContext {
  registerTool: (tool: WebMcpTool) => void
  unregisterTool?: (name: string) => void
}

type WebMcpPage = 'home' | 'incidents' | 'guidance' | 'numbers' | 'docs' | 'learn' | 'quiz'

const PAGE_PATH: Record<WebMcpPage, string> = {
  home: '/',
  incidents: '/incidents',
  guidance: '/guidance',
  numbers: '/numbers',
  docs: '/docs',
  learn: '/learn',
  quiz: '/learn/quiz',
}

function jsonResult(data: unknown): WebMcpToolResult {
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
}

function textResult(text: string, isError = false): WebMcpToolResult {
  return { content: [{ type: 'text', text }], isError }
}

function getModelContext(): WebMcpModelContext | null {
  if (!window.isSecureContext) return null
  const fromNavigator = (navigator as Navigator & { modelContext?: WebMcpModelContext }).modelContext
  const fromDocument = (document as Document & { modelContext?: WebMcpModelContext }).modelContext
  return fromNavigator ?? fromDocument ?? null
}

function asLocale(value: unknown, fallback: Locale): Locale {
  return value === 'en' || value === 'fr' ? value : fallback
}

function listedIncident(incident: Incident, locale: Locale, sectorLabel: string) {
  return {
    id: incident.id,
    date: incident.date,
    year: incident.year,
    org: incident.org[locale],
    kind: incident.kind,
    sector: incident.sector,
    sectorLabel,
    severity: incident.severity,
    status: incident.status,
    affected: incident.affected,
    affectedLabel: incident.affectedLabel[locale],
    method: incident.method[locale],
    sourceName: incident.sourceName,
    sourceUrl: incident.sourceUrl,
    url: locale === 'fr' ? `/fr/incident/${incident.id}` : `/incident/${incident.id}`,
  }
}


/**
 * Registers in-page tools with the WebMCP API when the browser exposes it
 * (Chrome flag, origin trial, or a WebMCP bridge). No-ops otherwise.
 */
export default defineNuxtPlugin(() => {
  const modelContext = getModelContext()
  if (!modelContext) return

  const { locale, localePath } = useLocale()
  const { incidents, data, sectorLabel, largestConfirmedAffected, incidentComposition } = useCyberData()
  const { filters, matchCount } = useFilters()
  const route = useRoute()

  const tools: WebMcpTool[] = [
    {
      name: 'get_page_context',
      description:
        'Where the reader is on France Cyberwatch: path, locale, page kind, and the open incident id if any.',
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
      execute: () => {
        const path = route.path
        const incidentMatch = path.match(/\/incident\/([^/]+)$/)
        const page = incidentMatch
          ? 'incident'
          : path.includes('/learn/quiz')
            ? 'quiz'
            : path.includes('/learn/')
              ? 'explainer'
              : path.includes('/learn')
                ? 'learn'
                : path.includes('/incidents')
                  ? 'incidents'
                  : path.includes('/guidance')
                    ? 'guidance'
                    : path.includes('/numbers')
                      ? 'numbers'
                      : path.includes('/docs')
                        ? 'docs'
                        : 'home'
        return jsonResult({
          path,
          locale: locale.value,
          page,
          incidentId: incidentMatch?.[1] ?? null,
          filters: filters.value,
          matchCount: matchCount.value,
        })
      },
    },
    {
      name: 'list_incidents',
      description:
        'Search the France Cyberwatch dataset already loaded in this page. affected is null when unpublished — never 0.',
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
      inputSchema: {
        type: 'object',
        properties: {
          q: { type: 'string', description: 'Full-text search.' },
          kind: { type: 'string', enum: ['government', 'company'] },
          severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
          status: { type: 'string', enum: ['confirmed', 'disputed', 'unknown'] },
          sector: { type: 'string' },
          year: { type: 'number' },
          limit: { type: 'number', description: '1–200, default 50.' },
          lang: { type: 'string', enum: ['en', 'fr'] },
        },
      },
      execute: (args) => {
        const lang = asLocale(args.lang, locale.value)
        const limit = Math.min(200, Math.max(1, Number(args.limit ?? 50) || 50))
        const matched = incidents.value.filter((incident) =>
          incidentMatches(
            incident,
            {
              q: typeof args.q === 'string' ? args.q : undefined,
              kind: typeof args.kind === 'string' ? args.kind : undefined,
              severity: typeof args.severity === 'string' ? args.severity : undefined,
              status: typeof args.status === 'string' ? args.status : undefined,
              sector: typeof args.sector === 'string' ? args.sector : undefined,
              year: typeof args.year === 'number' || typeof args.year === 'string' ? args.year : undefined,
            },
            lang,
          ),
        )
        return jsonResult({
          total: matched.length,
          returned: Math.min(limit, matched.length),
          withoutPublishedCount: matched.filter((incident) => incident.affected === null).length,
          incidents: matched.slice(0, limit).map((incident) => listedIncident(incident, lang, sectorLabel(incident.sector))),
        })
      },
    },
    {
      name: 'get_incident',
      description: 'One incident from the in-page dataset, localized. Unknown ids list the valid ones.',
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
      inputSchema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Incident id, e.g. ants.' },
          lang: { type: 'string', enum: ['en', 'fr'] },
        },
        required: ['id'],
      },
      execute: (args) => {
        const id = String(args.id ?? '')
        const lang = asLocale(args.lang, locale.value)
        const incident = incidents.value.find((entry) => entry.id === id)
        if (!incident) {
          return textResult(`Incident not found: ${id}. Known ids: ${incidents.value.map((entry) => entry.id).join(', ')}`, true)
        }
        return jsonResult({
          ...listedIncident(incident, lang, sectorLabel(incident.sector)),
          data: incident.data[lang],
          risk: incident.risk[lang],
          confidence: incident.confidence[lang],
          lastResearched: incident.lastResearched,
          detail: {
            lead: incident.detail.lead[lang],
            how: incident.detail.how[lang],
            taken: incident.detail.taken[lang],
            notTaken: incident.detail.notTaken[lang],
            impact: incident.detail.impact[lang],
            response: incident.detail.response[lang],
            methodDisclosure: incident.detail.methodDisclosure,
            ...(incident.detail.attackerClaim ? { attackerClaim: incident.detail.attackerClaim[lang] } : {}),
          },
        })
      },
    },
    {
      name: 'get_summary',
      description:
        'ANSSI and CNIL national figures plus counts from this list. Aggregates never include unknown or disputed attacker claims.',
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
      execute: () => {
        const payload = data.value
        if (!payload) return textResult('Dataset is not loaded on this page.', true)
        const largest = largestConfirmedAffected.value
        return jsonResult({
          reviewedThrough: payload.project.reviewedThrough,
          national: payload.summaryStats,
          curated: {
            incidents: incidents.value.length,
            ...incidentComposition.value,
            largestConfirmedAffected: largest
              ? { id: largest.id, org: largest.org[locale.value], affected: largest.affected, date: largest.date }
              : null,
          },
        })
      },
    },
    {
      name: 'open_incident',
      description: 'Navigate this tab to the incident article in the current language.',
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
      inputSchema: {
        type: 'object',
        properties: { id: { type: 'string', description: 'Incident id, e.g. ants.' } },
        required: ['id'],
      },
      execute: async (args) => {
        const id = String(args.id ?? '')
        const incident = incidents.value.find((entry) => entry.id === id)
        if (!incident) {
          return textResult(`Incident not found: ${id}. Known ids: ${incidents.value.map((entry) => entry.id).join(', ')}`, true)
        }
        await navigateTo(localePath(`/incident/${id}`))
        return textResult(`Opened ${incident.org[locale.value]} at ${localePath(`/incident/${id}`)}.`)
      },
    },
    {
      name: 'open_page',
      description:
        'Navigate this tab to a France Cyberwatch section: home, incidents, guidance, numbers, docs, learn, or quiz.',
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'string',
            enum: ['home', 'incidents', 'guidance', 'numbers', 'docs', 'learn', 'quiz'],
          },
        },
        required: ['page'],
      },
      execute: async (args) => {
        const page = args.page as WebMcpPage
        const path = PAGE_PATH[page]
        if (!path) return textResult(`Unknown page: ${String(args.page)}`, true)
        const href = localePath(path)
        await navigateTo(href)
        return textResult(`Opened ${href}.`)
      },
    },
    {
      name: 'filter_timeline',
      description:
        'Apply timeline filters and open the incidents page with a shareable query string. Does not invent missing counts.',
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
      inputSchema: {
        type: 'object',
        properties: {
          q: { type: 'string' },
          kind: { type: 'string', enum: ['government', 'company'] },
          severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
          status: { type: 'string', enum: ['confirmed', 'disputed', 'unknown'] },
          sector: { type: 'string' },
          year: { type: 'number' },
        },
      },
      execute: async (args) => {
        const next = emptyFilterState()
        if (typeof args.q === 'string') next.query = args.q
        if (args.kind === 'government' || args.kind === 'company') next.kind = args.kind
        if (args.severity === 'critical' || args.severity === 'high' || args.severity === 'medium' || args.severity === 'low') {
          next.severity = args.severity
        }
        if (args.status === 'confirmed' || args.status === 'disputed' || args.status === 'unknown') next.status = args.status
        if (typeof args.sector === 'string') next.sector = args.sector
        if (typeof args.year === 'number' && Number.isFinite(args.year)) next.year = args.year
        filters.value = next
        const href = localePath('/incidents')
        await navigateTo({ path: href, query: filtersToQuery(next) })
        return textResult(`Filters applied on ${href}. ${matchCount.value} matching incidents.`)
      },
    },
    {
      name: 'reset_filters',
      description: 'Clear timeline filters and open the full incident list.',
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
      execute: async () => {
        filters.value = emptyFilterState()
        const href = localePath('/incidents')
        await navigateTo({ path: href, query: {} })
        return textResult(`Filters cleared. ${incidents.value.length} incidents on ${href}.`)
      },
    },
  ]

  for (const tool of tools) {
    try {
      modelContext.unregisterTool?.(tool.name)
    } catch {
      // Duplicate names throw on re-register; ignore a missing unregister.
    }
    modelContext.registerTool(tool)
  }
})
