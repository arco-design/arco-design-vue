```yaml
title:
  zh-CN: 范围选择器
  en-US: RangePicker
```

## zh-CN

范围输入器的基础使用。

---

## en-US

The basic usage of RangePicker.

---

```vue
<template>
  <a-range-picker
    @change="handleChange"
    @select="handleSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <a-range-picker
    mode="week"
    @change="handleChange"
    @select="handleSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <a-range-picker
    mode="month"
    @change="handleChange"
    @select="handleSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <a-range-picker
    mode="year"
    @change="handleChange"
    @select="handleSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <a-range-picker
    mode="quarter"
    @change="handleChange"
    @select="handleSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <a-range-picker
    showTime
    :time-picker-props="{
      defaultValue: ['00:00:00', '00:00:00'],
    }"
    @change="handleChange"
    @select="handleSelect"
    style=" width: 380px; "
  />
</template>
<script setup lang="ts">
import { RangePicker } from '@arco-design/web-vue';

type OnChange = NonNullable<InstanceType<typeof RangePicker>['$props']['onChange']>;
type OnSelect = NonNullable<InstanceType<typeof RangePicker>['$props']['onSelect']>;

const handleChange: OnChange = (value, date, dateString) => {
  console.log('handleChange', value, date, dateString);
};
const handleSelect: OnSelect = (value, date, dateString) => {
  console.log('handleSelect', value, date, dateString);
};
</script>
```
