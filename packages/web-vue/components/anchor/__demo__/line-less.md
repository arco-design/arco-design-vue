```yaml
title:
  zh-CN: 无轴线模式
  en-US: Line Less
```

## zh-CN

设置 `line-less` 时，可以使用无左侧轴线的锚点样式。

---

## en-US

When setting `line-less`, you can use an anchor style without a left axis.

---

```vue
<template>
  <a-anchor line-less>
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
