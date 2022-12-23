```yaml
title:
  zh-CN: 不同类型
  en-US: Types
```

## zh-CN

通过 `type` 可以设置标签的类型。

---

## en-US

The type of label can be set by `type`.

---

```vue

<template>
  <a-space direction="vertical" size="large">
    <a-radio-group v-model="type" type="button">
      <a-radio value="line">Line</a-radio>
      <a-radio value="card">Card</a-radio>
      <a-radio value="card-gutter">Card Gutter</a-radio>
      <a-radio value="text">Text</a-radio>
      <a-radio value="rounded">Rounded</a-radio>
      <a-radio value="capsule">Capsule</a-radio>
    </a-radio-group>
    <a-radio-group v-model="size" type="button">
      <a-radio value="mini">Mini</a-radio>
      <a-radio value="small">Small</a-radio>
      <a-radio value="medium">Medium</a-radio>
      <a-radio value="large">Large</a-radio>
    </a-radio-group>
    <a-tabs :type="type" :size="size">
      <a-tab-pane key="1" title="Tab 1">
        Content of Tab Panel 1
      </a-tab-pane>
      <a-tab-pane key="2" title="Tab 2">
        Content of Tab Panel 2
      </a-tab-pane>
      <a-tab-pane key="3" title="Tab 3">
        Content of Tab Panel 3
      </a-tab-pane>
    </a-tabs>
  </a-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const type = ref('line');
    const size = ref('medium');

    return {
      type,
      size
    }
  },
}
</script>
```
