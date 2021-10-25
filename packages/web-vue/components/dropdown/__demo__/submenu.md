```yaml
title:
  zh-CN: 多级菜单
  en-US: Submenu
```

## zh-CN

带有多级菜单的下拉框。

---

## en-US

Drop-down box with multi-level menu.

---

```vue
<template>
  <a-dropdown>
    <a-button>Click Me</a-button>
    <template #content>
      <a-dsubmenu>
        Option 1
        <template #content>
          <a-doption>Option 1-1</a-doption>
          <a-doption>Option 1-2</a-doption>
          <a-doption>Option 1-3</a-doption>
        </template>
      </a-dsubmenu>
    </template>
  </a-dropdown>
</template>
```
