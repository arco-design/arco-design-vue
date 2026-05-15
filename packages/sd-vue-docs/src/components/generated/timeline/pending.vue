<template>
  <sd-row align="center" class="sd:mb-6">
    <sd-checkbox
      :checked="!!pendingProps.direction"
      @change="(v) => onChange({ direction: v ? 'horizontal' : '' })"
    >
      horizontal &nbsp; &nbsp;
    </sd-checkbox>
    <sd-checkbox :checked="!!pendingProps.reverse" @change="(v) => onChange({ reverse: v })">
      reverse &nbsp; &nbsp;
    </sd-checkbox>
    <sd-checkbox
      :checked="!!pendingProps.pending"
      @change="(v) => onChange({ pending: v ? 'This is a pending dot' : false })"
    >
      pending &nbsp; &nbsp;
    </sd-checkbox>

    <sd-checkbox
      :checked="!!pendingProps.hasPendingDot"
      @change="(v) => onChange({ hasPendingDot: v })"
    >
      custom pendingDot
    </sd-checkbox>
  </sd-row>
  <sd-timeline v-bind="pendingProps">
    <template v-if="pendingProps.hasPendingDot" #dot>
      <IconFire class="sd:text-[#e70a0a]" />
    </template>
    <sd-timeline-item label="2017-03-10" dotColor="#52C419"> The first milestone </sd-timeline-item>
    <sd-timeline-item label="2018-05-12" dotColor="#F5222D">
      The second milestone
    </sd-timeline-item>
    <sd-timeline-item label="2020-09-30">The third milestone</sd-timeline-item>
  </sd-timeline>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { IconFire } from '@sdata/web-vue/es/icon/index.js';

  const pendingProps = ref<Record<string, boolean | string>>({});

  function onChange(newProps: Record<string, boolean | string>) {
    pendingProps.value = {
      ...pendingProps.value,
      ...newProps,
    };
  }
</script>
