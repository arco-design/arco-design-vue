```yaml
title:
  zh-CN: 大小和形状
  en-US: Size
```

## zh-CN

通过设置 `size` 字段，可以调节头像的大小，默认大小为 `40px`。设置 `shape` 字段，可以设置头像是圆形 (circle) 还是正方形 (square)。

---

## en-US

The size of the avatar can be adjusted by setting the `size` field. The default size is `40px`. Set the `shape` field, you can set whether the profile picture is a circle or a square.

---

```vue
<template>
  <a-space size="large" direction="vertical">
    <a-space size="large">
      <a-avatar :size="64">Arco</a-avatar>
      <a-avatar :size="40">Arco</a-avatar>
      <a-avatar :size="32">Arco</a-avatar>
      <a-avatar :size="24">Arco</a-avatar>
    </a-space>
    <a-space size="large">
      <a-avatar :size="64" shape="square">Arco</a-avatar>
      <a-avatar :size="40" shape="square">Arco</a-avatar>
      <a-avatar :size="32" shape="square">Arco</a-avatar>
      <a-avatar :size="24" shape="square">Arco</a-avatar>
    </a-space>
  </a-space>
</template>
```
