import type { Incident, Locale } from '~/types/cyberwatch'

const localeTag: Record<Locale, string> = { en: 'en-GB', fr: 'fr-FR' }

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTag[locale]).format(value)
}

/** Chart labels and stat tiles: 11 700 000 → 11.7M / 11,7 M. */
export function formatCompact(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTag[locale], {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatPercent(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTag[locale], { style: 'percent', maximumFractionDigits: 0 }).format(value / 100)
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTag[locale], { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${iso}T00:00:00`),
  )
}

export function formatDateShort(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTag[locale], { day: '2-digit', month: 'short', year: 'numeric' }).format(
    new Date(`${iso}T00:00:00`),
  )
}

export function formatMonth(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTag[locale], { month: 'long', year: 'numeric' }).format(
    new Date(`${iso}T00:00:00`),
  )
}

/**
 * The single path for showing how many people or records an incident touched.
 * A null `affected` is unknown: it returns the dataset's own label, never "0".
 */
export function formatAffected(incident: Incident, locale: Locale): string {
  return incident.affected === null ? incident.affectedLabel[locale] : formatNumber(incident.affected, locale)
}

export function monthKey(iso: string): string {
  return iso.slice(0, 7)
}

/** Split bilingual long copy that stores paragraphs as `\n\n`. */
export function proseParagraphs(body: string): string[] {
  return body
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export function initials(org: string): string {
  return org
    .replace(/[^\p{L}\p{N}\s/]/gu, ' ')
    .split(/[\s/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join('')
}

/**
 * Meta descriptions: keep whole sentences when they fit, otherwise cut on a
 * word. Never mid-word, and never a hard slice that leaves a dangling clause.
 */
export function truncateMeta(text: string, max = 200): string {
  const trimmed = text.replace(/\s+/g, ' ').trim()
  if (trimmed.length <= max) return trimmed

  const slice = trimmed.slice(0, max)
  const sentenceEnd = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('? '), slice.lastIndexOf('! '))
  if (sentenceEnd >= Math.floor(max * 0.45)) return slice.slice(0, sentenceEnd + 1).trim()

  const space = slice.lastIndexOf(' ')
  const clipped = (space > 0 ? slice.slice(0, space) : slice).replace(/[.,;:]+$/u, '')
  return `${clipped}…`
}
