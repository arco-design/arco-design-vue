```yaml
title:
  zh-CN: 挂载节点
  en-US: Popup Container
```

## zh-CN

可以通过 `popupContainer` 指定预览挂载的父级节点。

---

## en-US

You can specify the parent node of the preview mounted by `popupContainer`.

---

```vue
<template>
  <div
    id="image-demo-preview-popup-container"
    :style="{
      width: '100%',
      height: '400px',
      backgroundColor: 'var(--color-fill-2)',
      position: 'relative',
      overflow: 'hidden',
      lineHeight: '400px',
      textAlign: 'center',
    }"
  >
    <a-image
      width="200"
      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      :preview-props="{
        popupContainer: '#image-demo-preview-popup-container',
        closable: false,
      }"
    />
  </div>
</template>
```
