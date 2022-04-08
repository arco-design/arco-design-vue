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
    @change="onChange"
    @select="onSelect"
    @ok="onOk"
  />
  <a-date-picker
    style="width: 220px; margin: 0 24px 24px 0;"
    show-time
    format="YYYY-MM-DD hh:mm"
    @change="onChange"
    @select="onSelect"
    @ok="onOk"
  />
  <a-range-picker
    style="width: 360px; margin: 0 24px 24px 0;"
    show-time
    :time-picker-props="{ defaultValue: ['00:00:00', '09:09:06'] }"
    format="YYYY-MM-DD HH:mm"
    @change="onChange"
    @select="onSelect"
    @ok="onOk"
  />
</template>
<script>
export default {
  setup() {
    function onSelect(dateString, date) {
      console.log('onSelect', dateString, date);
    }

    function onChange(dateString, date) {
      console.log('onChange: ', dateString, date);
    }

    function onOk(dateString, date) {
      console.log('onOk: ', dateString, date);
    }
    return {
      onSelect,
      onChange,
      onOk,
    };
  }
}
</script>
```
