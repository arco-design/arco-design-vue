```yaml
title:
  zh-CN: 自定义分隔符
  en-US: Custom separator
```

## zh-CN

指定 `separator` 可以自定义渲染分隔符。

---

## en-US

Specify `separator` to customize the rendering separator

---

```vue
<template>
  <a-verification-code
    style="width: 400px"
    :length="9"
    :separator="(index) => (index + 1) % 3 || index > 7 ? null : '-'"
    @finish="(value) => Message.info(`Verification code: ${value}`)"
  />
</template>

<script setup>
import { Message} from '@arco-design/web-vue';
</script>
```
