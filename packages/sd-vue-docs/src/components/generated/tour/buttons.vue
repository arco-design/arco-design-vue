<template>
  <div class="sd:flex sd:flex-col sd:gap-4">
    <sd-button type="primary" @click="visible = true">查看自定义按钮</sd-button>

    <sd-tour
      v-model:visible="visible"
      v-model:current="current"
      :steps="steps"
      v-bind="tourProps"
      @close="visible = false"
    >
      <div class="sd:grid sd:grid-cols-1 sd:gap-3 md:sd:grid-cols-2">
        <div
          id="tour-buttons-step-1"
          class="sd:rounded-xl sd:border sd:border-solid sd:border-(--color-border-2) sd:bg-(--color-fill-1) sd:p-4"
        >
          <div class="sd:font-medium">欢迎卡片</div>
          <div class="sd:mt-2 sd:text-(--color-text-2)">第一步使用组件化标题和按钮。</div>
        </div>
        <div
          id="tour-buttons-step-2"
          class="sd:rounded-xl sd:border sd:border-solid sd:border-(--color-border-2) sd:bg-(--color-fill-1) sd:p-4"
        >
          <div class="sd:font-medium">操作完成</div>
          <div class="sd:mt-2 sd:text-(--color-text-2)"
            >第二步切换成更大的表格内容，观察浮层自动放大。</div
          >
        </div>
      </div>

      <template #title="{ title, current: activeIndex }">
        <sd-space align="center" size="small">
          <sd-tag color="arcoblue">步骤 {{ (activeIndex ?? 0) + 1 }}</sd-tag>
          <span class="sd:font-medium">{{ title }}</span>
        </sd-space>
      </template>

      <template #description="{ current: activeIndex, description }">
        <div class="sd:flex sd:flex-col sd:gap-3">
          <div class="sd:text-(--color-text-2)">{{ description }}</div>

          <div
            v-if="activeIndex === 1"
            class="sd:overflow-hidden sd:rounded-lg sd:border sd:border-solid sd:border-(--color-border-2)"
          >
            <table class="sd:min-w-70 sd:border-collapse">
              <thead class="sd:bg-(--color-fill-2)">
                <tr>
                  <th class="sd:px-3 sd:py-2 sd:text-left">字段</th>
                  <th class="sd:px-3 sd:py-2 sd:text-left">说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    class="sd:border-t sd:border-solid sd:border-(--color-border-2) sd:px-3 sd:py-2"
                    >Owner</td
                  >
                  <td
                    class="sd:border-t sd:border-solid sd:border-(--color-border-2) sd:px-3 sd:py-2"
                    >当前流程负责人</td
                  >
                </tr>
                <tr>
                  <td
                    class="sd:border-t sd:border-solid sd:border-(--color-border-2) sd:px-3 sd:py-2"
                    >ETA</td
                  >
                  <td
                    class="sd:border-t sd:border-solid sd:border-(--color-border-2) sd:px-3 sd:py-2"
                    >预计完成时间</td
                  >
                </tr>
                <tr>
                  <td
                    class="sd:border-t sd:border-solid sd:border-(--color-border-2) sd:px-3 sd:py-2"
                    >State</td
                  >
                  <td
                    class="sd:border-t sd:border-solid sd:border-(--color-border-2) sd:px-3 sd:py-2"
                    >导览切换时浮层会自动平滑放大</td
                  >
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </sd-tour>
  </div>
</template>

<script setup lang="ts">
  import type { TourConfig, TourStep } from '@sdata/web-vue';

  import { ref } from 'vue';

  const visible = ref(false);
  const current = ref(0);

  const steps: TourStep[] = [
    {
      element: '#tour-buttons-step-1',
      popover: {
        title: '欢迎进入导览',
        description: '标题和描述都可以改成 slot，并直接渲染组件库里的组件。',
      },
    },
    {
      element: '#tour-buttons-step-2',
      popover: {
        title: '准备完成',
        description: '第二步换成更大的表格内容后，popover 会自动做布局动画。',
      },
    },
  ];

  const tourProps: TourConfig = {
    showProgress: true,
    showButtons: ['previous', 'next', 'close'],
    prevBtnText: '回到上一步',
    nextBtnText: '继续查看',
    doneBtnText: '知道了',
    buttonProps: {
      previous: { type: 'outline' },
      next: { type: 'primary', status: 'warning' },
      done: { type: 'primary' },
      close: { type: 'text' },
    },
  };
</script>
