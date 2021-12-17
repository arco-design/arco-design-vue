```yaml
title:
  zh-CN: 输入框状态
  en-US: Status
```

## zh-CN

输入框有禁用、只读和错误三种状态。

---

## en-US

The input box has three states: disabled, readonly and error.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input-tag :default-value="['test']" :style="{width:'320px'}" placeholder="Please Enter" disabled/>
    <a-input-tag :default-value="['test']" :style="{width:'320px'}" placeholder="Please Enter" readonly/>
    <a-input-tag :default-value="['test']" :style="{width:'320px'}" placeholder="Please Enter" error/>
  </a-space>
</template>
```
