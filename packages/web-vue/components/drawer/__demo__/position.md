```yaml
title:
  zh-CN: 抽屉位置
  en-US: Position
```

## zh-CN

自定义位置，点击触发按钮抽屉从相应的位置滑出。

---

## en-US

Customize the position and click the trigger button to slide out the drawer from the corresponding position.

---

```vue
<template>
  <a-radio-group v-model="position">
    <a-radio value="top">Top</a-radio>
    <a-radio value="right">Right</a-radio>
    <a-radio value="bottom">Bottom</a-radio>
    <a-radio value="left">Left</a-radio>
  </a-radio-group>
  <div :style="{marginTop: '20px'}">
    <a-button type="primary" @click="handleClick">Open Drawer</a-button>
  </div>
  <a-drawer
    :width="340"
    :height="340"
    :visible="visible"
    :placement="position"
    @ok="handleOk"
    @cancel="handleCancel"
    unmountOnClose
  >
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
  </a-drawer>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(false);
    const position = ref('right');

    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
      visible.value = false;
    }

    return {
      visible,
      position,
      handleClick,
      handleOk,
      handleCancel
    }
  },
};
</script>
```
