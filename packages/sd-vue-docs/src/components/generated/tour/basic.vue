<template>
  <div class="sd:flex sd:flex-col sd:gap-4">
    <sd-button type="primary" @click="startTour">开始导览</sd-button>

    <sd-tour v-model:visible="visible" :steps="steps" @close="handleClose">
      <div class="sd:grid sd:grid-cols-1 sd:gap-3 md:sd:grid-cols-2">
        <div
          id="tour-basic-step-1"
          class="sd:rounded-xl sd:border sd:border-solid sd:border-[var(--color-border-2)] sd:bg-[var(--color-bg-2)] sd:p-4"
        >
          <div class="sd:mb-2 sd:text-base sd:font-medium">筛选条件</div>
          <div class="sd:text-[var(--color-text-2)]">先确定查询范围，再开始处理数据。</div>
        </div>
        <div
          id="tour-basic-step-2"
          class="sd:rounded-xl sd:border sd:border-solid sd:border-[var(--color-border-2)] sd:bg-[var(--color-bg-2)] sd:p-4"
        >
          <div class="sd:mb-2 sd:text-base sd:font-medium">结果面板</div>
          <div class="sd:text-[var(--color-text-2)]">这里会展示导览完成后的关键结果。</div>
        </div>
      </div>
    </sd-tour>
  </div>
</template>

<script setup lang="ts">
  import type { TourStep } from '@sdata/web-vue';

  import { ref } from 'vue';

  const visible = ref(false);

  const steps: TourStep[] = [
    {
      element: '#tour-basic-step-1',
      popover: {
        title: '先看筛选条件',
        description: '导览会从这里开始，帮助用户先确认查询维度。',
      },
    },
    {
      element: '#tour-basic-step-2',
      popover: {
        title: '再看结果区域',
        description: '第二步聚焦最终输出，让用户知道操作完成后去哪里看结果。',
      },
    },
  ];

  const startTour = () => {
    visible.value = true;
  };

  const handleClose = () => {
    visible.value = false;
  };
</script>
