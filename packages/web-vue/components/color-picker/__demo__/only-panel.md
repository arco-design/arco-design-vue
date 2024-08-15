```yaml
title:
  zh-CN: 只使用面板
  en-US: Only Panel
```

## zh-CN

只用颜色选择面板。

---

## en-US

Only use the color selection panel.

---

```vue
<template>
  <a-space :size="32">
    <a-color-picker defaultValue="#165DFF" hideTrigger showHistory showPreset/>
    <a-color-picker defaultValue="#12D2AC" disabled hideTrigger showPreset/>
  </a-space>
</template>
```
