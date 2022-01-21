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
      <a-doption>Option 1</a-doption>
      <a-dsubmenu value="option-1">
        <template #default>Option 2</template>
        <template #content>
          <a-doption>Option 2-1</a-doption>
          <a-dsubmenu value="option-2-2" trigger="hover">
            <template #default>Option 2-2</template>
            <template #content>
              <a-doption>Option 2-1</a-doption>
              <a-doption>Option 2-2</a-doption>
              <a-doption>Option 2-3</a-doption>
            </template>
            <template #footer>
              <div style="padding: 6px; text-align: center;">
                <a-button>Click</a-button>
              </div>
            </template>
          </a-dsubmenu>
          <a-doption>Option 2-3</a-doption>
        </template>
      </a-dsubmenu>
      <a-doption>Option 3</a-doption>
    </template>
  </a-dropdown>
</template>
```
