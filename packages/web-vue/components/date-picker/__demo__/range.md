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
    @change="onChange"
    @select="onSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <a-range-picker
    mode="week"
    @change="onChange"
    @select="onSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <a-range-picker
    mode="month"
    @change="onChange"
    @select="onSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <a-range-picker
    mode="year"
    @change="onChange"
    @select="onSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <a-range-picker
    mode="quarter"
    @change="onChange"
    @select="onSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <a-range-picker
    showTime
    :time-picker-props="{
    defaultValue:['00:00:00','00:00:00']
    }"
    @change="onChange"
    @select="onSelect"
    style=" width: 380px; "
  />
</template>
<script>
export default {
  setup() {
    return {
      onSelect(dateString, date) {
        console.log('onSelect', dateString, date);
      },
      onChange(dateString, date) {
        console.log('onChange: ', dateString, date);
      },
    };
  },
}
</script>
```
