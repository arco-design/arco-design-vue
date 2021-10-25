```yaml
title:
  zh-CN: 预设时间快捷选择
  en-US: Shortcuts
```

## zh-CN

使用 `shortcuts` 可以预设时间快捷选择。

---

## en-US

Use `shortcuts` to preset time for quick selection.

---

```vue
<template>
  <a-date-picker
    style="width: 300px; margin-bottom: 24px; margin-right: 24px;"
    :shortcuts="[
      {
        label: '2 hours later',
        value: () => dayjs().add(2, 'hour')
      },
      {
        label: 'a week later',
        value: () => dayjs().add(1, 'week'),
      },
      {
        label: 'a month later',
        value: () => dayjs().add(1, 'month'),
      },
    ]"
    show-time
  />
  <a-month-picker
    style="width: 300px; margin-bottom: 24px; margin-right: 24px;"
    :shortcuts="[
      {
        label: 'last month',
        value: () => dayjs().subtract(1, 'month'),
      },
      {
        label: 'six months later',
        value: () => dayjs().add(6, 'month'),
      },
      {
        label: 'two years later',
        value: () => dayjs().add(2, 'year'),
      },
    ]"
  />
  <a-range-picker
    style="width: 400px; margin-bottom: 24px; margin-right: 24px;"
    :shortcuts="[
      {
        label: 'next 7 days',
        value: () => [dayjs(), dayjs().add(1, 'week')],
      },
      {
        label: 'next 30 days',
        value: () => [dayjs(), dayjs().add(1, 'month')],
      },
      {
        label: 'next 365 days',
        value: () => [dayjs(), dayjs().add(1, 'year')],
      },
    ]"
  />
  <a-range-picker
    mode="month"
    style="width: 300px; margin-bottom: 24px;"
    :shortcuts="[
      {
        label: 'next 6 months',
        value: () => [dayjs(), dayjs().add(6, 'month')],
      },
      {
        label: 'next 12 months',
        value: () => [dayjs(), dayjs().add(1, 'year')],
      },
      {
        label: 'next 10 years',
        value: () => [dayjs(), dayjs().add(10, 'year')],
      },
    ]"
  />
</template>
<script>
import dayjs from 'dayjs';
export default {
  setup() {
    return {
      dayjs
    }
  }
}
</script>
```
