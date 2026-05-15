<template>
  <sd-time-picker
    type="time-range"
    @select="(valueString, value) => print('onSelect:', valueString, value)"
    @change="(valueString, value) => print('onChange:', valueString, value)"
    class="sd:w-[252px]"
  />
</template>
<script setup lang="ts">
  function print(
    ...arg: [
      string,
      string | Array<string | undefined> | undefined,
      Date | Array<Date | undefined> | undefined,
    ]
  ) {
    console.log(...arg);
  }
</script>
