```yaml
title:
  zh-CN: 栅格偏移
  en-US: Offset of Col
```

## zh-CN

指定 `offset` 可以对栅格进行平移操作。

---

## en-US

Specify `offset` to translate the grid.

---

```vue
<template>
  <div>
    <a-row class="grid-demo" style="marginBottom: 16px; backgroundColor: var(--color-fill-2);">
      <a-col :span="8">col - 8</a-col>
      <a-col :span="8" :offset="8">
        col - 8 | offset - 8
      </a-col>
    </a-row>
    <a-row class="grid-demo" style="marginBottom: 16px; backgroundColor: var(--color-fill-2);">
      <a-col :span="6" :offset="8">
        col - 6 | offset - 8
      </a-col>
      <a-col :span="6" :offset="4">
        col - 6 | offset - 4
      </a-col>
    </a-row>
    <a-row class="grid-demo" style="backgroundColor: var(--color-fill-2)">
      <a-col :span="12" :offset="8">
        col - 12 | offset - 8
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
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
