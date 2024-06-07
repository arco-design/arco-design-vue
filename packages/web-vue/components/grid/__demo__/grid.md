```yaml
title:
  zh-CN: Grid 布局
  en-US: Grid Layout
```

## zh-CN

基于 CSS 的 Grid 布局实现的布局组件，支持折叠，并且可以设置后缀节点，后缀节点会显示在一行的结尾。

---

## en-US

A layout component implemented by CSS-based Grid layout, supports folding, and can set suffix nodes, which will always be displayed at the end of a line.

---

```vue

<template>
  <div style="margin-bottom: 20px;">
    <a-typography-text>折叠：</a-typography-text>
    <a-switch :checked="collapsed" @click="collapsed = !collapsed" />
  </div>
  <a-grid :cols="3" :colGap="12" :rowGap="16" class="grid-demo-grid" :collapsed="collapsed">
    <a-grid-item class="demo-item">item</a-grid-item>
    <a-grid-item class="demo-item">item</a-grid-item>
    <a-grid-item class="demo-item">item</a-grid-item>
    <a-grid-item class="demo-item" :offset="1">item | offset - 1</a-grid-item>
    <a-grid-item class="demo-item">item</a-grid-item>
    <a-grid-item class="demo-item" :span="3">item | span - 3</a-grid-item>
    <a-grid-item class="demo-item">item</a-grid-item>
    <a-grid-item class="demo-item">item</a-grid-item>
    <a-grid-item class="demo-item" suffix #="{ overflow }">
      suffix | overflow: {{ overflow }}
    </a-grid-item>
  </a-grid>
</template>

<script setup>
import { ref } from 'vue';

const collapsed = ref(false);
</script>

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
