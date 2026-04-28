```yaml
title:
  zh-CN: 卡片日历
  en-US: Card Calendar
```

## zh-CN

设置 `panel`，可以使用卡片日历。

---

## en-US

Use `panel` to display date in card format.

---

```vue
<template>
  <a-space align="start">
    <a-calendar
      panel
      :default-value="new Date('2020-04-01')"
      panel-today-btn
      style="margin-right: 50px"
    />
    <a-calendar panel :default-value="new Date('2020-03-01')" mode="year" />
  </a-space>
</template>
```
