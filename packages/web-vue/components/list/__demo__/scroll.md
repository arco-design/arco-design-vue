```yaml
title:
  zh-CN: 滚动
  en-US: Scroll
```

## zh-CN

通过设置 `max-height` 属性限制列表的最大高度。通过 `reach-bottom` 事件可以监听列表触底的事件。

---

## en-US

Limit the maximum height of the list by setting the `max-height` property. Through the `reach-bottom` event, you can
listen to the event of the bottom of the list.

---

```vue
<template>
  <div style="margin-bottom: 10px">
    <a-switch v-model="scrollbar" />
    Virtual Scrollbar
  </div>
  <a-list :max-height="240" @reach-bottom="fetchData" :scrollbar="scrollbar">
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
import { reactive, ref } from 'vue';

export default {
  setup() {
    const current = ref(1);
    const bottom = ref(false);
    const data = reactive([]);
    const scrollbar = ref(true);

    const fetchData = () => {
      console.log('reach bottom!');
      if (current.value <= 5) {
        window.setTimeout(() => {
          const index = data.length;
          data.push(
            `Beijing Bytedance Technology Co., Ltd. ${index + 1}`,
            `Bytedance Technology Co., Ltd. ${index + 2}`,
            `Beijing Toutiao Technology Co., Ltd. ${index + 3}`,
            `Beijing Volcengine Technology Co., Ltd. ${index + 4}`,
            `China Beijing Bytedance Technology Co., Ltd. ${index + 5}`
          );
          current.value += 1
        }, 2000)
      } else {
        bottom.value = true
      }
    }

    return {
      current,
      bottom,
      data,
      fetchData,
      scrollbar
    }
  },
}
</script>
```
