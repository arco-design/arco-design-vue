<template>
  <div class="menu-demo">
    <sd-menu
      class="sd:w-50 sd:h-full"
      :default-open-keys="['0']"
      :default-selected-keys="['0_1']"
      show-collapse-button
    >
      <sd-menu-item key="0_0_0" data-obj="1">Menu 1</sd-menu-item>
      <sd-sub-menu key="0">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>Navigation 1</template>
        <sd-menu-item key="0_0">Menu 1</sd-menu-item>
        <sd-menu-item key="0_1">Menu 2</sd-menu-item>
        <sd-menu-item key="0_2" disabled>Menu 3</sd-menu-item>
      </sd-sub-menu>
      <sd-sub-menu key="1">
        <template #icon><icon-bug></icon-bug></template>
        <template #title>Navigation 2</template>
        <sd-menu-item key="1_0">Menu 1</sd-menu-item>
        <sd-menu-item key="1_1">Menu 2</sd-menu-item>
        <sd-menu-item key="1_2">Menu 3</sd-menu-item>
      </sd-sub-menu>
      <sd-sub-menu key="2">
        <template #icon><icon-bulb></icon-bulb></template>
        <template #title>Navigation 3</template>
        <sd-menu-item-group title="Menu Group 1">
          <sd-menu-item key="2_0">Menu 1</sd-menu-item>
          <sd-menu-item key="2_1">Menu 2</sd-menu-item>
        </sd-menu-item-group>
        <sd-menu-item-group title="Menu Group 2">
          <sd-menu-item key="2_2">Menu 3</sd-menu-item>
          <sd-menu-item key="2_3">Menu 4</sd-menu-item>
        </sd-menu-item-group>
      </sd-sub-menu>
    </sd-menu>
  </div>
</template>
<script setup lang="ts">
  import {
    IconMenuFold,
    IconMenuUnfold,
    IconApps,
    IconBug,
    IconBulb,
  } from '@sdata/web-vue/es/icon/index.js';
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
