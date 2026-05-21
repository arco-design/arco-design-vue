<template>
  <div class="sd:mb-10">
    <sd-typography-text class="sd:mr-2 sd:align-middle"> Reverse </sd-typography-text>
    <sd-radio-group @change="onChange" class="sd:mb-7.5" :modelValue="isReverse">
      <sd-radio :value="false">No Reverse</sd-radio>
      <sd-radio :value="true">Reverse</sd-radio>
    </sd-radio-group>
  </div>
  <sd-timeline :reverse="isReverse">
    <sd-timeline-item label="2017-03-10">The first milestone</sd-timeline-item>
    <sd-timeline-item label="2018-05-12">The second milestone</sd-timeline-item>
    <sd-timeline-item label="2020-09-30">The third milestone</sd-timeline-item>
  </sd-timeline>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const isReverse = ref(false);

  const onChange = (bool: string | number | boolean) => {
    isReverse.value = Boolean(bool);
  };
</script>
