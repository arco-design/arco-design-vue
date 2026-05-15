<template>
  <div>
    <sd-resize-box
      :directions="['right', 'bottom']"
      class="sd:min-w-25 sd:max-w-full sd:text-center"
      v-model:width="width"
      v-model:height="height"
    >
      <sd-typography-paragraph
        >We are building the future of content discovery and creation.</sd-typography-paragraph
      >
      <sd-divider />
      <sd-typography-paragraph>
        ByteDance's content platforms enable people to enjoy content powered by AI technology. We
        inform, entertain, and inspire people across language, culture and geography.
      </sd-typography-paragraph>
      <sd-divider>ByteDance</sd-divider>
      <sd-typography-paragraph
        >Yiming Zhang is the founder and CEO of ByteDance.</sd-typography-paragraph
      >
    </sd-resize-box>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const width = ref(500);
  const height = ref(200);
</script>
