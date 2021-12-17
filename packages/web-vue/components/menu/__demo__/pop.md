```yaml
title:
  zh-CN: 悬浮菜单
  en-US: Floating Menu
```

## zh-CN

指定 `mode` 为 `pop` 可以使用悬浮菜单。

---

## en-US

Specify `mode` as `pop` to use floating menu.

---

```vue
<template>
  <div class="menu-demo">
    <a-menu mode="pop" showCollapseButton>
      <a-menu-item key="1">
        <template #icon><icon-apps></icon-apps></template>
        Navigation 1
      </a-menu-item>
      <a-sub-menu key="2">
        <template #icon><icon-bug></icon-bug></template>
        <template #title>Navigation 2</template>
        <a-menu-item key="2_0">Beijing</a-menu-item>
        <a-menu-item key="2_1">Shanghai</a-menu-item>
        <a-menu-item key="2_2">Guangzhou</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="3">
        <template #icon><icon-bulb></icon-bulb></template>
        <template #title>Navigation 3</template>
        <a-menu-item key="3_0">Wuhan</a-menu-item>
        <a-menu-item key="3_1">Chengdu</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="4">
        <template #icon><icon-safe></icon-safe></template>
        Navigation 4
      </a-menu-item>
      <a-menu-item key="5">
        <template #icon><icon-fire></icon-fire></template>
        Navigation 5
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import {
  IconApps,
  IconBug,
  IconBulb,
} from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconApps,
    IconBug,
    IconBulb,
  },
};
</script>
<style scoped>
.menu-demo {
  width: 100%;
  height: 600px;
  padding: 40px;
  box-sizing: border-box;
  background-color: var(--color-neutral-2);
}

.menu-demo .arco-menu {
  width: 200px;
  height: 100%;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.menu-demo .arco-menu :deep(.arco-menu-collapse-button) {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.menu-demo .arco-menu:not(.arco-menu-collapsed) :deep(.arco-menu-collapse-button) {
  right: 0;
  bottom: 8px;
  transform: translateX(50%);
}

.menu-demo .arco-menu:not(.arco-menu-collapsed)::before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 48px;
  height: 48px;
  background-color: inherit;
  border-radius: 50%;
  box-shadow: -4px 0 2px var(--color-bg-2), 0 0 1px rgba(0, 0, 0, 0.3);
  transform: translateX(50%);
}

.menu-demo .arco-menu.arco-menu-collapsed {
  width: 48px;
  height: auto;
  padding-top: 24px;
  padding-bottom: 138px;
  border-radius: 22px;
}

.menu-demo .arco-menu.arco-menu-collapsed :deep(.arco-menu-collapse-button) {
  right: 8px;
  bottom: 8px;
}
</style>
```
