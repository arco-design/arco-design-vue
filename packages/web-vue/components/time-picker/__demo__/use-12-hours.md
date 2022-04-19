```yaml
title:
  zh-CN: 十二小时制
  en-US: 12 hours
```

## zh-CN

通过设置 `use12Hours`，可以定制需要显示的时、分、秒。

---

## en-US

By setting `use12Hours`, you can customize the hours, minutes, and seconds.

---

```vue
<template>
  <a-time-picker
    use12Hours
    defaultValue="12:20:20 AM"
    format="hh:mm:ss A"
    style="width: 194px; margin: 0 24px 24px 0;"
  />
  <a-time-picker
    use12Hours
    defaultValue="09:20:20 pm"
    format="hh:mm:ss a"
    style="width: 194px; margin: 0 24px 24px 0;"
  />
  <a-time-picker
    use12Hours
    defaultValue="2:20 AM"
    format="h:mm A"
    style="width: 194px; margin: 0 24px 24px 0;"
  />
  <a-time-picker
    type="time-range"
    use12Hours
    :defaultValue="['12:20:20 AM', '08:30:30 PM']"
    format="hh:mm:ss A"
    style="width: 300px; margin: 0 24px 24px 0;"
  />
</template>
```
