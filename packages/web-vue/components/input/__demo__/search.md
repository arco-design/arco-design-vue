```yaml
title:
  zh-CN: 搜索框
  en-US: Search Input
```

## zh-CN

带有搜索按钮的输入框，用于内容检索。

---

## en-US

An input box with a search button for content retrieval.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input-search :style="{width:'320px'}" placeholder="Please enter something"/>
    <a-input-search :style="{width:'320px'}" placeholder="Please enter something" search-button/>
  </a-space>
</template>
```
