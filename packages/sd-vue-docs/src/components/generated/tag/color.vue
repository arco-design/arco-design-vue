<template>
  <sd-space wrap>
    <sd-tag v-for="(color, index) of colors" :key="index" :color="color" closable>{{
      color
    }}</sd-tag>
  </sd-space>
  <h3>Custom Color:</h3>
  <sd-space wrap>
    <sd-tag v-for="(color, index) of custom" :key="index" :color="color" closable>{{
      color
    }}</sd-tag>
  </sd-space>
</template>

<script setup lang="ts">
  const colors = [
    'red',
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
  const custom = [
    '#f53f3f',
    '#7816ff',
    '#00b42a',
    '#165dff',
    '#ff7d00',
    '#eb0aa4',
    '#7bc616',
    '#86909c',
    '#b71de8',
    '#0fc6c2',
    '#ffb400',
    '#168cff',
    '#ff5722',
  ];
</script>
