<template>
  <sd-row class="grid-demo sd:mb-4">
    <sd-col flex="100px">
      <div>100px</div>
    </sd-col>
    <sd-col flex="auto">
      <div>auto</div>
    </sd-col>
  </sd-row>
  <sd-row class="grid-demo sd:mb-4">
    <sd-col flex="100px">
      <div>100px</div>
    </sd-col>
    <sd-col flex="auto">
      <div>auto</div>
    </sd-col>
    <sd-col flex="100px">
      <div>100px</div>
    </sd-col>
  </sd-row>
  <sd-row class="grid-demo sd:mb-4">
    <sd-col :flex="3">
      <div>3 / 12</div>
    </sd-col>
    <sd-col :flex="4">
      <div>4 / 12</div>
    </sd-col>
    <sd-col :flex="5">
      <div>5 / 12</div>
    </sd-col>
  </sd-row>
</template>

<style scoped>
  .grid-demo .sd-col {
    height: 48px;
    color: var(--color-white);
    line-height: 48px;
    text-align: center;
  }

  .grid-demo .sd-col:nth-child(2n + 1) {
    background-color: var(--color-primary-light-4);
  }

  .grid-demo .sd-col:nth-child(2n) {
    background-color: rgb(var(--sdblue-6), 0.9);
  }
</style>
