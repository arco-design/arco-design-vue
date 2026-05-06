```yaml
title:
  zh-CN: 动态控制选取范围
  en-US: Dynamic control range
```

## zh-CN

根据选择的值来控制选取的范围，使用 `onSelect` 配合 `disabledDate` 来实现。

---

## en-US

According to the selected value to control the selected range, use `onSelect` and `disabledDate`.

---

```vue
<template>
  <a-range-picker
    style="width: 300px;"
    @select="handleSelect"
    @popupVisibleChange="handlePopupVisibleChange"
    :disabledDate="disabledDate"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
const dates = ref<Date[]>([]);
const handleSelect = (_str: string[], value: Date[]) => {
  dates.value = value;
};
const handlePopupVisibleChange = (visible: boolean) => {
  if (!visible) {
    dates.value = [];
  }
};
const disabledDate = (current: Date) => {
  const range = dates.value;
  if (range.length) {
    const tooLate = range[0] && Math.abs((+current - +range[0]) / (24 * 60 * 60 * 1000)) > 7;
    const tooEarly = range[1] && Math.abs((+current - +range[1]) / (24 * 60 * 60 * 1000)) > 7;
    return tooEarly || tooLate;
  }
  return false;
};
</script>
```
