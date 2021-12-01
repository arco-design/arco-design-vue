```yaml
title:
  zh-CN: 四种尺寸
  en-US: Size
```

## zh-CN

设置 `size` 可以使用四种尺寸（`mini`, `small`, `default`, `large`）的数字输入框。高度分别对应`24px`、`28px`、`32px`、`36px`。

---

## en-US

Setting `size` can use four sizes (`mini`, `small`, `default`, `large`) number input box. The corresponding heights are `24px`, `28px`, `32px`, and `36px` respectively.

---
```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input-number :style="{width:'320px'}" placeholder="Please Enter" :default-value="3.6" :step="1.2" :precision="2" class="input-demo" />
    <a-input-number :style="{width:'320px'}" placeholder="Please Enter" :default-value="1.22" :step="1.22" :precision="1" class="input-demo" />
  </a-space>
</template>
```
