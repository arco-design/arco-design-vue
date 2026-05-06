```yaml
title:
  zh-CN: 基本使用
  en-US: Basic Usage
```

## zh-CN

验证码输入框的基本用法。

---

## en-US

Basic usage

---

```vue
<template>
  <a-verification-code
    v-model="value"
    style="width: 300px"
    @finish="handleFinish"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';

const value = ref('654321');
const handleFinish = (value) => Message.info(`Verification code: ${value}`);
</script>
```
