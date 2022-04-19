```yaml
title:
  zh-CN: 响应式布局
  en-US: Responsive Layout
```

## zh-CN

预置六种响应尺寸, 分别为 `xs`, `sm`, `md`, `lg`, `xl`, `xxl`。

---

## en-US

Six preset response sizes, namely `xs`, `sm`, `md`, `lg`, `xl`, `xxl`

---

```vue
<template>
  <a-row class="grid-demo">
    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10" :xxl="8">
      Col
    </a-col>
    <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4" :xxl="8">
      Col
    </a-col>
    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10" :xxl="8">
      Col
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
.grid-demo .arco-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .arco-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```
