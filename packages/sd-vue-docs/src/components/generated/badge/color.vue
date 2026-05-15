<template>
  <div>
    <sd-badge v-for="color in colors" :key="color" :color="color" :text="color" class="sd:mr-6" />
  </div>
  <br />
  <div>
    <sd-badge
      v-for="color in customColors"
      :key="color"
      :color="color"
      :text="color"
      class="sd:mr-6"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const COLORS = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'sdblue',
    'purple',
    'pinkpurple',
    'magenta',
    'gray',
  ];

  const COLORS_CUSTOM = [
    '#F53F3F',
    '#7816FF',
    '#00B42A',
    '#165DFF',
    '#FF7D00',
    '#EB0AA4',
    '#7BC616',
    '#86909C',
    '#B71DE8',
    '#0FC6C2',
    '#FFB400',
    '#168CFF',
    '#FF5722',
  ];

  const colors = ref(COLORS);

  const customColors = ref(COLORS_CUSTOM);
</script>
