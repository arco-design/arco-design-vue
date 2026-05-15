<template>
  <div
    class="sd:box-border sd:w-140 sd:border-30 sd:border-solid sd:border-[rgb(var(--gray-2))] sd:p-6"
  >
    <p>A design is a plan or specification for the construction of an object.</p>
    <sd-divider />
    <p>A design is a plan or specification for the construction of an object.</p>
    <sd-divider dashed />
    <p>A design is a plan or specification for the construction of an object.</p>
    <sd-divider :size="2" class="sd:[border-bottom-style:dotted]" />
    <p>A design is a plan or specification for the construction of an object.</p>
  </div>
  <div
    class="sd:mt-12 sd:box-border sd:w-140 sd:border-30 sd:border-solid sd:border-[rgb(var(--gray-2))] sd:p-6"
  >
    <div class="sd:flex sd:items-center sd:justify-center">
      <span
        class="sd:flex sd:h-10 sd:w-10 sd:items-center sd:justify-center sd:mr-4 sd:rounded-[50%] sd:bg-[var(--color-fill-3)] sd:text-base sd:text-[var(--color-text-2)]"
        ><IconImage
      /></span>
      <div class="sd:flex-1 sd:text-xs sd:leading-5 sd:text-[var(--color-text-2)]">
        <sd-typography-title :heading="6">Image</sd-typography-title>
        May 4, 2010
      </div>
    </div>
    <sd-divider class="sd:left-[55px] sd:w-[calc(100%-55px)] sd:min-w-auto sd:my-4" />
    <div class="sd:flex sd:items-center sd:justify-center">
      <span
        class="sd:flex sd:h-10 sd:w-10 sd:items-center sd:justify-center sd:mr-4 sd:rounded-[50%] sd:bg-[var(--color-fill-3)] sd:text-base sd:text-[var(--color-text-2)]"
        ><IconUser
      /></span>
      <div class="sd:flex-1 sd:text-xs sd:leading-5 sd:text-[var(--color-text-2)]">
        <sd-typography-title :heading="6">Avatar</sd-typography-title>
        May 4, 2010
      </div>
    </div>
    <sd-divider class="sd:left-[55px] sd:w-[calc(100%-55px)] sd:min-w-auto sd:my-4" />
    <div class="sd:flex sd:items-center sd:justify-center">
      <span
        class="sd:flex sd:h-10 sd:w-10 sd:items-center sd:justify-center sd:mr-4 sd:rounded-[50%] sd:bg-[var(--color-fill-3)] sd:text-base sd:text-[var(--color-text-2)]"
        ><IconPen
      /></span>
      <div class="sd:flex-1 sd:text-xs sd:leading-5 sd:text-[var(--color-text-2)]">
        <sd-typography-title :heading="6">Icon</sd-typography-title>
        May 4, 2010
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { IconImage, IconUser, IconPen } from '@sdata/web-vue/es/icon/index.js';
</script>
