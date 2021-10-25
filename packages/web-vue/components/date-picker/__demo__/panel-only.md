```yaml
title:
  zh-CN: 只使用面板
  en-US: Panel Only
```

## zh-CN

只用选择面板，不显示输入框。

---

## en-US

Only use panel, hide input selection.

---

```vue
<template>
  <div>
    <a-date-picker
      default-value="2019-06-03"
      v-model:pickerValue="pickerValue"
      hide-trigger
      style="width: 268px;"
    />
    <a-range-picker
      :default-value="['2019-08-01', '2020-06-01']"
      v-model:pickerValue="rangePickerValue"
      hide-trigger
      style="width: 560px; margin-top: 20px;"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerValue: null,
      rangePickerValue: null,
    };
  }
};
</script>
```
