<template>
  <div class="layout-app-bar-demo">
    <sd-layout>
      <sd-layout-header
        title="数据工作台"
        :extended="true"
        scroll-behavior="collapse elevate fade-image"
      >
        <template #image>
          <div class="layout-app-bar-demo__image" />
        </template>
        <template #prepend>
          <span class="layout-app-bar-demo__chip">导航</span>
        </template>
        <span class="layout-app-bar-demo__crumb">项目 / 运营看板</span>
        <template #append>
          <span class="layout-app-bar-demo__chip layout-app-bar-demo__chip-primary">发布</span>
        </template>
        <template #extension>
          <div class="layout-app-bar-demo__tabs">
            <span v-for="item in tabs" :key="item" class="layout-app-bar-demo__tab">{{
              item
            }}</span>
          </div>
        </template>
      </sd-layout-header>
      <sd-layout-content>
        <div class="layout-app-bar-demo__content">
          <p v-for="item in 4" :key="item" class="layout-app-bar-demo__paragraph">
            Layout.Header 现在可以直接承担 AppBar 的内容编排、扩展区域和滚动状态样式。
          </p>
        </div>
      </sd-layout-content>
    </sd-layout>
  </div>
</template>

<script lang="ts" setup>
  const tabs = ['总览', '指标', '告警', '成员'];
</script>

<style scoped>
  .layout-app-bar-demo {
    overflow: hidden;
    background: var(--color-bg-1);
    border: 1px solid var(--color-border-2);
    border-radius: 16px;
  }

  .layout-app-bar-demo__image {
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at left top, rgb(255 255 255 / 28%), transparent 42%),
      linear-gradient(
        120deg,
        rgb(var(--primary-6)) 0%,
        rgb(var(--cyan-6)) 50%,
        rgb(var(--green-6)) 100%
      );
  }

  .layout-app-bar-demo__chip,
  .layout-app-bar-demo__tab {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
  }

  .layout-app-bar-demo__chip {
    height: 32px;
    padding: 0 12px;
    color: rgb(255 255 255 / 92%);
    background: rgb(255 255 255 / 14%);
    backdrop-filter: blur(10px);
  }

  .layout-app-bar-demo__chip-primary {
    color: rgb(var(--primary-6));
    background: rgb(255 255 255 / 92%);
  }

  .layout-app-bar-demo__crumb {
    color: rgb(255 255 255 / 78%);
    white-space: nowrap;
  }

  .layout-app-bar-demo__tabs {
    display: flex;
    gap: 12px;
    overflow: auto;
  }

  .layout-app-bar-demo__tab {
    height: 28px;
    padding: 0 14px;
    color: rgb(255 255 255 / 86%);
    white-space: nowrap;
    background: rgb(255 255 255 / 10%);
  }

  .layout-app-bar-demo__content {
    padding: 20px;
    background: linear-gradient(180deg, rgb(var(--gray-1)) 0%, rgb(var(--gray-2)) 100%);
  }

  .layout-app-bar-demo__paragraph {
    margin: 0;
    padding: 16px 18px;
    color: var(--color-text-1);
    background: var(--color-bg-2);
    border-radius: 12px;
  }

  .layout-app-bar-demo__paragraph + .layout-app-bar-demo__paragraph {
    margin-top: 12px;
  }
</style>
