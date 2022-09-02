```yaml
title:
  zh-CN: 自定义分隔符
  en-US: Custom separator
```

## zh-CN

通过 `separator` 属性或插槽自定义分隔符。面包屑子项也可通过 `separator` 属性或插槽自定义分隔符，且优先级高于父项。

---

## en-US

Customize the delimiter through the `separator` attribute or slot. Bread crumb child items can also be customized through the `separator` attribute or slot delimiter, and the priority is higher than the parent item.

---

```vue
<template>
  <a-space direction="vertical">
    <a-breadcrumb>
      <template #separator>
        <icon-right />
      </template>
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>Channel</a-breadcrumb-item>
      <a-breadcrumb-item>News</a-breadcrumb-item>
    </a-breadcrumb>
    <a-breadcrumb separator="~">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>Channel</a-breadcrumb-item>
      <a-breadcrumb-item>News</a-breadcrumb-item>
    </a-breadcrumb>
    <a-breadcrumb>
      <template #separator>
        <icon-right />
      </template>
      <a-breadcrumb-item separator="->">Home</a-breadcrumb-item>
      <a-breadcrumb-item>Channel</a-breadcrumb-item>
      <a-breadcrumb-item>News</a-breadcrumb-item>
    </a-breadcrumb>
  </a-space>
</template>
```
