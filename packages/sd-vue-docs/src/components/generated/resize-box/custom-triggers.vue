<template>
  <sd-resize-box
    :directions="['right', 'bottom']"
    class="sd:w-125 sd:min-w-25 sd:max-w-full sd:h-50 sd:text-center"
  >
    <template #resize-trigger="{ direction }">
      <div
        :class="[
          `resizebox-demo`,
          `resizebox-demo-${direction === 'right' ? 'vertical' : 'horizontal'}`,
        ]"
      >
        <div class="resizebox-demo-line" />
      </div>
    </template>
    <sd-typography-paragraph
      >We are building the future of content discovery and creation.</sd-typography-paragraph
    >
    <sd-divider />
    <sd-typography-paragraph>
      ByteDance's content platforms enable people to enjoy content powered by AI technology. We
      inform, entertain, and inspire people across language, culture and geography.
    </sd-typography-paragraph>
    <sd-divider>ByteDance</sd-divider>
    <sd-typography-paragraph
      >Yiming Zhang is the founder and CEO of ByteDance.</sd-typography-paragraph
    >
  </sd-resize-box>
</template>

<style scoped>
  .resizebox-demo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: var(--color-bg-2);
  }

  .resizebox-demo::before,
  .resizebox-demo::after {
    width: 6px;
    height: 6px;
    border: 1px solid rgb(var(--sdblue-6));
    content: '';
  }

  .resizebox-demo-line {
    flex: 1;
    background-color: rgb(var(--sdblue-6));
  }

  .resizebox-demo-vertical {
    flex-direction: column;
  }

  .resizebox-demo-vertical .resizebox-demo-line {
    width: 1px;
    height: 100%;
  }

  .resizebox-demo-horizontal .resizebox-demo-line {
    height: 1px;
  }
</style>
