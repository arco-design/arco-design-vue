```yaml
title:
  zh-CN: 锚点滚动偏移量
  en-US: boundary
```

## zh-CN

可以设置 `boundary` 来定制锚点滚动偏移量。

---

## en-US

You can set `boundary` to customize the anchor point scroll offset.

---

```vue
<template>
  <a-anchor boundary="center">
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
