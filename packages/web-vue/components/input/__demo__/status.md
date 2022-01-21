```yaml
title:
  zh-CN: 输入框状态
  en-US: Status
```

## zh-CN

输入框可以设置禁用和错误状态。

---

## en-US

The input box can be set to disable and error status.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-input :style="{width:'320px'}" placeholder="Disabled status" disabled/>
    <a-input :style="{width:'320px'}" default-value="Disabled" placeholder="Disabled status" disabled/>
    <a-input :style="{width:'320px'}" placeholder="Error status" error/>
  </a-space>
</template>
```
