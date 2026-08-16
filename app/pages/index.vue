<script setup lang="ts">
const route = useRoute()
const { data, incidents } = useCyberData()
const { locale, t, alternates } = useLocale()
const { open: methodologyOpen } = useMethodology()
const { absolute } = useSiteUrl()
const { graphFor } = useStructuredData()

const siteName = computed(() => data.value?.project.name ?? 'France Cyberwatch')
const title = computed(() => `${siteName.value}: ${t('seoTagline')}`)
const description = computed(() => t('heroLead', { n: incidents.value.length }))
const canonical = computed(() => absolute(route.path))

const headLinks = computed(() => [
  { rel: 'canonical' as const, href: canonical.value },
  ...alternates.value.map((alternate) => ({
    rel: 'alternate' as const,
    hreflang: alternate.code,
    href: absolute(alternate.path),
  })),
  { rel: 'alternate' as const, hreflang: 'x-default', href: absolute(alternates.value[0]!.path) },
  { rel: 'alternate' as const, type: 'application/json', href: absolute('/api/incidents'), title: 'Incidents API' },
  { rel: 'alternate' as const, type: 'application/rss+xml', href: absolute('/feed.xml'), title: 'Incident feed' },
])

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogSiteName: siteName,
  ogUrl: canonical,
  ogImageAlt: () => `${siteName.value} — ${t('heroTitle')}`,
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
  script: () => [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(graphFor()),
    },
  ],
})

defineOgImage(
  'OgDossier',
  {
    eyebrow: t('heroEyebrow'),
    years: t('brandYears'),
    incidentCount: incidents.value.length,
    incidentLabel: t('incidentsCount'),
    anssiEvents: data.value
      ? formatNumber(data.value.summaryStats.anssi2025.securityEventsHandled, locale.value)
      : '',
    anssiLabel: t('statAnssiEvents'),
    reviewedLabel: t('reviewedThrough'),
    reviewedThrough: data.value ? formatDate(data.value.project.reviewedThrough, locale.value) : '',
    severities: incidents.value.map((item) => item.severity).join(','),
  },
  { alt: () => `${siteName.value} — ${t('heroTitle')}` },
)
</script>

<template>
  <div>
    <p v-if="!data" class="mx-auto max-w-[52ch] py-32 text-center text-ink-2" role="alert">{{ t('loadError') }}</p>
    <template v-else>
      <Dossier />
      <MethodologyModal v-if="methodologyOpen" @close="methodologyOpen = false" />
    </template>
  </div>
</template>
