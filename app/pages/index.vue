<script setup lang="ts">
const { data, incidents } = useCyberData()
const { locale, t } = useLocale()
const { open } = useIncidentRoute()
const { open: methodologyOpen } = useMethodology()
const { absolute } = useSiteUrl()
const { graphFor } = useStructuredData()

useLegacyHomeRedirect()

const siteName = computed(() => data.value?.project.name ?? 'France Cyberwatch')
const { title } = usePageSeo({
  title: () => `${siteName.value}: ${t('seoTagline')}`,
  description: () => t('heroLead', { n: incidents.value.length }),
  ogImageAlt: () => `${siteName.value} — ${t('heroTitle')}`,
  links: () => [
    { rel: 'alternate', type: 'application/json', href: absolute('/api/incidents'), title: 'Incidents API' },
    { rel: 'alternate', type: 'application/rss+xml', href: absolute('/feed.xml'), title: 'Incident feed' },
  ],
  jsonLd: () => graphFor(),
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
      <PageMain>
        <HeroStats @select="open" @methodology="methodologyOpen = true" />
        <HomeReading />
        <HomeContinue />
      </PageMain>
      <MethodologyModal v-if="methodologyOpen" @close="methodologyOpen = false" />
    </template>
  </div>
</template>
