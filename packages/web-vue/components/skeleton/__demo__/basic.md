```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

骨架屏组件提供 `<a-skeleton-line>` 和 `<a-skeleton-shape>` 两种组件，用户可根据需要组合使用。

---

## en-US

The skeleton screen component provides two components: `<a-skeleton-line>` and `<a-skeleton-shape>`, users can combine them according to their needs.

---

```vue
<template>
  <a-skeleton>
    <a-space direction="vertical" :style="{width:'100%'}" size="large">
      <a-skeleton-line :rows="3" />
      <a-skeleton-shape />
    </a-space>
  </a-skeleton>
</template>
```
