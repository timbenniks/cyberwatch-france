import type { H3Event } from 'h3'
import { resolveLocale } from '~~/server/utils/queries'

export function resolveRequestContext(event: H3Event) {
  const base = (useRuntimeConfig().public.siteUrl || getRequestURL(event).origin).replace(/\/$/, '')
  const lang = resolveLocale(getQuery(event).lang)
  const prefix = lang === 'fr' ? '/fr' : ''
  return { base, lang, prefix }
}
