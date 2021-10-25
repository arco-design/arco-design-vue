```yaml
title:
  zh-CN: 已上传的文件列表
  en-US: File List
```

## zh-CN

可以指定默认的已上传文件列表。

---

## en-US

You can specify a default list of uploaded files.

---

```vue
<template>
  <a-upload action="/" :default-file-list="fileList"/>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          uid: '-1',
          name: 'test.png',
          url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ff86e73c735540a88a8780d1db64b204~tplv-uwbnlip3yd-image.image',
        },
        {
          status: 'error',
          uid: '-2',
          percent: 0,
          name: '20200717-103937.png',
          url: 'p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/701131f3576449d483d0650a525b57ee~tplv-uwbnlip3yd-image.image',
        },
        {
          uid: '-3',
          name: '20200717-103937.png',
          url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/701131f3576449d483d0650a525b57ee~tplv-uwbnlip3yd-image.image',
        },
      ]
    }
  }
}
</script>
```
