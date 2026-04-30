<template>
  <div class="theme-mode-demo">
    <sd-space align="center" wrap>
      <sd-radio-group type="button" v-model="themeMode" :options="themeModeOptions" />
      <sd-tag color="blue">局部主题容器：{{ themeMode }}</sd-tag>
    </sd-space>

    <sd-config-provider :theme="runtimePayload.theme" :theme-mode="runtimePayload.mode">
      <div class="theme-mode-demo__panel">
        <sd-space direction="vertical" fill>
          <sd-alert type="success">
            <template #title>Scoped ThemeProvider</template>
            这个区域只受当前 ConfigProvider 的局部主题影响，不依赖文档站 body 的主题。
          </sd-alert>

          <sd-space wrap>
            <sd-button type="primary">Primary</sd-button>
            <sd-button status="success">Success</sd-button>
            <sd-button type="secondary">Secondary</sd-button>
          </sd-space>

          <sd-input placeholder="检查 text/fill/primary 相关 token" allow-clear />
        </sd-space>
      </div>
    </sd-config-provider>
  </div>
</template>

<script lang="ts">
  import { computed, ref } from 'vue';

  export default {
    setup() {
      const themeMode = ref<'light' | 'dark'>('dark');
      const themeModeOptions = [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ];

      const theme = computed(() => {
        return {
          tokens: {},
        };
      });

      const runtimePayload = computed(() => {
        return {
          mode: themeMode.value,
          theme: theme.value,
        };
      });

      return {
        runtimePayload,
        themeMode,
        themeModeOptions,
      };
    },
  };
</script>

<style scoped>
  .theme-mode-demo {
    display: grid;
    gap: 12px;
  }

  .theme-mode-demo__panel {
    padding: 16px;
    border: 1px solid var(--color-border-2);
    border-radius: 12px;
    background: var(--color-bg-2);
  }
</style>
