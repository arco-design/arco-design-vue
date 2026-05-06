```yaml
title:
  zh-CN: 加载中状态
  en-US: Loading Status
```

## zh-CN

通过设置 `loading` 可以让按钮处于加载中状态。处于加载中状态的按钮不会触发点击事件。
通过设置 `loading-fixed-width` 可以在加载中时保持按钮宽度不变。

---

## en-US

The button can be in the loading state by setting `loading`. The button in the loading state will not trigger the `click` event.
By setting `loading-fixed-width`, the button width remains unchanged during loading.

---

```vue
<template>
  <div>
    <div :style="gridStyle">
      <a-button type="primary" loading>Loading</a-button>
      <a-button loading>Loading</a-button>
      <a-button type="dashed" loading>Loading</a-button>
      <a-button type="primary" shape="circle" loading />
      <a-button shape="circle" loading />
      <a-button type="dashed" shape="circle" loading />
    </div>
    <a-button
      type="primary"
      :loading="loading1"
      style="margin: 24px"
      @click="handleClick1"
    >
      Click Me
    </a-button>
    <a-button
      type="primary"
      :loading="loading2"
      style="margin: 24px"
      @click="handleClick2"
    >
      <template #icon>
        <icon-plus />
      </template>
      Click Me
    </a-button>
    <a-divider style="width: 440px; min-width: 440px">
      loading fixed width
    </a-divider>
    <a-button
      type="primary"
      loading-fixed-width
      :loading="loading3"
      style="margin: 24px"
      @click="handleClick3"
    >
      Search
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconPlus } from '@arco-design/web-vue/es/icon';

const triggerLoading = (stateRef) => {
  if (stateRef.value) {
    return;
  }
  stateRef.value = true;
  setTimeout(() => {
    stateRef.value = false;
  }, 4000);
};

const loading1 = ref(false);
const loading2 = ref(false);
const loading3 = ref(false);

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 100px)',
  rowGap: '24px',
  columnGap: '24px',
  marginLeft: '24px',
};

const handleClick1 = () => {
  triggerLoading(loading1);
};
const handleClick2 = () => {
  triggerLoading(loading2);
};
const handleClick3 = () => {
  triggerLoading(loading3);
};
</script>
```
