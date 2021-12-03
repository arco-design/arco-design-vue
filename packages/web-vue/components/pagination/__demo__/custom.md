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
      ~{{page}}~
    </template>
    <template #page-item-step="{ type }">
      <icon-caret-left v-if="type==='previous'" />
      <icon-caret-right v-else />
    </template>
    <template #page-item-ellipsis>
      <icon-question />
    </template>
  </a-pagination>
</template>
```
