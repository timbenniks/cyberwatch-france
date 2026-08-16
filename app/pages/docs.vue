<script setup lang="ts">
const { t, L } = useLocale()
const { absolute } = useSiteUrl()

const mcpUrl = absolute('/mcp')

const cursorSnippet = `{
  "mcpServers": {
    "france-cyberwatch": {
      "url": "${mcpUrl}"
    }
  }
}`

const claudeSnippet = `{
  "mcpServers": {
    "france-cyberwatch": {
      "type": "http",
      "url": "${mcpUrl}"
    }
  }
}`

const vscodeSnippet = `{
  "servers": {
    "france-cyberwatch": {
      "type": "http",
      "url": "${mcpUrl}"
    }
  }
}`

const cursorInstallHref = computed(() => {
  const config = btoa(JSON.stringify({ url: mcpUrl }))
  return `https://cursor.com/en/install-mcp?name=france-cyberwatch&config=${encodeURIComponent(config)}`
})

const { title } = usePageSeo({
  title: () => `${t('apiDocsTitle')} — ${t('brand')}`,
  description: () => t('apiDocsLead'),
  ogImageAlt: () => `${t('brand')} — ${t('apiDocsTitle')}`,
  links: () => [
    { rel: 'alternate', type: 'application/json', href: absolute('/api'), title: 'API index' },
  ],
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

    <section class="mt-16 sm:mt-20" aria-labelledby="mcp">
      <header class="max-w-[62ch]">
        <h2 id="mcp" class="font-display text-2xl leading-tight text-ink sm:text-3xl">{{ t('mcpTitle') }}</h2>
        <p class="mt-4 text-[0.9375rem] leading-relaxed text-ink-2 sm:text-base">{{ t('mcpLead') }}</p>
        <p class="mt-4 font-mono text-[0.8125rem] tracking-wide text-amber">POST {{ mcpUrl }}</p>
      </header>

      <div class="mt-8 max-w-[62ch]">
        <h3 class="font-display text-xl text-ink">{{ t('mcpInstallTitle') }}</h3>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('mcpInstallLead') }}</p>

        <article class="card mt-6 p-5 sm:p-6">
          <h4 class="font-display text-lg text-ink">Cursor</h4>
          <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('mcpInstallCursor') }}</p>
          <pre class="mt-4 overflow-x-auto border border-hairline bg-surface-1 p-4 font-mono text-[0.8125rem] leading-relaxed text-ink-2">{{ cursorSnippet }}</pre>
          <a
            :href="cursorInstallHref"
            class="link-underline mt-4 inline-block font-mono text-sm text-amber hover:text-ink"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ t('mcpInstallCursorClick') }}
          </a>
        </article>

        <article class="card mt-4 p-5 sm:p-6">
          <h4 class="font-display text-lg text-ink">Claude</h4>
          <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('mcpInstallClaude') }}</p>
          <pre class="mt-4 overflow-x-auto border border-hairline bg-surface-1 p-4 font-mono text-[0.8125rem] leading-relaxed text-ink-2">{{ claudeSnippet }}</pre>
        </article>

        <article class="card mt-4 p-5 sm:p-6">
          <h4 class="font-display text-lg text-ink">VS Code</h4>
          <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('mcpInstallVscode') }}</p>
          <pre class="mt-4 overflow-x-auto border border-hairline bg-surface-1 p-4 font-mono text-[0.8125rem] leading-relaxed text-ink-2">{{ vscodeSnippet }}</pre>
        </article>
      </div>

      <h3 class="mt-10 font-display text-xl text-ink">{{ t('mcpToolsTitle') }}</h3>
      <div class="mt-4 grid gap-4">
        <article v-for="tool in mcpToolDocs" :key="tool.name" class="card p-5 sm:p-6">
          <p class="font-mono text-[0.8125rem] tracking-wide text-amber">{{ tool.name }}</p>
          <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(tool.description) }}</p>
          <p v-if="tool.input" class="mt-3 text-sm text-muted">
            <span class="font-mono uppercase tracking-widest">{{ t('mcpInput') }}</span>
            — {{ L(tool.input) }}
          </p>
        </article>
      </div>

      <div class="mt-8 grid gap-4 lg:grid-cols-2">
        <div>
          <h3 class="font-display text-xl text-ink">{{ t('mcpResourcesTitle') }}</h3>
          <ul class="mt-4 space-y-4">
            <li v-for="resource in mcpResourceDocs" :key="resource.name" class="card p-5 sm:p-6">
              <p class="font-mono text-[0.8125rem] tracking-wide text-amber">{{ resource.name }}</p>
              <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(resource.description) }}</p>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-display text-xl text-ink">{{ t('mcpPromptsTitle') }}</h3>
          <ul class="mt-4 space-y-4">
            <li v-for="prompt in mcpPromptDocs" :key="prompt.name" class="card p-5 sm:p-6">
              <p class="font-mono text-[0.8125rem] tracking-wide text-amber">{{ prompt.name }}</p>
              <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(prompt.description) }}</p>
              <p v-if="prompt.input" class="mt-3 text-sm text-muted">
                <span class="font-mono uppercase tracking-widest">{{ t('mcpInput') }}</span>
                — {{ L(prompt.input) }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="mt-16 sm:mt-20" aria-labelledby="webmcp">
      <header class="max-w-[62ch]">
        <h2 id="webmcp" class="font-display text-2xl leading-tight text-ink sm:text-3xl">{{ t('webmcpTitle') }}</h2>
        <p class="mt-4 text-[0.9375rem] leading-relaxed text-ink-2 sm:text-base">{{ t('webmcpLead') }}</p>
      </header>

      <div class="card mt-8 max-w-[62ch] p-5 sm:p-6">
        <h3 class="font-display text-lg text-ink">{{ t('webmcpEnableTitle') }}</h3>
        <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('webmcpEnableBody') }}</p>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('webmcpEnableSteps') }}</p>
        <p class="mt-4 font-mono text-[0.8125rem] text-amber">{{ t('webmcpFlag') }}</p>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('webmcpInspector') }}</p>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('webmcpBridge') }}</p>
      </div>

      <h3 class="mt-10 font-display text-xl text-ink">{{ t('webmcpToolsTitle') }}</h3>
      <div class="mt-4 grid gap-4">
        <article v-for="tool in webmcpToolDocs" :key="tool.name" class="card p-5 sm:p-6">
          <p class="font-mono text-[0.8125rem] tracking-wide text-amber">{{ tool.name }}</p>
          <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(tool.description) }}</p>
          <p v-if="tool.input" class="mt-3 text-sm text-muted">
            <span class="font-mono uppercase tracking-widest">{{ t('mcpInput') }}</span>
            — {{ L(tool.input) }}
          </p>
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
