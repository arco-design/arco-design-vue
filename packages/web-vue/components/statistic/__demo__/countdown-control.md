```yaml
title:
  zh-CN: 倒计时过渡控制
  en-US: Countdown transition control
```

## zh-CN

使用方法 `pause` 暂停或继续倒计时。

---

## en-US

Use the method `pause` to pause or resume the countdown.

---

```vue
<template>
  <a-space size="large" align="end">
    <a-countdown
      ref="countdownRef"
      title="Trigger on finish"
      :value="Date.now() + 5 * 1000"
      format="mm:ss.SSS"
      :now="Date.now()"
      :start="start"
      @finish="handleFinish"
      :value-style="{'font-variant-numeric': 'tabular-nums'}"
    />
    <a-space>
      <a-button @click="start = true" type="primary">Start</a-button>
      <a-button @click="handlePause" type="primary" status="danger">Pause</a-button>
    </a-space>
  </a-space>
</template>

<script>
import { ref, computed } from 'vue';
import { Message } from '@arco-design/web-vue';

export default {
  setup() {
    const start = ref(false);
    const countdownRef = ref(null)

    const handlePause = () => {
      countdownRef.value?.pause()
    }

    const handleFinish = () => {
      Message.info('Finish');
    };

    return {
      start,
      countdownRef,
      handlePause,
      handleFinish,
    };
  },
};
</script>
```
