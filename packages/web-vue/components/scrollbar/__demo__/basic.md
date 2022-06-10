```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

滚动条组件基本用法。scrollbar 的默认插槽需要唯一的子元素。

---

## en-US

Basic usage of scrollbar component.

---

```vue
<template>
  <a-scrollbar style="height:200px;overflow: auto;">
    <div style="height: 2000px;width: 2000px; background-color: var(--color-primary-light-4);">Content</div>
  </a-scrollbar>
</template>
```
