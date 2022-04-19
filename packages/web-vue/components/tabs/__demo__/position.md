```yaml
title:
  zh-CN: 位置
  en-US: Position
```

## zh-CN

通过 `position` 属性可以自定义标签栏的位置。

---

## en-US

The position of the tab bar can be customized through the `position` property.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-radio-group v-model="position" type="button">
      <a-radio value="top">Top</a-radio>
      <a-radio value="right">Right</a-radio>
      <a-radio value="bottom">Bottom</a-radio>
      <a-radio value="left">Left</a-radio>
    </a-radio-group>
    <a-tabs :position="position">
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
    const position = ref('top');

    return {
      position
    }
  },
}
</script>
```
