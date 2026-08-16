<script setup lang="ts">
import { Antenna, KeyRound, Mail, Network, Server, ShieldAlert, Waypoints } from '@lucide/vue'
import type { Incident } from '~/types/cyberwatch'

const emit = defineEmits<{ open: [Incident] }>()

const { data, incidents } = useCyberData()
const { t, L } = useLocale()

const icons: Record<string, unknown> = {
  'stolen-credentials': KeyRound,
  'supplier-exposure': Network,
  'legacy-edge-systems': Server,
  'post-breach-phishing': Mail,
  'excessive-data-reachability': Waypoints,
  'detection-gaps': Antenna,
}

/** Accent- and case-insensitive, so "Santé" matches the dataset's "Sante". */
function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

/** Words too generic to identify an organisation on their own. */
const generic = new Set([
  'france',
  'french',
  'ministry',
  'ministere',
  'national',
  'public',
  'publique',
  'system',
  'systems',
  'staff',
  'contractor',
  'group',
  'telecom',
  'telecommunications',
  'logistics',
  'titres',
  'tax',
])

/**
 * Links a pattern only to incidents its own text names. Nothing is inferred
 * beyond a literal mention of the organisation in the dataset's wording.
 */
function relatedTo(patternText: string): Incident[] {
  const haystack = normalize(patternText)
  return incidents.value.filter((incident) => {
    const names = [incident.org.en, incident.org.fr]
    return names.some((name) => {
      const segments = name.split('/').map((part) => normalize(part).trim())
      const words = segments.flatMap((segment) => segment.split(/\s+/)).filter((word) => word.length >= 4 && !generic.has(word))
      return [...segments, ...words].some((candidate) =>
        new RegExp(`\\b${candidate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(haystack),
      )
    })
  })
}

const cards = computed(() =>
  (data.value?.patterns ?? []).map((pattern) => ({
    pattern,
    icon: icons[pattern.id] ?? ShieldAlert,
    related: relatedTo(`${L(pattern.description)} ${L(pattern.title)}`),
  })),
)
</script>

<template>
  <section id="patterns">
    <header class="mb-6 max-w-[62ch]">
      <p class="eyebrow">{{ t('navPatterns') }}</p>
      <h2 class="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl">{{ t('patternsTitle') }}</h2>
      <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('patternsLead') }}</p>
    </header>

    <ul class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <li v-for="card in cards" :key="card.pattern.id" class="card flex flex-col p-5 sm:p-6">
        <span class="mb-4 grid h-9 w-9 place-items-center rounded border border-hairline-strong text-amber">
          <component :is="card.icon" :size="17" aria-hidden="true" />
        </span>
        <h3 class="font-display text-xl leading-snug text-ink">{{ L(card.pattern.title) }}</h3>
        <p class="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(card.pattern.description) }}</p>

        <div class="mt-5 border-t border-hairline pt-4">
          <p class="eyebrow mb-2">{{ t('priorityControl') }}</p>
          <p class="text-[0.875rem] leading-relaxed text-ink">{{ L(card.pattern.priority) }}</p>
        </div>

        <div v-if="card.related.length" class="mt-4">
          <p class="eyebrow mb-2">{{ t('relatedIncidents') }}</p>
          <ul class="flex flex-wrap gap-1.5">
            <li v-for="incident in card.related" :key="incident.id">
              <button
                type="button"
                class="rounded-full border border-hairline px-2.5 py-1 text-[0.75rem] text-ink-2 transition-colors hover:border-amber hover:text-amber"
                @click="emit('open', incident)"
              >
                {{ L(incident.org) }}
              </button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </section>
</template>
