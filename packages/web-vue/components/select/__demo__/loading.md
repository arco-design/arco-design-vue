```yaml
title:
  zh-CN: 加载中
  en-US: Loading
```

## zh-CN

选择框和下拉菜单显示加载中状态。

---

## en-US

Select boxes and drop-down menus show loading status.

---

```vue
<template>
  <a-select :style="{width:'320px'}" placeholder="Please select ..." loading>
    <a-option>Beijing</a-option>
    <a-option>Shanghai</a-option>
    <a-option>Guangzhou</a-option>
    <a-option disabled>Disabled</a-option>
  </a-select>
</template>
```
