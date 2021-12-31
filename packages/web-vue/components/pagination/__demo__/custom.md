```yaml
title:
  zh-CN: 自定义分页按钮
  en-US: Custom Page Item
```

## zh-CN

可以通过插槽自定义分页按钮内容

---

## en-US

The content of the paging button can be customized through the slot

---

```vue
<template>
  <a-pagination :total="200">
    <template #page-item="{ page }">
      - {{page}} -
    </template>
    <template #page-item-step="{ type }">
      <icon-send :style="type==='previous' ? {transform:`rotate(180deg)`} : undefined" />
    </template>
    <template #page-item-ellipsis>
      <icon-sun-fill />
    </template>
  </a-pagination>
</template>
```
