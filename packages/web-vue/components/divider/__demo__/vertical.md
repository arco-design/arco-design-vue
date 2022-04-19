```yaml
title:
  zh-CN: 竖直分割线
  en-US: Vertical Divider
```

## zh-CN

指定 `direction` 为 `vertical` 即可使用竖直分割线。竖直分割线不能带文字。

---

## en-US

Specify the `direction` as `vertical` to use the vertical Divider which cannot contain text.

---

```vue
<template>
  <div class="divider-demo">
    <span>Item 1</span>
    <a-divider direction="vertical" />
    <span>Item 2</span>
    <a-divider direction="vertical" />
    <span>Item 3</span>
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
