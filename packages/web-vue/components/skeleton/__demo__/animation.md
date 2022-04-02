```yaml
title:
  zh-CN: 动画
  en-US: Animation
```

## zh-CN

通过设置 `animation` 属性，让骨架屏显示动画效果。

---

## en-US

By setting the `animation` property, the skeleton screen can display the animation effect.

---

```vue
<template>
  <a-space direction="vertical" size="large" :style="{width:'100%'}">
    <a-space>
      <span>Animation</span>
      <a-switch v-model="animation" />
    </a-space>
    <a-skeleton :animation="animation">
      <a-space direction="vertical" :style="{width:'100%'}" size="large">
        <a-skeleton-line :rows="3" />
        <a-skeleton-shape />
      </a-space>
    </a-skeleton>
  </a-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const animation = ref(true);

    return {
      animation
    }
  },
}
</script>
```
