```yaml
title:
  zh-CN: 分隔符
  en-US: Split
```

## zh-CN

为相邻子元素设置分隔符。

---

## en-US

Set separators for adjacent child elements.

---

```vue
<template>
  <a-space>
    <template #split>
      <a-divider direction="vertical" />
    </template>
    <a-tag v-if="false" color='arcoblue'>Tag</a-tag>
    <a-button type="primary">Item1</a-button>
    <a-button type="primary">Item2</a-button>
    <a-switch defaultChecked />
  </a-space>
</template>
```
