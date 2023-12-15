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
  <a-verification-code defaultValue="123" style="width: 300px"  masked @finish="onFinish" />
</template>

<script setup>
import { Message} from '@arco-design/web-vue';

const onFinish = (value) => Message.info(`Verification code: ${value}`);
</script>
```
