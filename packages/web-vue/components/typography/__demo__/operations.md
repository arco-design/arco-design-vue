```yaml
title:
  zh-CN: 可交互
  en-US: Interactive
```

## zh-CN

提供复制、编辑文本等功能。

注意：如果启用了按需引入，请手动引入 `@arco-design/web-vue/es/tooltip/style/css`。

---

## en-US

Provide functions such as copying and editing text.

Note: If On-demand Import is enabled, please manually import `@arco-design/web-vue/es/tooltip/style/css`.

---

```vue
<template>
  <a-typography>
    <a-typography-paragraph copyable>
      Click the icon to copy this text.
    </a-typography-paragraph>
    <a-typography-paragraph
      editable
      v-model:editText="str"
    >
      {{str}}
    </a-typography-paragraph>
  </a-typography>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const str = ref('Click the icon to edit this text.');
    return {
      str,
    }
  }
});
</script>
```

