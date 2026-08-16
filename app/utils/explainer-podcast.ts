import type { Locale } from '~/types/cyberwatch'

/**
 * Folders under `public/podcasts/{slug}/` that ship both `en.m4a` and `fr.m4a`.
 * Scanned on the server at request/prerender time, so a new slug folder appears
 * without a config change.
 */
export async function loadPodcastSlugs() {
  return useAsyncData('explainer-podcast-slugs', scanExplainerPodcastSlugs, {
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] as string[] | undefined,
  })
}

async function scanExplainerPodcastSlugs(): Promise<string[]> {
  if (!import.meta.server) return []

  const { existsSync, readdirSync } = await import('node:fs')
  const { join } = await import('node:path')
  const dir = join(process.cwd(), 'public', 'podcasts')
  if (!existsSync(dir)) return []

  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .filter((slug) => existsSync(join(dir, slug, 'en.m4a')) && existsSync(join(dir, slug, 'fr.m4a')))
    .sort()
}

export function explainerHasPodcast(slug: string | undefined, slugs: readonly string[] | null | undefined): boolean {
  return Boolean(slug && slugs?.includes(slug))
}

export function explainerPodcastSrc(slug: string, locale: Locale): string {
  return `/podcasts/${slug}/${locale}.m4a`
}

/** Tape-counter clock, locale-agnostic on purpose (mm:ss). */
export function formatAudioClock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00'
  const total = Math.floor(seconds)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}
