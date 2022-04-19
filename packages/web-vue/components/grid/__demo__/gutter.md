```yaml
title:
  zh-CN: 区块间隔
  en-US: Interval of Grid
```

## zh-CN

通过在 `Row` 上指定 `gutter` 可以增加栅格的区域间隔。

---

## en-US

By specifying `gutter` on `Row`, the area interval of the grid can be increased

---

```vue
<template>
  <div>
    <p>Horizontal</p>
    <a-row class="grid-demo" :gutter="24">
      <a-col :span="12">
        <div>col - 12</div>
      </a-col>
      <a-col :span="12">
        <div>col - 12</div>
      </a-col>
    </a-row>
    <p>Responsive</p>
    <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
      <a-col :span="6">
        <div>col - 6</div>
      </a-col>
      <a-col :span="6">
        <div>col - 6</div>
      </a-col>
      <a-col :span="6">
        <div>col - 6</div>
      </a-col>
      <a-col :span="6">
        <div>col - 6</div>
      </a-col>
    </a-row>
    <p>Horizontal and Vertical</p>
    <a-row class="grid-demo" :gutter="[24, 12]">
      <a-col :span="6">
        <div>col - 6</div>
      </a-col>
      <a-col :span="6">
        <div>col - 6</div>
      </a-col>
      <a-col :span="6">
        <div>col - 6</div>
      </a-col>
      <a-col :span="6">
        <div>col - 6</div>
      </a-col>
      <a-col :span="6">
        <div>col - 6</div>
      </a-col>
      <a-col :span="6">
        <div>col - 6</div>
      </a-col>
      <a-col :span="6">
        <div>col - 6</div>
      </a-col>
      <a-col :span="6">
        <div>col - 6</div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.grid-demo .arco-col {
  height: 48px;
  color: var(--color-white);
}
.grid-demo .arco-col > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.grid-demo .arco-col:nth-child(2n) > div {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .arco-col:nth-child(2n + 1) > div {
  background-color: var(--color-primary-light-4);
}
</style>
```
