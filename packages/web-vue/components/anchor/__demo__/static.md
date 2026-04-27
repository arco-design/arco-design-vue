```yaml
title:
  zh-CN: 静态位置
  en-US: Static
```

## zh-CN

设置 `affix=false` 后，锚点不会随页面滚动固定。

---

## en-US

Setting `affix=false`, the anchor will not be fixed while the page scrolls.

---

```vue
<template>
  <a-anchor :affix="false">
    <a-anchor-link href="#basic">Basic</a-anchor-link>
    <a-anchor-link href="#static">Static</a-anchor-link>
    <a-anchor-link href="#line-less">LineLess Mode</a-anchor-link>
    <a-anchor-link href="#affix">Affix</a-anchor-link>
    <a-anchor-link href="#boundary">Scroll Boundary</a-anchor-link>
    <a-anchor-link href="#hash">Hash mode</a-anchor-link>
  </a-anchor>
</template>
```
