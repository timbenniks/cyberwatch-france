<script setup lang="ts">
import { Check, Copy, RotateCcw, Share2, X } from '@lucide/vue'

const { t, L, localePath } = useLocale()
const { absolute } = useSiteUrl()

const headingRef = ref<HTMLElement | null>(null)
const nextRef = ref<HTMLButtonElement | null>(null)
const { copied, announcement, copy } = useCopyFeedback()

const phase = ref<'intro' | 'ask' | 'result'>('intro')
const index = ref(0)
const selectedId = ref<string | null>(null)
const revealed = ref(false)
const answers = ref<Record<string, string>>({})

const total = quizQuestions.length
const question = computed(() => quizQuestions[index.value]!)
const selectedChoice = computed(() => question.value.choices.find((choice) => choice.id === selectedId.value))
const correctChoice = computed(() => question.value.choices.find((choice) => choice.id === question.value.correctId))
const isCorrect = computed(() => selectedId.value === question.value.correctId)
const isLast = computed(() => index.value === total - 1)
const score = computed(() => quizScoreFor(answers.value))
const passed = computed(() => quizHasPassed(score.value))
const percent = computed(() => Math.round((score.value / total) * 100))

const shareText = computed(() => t('quizShareText', { score: score.value, total }))
const shareUrl = computed(() => absolute(localePath(quizPath)))

function choiceState(choiceId: string): 'pending' | 'correct' | 'incorrect' | 'missed' | 'idle' {
  if (!revealed.value) return selectedId.value === choiceId ? 'pending' : 'idle'
  if (choiceId === question.value.correctId) return selectedId.value === choiceId ? 'correct' : 'missed'
  if (choiceId === selectedId.value) return 'incorrect'
  return 'idle'
}

function start() {
  phase.value = 'ask'
  index.value = 0
  selectedId.value = null
  revealed.value = false
  answers.value = {}
  trackPlausibleEvent('Start Quiz')
  nextTick(() => headingRef.value?.focus())
}

function select(choiceId: string) {
  if (revealed.value) return
  selectedId.value = choiceId
  revealed.value = true
  answers.value = { ...answers.value, [question.value.id]: choiceId }
  trackPlausibleEvent('Quiz Answer', { id: question.value.id, correct: choiceId === question.value.correctId })
  nextTick(() => nextRef.value?.focus())
}

function advance() {
  if (!revealed.value) return
  if (isLast.value) {
    phase.value = 'result'
    trackPlausibleEvent('Quiz Complete', { score: score.value, passed: passed.value })
    nextTick(() => headingRef.value?.focus())
    return
  }
  index.value += 1
  selectedId.value = null
  revealed.value = false
  nextTick(() => headingRef.value?.focus())
}

function shareLinkedIn() {
  trackPlausibleEvent('Share Quiz', { network: 'linkedin', score: score.value })
  const href = quizLinkedInShareUrl(`${shareText.value} ${shareUrl.value}`)
  window.open(href, '_blank', 'noopener,noreferrer')
}

async function copyShare() {
  try {
    await copy(`${shareText.value} ${shareUrl.value}`, t('quizShareCopied'))
    trackPlausibleEvent('Share Quiz', { network: 'copy', score: score.value })
  } catch {
    /* clipboard can fail in older browsers */
  }
}

function onKeydown(event: KeyboardEvent, choiceId: string, choiceIndex: number) {
  if (revealed.value) return
  const choices = question.value.choices
  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    event.preventDefault()
    const next = choices[(choiceIndex + 1) % choices.length]
    if (next) document.getElementById(`quiz-choice-${next.id}`)?.focus()
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
    event.preventDefault()
    const prev = choices[(choiceIndex - 1 + choices.length) % choices.length]
    if (prev) document.getElementById(`quiz-choice-${prev.id}`)?.focus()
  } else if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    select(choiceId)
  }
}
</script>

<template>
  <div>
    <span class="sr-only" aria-live="polite">{{ announcement }}</span>
    <section v-if="phase === 'intro'" class="max-w-[40rem]">
      <p class="eyebrow">{{ t('quizEyebrow') }}</p>
      <h1 class="mt-5 font-display text-[2rem] leading-[1.08] text-ink sm:text-[3.25rem]">{{ t('quizTitle') }}</h1>
      <p class="mt-6 text-base leading-relaxed text-ink-2 sm:text-lg">{{ t('quizLead') }}</p>
      <p class="mt-6 font-mono text-[0.6875rem] uppercase tracking-widest text-muted">
        {{ t('quizMeta', { total, pass: quizPassPercent }) }}
      </p>
      <button
        type="button"
        class="mt-10 inline-flex min-h-12 items-center rounded bg-amber px-5 font-mono text-[0.75rem] font-medium tracking-widest uppercase text-on-amber"
        @click="start"
      >
        {{ t('quizStart') }}
      </button>
    </section>

    <section
      v-else-if="phase === 'ask'"
      class="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:grid-rows-[auto_auto] lg:gap-x-14 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-x-16"
      :aria-labelledby="`quiz-q-${question.id}`"
    >
      <div class="min-w-0 max-w-[40rem] lg:col-start-1 lg:row-start-1">
        <p class="eyebrow">{{ L(question.section) }}</p>
        <p class="mt-3 font-mono text-[0.6875rem] uppercase tracking-widest text-muted tabular">
          {{ t('quizProgress', { n: index + 1, total }) }}
        </p>
        <ol class="mt-4 flex flex-wrap gap-1.5" aria-hidden="true">
          <li
            v-for="(item, tick) in quizQuestions"
            :key="item.id"
            class="h-1.5 w-4 rounded-sm sm:w-5"
            :class="
              tick < index
                ? answers[item.id] === item.correctId
                  ? 'bg-teal'
                  : 'bg-coral'
                : tick === index
                  ? 'bg-amber'
                  : 'bg-hairline'
            "
          />
        </ol>

        <h2
          :id="`quiz-q-${question.id}`"
          ref="headingRef"
          tabindex="-1"
          class="mt-8 font-display text-2xl leading-tight text-ink outline-none sm:text-3xl"
        >
          {{ L(question.prompt) }}
        </h2>

        <div
          role="radiogroup"
          :aria-labelledby="`quiz-q-${question.id}`"
          class="mt-8 grid gap-3"
          :class="question.kind === 'yesno' ? 'sm:grid-cols-2' : ''"
        >
          <button
            v-for="(choice, choiceIndex) in question.choices"
            :id="`quiz-choice-${choice.id}`"
            :key="choice.id"
            type="button"
            role="radio"
            class="card flex gap-3 p-4 text-left transition-colors sm:p-5"
            :class="{
              'hover:border-hairline-strong hover:bg-surface-2': !revealed,
              'border-teal bg-teal/8': choiceState(choice.id) === 'correct' || choiceState(choice.id) === 'missed',
              'border-coral bg-coral/8': choiceState(choice.id) === 'incorrect',
              'opacity-60': revealed && choiceState(choice.id) === 'idle',
            }"
            :aria-checked="selectedId === choice.id"
            :disabled="revealed"
            :tabindex="revealed ? -1 : choiceIndex === 0 || selectedId === choice.id ? 0 : -1"
            @click="select(choice.id)"
            @keydown="onKeydown($event, choice.id, choiceIndex)"
          >
            <span
              v-if="question.kind === 'choice'"
              class="font-mono text-sm tabular"
              :class="choiceState(choice.id) === 'incorrect' ? 'text-coral' : 'text-amber'"
              aria-hidden="true"
            >
              {{ quizChoiceLetter(choiceIndex) }}
            </span>
            <span class="min-w-0 flex-1">
              <span class="block text-[0.9375rem] leading-relaxed text-ink">{{ L(choice.label) }}</span>
              <span
                v-if="choiceState(choice.id) === 'correct'"
                class="stamp stamp-correct mt-3"
              >
                <Check :size="12" :stroke-width="2.25" aria-hidden="true" />
                {{ t('quizCorrect') }}
              </span>
              <span
                v-else-if="choiceState(choice.id) === 'incorrect'"
                class="stamp stamp-incorrect mt-3"
              >
                <X :size="12" :stroke-width="2.25" aria-hidden="true" />
                {{ t('quizIncorrect') }}
              </span>
              <span
                v-else-if="choiceState(choice.id) === 'missed'"
                class="stamp stamp-correct mt-3"
              >
                <Check :size="12" :stroke-width="2.25" aria-hidden="true" />
                {{ t('quizRightAnswer') }}
              </span>
            </span>
          </button>
        </div>

      </div>

      <aside class="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24">
        <div v-if="!revealed" class="card hidden p-5 sm:p-6 lg:block">
          <p class="eyebrow">{{ L(question.section) }}</p>
          <p class="mt-4 text-[0.9375rem] leading-relaxed text-ink">{{ L(question.dek) }}</p>
          <p class="mt-4 text-[0.875rem] leading-relaxed text-ink-2">{{ t('quizAsideWait') }}</p>
        </div>
        <div
          v-else-if="selectedChoice && correctChoice"
          class="rounded border p-5 sm:p-6"
          :class="isCorrect ? 'border-teal bg-teal/8' : 'border-coral bg-coral/8'"
          aria-live="polite"
        >
          <p class="stamp" :class="isCorrect ? 'stamp-correct' : 'stamp-incorrect'">
            <component :is="isCorrect ? Check : X" :size="12" :stroke-width="2.25" aria-hidden="true" />
            {{ isCorrect ? t('quizCorrect') : t('quizIncorrect') }}
          </p>
          <p class="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(question.dek) }}</p>
          <p class="mt-4 text-[0.9375rem] leading-relaxed text-ink">
            <span class="font-medium">{{ isCorrect ? t('quizWhyCorrect') : t('quizWhyIncorrect') }}</span>
            {{ L(selectedChoice.why) }}
          </p>
          <p v-if="!isCorrect" class="mt-4 text-[0.9375rem] leading-relaxed text-ink">
            <span class="font-medium">{{ t('quizWhyCorrect') }}</span>
            {{ L(correctChoice.why) }}
          </p>
        </div>
      </aside>

      <button
        v-if="revealed"
        ref="nextRef"
        type="button"
        class="inline-flex min-h-12 w-fit items-center rounded bg-amber px-5 font-mono text-[0.75rem] font-medium tracking-widest uppercase text-on-amber lg:col-start-1 lg:row-start-2"
        @click="advance"
      >
        {{ isLast ? t('quizSeeResults') : t('quizNext') }}
      </button>
    </section>

    <section v-else class="max-w-[40rem] text-center sm:text-left">
      <p class="eyebrow">{{ t('quizEyebrow') }}</p>
      <p
        class="stamp mx-auto mt-5 sm:mx-0"
        :class="passed ? 'stamp-correct' : 'stamp-incorrect'"
      >
        <component :is="passed ? Check : X" :size="12" :stroke-width="2.25" aria-hidden="true" />
        {{ passed ? t('quizPassed') : t('quizNotYet') }}
      </p>
      <h2
        ref="headingRef"
        tabindex="-1"
        class="mt-6 font-display text-[2.25rem] leading-[1.08] text-ink outline-none sm:text-[3.25rem]"
      >
        {{ passed ? t('quizPassTitle') : t('quizFailTitle') }}
      </h2>
      <p class="mt-6 font-display text-5xl tabular text-ink sm:text-6xl">
        <span class="text-amber">{{ score }}</span>
        <span class="text-muted"> / {{ total }}</span>
      </p>
      <p class="mt-2 font-mono text-[0.6875rem] uppercase tracking-widest text-muted">
        {{ t('quizScoreLine', { percent }) }}
      </p>
      <p class="mx-auto mt-6 max-w-[42ch] text-base leading-relaxed text-ink-2 sm:mx-0 sm:text-lg">
        {{ passed ? t('quizPassLead') : t('quizFailLead') }}
      </p>

      <div v-if="passed" class="mt-10 flex flex-col items-center gap-3 sm:items-start">
        <button
          type="button"
          class="inline-flex min-h-12 items-center gap-2 rounded bg-amber px-5 font-mono text-[0.75rem] font-medium tracking-widest uppercase text-on-amber"
          @click="shareLinkedIn"
        >
          <Share2 :size="16" aria-hidden="true" />
          {{ t('quizShareLinkedIn') }}
          <span class="sr-only">({{ t('opensNewTab') }})</span>
        </button>
        <button
          type="button"
          class="inline-flex min-h-11 items-center gap-2 rounded border border-hairline px-4 font-mono text-[0.6875rem] tracking-widest uppercase text-ink-2 hover:border-hairline-strong hover:text-ink"
          @click="copyShare"
        >
          <Copy :size="14" aria-hidden="true" />
          {{ copied ? t('quizShareCopied') : t('quizCopyShare') }}
        </button>
      </div>

      <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          class="inline-flex min-h-11 items-center gap-2 rounded border border-hairline px-4 font-mono text-[0.6875rem] tracking-widest uppercase text-ink-2 hover:border-hairline-strong hover:text-ink"
          @click="start"
        >
          <RotateCcw :size="14" aria-hidden="true" />
          {{ t('quizRetry') }}
        </button>
        <NuxtLink
          :to="localePath('/learn')"
          class="link-underline text-sm text-amber hover:text-ink"
        >
          {{ t('learnBack') }}
        </NuxtLink>
        <a
          :href="learnHelpUrl"
          class="link-underline text-sm text-muted hover:text-amber"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('learnHelpLink') }}
          <span class="sr-only">({{ t('opensNewTab') }})</span>
        </a>
      </div>
    </section>
  </div>
</template>
