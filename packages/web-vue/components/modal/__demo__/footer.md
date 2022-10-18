```yaml
title:
  zh-CN: 页脚控制
  en-US: Hide The Footer
```

## zh-CN

设置 `hideCancel`、 `hideOk`、 `footer` 可以控制页脚内容的显示状态。也可以通过插槽的方式自定义页脚。

---

## en-US

Setting `hideCancel`, `hideOk`and`footer` can control the display status of footer content. You can also customize the footer by slot.

---

```vue
<template>
  <a-space style="marginBottom: 20px">
    <a-typography-text>hideCancel:</a-typography-text>
    <a-switch v-model="hideCancel" />
    <a-typography-text>hideOk:</a-typography-text>
    <a-switch v-model="hideOk" />
    <a-typography-text>footer:</a-typography-text>
    <a-switch v-model="hideFooter" />
    <a-typography-text>slot:</a-typography-text>
    <a-switch v-model="showFooterSlot" />
  </a-space>
  <br />
  <a-button @click="handleClick">Open Modal</a-button>
  <a-modal 
    v-model:visible="visible"
    :hide-ok="hideOk"
    :hide-cancel="hideCancel"
    :footer="hideFooter"
    @ok="handleOk"
    @cancel="handleCancel">
    <template #title>Title</template>
    <div>You can cusstomize modal body text by the current situation.</div>
    <template v-if="showFooterSlot" #footer>
      <a-button type="primary" shape="circle" @click="handleOk">
        <icon-check />
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(false);
    const hideOk = ref(false);
    const hideCancel = ref(false);
    const hideFooter = ref(true);
    const showFooterSlot = ref(false);

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
      hideOk,
      hideCancel,
      hideFooter,
      showFooterSlot,
      handleClick,
      handleOk,
      handleCancel
    }
  },
}
</script>
```
