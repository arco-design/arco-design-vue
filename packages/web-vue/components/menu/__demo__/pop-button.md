```yaml
title:
  zh-CN: 悬浮按钮菜单
  en-US: Floating Button Menu
```

## zh-CN

指定 `mode` 为 `popButton` 使用按钮组样式的悬浮菜单。

---

## en-US

By setting `mode` to `popButton`, you can use a button group style floating menu.

---

```vue
<template>
  <div class="menu-demo">
    <a-trigger
      :trigger="['click', 'hover']"
      clickToClose
      position="top"
      v-model:popupVisible="popupVisible1"
    >
      <div :class="`button-trigger ${popupVisible1 ? 'button-trigger-active' : ''}`">
        <IconClose v-if="popupVisible1" />
        <IconMessage v-else />
      </div>
      <template #content>
        <a-menu
          :style="{ marginBottom: '-4px' }"
          mode="popButton"
          :tooltipProps="{ position: 'left' }"
          showCollapseButton
        >
          <a-menu-item key="1">
            <template #icon><IconBug></IconBug></template>
            Bugs
          </a-menu-item>
          <a-menu-item key="2">
            <template #icon><IconBulb></IconBulb></template>
            Ideas
          </a-menu-item>
        </a-menu>
      </template>
    </a-trigger>

    <a-trigger
      :trigger="['click', 'hover']"
      clickToClose
      position="top"
      v-model:popupVisible="popupVisible2"
    >
      <div :class="`button-trigger ${popupVisible2 ? 'button-trigger-active' : ''}`">
        <IconClose v-if="popupVisible2" />
        <IconMessage v-else />
      </div>
      <template #content>
        <a-menu
          :style="{ marginBottom: '-4px' }"
          mode="popButton"
          :tooltipProps="{ position: 'left' }"
          showCollapseButton
        >
          <a-menu-item key="1">
            <template #icon><IconBug></IconBug></template>
            Bugs
          </a-menu-item>
          <a-menu-item key="2">
            <template #icon><IconBulb></IconBulb></template>
            Ideas
          </a-menu-item>
        </a-menu>
      </template>
    </a-trigger>
  </div>
</template>
<script>
import {
  IconBug,
  IconBulb,
  IconClose,
  IconMessage,
} from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconBug,
    IconBulb,
    IconClose,
    IconMessage,
  },
  data() {
    return {
      popupVisible1: false,
      popupVisible2: false,
    };
  }
};
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 660px;
  height: 300px;
  padding: 40px;
  background-color: var(--color-fill-2);
  position: relative;
}
.button-trigger {
  position: absolute;
  bottom: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-white);
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s;
}
/* button left */
.button-trigger:nth-child(1) {
  left: 150px;
  background-color: var(--color-neutral-5);
}
.button-trigger:nth-child(1).button-trigger-active {
  background-color: var(--color-neutral-4);
}
/* button right */
.button-trigger:nth-child(2) {
  left: 372px;
  background-color: rgb(var(--arcoblue-6));
}
.button-trigger:nth-child(3).button-trigger-active {
  background-color: var(--color-primary-light-4);
}
</style>
```
