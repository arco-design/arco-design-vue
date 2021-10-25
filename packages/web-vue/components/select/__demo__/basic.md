```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

选择器的基本用法。

---

## en-US

Basic usage of selectors.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-select :style="{width:'100%'}" placeholder="Please select ...">
      <a-option>Beijing</a-option>
      <a-option>Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option disabled>Disabled</a-option>
    </a-select>
    <a-select defaultValue="Beijing" :style="{width:'320px'}" placeholder="Please select ..."  disabled>
      <a-option>Beijing</a-option>
      <a-option>Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option disabled>Disabled</a-option>
    </a-select>
  </a-space>
</template>
```
