<template>
  <sd-auto-complete
    :data="data"
    @search="handleSearch"
    class="sd:w-90"
    placeholder="please enter something"
  >
    <template #footer>
      <div class="sd:py-1.5 sd:text-center">
        <sd-button>Click Me</sd-button>
      </div>
    </template>
  </sd-auto-complete>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const data = ref([]);

  function handleSearch(value) {
    if (value) {
      data.value = [...Array(5)].map((_, index) => `${value}-${index}`);
      console.log(data.value);
    } else {
      data.value = [];
    }
  }
</script>
