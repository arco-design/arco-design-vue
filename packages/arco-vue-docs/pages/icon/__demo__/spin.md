```yaml
title:
  zh-CN: 旋转状态
  en-US: Spin Icon
```

## zh-CN

通过设置 `spin`，可以将图标设置为旋转状态。也可以使用 `rotate` 自定义旋转角度。

---

## en-US

By setting `spin`, the icon can be set to a rotating state. You can also use `rotate` to customize the rotation angle.

---

```vue
<template>
  <a-space size="large">
    <icon-refresh :style="{fontSize:'32px'}" spin/>
    <icon-sync :style="{fontSize:'32px'}" spin/>
    <icon-face-smile-fill :style="{fontSize:'32px'}" :rotate="180"/>
  </a-space>
</template>
```
