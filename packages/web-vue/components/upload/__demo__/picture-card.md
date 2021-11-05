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
  <a-upload
    list-type="picture-card"
    action="/"
    :default-file-list="fileList"
    @preview="onPreview"
  />
</template>

<script lang="jsx">
export default {
  data() {
    return {
      fileList: [
        {
          uid: '-2',
          name: '20200717-103937.png',
          url:
            'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
        }
      ]
    }
  },
  methods: {
    onPreview(file) {
      this.$modal.info({
        title: 'Preview',
        content: (
          <div style="text-align: center">
            <img style="max-width: 100%" src={file.url || URL.createObjectURL(file.originFile)} />
          </div>
        )
      });
    }
  }
}
</script>
```
