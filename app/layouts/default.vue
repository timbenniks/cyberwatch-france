<script setup lang="ts">
const { t, localePath } = useLocale()
</script>

<template>
  <div>
    <NuxtLink
      :to="{ hash: '#content' }"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:border focus:border-amber focus:bg-surface-1 focus:px-4 focus:py-2 focus:text-sm"
    >
      {{ t('skipToContent') }}
    </NuxtLink>

    <AppHeader />

    <slot />

    <footer class="relative z-10 border-t border-hairline">
      <div
        class="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-sm text-muted sm:flex-row sm:items-center sm:px-6 lg:px-10"
      >
        <p class="max-w-[62ch] leading-relaxed">{{ t('footerNote') }}</p>
        <div
          class="flex flex-col items-start gap-3 sm:ml-auto sm:shrink-0 sm:items-end"
        >
          <p
            class="flex flex-wrap items-baseline gap-x-4 font-mono text-[0.6875rem] uppercase tracking-widest"
          >
            <NuxtLink
              :to="localePath('/learn')"
              class="link-underline hover:text-amber"
              @click="trackPlausibleEvent('Open Learn')"
            >
              {{ t('learnNav') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/docs')"
              class="link-underline hover:text-amber"
              @click="trackPlausibleEvent('Open API Docs')"
            >
              {{ t('apiLink') }}
            </NuxtLink>
            <a href="/api" class="link-underline hover:text-amber">{{
              t('jsonApi')
            }}</a>
            <NuxtLink
              :to="`${localePath('/docs')}#mcp`"
              class="link-underline hover:text-amber"
            >
              MCP
            </NuxtLink>
            <a href="/llms.txt" class="link-underline hover:text-amber"
              >llms.txt</a
            >
            <a href="/feed.xml" class="link-underline hover:text-amber">RSS</a>
            <span class="lg:hidden"><ThemeSwitch /></span>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
