```yaml
title:
  zh-CN: 水平布局
  en-US: Horizontal Layout
```

## zh-CN

通过 `justify` 来进行水平布局。

---

## en-US

Use `justify` for horizontal layout
---

```vue
<template>
  <div>
    <p>Arrange left</p>
    <a-row class="grid-demo" justify="start">
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
    </a-row>
    <p>Arrange center</p>
    <a-row class="grid-demo" justify="center">
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
    </a-row>
    <p>Arrange right</p>
    <a-row class="grid-demo" justify="end">
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
    </a-row>
    <p>Space around</p>
    <a-row class="grid-demo" justify="space-around">
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
    </a-row>
    <p>Space between</p>
    <a-row class="grid-demo" justify="space-between">
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
      <a-col :span="4">
        <div>col - 4</div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.grid-demo {
  background-color: var(--color-fill-2);
  margin-bottom: 40px;
}
.grid-demo:last-child {
  margin-bottom: 0px;
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
