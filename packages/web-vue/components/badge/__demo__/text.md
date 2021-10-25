```yaml
title:
  zh-CN: 文本内容
  en-US: Text
```

## zh-CN

设置 `text`，可设置自定义提示内容。

---

## en-US

Customize the content.

---

```vue
<template>
  <a-space :size="40">
    <a-badge text="NEW">
      <a-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </a-avatar>
    </a-badge>
    <a-badge text="HOT">
      <a-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </a-avatar>
    </a-badge>
  </a-space>
</template>

<script>
import { IconUser } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconUser },
};
</script>
```
