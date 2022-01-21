```yaml
title:
  zh-CN: 输入框组合
  en-US: Input group
```

## zh-CN

通过 `input-group` 可以组合使用输入框。

---

## en-US

Input boxes can be combined by `input-group`.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input-group>
      <a-input :style="{width:'160px'}" placeholder="first" />
      <a-input :style="{width:'160px'}" placeholder="second" />
    </a-input-group>
    <a-input-group>
      <a-select :options="['Option1','Option2','Option3']" :style="{width:'160px'}" placeholder="first" />
      <a-input :style="{width:'160px'}" placeholder="second" />
    </a-input-group>
  </a-space>
</template>
```
