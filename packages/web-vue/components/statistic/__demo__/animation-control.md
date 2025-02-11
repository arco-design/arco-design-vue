```yaml
title:
  zh-CN: 动画控制
  en-US: Animation control
```

## zh-CN

使用方法 `pause` 暂停或继续动画，`restart` 可从新开始动画。

---

## en-US

Use the method `pause` to pause or resume the animation, and `restart` can start the animation again.

---

```vue
<template>
  <a-statistic
    ref="statisticRef"
    title="User Growth Rate"
    :value="50.52"
    :precision="2"
    :value-from="0"
    :start="start"
    animation
    @pauseChange="handlePauseChange"
  >
    <template #prefix>
      <icon-arrow-rise />
    </template>
    <template #suffix>%</template>
  </a-statistic>
  <a-space>
    <a-button type="primary" @click="start=true">Start</a-button>
    <a-button
      type="primary"
      :status="paused ? 'success' : 'danger'"
      @click="handlePause"
    >
      {{ paused ? 'Continue' : 'Pause' }}
    </a-button>
    <a-button type="primary" status="warning" @click="handleRestart">Restart</a-button>
  </a-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const start = ref(false);
    const statisticRef = ref(null)
    const paused = ref(false)

    const handlePauseChange = (value) => {
      paused.value = value
    }

    const handlePause = () => {
      statisticRef.value?.pause()
    }

    const handleRestart = () => {
      statisticRef.value?.restart()
    }

    return {
      statisticRef,
      start,
      paused,
      handlePauseChange,
      handlePause,
      handleRestart
    }
  },
}
</script>
```
