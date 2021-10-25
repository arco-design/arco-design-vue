```yaml
title:
  zh-CN: 是否改变hash
  en-US: Hash
```

## zh-CN

可以设置点击锚点而不改变浏览器历史。

---

## en-US

You can set the click anchor without changing the browser history.

---

```vue
<template>
  <a-anchor :change-hash="false">
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
