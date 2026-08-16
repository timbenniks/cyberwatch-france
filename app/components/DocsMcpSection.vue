<script setup lang="ts">
const { t, L } = useLocale()
const { absolute } = useSiteUrl()

const mcpUrl = absolute('/mcp')

const cursorSnippet = `{
  "mcpServers": {
    "france-cyberwatch": {
      "url": "${mcpUrl}"
    }
  }
}`

const claudeSnippet = `{
  "mcpServers": {
    "france-cyberwatch": {
      "type": "http",
      "url": "${mcpUrl}"
    }
  }
}`

const vscodeSnippet = `{
  "servers": {
    "france-cyberwatch": {
      "type": "http",
      "url": "${mcpUrl}"
    }
  }
}`

const cursorInstallHref = computed(() => {
  const config = btoa(JSON.stringify({ url: mcpUrl }))
  return `https://cursor.com/en/install-mcp?name=france-cyberwatch&config=${encodeURIComponent(config)}`
})
</script>

<template>
  <section class="mt-16 sm:mt-20" aria-labelledby="mcp">
    <header class="max-w-[62ch]">
      <h2 id="mcp" class="scroll-mt-32 font-display text-2xl leading-tight text-ink lg:scroll-mt-24 sm:text-3xl">
        {{ t('mcpTitle') }}
      </h2>
      <p class="mt-4 text-[0.9375rem] leading-relaxed text-ink-2 sm:text-base">{{ t('mcpLead') }}</p>
      <p class="mt-4 font-mono text-[0.8125rem] tracking-wide text-amber">POST {{ mcpUrl }}</p>
    </header>

    <div class="mt-8 max-w-[62ch]">
      <h3 id="mcp-install" class="scroll-mt-32 font-display text-xl text-ink lg:scroll-mt-24">
        {{ t('mcpInstallTitle') }}
      </h3>
      <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('mcpInstallLead') }}</p>

      <article class="card mt-6 p-5 sm:p-6">
        <h4 class="font-display text-lg text-ink">Cursor</h4>
        <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('mcpInstallCursor') }}</p>
        <pre class="mt-4 overflow-x-auto border border-hairline bg-surface-1 p-4 font-mono text-[0.8125rem] leading-relaxed text-ink-2">{{ cursorSnippet }}</pre>
        <a
          :href="cursorInstallHref"
          class="link-underline mt-4 inline-block font-mono text-sm text-amber hover:text-ink"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ t('mcpInstallCursorClick') }}
        </a>
      </article>

      <article class="card mt-4 p-5 sm:p-6">
        <h4 class="font-display text-lg text-ink">Claude</h4>
        <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('mcpInstallClaude') }}</p>
        <pre class="mt-4 overflow-x-auto border border-hairline bg-surface-1 p-4 font-mono text-[0.8125rem] leading-relaxed text-ink-2">{{ claudeSnippet }}</pre>
      </article>

      <article class="card mt-4 p-5 sm:p-6">
        <h4 class="font-display text-lg text-ink">VS Code</h4>
        <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('mcpInstallVscode') }}</p>
        <pre class="mt-4 overflow-x-auto border border-hairline bg-surface-1 p-4 font-mono text-[0.8125rem] leading-relaxed text-ink-2">{{ vscodeSnippet }}</pre>
      </article>
    </div>

    <h3 id="mcp-tools" class="mt-10 scroll-mt-32 font-display text-xl text-ink lg:scroll-mt-24">
      {{ t('mcpToolsTitle') }}
    </h3>
    <div class="mt-4 grid gap-4">
      <article v-for="tool in mcpToolDocs" :key="tool.name" class="card p-5 sm:p-6">
        <p class="font-mono text-[0.8125rem] tracking-wide text-amber">{{ tool.name }}</p>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(tool.description) }}</p>
        <p v-if="tool.input" class="mt-3 text-sm text-muted">
          <span class="font-mono uppercase tracking-widest">{{ t('mcpInput') }}</span>
          — {{ L(tool.input) }}
        </p>
      </article>
    </div>

    <div class="mt-8 grid gap-4 lg:grid-cols-2">
      <div>
        <h3 id="mcp-resources" class="scroll-mt-32 font-display text-xl text-ink lg:scroll-mt-24">
          {{ t('mcpResourcesTitle') }}
        </h3>
        <ul class="mt-4 space-y-4">
          <li v-for="resource in mcpResourceDocs" :key="resource.name" class="card p-5 sm:p-6">
            <p class="font-mono text-[0.8125rem] tracking-wide text-amber">{{ resource.name }}</p>
            <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(resource.description) }}</p>
          </li>
        </ul>
      </div>
      <div>
        <h3 id="mcp-prompts" class="scroll-mt-32 font-display text-xl text-ink lg:scroll-mt-24">
          {{ t('mcpPromptsTitle') }}
        </h3>
        <ul class="mt-4 space-y-4">
          <li v-for="prompt in mcpPromptDocs" :key="prompt.name" class="card p-5 sm:p-6">
            <p class="font-mono text-[0.8125rem] tracking-wide text-amber">{{ prompt.name }}</p>
            <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(prompt.description) }}</p>
            <p v-if="prompt.input" class="mt-3 text-sm text-muted">
              <span class="font-mono uppercase tracking-widest">{{ t('mcpInput') }}</span>
              — {{ L(prompt.input) }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
