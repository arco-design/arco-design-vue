```yaml
title:
  zh-CN: 不可选取的时间
  en-US: disabled date
```

## zh-CN

使用 `disabledDate` 可以禁用某些日期。使用 `disabledTime` 可以禁用时间，需要配合 `showTime` 使用。

---

## en-US

Use `disabledDate` to disable specified dates. And use `disabledTime` to disable time, which needs to be used with `showTime`.

---

```vue
<template>
  <div>
    <a-date-picker
      style="width: 200px; margin-right: 24px; margin-bottom: 24px;"
      :disabledDate="(current) => dayjs(current).isBefore(dayjs())"
    />
    <a-range-picker
      style="width: 360px; margin-right: 24px; margin-bottom: 24px;"
      :disabledDate="(current) => dayjs(current).isBefore(dayjs())"
    />
    <a-date-picker
      style="width: 200px; margin-right: 24px; margin-bottom: 24px;"
      show-time
      :disabledDate="(current) => dayjs(current).isBefore(dayjs())"
      :disabledTime="getDisabledTime"
    />
    <a-range-picker
      style="width: 360px; margin-bottom: 24px;"
      show-time
      :timePickerProps="{hideDisabledOptions: true}"
      :disabledDate="(current) => dayjs(current).isBefore(dayjs())"
      :disabledTime="getDisabledRangeTime"
    />
  </div>
</template>
<script>
import dayjs from 'dayjs';

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function getDisabledTime(date) {
  return {
    disabledHours: () => range(6, 24),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => range(30, 60),
  };
}

function getDisabledRangeTime(date, type) {
  return {
    disabledHours: () => type === 'start' ? range(0, 6): range(6, 24),
    disabledMinutes: () => type === 'end' ? range(0, 30) : [31, 60],
    disabledSeconds: () => range(30, 60),
  };
}

export default {
  setup() {
    return {
      dayjs,
      getDisabledTime,
      getDisabledRangeTime,
    }
  }
}
</script>
```
