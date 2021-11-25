```yaml
title:
  zh-CN: 定制格式
  en-US: Custom format
```

## zh-CN

通过设置 `format`，可以定制需要显示的时、分、秒。

---

## en-US

By setting `format`, you can customize the hour, minute, and second.

---

```vue
<template>
  <a-time-picker format="HH:mm" :defaultValue="defaultValue" style="width: 130px;" />
</template>
<script>
export default {
  data() {
    return {
      defaultValue: '09:24'
    }
  }
}
</script>
```
