<script setup lang="ts">
await Promise.all([loadExplainers(), loadPodcastSlugs()])

const route = useRoute()
const { locale, t, L, localePath } = useLocale()
const { explainers, bySlug, relatedIncidents } = useExplainers()
const { absolute } = useSiteUrl()
const { data: podcastSlugs } = useNuxtData<string[]>('explainer-podcast-slugs')

const slug = computed(() => {
  const value = route.params.slug
  return typeof value === 'string' ? value : Array.isArray(value) ? value[0] : undefined
})

const explainer = computed(() => bySlug(slug.value))
const related = computed(() => (explainer.value ? relatedIncidents(explainer.value.relatedIncidentIds) : []))
const hasPodcast = computed(() => explainerHasPodcast(explainer.value?.slug, podcastSlugs.value))

const { title } = usePageSeo({
  title: () => (explainer.value ? `${L(explainer.value.title)} · ${t('brand')}` : t('brand')),
  description: () => (explainer.value ? L(explainer.value.dek) : t('learnLead')),
  ogType: 'article',
  jsonLd: () =>
    explainer.value
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: L(explainer.value.title),
          description: L(explainer.value.dek),
          inLanguage: locale.value,
          url: absolute(route.path),
          isPartOf: { '@type': 'WebSite', name: t('brand'), url: absolute('/') },
          ...(hasPodcast.value
            ? {
                audio: {
                  '@type': 'AudioObject',
                  name: L(explainer.value.title),
                  contentUrl: absolute(explainerPodcastSrc(explainer.value.slug, locale.value)),
                  encodingFormat: 'audio/mp4',
                  inLanguage: locale.value,
                },
              }
            : {}),
        }
      : null,
})

defineOgImage(
  'OgExplainer',
  {
    eyebrow: t('learnEyebrow'),
    title: explainer.value ? L(explainer.value.title) : t('learnTitle'),
    dek: explainer.value ? truncateMeta(L(explainer.value.dek), 180) : '',
    helpLabel: t('learnHelp'),
    helpThrough: 'cybermalveillance.gouv.fr',
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

    <div
      class="mt-8 grid items-start gap-x-10 gap-y-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:grid-rows-[min-content_1fr] lg:gap-x-14 lg:gap-y-4 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-x-16"
    >
      <ExplainerPodcast
        v-if="hasPodcast"
        class="order-1 min-w-0 lg:col-start-2 lg:row-start-1"
        :slug="explainer.slug"
        :title="L(explainer.title)"
      />

      <article class="order-2 min-w-0 max-w-[62ch] lg:col-start-1 lg:row-start-1 lg:row-span-2">
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

        <p class="mt-14 text-[0.9375rem] leading-relaxed text-ink-2 sm:mt-16">
          {{ t('quizCtaLead') }}
          <NuxtLink
            :to="localePath(quizPath)"
            class="link-underline text-amber hover:text-ink"
            @click="trackPlausibleEvent('Open Quiz', { from: explainer.slug })"
          >
            {{ t('quizOpen') }}
          </NuxtLink>
        </p>
      </article>

      <aside
        class="order-3 grid min-w-0 gap-4 lg:col-start-2"
        :class="hasPodcast ? 'lg:row-start-2' : 'lg:row-start-1'"
      >
        <section class="card p-5 sm:p-6" :aria-labelledby="`takeaways-${explainer.slug}`">
          <h2 :id="`takeaways-${explainer.slug}`" class="eyebrow">{{ t('learnTakeaways') }}</h2>
          <ol class="mt-4 grid gap-3">
            <li v-for="(item, index) in explainer.takeaways" :key="index" class="flex gap-3">
              <span class="font-mono text-sm text-amber tabular" aria-hidden="true">{{
                String(index + 1).padStart(2, '0')
              }}</span>
              <p class="text-[0.875rem] leading-relaxed text-ink">{{ L(item) }}</p>
            </li>
          </ol>
        </section>

        <section class="card p-5 sm:p-6" :aria-labelledby="`help-${explainer.slug}`">
          <h2 :id="`help-${explainer.slug}`" class="eyebrow">{{ t('learnHelp') }}</h2>
          <p class="mt-3 text-[0.875rem] leading-relaxed text-ink-2">{{ t('learnHelpLead') }}</p>
          <a
            :href="learnHelpUrl"
            class="link-underline mt-4 inline-block text-sm text-amber hover:text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ t('learnHelpLink') }}
            <span class="sr-only">({{ t('opensNewTab') }})</span>
          </a>
        </section>

        <section v-if="related.length" :aria-labelledby="`related-${explainer.slug}`">
          <h2 :id="`related-${explainer.slug}`" class="eyebrow">{{ t('learnRelated') }}</h2>
          <ul class="mt-3 grid gap-2">
            <li v-for="incident in related" :key="incident.id">
              <NuxtLink
                :to="localePath(`/incident/${incident.id}`)"
                class="card group flex items-center gap-3 p-3 transition-colors hover:border-hairline-strong hover:bg-surface-2"
                @click="trackPlausibleEvent('Open Incident', { id: incident.id, from: 'learn' })"
              >
                <OrgLogo :org="L(incident.org)" :incident="incident" :size="36" />
                <div class="min-w-0">
                  <p class="eyebrow">{{ formatDateShort(incident.date, locale) }}</p>
                  <p class="mt-0.5 truncate font-display text-base leading-snug text-ink group-hover:text-amber">
                    {{ L(incident.org) }}
                  </p>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  </main>
</template>
