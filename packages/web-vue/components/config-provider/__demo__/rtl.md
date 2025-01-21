```yaml
title:
  zh-CN: RTL 视图
  en-US: RTL
```

## zh-CN

设置组件为从右向左阅读的视图。

---

## en-US

Set the component to a view that reads from right to left.

---

```vue
<template>
  <div>
    <a-switch v-model="rtlType" style="margin-bottom: 20px;">
      <template #checked>
        RTL
      </template>
      <template #unchecked>
        LTR
      </template>
    </a-switch>
    <a-config-provider :rtl="rtlType">
      <a-tabs default-active-key="2">
        <a-tab-pane
          v-for="i in 36"
          :key="i"
          :title="`Tab ${i}`"
        >
          Content of Tab Panel {{ i }}
        </a-tab-pane>
      </a-tabs>
    </a-config-provider>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const rtlType = ref(true);

    return {
      rtlType,
    };
  },
};
</script>
```
