<template>
  <div class="cell-demo">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CellDemo',
});
</script>

<style scoped lang="less" src="./style.less" />
