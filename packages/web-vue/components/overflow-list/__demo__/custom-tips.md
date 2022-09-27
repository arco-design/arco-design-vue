```yaml
title:
  zh-CN: 自定义溢出提示
  en-US: Custom overflow tips
```

## zh-CN

使用 `overflow` 插槽，设置自定义溢出元素。

---

## en-US

Use the `overflow` slot to set custom overflow elements.

---

```vue
<template>
  <a-slider v-model="width" :min="0" :max="800" />
  <div :style="{ maxWidth:`${width}px`, width: '100%', marginTop: '20px'}">
    <a-overflow-list :min="4">
      <a-avatar
        v-for="avatar of avatars"
        :key="avatar.char"
        :size="30"
        :style="{ backgroundColor: avatar.bg }"
      >
        {{avatar.char}}
      </a-avatar>
      <template #overflow="{ number }">
        <a-button type="primary" size="mini">More: {{number}}</a-button>
      </template>
    </a-overflow-list>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  setup() {
    const width = ref(500);
    const avatars = computed(() => Array.from({ length: 26 }, (_, idx) => ({
      char: String.fromCharCode(idx + 65),
      bg: `hsl(${idx * 13}deg 80% 50%)`
    })));

    return {
      width,
      avatars
    }
  }
}
</script>
```
