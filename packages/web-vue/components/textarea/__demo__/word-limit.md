```yaml
title:
  zh-CN: 字数统计
  en-US: Word Limit
```

## zh-CN

设置 `max-length` 可以限制最大字数，配合 `show-word-limit` 可以显示字数统计。

---

## en-US

Set `max-length` to limit the maximum number of words, and use `show-word-limit` to display word count statistics.

---

```vue
<template>
  <a-space direction="vertical" size="large" fill>
    <a-textarea placeholder="Please enter something" :max-length="10" allow-clear show-word-limit />
    <a-textarea placeholder="Please enter something" :max-length="{length:10,errorOnly:true}" allow-clear
                show-word-limit />
  </a-space>
</template>
```
