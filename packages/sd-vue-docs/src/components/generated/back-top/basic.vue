<template>
  <div class="wrapper">
    <ul id="basic-demo">
      <li v-for="(_, index) of Array(40)" :key="index">This is the content</li>
    </ul>
    <sd-back-top target-container="#basic-demo" :style="{ position: 'absolute' }" />
  </div>
</template>

<style scoped lang="scss">
  .wrapper {
    position: relative;

    ul {
      height: 200px;
      overflow-y: auto;

      li {
        line-height: 30px;
      }
    }
  }
</style>
