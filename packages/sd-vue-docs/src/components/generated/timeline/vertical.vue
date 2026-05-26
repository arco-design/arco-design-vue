<template>
  <div>
    <sd-row align="center" class="sd:mb-6">
      <sd-typography-text>mode: &nbsp; &nbsp;</sd-typography-text>
      <sd-radio-group @change="onChange" :modelValue="mode">
        <sd-radio value="left">left</sd-radio>
        <sd-radio value="right">right</sd-radio>
        <sd-radio value="alternate">alternate</sd-radio>
      </sd-radio-group>
    </sd-row>
    <sd-timeline :mode="mode" labelPosition="relative">
      <sd-timeline-item label="2012-08">
        <sd-row class="sd:inline-flex sd:items-center">
          <img alt="" width="40" class="sd:mr-4 sd:mb-3" src="https://picsum.photos/240/240" />
          <div class="sd:mb-3">
            Foo
            <div class="sd:text-xs sd:text-[#4e5969]"> Founded in 2012 </div>
          </div>
        </sd-row>
      </sd-timeline-item>
      <sd-timeline-item label="2017-05">
        <sd-row class="sd:inline-flex sd:items-center">
          <img alt="" width="40" class="sd:mr-4 sd:mb-3" src="https://picsum.photos/240/240" />
          <div class="sd:mb-3">
            Bar
            <div class="sd:text-xs sd:text-[#4e5969]"> Founded in 2017 </div>
          </div>
        </sd-row>
      </sd-timeline-item>
      <sd-timeline-item label="2018-07">
        <sd-row class="sd:inline-flex sd:items-center">
          <img alt="" width="40" class="sd:mr-4 sd:mb-3" src="https://picsum.photos/240/240" />
          <div class="sd:mb-3">
            Baz
            <div class="sd:text-xs sd:text-[#4e5969]"> Founded in 2018 </div>
          </div>
        </sd-row>
      </sd-timeline-item>
    </sd-timeline>
  </div>
</template>

<script setup lang="ts">
  import type { ModeType } from '@sdata/web-vue';

  import { ref } from 'vue';

  const mode = ref<ModeType>('left');

  const onChange = (_mode: string | number | boolean) => {
    mode.value = _mode as ModeType;
  };
</script>
