```yaml
title:
  zh-CN: 自定义图片和文案
  en-US: Custom Image & Description
```

## zh-CN

通过 `image` 插槽自定义图标、图片，或通过内容修改文案。

---

## en-US

Customize icons and pictures through the `image` slot, or modify the text through the content.

---

```vue
<template>
  <a-empty>
    <template #image>
      <icon-exclamation-circle-fill />
    </template>
    No data, please reload!
  </a-empty>
</template>

<script>
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconExclamationCircleFill
  },
}
</script>
```
