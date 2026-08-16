import { meta } from '~~/server/utils/dataset'

/**
 * This is public-interest information whose purpose is to be found, quoted and
 * cited — by search engines and by answer engines alike. So everything is
 * allowed, and the machine-readable entry points are advertised up front.
 */
export default defineEventHandler((event) => {
  const base = (useRuntimeConfig().public.siteUrl || getRequestURL(event).origin).replace(/\/$/, '')

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')

  return [
    `# ${meta.project}`,
    `# Data reviewed through ${meta.reviewedThrough}.`,
    '# Crawling and quoting are welcome. Please cite the original source linked on each record,',
    '# and keep unknown victim counts unknown — see /llms.txt for the rules that govern this data.',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${base}/sitemap.xml`,
    '',
    '# Machine-readable entry points',
    `# API docs:   ${base}/docs`,
    `# API index:  ${base}/api`,
    `# MCP:        ${base}/mcp`,
    `# Full data:  ${base}/data/france-cyberwatch-data.json`,
    `# For LLMs:   ${base}/llms.txt`,
    `# Feed:       ${base}/feed.xml`,
  ].join('\n')
})
