import { incidents, meta } from '~~/server/utils/dataset'
import { explainers } from '~~/server/utils/explainers'

const escape = (value: string) =>
  value.replace(/[<>&'"]/g, (char) => `&${{ '<': 'lt', '>': 'gt', '&': 'amp', "'": 'apos', '"': 'quot' }[char]};`)

/** Every page in both languages, each pointing at its twin via hreflang. */
export default defineEventHandler((event) => {
  const base = (useRuntimeConfig().public.siteUrl || getRequestURL(event).origin).replace(/\/$/, '')
  const paths = [
    '/',
    '/incidents',
    '/guidance',
    '/numbers',
    '/docs',
    '/learn',
    ...incidents.map((incident) => `/incident/${incident.id}`),
    ...explainers.map((explainer) => `/learn/${explainer.slug}`),
  ]

  const urls = paths.flatMap((path) =>
    (['en', 'fr'] as const).map((locale) => {
      const href = `${base}${locale === 'fr' ? (path === '/' ? '/fr' : `/fr${path}`) : path}`
      const links = (['en', 'fr'] as const)
        .map((alternate) => {
          const target = `${base}${alternate === 'fr' ? (path === '/' ? '/fr' : `/fr${path}`) : path}`
          return `    <xhtml:link rel="alternate" hreflang="${alternate}" href="${escape(target)}"/>`
        })
        .join('\n')

      return [
        '  <url>',
        `    <loc>${escape(href)}</loc>`,
        `    <lastmod>${meta.reviewedThrough}</lastmod>`,
        links,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(`${base}${path}`)}"/>`,
        `    <priority>${path === '/' ? '1.0' : path === '/docs' || path.startsWith('/learn') ? '0.7' : '0.8'}</priority>`,
        '  </url>',
      ].join('\n')
    }),
  )

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
  ].join('\n')
})
