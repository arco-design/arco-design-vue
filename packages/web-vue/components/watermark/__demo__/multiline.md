```yaml
title:
  zh-CN: 多行文本
  en-US: Multiline Text
```

## zh-CN

通过 content 设置字符串数组可指定多行文字水印内容。

---

## en-US

Multi-line text watermarks can be specified with the content set string array.

---

```vue
<template>
  <a-watermark :content="['arco.design',dayjs().format('YYYY-MM-DD')]">
    <div style="width: 100%; height: 300px;" />
  </a-watermark>
</template>
<script>
import dayjs from 'dayjs';

export default {
  setup() {
    return {
      dayjs,
    }
  }
}
</script>
```
