```yaml
title:
  zh-CN: 自定义图标
  en-US: Step Icon
```

## zh-CN

通过指定 `plus` 和 `minus` 插槽来修改数值增减操作的图标。

---

## en-US

To Add the icons for the increment and decrement operations by specifying the `plus` and `minus` slots.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input-number :style="{width:'320px'}" placeholder="Please enter something" allow-clear>
       <template #plus>
        <icon-plus />
      </template>
      <template #minus>
        <icon-minus />
      </template>
    </a-input-number>
  </a-space>
</template>
```
