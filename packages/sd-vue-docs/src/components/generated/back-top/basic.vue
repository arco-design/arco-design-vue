<template>
  <div class="sd:relative">
    <ul id="basic-demo" class="sd:h-50 sd:overflow-y-auto">
      <li v-for="(_, index) of Array(40)" :key="index" class="sd:leading-7.5"
        >This is the content</li
      >
    </ul>
    <sd-back-top target-container="#basic-demo" class="sd:absolute!" />
  </div>
</template>
