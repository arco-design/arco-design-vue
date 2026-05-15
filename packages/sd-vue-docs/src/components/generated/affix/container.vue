<template>
  <div class="sd:h-50 sd:overflow-auto" ref="containerRef">
    <div class="sd:h-100 sd:overflow-hidden sd:bg-[#ccc]">
      <sd-affix :offsetTop="20" :target="containerRef" class="sd:m-10">
        <sd-button type="primary">Affix in scrolling container</sd-button>
      </sd-affix>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const containerRef = ref();
</script>
