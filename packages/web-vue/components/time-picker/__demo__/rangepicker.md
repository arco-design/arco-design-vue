```yaml
title:
  zh-CN: 范围选择器
  en-US: RangePicker
```

## zh-CN

时间输入器的范围选择器。

---

## en-US

Select time range.

---

```vue
<template>
  <a-time-picker
    type="time-range"
    @select="(valueString, value) => print('onSelect:', valueString, value)"
    @change="(valueString, value) => print('onChange:', valueString, value)"
    style="width: 252px;" />
</template>
<script>
  export default {
    methods: {
      print(...arg) {
        console.log(...arg);
      }
    }
  }
</script>
```
