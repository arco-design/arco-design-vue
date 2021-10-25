```yaml
title:
  zh-CN: 照片墙
  en-US: Picture Card
```

## zh-CN

通过设置 `list-type="picture-card"` 开启照片墙模式。

---

## en-US

Enable the photo wall mode by setting `list-type="picture-card"`.

---

```vue

<template>
  <a-upload list-type="picture-card" action="/" :default-file-list="fileList" />
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          uid: '-2',
          name: '20200717-103937.png',
          url:
            'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/701131f3576449d483d0650a525b57ee~tplv-uwbnlip3yd-image.image',
        }
      ]
    }
  }
}
</script>
```
