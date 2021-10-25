```yaml
title:
  zh-CN: 默认值
  en-US: defaultValue
```

## zh-CN

只有默认值的情况，可通过 `defaultValue` 传递。

---

## en-US

The default value can be passed through `defaultValue`

---

```vue
<template>
  <a-time-picker
    defaultValue="18:24:23"
    style="width: 194px; marginRight: 24px; marginBottom: 24px"
  />
  <a-time-picker
    type="time-range"
    :defaultValue="['09:24:53', '18:44:33']"
    style="width: 252px; marginBottom: 24px"
  />
</template>
```
