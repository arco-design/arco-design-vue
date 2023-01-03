```yaml
title:
  zh-CN: 透明底色
  en-US: Transparent
```

## zh-CN

默认是没有底色的，如果有需要可以通过`style`或类名设置不同底色。

---

## en-US

The default is no background color, if necessary, you can set a different background color by `style` or class name.

---

```vue
<template>
  <div :style="{
    backgroundImage: 'radial-gradient(var(--color-fill-3) 1px, rgba(0, 0, 0, 0) 1px)',
    backgroundSize: '16px 16px',
    padding: '28px',
  }">
    <a-page-header title="ArcoDesign" subtitle="ArcoDesign Vue 2.0">
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
  </div>
</template>
```
