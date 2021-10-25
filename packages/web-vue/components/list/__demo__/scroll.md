```yaml
title:
  zh-CN: 滚动
  en-US: Scroll
```

## zh-CN

通过设置 `max-height` 属性限制列表的最大高度。通过 `reach-bottom` 事件可以监听列表触底的事件。

---

## en-US

Limit the maximum height of the list by setting the `max-height` property. Through the `reach-bottom` event, you can listen to the event of the bottom of the list.

---

```vue
<template>
  <a-list :max-height="200" @reach-bottom="reachBottom">
    <template #header>
      List title
    </template>
    <a-list-item>Beijing Bytedance Technology Co., Ltd.</a-list-item>
    <a-list-item>Bytedance Technology Co., Ltd.</a-list-item>
    <a-list-item>Beijing Toutiao Technology Co., Ltd.</a-list-item>
    <a-list-item>Beijing Volcengine Technology Co., Ltd.</a-list-item>
    <a-list-item>China Beijing Bytedance Technology Co., Ltd.</a-list-item>
  </a-list>
</template>

<script>
export default {
  methods: {
    reachBottom() {
      console.log('reach bottom!')
    }
  }
}
</script>
```
