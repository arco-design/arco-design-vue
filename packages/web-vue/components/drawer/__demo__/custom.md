```yaml
title:
  zh-CN: 自定义节点
  en-US: Custom node
```

## zh-CN

通过插槽自定义内容，或者设置相应属性来控制显示或隐藏。

---

## en-US

Customize the content by slot, or set the appropriate properties to control whether it is shown or hidden.

---

```vue
<template>
  <a-checkbox-group v-model="custom" :options="['hide header', 'hide footer', 'hide cancel']"/>
  <div :style="{marginTop: '20px'}">
    <a-button type="primary" @click="handleClick">Open Drawer</a-button>
  </div>
  <a-drawer
    :width="340"
    :header="!custom.includes('hide header')"
    :footer="!custom.includes('hide footer')"
    :hide-cancel="custom.includes('hide cancel')"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    unmountOnClose
  >
    <template #header>
      <span>Header and title</span>
    </template>
    <div>
      You can customize modal body text by the current situation. This modal will be closed immediately once you
      press the OK button.
    </div>
  </a-drawer>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(false);
    const custom = ref([])

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
      custom,
      visible,
      handleClick,
      handleOk,
      handleCancel
    }
  },
};
</script>
```
