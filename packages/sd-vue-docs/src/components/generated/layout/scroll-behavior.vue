<template>
  <DefineTemplate>
    <div class="layout-scroll-demo__content">
      <div v-for="item in items" :key="item" class="layout-scroll-demo__card">
        <strong>第 {{ item }} 条</strong>
        <span>继续滚动可以看到 Header 自动折叠并隐藏，再向上滚动即可恢复。</span>
      </div>
    </div>
  </DefineTemplate>
  <sd-radio-group v-model="scrollType" :options></sd-radio-group>
  <div class="layout-scroll-demo">
    <sd-layout-header
      title="滚动隐藏 Header"
      :extended="true"
      scroll-target=".layout-scroll-demo__body"
      scroll-behavior="hide collapse elevate"
      :key="scrollType"
    >
      <template #append>
        <span class="layout-scroll-demo__hint">向下滚动内容区</span>
      </template>
      <template #extension>
        <div class="layout-scroll-demo__filters">
          <span class="layout-scroll-demo__filter">全部</span>
          <span class="layout-scroll-demo__filter">待处理</span>
          <span class="layout-scroll-demo__filter">已归档</span>
        </div>
      </template>
    </sd-layout-header>
    <div class="layout-scroll-demo__body">
      <sd-scrollbar v-if="scrollType === '自定义滚动'" class="sd:h-full sd:overflow-auto">
        <ReuseTemplate />
      </sd-scrollbar>
      <ReuseTemplate v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import { createReusableTemplate } from '@vueuse/core';

  const [DefineTemplate, ReuseTemplate] = createReusableTemplate();

  const options = ['自定义滚动', '系统滚动'];

  const scrollType = ref(options[0]);

  const items = Array.from({ length: 12 }, (_, index) => index + 1);
</script>

<style scoped>
  .layout-scroll-demo {
    overflow: hidden;
    background: var(--color-bg-1);
    border: 1px solid var(--color-border-2);
    border-radius: 16px;
  }

  .layout-scroll-demo__body {
    height: 280px;
    overflow: auto;
    background: linear-gradient(180deg, rgb(var(--gray-1)) 0%, rgb(var(--gray-2)) 100%);
  }

  .layout-scroll-demo__content {
    display: grid;
    gap: 12px;
    min-height: 100%;
    padding: 16px;
  }

  .layout-scroll-demo__hint,
  .layout-scroll-demo__filter {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
  }

  .layout-scroll-demo__hint {
    height: 30px;
    padding: 0 12px;
    color: var(--color-text-2);
    background: var(--color-fill-2);
  }

  .layout-scroll-demo__filters {
    display: flex;
    gap: 10px;
  }

  .layout-scroll-demo__filter {
    height: 28px;
    padding: 0 14px;
    color: var(--color-text-1);
    background: var(--color-fill-2);
  }

  .layout-scroll-demo__card {
    display: grid;
    gap: 6px;
    padding: 16px;
    color: var(--color-text-1);
    background: var(--color-bg-2);
    border-radius: 12px;
  }

  .layout-scroll-demo__card span {
    color: var(--color-text-2);
  }
</style>
