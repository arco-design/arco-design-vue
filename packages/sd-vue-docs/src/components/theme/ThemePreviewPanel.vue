<script setup lang="ts">
  import { computed } from 'vue';

  import type { ThemeConfig, ThemePreset } from './theme-playground';

  const props = defineProps<{
    preset: ThemePreset;
    theme: ThemeConfig;
    themeMode?: 'light' | 'dark';
    compact?: boolean;
    inheritProvider?: boolean;
  }>();

  const heroMetric = computed(() => {
    if (props.preset.key === 'compact') {
      return '32';
    }

    if (props.preset.key === 'cyberpunk') {
      return '64';
    }

    return '48';
  });

  const wrapperClass = computed(() => {
    return [`theme-preview-panel`, `is-${props.preset.key}`, props.compact ? 'is-compact' : ''];
  });

  const spotlightStyle = computed(() => {
    const primaryColor = String(props.theme.tokens?.primary6 ?? '20,118,255');
    const backgroundColor = String(props.theme.tokens?.colorBg2 ?? '#ffffff');
    const surfaceColor = String(props.theme.tokens?.colorBg5 ?? backgroundColor);
    const textColor = String(props.theme.tokens?.colorNeutral10 ?? '#0f172a');
    const mutedTextColor = String(props.theme.tokens?.colorNeutral6 ?? '#64748b');
    const borderColor = String(props.theme.tokens?.colorNeutral3 ?? '#d9e2f0');

    return {
      '--theme-preview-primary': `rgb(${primaryColor})`,
      '--theme-preview-background': backgroundColor,
      '--theme-preview-surface': surfaceColor,
      '--theme-preview-text': textColor,
      '--theme-preview-text-muted': mutedTextColor,
      '--theme-preview-border': borderColor,
    };
  });

  const effectiveThemeMode = computed(() => {
    return props.themeMode ?? props.preset.mode ?? 'light';
  });

  const themeGroupOptions = [{ label: '默认分组', value: 'default' }];
</script>

<template>
  <sd-config-provider v-if="!inheritProvider" :theme="theme" :theme-mode="effectiveThemeMode">
    <section :class="wrapperClass" :style="spotlightStyle">
      <header class="theme-preview-panel__hero">
        <div>
          <p class="theme-preview-panel__eyebrow">{{ preset.name }}</p>
          <h3>{{ preset.summary }}</h3>
          <p>{{ preset.description }}</p>
        </div>

        <sd-card class="theme-preview-panel__metric" :bordered="false">
          <strong>{{ heroMetric }}</strong>
          <span>个样式变量已覆盖</span>
        </sd-card>
      </header>

      <div class="theme-preview-panel__grid">
        <sd-card title="主题动作" class="theme-preview-panel__card">
          <sd-space wrap>
            <sd-button type="primary">发布主题</sd-button>
            <sd-button>保存草稿</sd-button>
            <sd-button type="secondary">导出 JSON</sd-button>
          </sd-space>

          <sd-space wrap style="margin-top: 16px">
            <sd-tag color="blue">预览中</sd-tag>
            <sd-tag color="green">已同步</sd-tag>
            <sd-tag color="orange">待评审</sd-tag>
          </sd-space>
        </sd-card>

        <sd-card title="表单与反馈" class="theme-preview-panel__card">
          <sd-space direction="vertical" fill>
            <sd-input placeholder="搜索 token 或组件" allow-clear />
            <sd-select placeholder="选择主题分组" :options="themeGroupOptions" />
            <sd-alert type="success">ConfigProvider 已接收新的 theme 对象。</sd-alert>
          </sd-space>
        </sd-card>
      </div>
    </section>
  </sd-config-provider>
  <section v-else :class="wrapperClass" :style="spotlightStyle">
    <header class="theme-preview-panel__hero">
      <div>
        <p class="theme-preview-panel__eyebrow">{{ preset.name }}</p>
        <h3>{{ preset.summary }}</h3>
        <p>{{ preset.description }}</p>
      </div>

      <sd-card class="theme-preview-panel__metric" :bordered="false">
        <strong>{{ heroMetric }}</strong>
        <span>个样式变量已覆盖</span>
      </sd-card>
    </header>

    <div class="theme-preview-panel__grid">
      <sd-card title="主题动作" class="theme-preview-panel__card">
        <sd-space wrap>
          <sd-button type="primary">发布主题</sd-button>
          <sd-button>保存草稿</sd-button>
          <sd-button type="secondary">导出 JSON</sd-button>
        </sd-space>

        <sd-space wrap style="margin-top: 16px">
          <sd-tag color="blue">预览中</sd-tag>
          <sd-tag color="green">已同步</sd-tag>
          <sd-tag color="orange">待评审</sd-tag>
        </sd-space>
      </sd-card>

      <sd-card title="表单与反馈" class="theme-preview-panel__card">
        <sd-space direction="vertical" fill>
          <sd-input placeholder="搜索 token 或组件" allow-clear />
          <sd-select placeholder="选择主题分组" :options="themeGroupOptions" />
          <sd-alert type="success">ConfigProvider 已接收新的 theme 对象。</sd-alert>
        </sd-space>
      </sd-card>
    </div>
  </section>
</template>

<style scoped>
  .theme-preview-panel {
    display: grid;
    gap: 1rem;
    padding: 1.1rem;
    color: var(--theme-preview-text);
    background:
      radial-gradient(
        circle at top right,
        color-mix(in srgb, var(--theme-preview-primary) 24%, transparent),
        transparent 38%
      ),
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--theme-preview-background) 90%, transparent),
        color-mix(in srgb, var(--theme-preview-background) 82%, transparent)
      );
    border: 1px solid color-mix(in srgb, var(--theme-preview-border) 72%, transparent);
    border-radius: 1.5rem;
  }

  .theme-preview-panel__hero {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;
  }

  .theme-preview-panel__eyebrow {
    margin: 0 0 0.4rem;
    color: var(--theme-preview-primary);
    font-weight: 700;
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .theme-preview-panel h3 {
    margin: 0;
    font-size: 1.35rem;
  }

  .theme-preview-panel p {
    margin: 0.45rem 0 0;
    color: var(--theme-preview-text-muted);
    line-height: 1.7;
  }

  .theme-preview-panel__metric {
    min-width: 10rem;
  }

  .theme-preview-panel__metric :deep(.sd-card-body) {
    display: grid;
    gap: 0.35rem;
    place-items: center start;
  }

  .theme-preview-panel__metric :deep(.sd-card) {
    color: var(--theme-preview-text);
    background: color-mix(in srgb, var(--theme-preview-surface) 92%, transparent);
    border-color: color-mix(in srgb, var(--theme-preview-border) 72%, transparent);
  }

  .theme-preview-panel__metric strong {
    color: var(--theme-preview-primary);
    font-size: 2rem;
    line-height: 1;
  }

  .theme-preview-panel__metric span {
    color: var(--theme-preview-text-muted);
    font-size: 0.92rem;
  }

  .theme-preview-panel__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .theme-preview-panel__card {
    min-width: 0;
  }

  .theme-preview-panel__card :deep(.sd-card) {
    color: var(--theme-preview-text);
    background: color-mix(in srgb, var(--theme-preview-surface) 94%, transparent);
    border-color: color-mix(in srgb, var(--theme-preview-border) 72%, transparent);
  }

  .theme-preview-panel.is-compact {
    gap: 0.75rem;
    padding: 0.95rem;
  }

  .theme-preview-panel.is-cyberpunk {
    box-shadow: 0 18px 40px color-mix(in srgb, var(--theme-preview-primary) 16%, transparent);
  }

  @media (width <=900px) {
    .theme-preview-panel__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
