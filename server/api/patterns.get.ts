import { queryPatterns, resolveLocale } from '~~/server/utils/queries'

/** GET /api/patterns — the recurring weaknesses and their priority control. */
export default defineEventHandler((event) => queryPatterns(resolveLocale(getQuery(event).lang)))
