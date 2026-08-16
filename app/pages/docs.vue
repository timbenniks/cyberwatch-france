<script setup lang="ts">
const { t, L } = useLocale()
const { absolute } = useSiteUrl()

const { title } = usePageSeo({
  title: () => `${t('apiDocsTitle')} — ${t('brand')}`,
  description: () => t('apiDocsLead'),
  ogType: 'article',
  ogImageAlt: () => `${t('brand')} — ${t('apiDocsTitle')}`,
  links: () => [{ rel: 'alternate', type: 'application/json', href: absolute('/api'), title: 'API index' }],
})

defineOgImage(
  'OgDossier',
  {
    eyebrow: t('apiDocsEyebrow'),
    years: t('brandYears'),
    incidentCount: apiEndpoints.length,
    incidentLabel: t('apiDocsEndpointCount'),
    anssiEvents: '—',
    anssiLabel: t('apiDocsKeyLabel'),
    reviewedLabel: t('apiDocsMachineIndex'),
    reviewedThrough: '/api',
  },
  { alt: title },
)
</script>

<template>
  <main id="content" class="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 pt-10 sm:px-6 sm:pt-16 lg:px-10 lg:pt-20">
    <header class="max-w-[62ch]">
      <p class="eyebrow">{{ t('apiDocsEyebrow') }}</p>
      <h1 class="mt-5 font-display text-[2rem] leading-[1.08] text-ink sm:text-[3.25rem]">{{ t('apiDocsTitle') }}</h1>
      <p class="mt-6 text-base leading-relaxed text-ink-2 sm:text-lg">{{ t('apiDocsLead') }}</p>
      <p class="mt-6 font-mono text-[0.6875rem] uppercase tracking-widest text-muted">{{ t('apiDocsNoAuth') }}</p>
    </header>

    <section class="mt-14 max-w-[62ch] sm:mt-16" aria-labelledby="conventions">
      <h2 id="conventions" class="font-display text-2xl leading-tight text-ink sm:text-3xl">
        {{ t('apiDocsConventionsTitle') }}
      </h2>
      <ul class="mt-6 space-y-4">
        <li v-for="convention in apiConventions" :key="convention.id" class="card p-5 sm:p-6">
          <h3 class="font-display text-lg text-ink">{{ L(convention.title) }}</h3>
          <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(convention.body) }}</p>
        </li>
      </ul>
    </section>

    <section class="mt-16 sm:mt-20" aria-labelledby="endpoints">
      <h2 id="endpoints" class="font-display text-2xl leading-tight text-ink sm:text-3xl">{{ t('apiDocsEndpoints') }}</h2>
      <div class="mt-6 grid gap-4">
        <article v-for="endpoint in apiEndpoints" :key="endpoint.path" class="card p-5 sm:p-6">
          <p class="font-mono text-[0.8125rem] tracking-wide text-amber">GET {{ endpoint.path }}</p>
          <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(endpoint.description) }}</p>

          <div v-if="endpoint.query?.length" class="mt-5 overflow-x-auto">
            <p class="eyebrow mb-2">{{ t('apiDocsQuery') }}</p>
            <table class="w-full min-w-[20rem] border-collapse text-left text-sm">
              <caption class="sr-only">{{ t('apiDocsQuery') }} — {{ endpoint.path }}</caption>
              <tbody>
                <tr v-for="param in endpoint.query" :key="param.name" class="border-t border-hairline">
                  <th scope="row" class="whitespace-nowrap py-2 pr-4 font-mono text-[0.8125rem] font-medium text-ink">
                    {{ param.name }}
                  </th>
                  <td class="py-2 text-ink-2">{{ L(param.detail) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-5">
            <p class="eyebrow mb-2">{{ t('apiDocsExamples') }}</p>
            <ul class="space-y-2">
              <li v-for="example in endpoint.examples" :key="example">
                <a
                  :href="example"
                  class="link-underline break-all font-mono text-[0.8125rem] text-ink-2 hover:text-amber"
                  @click="trackPlausibleEvent('API Example', { path: example })"
                >
                  {{ example }}
                </a>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section class="mt-16 grid gap-4 sm:mt-20 lg:grid-cols-2">
      <div class="card p-5 sm:p-6">
        <p class="eyebrow">{{ t('apiDocsMachineIndex') }}</p>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('apiDocsMachineIndexLead') }}</p>
        <a href="/api" class="link-underline mt-4 inline-block font-mono text-sm text-amber hover:text-ink">/api</a>
      </div>
      <div class="card p-5 sm:p-6">
        <p class="eyebrow">{{ t('apiDocsRawFile') }}</p>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('apiDocsRawFileLead') }}</p>
        <a
          href="/data/france-cyberwatch-data.json"
          class="link-underline mt-4 inline-block break-all font-mono text-sm text-amber hover:text-ink"
        >
          /data/france-cyberwatch-data.json
        </a>
      </div>
    </section>
  </main>
</template>
