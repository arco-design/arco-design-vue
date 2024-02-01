```yaml
title:
  zh-CN: 预设颜色和历史颜色
  en-US: Preset & History
```

## zh-CN

通过 `showPreset` 和 `showHistory` 开启预设颜色和历史颜色区域。历史颜色需要用户自行控制展示内容。

---

## en-US

The preset color and history color areas can be opened through `showPreset` and `showHistory`. Historical colors require users to control the display content themselves.

---

```vue
<template>
  <a-color-picker
    defaultValue="#165DFF"
    :historyColors="history"
    showHistory
    showPreset
    @popup-visible-change="addHistory"
  />
</template>

<script setup>
import { ref } from 'vue';

const history = ref(['#165DFF'])
const addHistory = (visible, color) => {
  if (!visible) {
    const index = history.value.indexOf(color);
    if (index !== -1) {
      history.value.splice(index, 1);
    }
    history.value.unshift(color);
  }
}
</script>
```
