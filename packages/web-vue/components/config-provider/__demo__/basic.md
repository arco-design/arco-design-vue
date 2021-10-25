```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

设置国际化语言的基本用法。

---

## en-US

Set the basic usage of internationalized languages.

---

```vue
<template>
  <a-config-provider :locale="enUS">
    <a-pagination :total="50" show-total show-jumper show-page-size />
  </a-config-provider>
</template>

<script>
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';

export default {
  data() {
    return {
      enUS
    }
  }
}
</script>
```
