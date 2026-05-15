<template>
  <div class="menu-demo">
    <sd-slider class="sd:w-80 sd:mb-6" v-model="width" :step="10" :min="160" :max="400" />
    <sd-menu
      class="dynamic-menu"
      showCollapseButton
      :default-open-keys="['0']"
      :default-selected-keys="['0_1']"
    >
      <sd-sub-menu key="0">
        <template #icon><IconApps></IconApps></template>
        <template #title>Navigation 1</template>
        <sd-menu-item key="0_0">Menu 1</sd-menu-item>
        <sd-menu-item key="0_1">Menu 2</sd-menu-item>
        <sd-menu-item key="0_2" disabled> Menu 3 </sd-menu-item>
      </sd-sub-menu>
      <sd-sub-menu key="1">
        <template #icon><IconBug></IconBug></template>
        <template #title>Navigation 2</template>
        <sd-menu-item key="1_0">Menu 1</sd-menu-item>
        <sd-menu-item key="1_1">Menu 2</sd-menu-item>
        <sd-menu-item key="1_2">Menu 3</sd-menu-item>
      </sd-sub-menu>
      <sd-sub-menu key="2">
        <template #icon><IconBulb></IconBulb></template>
        <template #title>Navigation 3</template>
        <sd-menu-item key="2_0">Menu 1</sd-menu-item>
        <sd-menu-item key="2_1">Menu 2</sd-menu-item>
        <sd-menu-item key="2_2">Menu 3</sd-menu-item>
      </sd-sub-menu>
    </sd-menu>
  </div>
</template>
<script setup lang="ts">
  import { computed, ref } from 'vue';

  import { IconApps, IconBug, IconBulb } from '@sdata/web-vue/es/icon/index.js';

  const width = ref(160);
  const widthPx = computed(() => `${width.value}px`);
</script>
<style scoped>
  .menu-demo {
    box-sizing: border-box;
    width: 100%;
    height: 600px;
    padding: 40px;
    background-color: var(--color-neutral-2);
  }

  .menu-demo :deep(.dynamic-menu) {
    width: v-bind('widthPx');
    height: calc(100% - 28px);
  }
</style>
