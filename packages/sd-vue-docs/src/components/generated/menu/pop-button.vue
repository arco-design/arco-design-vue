<template>
  <div class="menu-demo">
    <sd-trigger
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
        <sd-menu
          class="sd:-mb-1"
          mode="popButton"
          :tooltipProps="{ position: 'left' }"
          showCollapseButton
        >
          <sd-menu-item key="1">
            <template #icon><IconBug></IconBug></template>
            Bugs
          </sd-menu-item>
          <sd-menu-item key="2">
            <template #icon><IconBulb></IconBulb></template>
            Ideas
          </sd-menu-item>
        </sd-menu>
      </template>
    </sd-trigger>

    <sd-trigger
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
        <sd-menu
          class="sd:-mb-1"
          mode="popButton"
          :tooltipProps="{ position: 'left' }"
          showCollapseButton
        >
          <sd-menu-item key="1">
            <template #icon><IconBug></IconBug></template>
            Bugs
          </sd-menu-item>
          <sd-menu-item key="2">
            <template #icon><IconBulb></IconBulb></template>
            Ideas
          </sd-menu-item>
        </sd-menu>
      </template>
    </sd-trigger>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  import { IconBug, IconBulb, IconClose, IconMessage } from '@sdata/web-vue/es/icon/index.js';

  const popupVisible1 = ref(false);
  const popupVisible2 = ref(false);
</script>
<style scoped>
  .menu-demo {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 300px;
    padding: 40px;
    background-color: var(--color-fill-2);
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
    background-color: rgb(var(--sdblue-6));
  }

  .button-trigger:nth-child(3).button-trigger-active {
    background-color: var(--color-primary-light-4);
  }
</style>
