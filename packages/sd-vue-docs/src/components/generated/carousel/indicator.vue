<template>
  <sd-space direction="vertical" size="large">
    <sd-radio-group
      type="button"
      @change="updateType"
      class="sd:mb-2.5"
      :modelValue="indicatorType"
    >
      <sd-radio value="dot">dot</sd-radio>
      <sd-radio value="line">line</sd-radio>
      <sd-radio value="slider">slider</sd-radio>
    </sd-radio-group>
    <sd-radio-group
      type="button"
      @change="updatePosition"
      class="sd:mb-5"
      :modelValue="indicatorPosition"
    >
      <sd-radio value="left">left</sd-radio>
      <sd-radio value="right">right</sd-radio>
      <sd-radio value="top">top</sd-radio>
      <sd-radio value="bottom">bottom</sd-radio>
      <sd-radio value="outer">outer</sd-radio>
    </sd-radio-group>
    <sd-carousel
      :indicator-type="indicatorType"
      :indicator-position="indicatorPosition"
      show-arrow="never"
      class="sd:w-150 sd:h-60"
    >
      <sd-carousel-item v-for="image in images">
        <img :src="image" alt="carousel" class="sd:w-full" />
      </sd-carousel-item>
    </sd-carousel>
  </sd-space>
</template>

<script setup lang="ts">
  import type { CarouselIndicatorPosition, CarouselIndicatorType } from '@sdata/web-vue';

  import { ref, shallowRef } from 'vue';

  const images = ref([
    'https://picsum.photos/1200/480',
    'https://picsum.photos/1200/480',
    'https://picsum.photos/1200/480',
  ]);

  const indicatorType = shallowRef<CarouselIndicatorType>('dot');

  const indicatorPosition = shallowRef<CarouselIndicatorPosition>('bottom');

  function updateType(type: string | number | boolean) {
    indicatorType.value = type as CarouselIndicatorType;
  }

  function updatePosition(position: string | number | boolean) {
    indicatorPosition.value = position as CarouselIndicatorPosition;
  }
</script>
