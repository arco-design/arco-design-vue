<template>
  <sd-space class="wrapper" direction="vertical">
    <sd-button type="primary" long>Primary</sd-button>
    <sd-button long>Default</sd-button>
    <sd-button type="dashed" long>Dashed</sd-button>
    <sd-button type="outline" long>Outline</sd-button>
    <sd-button type="text" long>Text</sd-button>
  </sd-space>
</template>

<style scoped lang="scss">
  .wrapper {
    width: 400px;
    padding: 20px;
    border: 1px solid var(--color-border);
    border-radius: 4px;
  }
</style>
