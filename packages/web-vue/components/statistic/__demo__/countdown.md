```yaml
title:
  zh-CN: 倒计时组件
  en-US: Countdown
```

## zh-CN

倒计时组件 `countdown` 的基本使用方法。

---

## en-US

The basic usage of the countdown component `countdown`.

---

```vue
<template>
  <a-row>
    <a-col :flex="1">
      <a-countdown
        title="Countdown"
        :value="now + 1000 * 60 * 60 * 2"
        :now="now"
      />
    </a-col>
    <a-col :flex="1">
      <a-countdown
        title="Milliseconds"
        :value="now + 1000 * 60 * 60 * 2"
        :now="now"
        format="HH:mm:ss.SSS"
      />
    </a-col>
    <a-col :flex="1">
      <a-countdown
        title="Days"
        :value="now + 1000 * 60 * 60 * 24 * 4"
        :now="now"
        format="D 天 H 时 m 分 s 秒"
      />
    </a-col>
  </a-row>
  <a-space direction="vertical" style="margin-top: 10px">
    <a-countdown
      title="Trigger on finish"
      :value="Date.now() + 5 * 1000"
      format="mm:ss.SSS"
      :now="Date.now()"
      :start="start"
      @finish="handleFinish"
    />
    <a-button @click="start = true" type="primary">Start</a-button>
  </a-space>
</template>

<script>
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';

export default {
  setup() {
    const now = Date.now();
    const start = ref(false);

    const handleFinish = () => {
      Message.info('Finish');
    };

    return {
      now,
      start,
      handleFinish,
    };
  },
};
</script>
```
