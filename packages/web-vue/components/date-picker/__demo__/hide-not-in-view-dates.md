```yaml
title:
  zh-CN: 隐藏灰色日期
  en-US: Hide out-of-view dates
```

## zh-CN

通过 `hide-not-in-view-dates` 隐藏面板里不在当前月份的灰色日期。

---

## en-US

Use `hide-not-in-view-dates` to hide gray dates outside the current month.

---

```vue
<template>
  <a-space direction="vertical">
    <a-space>
      <a-date-picker style="width: 260px" />
      <a-date-picker style="width: 260px" hide-not-in-view-dates />
    </a-space>
    <a-space>
      <a-range-picker style="width: 360px" />
      <a-range-picker style="width: 360px" hide-not-in-view-dates />
    </a-space>
  </a-space>
</template>
```
