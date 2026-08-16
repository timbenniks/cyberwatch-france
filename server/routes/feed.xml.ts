import { dataset, incidents, isLocale } from '~~/server/utils/dataset'

const escape = (value: string) =>
  value.replace(/[<>&'"]/g, (char) => `&${{ '<': 'lt', '>': 'gt', '&': 'amp', "'": 'apos', '"': 'quot' }[char]};`)

/** RSS of the tracked incidents, newest first. `?lang=fr` for French. */
export default defineEventHandler((event) => {
  const base = (useRuntimeConfig().public.siteUrl || getRequestURL(event).origin).replace(/\/$/, '')
  const lang = isLocale(getQuery(event).lang) ? (getQuery(event).lang as 'en' | 'fr') : 'en'
  const prefix = lang === 'fr' ? '/fr' : ''

  const items = incidents.map((incident) => {
    const url = `${base}${prefix}/incident/${incident.id}`
    // The affected label carries "unknown" honestly; a bare number would not.
    const summary = `${incident.affectedLabel[lang]} — ${incident.data[lang]}`
    return [
      '    <item>',
      `      <title>${escape(`${incident.org[lang]} — ${dataset.ui.sectorLabels[incident.sector]?.[lang] ?? incident.sector}`)}</title>`,
      `      <link>${escape(url)}</link>`,
      `      <guid isPermaLink="true">${escape(url)}</guid>`,
      `      <pubDate>${new Date(`${incident.date}T00:00:00Z`).toUTCString()}</pubDate>`,
      `      <category>${escape(incident.kind)}</category>`,
      `      <category>${escape(incident.severity)}</category>`,
      `      <description>${escape(summary)}</description>`,
      `      <source url="${escape(incident.sourceUrl)}">${escape(incident.sourceName)}</source>`,
      '    </item>',
    ].join('\n')
  })

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escape(dataset.project.name)}</title>`,
    `    <link>${escape(`${base}${prefix}/`)}</link>`,
    `    <description>${escape(dataset.project.scope[lang])}</description>`,
    `    <language>${lang}</language>`,
    `    <lastBuildDate>${new Date(`${dataset.project.reviewedThrough}T00:00:00Z`).toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${escape(`${base}/feed.xml${lang === 'fr' ? '?lang=fr' : ''}`)}" rel="self" type="application/rss+xml"/>`,
    ...items,
    '  </channel>',
    '</rss>',
  ].join('\n')
})
