<script setup lang="ts">
const { t } = useLocale()
const { colorScheme, setColorScheme } = useColorScheme()

/** Selection is client-only so prerendered markup never claims a scheme. */
const ready = ref(false)
onMounted(() => {
  ready.value = true
})

function onPick(scheme: ColorScheme) {
  setColorScheme(scheme)
  trackPlausibleEvent('Theme Switch', { theme: scheme })
}

function optionClass(scheme: ColorScheme) {
  return ready.value && colorScheme.value === scheme
    ? 'bg-amber text-on-amber'
    : 'text-ink-2 hover:text-ink'
}
</script>

<template>
  <div
    class="no-print flex h-11 items-center rounded border border-hairline p-0.5 font-mono text-[0.6875rem] tracking-widest uppercase sm:h-auto"
    role="radiogroup"
    :aria-label="t('theme')"
  >
    <button
      type="button"
      role="radio"
      class="grid h-full min-w-9 place-items-center rounded-[2px] px-2.5 py-1 transition-colors sm:h-auto sm:min-w-0"
      :class="optionClass('light')"
      :aria-checked="ready && colorScheme === 'light'"
      @click="onPick('light')"
    >
      {{ t('themeLight') }}
    </button>
    <button
      type="button"
      role="radio"
      class="grid h-full min-w-9 place-items-center rounded-[2px] px-2.5 py-1 transition-colors sm:h-auto sm:min-w-0"
      :class="optionClass('dark')"
      :aria-checked="ready && colorScheme === 'dark'"
      @click="onPick('dark')"
    >
      {{ t('themeDark') }}
    </button>
  </div>
</template>
