<template>
  <div class="menu-demo">
    <sd-menu mode="pop" showCollapseButton>
      <sd-menu-item key="1">
        <template #icon><icon-apps></icon-apps></template>
        Navigation 1
      </sd-menu-item>
      <sd-sub-menu key="2">
        <template #icon><icon-bug></icon-bug></template>
        <template #title>Navigation 2</template>
        <sd-menu-item key="2_0">Beijing</sd-menu-item>
        <sd-menu-item key="2_1">Shanghai</sd-menu-item>
        <sd-menu-item key="2_2">Guangzhou</sd-menu-item>
      </sd-sub-menu>
      <sd-sub-menu key="3">
        <template #icon><icon-bulb></icon-bulb></template>
        <template #title>Navigation 3</template>
        <sd-menu-item key="3_0">Wuhan</sd-menu-item>
        <sd-menu-item key="3_1">Chengdu</sd-menu-item>
      </sd-sub-menu>
      <sd-menu-item key="4">
        <template #icon><icon-safe></icon-safe></template>
        Navigation 4
      </sd-menu-item>
      <sd-menu-item key="5">
        <template #icon><icon-fire></icon-fire></template>
        Navigation 5
      </sd-menu-item>
    </sd-menu>
  </div>
</template>
<script setup lang="ts">
  import { IconApps, IconBug, IconBulb } from '@sdata/web-vue/es/icon/index.js';
</script>
<style scoped>
  .menu-demo {
    box-sizing: border-box;
    width: 100%;
    height: 600px;
    padding: 40px;
    background-color: var(--color-neutral-2);
  }

  .menu-demo .sd-menu {
    width: 200px;
    height: 100%;
    box-shadow: 0 0 1px rgb(0 0 0 / 30%);
  }

  .menu-demo .sd-menu :deep(.sd-menu-collapse-button) {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .menu-demo .sd-menu:not(.sd-menu-collapsed) :deep(.sd-menu-collapse-button) {
    right: 0;
    bottom: 8px;
    transform: translateX(50%);
  }

  .menu-demo .sd-menu:not(.sd-menu-collapsed)::before {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 48px;
    height: 48px;
    background-color: inherit;
    border-radius: 50%;
    box-shadow:
      -4px 0 2px var(--color-bg-2),
      0 0 1px rgb(0 0 0 / 30%);
    transform: translateX(50%);
    content: '';
  }

  .menu-demo .sd-menu.sd-menu-collapsed {
    width: 48px;
    height: auto;
    padding-top: 24px;
    padding-bottom: 138px;
    border-radius: 22px;
  }

  .menu-demo .sd-menu.sd-menu-collapsed :deep(.sd-menu-collapse-button) {
    right: 8px;
    bottom: 8px;
  }
</style>
