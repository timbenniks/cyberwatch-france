<script setup lang="ts">
// /incident/:id is registered as its own route record in app/router.options.ts.
const route = useRoute()
const { data, incidents } = useCyberData()
const { locale, t, L, alternates } = useLocale()
const { selected, hasPrevious, hasNext, close, step } = useIncidentRoute()
const { open: methodologyOpen } = useMethodology()
const { siteUrl, absolute } = useSiteUrl()
const { graphFor } = useStructuredData()

const incident = computed(() => selected.value ?? undefined)
const siteName = computed(() => data.value?.project.name ?? 'France Cyberwatch')

/**
 * A shared incident link should describe that incident — including the fact
 * that a count is unknown, which is part of the story.
 */
const title = computed(() =>
  incident.value
    ? `${L(incident.value.org)} — ${t('seoRecordSuffix')} — ${siteName.value}`
    : `${siteName.value}: ${t('seoTagline')}`,
)

const description = computed(() => {
  if (incident.value) {
    const sector = data.value?.ui.sectorLabels[incident.value.sector]?.[locale.value] ?? incident.value.sector
    return `${formatDate(incident.value.date, locale.value)} · ${sector} · ${L(
      incident.value.affectedLabel,
    )}. ${L(incident.value.data)}`.slice(0, 300)
  }
  return t('heroLead', { n: incidents.value.length })
})

const canonical = computed(() => absolute(route.path))

/** Both languages are prerendered, so each page can point at its twin. */
const headLinks = computed(() => [
  { rel: 'canonical' as const, href: canonical.value },
  ...alternates.value.map((alternate) => ({
    rel: 'alternate' as const,
    hreflang: alternate.code,
    href: absolute(alternate.path),
  })),
  { rel: 'alternate' as const, hreflang: 'x-default', href: absolute(alternates.value[0]!.path) },
  // Machine-readable twins of this page, for agents that sniff the head.
  { rel: 'alternate' as const, type: 'application/json', href: absolute('/api/incidents'), title: 'Incidents API' },
  { rel: 'alternate' as const, type: 'application/rss+xml', href: absolute('/feed.xml'), title: 'Incident feed' },
])

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'article',
  ogSiteName: siteName,
  ogUrl: canonical,
  ogImageAlt: () => `${siteName.value} — ${t('heroTitle')}`,
  ogLocale: () => (locale.value === 'fr' ? 'fr_FR' : 'en_GB'),
  ogLocaleAlternate: () => (locale.value === 'fr' ? 'en_GB' : 'fr_FR'),
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  // Let search and answer engines quote this freely: it is public-interest
  // information whose whole purpose is to be found and repeated accurately.
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
})

useHead({
  htmlAttrs: { lang: locale },
  meta: [{ name: 'theme-color', content: '#080b14' }],
  link: headLinks,
  script: () => [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(graphFor(incident.value)),
    },
  ],
})

const ogAlt = computed(() =>
  incident.value
    ? `${L(incident.value.org)} — ${t('seoRecordSuffix')} — ${siteName.value}`
    : `${siteName.value} — ${t('heroTitle')}`,
)

if (selected.value) {
  defineOgImage(
    'OgIncident',
    {
      eyebrow: t('incidentRecord'),
      org: L(selected.value.org),
      date: formatDate(selected.value.date, locale.value),
      sector: data.value?.ui.sectorLabels[selected.value.sector]?.[locale.value] ?? selected.value.sector,
      kindLabel: t(selected.value.kind),
      severity: selected.value.severity,
      severityLabel: t(selected.value.severity),
      status: selected.value.status,
      statusLabel: t(selected.value.status),
      affected: formatAffected(selected.value, locale.value),
      affectedLabel: t('affected'),
    },
    { alt: ogAlt },
  )
} else {
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
    { alt: ogAlt },
  )
}
</script>

<template>
  <div>
    <p v-if="!data" class="mx-auto max-w-[52ch] py-32 text-center text-ink-2" role="alert">{{ t('loadError') }}</p>
    <template v-else>
      <Dossier />
      <!-- Outside <main> so the record sits above the sticky header without a teleport,
           and so a prerendered /incident/:id ships the record in its HTML. -->
      <IncidentDetail
        v-if="selected"
        :incident="selected"
        :has-previous="hasPrevious"
        :has-next="hasNext"
        @close="close"
        @previous="step(-1)"
        @next="step(1)"
      />
      <MethodologyModal v-if="methodologyOpen" @close="methodologyOpen = false" />
    </template>
  </div>
</template>
