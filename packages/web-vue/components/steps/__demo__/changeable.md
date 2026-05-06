```yaml
title:
  zh-CN: 可切换步骤条
  en-US: Changeable
```

## zh-CN

设置 `changeable` 开启点击切换步骤。

---

## en-US

Set `changeable` to enable the click switch step.

---

```vue
<template>
  <div>
    <a-steps changeable :current="current" @change="handleSetCurrent">
      <a-step description="This is a description">Succeeded</a-step>
      <a-step description="This is a description">Processing</a-step>
      <a-step description="This is a description">Pending</a-step>
    </a-steps>
    <div
      :style="{
        width: '100%',
        height: '200px',
        textAlign: 'center',
        background: 'var(--color-bg-2)',
        color: '#C2C7CC',
      }"
    >
      <div style="line-height: 160px;">Step{{ current }} Content</div>
      <a-space size="large">
        <a-button type="secondary" :disabled="current <= 1" @click="handlePrev">
          <IconLeft /> Back
        </a-button>
        <a-button type="primary" :disabled="current >= 3" @click="handleNext">
          Next <IconRight />
        </a-button>
      </a-space>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  current: 1,
});

const { current } = toRefs(state);

const handlePrev = () => {
  current.value = Math.max(1, current.value - 1);
};

const handleNext = () => {
  current.value = Math.min(3, current.value + 1);
};

const handleSetCurrent = (current) => {
  current.value = current;
};
</script>
```
