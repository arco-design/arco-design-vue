<template>
  <div class="layout-navigation-drawer-demo">
    <div class="toolbar">
      <sd-button type="primary" @click="visible = !visible">切换临时抽屉</sd-button>
      <sd-button @click="location = location === 'left' ? 'right' : 'left'">
        切换到{{ location === 'left' ? '右侧' : '左侧' }}
      </sd-button>
    </div>
    <sd-layout class="drawer-layout-demo">
      <sd-layout-sider
        default-rail
        expand-on-hover
        floating
        temporary
        :model-value="visible"
        :location="location"
        @update:modelValue="visible = $event"
      >
        <template #image>
          <div class="hero"></div>
        </template>
        <template #prepend>
          <div class="section-title">快捷导航</div>
        </template>
        <div class="sd:w-full">
          <sd-menu :defaultSelectedKeys="['dashboard']">
            <sd-menu-item key="dashboard">
              <IconHome />
              仪表盘
            </sd-menu-item>
            <sd-menu-item key="schedule">
              <IconCalendar />
              日程
            </sd-menu-item>
            <sd-sub-menu key="workspace">
              <template #title>
                <span><IconCalendar />工作区</span>
              </template>
              <sd-menu-item key="workspace-overview">概览</sd-menu-item>
              <sd-menu-item key="workspace-members">成员</sd-menu-item>
            </sd-sub-menu>
          </sd-menu>
        </div>
        <template #append>
          <div class="drawer-tip">支持遮罩关闭与 ESC 关闭，rail 模式可在 hover 时展开。</div>
        </template>
      </sd-layout-sider>
      <sd-layout>
        <sd-layout-header class="drawer-header">Layout.Sider 现在支持导航抽屉模式</sd-layout-header>
        <sd-layout-content class="drawer-content">
          <p>点击按钮打开临时抽屉，或切换停靠方向观察左右侧抽屉效果。</p>
          <p>默认 rail 模式会在 hover 时展开，适合桌面端收纳式导航。</p>
        </sd-layout-content>
      </sd-layout>
    </sd-layout>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { IconCalendar, IconHome } from '@sdata/web-vue/es/icon/index.js';

  const visible = ref(false);
  const location = ref<'left' | 'right'>('left');
</script>

<style scoped>
  .layout-navigation-drawer-demo {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .drawer-layout-demo {
    position: relative;
    min-height: 360px;
    overflow: hidden;
    background: var(--color-fill-2);
    border: 1px solid var(--color-border);
    transform: translateZ(0);
  }

  .hero {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    color: var(--color-white);
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 0.08em;
    background: linear-gradient(135deg, rgb(var(--primary-6)), rgb(var(--cyan-6)));
  }

  .section-title {
    padding: 16px 16px 8px;
    overflow: hidden;
    color: var(--color-text-2);
    font-size: 12px;
    letter-spacing: 0.08em;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .drawer-tip {
    padding: 12px 16px 16px;
    color: var(--color-text-2);
    font-size: 12px;
    line-height: 1.5;
  }

  .drawer-header {
    display: flex;
    align-items: center;
    height: 64px;
    padding: 0 20px;
    background: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
  }

  .drawer-content {
    padding: 24px 20px;
    color: var(--color-text-1);
    line-height: 1.8;
  }

  .drawer-content p {
    margin: 0;
  }

  .drawer-content p + p {
    margin-top: 12px;
  }
</style>
