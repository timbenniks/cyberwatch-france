import { dataset, isLocale, meta } from '~~/server/utils/dataset'

/** GET /api/patterns — the recurring weaknesses and their priority control. */
export default defineEventHandler((event) => {
  const lang = isLocale(getQuery(event).lang) ? (getQuery(event).lang as 'en' | 'fr') : 'en'
  return {
    meta: { ...meta, lang },
    patterns: dataset.patterns.map((pattern) => ({
      id: pattern.id,
      title: pattern.title[lang],
      description: pattern.description[lang],
      priority: pattern.priority[lang],
    })),
  }
})
