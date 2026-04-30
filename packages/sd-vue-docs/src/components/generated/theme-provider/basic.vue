<template>
  <div class="theme-provider-demo">
    <sd-space align="center" wrap>
      <sd-radio-group type="button" v-model="themeMode" :options="themeModeOptions" />
      <sd-tag color="blue">独立 ThemeProvider：{{ themeMode }}</sd-tag>
    </sd-space>

    <sd-theme-provider :theme-mode="themeMode" :theme="theme">
      <div class="theme-provider-demo__panel">
        <sd-space direction="vertical" fill>
          <sd-alert type="success">
            <template #title>Standalone ThemeProvider</template>
            该区域仅受 ThemeProvider 子树影响，不依赖 ConfigProvider。
          </sd-alert>

          <sd-space wrap>
            <sd-button type="primary">Primary</sd-button>
            <sd-button status="success">Success</sd-button>
            <sd-button type="secondary">Secondary</sd-button>
          </sd-space>

          <sd-input placeholder="检查局部主题下组件可读性" allow-clear />
        </sd-space>
      </div>
    </sd-theme-provider>
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
          tokens: {
            primary6: themeMode.value === 'dark' ? '151,188,255' : '20,118,255',
            colorBg2: themeMode.value === 'dark' ? '#1a202c' : '#ffffff',
            colorBg5: themeMode.value === 'dark' ? '#2d3748' : '#ffffff',
            colorNeutral10: themeMode.value === 'dark' ? '#f8fafc' : '#0f172a',
            colorNeutral8: themeMode.value === 'dark' ? '#e2e8f0' : '#334155',
            colorNeutral6: themeMode.value === 'dark' ? '#cbd5e1' : '#7a8699',
            colorNeutral3: themeMode.value === 'dark' ? '#475569' : '#d9e2f0',
          },
        };
      });

      return {
        theme,
        themeMode,
        themeModeOptions,
      };
    },
  };
</script>

<style scoped>
  .theme-provider-demo {
    display: grid;
    gap: 12px;
  }

  .theme-provider-demo__panel {
    padding: 16px;
    border: 1px solid var(--color-border-2);
    border-radius: 12px;
    background: var(--color-bg-2);
  }
</style>
