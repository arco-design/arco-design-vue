```yaml
title:
  zh-CN: 基本用法
  en-US: Basic
```

## zh-CN

展示了最基本的 24 等分应用。

---

## en-US

Demonstrated the most basic 24 equal division applications

---

```vue
<template>
  <div class="grid-demo-background">
    <a-space direction="vertical" :size="16" style="display: block;">
      <a-row class="grid-demo">
        <a-col :span="24">
          <div>24 - 100%</div>
        </a-col>
      </a-row>
      <a-row class="grid-demo">
        <a-col :span="12">
          <div>12 - 50%</div>
        </a-col>
        <a-col :span="12">
          <div>12 - 50%</div>
        </a-col>
      </a-row>
      <a-row class="grid-demo">
        <a-col :span="8">
          <div>8 - 33.33%</div>
        </a-col>
        <a-col :span="8">
          <div>8 - 33.33%</div>
        </a-col>
        <a-col :span="8">
          <div>8 - 33.33%</div>
        </a-col>
      </a-row>
      <a-row class="grid-demo">
        <a-col :span="6">
          <div>6 - 25%</div>
        </a-col>
        <a-col :span="6">
          <div>6 - 25%</div>
        </a-col>
        <a-col :span="6">
          <div>6 - 25%</div>
        </a-col>
        <a-col :span="6">
          <div>6 - 25%</div>
        </a-col>
      </a-row>
      <a-row class="grid-demo">
        <a-col :span="4">
          <div>4 - 16.66%</div>
        </a-col>
        <a-col :span="4">
          <div>4 - 16.66%</div>
        </a-col>
        <a-col :span="4">
          <div>4 - 16.66%</div>
        </a-col>
        <a-col :span="4">
          <div>4 - 16.66%</div>
        </a-col>
        <a-col :span="4">
          <div>4 - 16.66%</div>
        </a-col>
        <a-col :span="4">
          <div>4 - 16.66%</div>
        </a-col>
      </a-row>
    </a-space>
  </div>
</template>

<style scoped>
.grid-demo-background {
  background-image: linear-gradient(
    90deg,
    var(--color-fill-2) 4.16666667%,
    transparent 4.16666667%,
    transparent 8.33333333%,
    var(--color-fill-2) 8.33333333%,
    var(--color-fill-2) 12.5%,
    transparent 12.5%,
    transparent 16.66666667%,
    var(--color-fill-2) 16.66666667%,
    var(--color-fill-2) 20.83333333%,
    transparent 20.83333333%,
    transparent 25%,
    var(--color-fill-2) 25%,
    var(--color-fill-2) 29.16666667%,
    transparent 29.16666667%,
    transparent 33.33333333%,
    var(--color-fill-2) 33.33333333%,
    var(--color-fill-2) 37.5%,
    transparent 37.5%,
    transparent 41.66666667%,
    var(--color-fill-2) 41.66666667%,
    var(--color-fill-2) 45.83333333%,
    transparent 45.83333333%,
    transparent 50%,
    var(--color-fill-2) 50%,
    var(--color-fill-2) 54.16666667%,
    transparent 54.16666667%,
    transparent 58.33333333%,
    var(--color-fill-2) 58.33333333%,
    var(--color-fill-2) 62.5%,
    transparent 62.5%,
    transparent 66.66666667%,
    var(--color-fill-2) 66.66666667%,
    var(--color-fill-2) 70.83333333%,
    transparent 70.83333333%,
    transparent 75%,
    var(--color-fill-2) 75%,
    var(--color-fill-2) 79.16666667%,
    transparent 79.16666667%,
    transparent 83.33333333%,
    var(--color-fill-2) 83.33333333%,
    var(--color-fill-2) 87.5%,
    transparent 87.5%,
    transparent 91.66666667%,
    var(--color-fill-2) 91.66666667%,
    var(--color-fill-2) 95.83333333%,
    transparent 95.83333333%
  );
}
.grid-demo .arco-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .arco-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .arco-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```
