```yaml
title:
  zh-CN: 容器中
  en-US: Container
```

## zh-CN

可以给任意内容添加加载中指示符。

---

## en-US

You can add a loading indicator to any content.

---

```vue
<template>
  <a-spin :loading="loading" tip="This may take a while...">
    <a-card title="Arco Card">
      ByteDance's core product, Toutiao ('Headlines'), is a content platform in China and around
      the world. Toutiao started out as a news recommendation engine and gradually evolved into
      a platform delivering content in various formats.
    </a-card>
  </a-spin>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  }
}
</script>
```
