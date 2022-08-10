```yaml
title:
  zh-CN: 显示省略
  en-US: Show ellipsis
```

## zh-CN

通过 `max-count` 来指定面包屑的最多渲染数量，超出的部分将显示为省略号。

---

## en-US

Use `max-count` to specify the maximum number of breadcrumbs to render, and the excess will be displayed as an ellipsis.

---

```vue
<template>
  <a-space direction="vertical">
    <a-breadcrumb :max-count="3">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>Sub Home</a-breadcrumb-item>
      <a-breadcrumb-item>All Channel</a-breadcrumb-item>
      <a-breadcrumb-item>Channel</a-breadcrumb-item>
      <a-breadcrumb-item>News</a-breadcrumb-item>
      <a-breadcrumb-item>Post</a-breadcrumb-item>
    </a-breadcrumb>
    <a-breadcrumb :max-count="3">
      <template #more-icon>
        <a-tooltip content="more routes a/b/c">
          <icon-more />
        </a-tooltip>
      </template>
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>Sub Home</a-breadcrumb-item>
      <a-breadcrumb-item>All Channel</a-breadcrumb-item>
      <a-breadcrumb-item>Channel</a-breadcrumb-item>
      <a-breadcrumb-item>News</a-breadcrumb-item>
      <a-breadcrumb-item>Post</a-breadcrumb-item>
    </a-breadcrumb>
  </a-space>
</template>
```
