```yaml
title:
  zh-CN: 自定义尺寸
  en-US: Custom Size
```

## zh-CN

通过指定样式来自定义面包屑的尺寸。

---

## en-US

Customize the breadcrumb size by specifying the style.

---

```vue
<template>
  <a-space direction="vertical">
    <a-breadcrumb>
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>Channel</a-breadcrumb-item>
      <a-breadcrumb-item>News</a-breadcrumb-item>
    </a-breadcrumb>
    <a-breadcrumb :style="{fontSize: `12px`}">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>Channel</a-breadcrumb-item>
      <a-breadcrumb-item>News</a-breadcrumb-item>
    </a-breadcrumb>
  </a-space>
</template>
```
