<template>
  <div class="sd:flex sd:flex-col sd:gap-4">
    <sd-button type="primary" @click="visible = true">打开非模态导览</sd-button>

    <sd-tour v-model:visible="visible" :steps="steps" v-bind="tourProps" @close="visible = false">
      <div class="sd:grid sd:grid-cols-1 sd:gap-3 md:sd:grid-cols-3">
        <div
          id="tour-non-modal-step-1"
          class="sd:rounded-xl sd:border sd:border-dashed sd:border-(--color-border-3) sd:bg-(--color-bg-2) sd:p-4"
        >
          <div class="sd:font-medium">实时指标</div>
          <div class="sd:mt-2 sd:text-(--color-text-2)"
            >背景不会被遮罩完全盖住，适合边看边操作。</div
          >
        </div>
        <div
          id="tour-non-modal-step-2"
          class="sd:rounded-xl sd:border sd:border-dashed sd:border-(--color-border-3) sd:bg-(--color-bg-2) sd:p-4"
        >
          <div class="sd:font-medium">快捷入口</div>
          <div class="sd:mt-2 sd:text-(--color-text-2)">可以保留页面上下文，降低遮挡感。</div>
        </div>
        <div
          id="tour-non-modal-step-3"
          class="sd:rounded-xl sd:border sd:border-dashed sd:border-(--color-border-3) sd:bg-(--color-bg-2) sd:p-4"
        >
          <div class="sd:font-medium">当前状态</div>
          <div class="sd:mt-2 sd:text-(--color-text-2)">适合需要连续观察页面数据变化的场景。</div>
        </div>
      </div>
    </sd-tour>
  </div>
</template>

<script setup lang="ts">
  import type { TourConfig, TourStep } from '@sdata/web-vue';

  import { ref } from 'vue';

  const visible = ref(false);

  const steps: TourStep[] = [
    {
      element: '#tour-non-modal-step-1',
      popover: {
        title: '观察实时指标',
        description: '将遮罩透明度调低后，用户仍能看到页面其余内容。',
      },
    },
    {
      element: '#tour-non-modal-step-2',
      popover: {
        title: '保留快捷操作',
        description: '适合需要一边讲解一边保持页面上下文的场景。',
      },
    },
    {
      element: '#tour-non-modal-step-3',
      popover: {
        title: '结束查看',
        description: '你也可以继续通过 Tour 顶层 props 调整阶段 padding、圆角和动画。',
      },
    },
  ];

  const tourProps: TourConfig = {
    overlayOpacity: 0.18,
    stagePadding: 8,
    showProgress: true,
    allowClose: true,
  };
</script>
