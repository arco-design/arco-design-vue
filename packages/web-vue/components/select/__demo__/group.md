```yaml
title:
  zh-CN: 分组
  en-US: Group
```

## zh-CN

使用 `optgroup` 组件添加分组选项。

---

## en-US

Use the `optgroup` component to add grouping options.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-select :style="{width:'320px'}" placeholder="Please select ...">
      <a-optgroup label="Group-1">
        <a-option>Beijing</a-option>
        <a-option>Shanghai</a-option>
      </a-optgroup>
      <a-optgroup label="Group-2">
        <a-option>Guangzhou</a-option>
        <a-option disabled>Disabled</a-option>
        <a-option>Shenzhen</a-option>
      </a-optgroup>
      <a-optgroup label="Group-3">
        <a-option>Chengdu</a-option>
        <a-option>Wuhan</a-option>
      </a-optgroup>
    </a-select>
    <a-select :style="{width:'320px'}" placeholder="Please select ..." multiple>
      <a-optgroup label="Group-1">
        <a-option>Beijing</a-option>
        <a-option>Shanghai</a-option>
      </a-optgroup>
      <a-optgroup label="Group-2">
        <a-option>Guangzhou</a-option>
        <a-option disabled>Disabled</a-option>
        <a-option>Shenzhen</a-option>
      </a-optgroup>
      <a-optgroup label="Group-3">
        <a-option>Chengdu</a-option>
        <a-option>Wuhan</a-option>
      </a-optgroup>
    </a-select>
  </a-space>
</template>
```
