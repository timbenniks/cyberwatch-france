<script setup lang="ts">
import { Check, Copy, ExternalLink, LoaderCircle, RotateCcw, Send } from '@lucide/vue'
import type { ApiEndpointDoc, ApiParamControl, ApiPathParamDoc } from '~~/shared/utils/api-catalog'

const props = defineProps<{
  endpoint: ApiEndpointDoc
}>()

const { t, L, locale } = useLocale()
const { absolute } = useSiteUrl()
const { incidents, sectors, years, sectorLabel } = useCyberData()
const { prefersReducedMotion } = useReducedMotion()

type TryResult = {
  ok: boolean
  status: number
  statusText: string
  ms: number
  bytes: number
  contentType: string
  body: string
}

const uid = useId()
const values = ref<Record<string, string>>(initialValues())
const loading = ref(false)
const result = ref<TryResult | null>(null)
const error = ref('')
const { copied, announcement, copy } = useCopyFeedback()
const responseHeading = ref<HTMLElement | null>(null)
let abort: AbortController | undefined

const fieldClass =
  'w-full min-h-11 rounded border border-hairline bg-bg px-3 py-2.5 font-mono text-[0.8125rem] text-ink transition-colors hover:border-hairline-strong focus-visible:border-amber sm:min-h-0 sm:py-2'

const pathFields = computed(() => props.endpoint.pathParams ?? [])
const queryFields = computed(() => props.endpoint.query ?? [])

const requestPath = computed(() => {
  const path = fillPath(props.endpoint.path, values.value)
  const params = new URLSearchParams()
  for (const field of queryFields.value) {
    const value = values.value[field.name]?.trim()
    if (value) params.set(field.name, value)
  }
  const query = params.toString()
  return query ? `${path}?${query}` : path
})

const pathReady = computed(() => !/\{[^}]+\}/.test(fillPath(props.endpoint.path, values.value)))
const absoluteUrl = computed(() => absolute(requestPath.value))
const showLimitHint = computed(() => queryFields.value.some((field) => field.name === 'limit'))

onUnmounted(() => {
  abort?.abort()
})

function initialValues(): Record<string, string> {
  const next: Record<string, string> = {}
  for (const field of props.endpoint.pathParams ?? []) {
    next[field.name] = defaultPathValue(field)
  }
  for (const field of props.endpoint.query ?? []) {
    if (field.name === 'lang') next[field.name] = locale.value
    else if (field.name === 'limit') next[field.name] = '5'
    else next[field.name] = ''
  }
  return next
}

function defaultPathValue(field: ApiPathParamDoc) {
  if (field.name !== 'id') return ''
  const example = props.endpoint.examples[0]
  if (!example) return ''
  const last = example.split('?')[0]?.split('/').pop()
  return last && last !== 'incidents' ? last : ''
}

function fillPath(template: string, current: Record<string, string>) {
  return template.replace(/\{([^}]+)\}/g, (_, name: string) => {
    const value = current[name]?.trim()
    return value ? encodeURIComponent(value) : `{${name}}`
  })
}

function fieldId(name: string) {
  return `try-${uid}-${name}`
}

function optionsFor(control: ApiParamControl | undefined) {
  if (!control || control.kind !== 'select') return []
  if (control.options) return control.options.map((value) => ({ value, label: value }))
  if (control.source === 'sectors') return sectors.value.map((sector) => ({ value: sector, label: sectorLabel(sector) }))
  if (control.source === 'years') return years.value.map((year) => ({ value: String(year), label: String(year) }))
  if (control.source === 'incidentIds') {
    return [...incidents.value]
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((incident) => ({ value: incident.id, label: `${incident.id} — ${L(incident.org)}` }))
  }
  return []
}

function setField(name: string, event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement
  values.value = { ...values.value, [name]: target.value }
}

function onExampleClick(example: string, event: MouseEvent) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
  event.preventDefault()
  applyExample(example)
  trackPlausibleEvent('API Example', { path: example })
}

function applyExample(example: string) {
  const [pathPart = '', queryPart] = example.split('?')
  const template = props.endpoint.path.split('/').filter(Boolean)
  const actual = pathPart.split('/').filter(Boolean)
  const next = initialValues()
  for (const key of Object.keys(next)) {
    if (key !== 'lang') next[key] = ''
  }
  template.forEach((segment, index) => {
    const match = segment.match(/^\{(.+)\}$/)
    if (match?.[1]) next[match[1]] = actual[index] ?? ''
  })
  if (queryPart) {
    new URLSearchParams(queryPart).forEach((value, name) => {
      next[name] = value
    })
  }
  values.value = next
}

function reset() {
  abort?.abort()
  values.value = initialValues()
  result.value = null
  error.value = ''
  loading.value = false
}

async function send() {
  if (!pathReady.value || loading.value) return

  abort?.abort()
  abort = new AbortController()
  loading.value = true
  error.value = ''
  trackPlausibleEvent('API Try', { path: requestPath.value })

  const started = performance.now()
  try {
    const response = await fetch(requestPath.value, { signal: abort.signal })
    const raw = await response.text()
    result.value = {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText || (response.ok ? 'OK' : ''),
      ms: Math.round(performance.now() - started),
      bytes: new TextEncoder().encode(raw).length,
      contentType: response.headers.get('content-type') ?? '',
      body: formatBody(raw, response.headers.get('content-type')),
    }
    await nextTick()
    responseHeading.value?.focus()
  } catch (caught) {
    if ((caught as { name?: string }).name === 'AbortError') return
    result.value = null
    error.value = t('apiTryError')
  } finally {
    loading.value = false
  }
}

function formatBody(raw: string, contentType: string | null) {
  if (!raw) return ''
  if (contentType?.includes('json')) {
    try {
      return JSON.stringify(JSON.parse(raw), null, 2)
    } catch {
      return raw
    }
  }
  return raw
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  return `${(bytes / 1024).toFixed(1)} kB`
}

function statusTone(status: number) {
  if (status >= 200 && status < 300) return 'text-teal'
  if (status >= 400) return 'text-coral'
  return 'text-ink-2'
}

async function copyText(which: 'url' | 'body', text: string) {
  try {
    await copy(text, t('apiTryCopied'), which)
  } catch {
    /* clipboard can fail in older browsers */
  }
}

function onSubmit(event: Event) {
  event.preventDefault()
  send()
}
</script>

<template>
  <div class="mt-6 min-w-0 max-w-full border-t border-hairline pt-5">
    <span class="sr-only" aria-live="polite">{{ announcement }}</span>
    <p class="eyebrow">{{ t('apiTryTitle') }}</p>

    <form class="mt-4" @submit="onSubmit">
      <div class="flex flex-col gap-3 rounded border border-hairline bg-bg p-3 sm:p-4">
        <div class="flex flex-wrap items-start gap-2">
          <p class="min-w-0 flex-1 break-all font-mono text-[0.8125rem] leading-relaxed text-amber">
            <span class="text-muted">GET</span>
            {{ requestPath }}
          </p>
          <div class="flex flex-wrap gap-1">
            <button
              type="button"
              class="inline-flex h-9 items-center gap-1.5 rounded border border-hairline px-2.5 text-[0.75rem] text-ink-2 hover:border-hairline-strong hover:text-ink"
              @click="copyText('url', absoluteUrl)"
            >
              <component :is="copied === 'url' ? Check : Copy" :size="13" aria-hidden="true" />
              {{ copied === 'url' ? t('apiTryCopied') : t('apiTryCopyUrl') }}
            </button>
            <a
              :href="requestPath"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-9 items-center gap-1.5 rounded border border-hairline px-2.5 text-[0.75rem] text-ink-2 hover:border-hairline-strong hover:text-ink"
            >
              <ExternalLink :size="13" aria-hidden="true" />
              {{ t('apiTryOpen') }}
              <span class="sr-only">({{ t('opensNewTab') }})</span>
            </a>
          </div>
        </div>
      </div>

      <div v-if="pathFields.length" class="mt-5">
        <p class="eyebrow mb-2">{{ t('apiTryPath') }}</p>
        <div class="grid gap-3 sm:grid-cols-2">
          <div v-for="field in pathFields" :key="field.name">
            <label class="mb-1.5 block font-mono text-[0.8125rem] text-ink" :for="fieldId(field.name)">{{ field.name }}</label>
            <select
              :id="fieldId(field.name)"
              :value="values[field.name]"
              :class="fieldClass"
              required
              @change="setField(field.name, $event)"
            >
              <option value="">{{ t('apiTryOmit') }}</option>
              <option v-for="option in optionsFor(field.control)" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <p class="mt-1.5 text-[0.75rem] leading-relaxed text-muted">{{ L(field.detail) }}</p>
          </div>
        </div>
      </div>

      <div v-if="queryFields.length" class="mt-5">
        <p class="eyebrow mb-2">{{ t('apiDocsQuery') }}</p>
        <div class="grid gap-3 sm:grid-cols-2">
          <div v-for="field in queryFields" :key="field.name">
            <label class="mb-1.5 block font-mono text-[0.8125rem] text-ink" :for="fieldId(field.name)">{{ field.name }}</label>
            <select
              v-if="field.control?.kind === 'select'"
              :id="fieldId(field.name)"
              :value="values[field.name]"
              :class="fieldClass"
              @change="setField(field.name, $event)"
            >
              <option value="">{{ t('apiTryOmit') }}</option>
              <option v-for="option in optionsFor(field.control)" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <input
              v-else
              :id="fieldId(field.name)"
              :type="field.control?.kind === 'number' ? 'number' : field.control?.kind === 'date' ? 'date' : 'text'"
              :value="values[field.name]"
              :min="field.name === 'limit' ? 1 : field.name === 'offset' ? 0 : undefined"
              :max="field.name === 'limit' ? 200 : undefined"
              :class="fieldClass"
              @input="setField(field.name, $event)"
            />
            <p class="mt-1.5 text-[0.75rem] leading-relaxed text-muted">{{ L(field.detail) }}</p>
          </div>
        </div>
        <p v-if="showLimitHint" class="mt-3 text-[0.75rem] leading-relaxed text-muted">{{ t('apiTryLimitHint') }}</p>
      </div>

      <div class="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="submit"
          class="inline-flex min-h-11 items-center gap-2 rounded bg-amber px-4 font-mono text-[0.75rem] font-medium tracking-widest uppercase text-on-amber disabled:opacity-50 sm:min-h-9"
          :disabled="loading || !pathReady"
        >
          <LoaderCircle
            v-if="loading"
            :size="14"
            class="shrink-0"
            :class="prefersReducedMotion ? '' : 'animate-spin'"
            aria-hidden="true"
          />
          <Send v-else :size="14" class="shrink-0" aria-hidden="true" />
          {{ loading ? t('apiTrySending') : t('apiTrySend') }}
        </button>
        <button
          type="button"
          class="inline-flex min-h-11 items-center gap-2 rounded border border-hairline px-3.5 text-[0.8125rem] text-ink-2 hover:border-hairline-strong hover:text-ink sm:min-h-9"
          @click="reset"
        >
          <RotateCcw :size="14" aria-hidden="true" />
          {{ t('apiTryReset') }}
        </button>
      </div>
      <p v-if="!pathReady" class="mt-2 text-[0.8125rem] text-ink-2">{{ t('apiTryMissingId') }}</p>
    </form>

    <div v-if="endpoint.examples.length" class="mt-5">
      <p class="eyebrow mb-2">{{ t('apiDocsExamples') }}</p>
      <ul class="flex flex-col gap-2">
        <li v-for="example in endpoint.examples" :key="example">
          <a
            :href="example"
            class="link-underline break-all font-mono text-[0.8125rem] text-ink-2 hover:text-amber"
            @click="onExampleClick(example, $event)"
          >
            {{ example }}
          </a>
        </li>
      </ul>
    </div>

    <section class="mt-5 min-w-0 max-w-full" :aria-busy="loading" aria-live="polite">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h3
          ref="responseHeading"
          tabindex="-1"
          class="font-display text-lg text-ink outline-none"
        >
          {{ t('apiTryResponse') }}
        </h3>
        <button
          v-if="result"
          type="button"
          class="inline-flex h-9 items-center gap-1.5 rounded border border-hairline px-2.5 text-[0.75rem] text-ink-2 hover:border-hairline-strong hover:text-ink"
          @click="copyText('body', result.body)"
        >
          <component :is="copied === 'body' ? Check : Copy" :size="13" aria-hidden="true" />
          {{ copied === 'body' ? t('apiTryCopied') : t('apiTryCopyResponse') }}
        </button>
      </div>

      <p v-if="error" class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ error }}</p>
      <p v-else-if="!result" class="mt-3 text-[0.9375rem] leading-relaxed text-muted">{{ t('apiTryIdle') }}</p>
      <div v-else class="mt-3 min-w-0 max-w-full">
        <p class="break-all font-mono text-[0.75rem] tracking-wide text-ink-2">
          <span class="font-medium" :class="statusTone(result.status)">{{ result.status }}</span>
          <span v-if="result.statusText"> {{ result.statusText }}</span>
          <span aria-hidden="true"> · </span>
          <span class="tabular">{{ result.ms }} ms</span>
          <span aria-hidden="true"> · </span>
          <span class="tabular">{{ formatBytes(result.bytes) }}</span>
          <template v-if="result.contentType">
            <span aria-hidden="true"> · </span>
            <span>{{ result.contentType.split(';')[0] }}</span>
          </template>
        </p>
        <pre
          class="mt-3 max-h-[28rem] w-full max-w-full min-w-0 overflow-auto whitespace-pre-wrap break-all border border-hairline bg-bg p-4 font-mono text-[0.8125rem] leading-relaxed text-ink-2"
        >{{ result.body }}</pre>
      </div>
    </section>
  </div>
</template>
