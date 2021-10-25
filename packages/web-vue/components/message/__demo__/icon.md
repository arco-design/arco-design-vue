```yaml
title:
  zh-CN: 自定义图标
  en-US: Custom icon
```

## zh-CN

设置 `icon` 来自定义图标。

---

## en-US

Set `icon` to customize the icon.

---

```vue
<template>
  <a-button @click="handleClick">Info Message</a-button>
</template>

<script>
import { h } from 'vue';
import { IconFaceSmileFill } from '@arco-design/web-vue/es/icon';

export default {
  methods: {
    handleClick() {
      this.$message.info({
        content: 'This is an info message!',
        icon: () => h(IconFaceSmileFill)
      });
    }
  }
}
</script>
```
