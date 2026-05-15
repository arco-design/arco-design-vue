<template>
  <sd-timeline>
    <sd-timeline-item label="2017-03-10" dotColor="#00B42A"> The first milestone </sd-timeline-item>
    <sd-timeline-item label="2018-05-22">The second milestone</sd-timeline-item>
    <sd-timeline-item label="2020-06-22" dotColor="#F53F3F">
      The third milestone
      <IconExclamationCircleFill class="sd:text-[f53f3f] sd:text-xs sd:ml-1" />
    </sd-timeline-item>
    <sd-timeline-item label="2020-09-30" dotColor="#C9CDD4">
      The fourth milestone
    </sd-timeline-item>
  </sd-timeline>
</template>

<script setup lang="ts">
  import type { LabelPositionType, ModeType } from '@sdata/web-vue';

  import { IconExclamationCircleFill } from '@sdata/web-vue/es/icon/index.js';
</script>
