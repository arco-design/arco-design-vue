```yaml
title:
  zh-CN: 输入框状态
  en-US: Status
```

## zh-CN

输入框有禁用和错误两种状态。

---

## en-US

The input box has two states: disabled and error.

---

```vue
<template>
  <a-space>
    <a-input-tag :style="{width:'320px'}" placeholder="Please Enter" disabled/>
    <a-input-tag :style="{width:'320px'}" placeholder="Please Enter" error/>
  </a-space>
</template>
```
