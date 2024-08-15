```yaml
title:
  zh-CN: 颜色格式
  en-US: Color format
```

## zh-CN

通过 `format` 设置颜色值的格式，支持 `hex` 和 `rgb`。

---

## en-US

Set the format of the color value through `format`, supporting `hex` and `rgb`.

---

```vue
<template>
  <a-space direction="vertical">
    <a-radio-group type="button" v-model="format">
      <a-radio v-for="item in formatList" :value="item">{{item}}</a-radio>
    </a-radio-group>
    <a-color-picker defaultValue="#165DFF" :format="format" showText />
  </a-space>
</template>

<script setup>
import { ref } from 'vue';

const format = ref('hex')
const formatList = ['hex', 'rgb']
</script>
```
