```yaml
title:
  zh-CN: 自定义面板渲染
  en-US: Panel render
```

## zh-CN

通过 `panel-render` 自定义面板外层结构。

---

## en-US

Customize the panel wrapper with `panel-render`.

---

```vue
<template>
  <a-space direction="vertical">
    <a-date-picker style="width: 280px" :panel-render="panelRender" />
    <a-range-picker style="width: 360px" :panel-render="panelRender" />
  </a-space>
</template>

<script setup lang="ts">
import { h } from 'vue';

const panelRender = (panelNode) =>
  h('div', { class: 'picker-panel-render-wrapper' }, [
    panelNode,
    h(
      'div',
      {
        style:
          'padding: 8px 12px; border-top: 1px solid var(--color-neutral-3); color: var(--color-text-2);',
      },
      'Custom panel footer'
    ),
  ]);
</script>
```
