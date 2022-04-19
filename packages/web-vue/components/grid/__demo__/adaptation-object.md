```yaml
title:
  zh-CN: 其他属性的响应式
  en-US: Advanced Responsive Layout
```

## zh-CN

`span`, `offset`, `order` 属性可以内嵌到 `xs`, `sm`, `md`, `lg`, `xl`, `xxl` 对象中使用。
比如 `:xs="8"` 相当于 `:xs="{ span: 8 }"`。

---

## en-US

The `span`, `offset`, and `order` properties can be embedded in `xs`, `sm`, `md`, `lg`, `xl`, `xxl` objects.
For example, `:xs="8"` is equivalent to `:xs="{ span: 8 }"`

---

```vue
<template>
  <div>
    <a-row class="grid-demo">
      <a-col :xs="{span: 5, offset: 1}" :lg="{span: 6, offset: 2}">
        Col
      </a-col>
      <a-col :xs="{span: 11, offset: 1}" :lg="{span: 6, offset: 2}">
        Col
      </a-col>
      <a-col :xs="{span: 5, offset: 1}" :lg="{span: 6, offset: 2}">
        Col
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
