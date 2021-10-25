```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

锚点的基础用法

---

## en-US

Basic usage of anchors

---

```vue
<template>
  <a-anchor>
    <a-anchor-link href="#basic">Basic</a-anchor-link>
    <a-anchor-link href="#line-less">LineLess Mode</a-anchor-link>
    <a-anchor-link href="#affix">
      Affix
      <template #sublist>
        <a-anchor-link href="#boundary">Scroll Boundary</a-anchor-link>
        <a-anchor-link href="#hash">Hash mode</a-anchor-link>
      </template>
    </a-anchor-link>
  </a-anchor>
</template>
```
