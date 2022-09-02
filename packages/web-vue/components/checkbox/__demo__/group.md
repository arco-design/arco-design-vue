```yaml
title:
  zh-CN: 复选框组
  en-US: Checkbox Group
```

## zh-CN

通过 `<a-checkbox-group>` 组件展示复选框组。设置 `direction="vertical"` 可以展示竖向的复选框组。

---

## en-US

Display the checkbox group through the `<a-checkbox-group>` component. Set `direction="vertical"` to show the vertical checkbox group.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-checkbox-group :default-value="['1']">
      <a-checkbox value="1">Option 1</a-checkbox>
      <a-checkbox value="2">Option 2</a-checkbox>
      <a-checkbox value="3">Option 3</a-checkbox>
    </a-checkbox-group>
    <a-checkbox-group direction="vertical">
      <a-checkbox value="1">Option 1</a-checkbox>
      <a-checkbox value="2">Option 2</a-checkbox>
      <a-checkbox value="3">Option 3</a-checkbox>
    </a-checkbox-group>
  </a-space>
</template>
```
