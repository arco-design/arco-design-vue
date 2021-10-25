```yaml
title:
  zh-CN: 分组选项
  en-US: Group
```

## zh-CN

通过 `<dgroup>` 组件使用分组选项。

---

## en-US

Use the grouping option through the `<dgroup>` component.

---

```vue
<template>
  <a-dropdown>
    <a-button>Click Me</a-button>
    <template #content>
      <a-dgroup title="Group 1">
        <a-doption>Option 1</a-doption>
        <a-doption>Option 2</a-doption>
        <a-doption>Option 3</a-doption>
      </a-dgroup>
      <a-dgroup title="Group 2">
        <a-doption>Option 4</a-doption>
        <a-doption>Option 5</a-doption>
        <a-doption>Option 6</a-doption>
      </a-dgroup>
    </template>
  </a-dropdown>
</template>
```
