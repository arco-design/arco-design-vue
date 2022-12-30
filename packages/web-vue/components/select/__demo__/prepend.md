```yaml
title:
  zh-CN: 前置标签
  en-US: Prepend
```

## zh-CN

通过 `#prepend` 插槽可以自定义选择框前置标签

---

## en-US

The display content of the select box can be customized through the `#prepend` slot.

---

```vue
<template>
  <a-select
    default-value="Beijing"
    :style="{ width: '320px' }"
    placeholder="Please select ..."
  >
    <template #prepend>
      <div>Select City</div>
    </template>
    <a-option>Beijing</a-option>
    <a-option>Shanghai</a-option>
    <a-option>Guangzhou</a-option>
    <a-option disabled>Disabled</a-option>
  </a-select>
</template>
```
