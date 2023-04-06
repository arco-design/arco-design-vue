```yaml
title:
  zh-CN: 自定义标题栏
  en-US: Custom Header
```

## zh-CN

通过 `sourceTitle` ,`targetTitle` 插槽自定义标题栏的渲染内容

---

## en-US

Customize the rendering content of the title bar through the `sourceTitle` and `targetTitle` slots

---

```vue
<template>
  <a-transfer :data="data" :default-value="value">
    <template
      #source-title="{
        countTotal,
        countSelected,
        checked,
        indeterminate,
        toggleSelectAll,
      }"
    >
      <div :style="styleHeader">
        Source Title {{ countSelected }}-{{ countTotal }}
        <a-checkbox
          :model-value="checked"
          :indeterminate="indeterminate"
          @change="toggleSelectAll"
        />
      </div>
    </template>

    <template #target-title="{ countTotal, countSelected, clear }">
      <div :style="styleHeader">
        Target Title {{ countSelected }}-{{ countTotal }}
        <IconDelete @click="clear" />
      </div>
    </template>
  </a-transfer>
</template>

<script>
import { IconDelete } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconDelete },
  setup() {
    const data = Array(8)
      .fill(undefined)
      .map((_, index) => ({
        value: `option${index + 1}`,
        label: `Option ${index + 1}`,
      }));
    const value = ['option1', 'option3', 'option5'];

    const styleHeader = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    return {
      styleHeader,
      data,
      value,
    };
  },
};
</script>
```
