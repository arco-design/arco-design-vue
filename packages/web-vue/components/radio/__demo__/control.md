```yaml
title:
  zh-CN: 受控
  en-US: Controlled
```

## zh-CN

通过 `v-model` (`model-value`) 属性控制是否选中

---

## en-US

Control whether the radio is selected

---

```vue
<template>
  <a-space size="large">
    <a-radio v-model="checked1">v-model</a-radio>
    <a-radio :model-value="true">binding "true"</a-radio>
    <a-radio :model-value="checked2">binding value2</a-radio>
    <a-radio :default-checked="true">uncontrolled state</a-radio>
  </a-space>
  <div :style="{ marginTop: '20px' }">
    <a-space size="large">
      <a-button type="primary" @click="handleSetCheck">
        {{ checked2 ? 'uncheck' : 'check' }} value2
      </a-button>
      <a-button @click="handleReset"> reset all </a-button>
    </a-space>
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

    const handleReset = () => {
      checked1.value = false;
      checked2.value = false;
    };

    return {
      checked1,
      checked2,
      handleSetCheck,
      handleReset,
    };
  },
};
</script>
```
