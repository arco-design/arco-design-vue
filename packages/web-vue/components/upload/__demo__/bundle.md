```yaml
title:
  zh-CN: 捆绑上传
  en-US: Bundle Upload
```

## zh-CN

图片上传组件默认每个图片会发起一个请求，在捆绑模式下，可以将一组图片使用一个请求上传，此时，所有图片将会公用一个进度和状态。

---

## en-US

$END$

---

```vue
<template>
  <a-upload action="/" multiple bundle-upload />
</template>
```
