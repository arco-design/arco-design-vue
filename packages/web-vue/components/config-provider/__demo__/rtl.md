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
      <a-tabs default-active-key="2" style="margin-bottom: 20px;">
        <a-tab-pane
          v-for="i in 36"
          :key="i"
          :title="`Tab ${i}`"
        >
          Content of Tab Panel {{ i }}
        </a-tab-pane>
      </a-tabs>
      <a-space :direction="'vertical'" style="width: 100%;">
        <a-space :size="40">
          <a-badge :count="9">
            <a-avatar shape="square" />
          </a-badge>
          <a-badge :count="9" dot :dotStyle="{ width: '10px', height: '10px' }">
            <a-avatar shape="square" />
          </a-badge>
          <a-badge :dotStyle="{ height: '16px', width: '16px', fontSize: '14px' }">
            <template #content>
              <IconClockCircle
                :style="{ verticalAlign: 'middle', color: 'var(--color-text-2)' }"
              />
            </template>
            <a-avatar shape="square" />
          </a-badge>
          <a-tag :color="'red'" closable>red</a-tag>
          <a-tag :color="'blue'" closable>blue</a-tag>
          <a-tag :color="'green'" closable>green</a-tag>
        </a-space>
      </a-space>
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
