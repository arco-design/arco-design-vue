<template>
  <div>
    <sd-row align="center">
      <sd-typography-text>labelPosition: &nbsp; &nbsp;</sd-typography-text>
      <sd-radio-group @change="onLabelPositionChange" :modelValue="pos">
        <sd-radio value="same">same</sd-radio>
        <sd-radio value="relative">relative</sd-radio>
      </sd-radio-group>
    </sd-row>
    <sd-row align="center" class="sd:mt-5 sd:mb-6">
      <sd-typography-text>mode: &nbsp; &nbsp;</sd-typography-text>
      <sd-radio-group @change="onModeChange" :modelValue="mode">
        <sd-radio value="left">left</sd-radio>
        <sd-radio value="right">right</sd-radio>
        <sd-radio value="alternate">alternate</sd-radio>
      </sd-radio-group>
    </sd-row>
    <sd-timeline :mode="mode" :labelPosition="pos">
      <sd-timeline-item label="2017-03-10" dotColor="#52C419">
        The first milestone
      </sd-timeline-item>
      <sd-timeline-item label="2018-05-12" dotColor="#F5222D" labelPosition="same">
        The second milestone
      </sd-timeline-item>
      <sd-timeline-item label="2020-09-30" position="bottom">
        The third milestone
      </sd-timeline-item>
    </sd-timeline>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const mode = ref('left');
  const pos = ref('same');

  const onLabelPositionChange = (_pos) => {
    pos.value = _pos;
  };

  const onModeChange = (_mode) => {
    mode.value = _mode;
  };
</script>
