```yaml
title:
  zh-CN: 触发方式
  en-US: Trigger
```

## zh-CN

通过 `trigger` 指定触发方式。

---

## en-US

Specify the trigger method by `trigger`.

---

```vue
<template>
  <a-radio-group v-model="trigger">
    <a-radio value="click">click</a-radio>
    <a-radio value="hover">hover</a-radio>
  </a-radio-group>
  <a-tabs default-active-key="1" :trigger="trigger">
    <a-tab-pane key="1" title="Tab 1"> Content of Tab Panel 1 </a-tab-pane>
    <a-tab-pane key="2" title="Tab 2"> Content of Tab Panel 2 </a-tab-pane>
    <a-tab-pane key="3">
      <template #title>Tab 3</template>
      Content of Tab Panel 3
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const trigger = ref('click');
    return {
      trigger,
    };
  },
};
</script>
```
