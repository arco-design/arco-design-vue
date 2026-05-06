```yaml
title:
  zh-CN: 默认值
  en-US: defaultValue
```

## zh-CN

日期输入器有默认值的情况。

---

## en-US

DatePicker has a default value.

---

```vue
<template>
  <a-date-picker
    defaultValue="2019-06-03"
    :style="style"
  />
  <a-date-picker
    defaultValue="2019-06-03"
    :format="(value) => `custom format: ${dayjs(value).format('YYYY-MM-DD')}`"
    :style="{ ...style, width: '240px' }"
  />
  <a-date-picker
    showTime
    defaultValue="2019-06-03 08:00:00"
    :style="style"
  />
  <a-year-picker
    defaultValue="2019"
    :style="style"
  />
  <a-month-picker
    defaultValue="2019-06"
    :style="style"
  />
  <a-week-picker
    :defaultValue="dayjs('2019-08-02')"
    :style="style"
  />
  <a-range-picker
    showTime
    :defaultValue="['2019-08-08 00:00:00', '2019-08-18 00:00:00']"
    :style="{ ...style, width: '360px' }"
  />
  <a-range-picker
    mode="month"
    style="width: 300px; marginBottom: 24px;"
    :defaultValue="['2019-08', '2020-06']"
  />
</template>
<script setup lang="ts">
import dayjs from 'dayjs';

const style = {
  width: '300px',
  marginBottom: '24px',
};
</script>
```
