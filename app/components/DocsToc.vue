<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'

export type DocsTocChild = {
  id: string
  label: string
  mono?: boolean
}

export type DocsTocGroup = {
  id: string
  label: string
  children?: DocsTocChild[]
}

const props = defineProps<{
  groups: DocsTocGroup[]
  activeId: string
  /** Larger tap targets for the mobile sheet. */
  touch?: boolean
  showEyebrow?: boolean
}>()

const emit = defineEmits<{ navigate: [] }>()

const { t } = useLocale()
const { prefersReducedMotion } = useReducedMotion()

const expanded = ref<Record<string, boolean>>({})

function groupForId(id: string) {
  return props.groups.find((group) => group.id === id || group.children?.some((child) => child.id === id))
}

watch(
  () => props.activeId,
  (id) => {
    const group = groupForId(id)
    if (group?.children?.length) expanded.value = { ...expanded.value, [group.id]: true }
  },
  { immediate: true },
)

function isCurrent(id: string) {
  return props.activeId === id
}

function groupIsActive(group: DocsTocGroup) {
  if (isCurrent(group.id)) return true
  return Boolean(group.children?.some((child) => isCurrent(child.id)))
}

function isExpanded(group: DocsTocGroup) {
  return Boolean(expanded.value[group.id])
}

function toggle(id: string) {
  expanded.value = { ...expanded.value, [id]: !expanded.value[id] }
}

function linkClass(id: string, nested: boolean) {
  const current = isCurrent(id)
  return [
    'block rounded-sm border-l-2 transition-colors',
    nested ? 'pl-3' : 'pl-2.5',
    props.touch ? 'py-2.5' : 'py-1',
    current ? 'border-amber text-ink' : 'border-transparent text-ink-2 hover:text-ink',
  ]
}
</script>

<template>
  <nav :aria-label="t('docsContents')">
    <p v-if="showEyebrow !== false" class="eyebrow">{{ t('docsOnThisPage') }}</p>
    <ul :class="showEyebrow !== false ? 'mt-4' : ''">
      <li v-for="group in groups" :key="group.id" class="border-t border-hairline first:border-t-0">
        <div class="mt-2 flex items-start gap-0.5">
          <a
            :href="`#${group.id}`"
            class="min-w-0 flex-1 text-[0.8125rem] leading-snug"
            :class="linkClass(group.id, false)"
            :aria-current="isCurrent(group.id) ? 'location' : undefined"
            @click="emit('navigate')"
          >
            {{ group.label }}
          </a>
          <button
            v-if="group.children?.length"
            type="button"
            class="grid shrink-0 place-items-center rounded text-muted hover:text-ink"
            :class="touch ? 'h-11 w-11' : 'mt-0.5 h-7 w-7'"
            :aria-expanded="isExpanded(group)"
            :aria-controls="`docs-toc-${group.id}`"
            :aria-label="isExpanded(group) ? t('docsCollapseSection') : t('docsExpandSection')"
            @click="toggle(group.id)"
          >
            <ChevronDown
              :size="15"
              class="shrink-0"
              :class="[
                isExpanded(group) ? 'rotate-180' : '',
                prefersReducedMotion ? '' : 'transition-transform',
              ]"
              aria-hidden="true"
            />
          </button>
        </div>
        <ul
          v-if="group.children?.length && isExpanded(group)"
          :id="`docs-toc-${group.id}`"
          class="mb-2 ml-2.5 border-l border-hairline"
          :class="groupIsActive(group) ? 'border-hairline-strong' : ''"
        >
          <li v-for="child in group.children" :key="child.id">
            <a
              :href="`#${child.id}`"
              :class="[
                ...linkClass(child.id, true),
                child.mono ? 'font-mono text-[0.75rem] tracking-tight' : 'text-[0.8125rem] leading-snug',
              ]"
              :aria-current="isCurrent(child.id) ? 'location' : undefined"
              @click="emit('navigate')"
            >
              {{ child.label }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
