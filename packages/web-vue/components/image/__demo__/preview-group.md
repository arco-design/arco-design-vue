```yaml
title:
  zh-CN: 多图预览
  en-US: Multi-image preview
```

## zh-CN

用 `<a-image-preview-group>` 包裹 `<a-image>` 组件即可进行多图预览。

---

## en-US

Use `<a-image-preview-group>` to wrap the `<a-image>` component to preview multiple images.

---

```vue
<template>
  <a-image-preview-group infinite>
    <a-space>
      <a-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp" width="200" />
      <a-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp" width="200" />
      <a-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp" width="200" />
      <a-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp" width="200" />
    </a-space>
  </a-image-preview-group>
</template>
```
