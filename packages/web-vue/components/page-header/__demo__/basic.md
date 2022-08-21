```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

基础页头，适合使用在需要简单描述的场景。默认是没有底色的。

---

## en-US

The basic page header is suitable for use in scenarios that require a simple description. The default is no background color.

---

```vue
<template>
  <div :style="{ background: 'var(--color-fill-2)', padding: '28px' }" >
    <a-page-header
      :style="{ background: 'var(--color-bg-2)' }"
      title="ArcoDesign"
      subtitle="ArcoDesign Vue 2.0"
    >
      <template #extra>
        <a-radio-group type="button" default-value="large">
          <a-radio value="mini">Mini</a-radio>
          <a-radio value="small">Small</a-radio>
          <a-radio value="large">Large</a-radio>
        </a-radio-group>
      </template>
    </a-page-header>
  </div>
</template>
```
