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
    :src="`https://picsum.photos/1000/1000?timestamp=${timestamp}`"
    show-loader
  />
  <sd-image
    width="200"
    height="200"
    :src="`https://picsum.photos/1000/1000?timestamp=${timestamp}`"
    class="sd:ml-[67px]"
  >
    <template #loader>
      <div class="loader-animate" />
    </template>
  </sd-image>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  const timestamp = ref(Date.now());
</script>
<style scoped>
  .loader-animate {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      -60deg,
      var(--color-fill-2) 25%,
      var(--color-neutral-3) 40%,
      var(--color-fill-3) 55%
    );
    background-size: 400% 100%;
    animation: loop-circle 1.5s cubic-bezier(0.34, 0.69, 0.1, 1) infinite;
  }

  @keyframes loop-circle {
    0% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0 50%;
    }
  }
</style>
