<script setup lang="ts">
import { Pause, Play } from '@lucide/vue'

type PlaybackSpeed = 1 | 1.25 | 1.5 | 2

const SPEED_STEPS: PlaybackSpeed[] = [1, 1.25, 1.5, 2]

const props = defineProps<{
  slug: string
  title: string
}>()

const { locale, t } = useLocale()
const { data: podcastSlugs } = await loadPodcastSlugs()
const available = computed(() => explainerHasPodcast(props.slug, podcastSlugs.value))
const src = computed(() => (available.value ? explainerPodcastSrc(props.slug, locale.value) : ''))

const playing = ref(false)
const failed = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const speed = ref<PlaybackSpeed>(1)
const scrubbing = ref(false)
let media: HTMLAudioElement | null = null
let trackedPlay = false

const progress = computed(() => (duration.value > 0 ? Math.min(1, currentTime.value / duration.value) : 0))
const headingId = computed(() => `podcast-${props.slug}`)

function applySpeed() {
  if (media) media.playbackRate = speed.value
}

function syncFromElement() {
  if (!media || scrubbing.value) return
  currentTime.value = media.currentTime
  if (Number.isFinite(media.duration) && media.duration > 0) duration.value = media.duration
}

function onLoaded() {
  failed.value = false
  applySpeed()
  syncFromElement()
}

function onError() {
  playing.value = false
  failed.value = true
}

function onPlay() {
  playing.value = true
}

function onPause() {
  playing.value = false
}

async function toggle() {
  if (!media || failed.value) return
  if (media.paused) {
    try {
      applySpeed()
      await media.play()
      if (!trackedPlay) {
        trackedPlay = true
        trackPlausibleEvent('Play Explainer Audio', { slug: props.slug, locale: locale.value })
      }
    } catch {
      failed.value = true
    }
    return
  }
  media.pause()
}

function onSeek(event: Event) {
  const input = event.target as HTMLInputElement
  const next = Number(input.value)
  currentTime.value = next
  if (media) media.currentTime = next
}

function cycleSpeed() {
  const index = SPEED_STEPS.indexOf(speed.value)
  speed.value = SPEED_STEPS[(index + 1) % SPEED_STEPS.length] ?? 1
  applySpeed()
}

function bindMediaSession() {
  if (!('mediaSession' in navigator)) return
  navigator.mediaSession.metadata = new MediaMetadata({
    title: props.title,
    artist: t('brand'),
    album: t('learnEyebrow'),
  })
  navigator.mediaSession.setActionHandler('play', () => {
    void media?.play()
  })
  navigator.mediaSession.setActionHandler('pause', () => {
    media?.pause()
  })
  navigator.mediaSession.setActionHandler('seekto', (details) => {
    if (typeof details.seekTime !== 'number' || !media) return
    media.currentTime = details.seekTime
    currentTime.value = details.seekTime
  })
}

function clearMediaSession() {
  if (!('mediaSession' in navigator)) return
  navigator.mediaSession.setActionHandler('play', null)
  navigator.mediaSession.setActionHandler('pause', null)
  navigator.mediaSession.setActionHandler('seekto', null)
}

function attachMedia(url: string) {
  media?.pause()
  media = new Audio(url)
  media.preload = 'metadata'
  media.setAttribute('playsinline', '')
  media.addEventListener('loadedmetadata', onLoaded)
  media.addEventListener('durationchange', onLoaded)
  media.addEventListener('timeupdate', syncFromElement)
  media.addEventListener('play', onPlay)
  media.addEventListener('pause', onPause)
  media.addEventListener('ended', onPause)
  media.addEventListener('error', onError)
  applySpeed()
}

watch(src, (url) => {
  playing.value = false
  failed.value = false
  currentTime.value = 0
  duration.value = 0
  trackedPlay = false
  if (url && media) attachMedia(url)
})

onMounted(() => {
  if (src.value) attachMedia(src.value)
  bindMediaSession()
})

onUnmounted(() => {
  media?.pause()
  media = null
  clearMediaSession()
})
</script>

<template>
  <section
    v-if="available"
    class="no-print card w-full p-5 sm:p-6"
    :aria-labelledby="headingId"
    :data-playing="playing ? '' : undefined"
    :style="{ '--tape-progress': String(progress) }"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p :id="headingId" class="eyebrow flex items-center gap-2">
          <span class="podcast-live" aria-hidden="true" />
          {{ t('learnListen') }}
        </p>
        <p class="mt-2 truncate font-display text-lg leading-snug text-ink">{{ title }}</p>
      </div>
      <span class="stamp shrink-0">{{ locale.toUpperCase() }}</span>
    </div>

    <p v-if="failed" class="mt-4 text-[0.8125rem] leading-relaxed text-ink-2">
      {{ t('learnAudioUnavailable') }}
    </p>

    <div v-else class="mt-5 flex items-center gap-3.5">
      <button
        type="button"
        class="grid size-11 shrink-0 place-items-center rounded border transition-colors"
        :class="
          playing
            ? 'border-amber bg-amber text-on-amber'
            : 'border-hairline-strong text-amber hover:border-amber hover:bg-amber/10'
        "
        :aria-label="playing ? t('learnPause') : t('learnPlay')"
        @click="toggle"
      >
        <Pause v-if="playing" :size="16" fill="currentColor" aria-hidden="true" />
        <Play v-else :size="16" fill="currentColor" aria-hidden="true" />
      </button>

      <div class="min-w-0 flex-1">
        <div class="relative h-8">
          <div class="tape-track pointer-events-none absolute inset-x-0 bottom-1 h-5" aria-hidden="true" />
          <div class="tape-played pointer-events-none absolute bottom-1 left-0 h-5" aria-hidden="true" />
          <span class="tape-head pointer-events-none absolute bottom-0.5" aria-hidden="true" />
          <input
            class="absolute inset-0 w-full cursor-pointer opacity-0"
            type="range"
            min="0"
            :max="duration || 1"
            step="0.1"
            :value="currentTime"
            :disabled="!duration"
            :aria-label="t('learnSeek')"
            :aria-valuetext="formatAudioClock(currentTime)"
            @pointerdown="scrubbing = true"
            @pointerup="scrubbing = false"
            @pointercancel="scrubbing = false"
            @input="onSeek"
          />
        </div>
        <div class="mt-1.5 flex items-center justify-between gap-3 font-mono text-[0.6875rem] tabular text-muted">
          <span>{{ formatAudioClock(currentTime) }}</span>
          <button
            type="button"
            class="rounded px-1 tracking-widest text-ink-2 uppercase transition-colors hover:text-amber"
            :aria-label="`${t('learnSpeed')}: ${speed}×`"
            @click="cycleSpeed"
          >
            {{ speed }}×
          </button>
          <span>{{ duration ? formatAudioClock(duration) : '––:––' }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tape-track,
.tape-played {
  background-image:
    repeating-linear-gradient(to right, var(--tick) 0 1px, transparent 1px 5px),
    repeating-linear-gradient(to right, var(--tick-major) 0 1.5px, transparent 1.5px 25px);
  background-position:
    left bottom,
    left bottom;
  background-repeat: repeat-x;
  background-size:
    100% 0.5rem,
    100% 0.875rem;
}

.tape-track {
  --tick: var(--color-hairline);
  --tick-major: var(--color-hairline-strong);
}

.tape-played {
  --tick: color-mix(in srgb, var(--color-amber) 50%, transparent);
  --tick-major: var(--color-amber);
  width: calc(var(--tape-progress) * 100%);
}

.tape-head {
  left: calc(var(--tape-progress) * 100%);
  width: 6px;
  height: 6px;
  background: var(--color-amber);
  transform: translateX(-50%);
}

.tape-head::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 6px;
  width: 1px;
  height: 14px;
  background: var(--color-amber);
  transform: translateX(-50%);
}

.podcast-live {
  width: 6px;
  height: 6px;
  background: var(--color-hairline-strong);
}

section[data-playing] .podcast-live {
  background: var(--color-amber);
}

section[data-playing] .tape-head {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-amber) 30%, transparent);
}

@media (prefers-reduced-motion: no-preference) {
  section[data-playing] .podcast-live {
    animation: podcast-live 1.4s ease-in-out infinite;
  }
}

@keyframes podcast-live {
  50% {
    opacity: 0.35;
  }
}
</style>
