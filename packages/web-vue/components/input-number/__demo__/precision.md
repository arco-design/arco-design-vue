```yaml
title:
  zh-CN: 精度和步长
  en-US: Precision & Step
```

## zh-CN

通过 `precision` 来设置数字精度。当 `precision` 小于 `step` 的小数位时，精度取 `step` 的小数个数。

---

## en-US

Use `precision` to set the number precision. When `precision` is less than the decimal place of `step`, the precision is taken as the number of decimal places of `step`.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input-number :style="{width:'320px'}" placeholder="Please Enter" :default-value="3.6" :step="1.2" :precision="2" class="input-demo" />
    <a-input-number :style="{width:'320px'}" placeholder="Please Enter" :default-value="1.22" :step="1.22" :precision="1" class="input-demo" />
  </a-space>
</template>
```
