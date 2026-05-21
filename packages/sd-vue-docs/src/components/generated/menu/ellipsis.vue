<template>
  <div class="menu-demo menu-demo-grid">
    <section class="menu-demo-panel">
      <div class="menu-demo-label">默认纯 CSS 省略</div>
      <div class="sd:w-44">
        <sd-menu :default-open-keys="['guide']" :default-selected-keys="['guide-2']">
          <sd-sub-menu key="guide">
            <template #icon><icon-apps /></template>
            <template #title>这是一个非常长的导航分组标题，用来展示默认菜单省略效果</template>
            <sd-menu-item key="guide-1"
              >这是一个非常长的菜单项标题，默认只使用 CSS 做单行省略</sd-menu-item
            >
            <sd-menu-item key="guide-2">切换页面时仍然保持轻量的纯 CSS 省略表现</sd-menu-item>
          </sd-sub-menu>
        </sd-menu>
      </div>
    </section>

    <section class="menu-demo-panel">
      <div class="menu-demo-label">开启 Ellipsis 组件</div>
      <div class="sd:w-44">
        <sd-menu
          :default-open-keys="['guide']"
          :default-selected-keys="['guide-2']"
          ellipsis
          :ellipsis-props="{
            tooltip: {
              position: 'right',
              mini: true,
            },
          }"
        >
          <sd-sub-menu key="guide">
            <template #icon><icon-apps /></template>
            <template #title>这是一个非常长的导航分组标题，用来展示 Ellipsis 组件版本</template>
            <sd-menu-item key="guide-1"
              >这是一个非常长的菜单项标题，溢出后可以显示 Tooltip 内容</sd-menu-item
            >
            <sd-menu-item key="guide-2"
              >通过 ellipsis-props 可以继续透传 tooltip 等配置</sd-menu-item
            >
          </sd-sub-menu>
        </sd-menu>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { IconApps } from '@sdata/web-vue/es/icon/index.js';
</script>

<style scoped>
  .menu-demo {
    box-sizing: border-box;
    width: 100%;
    padding: 24px;
    background-color: var(--color-neutral-2);
  }

  .menu-demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
  }

  .menu-demo-panel {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
  }

  .menu-demo-label {
    color: var(--color-text-2);
    font-weight: 500;
    line-height: 1.5;
  }
</style>
