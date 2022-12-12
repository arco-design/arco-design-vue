```yaml
title:
  zh-CN: 挂载位置
  en-US: popup container
```

## zh-CN

通过 `popup-container` 可以设置弹出层节点的挂载位置

---

## en-US

You can use 'popup-container' to set the mount position of the pop-up layer node

---

```vue
<template>
  <div>
    <div
      id="parentNode"
      style="width: 100%; height: 300px; background-color: var(--color-fill-2); position: relative; overflow: hidden; line-height: 300px; text-align: center;"
    >
      <a-button type="primary" @click="handleClick">Open Drawer</a-button>
    </div>
  </div>
  <a-drawer
    popup-container="#parentNode"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> Title </template>
    <div
      >You can customize modal body text by the current situation. This modal
      will be closed immediately once you press the OK button.</div
    >
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
