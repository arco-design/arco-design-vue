<template>
  <sd-space size="large">
    <sd-switch v-model="value1" auto-loading />
    <sd-switch v-model="value2" type="round" auto-loading />
    <sd-switch v-model="value3" type="line" auto-loading />
  </sd-space>
</template>

<script setup lang="ts">
  import { customRef } from 'vue';

  const useDelayedModel = () => {
    let value = false;

    return customRef<boolean>((track, trigger) => ({
      get() {
        track();
        return value;
      },
      set(nextValue) {
        setTimeout(() => {
          value = nextValue;
          trigger();
        }, 1000);
      },
    }));
  };

  const value1 = useDelayedModel();
  const value2 = useDelayedModel();
  const value3 = useDelayedModel();
</script>
