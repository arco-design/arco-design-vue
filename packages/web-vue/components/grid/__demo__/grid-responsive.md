```yaml
title:
  zh-CN: 响应式的 Grid 布局
  en-US: Responsive Grid Layout
```

## zh-CN

Grid 组件的响应式配置格式为 `{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }`。

---

## en-US

The responsive configuration format of the Grid component is `{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }`.

---

```vue
<template>
  <a-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }" :colGap="12" :rowGap="16" class="grid-demo-grid">
    <a-grid-item class="demo-item">item</a-grid-item>
    <a-grid-item class="demo-item">item</a-grid-item>
    <a-grid-item class="demo-item">item</a-grid-item>
    <a-grid-item class="demo-item">item</a-grid-item>
    <a-grid-item class="demo-item">item</a-grid-item>
    <a-grid-item class="demo-item">item</a-grid-item>
    <a-grid-item class="demo-item" :span="{ xl: 4, xxl: 6 }" suffix>
      suffix
    </a-grid-item>
  </a-grid>
</template>

<style scoped>
.grid-demo-grid .demo-item,
.grid-demo-grid .demo-suffix {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo-grid .demo-item:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo-grid .demo-item:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```
