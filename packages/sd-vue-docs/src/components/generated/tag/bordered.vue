<template>
  <sd-space wrap>
    <sd-tag bordered>default</sd-tag>
    <sd-tag v-for="(color, index) of colors" :key="index" :color="color" bordered>{{
      color
    }}</sd-tag>
  </sd-space>
</template>

<script setup lang="ts">
  const colors = [
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'sdblue',
    'purple',
    'pinkpurple',
    'magenta',
    'gray',
  ];
</script>
