```yaml
title:
  zh-CN: 设置步长
  en-US: Step
```

## zh-CN

通过 `step` 设置步长，默认步长为 1。建议设置能够被 `max-min` 整除的值，否则会出现可选最大值小于 `max` 的情况。当设置 `show-ticks` 时，显示步长刻度线。

---

## en-US

Set the step size by `step`, the default step size is 1. It is recommended to set a value that can be divisible by `max-min`, otherwise, the optional maximum value will be less than `max`. When `show-ticks` is set, the step ticks are displayed.

---

```vue

<template>
  <a-space direction="vertical" size="large">
    <a-form :model="data" layout="inline">
      <a-form-item label="Step" field="step">
        <a-input-number :style="{ width: '100px' }" v-model="data.step" />
      </a-form-item>
      <a-form-item label="Show steps" field="showTicks">
        <a-switch v-model="data.showTicks" />
      </a-form-item>
    </a-form>
    <a-slider :default-value="20" :style="{ width: '300px' }" :step="data.step" :show-ticks="data.showTicks" />
  </a-space>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const data = reactive({
      step: 5,
      showTicks: true
    });

    return {
      data
    }
  },
}
</script>
```
