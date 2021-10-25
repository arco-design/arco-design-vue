```yaml
title:
  zh-CN: 单选框组
  en-US: Radio Group
```

## zh-CN

通过 `<a-radio-group>` 组件展示单选框组。

---

## en-US

The radio group is displayed through the `<a-radio-group>` component.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-radio-group>
      <a-radio value="A">A</a-radio>
      <a-radio value="B">B</a-radio>
      <a-radio value="C">C</a-radio>
      <a-radio value="D">D</a-radio>
    </a-radio-group>
    <a-radio-group>
      <a-radio value="A">A</a-radio>
      <a-radio value="B">B</a-radio>
      <a-radio value="C">C</a-radio>
      <a-radio value="D" disabled>D</a-radio>
    </a-radio-group>
  </a-space>
</template>
```
