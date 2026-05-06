```yaml
title:
  zh-CN: 密码模式
  en-US: Masked
```

## zh-CN

指定 `masked = true`可开启密码模式

---

## en-US

Use `masked = true` to turn on password mode

---

```vue
<template>
  <a-verification-code
    defaultValue="123"
    style="width: 300px"
    masked
    @finish="handleFinish"
  />
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';

const handleFinish = (value) => Message.info(`Verification code: ${value}`);
</script>
```
