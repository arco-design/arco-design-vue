```yaml
title:
  zh-CN: 带有文字的分割线
  en-US: With Text
```

## zh-CN

通过 `orientation` 为分割线添加描述文字。

---

## en-US

Use `orientation` to add descriptive text to Divider.

---

```vue
<template>
  <div class="divider-demo">
    <p>A design is a plan or specification for the construction of an object.</p>
    <a-divider orientation="left">Text</a-divider>
    <p>A design is a plan or specification for the construction of an object.</p>
    <a-divider orientation="center">Text</a-divider>
    <p>A design is a plan or specification for the construction of an object.</p>
    <a-divider orientation="right">Text</a-divider>
    <a-divider :margin="10"><icon-star /></a-divider>
  </div>
</template>

<style scoped>
.divider-demo {
  box-sizing: border-box;
  width: 560px;
  padding: 24px;
  border: 30px solid rgb(var(--gray-2));
}
</style>
```
