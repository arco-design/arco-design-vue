```yaml
title:
  zh-CN: 独立使用
  en-US: Standalone
```

## zh-CN

`default slot` 为空时，将会独立展示徽标。

---

## en-US

Used in standalone when `default slot` is empty.

---

```vue
<template>
  <a-space :size="40">
    <a-badge :count="2" />
    <a-badge
      :count="2"
      :dotStyle="{ background: '#E5E6EB', color: '#86909C' }"
    />
    <a-badge :count="16" />
    <a-badge :count="1000" :max-count="99" />
  </a-space>
</template>
```
