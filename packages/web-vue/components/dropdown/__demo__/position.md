```yaml
title:
  zh-CN: 弹出方向
  en-US: Position
```

## zh-CN

通过 `position` 支持指定 6 种弹出方位，分别是：top: 向上, tl: 左上, tr: 右上, bottom: 下方(默认), bl: 左下, br: 右下。

---

## en-US

Support to specify 6 pop-up orientations through `position`, which are: top: up, tl: top left, tr: top right, bottom: bottom (default), bl: bottom left, br: bottom right.

---

```vue
<template>
  <a-space>
    <a-dropdown position="bl">
      <a-button>Bottom Left</a-button>
      <template #content>
        <a-doption>Option 1</a-doption>
        <a-doption>Option 2</a-doption>
        <a-doption>Option 3</a-doption>
      </template>
    </a-dropdown>
    <a-dropdown position="bottom">
      <a-button>Bottom</a-button>
      <template #content>
        <a-doption>Option 1</a-doption>
        <a-doption>Option 2</a-doption>
        <a-doption>Option 3</a-doption>
      </template>
    </a-dropdown>
    <a-dropdown position="br">
      <a-button>Bottom Right</a-button>
      <template #content>
        <a-doption>Option 1</a-doption>
        <a-doption>Option 2</a-doption>
        <a-doption>Option 3</a-doption>
      </template>
    </a-dropdown>
    <a-dropdown position="tl">
      <a-button>Top Left</a-button>
      <template #content>
        <a-doption>Option 1</a-doption>
        <a-doption>Option 2</a-doption>
        <a-doption>Option 3</a-doption>
      </template>
    </a-dropdown>
    <a-dropdown position="top">
      <a-button>Top</a-button>
      <template #content>
        <a-doption>Option 1</a-doption>
        <a-doption>Option 2</a-doption>
        <a-doption>Option 3</a-doption>
      </template>
    </a-dropdown>
    <a-dropdown position="tr">
      <a-button>Top Right</a-button>
      <template #content>
        <a-doption>Option 1</a-doption>
        <a-doption>Option 2</a-doption>
        <a-doption>Option 3</a-doption>
      </template>
    </a-dropdown>
  </a-space>
</template>
```
