```yaml
title:
  zh-CN: 限制可勾选数量
  en-US: Limit the number of boxes that can be checked
```

## zh-CN

通过设置 `max` 限制最多可被勾选的项目数。

---

## en-US

Limit the maximum number of items that can be checked by setting `max`.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-checkbox-group :max="2" v-model="value1" :options="plainOptions" />
    <a-checkbox-group :max="2" :default-value="['1']">
      <a-checkbox value="1" disabled>Option 1</a-checkbox>
      <a-checkbox value="2">Option 2</a-checkbox>
      <a-checkbox value="3">Option 3</a-checkbox>
      <a-checkbox value="4">Option 4</a-checkbox>
    </a-checkbox-group>
  </a-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value1 = ref(['Plain 1']);
    const plainOptions = ['Plain 1', 'Plain 2', 'Plain 3', 'Plain 4'];

    return {
      plainOptions,
      value1,
    };
  },
};
</script>
```
