<script setup lang="ts">
const route = useRoute()
const { data, incidents } = useCyberData()
const { locale, t, L, alternates, localePath } = useLocale()
const { selected } = useIncidentRoute()
const { absolute } = useSiteUrl()
const { graphFor } = useStructuredData()

const siteName = computed(() => data.value?.project.name ?? 'France Cyberwatch')
const incident = computed(() => selected.value)

const title = computed(() =>
  incident.value ? `${L(incident.value.org)} — ${t('seoRecordSuffix')} — ${siteName.value}` : siteName.value,
)

const description = computed(() => {
  if (!incident.value) return t('seoTagline')
  const sector = data.value?.ui.sectorLabels[incident.value.sector]?.[locale.value] ?? incident.value.sector
  const lead = L(incident.value.detail.lead)
  return `${formatDate(incident.value.date, locale.value)} · ${sector} · ${L(incident.value.affectedLabel)}. ${lead}`.slice(
    0,
    300,
  )
})

const canonical = computed(() => absolute(route.path))

const headLinks = computed(() => [
  { rel: 'canonical' as const, href: canonical.value },
  ...alternates.value.map((alternate) => ({
    rel: 'alternate' as const,
    hreflang: alternate.code,
    href: absolute(alternate.path),
  })),
  { rel: 'alternate' as const, hreflang: 'x-default', href: absolute(localePath(route.path, 'en')) },
  {
    rel: 'alternate' as const,
    type: 'application/json',
    href: absolute(`/api/incidents/${incident.value?.id ?? ''}`),
    title: 'Incident API',
  },
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
  script: () => [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(graphFor(incident.value)),
    },
  ],
})

defineOgImage(
  'OgIncident',
  {
    eyebrow: t('incidentRecord'),
    org: incident.value ? L(incident.value.org) : siteName.value,
    date: incident.value ? formatDate(incident.value.date, locale.value) : '',
    sector: incident.value
      ? (data.value?.ui.sectorLabels[incident.value.sector]?.[locale.value] ?? incident.value.sector)
      : '',
    kindLabel: incident.value ? t(incident.value.kind) : '',
    severity: incident.value?.severity ?? 'low',
    severityLabel: incident.value ? t(incident.value.severity) : '',
    status: incident.value?.status ?? 'unknown',
    statusLabel: incident.value ? t(incident.value.status) : '',
    affected: incident.value ? formatAffected(incident.value, locale.value) : '',
    affectedLabel: t('affected'),
  },
  { alt: title },
)

watch(
  incident,
  (current) => {
    if (incidents.value.length && !current) {
      throw createError({ statusCode: 404, statusMessage: 'Incident not found', fatal: true })
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <p v-if="!data" class="mx-auto max-w-[52ch] py-32 text-center text-ink-2" role="alert">{{ t('loadError') }}</p>
    <main v-else-if="incident" id="content" class="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 pt-10 sm:px-6 sm:pt-14 lg:px-10 lg:pt-16">
      <IncidentDetail :key="incident.id" :incident="incident" />
    </main>
  </div>
</template>
