<template>
  <div>
    <sd-row class="grid-demo sd:mb-4 sd:bg-[var(--color-fill-2)]">
      <sd-col :span="8">col - 8</sd-col>
      <sd-col :span="8" :offset="8"> col - 8 | offset - 8 </sd-col>
    </sd-row>
    <sd-row class="grid-demo sd:mb-4 sd:bg-[var(--color-fill-2)]">
      <sd-col :span="6" :offset="8"> col - 6 | offset - 8 </sd-col>
      <sd-col :span="6" :offset="4"> col - 6 | offset - 4 </sd-col>
    </sd-row>
    <sd-row class="grid-demo sd:bg-[var(--color-fill-2)]">
      <sd-col :span="12" :offset="8"> col - 12 | offset - 8 </sd-col>
    </sd-row>
  </div>
</template>

<style scoped>
  .grid-demo .sd-col {
    height: 48px;
    color: var(--color-white);
    line-height: 48px;
    text-align: center;
  }

  .grid-demo .sd-col:nth-child(2n) {
    background-color: rgb(var(--sdblue-6), 0.9);
  }

  .grid-demo .sd-col:nth-child(2n + 1) {
    background-color: var(--color-primary-light-4);
  }
</style>
