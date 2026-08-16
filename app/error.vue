<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t, locale, localePath } = useLocale()

const is404 = computed(() => props.error.statusCode === 404)
const home = computed(() => localePath('/'))

useSeoMeta({
  title: () => `${is404.value ? t('errorNotFoundTitle') : t('errorGenericTitle')} · ${t('brand')}`,
  description: () => (is404.value ? t('errorNotFoundLead') : t('errorGeneric')),
  robots: 'noindex, nofollow',
})

useHead({
  htmlAttrs: { lang: locale },
})

function goHome() {
  clearError({ redirect: home.value })
}
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-bg text-ink">
    <header class="border-b border-hairline">
      <div class="mx-auto flex h-16 max-w-[1400px] items-center px-4 sm:px-6 lg:px-10">
        <NuxtLink :to="home" class="font-display text-[1.0625rem] font-semibold tracking-tight" @click="goHome">
          France<span class="text-amber"> Cyberwatch</span>
        </NuxtLink>
      </div>
    </header>

    <main class="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 py-24 sm:px-6 lg:px-10">
      <p class="eyebrow">{{ error.statusCode }}</p>
      <h1 class="mt-4 max-w-[20ch] font-display text-4xl leading-tight sm:text-5xl">
        {{ is404 ? t('errorNotFound') : t('errorGeneric') }}
      </h1>
      <p v-if="error.statusMessage && !is404" class="mt-4 max-w-[62ch] text-ink-2">{{ error.statusMessage }}</p>
      <button
        type="button"
        class="link-underline mt-8 self-start text-sm text-amber hover:text-ink"
        @click="goHome"
      >
        {{ t('errorBack') }}
      </button>
    </main>
  </div>
</template>
