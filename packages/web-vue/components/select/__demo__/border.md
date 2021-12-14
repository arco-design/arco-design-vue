```yaml
title:
  zh-CN: 无边框模式
  en-US: Borderless
```

## zh-CN

$END$

---

## en-US

$END$

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-select :style="{width:'100%'}" placeholder="Please select ..." :bordered="false">
      <a-option>Beijing</a-option>
      <a-option>Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option disabled>Disabled</a-option>
    </a-select>
    <a-select :default-value="['Beijing','Shanghai']" :style="{width:'360px'}" placeholder="Please select ..." multiple :bordered="false">
      <a-option>Beijing</a-option>
      <a-option :tag-props="{color:'red'}">Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option disabled>Disabled</a-option>
      <a-option>Shenzhen</a-option>
      <a-option>Wuhan</a-option>
    </a-select>
  </a-space>
</template>
```
