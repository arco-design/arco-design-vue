```yaml
title:
  zh-CN: 横向 Anchor
  en-US: Horizontal Anchor
```

## zh-CN

横向 Anchor，不支持嵌套。

---

## en-US

Horizontal Anchor, does not support nesting.

---

```vue
<template>
  <div>
    <a-typography-paragraph>Default</a-typography-paragraph>
    <a-anchor :affix="false" direction="horizontal">
      <a-anchor-link href="#basic">Basic</a-anchor-link>
      <a-anchor-link href="#static">Static</a-anchor-link>
      <a-anchor-link href="#line-less">LineLess Mode</a-anchor-link>
      <a-anchor-link href="#affix">Affix</a-anchor-link>
      <a-anchor-link href="#boundary">Scroll Boundary</a-anchor-link>
      <a-anchor-link href="#hash">Hash mode</a-anchor-link>
    </a-anchor>

    <a-typography-paragraph :style="{ marginTop: '32px' }">
      LineLess mode
    </a-typography-paragraph>
    <a-anchor :affix="false" direction="horizontal" line-less>
      <a-anchor-link href="#basic">Basic</a-anchor-link>
      <a-anchor-link href="#static">Static</a-anchor-link>
      <a-anchor-link href="#line-less">LineLess Mode</a-anchor-link>
      <a-anchor-link href="#affix">Affix</a-anchor-link>
      <a-anchor-link href="#boundary">Scroll Boundary</a-anchor-link>
      <a-anchor-link href="#hash">Hash mode</a-anchor-link>
    </a-anchor>
  </div>
</template>
```
