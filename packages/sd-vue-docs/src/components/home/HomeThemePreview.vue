<script setup lang="ts">
  import { computed, ref } from 'vue';

  import {
    buildThemeRuntimePayload,
    getThemePreset,
    themePresets,
  } from '../theme/theme-playground';
  import ThemePreviewPanel from '../theme/ThemePreviewPanel.vue';

  const activeThemeKey = ref(themePresets[0].key);

  const activeTheme = computed(() => {
    return getThemePreset(activeThemeKey.value);
  });

  const activeRuntimePayload = computed(() => {
    return buildThemeRuntimePayload(activeTheme.value.theme, activeTheme.value.mode);
  });

  const previewSurfaceStyle = computed(() => {
    const tokens = activeRuntimePayload.value.theme.tokens;

    return {
      '--home-preview-accent': `rgb(${String(tokens?.primary6 ?? '20,118,255')})`,
      '--home-preview-surface': String(tokens?.colorBg2 ?? '#ffffff'),
      '--home-preview-surface-elevated': String(tokens?.colorBg5 ?? tokens?.colorBg2 ?? '#ffffff'),
      '--home-preview-text': String(tokens?.colorNeutral10 ?? '#0f172a'),
      '--home-preview-text-muted': String(tokens?.colorNeutral6 ?? '#64748b'),
      '--home-preview-border': String(tokens?.colorNeutral3 ?? '#d9e2f0'),
    };
  });
</script>

<template>
  <div class="theme-preview">
    <aside class="theme-preview__aside">
      <button
        v-for="themeOption in themePresets"
        :key="themeOption.key"
        type="button"
        class="theme-preview__option"
        :class="{ 'is-active': themeOption.key === activeThemeKey }"
        @click="activeThemeKey = themeOption.key"
      >
        <strong>{{ themeOption.name }}</strong>
        <span>{{ themeOption.summary }}</span>
        <small>{{ themeOption.description }}</small>
      </button>

      <div class="theme-preview__doc-links">
        <a href="/guides/theme-editor/">查看主题 JSON 约定</a>
        <a href="/guides/style-migration/">查看迁移手册</a>
      </div>
    </aside>

    <sd-config-provider :theme="activeRuntimePayload.theme" :theme-mode="activeRuntimePayload.mode">
      <div class="theme-preview__surface" :style="previewSurfaceStyle">
        <div class="theme-preview__summary">
          <div>
            <p class="theme-preview__eyebrow">实时预览</p>
            <h3>{{ activeTheme.name }}</h3>
            <p> 该模块内可独立切换主题并实时预览，不会影响组件展示区与外部文档主题状态。 </p>
          </div>

          <sd-tag color="blue">{{ activeTheme.summary }}</sd-tag>
        </div>

        <ThemePreviewPanel
          :preset="activeTheme"
          :theme="activeRuntimePayload.theme"
          :theme-mode="activeRuntimePayload.mode"
          :inherit-provider="true"
          compact
        />
      </div>
    </sd-config-provider>
  </div>
</template>

<style scoped>
  .theme-preview {
    display: grid;
    grid-template-columns: 16rem minmax(0, 1fr);
    gap: 1rem;
    min-width: 0;
  }

  .theme-preview__aside,
  .theme-preview__surface {
    min-width: 0;
    border-radius: 1.5rem;
  }

  .theme-preview__aside {
    display: grid;
    gap: 0.75rem;
    align-content: start;
    padding: 1rem;
    background: color-mix(in srgb, var(--sl-color-bg) 84%, transparent);
    border: 1px solid rgb(20 118 255 / 12%);
    box-shadow: 0 16px 40px rgb(15 23 42 / 5%);
  }

  .theme-preview__option {
    display: grid;
    gap: 0.35rem;
    padding: 0.95rem 1rem;
    color: inherit;
    text-align: left;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 1rem;
    cursor: pointer;
    transition:
      border-color 180ms ease,
      background 180ms ease,
      transform 180ms ease;
  }

  .theme-preview__option strong {
    font-size: 1rem;
  }

  .theme-preview__option span,
  .theme-preview__option small {
    color: var(--sl-text-3);
    line-height: 1.6;
  }

  .theme-preview__option:hover,
  .theme-preview__option.is-active {
    background: color-mix(in srgb, var(--sl-color-accent-low) 56%, transparent);
    border-color: color-mix(in srgb, var(--sl-color-accent) 32%, transparent);
    transform: translateY(-1px);
  }

  .theme-preview__doc-links {
    display: grid;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .theme-preview__doc-links a {
    color: var(--sl-color-accent-high);
    font-weight: 600;
    text-decoration: none;
  }

  .theme-preview__surface {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    color: var(--home-preview-text);
    background:
      radial-gradient(
        circle at top right,
        color-mix(in srgb, var(--home-preview-accent) 14%, transparent),
        transparent 34%
      ),
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--home-preview-surface) 94%, transparent),
        color-mix(in srgb, var(--home-preview-surface-elevated) 96%, transparent)
      );
    border: 1px solid color-mix(in srgb, var(--home-preview-border) 72%, transparent);
    box-shadow: 0 18px 44px color-mix(in srgb, var(--home-preview-accent) 12%, transparent);
  }

  .theme-preview__summary {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;
  }

  .theme-preview__summary > div {
    color: var(--home-preview-text);
  }

  .theme-preview__eyebrow {
    margin: 0 0 0.4rem;
    color: var(--home-preview-accent);
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .theme-preview__summary h3 {
    margin: 0;
    font-size: 1.45rem;
  }

  .theme-preview__summary p {
    margin: 0.45rem 0 0;
    color: var(--home-preview-text-muted);
    line-height: 1.75;
  }

  .theme-preview__summary .theme-preview__eyebrow {
    color: var(--home-preview-accent);
  }

  :root[data-theme='dark'] .theme-preview__aside {
    background: rgb(255 255 255 / 3%);
    border-color: rgb(255 255 255 / 10%);
    box-shadow: 0 18px 44px rgb(0 0 0 / 22%);
  }

  @media (width <= 900px) {
    .theme-preview {
      grid-template-columns: 1fr;
    }
  }
</style>
