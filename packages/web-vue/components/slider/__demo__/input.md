```yaml
title:
  zh-CN: 显示输入框
  en-US: Show Input
```

## zh-CN

当设置 `show-input` 时，将显示输入框。

---

## en-US

When `show-input` is set, the input will be displayed.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-slider :default-value="10" :style="{ width: '300px' }" show-input />
    <a-slider :default-value="[10,20]" :style="{ width: '380px' }" range show-input />
  </a-space>
</template>
```
