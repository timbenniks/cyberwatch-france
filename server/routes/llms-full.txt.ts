import { dataset, incidents, isLocale } from '~~/server/utils/dataset'

/** Every record as markdown, so a model never has to scrape the rendered page. */
export default defineEventHandler((event) => {
  const base = (useRuntimeConfig().public.siteUrl || getRequestURL(event).origin).replace(/\/$/, '')
  const lang = isLocale(getQuery(event).lang) ? (getQuery(event).lang as 'en' | 'fr') : 'en'
  const prefix = lang === 'fr' ? '/fr' : ''

  const records = incidents.map((incident) =>
    [
      `## ${incident.org[lang]}`,
      '',
      `- Date: ${incident.date}`,
      `- Type: ${incident.kind}`,
      `- Sector: ${dataset.ui.sectorLabels[incident.sector]?.[lang] ?? incident.sector}`,
      `- Severity: ${incident.severity}`,
      `- Evidence status: ${incident.status}`,
      `- People or records affected: ${
        incident.affected === null
          ? `unknown — ${incident.affectedLabel[lang]}`
          : `${incident.affected} (${incident.affectedLabel[lang]})`
      }`,
      `- Data and systems affected: ${incident.data[lang]}`,
      `- Known or suspected entry method: ${incident.method[lang]}`,
      `- Why it matters to the public: ${incident.risk[lang]}`,
      `- Evidence note: ${incident.confidence[lang]}`,
      `- Source: ${incident.sourceName} — ${incident.sourceUrl}`,
      `- Page: ${base}${prefix}/incident/${incident.id}`,
      `- API: ${base}/api/incidents/${incident.id}`,
    ].join('\n'),
  )

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

${dataset.sources.map((source) => `- ${source.name} — ${source.url}`).join('\n')}
`
})
