<template>
  <div>
    <sd-button
      type="primary"
      @click="
        () => {
          timestamp = Date.now();
        }
      "
      class="sd:mb-5"
    >
      reload
    </sd-button>
  </div>
  <sd-image
    width="200"
    height="200"
    :src="`https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}`"
  >
    <template #loader>
      <img
        alt=""
        width="200"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
        class="sd:blur-[5px]"
      />
    </template>
  </sd-image>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const timestamp = ref(Date.now());
</script>
