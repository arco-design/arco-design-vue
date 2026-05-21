<template>
  <sd-layout class="layout-demo">
    <sd-layout-sider hide-trigger collapsible :collapsed="collapsed">
      <div class="logo" />
      <div class="sd:w-full">
        <sd-menu
          :defaultOpenKeys="['1']"
          :defaultSelectedKeys="['0_3']"
          @menuItemClick="onClickMenuItem"
        >
          <sd-menu-item key="0_1" disabled>
            <IconHome />
            Menu 1
          </sd-menu-item>
          <sd-menu-item key="0_2">
            <IconCalendar />
            Menu 2
          </sd-menu-item>
          <sd-menu-item key="0_3">
            <IconCalendar />
            Menu 3
          </sd-menu-item>
          <sd-sub-menu key="1">
            <template #title>
              <span><IconCalendar />Navigation 1</span>
            </template>
            <sd-menu-item key="1_1">Menu 1</sd-menu-item>
            <sd-menu-item key="1_2">Menu 2</sd-menu-item>
            <sd-sub-menu key="2" title="Navigation 2">
              <sd-menu-item key="2_1">Menu 1</sd-menu-item>
              <sd-menu-item key="2_2">Menu 2</sd-menu-item>
            </sd-sub-menu>
            <sd-sub-menu key="3" title="Navigation 3">
              <sd-menu-item key="3_1">Menu 1</sd-menu-item>
              <sd-menu-item key="3_2">Menu 2</sd-menu-item>
              <sd-menu-item key="3_3">Menu 3</sd-menu-item>
            </sd-sub-menu>
          </sd-sub-menu>
          <sd-sub-menu key="4">
            <template #title>
              <span><IconCalendar />Navigation 4</span>
            </template>
            <sd-menu-item key="4_1">Menu 1</sd-menu-item>
            <sd-menu-item key="4_2">Menu 2</sd-menu-item>
            <sd-menu-item key="4_3">Menu 3</sd-menu-item>
          </sd-sub-menu>
        </sd-menu>
      </div>
    </sd-layout-sider>
    <sd-layout>
      <sd-layout-header>
        <div class="sd:pl-5">
          <sd-button shape="round" @click="onCollapse">
            <IconCaretRight v-if="collapsed" />
            <IconCaretLeft v-else />
          </sd-button>
        </div>
      </sd-layout-header>
      <sd-layout>
        <div class="sd:flex sd:flex-1 sd:flex-col sd:px-6!">
          <div class="sd:my-4!">
            <sd-breadcrumb>
              <sd-breadcrumb-item>Home</sd-breadcrumb-item>
              <sd-breadcrumb-item>List</sd-breadcrumb-item>
              <sd-breadcrumb-item>App</sd-breadcrumb-item>
            </sd-breadcrumb>
          </div>
          <sd-layout-content>Content</sd-layout-content>
          <sd-layout-footer>Footer</sd-layout-footer>
        </div>
      </sd-layout>
    </sd-layout>
  </sd-layout>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  import { Message } from '@sdata/web-vue';
  import {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
  } from '@sdata/web-vue/es/icon/index.js';

  const collapsed = ref(false);
  const onCollapse = () => {
    collapsed.value = !collapsed.value;
  };

  function onClickMenuItem(key: string | number) {
    Message.info({ content: `You select ${key}`, showIcon: true });
  }
</script>
<style scoped>
  .layout-demo {
    height: 500px;
    background: var(--color-fill-2);
    border: 1px solid var(--color-border);
  }

  .layout-demo :deep(.sd-layout-sider) .logo {
    height: 32px;
    margin: 12px 8px;
    background: rgb(255 255 255 / 20%);
  }

  .layout-demo :deep(.sd-layout-sider-light) .logo {
    background: var(--color-fill-2);
  }

  .layout-demo :deep(.sd-layout-header) {
    height: 64px;
    line-height: 64px;
    background: var(--color-bg-3);
  }

  .layout-demo :deep(.sd-layout-footer) {
    height: 48px;
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    line-height: 48px;
  }

  .layout-demo :deep(.sd-layout-content) {
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    background: var(--color-bg-3);
  }

  .layout-demo :deep(.sd-layout-footer),
  .layout-demo :deep(.sd-layout-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-white);
    font-size: 16px;
    font-stretch: condensed;
    text-align: center;
  }
</style>
