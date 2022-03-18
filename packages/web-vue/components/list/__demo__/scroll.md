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
  <a-list :max-height="200" @reach-bottom="fetchData">
    <template #header>
      List title
    </template>
    <template #scroll-loading>
      <div v-if="bottom">No more data</div>
      <a-spin v-else />
    </template>
    <a-list-item v-for="item of data">{{item}}</a-list-item>
  </a-list>
</template>

<script>
export default {
  methods: {
    fetchData() {
      console.log('reach bottom!');
      const _data = this.$data;
      if (_data.current <= 5) {
        window.setTimeout(() => {
          const index = _data.data.length;
          _data.data.push(
            `Beijing Bytedance Technology Co., Ltd. ${index + 1}`,
            `Bytedance Technology Co., Ltd. ${index + 2}`,
            `Beijing Toutiao Technology Co., Ltd. ${index + 3}`,
            `Beijing Volcengine Technology Co., Ltd. ${index + 4}`,
            `China Beijing Bytedance Technology Co., Ltd. ${index + 5}`
          );
          _data.current += 1
        }, 2000)
      } else {
        _data.bottom = true
      }

    }
  },
  data() {
    return {
      current: 1,
      bottom: false,
      data: []
    }
  }
}
</script>
```
