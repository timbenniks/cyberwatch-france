<script setup lang="ts">
import { Menu, Search, X } from '@lucide/vue'

const { t, locale, alternates, localePath } = useLocale()

const route = useRoute()
const menuOpen = ref(false)
const progress = ref(0)

const currentPath = computed(() => route.path.replace(/\/$/, '') || '/')

function isActive(path: string) {
  const target = localePath(path).replace(/\/$/, '') || '/'
  return currentPath.value === target || currentPath.value.startsWith(`${target}/`)
}

const isLearn = computed(() => isActive('/learn'))

useScrollLock(menuOpen)

let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const doc = document.documentElement
    const max = doc.scrollHeight - doc.clientHeight
    progress.value = max > 0 ? Math.min(1, doc.scrollTop / max) : 0
    ticking = false
  })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function onNav(path: string) {
  menuOpen.value = false
  trackPlausibleEvent('Nav', { section: path })
}

function onLearn() {
  menuOpen.value = false
  trackPlausibleEvent('Open Learn')
}

function onLanguage(code: string) {
  writeLocalePref(code === 'fr' ? 'fr' : 'en')
  trackPlausibleEvent('Language Switch', { locale: code })
}

async function goToSearch() {
  menuOpen.value = false
  trackPlausibleEvent('Search Jump')
  await navigateTo(localePath('/incidents'))
  await nextTick()
  const inputs = [...document.querySelectorAll<HTMLInputElement>('[data-search-input]')]
  inputs.find((input) => input.offsetParent !== null)?.focus()
}
</script>

<template>
  <header class="no-print sticky top-0 z-40 border-b border-hairline bg-bg/92 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
    <div class="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-10">
      <NuxtLink :to="localePath('/')" class="group flex min-w-0 shrink-0 items-baseline gap-2" @click="onNav('/')">
        <span class="font-display text-[1.0625rem] font-semibold tracking-tight text-ink">
          France<span class="text-amber"> Cyberwatch</span>
        </span>
        <span class="eyebrow hidden sm:inline">{{ t('brandYears') }}</span>
      </NuxtLink>

      <nav class="ml-auto hidden items-center gap-1 lg:flex" :aria-label="t('brand')">
        <NuxtLink
          v-for="page in navPages"
          :key="page.path"
          :to="localePath(page.path)"
          class="rounded px-3 py-2 text-[0.8125rem] transition-colors"
          :class="isActive(page.path) ? 'text-amber' : 'text-ink-2 hover:text-ink'"
          :aria-current="isActive(page.path) ? 'page' : undefined"
          @click="onNav(page.path)"
        >
          {{ t(page.key) }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/learn')"
          class="rounded px-3 py-2 text-[0.8125rem] transition-colors"
          :class="isLearn ? 'text-amber' : 'text-ink-2 hover:text-ink'"
          :aria-current="isLearn ? 'page' : undefined"
          @click="onLearn"
        >
          {{ t('learnNav') }}
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-1.5 sm:gap-2 lg:ml-2">
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded border border-hairline text-ink-2 transition-colors hover:border-hairline-strong hover:text-ink sm:h-9 sm:w-9"
          :aria-label="t('search')"
          @click="goToSearch"
        >
          <Search :size="16" />
        </button>

        <div
          class="flex h-11 items-center rounded border border-hairline p-0.5 font-mono text-[0.6875rem] tracking-widest uppercase sm:h-auto"
          role="group"
          :aria-label="t('language')"
        >
          <NuxtLink
            v-for="alternate in alternates"
            :key="alternate.code"
            :to="alternate.path"
            :hreflang="alternate.code"
            class="grid h-full min-w-9 place-items-center rounded-[2px] px-2.5 py-1 transition-colors sm:h-auto sm:min-w-0"
            :class="locale === alternate.code ? 'bg-amber text-on-amber' : 'text-ink-2 hover:text-ink'"
            :aria-current="locale === alternate.code ? 'true' : undefined"
            @click="onLanguage(alternate.code)"
          >
            {{ alternate.code }}
          </NuxtLink>
        </div>

        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded border border-hairline text-ink-2 lg:hidden"
          :aria-label="menuOpen ? t('closeMenu') : t('openMenu')"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <component :is="menuOpen ? X : Menu" :size="16" />
        </button>
      </div>
    </div>

    <div class="h-px w-full bg-hairline" aria-hidden="true">
      <div
        class="h-px origin-left bg-amber will-change-transform"
        :style="{ transform: `scaleX(${progress})` }"
      />
    </div>

    <div v-if="menuOpen" class="border-t border-hairline bg-bg lg:hidden">
      <nav class="mx-auto max-w-[1400px] px-4 py-3 sm:px-6" :aria-label="t('brand')">
        <NuxtLink
          v-for="page in navPages"
          :key="page.path"
          :to="localePath(page.path)"
          class="block border-b border-hairline py-3.5 font-display text-lg"
          :class="isActive(page.path) ? 'text-amber' : 'text-ink'"
          @click="onNav(page.path)"
        >
          {{ t(page.key) }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/learn')"
          class="block py-3.5 font-display text-lg"
          :class="isLearn ? 'text-amber' : 'text-ink'"
          :aria-current="isLearn ? 'page' : undefined"
          @click="onLearn"
        >
          {{ t('learnNav') }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
