```yaml
title:
  zh-CN: 自定义预览控制条
  en-US: Preview Control Bar
```

## zh-CN

通过设置 `actionsLayout` 可以调整预览控制条中功能按钮的顺序，同时可以过滤功能按钮，只有在 actionsLayout 中的按钮才会出现。

---

## en-US

The function buttons on the control preview control bar can be sorted and filtered through `actionLayout`.

---

```vue
<template>
  <a-image
    width="200"
    src='https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
    :preview-props="{
      actionsLayout: ['rotateRight', 'zoomIn', 'zoomOut'],
    }"
  />
</template>
```
