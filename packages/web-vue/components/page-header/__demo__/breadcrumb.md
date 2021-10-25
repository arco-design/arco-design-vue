```yaml
title:
  zh-CN: 带有面包屑
  en-US: Breadcrumb
```

## zh-CN

在页头中展示面包屑。

---

## en-US

Show breadcrumbs in the header.

---

```vue
<template>
  <a-page-header title="ArcoDesign" subtitle="ArcoDesign Vue 2.0" :show-back="false">
    <template #breadcrumb>
      <a-breadcrumb>
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Channel</a-breadcrumb-item>
        <a-breadcrumb-item>News</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <template #extra>
      <a-radio-group type="button">
        <a-radio value="mini">Mini</a-radio>
        <a-radio value="small">Small</a-radio>
        <a-radio value="large">Large</a-radio>
      </a-radio-group>
    </template>
  </a-page-header>
</template>

```
