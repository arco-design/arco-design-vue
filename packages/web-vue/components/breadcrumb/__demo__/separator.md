```yaml
title:
  zh-CN: 自定义分隔符
  en-US: Custom separator
```

## zh-CN

通过 `separator` 插槽自定义分隔符。

---

## en-US

Use `separator` slot to customize the separator.

---

```vue
<template>
  <a-breadcrumb>
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>Channel</a-breadcrumb-item>
    <a-breadcrumb-item>News</a-breadcrumb-item>
    <template #separator>
      <icon-right />
    </template>
  </a-breadcrumb>
</template>
```
