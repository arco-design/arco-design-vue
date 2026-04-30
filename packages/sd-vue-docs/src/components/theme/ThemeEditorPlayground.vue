<script setup lang="ts">
  import { computed, onBeforeUnmount, ref, watch } from 'vue';

  import {
    buildThemeRuntimePayload,
    cloneThemeConfig,
    getThemePreset,
    getThemeToken,
    parseThemeText,
    serializeThemeConfig,
    setThemeToken,
    themeFieldGroups,
    themePresets,
    type ThemeConfig,
  } from './theme-playground';
  import ThemePreviewPanel from './ThemePreviewPanel.vue';

  const activePresetKey = ref(themePresets[0].key);
  const draftTheme = ref<ThemeConfig>(cloneThemeConfig(themePresets[0].theme));
  const previewTheme = ref<ThemeConfig>(cloneThemeConfig(themePresets[0].theme));
  const importError = ref('');
  const importStatus = ref('');
  const exportStatus = ref('');
  const fileInputRef = ref<HTMLInputElement | null>(null);

  let throttleHandle: ReturnType<typeof setTimeout> | null = null;

  const activePreset = computed(() => getThemePreset(activePresetKey.value));
  const serializedTheme = computed(() => serializeThemeConfig(draftTheme.value));
  const compatibilityNote = computed(() => {
    return '字号与间距 token 已开放编辑，但当前运行时预览仍优先体现颜色和圆角的变化。';
  });
  const previewRuntimePayload = computed(() => {
    return buildThemeRuntimePayload(previewTheme.value, activePreset.value.mode);
  });

  watch(
    draftTheme,
    (themeValue) => {
      if (throttleHandle) {
        clearTimeout(throttleHandle);
      }

      throttleHandle = setTimeout(() => {
        previewTheme.value = cloneThemeConfig(themeValue);
      }, 120);
    },
    { deep: true },
  );

  onBeforeUnmount(() => {
    if (throttleHandle) {
      clearTimeout(throttleHandle);
    }
  });

  function applyPreset(presetKey: string) {
    activePresetKey.value = presetKey;
    const preset = getThemePreset(presetKey);
    draftTheme.value = cloneThemeConfig(preset.theme);
    previewTheme.value = cloneThemeConfig(preset.theme);
    importError.value = '';
    importStatus.value = '';
    exportStatus.value = '';
  }

  function updateToken(tokenKey: string, value: string) {
    draftTheme.value = setThemeToken(draftTheme.value, tokenKey, value);
    importError.value = '';
    exportStatus.value = '';
  }

  function openFilePicker() {
    fileInputRef.value?.click();
  }

  function importThemeText(rawText: string) {
    const result = parseThemeText(rawText);
    if (!result.valid || !result.data) {
      importError.value = result.errors.join(' ');
      importStatus.value = '';
      return;
    }

    draftTheme.value = cloneThemeConfig(result.data);
    previewTheme.value = cloneThemeConfig(result.data);
    importError.value = '';
    importStatus.value = '主题 JSON 已导入，预览已更新。';
  }

  async function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (!file) {
      return;
    }

    const fileText = await file.text();
    importThemeText(fileText);
    input.value = '';
  }

  function downloadTheme() {
    const blob = new Blob([serializedTheme.value], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${activePreset.value.key}-theme.json`;
    link.click();
    URL.revokeObjectURL(blobUrl);
    exportStatus.value = '已生成当前主题 JSON 下载文件。';
  }
</script>

<template>
  <div class="theme-editor-playground">
    <section class="theme-editor-playground__presets">
      <div class="theme-editor-playground__heading">
        <div>
          <p class="theme-editor-playground__eyebrow">Theme Presets</p>
          <h2>预设主题与可编辑 token</h2>
          <p>
            主题对象会直接传给 ConfigProvider。编辑时先更新草稿态，再以 120ms 节流推送到预览容器。
          </p>
        </div>

        <div class="theme-editor-playground__actions">
          <input
            ref="fileInputRef"
            type="file"
            accept="application/json"
            hidden
            @change="handleFileChange"
          />
          <sd-button @click="openFilePicker">上传 JSON</sd-button>
          <sd-button type="primary" @click="downloadTheme">下载 JSON</sd-button>
        </div>
      </div>

      <div class="theme-editor-playground__preset-grid">
        <button
          v-for="preset in themePresets"
          :key="preset.key"
          type="button"
          class="theme-editor-playground__preset"
          :class="{ 'is-active': preset.key === activePresetKey }"
          @click="applyPreset(preset.key)"
        >
          <strong>{{ preset.name }}</strong>
          <span>{{ preset.summary }}</span>
          <small>{{ preset.description }}</small>
        </button>
      </div>
    </section>

    <div class="theme-editor-playground__layout">
      <section class="theme-editor-playground__controls">
        <article
          v-for="group in themeFieldGroups"
          :key="group.key"
          class="theme-editor-playground__group"
        >
          <header>
            <h3>{{ group.title }}</h3>
            <p>{{ group.description }}</p>
          </header>

          <div class="theme-editor-playground__fields">
            <label
              v-for="field in group.fields"
              :key="field.key"
              class="theme-editor-playground__field"
            >
              <span>{{ field.label }}</span>
              <sd-color-picker
                v-if="field.type === 'color'"
                :model-value="String(getThemeToken(draftTheme, field.token) || '#000000')"
                show-text
                @update:model-value="updateToken(field.token, String($event))"
              />
              <sd-input
                v-else
                :model-value="String(getThemeToken(draftTheme, field.token) || '')"
                :placeholder="field.placeholder"
                @update:model-value="updateToken(field.token, String($event))"
              />
            </label>
          </div>
        </article>

        <sd-alert type="warning">{{ compatibilityNote }}</sd-alert>

        <sd-alert v-if="importStatus" type="success">{{ importStatus }}</sd-alert>
        <sd-alert v-if="exportStatus" type="success">{{ exportStatus }}</sd-alert>
        <sd-alert v-if="importError" type="error">{{ importError }}</sd-alert>
      </section>

      <section class="theme-editor-playground__preview">
        <ThemePreviewPanel
          :preset="activePreset"
          :theme="previewRuntimePayload.theme"
          :theme-mode="previewRuntimePayload.mode"
        />

        <sd-card title="当前 JSON" class="theme-editor-playground__json-card">
          <pre>{{ serializedTheme }}</pre>
        </sd-card>
      </section>
    </div>
  </div>
</template>

<style scoped>
  .theme-editor-playground {
    display: grid;
    gap: 1.25rem;
  }

  .theme-editor-playground__presets,
  .theme-editor-playground__controls,
  .theme-editor-playground__preview {
    padding: 1.1rem;
    background: color-mix(in srgb, var(--sl-color-bg) 88%, transparent);
    border: 1px solid color-mix(in srgb, var(--sl-color-accent) 14%, transparent);
    border-radius: 1.5rem;
  }

  .theme-editor-playground__heading {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: start;
    justify-content: space-between;
  }

  .theme-editor-playground__eyebrow {
    margin: 0 0 0.4rem;
    color: var(--sl-color-accent-high);
    font-weight: 700;
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .theme-editor-playground__heading h2 {
    margin: 0;
  }

  .theme-editor-playground__heading p {
    margin: 0.45rem 0 0;
    color: var(--sl-text-3);
    line-height: 1.7;
  }

  .theme-editor-playground__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .theme-editor-playground__preset-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 0.9rem;
    margin-top: 1rem;
  }

  .theme-editor-playground__preset {
    display: grid;
    gap: 0.35rem;
    padding: 1rem;
    color: inherit;
    text-align: left;
    background: color-mix(in srgb, var(--sl-color-bg) 86%, transparent);
    border: 1px solid color-mix(in srgb, var(--sl-color-accent) 10%, transparent);
    border-radius: 1rem;
    cursor: pointer;
    transition:
      transform 180ms ease,
      border-color 180ms ease,
      background 180ms ease;
  }

  .theme-editor-playground__preset strong {
    font-size: 1rem;
  }

  .theme-editor-playground__preset span,
  .theme-editor-playground__preset small {
    color: var(--sl-text-3);
    line-height: 1.6;
  }

  .theme-editor-playground__preset.is-active,
  .theme-editor-playground__preset:hover {
    background: color-mix(in srgb, var(--sl-color-accent-low) 56%, transparent);
    border-color: color-mix(in srgb, var(--sl-color-accent) 32%, transparent);
    transform: translateY(-1px);
  }

  .theme-editor-playground__layout {
    display: grid;
    grid-template-columns: minmax(18rem, 22rem) minmax(0, 1fr);
    gap: 1rem;
  }

  .theme-editor-playground__controls {
    display: grid;
    gap: 1rem;
    align-content: start;
  }

  .theme-editor-playground__group {
    display: grid;
    gap: 0.85rem;
  }

  .theme-editor-playground__group h3 {
    margin: 0;
    font-size: 1rem;
  }

  .theme-editor-playground__group p {
    margin: 0.35rem 0 0;
    color: var(--sl-text-3);
    font-size: 0.92rem;
    line-height: 1.6;
  }

  .theme-editor-playground__fields {
    display: grid;
    gap: 0.85rem;
  }

  .theme-editor-playground__field {
    display: grid;
    gap: 0.45rem;
  }

  .theme-editor-playground__field > span {
    font-weight: 600;
    font-size: 0.92rem;
  }

  .theme-editor-playground__preview {
    display: grid;
    gap: 1rem;
  }

  .theme-editor-playground__json-card :deep(.sd-card-body) {
    overflow: auto;
  }

  .theme-editor-playground__json-card pre {
    margin: 0;
    font-size: 0.83rem;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
  }

  @media (width <= 1100px) {
    .theme-editor-playground__preset-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .theme-editor-playground__layout {
      grid-template-columns: 1fr;
    }
  }

  @media (width <= 640px) {
    .theme-editor-playground__preset-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
