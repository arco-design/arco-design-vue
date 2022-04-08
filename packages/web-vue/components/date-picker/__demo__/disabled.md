```yaml
title:
  zh-CN: 禁用
  en-US: Disabled
```

## zh-CN

禁用状态。

---

## en-US

Disabled.

---

```vue
<template>
  <a-date-picker
    defaultValue="2020-08-08"
    disabled
    style="width: 200px; margin-bottom: 20px;"
  />
  <br />
  <a-range-picker
    :defaultValue="['2020-08-08', '2020-08-18']"
    disabled
    style="width: 300px; margin-bottom: 20px;"
  />
  <br />
  <a-range-picker
    :defaultValue="['2020-08-08']"
    :disabled="[true, false]"
    :disabledDate="(current) => dayjs(current).isBefore(dayjs('2020-08-08'))"
    style="width: 300px; margin-bottom: 20px;"
  />
  <br />
  <a-range-picker
    showTime
    :defaultValue="['2020-08-08 02:02:02']"
    :disabled="[true, false]"
    style="width: 380px;"
  />
</template>
<script>
import dayjs from 'dayjs';
export default {
  setup() {
    return {
      dayjs
    };
  }
}
</script>
```
