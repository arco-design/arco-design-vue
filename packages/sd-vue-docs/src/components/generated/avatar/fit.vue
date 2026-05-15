<template>
  <sd-avatar class="sd:mr-6 sd:align-middle sd:bg-[#14a9f8]">
    {{ text }}
  </sd-avatar>
  <sd-button type="secondary" @click="onClick" class="sd:align-middle"> Change </sd-button>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  const list = ['B', 'SD', 'Design', 'Tom', 'AD'];

  const index = ref(0);
  const text = computed(() => list[index.value]);

  const onClick = () => {
    index.value = index.value >= list.length - 1 ? 0 : index.value + 1;
  };
</script>
