```yaml
title:
  zh-CN: Flex 用法
  en-US: Flex
```

## zh-CN

通过设置 `Col` 组件的 `flex` 属性，可以任意配置 flex 布局。

---

## en-US

By setting the `flex` property of the `Col` component, you can configure the flex layout arbitrarily.
---

```vue
<template>
  <a-row class="grid-demo" style="margin-bottom: 16px;">
    <a-col flex="100px">
      <div>100px</div>
    </a-col>
    <a-col flex="auto">
      <div>auto</div>
    </a-col>
  </a-row>
  <a-row class="grid-demo" style="margin-bottom: 16px;">
    <a-col flex="100px">
      <div>100px</div>
    </a-col>
    <a-col flex="auto">
      <div>auto</div>
    </a-col>
    <a-col flex="100px">
      <div>100px</div>
    </a-col>
  </a-row>
  <a-row class="grid-demo" style="margin-bottom: 16px;">
    <a-col :flex="3">
      <div>3 / 12</div>
    </a-col>
    <a-col :flex="4">
      <div>4 / 12</div>
    </a-col>
    <a-col :flex="5">
      <div>5 / 12</div>
    </a-col>
  </a-row>
</template>

<style scoped>
.grid-demo .arco-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}

.grid-demo .arco-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}

.grid-demo .arco-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
</style>
```
