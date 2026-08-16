import { queryRecommendations, resolveLocale } from '~~/server/utils/queries'

/** GET /api/recommendations?audience=organizations|public */
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const audience = query.audience === 'public' || query.audience === 'organizations' ? query.audience : undefined
  return queryRecommendations(resolveLocale(query.lang), audience)
})
