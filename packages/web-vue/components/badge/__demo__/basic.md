```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

基本用法。只需指定 `count`或者 `content slot`，即可显示徽标。

---

## en-US

Basic usage. Just specify `count` or `content slot` to display the badge.

---

```vue
<template>
  <a-space :size="40">
    <a-badge :count="9">
      <a-avatar shape="square" />
    </a-badge>
    <a-badge :count="9" dot :dotStyle="{ width: '10px', height: '10px' }">
      <a-avatar shape="square" />
    </a-badge>
    <a-badge :dotStyle="{ height: '16px', width: '16px', fontSize: '14px' }">
      <template #content>
        <IconClockCircle
          :style="{ verticalAlign: 'middle', color: 'var(--color-text-2)' }"
        />
      </template>
      <a-avatar shape="square" />
    </a-badge>
  </a-space>
</template>

<script>
import { IconClockCircle } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconClockCircle },
};
</script>
```
