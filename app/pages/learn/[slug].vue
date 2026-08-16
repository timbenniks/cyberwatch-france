<script setup lang="ts">
await loadExplainers()

const route = useRoute()
const { locale, t, L, alternates, localePath } = useLocale()
const { explainers, bySlug, relatedIncidents } = useExplainers()
const { absolute } = useSiteUrl()
const siteName = 'France Cyberwatch'

const slug = computed(() => {
  const value = route.params.slug
  return typeof value === 'string' ? value : Array.isArray(value) ? value[0] : undefined
})

const explainer = computed(() => bySlug(slug.value))
const related = computed(() => (explainer.value ? relatedIncidents(explainer.value.relatedIncidentIds) : []))

const title = computed(() => (explainer.value ? `${L(explainer.value.title)} · ${siteName}` : siteName))
const description = computed(() => (explainer.value ? L(explainer.value.dek) : t('learnLead')))
const canonical = computed(() => absolute(route.path))
const headLinks = computed(() => [
  { rel: 'canonical' as const, href: canonical.value },
  ...alternates.value.map((alternate) => ({
    rel: 'alternate' as const,
    hreflang: alternate.code,
    href: absolute(alternate.path),
  })),
  { rel: 'alternate' as const, hreflang: 'x-default', href: absolute(localePath(route.path, 'en')) },
])

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'article',
  ogSiteName: siteName,
  ogUrl: canonical,
  ogImageAlt: title,
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
  script: () =>
    explainer.value
      ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: L(explainer.value.title),
              description: L(explainer.value.dek),
              inLanguage: locale.value,
              url: canonical.value,
              isPartOf: { '@type': 'WebSite', name: siteName, url: absolute('/') },
            }),
          },
        ]
      : [],
})

defineOgImage(
  'OgDossier',
  {
    eyebrow: t('learnEyebrow'),
    years: t('brandYears'),
    incidentCount: explainers.value.length,
    incidentLabel: t('learnGuides'),
    anssiEvents: '—',
    anssiLabel: t('learnNav'),
    reviewedLabel: t('learnHelp'),
    reviewedThrough: 'cybermalveillance.gouv.fr',
  },
  { alt: title },
)

watch(
  explainer,
  (current) => {
    if (explainers.value.length && !current) {
      throw createError({ statusCode: 404, statusMessage: 'Explainer not found', fatal: true })
    }
  },
  { immediate: true },
)
</script>

<template>
  <main v-if="explainer" id="content" class="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 pt-10 sm:px-6 sm:pt-16 lg:px-10 lg:pt-20">
    <p class="max-w-[62ch]">
      <NuxtLink :to="localePath('/learn')" class="link-underline text-sm text-muted hover:text-amber">
        {{ t('learnBack') }}
      </NuxtLink>
    </p>

    <article class="mt-8 max-w-[62ch]">
      <header>
        <p class="eyebrow">{{ t('learnEyebrow') }}</p>
        <h1 class="mt-5 font-display text-[2rem] leading-[1.08] text-ink sm:text-[3.25rem]">{{ L(explainer.title) }}</h1>
        <p class="mt-6 text-base leading-relaxed text-ink-2 sm:text-lg">{{ L(explainer.dek) }}</p>
      </header>

      <section
        v-for="(section, index) in explainer.sections"
        :key="index"
        class="mt-12 sm:mt-14"
      >
        <h2 class="font-display text-2xl leading-tight text-ink sm:text-3xl">{{ L(section.heading) }}</h2>
        <p
          v-for="(paragraph, paragraphIndex) in explainerParagraphs(L(section.body))"
          :key="paragraphIndex"
          class="mt-4 text-[0.9375rem] leading-relaxed text-ink-2 sm:text-base"
        >
          {{ paragraph }}
        </p>
      </section>

      <section class="mt-14 sm:mt-16" :aria-labelledby="`takeaways-${explainer.slug}`">
        <h2 :id="`takeaways-${explainer.slug}`" class="font-display text-2xl leading-tight text-ink sm:text-3xl">
          {{ t('learnTakeaways') }}
        </h2>
        <ol class="mt-6 grid gap-3">
          <li v-for="(item, index) in explainer.takeaways" :key="index" class="card flex gap-4 p-5">
            <span class="font-mono text-sm text-amber tabular" aria-hidden="true">{{
              String(index + 1).padStart(2, '0')
            }}</span>
            <p class="text-[0.9375rem] leading-relaxed text-ink">{{ L(item) }}</p>
          </li>
        </ol>
      </section>

      <aside class="mt-14 card p-5 sm:mt-16 sm:p-6" :aria-labelledby="`help-${explainer.slug}`">
        <p :id="`help-${explainer.slug}`" class="eyebrow">{{ t('learnHelp') }}</p>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('learnHelpLead') }}</p>
        <a
          :href="learnHelpUrl"
          class="link-underline mt-4 inline-block text-sm text-amber hover:text-ink"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('learnHelpLink') }}
          <span class="sr-only">({{ t('opensNewTab') }})</span>
        </a>
      </aside>
    </article>

    <section v-if="related.length" class="mt-16 max-w-[62ch] sm:mt-20" :aria-labelledby="`related-${explainer.slug}`">
      <h2 :id="`related-${explainer.slug}`" class="font-display text-2xl leading-tight text-ink sm:text-3xl">
        {{ t('learnRelated') }}
      </h2>
      <ul class="mt-6 grid gap-3">
        <li v-for="incident in related" :key="incident.id">
          <NuxtLink
            :to="localePath(`/incident/${incident.id}`)"
            class="card group flex items-center gap-3.5 p-4 transition-colors hover:border-hairline-strong hover:bg-surface-2"
            @click="trackPlausibleEvent('Open Incident', { id: incident.id, from: 'learn' })"
          >
            <OrgLogo :org="L(incident.org)" :incident="incident" :size="40" />
            <div class="min-w-0">
              <p class="eyebrow">{{ formatDateShort(incident.date, locale) }}</p>
              <p class="mt-1 truncate font-display text-lg leading-snug text-ink group-hover:text-amber">
                {{ L(incident.org) }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </main>
</template>
