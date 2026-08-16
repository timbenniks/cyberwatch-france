import { dataset, incidents, isLocale } from '~~/server/utils/dataset'
import { explainers } from '~~/server/utils/explainers'
import { quizQuestions } from '~~/app/utils/quiz'

/**
 * https://llmstxt.org convention: a compact, link-first briefing an LLM can
 * read instead of scraping the rendered site.
 *
 * The "How to use this data correctly" section is the point. Most misuse of a
 * breach dataset is not malice, it is a model summing an unknown into a total
 * or repeating a disputed claim as fact — so the rules are stated up front,
 * in the same file as the links.
 */
export default defineEventHandler((event) => {
  const base = (useRuntimeConfig().public.siteUrl || getRequestURL(event).origin).replace(/\/$/, '')
  const lang = isLocale(getQuery(event).lang) ? (getQuery(event).lang as 'en' | 'fr') : 'en'
  const prefix = lang === 'fr' ? '/fr' : ''

  const published = incidents.filter((incident) => typeof incident.affected === 'number')
  const unknown = incidents.filter((incident) => incident.affected === null)
  const disputed = incidents.filter((incident) => incident.status === 'disputed')

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')

  return `# ${dataset.project.name}

> ${dataset.project.scope[lang]}

Data reviewed through ${dataset.project.reviewedThrough}. ${incidents.length} incidents, ${dataset.sources.length} sources, available in English (${base}/) and French (${base}/fr).

## How to use this data correctly

- **\`affected: null\` means unknown, not zero.** ${unknown.length} of the ${incidents.length} incidents have no published figure. Do not sum them as 0, do not describe them as "no victims", and do not fill the gap with an estimate. Each carries a plain-language \`affectedLabel\` — quote that instead.
- **Only ${published.length} incidents have a published count.** Any total you compute covers those ${published.length} only, and you should say so.
- **Disputed scope stays disputed.** ${disputed.length} incident(s) here have \`status: "disputed"\`: the breach is real but the headline figure is contested. Attacker claims live in label text, never in the numeric field. Do not promote them to fact.
- **Attribution is not in this dataset.** No attacker is named unless the cited source supports it. Do not infer one.
- **This is not an exhaustive register.** It is a curated set of major publicly reported incidents. Do not present it as "all French breaches".
- **Cite the original source.** Every incident carries \`sourceName\` and \`sourceUrl\` pointing at the official disclosure or the reporting. Cite that, and link this page as the aggregator.

Methodology: ${dataset.project.methodology[lang]}

## Structured access

- [API docs](${base}/docs): human-readable reference, also at ${base}/fr/docs. MCP install: ${base}/docs#mcp. WebMCP: ${base}/docs#webmcp.
- [API index](${base}/api): self-describing JSON; every endpoint, parameter and example.
- [MCP server](${base}/mcp): Streamable HTTP, no key. Tools: list_incidents, get_incident, get_summary, list_sources, list_patterns, list_recommendations. Install in Cursor with \`"url": "${base}/mcp"\` in mcp.json.
- [All incidents (JSON)](${base}/api/incidents): filter with \`q\`, \`kind\`, \`severity\`, \`status\`, \`sector\`, \`year\`, \`from\`, \`to\`; \`?lang=fr\` for French; \`?format=csv\` for CSV.
- [One incident](${base}/api/incidents/${incidents[0]?.id ?? 'id'}): a single record plus its source.
- [Summary statistics](${base}/api/summary): ANSSI and CNIL national figures, plus counts derived from this list.
- [Sources](${base}/api/sources): every source, with the incidents citing it.
- [Patterns](${base}/api/patterns) and [recommendations](${base}/api/recommendations): the recurring weaknesses, and guidance for organisations and the public.
- [Raw dataset](${base}/data/france-cyberwatch-data.json): the complete file this site is built from.
- [Public explainers](${base}${prefix}/learn): bilingual guides on what leaked data is used for. Incident facts still live only in the dataset; these pages link to records by id.
- [Leak-awareness quiz](${base}${prefix}/learn/quiz): ${quizQuestions.length} questions from those guides. Educational copy only; no unpublished incident figures.
- [Full text for LLMs](${base}/llms-full.txt): every record as markdown.

## Pages

- [Home](${base}${prefix || '/'}): what this dossier is, and the latest incidents.
- [Incidents](${base}${prefix}/incidents): the full timeline, filterable by kind, severity, status, sector and year. Search lives here (?q=).
- [What people can do](${base}${prefix}/guidance): public and organisation guidance.
- [Numbers](${base}${prefix}/numbers): charts, national ANSSI/CNIL figures, patterns, the data table and sources.
- [Leak-awareness quiz](${base}${prefix}/learn/quiz): a scored test of the public explainers.

${incidents
  .map(
    (incident) =>
      `- [${incident.org[lang]} — ${incident.date}](${base}${prefix}/incident/${incident.id}): ${dataset.ui.sectorLabels[incident.sector]?.[lang] ?? incident.sector}, ${incident.severity}, ${incident.status}. ${incident.affectedLabel[lang]}`,
  )
  .join('\n')}

## Public explainers

Educational copy, not incident records. Do not treat these pages as a source of victim counts.

${explainers
  .map(
    (explainer) =>
      `- [${explainer.title[lang]}](${base}${prefix}/learn/${explainer.slug}): ${explainer.dek[lang]}`,
  )
  .join('\n')}

## National context

Not from the curated list above — these are France-wide figures from the cited authorities:

- ANSSI handled ${dataset.summaryStats.anssi2025.securityEventsHandled} security events in 2025 (${dataset.summaryStats.anssi2025.reports} reports, ${dataset.summaryStats.anssi2025.incidents} incidents); ${dataset.summaryStats.anssi2025.confirmedLeakRatePercent}% of its ${dataset.summaryStats.anssi2025.possibleDataLeakEvents} possible-leak events were confirmed.
- The CNIL received ${dataset.summaryStats.cnil2025.personalDataBreachNotifications} personal-data breach notifications in 2025, around ${dataset.summaryStats.cnil2025.approxShareInvolvingHackingPercent}% involving hacking.
`
})
