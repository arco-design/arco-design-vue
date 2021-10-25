```yaml
title:
  zh-CN: 图形骨架屏
  en-US: Shape Skeleton
```

## zh-CN

图形骨架屏分为 `square` - **正方形（默认）**、 `circle` - **圆形**两种形状，并提供 `small`、`medium`、`large` 三种尺寸。

---

## en-US

The graphic skeleton screen is divided into two shapes: `square`, `circle`, and provides three sizes of `small`, `medium`, and `large`.

---

```vue
<template>
  <a-skeleton>
    <a-space size="large">
      <a-skeleton-shape size="small" />
      <a-skeleton-shape />
      <a-skeleton-shape size="large" />
      <a-skeleton-shape shape="circle" size="small" />
      <a-skeleton-shape shape="circle" />
      <a-skeleton-shape shape="circle" size="large" />
    </a-space>
  </a-skeleton>
</template>
```
