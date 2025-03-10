```yaml
title:
  zh-CN: 自定义面板
  en-US: Custom Panel
```

## zh-CN

通过插槽自由控制面板的渲染。

---

## en-US

Control the rendering of the panel freely through slots.

---

```vue
<template>
  <a-space :size="32" direction="vertical">
    <a-color-picker
      defaultValue="#12D2AC"
      showPreset
      showHistory
      hideTrigger
    >
      <template #palette="{ palette }">
          <div class="custom-header">自定义调色板</div>
          <component :is="palette" />
      </template>

      <template #controls="{ controls }">
          <div class="custom-header">自定义控制条</div>
          <component :is="controls" />
      </template>

      <template #color-section="{ colorSection }">
          <div class="custom-header">自定义颜色区域</div>
          <component :is="colorSection" />
      </template>

      <template #history-title>
        <div class="custom-title">
          <icon-history /> 最近使用
        </div>
      </template>

      <template #preset-title>
        <div class="custom-title">
          <icon-palette /> 预设颜色
        </div>
      </template>
    </a-color-picker>

    <a-color-picker
      defaultValue="#12D2AC"
      showPreset
      :showPalette="false"
      :showControls="false"
    >
      <template #preset-title>
      </template>
    </a-color-picker>
  </a-space>
</template>

<style scoped>
.custom-header {
  margin-bottom: 8px;
  color: var(--color-text-1);
  font-weight: 500;
}

.custom-title {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-text-2);
}
</style>
```
