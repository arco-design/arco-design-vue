<template>
  <div>
    <sd-steps changeable :current="current" @change="setCurrent">
      <sd-step description="This is a description">Succeeded</sd-step>
      <sd-step description="This is a description">Processing</sd-step>
      <sd-step description="This is a description">Pending</sd-step>
    </sd-steps>
    <div
      class="sd:w-full sd:h-50 sd:text-center"
      :style="{ backgroundColor: `var(${getCssVarToken('--color-bg-2')})`, color: '#c2c7cc' }"
    >
      <div class="sd:leading-40">Step{{ current }} Content</div>
      <sd-space size="large">
        <sd-button type="secondary" :disabled="current <= 1" @click="onPrev">
          <IconLeft /> Back
        </sd-button>
        <sd-button type="primary" :disabled="current >= 3" @click="onNext">
          Next <IconRight />
        </sd-button>
      </sd-space>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { StepsChangeHandler } from '@sdata/web-vue';

  import { shallowRef } from 'vue';

  import { getCssVarToken } from '@sdata/web-vue';

  const current = shallowRef(1);

  function onPrev() {
    current.value = Math.max(1, current.value - 1);
  }

  function onNext() {
    current.value = Math.min(3, current.value + 1);
  }

  const setCurrent: StepsChangeHandler = (step) => {
    current.value = step;
  };
</script>
