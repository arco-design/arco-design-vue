```yaml
title:
  zh-CN: 按钮下拉框
  en-US: Dropdown button
```

## zh-CN

可以使用 `<dropdown-button>` 组件用来展示右边是额外相关功能菜单的按钮。
`2.16.0` 版本添加支持。

---

## en-US

The `<dropdown-button>` component can be used to display a button with a menu of additional related functions on the right.
`2.16.0` version added support.

---

```vue
<template>
  <a-space size="large">
    <a-dropdown-button>
      Publish
      <template #content>
        <a-doption>Save now</a-doption>
        <a-doption>Save and Publish</a-doption>
      </template>
    </a-dropdown-button>
    <a-dropdown-button disabled>
      Disabled
      <template #content>
        <a-doption>Save now</a-doption>
        <a-doption>Save and Publish</a-doption>
      </template>
    </a-dropdown-button>
    <a-dropdown-button>
      Publish
      <template #icon>
        <icon-down />
      </template>
      <template #content>
        <a-doption>Save now</a-doption>
        <a-doption>Save and Publish</a-doption>
      </template>
    </a-dropdown-button>
  </a-space>

</template>

<style>
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>
```
