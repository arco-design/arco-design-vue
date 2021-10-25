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
    @select="onSelect"
    @change="onChange"
    :style="style"
  />
  <a-date-picker
    defaultValue="2019-06-03"
    :format="(value) => `custom format: ${dayjs(value).format('YYYY-MM-DD')}`"
    @select="onSelect"
    @change="onChange"
    :style="{ ...style, width: '240px' }"
  />
  <a-date-picker
    showTime
    defaultValue="2019-06-03 08:00:00"
    @select="onSelect"
    @change="onChange"
    :style="style"
  />
  <a-year-picker
    defaultValue="2019"
    @select="onSelect"
    @change="onChange"
    :style="style"
  />
  <a-month-picker
    defaultValue="2019-06"
    @select="onSelect"
    @change="onChange"
    :style="style"
  />
  <a-week-picker
    :defaultValue="dayjs('2019-08-02')"
    @select="onSelect"
    @change="onChange"
    :style="style"
  />
  <a-range-picker
    showTime
    :defaultValue="['2019-08-08 00:00:00', '2019-08-18 00:00:00']"
    @select="onSelect"
    @change="onChange"
    :style="{ ...style, width: '360px' }"
  />
  <a-range-picker
    mode="month"
    :defaultValue="['2019-08', '2020-06']"
    @select="onSelect"
    @change="onChange"
    style="width: 300px; marginBottom: 24px;"
  />
</template>
<script>
import dayjs from 'dayjs';

export default {
  setup() {
    return {
      dayjs,
      onSelect(dateString, date) {
        console.log('onSelect', dateString, date);
      },
      onChange(dateString, date) {
        console.log('onChange: ', dateString, date);
      },
      style: { width: '200px', marginBottom: '24px', marginRight: '24px' }
    }
  }
}
</script>
```
