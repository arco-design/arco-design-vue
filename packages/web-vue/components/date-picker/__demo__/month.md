```yaml
title:
  zh-CN: 月份选择器
  en-US: MonthPicker
```

## zh-CN

月份输入器的基础使用。

---

## en-US

The basic usage of MonthPicker.

---

```vue
<template>
  <a-month-picker style="width: 200px;" :disabledMonth="handle"/>
</template>
<script setup>
const handle = (v) =>{
  if(v.getMonth() === 1 && v.getFullYear() === 2022){
    return true
  }
  return false
}
</script>
```
