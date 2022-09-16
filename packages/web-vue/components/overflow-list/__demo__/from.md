```yaml
title:
  zh-CN: 折叠方向
  en-US: Overflow From
```

## zh-CN

通过 `from` 属性可以设置折叠的方向。

---

## en-US

The folding direction can be set via the `from` property.

---

```vue
<template>
  <a-form auto-label-width>
    <a-form-item label="Tag Number">
      <a-input-number v-model="number" :min="0" :max="20" style="width: 200px"/>
    </a-form-item>
    <a-form-item label="List Width">
      <a-slider v-model="width" :min="0" :max="800" />
    </a-form-item>
  </a-form>
  <div :style="{width:`${width}px`,marginTop:'20px'}">
    <a-overflow-list from="start">
      <div>DIV Element</div>
      <a-tag v-for="item of tags" :key="item">Tag{{item}}</a-tag>
    </a-overflow-list>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  setup() {
    const width = ref(500);
    const number = ref(10);
    const tags = computed(() => Array.from({length: number.value}, (_, idx) => idx + 1));

    return {
      width,
      number,
      tags
    }
  }
}
</script>
```
