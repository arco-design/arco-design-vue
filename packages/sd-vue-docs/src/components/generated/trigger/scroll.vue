<template>
  <div class="sd:h-25 sd:overflow-y-scroll">
    <div class="sd:h-50">
      <sd-trigger trigger="click" update-at-scroll>
        <sd-button class="sd:mt-20">Click Me</sd-button>
        <template #content>
          <div class="demo-basic">
            <sd-empty />
          </div>
        </template>
      </sd-trigger>
    </div>
  </div>
</template>

<style scoped>
  .demo-basic {
    width: 200px;
    padding: 10px;
    background-color: var(--color-bg-popup);
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgb(0 0 0 / 15%);
  }
</style>
