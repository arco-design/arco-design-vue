```yaml
title:
  zh-CN: 不同尺寸
  en-US: Sizes
```

## zh-CN

列表组件提供了三种大小 `small, medium, large` ，可根据业务需求自行选择。

---

## en-US

The list component provides three sizes `small, medium, large`, which can be selected according to business needs.

---

```vue

<template>
  <a-space direction="vertical" size="large">
    <a-radio-group v-model="size" type="button">
      <a-radio value="small">Small</a-radio>
      <a-radio value="medium">Medium</a-radio>
      <a-radio value="large">Large</a-radio>
    </a-radio-group>
    <a-list :size="size">
      <template #header>
        List title
      </template>
      <a-list-item>Beijing Bytedance Technology Co., Ltd.</a-list-item>
      <a-list-item>Bytedance Technology Co., Ltd.</a-list-item>
      <a-list-item>Beijing Toutiao Technology Co., Ltd.</a-list-item>
      <a-list-item>Beijing Volcengine Technology Co., Ltd.</a-list-item>
      <a-list-item>China Beijing Bytedance Technology Co., Ltd.</a-list-item>
    </a-list>
  </a-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const size = ref('medium');

    return {
      size
    }
  },
}
</script>
```
