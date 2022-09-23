```yaml
title:
  zh-CN: 小红点
  en-US: Red Badge
```

## zh-CN

设置 `dot`，即可只显示小红点而不显示数字。`count > 0` 时才显示。

---

## en-US

A red dot will be displayed instead of the count. The dot will be showed only when `count > 0`.

---

```vue
<template>
  <a-space :size="40">
    <a-badge :count="9" dot :offset="[6, -2]">
      <a href="#">Link</a>
    </a-badge>
    <a-badge :count="9" dot :offset="[2, -2]">
      <IconNotification
        :style="{ color: '#888', fontSize: '18px', verticalAlign: '-3px' }"
      />
    </a-badge>
  </a-space>
</template>

<script>
import { IconNotification } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconNotification },
};
</script>
```
