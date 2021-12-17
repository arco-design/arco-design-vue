```yaml
title:
  zh-CN: 不同大小菜单
  en-US: Custom Size
```

## zh-CN

通过 `style` 自由指定菜单的宽度和菜单项的高度。

---

## en-US

Freely specify width of menu and height of menu item through `style`.

---

```vue
<template>
  <div class="menu-demo">
    <a-slider
      :style="{ width: '320px', marginBottom: '24px' }"
      v-model="width"
      :step="10"
      :min="160"
      :max="400"
    />
    <a-menu
      showCollapseButton
      :default-open-keys="['0']"
      :default-selected-keys="['0_1']"
      :style="{ width: `${width}px`, height: 'calc(100% - 28px)' }"
    >
      <a-sub-menu key="0">
        <template #icon><IconApps></IconApps></template>
        <template #title>Navigation 1</template>
        <a-menu-item key="0_0">Menu 1</a-menu-item>
        <a-menu-item key="0_1">Menu 2</a-menu-item>
        <a-menu-item key="0_2" disabled>
          Menu 3
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="1">
        <template #icon><IconBug></IconBug></template>
        <template #title>Navigation 2</template>
        <a-menu-item key="1_0">Menu 1</a-menu-item>
        <a-menu-item key="1_1">Menu 2</a-menu-item>
        <a-menu-item key="1_2">Menu 3</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="2">
        <template #icon><IconBulb></IconBulb></template>
        <template #title>Navigation 3</template>
        <a-menu-item key="2_0">Menu 1</a-menu-item>
        <a-menu-item key="2_1">Menu 2</a-menu-item>
        <a-menu-item key="2_2">Menu 3</a-menu-item>
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
  data() {
    return {
      width: 240
    }
  }
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
