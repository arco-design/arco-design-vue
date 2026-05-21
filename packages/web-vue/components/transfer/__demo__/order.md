```yaml
title:
  zh-CN: 排序
  en-US: Order
```

## zh-CN

通过设置 `target-order` ，修改右侧列表元素的排序。

---

## en-US

By setting `target-order`,  modify the ordering of the elements in the list on the right.

---

```vue
<template>
  <a-space direction="vertical">
    <a-typography-title :heading="6">排序策略</a-typography-title>
    <a-space>
      <a-radio-group v-model="order" type="button" @change="value1 = []">
        <a-radio value="push">Push</a-radio>
        <a-radio value="unshift">Unshift</a-radio>
        <a-radio value="original">Original</a-radio>
      </a-radio-group>
    </a-space>
    <a-transfer v-model:model-value="value1" :data="data1" :target-order="order" />
    <a-typography-title :heading="6">自定义排序</a-typography-title>
    <a-transfer
      v-model:model-value="value2"
      :data="data2"
      :target-order="(a, b) => b.label.localeCompare(a.label)"
    />
  </a-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref<any[]>([]);
const value2 = ref<any[]>([]);
const order = ref<'push' | 'unshift' | 'original'>('original');
const data1: TransferItem[] = Array.from({ length: 16 }, (_, i) => ({
  value: `${i}`,
  label: `Option ${i}`,
}));
const data2: TransferItem[] = [
  'California',
  'Illinois',
  'Maryland',
  'Texas',
  'Florida',
  'Colorado',
  'Connecticut ',
].map((item, index) => ({
  value: `${index}`,
  label: item,
}));
</script>
```
