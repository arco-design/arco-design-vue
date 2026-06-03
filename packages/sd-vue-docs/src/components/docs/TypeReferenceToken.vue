<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

  interface TypeReferenceEntry {
    code: string;
    kind: string;
    modulePath: string;
  }

  const props = defineProps<{
    entry: TypeReferenceEntry;
    typeName: string;
  }>();

  const highlightedHtml = ref('');
  const isDark = ref(false);
  let themeObserver: MutationObserver | null = null;

  const fallbackHtml = computed(
    () => `<pre class="shiki"><code>${escapeHtml(props.entry.code)}</code></pre>`,
  );

  function escapeHtml(source: string) {
    return source.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  function syncTheme() {
    isDark.value = document.documentElement.dataset.theme === 'dark';
  }

  async function renderHighlightedCode() {
    const { codeToHtml } = await import('shiki');
    highlightedHtml.value = await codeToHtml(props.entry.code, {
      lang: 'ts',
      theme: isDark.value ? 'github-dark' : 'github-light',
    });
  }

  onMounted(async () => {
    syncTheme();
    await renderHighlightedCode();

    themeObserver = new MutationObserver(async () => {
      const previousTheme = isDark.value;
      syncTheme();

      if (previousTheme !== isDark.value) {
        await renderHighlightedCode();
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  });

  onBeforeUnmount(() => {
    themeObserver?.disconnect();
  });
</script>

<template>
  <sd-popover
    content-class="type-reference-token__popup"
    :content-style="{ padding: '0' }"
    position="top"
  >
    <span class="type-reference-token">{{ typeName }}</span>
    <template #content>
      <div
        :style="{
          maxHeight: 'min(28rem, 60vh)',
          maxWidth: 'min(42rem, calc(100vw - 2rem))',
        }"
      >
        <div class="type-reference-token__content" v-html="highlightedHtml || fallbackHtml"></div>
      </div>
    </template>
  </sd-popover>
</template>

<style scoped>
  .type-reference-token {
    text-decoration: underline dotted color-mix(in srgb, var(--sl-color-accent) 72%, transparent);
    text-underline-offset: 0.18em;
    cursor: help;
  }

  .type-reference-token:focus-visible,
  .type-reference-token:hover {
    color: var(--sl-color-accent);
    outline: none;
  }

  .type-reference-token__content {
    min-width: 20rem;
    max-width: min(42rem, calc(100vw - 2rem));
  }

  .type-reference-token__content :deep(pre.shiki) {
    margin: 0;
    padding: 0.9rem 1rem;
    overflow: visible;
    font-size: 0.84rem;
    line-height: 1.55;
    border-radius: var(--sd-border-radius-medium);
  }

  .type-reference-token__content :deep(pre.shiki code) {
    white-space: pre-wrap;
    word-break: break-word;
  }
</style>
