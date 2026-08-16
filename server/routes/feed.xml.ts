import { dataset, incidents } from '~~/server/utils/dataset'
import { resolveRequestContext } from '~~/server/utils/request-context'
import { escapeXml } from '~~/server/utils/xml'

/** RSS of the tracked incidents, newest first. `?lang=fr` for French. */
export default defineEventHandler((event) => {
  const { base, lang, prefix } = resolveRequestContext(event)

  const items = incidents.map((incident) => {
    const url = `${base}${prefix}/incident/${incident.id}`
    // The affected label carries "unknown" honestly; a bare number would not.
    const summary = `${incident.affectedLabel[lang]} — ${incident.data[lang]}`
    return [
      '    <item>',
      `      <title>${escapeXml(`${incident.org[lang]} — ${dataset.ui.sectorLabels[incident.sector]?.[lang] ?? incident.sector}`)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${new Date(`${incident.date}T00:00:00Z`).toUTCString()}</pubDate>`,
      `      <category>${escapeXml(incident.kind)}</category>`,
      `      <category>${escapeXml(incident.severity)}</category>`,
      `      <description>${escapeXml(summary)}</description>`,
      `      <source url="${escapeXml(incident.sourceUrl)}">${escapeXml(incident.sourceName)}</source>`,
      '    </item>',
    ].join('\n')
  })

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(dataset.project.name)}</title>`,
    `    <link>${escapeXml(`${base}${prefix}/`)}</link>`,
    `    <description>${escapeXml(dataset.project.scope[lang])}</description>`,
    `    <language>${lang}</language>`,
    `    <lastBuildDate>${new Date(`${dataset.project.reviewedThrough}T00:00:00Z`).toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(`${base}/feed.xml${lang === 'fr' ? '?lang=fr' : ''}`)}" rel="self" type="application/rss+xml"/>`,
    ...items,
    '  </channel>',
    '</rss>',
  ].join('\n')
})
