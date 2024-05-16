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
      @select="onSelect"
      @popupVisibleChange="onPopupVisibleChange"
      :disabledDate="disabledDate"
    />
</template>

<script setup>
import { ref } from 'vue';

const dates = ref([]);

function onSelect(valueString, value) {
  dates.value = value;
}
function onPopupVisibleChange(visible) {
  if (!visible) {
    dates.value = [];
  }
}
function disabledDate(current) {
  const _dates = dates.value;
  if (_dates && _dates.length) {
    const tooLate = _dates[0] && Math.abs((new Date(current) - _dates[0]) / (24 * 60 * 60 * 1000)) > 7;
    const tooEarly = _dates[1] && Math.abs((new Date(current) - _dates[1]) / (24 * 60 * 60 * 1000)) > 7;
    return tooEarly || tooLate;
  }
  return false;
}
</script>
```
