<template>
  <sd-time-picker
    type="time-range"
    @select="(valueString, value) => print('onSelect:', valueString, value)"
    @change="(valueString, value) => print('onChange:', valueString, value)"
    class="sd:w-[252px]"
  />
</template>
<script setup lang="ts">
  function print(...arg) {
    console.log(...arg);
  }
</script>
