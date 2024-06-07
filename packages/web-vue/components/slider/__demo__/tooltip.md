```yaml
title:
  zh-CN: 自定义提示
  en-US: Custom Tooltip
```

## zh-CN

通过设置 `format-tooltip` 可以自定义提示文字。

---

## en-US

You can customize the prompt text by setting `format-tooltip`.

---

```vue
<template>
  <a-slider :min="0" :max="50" :style="{ width: '200px' }" :format-tooltip="formatter" />
</template>

<script setup>
const formatter = (value) => `${Math.round((value / 50) * 100)}%`;
</script>
```
