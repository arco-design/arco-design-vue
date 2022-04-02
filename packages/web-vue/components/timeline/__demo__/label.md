```yaml
title:
  zh-CN: 标签文本位置
  en-US: Label Position
```

## zh-CN

通过 `labelPosition` 可以设置标签文本的位置。

---

## en-US

The position of the label text can be set by `labelPosition`.

---

```vue
<template>
  <div>
    <a-row align="center">
      <a-typography-text>labelPosition: &nbsp; &nbsp;</a-typography-text>
      <a-radio-group @change="onLabelPositionChange" :modelValue="pos">
        <a-radio value="same">same</a-radio>
        <a-radio value="relative">relative</a-radio>
      </a-radio-group>
    </a-row>
    <a-row align="center" :style="{ margin: '20px 0px 24px' }">
      <a-typography-text>mode: &nbsp; &nbsp;</a-typography-text>
      <a-radio-group @change="onModeChange" :modelValue="mode">
        <a-radio value="left">left</a-radio>
        <a-radio value="right">right</a-radio>
        <a-radio value="alternate">alternate</a-radio>
      </a-radio-group>
    </a-row>
    <a-timeline :mode="mode" :labelPosition="pos">
      <a-timeline-item label="2017-03-10" dotColor="#52C419">
        The first milestone
      </a-timeline-item>
      <a-timeline-item
        label="2018-05-12"
        dotColor="#F5222D"
        labelPosition="same"
      >
        The second milestone
      </a-timeline-item>
      <a-timeline-item label="2020-09-30" position="bottom">
        The third milestone
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const mode = ref('left');
    const pos = ref('same');

    const onLabelPositionChange = (_pos) => {
      pos.value = _pos;
    };

    const onModeChange = (_mode) => {
      mode.value = _mode;
    };

    return {
      mode,
      pos,
      onLabelPositionChange,
      onModeChange
    }
  },
};
</script>
```
