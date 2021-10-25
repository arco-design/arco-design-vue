```yaml
title:
  zh-CN: 禁用状态
  en-US: Disabled
```

## zh-CN

禁用开关。

---

## en-US

Disable the switch.

---

```vue
<template>
  <a-space size="large">
    <a-switch disabled/>
    <a-switch :default-checked="true" disabled/>
    <a-switch type="round" disabled/>
    <a-switch :default-checked="true" type="round" disabled/>
    <a-switch type="line" disabled/>
    <a-switch :default-checked="true" type="line" disabled/>
  </a-space>
</template>
```
