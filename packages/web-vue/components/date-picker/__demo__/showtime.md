```yaml
title:
  zh-CN: 带时间的日期选择
  en-US: DatePicker showTime
```

## zh-CN

使用 `showTime` 可以使用带时间的日期选择。

---

## en-US

Use `showTime` to select a date with time.

---

```vue
<template>
  <a-date-picker
    style="width: 220px; margin: 0 24px 24px 0;"
    show-time
    :time-picker-props="{ defaultValue: '09:09:06' }"
    format="YYYY-MM-DD HH:mm:ss"
    @change="handleChange"
    @select="handleSelect"
    @ok="handleOk"
  />
  <a-date-picker
    style="width: 220px; margin: 0 24px 24px 0;"
    show-time
    format="YYYY-MM-DD hh:mm"
    @change="handleChange"
    @select="handleSelect"
    @ok="handleOk"
  />
  <a-range-picker
    style="width: 360px; margin: 0 24px 24px 0;"
    show-time
    :time-picker-props="{ defaultValue: ['00:00:00', '09:09:06'] }"
    format="YYYY-MM-DD HH:mm"
    @change="handleChange"
    @select="handleSelect"
    @ok="handleOk"
  />
</template>
<script setup lang="ts">
function handleSelect(dateString, date) {
  console.log('handleSelect', dateString, date);
}

function handleChange(dateString, date) {
  console.log('handleChange: ', dateString, date);
}

function handleOk(dateString, date) {
  console.log('handleOk: ', dateString, date);
}
</script>
```
