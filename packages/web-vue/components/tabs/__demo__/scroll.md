```yaml
title:
  zh-CN: 滚动
  en-US: Scrollable
```

## zh-CN

支持通过滚轮或者触摸板进行滚动操作，且可以通过 `scrollPosition` 属性设置滚动位置。

---

## en-US

Support scrolling operation via scroll wheel or touch pad. And you can set the scroll position through the `scrollPosition` property.

---

```vue

<template>
  <a-space direction="vertical" size="large">
    <a-radio-group v-model="position" type="button">
      <a-radio value="left">Left</a-radio>
      <a-radio value="top">Top</a-radio>
      <a-radio value="right">Right</a-radio>
      <a-radio value="bottom">Bottom</a-radio>
    </a-radio-group>
    <a-radio-group v-model="scrollPosition" type="button">
      <a-radio value="auto">auto</a-radio>
      <a-radio value="start">start</a-radio>
      <a-radio value="center">center</a-radio>
      <a-radio value="end">end</a-radio>
    </a-radio-group>
    <a-button @click="changeActive"> Change: {{activeKey}}</a-button>
  </a-space>
  <a-tabs
    v-model:activeKey="activeKey"
    :position="position"
    :scrollPosition="scrollPosition"
    style="width: 100%;height: 300px;margin-top: 20px"
  >
    <a-tab-pane v-for="tab in tabs" :key="tab.key" :title="tab.title">
      {{ tab.content }}
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const position = ref('top');
    const scrollPosition = ref('auto');
    const activeKey = ref('Tab1');
    const tabs = Array.from({ length: 30 }, (v, i) => {
      return {
        key: `Tab${i + 1}`,
        title: `Tab ${i + 1}`,
        content: `Content of Tab Panel ${i + 1}`
      }
    });

    const changeActive = () => {
      activeKey.value = `Tab${Math.floor(Math.random() * 30) + 1}`;
    }

    return {
      tabs,
      position,
      scrollPosition,
      activeKey,
      changeActive
    }
  },
}
</script>
```
