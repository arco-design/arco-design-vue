```yaml
title:
  zh-CN: 自定义复选框
  en-US: Custom CheckBox Display
```

## zh-CN

使用 #checkbox 插槽自定义复选框的展示

---

## en-US

Use the #checkbox slot to customize the display of checkboxes

---

```vue
<template>
  <a-checkbox-group>
    <a-checkbox value="1">
      <template #checkbox="{ checked }">
        <a-tag :checked="checked" checkable >This is a tag checkbox 1</a-tag>
      </template>
    </a-checkbox>
    <a-checkbox value="2">
      <template #checkbox="{ checked }">
        <a-tag :checked="checked" checkable >This is a tag checkbox 2</a-tag>
      </template>
    </a-checkbox>
    <a-checkbox value="3">
      <template #checkbox="{ checked }">
        <a-tag :checked="checked" checkable >This is a tag checkbox 3</a-tag>
      </template>
    </a-checkbox>
  </a-checkbox-group>
</template>
```
