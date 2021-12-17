```yaml
title:
  zh-CN: 内嵌菜单
  en-US: Sub Menu
```

## zh-CN

菜单内可以嵌入多个子项，通过 `openKeys` 可以设置默认打开的子项。

---

## en-US

Multiple sub-items can be embedded in the menu, and the items that are opened by default can be set through `openKeys`.

---

```vue
<template>
  <div class="menu-demo">
    <a-menu
      :style="{ width: '200px', height: '100%' }"
      :default-open-keys="['0']"
      :default-selected-keys="['0_1']"
      show-collapse-button
    >
    <a-menu-item key="0_0_0" data-obj="1">Menu 1</a-menu-item>
      <a-sub-menu key="0">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>Navigation 1</template>
        <a-menu-item key="0_0">Menu 1</a-menu-item>
        <a-menu-item key="0_1">Menu 2</a-menu-item>
        <a-menu-item key="0_2" disabled>Menu 3</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="1">
        <template #icon><icon-bug></icon-bug></template>
        <template #title>Navigation 2</template>
        <a-menu-item key="1_0">Menu 1</a-menu-item>
        <a-menu-item key="1_1">Menu 2</a-menu-item>
        <a-menu-item key="1_2">Menu 3</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="2">
        <template #icon><icon-bulb></icon-bulb></template>
        <template #title>Navigation 3</template>
        <a-menu-item-group title="Menu Group 1">
          <a-menu-item key="2_0">Menu 1</a-menu-item>
          <a-menu-item key="2_1">Menu 2</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Menu Group 2">
          <a-menu-item key="2_2">Menu 3</a-menu-item>
          <a-menu-item key="2_3">Menu 4</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
} from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconMenuFold,
    IconMenuUnfold,
    IconApps,
    IconBug,
    IconBulb,
  },
};
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  height: 600px;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>
```
