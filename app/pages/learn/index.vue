<script setup lang="ts">
await loadExplainers()

const route = useRoute()
const { locale, t, L, alternates, localePath } = useLocale()
const { explainers } = useExplainers()
const { absolute } = useSiteUrl()
const siteName = 'France Cyberwatch'

const title = computed(() => `${t('learnTitle')} · ${siteName}`)
const description = computed(() => t('learnLead'))
const canonical = computed(() => absolute(route.path))
const headLinks = computed(() => [
  { rel: 'canonical' as const, href: canonical.value },
  ...alternates.value.map((alternate) => ({
    rel: 'alternate' as const,
    hreflang: alternate.code,
    href: absolute(alternate.path),
  })),
  { rel: 'alternate' as const, hreflang: 'x-default', href: absolute(localePath('/learn', 'en')) },
])

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogSiteName: siteName,
  ogUrl: canonical,
  ogImageAlt: () => `${siteName} · ${t('learnTitle')}`,
  ogLocale: () => (locale.value === 'fr' ? 'fr_FR' : 'en_GB'),
  ogLocaleAlternate: () => (locale.value === 'fr' ? 'en_GB' : 'fr_FR'),
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
})

useHead({
  htmlAttrs: { lang: locale },
  meta: [{ name: 'theme-color', content: '#080b14' }],
  link: headLinks,
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
</script>

<template>
  <main id="content" class="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 pt-10 sm:px-6 sm:pt-16 lg:px-10 lg:pt-20">
    <header class="max-w-[62ch]">
      <p class="eyebrow">{{ t('learnEyebrow') }}</p>
      <h1 class="mt-5 font-display text-[2rem] leading-[1.08] text-ink sm:text-[3.25rem]">{{ t('learnTitle') }}</h1>
      <p class="mt-6 text-base leading-relaxed text-ink-2 sm:text-lg">{{ t('learnLead') }}</p>
    </header>

    <ol class="mt-14 grid max-w-[62ch] gap-4 sm:mt-16">
      <li v-for="(explainer, index) in explainers" :key="explainer.slug">
        <NuxtLink
          :to="localePath(`/learn/${explainer.slug}`)"
          class="card group flex gap-4 p-5 transition-colors hover:border-hairline-strong hover:bg-surface-2 sm:p-6"
          @click="trackPlausibleEvent('Open Explainer', { slug: explainer.slug })"
        >
          <span class="font-mono text-sm text-amber tabular" aria-hidden="true">{{
            String(index + 1).padStart(2, '0')
          }}</span>
          <div class="min-w-0">
            <h2 class="font-display text-xl leading-snug text-ink group-hover:text-amber sm:text-2xl">
              {{ L(explainer.title) }}
            </h2>
            <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(explainer.dek) }}</p>
            <p class="mt-4 font-mono text-[0.6875rem] uppercase tracking-widest text-muted">{{ t('learnOpen') }}</p>
          </div>
        </NuxtLink>
      </li>
    </ol>
  </main>
</template>
