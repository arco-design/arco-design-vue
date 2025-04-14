<template>
  <div class="overview-card">
    <div class="overview-card-inner">
      <div class="overview-card-logo">
        <img :src="logo" :alt="name" />
      </div>
      <div class="overview-card-link">
        {{ name }}
        <icon-right />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OverviewCard',
  props: {
    logo: String,
    name: String,
  },
});
</script>

<style scoped lang="less" src="./style.less" />
