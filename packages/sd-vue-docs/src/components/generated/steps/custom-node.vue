<template>
  <div>
    <sd-steps changeable label-placement="vertical" :current="current" @change="setCurrent">
      <sd-step description="This is a description">
        Succeeded
        <template v-slot:node="slotProps">
          <sd-popover content="step tip" :popup-visible="current === 1">
            <span>{{ slotProps.step }}</span>
          </sd-popover>
        </template>
      </sd-step>
      <sd-step description="This is a description">
        Processing Succeeded
        <template v-slot:node="slotProps">
          <sd-popover content="step tip" :popup-visible="current === 2">
            <span>{{ slotProps.step }}</span>
          </sd-popover>
        </template>
      </sd-step>
      <sd-step description="This is a description"
        >Pending
        <template v-slot:node="slotProps">
          <sd-popover content="step tip" :popup-visible="current === 3">
            <span>{{ slotProps.step }}</span>
          </sd-popover>
        </template>
      </sd-step>
    </sd-steps>
    <div class="sd:mt-5 sd:text-center">
      <sd-space size="large">
        <sd-button type="secondary" :disabled="current <= 1" @click="onPrev">
          <IconLeft />
          Back
        </sd-button>
        <sd-button type="primary" :disabled="current >= 3" @click="onNext">
          Next
          <IconRight />
        </sd-button>
      </sd-space>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const current = ref(1);

  const onPrev = () => {
    current.value = Math.max(1, current.value - 1);
  };

  const onNext = () => {
    current.value = Math.min(3, current.value + 1);
  };

  const setCurrent = (current) => {
    current.value = current;
  };
</script>
