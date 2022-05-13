```yaml
title:
  zh-CN: 受控
  en-US: Controlled
```

## zh-CN

通过 `v-model` (`model-value`) 属性控制是否选中

---

## en-US

Control whether the check box is selected

---

```vue
<template>
  <a-space size="large">
    <a-checkbox v-model="checked1">v-model</a-checkbox>
    <a-checkbox :model-value="true">binding value</a-checkbox>
    <a-checkbox :model-value="checked2">binding value2</a-checkbox>
    <a-checkbox :default-checked="true">uncontrolled state</a-checkbox>
  </a-space>
  <div :style="{ marginTop: '20px' }">
    <a-button type="primary" @click="handleSetCheck">
      {{ checked2 ? 'uncheck' : 'check' }} value2
    </a-button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const checked1 = ref(false);
    const checked2 = ref(false);

    const handleSetCheck = () => {
      checked2.value = !checked2.value;
    };

    return {
      checked1,
      checked2,
      handleSetCheck,
    };
  },
};
</script>
```
