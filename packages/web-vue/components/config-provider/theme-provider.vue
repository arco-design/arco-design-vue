<script setup lang="ts">
  import { computed, onBeforeUnmount, shallowRef, watch } from 'vue';

  defineOptions({
    name: 'ThemeProvider',
  });

  import {
    applyThemeCSSVariables,
    clearThemeCSSVariables,
    normalizeTheme,
    type SDThemeConfig,
    type SDThemeMode,
  } from './theme';

  const props = withDefaults(
    defineProps<{
      theme?: SDThemeConfig;
      themeMode?: SDThemeMode;
      global?: boolean;
      tag?: string;
    }>(),
    {
      themeMode: undefined,
      global: false,
      tag: 'div',
    },
  );

  const rootElement = shallowRef<HTMLElement | null>(null);
  const normalizedTheme = computed(() => normalizeTheme(props.theme));
  const usesLocalThemeContainer = computed(() => {
    if (props.global) {
      return false;
    }

    return (
      Boolean(props.themeMode) ||
      Object.keys(normalizedTheme.value.tokens).length > 0 ||
      Object.keys(normalizedTheme.value.components).length > 0
    );
  });

  let appliedThemeKeys = new Set<string>();
  let activeTarget: HTMLElement | null = null;
  let previousGlobalThemeMode: string | null | undefined;

  function resolveThemeTarget(): HTMLElement | null {
    if (typeof document === 'undefined') {
      return null;
    }

    if (props.global) {
      return document.body || document.documentElement;
    }

    if (!usesLocalThemeContainer.value) {
      return null;
    }

    return rootElement.value;
  }

  function restoreThemeMode(target: HTMLElement) {
    if (!props.global) {
      if (props.themeMode) {
        target.setAttribute('sd-theme', props.themeMode);
      } else {
        target.removeAttribute('sd-theme');
      }

      return;
    }

    if (props.themeMode) {
      target.setAttribute('sd-theme', props.themeMode);
      return;
    }

    if (previousGlobalThemeMode === null) {
      target.removeAttribute('sd-theme');
      return;
    }

    if (previousGlobalThemeMode) {
      target.setAttribute('sd-theme', previousGlobalThemeMode);
    }
  }

  function resetActiveTarget() {
    if (!activeTarget) {
      return;
    }

    cleanupTarget(activeTarget);
    activeTarget = null;
  }

  function cleanupTarget(target: HTMLElement | null) {
    if (!target) {
      return;
    }

    clearThemeCSSVariables(target, appliedThemeKeys);
    appliedThemeKeys = new Set<string>();

    if (props.global) {
      if (previousGlobalThemeMode === undefined) {
        target.removeAttribute('sd-theme');
      } else if (previousGlobalThemeMode === null) {
        target.removeAttribute('sd-theme');
      } else {
        target.setAttribute('sd-theme', previousGlobalThemeMode);
      }

      previousGlobalThemeMode = undefined;
      return;
    }

    target.removeAttribute('sd-theme');
  }

  function syncThemeTarget() {
    const nextTarget = resolveThemeTarget();
    if (!nextTarget) {
      resetActiveTarget();
      return;
    }

    if (activeTarget && activeTarget !== nextTarget) {
      cleanupTarget(activeTarget);
    }

    if (props.global && activeTarget !== nextTarget && previousGlobalThemeMode === undefined) {
      previousGlobalThemeMode = nextTarget.getAttribute('sd-theme');
    }

    appliedThemeKeys = applyThemeCSSVariables(nextTarget, normalizedTheme.value, appliedThemeKeys);

    restoreThemeMode(nextTarget);

    activeTarget = nextTarget;
  }

  watch(
    [
      normalizedTheme,
      () => props.themeMode,
      () => props.global,
      usesLocalThemeContainer,
      rootElement,
    ],
    syncThemeTarget,
    {
      deep: true,
      immediate: true,
      flush: 'post',
    },
  );

  onBeforeUnmount(() => {
    cleanupTarget(activeTarget);
    activeTarget = null;
  });
</script>

<template>
  <component :is="tag" v-if="usesLocalThemeContainer" ref="rootElement" class="sd-theme-provider">
    <slot />
  </component>
  <slot v-else />
</template>

<style scoped>
  .sd-theme-provider {
    min-width: 0;
  }
</style>
