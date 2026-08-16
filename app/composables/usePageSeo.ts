type PageSeoLink = {
  rel: 'alternate'
  href: string
  hreflang?: string
  type?: string
  title?: string
}

type PageSeoOptions = {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  ogType?: 'website' | 'article'
  ogImageAlt?: MaybeRefOrGetter<string>
  links?: MaybeRefOrGetter<PageSeoLink[]>
  jsonLd?: MaybeRefOrGetter<unknown>
}

/**
 * Canonical, hreflang, html lang, and the repeated Open Graph / Twitter
 * tags. Each page still owns its title, description, extra link types,
 * JSON-LD, and og:image.
 */
export function usePageSeo(options: PageSeoOptions) {
  const route = useRoute()
  const { data } = useCyberData()
  const { locale, localePath, alternates } = useLocale()
  const { absolute } = useSiteUrl()

  const siteName = computed(() => data.value?.project.name ?? 'France Cyberwatch')
  const title = computed(() => toValue(options.title))
  const description = computed(() => toValue(options.description))
  const canonical = computed(() => absolute(route.path))
  const ogImageAlt = computed(() => (options.ogImageAlt != null ? toValue(options.ogImageAlt) : title.value))

  const headLinks = computed(() => [
    { rel: 'canonical' as const, href: canonical.value },
    ...alternates.value.map((alternate) => ({
      rel: 'alternate' as const,
      hreflang: alternate.code,
      href: absolute(alternate.path),
    })),
    { rel: 'alternate' as const, hreflang: 'x-default', href: absolute(localePath(route.path, 'en')) },
    ...(toValue(options.links) ?? []),
  ])

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: options.ogType ?? 'website',
    ogSiteName: siteName,
    ogUrl: canonical,
    ogImageAlt,
    ogLocale: () => (locale.value === 'fr' ? 'fr_FR' : 'en_GB'),
    ogLocaleAlternate: () => (locale.value === 'fr' ? 'en_GB' : 'fr_FR'),
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  })

  useHead({
    htmlAttrs: { lang: locale },
    link: headLinks,
    script: () => {
      const graph = toValue(options.jsonLd)
      if (graph == null) return []
      return [{ type: 'application/ld+json' as const, innerHTML: JSON.stringify(graph) }]
    },
  })

  return { siteName, title, description, canonical }
}
