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
      <a-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/dae45672685c4be6a297acc7848eab56~tplv-uwbnlip3yd-image.image" width="200" />
      <a-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a5eb077f42834139ad7ac17563056664~tplv-uwbnlip3yd-image.image" width="200" />
      <a-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5c030fe27c0e467a9a7d62c36ae4805b~tplv-uwbnlip3yd-image.image" width="200" />
      <a-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04b379e20b6c42f78d17cac99fcf4fd7~tplv-uwbnlip3yd-image.image" width="200" />
    </a-space>
  </a-image-preview-group>
</template>
```
