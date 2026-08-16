import { querySummary, resolveLocale } from '~~/server/utils/queries'

/**
 * GET /api/summary — the national context figures plus counts derived from the
 * curated list. Aggregates only ever count published numbers: unknown values
 * stay out, and disputed attacker claims are never added in.
 */
export default defineEventHandler((event) => querySummary(resolveLocale(getQuery(event).lang)))
