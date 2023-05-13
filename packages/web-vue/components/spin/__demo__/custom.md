```yaml
title:
  zh-CN: 自定义样式
  en-US: Custom style
```

## zh-CN

为加载容器设置自定义样式

---

## en-US

Set custom styles for the load container

---

```vue
<template>
  <a-button style="margin-bottom: 20px" @click="(loading = !loading)">loading: {{loading}}</a-button>
  <a-spin :loading="loading" tip="This may take a while..." :wrapper-style="{backgroundColor: 'rgba(var(--arcoblue-5), 0.2)'}">
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
