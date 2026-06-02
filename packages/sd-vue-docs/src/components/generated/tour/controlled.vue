<template>
  <div class="sd:flex sd:flex-col sd:gap-4">
    <sd-button class="sd:self-start" type="primary" @click="openTour">打开受控导览</sd-button>

    <sd-tour
      :visible="visible"
      :current="current"
      :steps="steps"
      @update:visible="handleVisibleChange"
      @update:current="handleCurrentChange"
      @close="handleClose"
    >
      <div class="sd:grid sd:grid-cols-1 sd:gap-3 lg:sd:grid-cols-3">
        <div
          id="tour-controlled-step-1"
          class="sd:rounded-xl sd:border sd:border-solid sd:border-(--color-border-2) sd:p-4"
        >
          <div class="sd:font-medium">创建任务</div>
          <div class="sd:mt-2 sd:text-(--color-text-2)">第一步说明当前流程从哪里发起。</div>
          <sd-space class="sd:mt-4" wrap>
            <sd-button type="primary" size="small" @click="moveNext">下一步</sd-button>
            <sd-button status="danger" size="small" @click="closeTour">关闭</sd-button>
          </sd-space>
        </div>
        <div
          id="tour-controlled-step-2"
          class="sd:rounded-xl sd:border sd:border-solid sd:border-(--color-border-2) sd:p-4"
        >
          <div class="sd:font-medium">分配成员</div>
          <div class="sd:mt-2 sd:text-(--color-text-2)">第二步强调团队协作入口。</div>
          <sd-space class="sd:mt-4" wrap>
            <sd-button size="small" @click="movePrevious">上一步</sd-button>
            <sd-button type="primary" size="small" @click="moveNext">下一步</sd-button>
            <sd-button status="danger" size="small" @click="closeTour">关闭</sd-button>
          </sd-space>
        </div>
        <div
          id="tour-controlled-step-3"
          class="sd:rounded-xl sd:border sd:border-solid sd:border-(--color-border-2) sd:p-4"
        >
          <div class="sd:font-medium">确认发布</div>
          <div class="sd:mt-2 sd:text-(--color-text-2)">第三步提醒最终确认动作由外部状态接管。</div>
          <sd-space class="sd:mt-4" wrap>
            <sd-button size="small" @click="movePrevious">上一步</sd-button>
            <sd-button status="danger" size="small" @click="closeTour">关闭</sd-button>
          </sd-space>
        </div>
      </div>
    </sd-tour>
  </div>
</template>

<script setup lang="ts">
  import type { TourStep } from '@sdata/web-vue';

  import { ref } from 'vue';

  const visible = ref(false);
  const current = ref(0);

  const steps: TourStep[] = [
    {
      element: '#tour-controlled-step-1',
      popover: {
        title: '外部控制第 1 步',
        description: '当前步骤和显隐状态都由外部状态驱动。',
      },
    },
    {
      element: '#tour-controlled-step-2',
      popover: {
        title: '外部控制第 2 步',
        description: '你可以在当前高亮卡片里的业务按钮中主动推进导览。',
      },
    },
    {
      element: '#tour-controlled-step-3',
      popover: {
        title: '外部控制第 3 步',
        description: '外部状态仍然掌握显隐和步骤切换，只是控制按钮放进了当前可交互区域。',
      },
    },
  ];

  const openTour = () => {
    current.value = 0;
    visible.value = true;
  };

  const closeTour = () => {
    visible.value = false;
  };

  const movePrevious = () => {
    current.value = Math.max(current.value - 1, 0);
  };

  const moveNext = () => {
    current.value = Math.min(current.value + 1, steps.length - 1);
  };

  const handleVisibleChange = (value: boolean) => {
    visible.value = value;
  };

  const handleCurrentChange = (value: number) => {
    current.value = value;
  };

  const handleClose = () => {
    visible.value = false;
  };
</script>
