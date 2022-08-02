```yaml
title:
  zh-CN: 延迟
  en-US: Delay
```

## zh-CN

通过 `delay` 延迟显示 loading，对状态切换进行防抖处理，有效避免状态快速切换时的屏幕闪烁。

---

## en-US

Use `delay` to delay the switch of loading status, which effectively avoids screen flicker during rapid state switching.

---

```vue
<template>
  <a-button style="margin-bottom: 20px" @click="(loading = !loading)">loading: {{loading}}</a-button>
  <a-spin :loading="loading" tip="This may take a while..." :delay="500">
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
