```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

点击触发按钮抽屉从右侧滑出，点击遮罩区关闭。

---

## en-US

Click the trigger button to slide out the drawer from the right, click the mask area to close.

---

```vue
<template>
  <a-button type="primary" @click="handleClick">Open Drawer</a-button>
  <a-drawer :width="340" :visible="visible" @ok="handleOk" @cancel="handleCancel" unmountOnClose>
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you
      press the OK button.
    </div>
  </a-drawer>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(false);

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
      handleClick,
      handleOk,
      handleCancel
    }
  },
};
</script>
```
