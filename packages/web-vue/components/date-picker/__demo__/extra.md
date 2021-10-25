```yaml
title:
  zh-CN: 额外的页脚
  en-US: Extra footer
```

## zh-CN

在浮层中加入额外的页脚，以满足某些定制信息的需求。

---

## en-US

Add an extra footer to meet the needs of some customized information.

---

```vue
<template>
  <a-date-picker style="width: 200px; margin-bottom: 20px">
    <template #extra>Extra footer</template>
  </a-date-picker>
  <br />
  <a-range-picker showTime style="width: 360px;">
    <template #extra>Extra footer</template>
  </a-range-picker>
</template>
```
