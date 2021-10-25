```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

基本使用

---

## en-US

Basic usage

---

```vue
<template>
  <div :style="{ marginBottom: '40px' }">
    <a-typography-text :style="{ verticalAlign: 'middle', marginRight: '8px' }">
      Reverse
    </a-typography-text>
    <a-radio-group
      @change="onChange"
      style="{ marginBottom: '30px' }"
      :modelValue="isReverse"
    >
      <a-radio :value="false">No Reverse</a-radio>
      <a-radio :value="true">Reverse</a-radio>
    </a-radio-group>
  </div>
  <a-timeline :reverse="isReverse">
    <a-timeline-item label="2017-03-10">The first milestone</a-timeline-item>
    <a-timeline-item label="2018-05-12">The second milestone</a-timeline-item>
    <a-timeline-item label="2020-09-30">The third milestone</a-timeline-item>
  </a-timeline>
</template>

<script>
export default {
  data() {
    return {
      isReverse: false,
    };
  },
  methods: {
    onChange(bool) {
      this.isReverse = bool;
    },
  },
};
</script>
```
