```yaml
title:
  zh-CN: 搜索框（加载中）
  en-US: Search Input (Loading)
```

## zh-CN

通过 `loading` 属性可以让搜索框展示加载中状态。

---

## en-US

The `loading` property allows the search box to display the loading status.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input-search :style="{width:'320px'}" placeholder="Please enter something" loading />
    <a-input-search :style="{width:'320px'}" placeholder="Please enter something" search-button loading />
  </a-space>
</template>
```
