import { dataset, isLocale, meta } from '~~/server/utils/dataset'
import type { Recommendation } from '~~/app/types/cyberwatch'

/** GET /api/recommendations?audience=organizations|public */
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const lang = isLocale(query.lang) ? query.lang : 'en'
  const audience = query.audience === 'public' || query.audience === 'organizations' ? query.audience : undefined

  const localize = (items: Recommendation[]) =>
    items.map((item) => ({ id: item.id, title: item.title[lang], description: item.description[lang] }))

  const all = {
    organizations: localize(dataset.recommendations.organizations),
    public: localize(dataset.recommendations.public),
  }

  return { meta: { ...meta, lang }, recommendations: audience ? { [audience]: all[audience] } : all }
})
