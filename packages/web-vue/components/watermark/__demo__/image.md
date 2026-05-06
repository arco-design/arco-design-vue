```yaml
title:
  zh-CN: 图片水印
  en-US: Image Watermark
```

## zh-CN

通过 image 设置图片水印。建议使用 2 倍或 3 倍图（支持 Base64）。

---

## en-US

Set an image watermark using the image property. It's recommended to use 2x or 3x images (supports Base64).

---

```vue
<template>
  <a-watermark
    :width="100"
    :height="16"
    image="https://lf3-static.bytednsdoc.com/obj/eden-cn/unpzlK_vjyH/ljhwZthlaukjlkulzlp/site/arco.png"
  >
    <div style="width: 100%; height: 300px;" />
  </a-watermark>
</template>
```
