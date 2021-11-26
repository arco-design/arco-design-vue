```yaml
title:
  zh-CN: 基本用法
  en-US: Basic
```

## zh-CN

下拉菜单的基本用法。

---

## en-US

Basic usage of the drop-down menu.

---

```vue
<template>
  <a-dropdown>
    <a-button>Click Me</a-button>
    <template #content>
      <a-doption>Option 1</a-doption>
      <a-doption disabled>Option 2</a-doption>
      <a-doption>Option 3</a-doption>
    </template>
  </a-dropdown>
</template>
```
