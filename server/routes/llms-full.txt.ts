import { dataset, incidents, localizeIncident, sourcesFor } from '~~/server/utils/dataset'
import { resolveRequestContext } from '~~/server/utils/request-context'

function incidentToMarkdown(
  incident: (typeof incidents)[number],
  lang: 'en' | 'fr',
  base: string,
  prefix: string,
) {
  const localized = localizeIncident(incident, lang)
  const cited = sourcesFor(incident)
  const { detail } = localized

  return [
    `## ${localized.org}`,
    '',
    `- Date: ${localized.date}`,
    `- Type: ${localized.kind}`,
    `- Sector: ${localized.sectorLabel}`,
    `- Severity: ${localized.severity}`,
    `- Evidence status: ${localized.status}`,
    `- Method disclosure: ${detail.methodDisclosure}`,
    `- People or records affected: ${
      localized.affected === null
        ? `unknown — ${localized.affectedLabel}`
        : `${localized.affected} (${localized.affectedLabel})`
    }`,
    `- Last researched: ${localized.lastResearched}`,
    `- Lead: ${detail.lead}`,
    `- How it happened: ${detail.how}`,
    `- What was exposed: ${detail.taken}`,
    `- What was not in scope: ${detail.notTaken}`,
    `- What it meant in practice: ${detail.impact}`,
    `- Why it matters to the public: ${localized.risk}`,
    `- What was done next: ${detail.response}`,
    `- Evidence note: ${localized.confidence}`,
    ...('attackerClaim' in detail && detail.attackerClaim
      ? [`- Attacker claim (not a confirmed count): ${detail.attackerClaim}`]
      : []),
    ...('revision' in detail && detail.revision ? [`- What later reporting changed: ${detail.revision}`] : []),
    ...('quotes' in detail && detail.quotes?.length
      ? [
          `- Quotes:`,
          ...detail.quotes.map((quote) => `  - ${quote.text} — ${quote.attribution}`),
        ]
      : []),
    ...(detail.timeline.length
      ? [`- Dated facts:`, ...detail.timeline.map((entry) => `  - ${entry.date}: ${entry.label}`)]
      : []),
    `- Sources:`,
    ...cited.map(
      (source) =>
        `  - [${source.kind}] ${source.publisher}${source.published ? `, ${source.published}` : ''} — ${source.name} — ${source.url}`,
    ),
    `- Page: ${base}${prefix}/incident/${localized.id}`,
    `- API: ${base}/api/incidents/${localized.id}`,
  ].join('\n')
}

/** Every record as markdown, so a model never has to scrape the rendered page. */
export default defineEventHandler((event) => {
  const { base, lang, prefix } = resolveRequestContext(event)
  const records = incidents.map((incident) => incidentToMarkdown(incident, lang, base, prefix))

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')

  return `# ${dataset.project.name} — full records

> ${dataset.project.scope[lang]}

Reviewed through ${dataset.project.reviewedThrough}. A null count means unknown, never zero. Disputed scope is marked and its figures are never treated as confirmed. See ${base}/llms.txt for the full usage rules.

# Incidents (newest first)

${records.join('\n\n')}

# Recurring patterns

${dataset.patterns
  .map(
    (pattern) =>
      `## ${pattern.title[lang]}\n\n${pattern.description[lang]}\n\nPriority control: ${pattern.priority[lang]}`,
  )
  .join('\n\n')}

# Guidance for organisations

${dataset.recommendations.organizations
  .map((item) => `## ${item.title[lang]}\n\n${item.description[lang]}`)
  .join('\n\n')}

# Guidance for the public

${dataset.recommendations.public.map((item) => `## ${item.title[lang]}\n\n${item.description[lang]}`).join('\n\n')}

# Sources

${dataset.sources.map((source) => `- [${source.kind}] ${source.publisher} — ${source.name} — ${source.url}`).join('\n')}
`
})
