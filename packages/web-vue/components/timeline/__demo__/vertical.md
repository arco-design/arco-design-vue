```yaml
title:
  zh-CN: 纵向时间轴
  en-US: Vertical
```

## zh-CN

竖直方向的时间轴。

---

## en-US

The vertical time axis.

---

```vue
<template>
  <div>
    <a-row align="center" :style="{ marginBottom: '24px' }">
      <a-typography-text>mode: &nbsp; &nbsp;</a-typography-text>
      <a-radio-group @change="onChange" :modelValue="mode">
        <a-radio value="left">left</a-radio>
        <a-radio value="right">right</a-radio>
        <a-radio value="alternate">alternate</a-radio>
      </a-radio-group>
    </a-row>
    <a-timeline :mode="mode" labelPosition="relative">
      <a-timeline-item label="2012-08">
        <a-row :style="{ display: 'inline-flex', alignItems: 'center' }">
          <img
            width="40"
            :style="{ marginRight: '16px', marginBottom: '12px' }"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b5d834b83708a269b4562924436eac48.png~tplv-uwbnlip3yd-png.png"
          />
          <div :style="{ marginBottom: '12px' }">
            Toutiao
            <div :style="{ fontSize: '12px', color: '#4E5969' }">
              Founded in 2012
            </div>
          </div>
        </a-row>
      </a-timeline-item>
      <a-timeline-item label="2017-05">
        <a-row :style="{ display: 'inline-flex', alignItems: 'center' }">
          <img
            width="40"
            :style="{ marginRight: '16px', marginBottom: '12px' }"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png"
          />
          <div :style="{ marginBottom: '12px' }">
            Xigua Video
            <div :style="{ fontSize: '12px', color: '#4E5969' }">
              Founded in 2017
            </div>
          </div>
        </a-row>
      </a-timeline-item>
      <a-timeline-item label="2018-07">
        <a-row :style="{ display: 'inline-flex', alignItems: 'center' }">
          <img
            width="40"
            :style="{ marginRight: '16px', marginBottom: '12px' }"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/385ed540c359ec8a9b9ce2b5fe89b098.png~tplv-uwbnlip3yd-png.png"
          />
          <div :style="{ marginBottom: '12px' }">
            Pipidance
            <div :style="{ fontSize: '12px', color: '#4E5969' }">
              Founded in 2018
            </div>
          </div>
        </a-row>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const mode = ref('left');

    const onChange = (_mode) => {
      mode.value = _mode;
    };

    return {
      mode,
      onChange
    }
  },
};
</script>
```
