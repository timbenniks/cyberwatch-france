<script setup lang="ts">
import { ChevronDown, X } from '@lucide/vue'
import type { DocsTocGroup } from '~/components/DocsToc.vue'

const { t, L } = useLocale()
const { absolute } = useSiteUrl()

const tocGroups = computed<DocsTocGroup[]>(() => [
  { id: 'conventions', label: t('apiDocsConventionsTitle') },
  {
    id: 'endpoints',
    label: t('apiDocsEndpoints'),
    children: apiEndpoints.map((endpoint) => ({
      id: apiEndpointAnchor(endpoint.path),
      label: endpoint.path,
      mono: true,
    })),
  },
  {
    id: 'mcp',
    label: t('mcpTitle'),
    children: [
      { id: 'mcp-install', label: t('mcpInstallTitle') },
      { id: 'mcp-tools', label: t('mcpToolsTitle') },
      { id: 'mcp-resources', label: t('mcpResourcesTitle') },
      { id: 'mcp-prompts', label: t('mcpPromptsTitle') },
    ],
  },
  {
    id: 'webmcp',
    label: t('webmcpTitle'),
    children: [
      { id: 'webmcp-enable', label: t('webmcpEnableTitle') },
      { id: 'webmcp-tools', label: t('webmcpToolsTitle') },
    ],
  },
  {
    id: 'files',
    label: t('docsFiles'),
    children: [
      { id: 'files-index', label: t('apiDocsMachineIndex') },
      { id: 'files-raw', label: t('apiDocsRawFile') },
    ],
  },
])

const tocIds = computed(() =>
  tocGroups.value.flatMap((group) => [group.id, ...(group.children?.map((child) => child.id) ?? [])]),
)

const activeId = ref('')
const tocOpen = ref(false)
const tocSheet = ref<HTMLElement | null>(null)
const tocButton = ref<HTMLButtonElement | null>(null)
let tocObserver: IntersectionObserver | undefined
let desktopQuery: MediaQueryList | undefined

const activeLabel = computed(() => {
  for (const group of tocGroups.value) {
    if (group.id === activeId.value) return group.label
    const child = group.children?.find((entry) => entry.id === activeId.value)
    if (child) return child.label
  }
  return t('docsOnThisPage')
})

useScrollLock(tocOpen)
useFocusTrap(tocSheet, closeToc, tocOpen)

function openToc() {
  tocOpen.value = true
  nextTick(() => tocSheet.value?.querySelector<HTMLElement>('a, button')?.focus())
}

function closeToc() {
  tocOpen.value = false
  nextTick(() => tocButton.value?.focus())
}

onMounted(() => {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''))
  if (hash && tocIds.value.includes(hash)) activeId.value = hash

  desktopQuery = window.matchMedia('(min-width: 1024px)')
  desktopQuery.addEventListener('change', closeIfDesktop)

  const observed = new Map<string, boolean>()
  tocObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target.id) observed.set(entry.target.id, entry.isIntersecting)
      }
      const current = [...tocIds.value]
        .reverse()
        .find((id) => observed.get(id))
      if (current) activeId.value = current
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
  )

  for (const id of tocIds.value) {
    const element = document.getElementById(id)
    if (element) tocObserver.observe(element)
  }
})

function closeIfDesktop() {
  if (desktopQuery?.matches) tocOpen.value = false
}

onUnmounted(() => {
  tocObserver?.disconnect()
  desktopQuery?.removeEventListener('change', closeIfDesktop)
})

const { title } = usePageSeo({
  title: () => `${t('apiDocsTitle')} — ${t('brand')}`,
  description: () => t('apiDocsLead'),
  ogImageAlt: () => `${t('brand')} — ${t('apiDocsTitle')}`,
  links: () => [{ rel: 'alternate', type: 'application/json', href: absolute('/api'), title: 'API index' }],
})

useDossierOgImage({
  eyebrow: t('apiDocsEyebrow'),
  incidentCount: apiEndpoints.length,
  incidentLabel: t('apiDocsEndpointCount'),
  anssiLabel: t('apiDocsKeyLabel'),
  reviewedLabel: t('apiDocsMachineIndex'),
  reviewedThrough: '/api',
  alt: title.value,
})
</script>

<template>
  <PageMain>
    <header class="max-w-[62ch]">
      <p class="eyebrow">{{ t('apiDocsEyebrow') }}</p>
      <h1 class="mt-5 font-display text-[2rem] leading-[1.08] text-ink sm:text-[3.25rem]">{{ t('apiDocsTitle') }}</h1>
      <p class="mt-6 text-base leading-relaxed text-ink-2 sm:text-lg">{{ t('apiDocsLead') }}</p>
      <p class="mt-6 font-mono text-[0.6875rem] uppercase tracking-widest text-muted">{{ t('apiDocsNoAuth') }}</p>
    </header>

    <div
      class="mt-10 sm:mt-12 lg:mt-16 lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[17rem_minmax(0,1fr)] xl:gap-16"
    >
      <div
        class="sticky top-14 z-30 -mx-4 border-y border-hairline bg-bg/92 px-4 py-2 backdrop-blur-sm sm:top-16 sm:-mx-6 sm:px-6 lg:hidden"
      >
        <button
          ref="tocButton"
          type="button"
          class="flex min-h-11 w-full items-center gap-3 text-left"
          :aria-expanded="tocOpen"
          aria-haspopup="dialog"
          :aria-controls="'docs-toc-sheet'"
          @click="tocOpen ? closeToc() : openToc()"
        >
          <span class="eyebrow shrink-0">{{ t('docsOnThisPage') }}</span>
          <span class="min-w-0 truncate text-[0.8125rem] text-ink">{{ activeLabel }}</span>
          <ChevronDown
            :size="16"
            class="ml-auto shrink-0 text-muted transition-transform"
            :class="tocOpen ? 'rotate-180' : ''"
            aria-hidden="true"
          />
        </button>
      </div>

      <aside
        class="sticky top-24 z-20 hidden max-h-[calc(100dvh-6.5rem)] self-start overflow-y-auto lg:block"
      >
        <DocsToc :groups="tocGroups" :active-id="activeId" />
      </aside>

      <Teleport to="body">
        <div v-if="tocOpen" class="fixed inset-0 z-50 lg:hidden">
          <div class="absolute inset-0 bg-bg/80 backdrop-blur-sm" @click="closeToc" />
          <div
            id="docs-toc-sheet"
            ref="tocSheet"
            role="dialog"
            aria-modal="true"
            :aria-label="t('docsContents')"
            class="absolute inset-x-0 bottom-0 max-h-[min(85dvh,40rem)] overflow-y-auto rounded-t border-t border-hairline bg-surface-1 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-6"
          >
            <div class="mb-2 flex items-center justify-between gap-3">
              <p class="font-display text-lg text-ink">{{ t('docsContents') }}</p>
              <button
                type="button"
                class="grid h-11 w-11 place-items-center rounded border border-hairline text-ink-2 hover:text-ink"
                :aria-label="t('close')"
                @click="closeToc"
              >
                <X :size="15" />
              </button>
            </div>
            <DocsToc :groups="tocGroups" :active-id="activeId" touch :show-eyebrow="false" @navigate="closeToc" />
          </div>
        </div>
      </Teleport>

      <div class="min-w-0">
        <section class="mt-8 max-w-[62ch] lg:mt-0" aria-labelledby="conventions">
          <h2 id="conventions" class="scroll-mt-32 font-display text-2xl leading-tight text-ink lg:scroll-mt-24 sm:text-3xl">
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
          <h2 id="endpoints" class="scroll-mt-32 font-display text-2xl leading-tight text-ink lg:scroll-mt-24 sm:text-3xl">
            {{ t('apiDocsEndpoints') }}
          </h2>
          <div class="mt-6 grid min-w-0 gap-4">
            <article
              v-for="endpoint in apiEndpoints"
              :id="apiEndpointAnchor(endpoint.path)"
              :key="endpoint.path"
              class="card min-w-0 scroll-mt-32 overflow-hidden p-5 sm:p-6 lg:scroll-mt-24"
            >
              <p class="font-mono text-[0.8125rem] tracking-wide text-amber">GET {{ endpoint.path }}</p>
              <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(endpoint.description) }}</p>
              <ApiTryIt :endpoint="endpoint" />
            </article>
          </div>
        </section>

        <DocsMcpSection />

        <DocsWebMcpSection />

        <section class="mt-16 sm:mt-20" aria-labelledby="files">
          <h2 id="files" class="scroll-mt-32 font-display text-2xl leading-tight text-ink lg:scroll-mt-24 sm:text-3xl">
            {{ t('docsFiles') }}
          </h2>
          <div class="mt-6 grid gap-4 lg:grid-cols-2">
            <div id="files-index" class="card scroll-mt-32 p-5 sm:p-6 lg:scroll-mt-24">
              <p class="eyebrow">{{ t('apiDocsMachineIndex') }}</p>
              <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('apiDocsMachineIndexLead') }}</p>
              <a href="/api" class="link-underline mt-4 inline-block font-mono text-sm text-amber hover:text-ink">/api</a>
            </div>
            <div id="files-raw" class="card scroll-mt-32 p-5 sm:p-6 lg:scroll-mt-24">
              <p class="eyebrow">{{ t('apiDocsRawFile') }}</p>
              <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('apiDocsRawFileLead') }}</p>
              <a
                href="/data/france-cyberwatch-data.json"
                class="link-underline mt-4 inline-block break-all font-mono text-sm text-amber hover:text-ink"
              >
                /data/france-cyberwatch-data.json
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </PageMain>
</template>
