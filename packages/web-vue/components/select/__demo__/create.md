```yaml
title:
  zh-CN: 允许创建
  en-US: To Create
```

## zh-CN

通过设置 `allow-create` ，让选择器可以创建选项中不存在的条目。

---

## en-US

By setting `allow-create`, the selector can create items that do not exist in the options.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-select :style="{width:'320px'}" placeholder="Please select ..." allow-create>
      <a-option>Beijing</a-option>
      <a-option>Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option disabled>Disabled</a-option>
      <a-option>Shenzhen</a-option>
      <a-option>Chengdu</a-option>
      <a-option>Wuhan</a-option>
    </a-select>
    <a-select :style="{width:'320px'}" placeholder="Please select ..." multiple allow-create>
      <a-option>Beijing</a-option>
      <a-option>Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option disabled>Disabled</a-option>
      <a-option>Shenzhen</a-option>
      <a-option>Chengdu</a-option>
      <a-option>Wuhan</a-option>
    </a-select>
  </a-space>
</template>
```
