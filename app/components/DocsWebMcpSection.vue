<script setup lang="ts">
const { t, L } = useLocale()
</script>

<template>
  <section class="mt-16 sm:mt-20" aria-labelledby="webmcp">
    <header class="max-w-[62ch]">
      <h2 id="webmcp" class="scroll-mt-32 font-display text-2xl leading-tight text-ink lg:scroll-mt-24 sm:text-3xl">
        {{ t('webmcpTitle') }}
      </h2>
      <p class="mt-4 text-[0.9375rem] leading-relaxed text-ink-2 sm:text-base">{{ t('webmcpLead') }}</p>
    </header>

    <div id="webmcp-enable" class="card mt-8 max-w-[62ch] scroll-mt-32 p-5 sm:p-6 lg:scroll-mt-24">
      <h3 class="font-display text-lg text-ink">{{ t('webmcpEnableTitle') }}</h3>
      <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('webmcpEnableBody') }}</p>
      <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('webmcpEnableSteps') }}</p>
      <p class="mt-4 font-mono text-[0.8125rem] text-amber">{{ t('webmcpFlag') }}</p>
      <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('webmcpInspector') }}</p>
      <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('webmcpBridge') }}</p>
    </div>

    <h3 id="webmcp-tools" class="mt-10 scroll-mt-32 font-display text-xl text-ink lg:scroll-mt-24">
      {{ t('webmcpToolsTitle') }}
    </h3>
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
</template>
